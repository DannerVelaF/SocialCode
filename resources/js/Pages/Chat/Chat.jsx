import Authenticated from "@/Layouts/AuthenticatedLayout";
import React from "react";
import Inbox from "./Inbox";
import { Head } from "@inertiajs/react";

function Chat({ auth, receiverUser, messages }) {
  const { user } = auth;
  return (
    <Authenticated user={user}>
      <Head title="Chat" />
      <div className="flex justify-end flex-1 h-full ">
        <div className="w-full flex flex-1">
          {receiverUser && (
            <div className="w-full h-full">
              <Inbox
                auth={auth}
                receiverUser={receiverUser}
                chatMessages={messages}
              />
            </div>
          )}
        </div>
        <div className="flex items-center p-4 w-[20%] flex-col">
          <a
            href={route("messages.show", "Yannel")} // Hacemos una redirección al backend con el nombre del usuario
            className="bg-black text-white px-3 py-2 "
          >
            Yannel Valiente
          </a>
          <a
            href={route("messages.show", "DannerVela")} // Hacemos una redirección al backend con el nombre del usuario
            className="bg-black text-white px-3 py-2 "
          >
            Danner Vela
          </a>
        </div>
      </div>
    </Authenticated>
  );
}

export default Chat;
