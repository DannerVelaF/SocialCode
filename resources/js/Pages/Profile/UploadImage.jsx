import React, { useEffect, useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import MyDatePicker from "@/Components/DatePicker";

function UploadImage({ auth }) {
  const { data, setData, errors, processing, post, reset } = useForm({
    profile_picture: null,
    fecha_nacimiento: "",
  });
  console.log(data);

  const [ingresarFecha, setIngresarFecha] = useState(false);
  const [isAdult, setIsAdult] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setData("profile_picture", file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("profile.upload"), {
      onSuccess: () => reset(),
    });
  };

  const handleDateChange = (date) => {
    const formattedDate = date.format("YYYY-MM-DD");
    setData("fecha_nacimiento", formattedDate);
    checkIfAdult(date);
  };

  const checkIfAdult = (date) => {
    const today = new Date();
    const birthDate = new Date(date.toDate()); // Convierte Dayjs a JavaScript Date
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Ajustar la edad si el cumpleaños aún no ha pasado en el año actual
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    setIsAdult(age >= 18);
  };

  useEffect(() => {
    if (auth.user.profile_picture) {
      setData("profile_picture", auth.user.profile_picture);
      setData("userId", auth.user.id);
    }
  }, []);

  const getImageUrl = () => {
    if (data.profile_picture instanceof File) {
      return URL.createObjectURL(data.profile_picture);
    }
    return data.profile_picture;
  };

  return (
    <div className="min-h-screen flex justify-center items-center text-center">
      <Head title="Register - SocialCode" />
      <div className="w-1/2 flex justify-center flex-col items-center">
        <h1 className="font-extrabold text-4xl mb-2">
          Upload Your Profile Picture
        </h1>
        <p className="text-lg text-[#72727a] font-medium">
          Welcome to SocialCode
        </p>

        <div className="mt-5 flex flex-col items-center w-full">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center w-full"
          >
            {!ingresarFecha && (
              <>
                <h1 className="font-medium text-lg mb-5">
                  ¿Cuál es tu fecha de nacimiento?
                </h1>
                {data.fecha_nacimiento && !isAdult && (
                  <span className="mb-4 text-red-600">
                    Debes ser mayor de edad
                  </span>
                )}
                <MyDatePicker onChange={handleDateChange} />
                <button
                  onClick={() => {
                    setIngresarFecha(!ingresarFecha);
                  }}
                  disabled={!isAdult}
                  className={`mt-5 px-4 py-2 uppercase rounded-md bg-black text-white w-1/2 hover:bg-[#2f2f31] focus:bg-[#2f2f31] focus:ring-black ${
                    !isAdult && "opacity-50 cursor-not-allowed"
                  }`}
                >
                  Siguiente
                </button>
              </>
            )}

            {ingresarFecha && (
              <>
                <div className="relative">
                  <label htmlFor="profile_picture" className="cursor-pointer">
                    <div className="w-[400px] h-[400px] rounded-full bg-gray-200 flex justify-center items-center overflow-hidden border border-gray-300">
                      {data.profile_picture ? (
                        <img
                          src={getImageUrl()}
                          alt="Profile Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-500">Upload</span>
                      )}
                    </div>
                  </label>
                  <input
                    type="file"
                    id="profile_picture"
                    name="profile_picture"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
                {errors.profile_picture && (
                  <span className="mt-1 text-red-600 text-sm">
                    {errors.profile_picture}
                  </span>
                )}
                <PrimaryButton
                  type="submit"
                  disabled={processing}
                  className="mt-5 w-1/2 bg-black hover:bg-[#2f2f31] focus:bg-[#2f2f31] focus:ring-black"
                >
                  Register
                </PrimaryButton>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default UploadImage;
