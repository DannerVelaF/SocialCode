import { useForm } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

function Inbox({ auth, receiverUser, chatMessages }) {
  const [messages, setMessages] = useState(chatMessages);
  const { data, setData, reset, processing } = useForm({
    message: "",
    receiver_id: receiverUser.id,
  });

  const textMessageRef = useRef(null);
  const scrollToBottom = () => {
    textMessageRef.current.scrollTop = textMessageRef.current.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const sortedIds = [auth.user.id, receiverUser.id].sort();

    window.Echo.private(`message.${sortedIds.join(".")}`).listen(
      "MessageSent",
      (e) => {
        setMessages((prevMessages) => [...prevMessages, e.message]);
      }
    );
  }, []);

  const onsubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario.
    try {
      const response = await axios.post("/message", data);
      if (response) {
        reset(); // Resetear el formulario después de enviar el mensaje.
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-full flex flex-col overflow-hidden" id="inbox">
      <header className="p-4 flex items-center gap-2 border border-b-2 shadow-md h-[10%]">
        <span
          className={`rounded-full overflow-hidden w-10 h-10 flex bg-white ${
            receiverUser.profile.profile_picture === "ProfileDefault.png"
              ? "p-2"
              : ""
          }`}
        >
          <img
            src={`../../../storage/images/${receiverUser.profile.profile_picture}`}
            alt=""
            className="w-full h-full aspect-square"
          />
        </span>
        <div className="flex items-center gap-2">
          <p className="font-bold text-xl">{receiverUser.name}</p>
          {receiverUser.id === auth.user.id ? <span>(You)</span> : ""}
        </div>
      </header>
      <div
        className="p-4 flex-1 overflow-y-scroll"
        ref={textMessageRef}
        id="text-box"
      >
        {messages.length > 0 ? (
          messages.map((item, index) => (
            <div
              key={index}
              className={`mb-2 flex ${
                item.sender_id === auth.user.id
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              {/* Si el mensaje es del usuario autenticado, se alinea a la derecha */}
              <div
                className={
                  item.sender_id == auth.user.id
                    ? "bg-[#181C14] text-white w-fit rounded-xl py-3 px-4"
                    : "bg-[#697565] text-white w-fit rounded-xl py-3 px-4"
                }
              >
                <span className="font-bold">{item.sender.name}: </span>
                <span>{item.message}</span>
                <span className={`flex text-xs justify-end`}>
                  {dayjs(item.created_at).format("HH:mm")}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p>No messages yet.</p>
        )}
      </div>
      <div className="flex gap-5 p-4">
        <input
          type="text"
          className="w-full border rounded p-2"
          placeholder="Type your message"
          value={data.message}
          onChange={(e) => setData("message", e.target.value)}
        />
        <button
          className="bg-black py-2 px-5 text-white rounded-lg"
          disabled={processing}
          onClick={onsubmit}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Inbox;
