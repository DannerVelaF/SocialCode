import { useForm } from "@inertiajs/react";
import React from "react";

function Comments({ auth, chirp_id, children, setCountComment, countComment }) {
  const { data, setData, post, processing, reset } = useForm({
    comentario: "",
    chirp_id: chirp_id,
  });
  const onSubmit = () => {
    post("/comment", {
      onSuccess: () => {
        setData("comentario", "");
        setCountComment(countComment + 1);
      },
    });
  };
  console.log(data);

  return (
    <div className="pt-4  transition-all ease-out delay-75">
      <div className="flex gap-4 items-center">
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
        <input
          placeholder="Write a comment..."
          className=" border-gray-300 rounded-lg w-full"
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
