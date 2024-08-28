import React, { useState, useEffect } from "react";
import Dropdown from "@/Components/Dropdown";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
dayjs.extend(relativeTime);
import { FaComment, FaHeart } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import axios from "axios";
import { useForm } from "@inertiajs/react";
import Comments from "./Comments";

function Chirp({ auth, chirp }) {
  console.log(chirp);

  const [edit, setEdit] = useState(false);
  const [showComments, setShowComments] = useState(chirp.comments.length === 0);

  const { data, setData, put, processing } = useForm({
    chirp_id: chirp.id,
    body: chirp.body,
  });

  const [hasLiked, setHasLiked] = useState(false);
  const [likeId, setLikeId] = useState(null);
  const [countLike, setCountLike] = useState(0);
  const [countComment, setCountComment] = useState(0);

  useEffect(() => {
    const userLiked = chirp.likes.some((like) => like.user.id === auth.user.id);
    setHasLiked(userLiked);
    const userLike = chirp.likes.find((like) => like.user.id === auth.user.id);
    setLikeId(userLike ? userLike.id : null);
    setCountLike(chirp.likes.length);
    setCountComment(chirp.comments.length);
  }, [chirp, auth.user.id]);

  const handleLike = async () => {
    try {
      const response = await axios.post("/like", {
        chirp_id: chirp.id,
      });

      if (response.data.success) {
        setLikeId(response.data.like.id);
        setHasLiked(true);
        setCountLike(countLike + 1);
      }
    } catch (error) {
      console.error("Error al dar like", error);
    }
  };

  const destroyLike = async () => {
    if (likeId === null) {
      console.error("No like ID available");
      return;
    }

    try {
      const response = await axios.delete(`/like/${likeId}`);
      if (response.data.success) {
        setHasLiked(false);
        setLikeId(null);
        setCountLike(countLike - 1);
      }
    } catch (error) {
      console.error("Error al eliminar like", error);
    }
  };

  const editChirp = () => {
    put("/chirps", {
      onSuccess: () => {
        setEdit(false);
      },
    });
  };

  return (
    <div className="flex justify-between w-full">
      <div className="flex w-full">
        <div>
          <span
            className={`rounded-full overflow-hidden w-12 h-12 flex border-2 border-black ${
              chirp.user.profile.profile_picture === "ProfileDefault.png"
                ? "p-2"
                : ""
            }`}
          >
            <img
              src={`../../../storage/images/${chirp.user.profile.profile_picture}`}
              alt=""
              className="w-full h-full aspect-square"
            />
          </span>
        </div>
        <div className="ms-5 w-full">
          <div className="w-full">
            <div className="lg:flex gap-3 items-center">
              <h1 className="font-bold text-[16px]">{chirp.user.name}</h1>
              <p className="text-sm text-gray-500 inline-block me-4 lg:me-0">
                @{chirp.user.user_name}
              </p>
              <span className="text-sm text-gray-500">
                {dayjs(chirp.created_at).fromNow()}
              </span>
            </div>
            {!edit ? (
              <p>{chirp.body}</p>
            ) : (
              <div className="flex flex-col items-start gap-5">
                <textarea
                  value={data.body}
                  onChange={(e) => setData("body", e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={editChirp}
                    disabled={data.body === chirp.body || processing}
                    className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
                  >
                    {processing ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={() => setEdit(false)}
                    className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="mt-3 flex gap-6">
            <div className="flex items-center gap-2">
              <FaHeart
                size={20}
                className={`cursor-pointer ${
                  hasLiked ? "text-red-600" : "text-black"
                } hover:text-red-600`}
                onClick={hasLiked ? destroyLike : handleLike}
              />
              {countLike > 0 ? <span>{countLike}</span> : ""}
            </div>
            <div className="flex items-center gap-2">
              <FaComment
                size={20}
                onClick={() => setShowComments(!showComments)}
              />
              {countComment > 0 ? <span>{countComment}</span> : ""}
            </div>
          </div>

          <Comments
            auth={auth}
            chirp_id={chirp.id}
            setCountComment={setCountComment}
            countComment={countComment}
          >
            {showComments &&
              chirp.comments.map((comment, index) => (
                <div
                  className={`flex gap-4 items-center transition-all ease-out delay-75 transform`}
                  key={index}
                >
                  <div className="flex justify-center items-center gap-5">
                    <span
                      className={`rounded-full overflow-hidden w-9 h-9 flex border-2 border-black ${
                        comment.user.profile.profile_picture ===
                        "ProfileDefault.png"
                          ? "p-2"
                          : ""
                      }`}
                    >
                      <img
                        src={`../../../storage/images/${comment.user.profile.profile_picture}`}
                        alt=""
                        className="w-full h-full aspect-square"
                      />
                    </span>
                    <div>
                      <div className="flex gap-2">
                        <h1 className="font-bold text-[16px]">
                          {comment.user.name}
                        </h1>
                        <p className="text-sm text-gray-500 inline-block me-4 lg:me-0">
                          @{comment.user.user_name}
                        </p>
                        <span className="text-sm text-gray-500">
                          {dayjs(comment.created_at).fromNow()}
                        </span>
                      </div>
                      <p>{comment.comentario}</p>
                    </div>
                  </div>
                </div>
              ))}
          </Comments>
        </div>
      </div>

      {auth.user.id === chirp.user.id && (
        <Dropdown>
          <Dropdown.Trigger>
            <BsThreeDots className="hover:bg-gray-200 rounded-md" />
          </Dropdown.Trigger>
          <Dropdown.Content>
            <button
              className="block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
              onClick={() => setEdit(!edit)}
            >
              {edit ? "Cancel" : "Edit"}
            </button>
            <Dropdown.Link
              as="button"
              href={route("chirp.destroy", { id: chirp.id })}
              method="delete"
            >
              Delete
            </Dropdown.Link>
          </Dropdown.Content>
        </Dropdown>
      )}
    </div>
  );
}

export default Chirp;
