import React, { useEffect } from "react";
import axios from "axios";
import { Link, useForm } from "@inertiajs/react";

function Comments({
  auth,
  chirp_id,
  children,
  setCountComment,
  countComment,
  setComments,
}) {
  const { data, setData, reset, processing } = useForm({
    comentario: "",
    chirp_id: chirp_id,
  });

  const onSubmit = async () => {
    try {
      const response = await axios.post("/comment", {
        comentario: data.comentario,
        chirp_id: data.chirp_id,
      });

      console.log(response);

      if (response.data.success) {
        setData("comentario", "");
        setCountComment(countComment + 1);
        setComments((prevComments) => [...prevComments, response.data.comment]);
      }
    } catch (error) {
      console.error("Error al enviar el comentario:", error);
    }
  };

  useEffect(() => {
    setData("chirp_id", chirp_id);
  }, [chirp_id]);

  return (
    <div className="pt-4 transition-all ease-out delay-75">
      <div className="flex gap-4 items-center">
        <Link
          href={route("profile.show", { user_name: auth.user.user_name })}
          className="rounded-full w-8 h-8 lg:w-9 lg:h-9"
        >
          <div className="flex justify-center items-center">
            <span
              className={`rounded-full overflow-hidden w-8 h-8 lg:w-9 lg:h-9 flex border-2 border-black ${
                auth.user.profile.profile_picture === "ProfileDefault.png"
                  ? "p-2"
                  : ""
              }`}
            >
              <img
                src={`../../../storage/images/${auth.user.profile.profile_picture}`}
                alt=""
                className="w-full h-full aspect-square"
              />
            </span>
          </div>
        </Link>
        <input
          placeholder="Write a comment..."
          className="border-gray-300 rounded-lg w-full"
          type="text"
          value={data.comentario}
          onChange={(e) => setData("comentario", e.target.value)}
        />
        <button
          onClick={data.comentario !== "" ? onSubmit : undefined}
          className="bg-black py-2 px-3 text-white rounded-lg"
          disabled={processing}
        >
          Comment
        </button>
      </div>
      <div className="mt-4 flex flex-col gap-4">{children}</div>
    </div>
  );
}

export default Comments;
