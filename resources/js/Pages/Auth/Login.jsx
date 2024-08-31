import { Head, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import React from "react";
import PrimaryButton from "@/Components/PrimaryButton";

function Login() {
  const { data, setData, errors, processing, post, reset } = useForm({
    email: "",
    password: "",
  });

  const onSubmit = (e) => {
    e.preventDefault(); // Evita el envío por defecto del formulario
    post("/login", {
      onSuccess: () => reset(),
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center text-center">
      <Head title="Login - SocialCode" />
      <form
        onSubmit={onSubmit}
        className="md:w-1/2 w-full p-10 md:p-0 flex justify-center flex-col items-center"
      >
        <h1 className="font-extrabold md:text-4xl mb-2 text-2xl">
          Sing in to your account
        </h1>
        <p className="lg:text-lg text-[#72727a] font-medium">
          Enter your email and password below
        </p>
        <div className="text-start lg:w-1/2 w-full mt-5">
          <InputLabel value={"Email address"} className="font-bold" />
          <TextInput
            className="w-full"
            id="email"
            name="email"
            onChange={(e) => setData("email", e.target.value)}
            value={data.email}
          />
          {errors.email && (
            <span className="mt-1 text-red-600 text-sm">{errors.email}</span>
          )}
        </div>
        <div className="text-start lg:w-1/2 w-full mt-5">
          <InputLabel value={"Password"} className="font-bold" />
          <TextInput
            className="w-full"
            type="password"
            id="password"
            name="password"
            onChange={(e) => setData("password", e.target.value)}
            value={data.password}
          />
          {errors.password && (
            <span className="mt-1 text-red-600 text-sm">{errors.password}</span>
          )}
        </div>
        <div className="lg:w-1/2 md:w-full w-1/2 text-end mt-2 text-sm ms-auto lg:ms-0">
          <a
            href="/register"
            className="hover:text-[#2f2f31] hover:underline mt-2 text-end "
          >
            Create an account
          </a>
        </div>
        <PrimaryButton
          type="submit"
          disabled={processing}
          className="mt-5 lg:w-1/2 w-full bg-black hover:bg-[#2f2f31] focus:bg-[#2f2f31] focus:ring-black"
        >
          Sing in
        </PrimaryButton>
      </form>
    </div>
  );
}

export default Login;
