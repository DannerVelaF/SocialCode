import React from "react";
import "../../../../css/app.css";
import "../../../../css/flags.css";
import { FaMale, FaFemale } from "react-icons/fa";
import Select from "react-select";
import { IoMdClose } from "react-icons/io";
import banderas from "../../../../assets/util/banderas.json";
import { useForm } from "@inertiajs/react";

function UpdateProfile({ user, openEdit, setOpenEdit }) {
  const generos = [
    {
      value: "masculino",
      label: (
        <>
          <FaMale /> Masculino
        </>
      ),
    },
    {
      value: "femenino",
      label: (
        <>
          <FaFemale /> Femenino
        </>
      ),
    },
  ];

  const paises = banderas.map((bandera) => ({
    value: bandera.nombre,
    label: (
      <div>
        <span className={`flag flag-${bandera.codigo}`}></span>
        <span style={{ marginLeft: "10px", textTransform: "capitalize" }}>
          {bandera.nombre}
        </span>
      </div>
    ),
  }));

  const FlagsStyles = {
    option: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      gap: "10px", // Espacio entre la bandera y el nombre
      padding: "10px 12px", // Ajusta el padding para centrar mejor
    }),
    singleValue: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      gap: "10px", // Espacio entre la bandera y el nombre
    }),
  };

  const customStyles = {
    option: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
    }),
    singleValue: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
    }),
  };

  const { data, setData, post, processing, reset, errors } = useForm({
    user_name: user.user_name,
    name: user.name,
    biografia: user.profile.biografia || "",
    pais: user.profile.pais,
    genero: user.profile.genero,
    numero: user.profile.numero,
    fecha_nacimiento: user.profile.fecha_nacimiento,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post("/profile", {
      onSuccess: () => {
        setOpenEdit(false);
      },
    });
    console.log(data);
  };
  console.log(user);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-lg">
        <form action="" onSubmit={onSubmit}>
          <div className="flex justify-between mb-5">
            <div className="flex items-center gap-2">
              <span
                className="p-1 hover:bg-slate-100 rounded-full"
                onClick={() => setOpenEdit(false)}
              >
                <IoMdClose className="cursor-pointer" size={20} />
              </span>
              <h2 className="text-xl font-bold">Editar perfil</h2>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={processing}
            >
              Save
            </button>
          </div>
          <div className="flex flex-col gap-5 w-full">
            <div className="w-full">
              <label htmlFor="usuario" className="relative">
                <input
                  id="usuario"
                  type="text"
                  value={data.user_name}
                  onChange={(e) => setData("user_name", e.target.value)}
                  className={` w-full text-lg border border-[#b3b3b3] rounded-md outline-none focus:border-indigo-500 transition-all duration-200 ${
                    errors.user_name
                      ? "border-red-800 border-2"
                      : "valid:border-indigo-500"
                  }`}
                />
                <span className="block absolute left-0 transform -translate-y-1/2 top-1/2 px-2 mx-2 transition-all duration-200 input-text text-[#808080]">
                  Nombre de Usuario
                </span>
              </label>
              <span className=" text-red-700 font-bold">
                {errors.user_name}
              </span>
            </div>

            <div>
              <label htmlFor="nombre" className="relative">
                <input
                  id="nombre"
                  type="text"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                  className={` w-full text-lg border border-[#b3b3b3] rounded-md outline-none focus:border-indigo-500 transition-all duration-200 ${
                    errors.name
                      ? "border-red-800 border-2"
                      : "valid:border-indigo-500"
                  }`}
                />
                <span className="bg-white text-opacity-80 absolute left-0 transform -translate-y-1/2 top-1/2 px-2 mx-2 transition-all duration-200 input-text text-[#808080]">
                  Nombre
                </span>
              </label>
              <span className=" text-red-700 font-bold">{errors.name}</span>
            </div>
            <div>
              <label htmlFor="numero" className="relative">
                <input
                  id="numero"
                  type="text"
                  value={data.numero || ""}
                  onChange={(e) => setData("numero", e.target.value)}
                  className={` w-full text-lg border border-[#b3b3b3] rounded-md outline-none focus:border-indigo-500 transition-all duration-200 ${
                    errors.numero
                      ? "border-red-800 border-2"
                      : "valid:border-indigo-500"
                  }`}
                />
                <span className="bg-white text-opacity-80 absolute left-0 transform -translate-y-1/2 top-1/2 px-2 mx-2 transition-all duration-200 input-text text-[#808080]">
                  Numero
                </span>
              </label>
              <span className=" text-red-700 font-bold">{errors.numero}</span>
            </div>
            <div>
              <label htmlFor="genero" className="relative">
                <Select
                  inputId="genero"
                  options={generos}
                  isSearchable={false}
                  styles={customStyles}
                  placeholder="Genero"
                  value={generos.find((g) => g.value === data.genero)}
                  onChange={(selectedOption) =>
                    setData("genero", selectedOption.value)
                  }
                />
              </label>
              <span className=" text-red-700 font-bold">{errors.genero}</span>
            </div>
            <div>
              <label htmlFor="biografia" className="relative">
                <textarea
                  id="biografia"
                  value={data.biografia || ""}
                  onChange={(e) => setData("biografia", e.target.value)}
                  className={` w-full text-lg border border-[#b3b3b3] rounded-md outline-none focus:border-indigo-500 transition-all duration-200 ${
                    errors.biografia
                      ? "border-red-800 border-2"
                      : "valid:border-indigo-500"
                  }`}
                />
                <span className="bg-white text-opacity-80 absolute left-0 transform -translate-y-5 top-1/2 px-2 mx-2 transition-all duration-200 input-text text-[#808080]">
                  Biografía
                </span>
              </label>
              <span className=" text-red-700 font-bold">
                {errors.biografia}
              </span>
            </div>
            <label htmlFor="fecha_nacimiento" className="relative">
              <input
                id="fecha_nacimiento"
                type="date"
                required
                value={data.fecha_nacimiento}
                onChange={(e) => setData("fecha_nacimiento", e.target.value)}
                className={` w-full text-lg border border-[#b3b3b3] rounded-md outline-none focus:border-indigo-500 transition-all duration-200 ${
                  errors.fecha_nacimiento
                    ? "border-red-800 border-2"
                    : "valid:border-indigo-500"
                }`}
              />
              <span className="bg-white text-opacity-80 absolute left-0 transform -translate-y-1/2 top-1/2 px-2 mx-2 transition-all duration-200 input-text">
                Fecha de nacimiento
              </span>
            </label>
            <label htmlFor="pais" className="relative">
              <Select
                inputId="pais"
                options={paises}
                styles={FlagsStyles}
                placeholder="Selecciona un país"
                value={paises.find((p) => p.value === data.pais)}
                onChange={(selectedOption) =>
                  setData("pais", selectedOption.value)
                }
              />
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
