import { Link } from "@inertiajs/react";
import React from "react";
import { ToastContainer, toast } from "react-toastify";

const CustomToast = ({ userImage, userName, message, user_name }) => {
  const image = `../../../storage/images/${userImage}`;
  return (
    <Link
      href={route("messages.show", user_name)}
      className="flex items-center"
    >
      <img
        src={image}
        alt={userName}
        className="w-10 h-10 p-1 rounded-full mr-2 bg-white"
      />
      <div>
        <div className="font-bold">{userName}</div>
        <div>{message}</div>
      </div>
    </Link>
  );
};

// Función para mostrar el toast
export const showCustomToast = (userImage, userName, message, user_name) => {
  toast(
    <CustomToast
      userImage={userImage}
      userName={userName}
      message={message}
      user_name={user_name}
    />,
    {
      position: "bottom-left",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "dark",
    }
  );
};
