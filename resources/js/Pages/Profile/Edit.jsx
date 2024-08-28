import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import { FaRegCalendarAlt } from "react-icons/fa";
import UpdateProfile from "./Partials/UpdateProfile";
import { useState } from "react";
import CountryFlag from "@/Components/CountryFlag";

dayjs.extend(localeData);
dayjs.locale("es");
export default function Edit({ auth, mustVerifyEmail, status }) {
  const { user } = auth;
  const formattedDate = dayjs(user.created_at).format("MMMM [del] YYYY");
  const [openEdit, setOpenEdit] = useState(false);
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Profile
        </h2>
      }
    >
      {openEdit && (
        <UpdateProfile
          user={user}
          openEdit={openEdit}
          setOpenEdit={setOpenEdit}
        />
      )}
      <Head title="Profile" />
      <div className="flex flex-col ">
        <div className="h-80 bg-slate-200 border-b "></div>
        <div className="px-12 relative flex justify-between items-center">
          <div className="font-medium">
            <div
              className={`flex items-center overflow-hidden w-[150px] h-[150px] bg-white border-4 border-black aspect-square rounded-full absolute left-12 top-[-100px] ${
                user.profile.profile_picture === "ProfileDefault.png"
                  ? "p-6"
                  : ""
              }`}
            >
              <img
                src={`../../../storage/images/${user.profile.profile_picture}`}
                className="w-full h-full aspect-square "
              />
            </div>
            <div className="mt-16">
              <span className="font-medium text-2xl block">{user.name}</span>
              <span className="font-medium text-lg text-gray-500 block">
                @{user.user_name}
              </span>
              <div className="flex gap-3">
                <span className="mt-3 flex gap-1 items-center text-md">
                  <FaRegCalendarAlt />
                  Se unió en {formattedDate}
                </span>
                <span className="mt-3 flex gap-1 items-center capitalize text-md">
                  <CountryFlag countryName={user.profile.pais} />
                  {user.profile.pais}
                </span>
              </div>
            </div>
          </div>
          <button
            className="border-2 hover:bg-slate-100 text-lg font-medium py-2 px-5 rounded-full"
            onClick={() => setOpenEdit(true)}
          >
            Editar Perfil
          </button>
        </div>
        <main className="px-12 ">
          <p className="font-medium text-lg">{user.profile.biografia}</p>
        </main>
      </div>
    </AuthenticatedLayout>
  );
}
