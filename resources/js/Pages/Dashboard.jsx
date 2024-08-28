import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import Chirp from "./Chirp";

export default function Dashboard({ auth, chirps }) {
  const { data, setData, post, reset, processing } = useForm({
    body: "",
  });
  const onSubmit = () => {
    post("/chirps");
    reset();
  };
  const { user } = auth;
  console.log(user);

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Social Code" />
      <div className="md:p-12 p-8 ">
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <span
              className={`rounded-full items-center overflow-hidden w-10 h-10 lg:w-12 lg:h-12 flex border-2 border-black ${
                user.profile.profile_picture === "ProfileDefault.png"
                  ? "p-2"
                  : ""
              }`}
            >
              <img
                src={`../../../storage/images/${user.profile.profile_picture}`}
                alt=""
                className="w-full h-full aspect-square"
              />
            </span>
          </div>
          <textarea
            placeholder="What's happening?"
            type="text"
            className="ms-2 w-full py-3 border rounded-xl"
            value={data.body}
            onChange={(e) => setData("body", e.target.value)}
          />
          <button
            onClick={data.body !== "" ? onSubmit : undefined}
            className="bg-black py-2 px-3 text-white rounded-lg"
            disabled={processing}
          >
            Chirp
          </button>
        </div>

        <div className="mt-10 flex flex-col gap-5 lg:px-10 w-full">
          {chirps.map((chirp, index) => (
            <Chirp auth={auth} chirp={chirp} key={index} />
          ))}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
