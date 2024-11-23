import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useState, useEffect } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { MdOutlineOpenInNew } from "react-icons/md";
import axios from "axios";
import Inbox from "./Inbox";

function Chat({ auth, receiverUser, messages, chats }) {
  const { user } = auth;
  const page = usePage();

  const [currentUser] = useState(page.url.split("/")[2]);
  const [showSearch, setShowSearch] = useState(false);
  const [users, setUsers] = useState([]);
  const [chatList, setChatList] = useState(chats); // Estado local para los chats
  const searchUser = async (term) => {
    if (term.length === 0) {
      setUsers([]);
      return;
    }

    try {
      const response = await axios.get(`/user/${term}`);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlechange = (e) => {
    searchUser(e.target.value);
    if (e.target.value.length === 0) {
      setUsers([]);
    }
  };

  // Actualizar el último mensaje al recibir una notificación
  useEffect(() => {
    const { id } = user;
    Echo.private("App.Models.User." + id).notification((e) => {
      console.log("New message", e);
      const { message } = e.message;
      const { id: senderId } = e.sender;

      // Actualizar el último mensaje en el chat del usuario específico
      setChatList((prevChats) =>
        prevChats.map((chatUser) => {
          if (chatUser.id === senderId) {
            // Si el ID coincide, actualizar el último mensaje
            return {
              ...chatUser,
              last_message: {
                ...chatUser.last_message,
                message: message,
              },
            };
          }
          return chatUser; // No se actualiza si no coincide el ID
        })
      );
    });
  }, []);
  return (
    <Authenticated user={user}>
      <Head title="Chat" />
      <div className="flex justify-end flex-1 h-full">
        <div
          className={`lg:w-[80%] lg:flex lg:flex-1 ${
            receiverUser ? "block w-full" : "hidden"
          } `}
        >
          {receiverUser ? (
            <div className="w-full h-full">
              <Inbox
                auth={auth}
                receiverUser={receiverUser}
                chatMessages={messages}
              />
            </div>
          ) : (
            <div className="w-full lg:flex flex-col gap-y-5 p-5">
              <p className="lg:text-4xl font-bold">Messages</p>
              <p className="lg:text-2xl">
                You have no messages yet. Start a conversation with someone.
              </p>
              <p className="lg:text-lg text-gray-700">
                Select a user from the list below.
              </p>
            </div>
          )}
        </div>
        <div
          className={`flex items-center p-4 lg:w-[20%]  w-full flex-col gap-y-5 py-5 ${
            receiverUser ? "hidden" : "block"
          }`}
        >
          <div className="w-full relative">
            <button
              onClick={() => {
                setShowSearch(!showSearch);
                setUsers([]);
              }}
              className="flex items-center gap-5 border-2 hover:bg-gray-100 rounded-lg mx-auto w-[90%] justify-center py-2 transition-all duration-300 ease-in-out"
            >
              <MdOutlineOpenInNew />
              <span className="font-bold text-sm">New Message</span>
            </button>
            {showSearch && (
              <div className="absolute mt-2 w-full lg:left-0 bg-white border  lg:w-[200px] lg:h-[400px] border-gray-300 rounded-lg p-2 shadow-sm">
                <input
                  type="text"
                  placeholder="Search a user"
                  className="w-full rounded-lg"
                  onChange={handlechange}
                />
                {users.length > 0 ? (
                  <div className="flex flex-col gap-y-2">
                    {users.map((user) => (
                      <Link
                        key={user.id}
                        href={route("messages.show", user.user_name)}
                        className="px-3 py-2 flex items-center w-full gap-5"
                      >
                        <img
                          src={`../../../storage/images/${user.profile.profile_picture}`}
                          alt=""
                          className="w-10 h-10 rounded-full"
                        />
                        <span>{user.name}</span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-center mt-2">No users found.</p>
                )}
              </div>
            )}
          </div>
          <div className="w-full flex justify-center">
            <input
              type="text"
              placeholder="Search conversation"
              className="w-full rounded-lg"
            />
          </div>
          <div className="flex-1 flex flex-col w-full gap-y-2">
            {chatList.map((chatUser) => (
              <Link
                key={chatUser.id}
                href={route("messages.show", chatUser.user_name)}
                className="flex items-center w-full gap-5"
              >
                <img
                  src={`../../../storage/images/${chatUser.profile.profile_picture}`}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex flex-col gap-y-1">
                  <span
                    className={`text-md ${
                      currentUser === chatUser.user_name
                        ? "font-bold"
                        : "font-normal text-gray-500"
                    }`}
                  >
                    {chatUser.name}
                  </span>
                  <p
                    className={`text-sm font-bold ${
                      currentUser === chatUser.user_name
                        ? "text-black"
                        : "font-normal text-gray-500"
                    }`}
                  >
                    {chatUser.last_message.message}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Authenticated>
  );
}

export default Chat;
