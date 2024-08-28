import { Head, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import React from "react";
import PrimaryButton from "@/Components/PrimaryButton";
function Register() {
  const { data, setData, errors, processing, post, reset } = useForm({
    name: "",
    user_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const onSubmit = () => {
    post(route("register"), {
      onSuccess: () => reset(),
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center text-center">
      <Head title="Login - SocialCode" />
      <div className=" md:w-1/2 w-full p-10 md:p-0 flex justify-center flex-col items-center">
        <h1 className="font-extrabold md:text-4xl mb-2 text-2xl">
          Create your account
        </h1>
        <p className="text-lg text-[#72727a] font-medium">
          Welcome to SocialCode
        </p>
        <form className="relative text-start lg:w-1/2 w-full mt-5">
          <InputLabel value={"User Name"} className="font-bold" />

          <TextInput
            placeholder="User name"
            className="w-full pl-8"
            id="user_name"
            name="user_name"
            onChange={(e) => setData("user_name", e.target.value)}
            value={data.user_name}
          />
          <span className="absolute left-3 top-10 transform -translate-y-1/2 text-gray-500">
            @
          </span>
          {errors.user_name && (
            <span className="mt-1 text-red-600 text-sm">
              {errors.user_name}
            </span>
          )}
        </form>

        <div className="text-start lg:w-1/2 w-full mt-5">
          <InputLabel value={"Name"} className="font-bold" />
          <TextInput
            placeholder="Name"
            className="w-full"
            id="name"
            name="name"
            onChange={(e) => setData("name", e.target.value)}
            value={data.name}
          />
          {errors.name && (
            <span className="mt-1 text-red-600 text-sm">{errors.name}</span>
          )}
        </div>
        <div className="text-start lg:w-1/2 w-full mt-5">
          <InputLabel value={"Email address"} className="font-bold" />
          <TextInput
            placeholder="Email"
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
            placeholder="Password"
            className="w-full"
            type="password"
            id="password"
            name="password"
            onChange={(e) => setData("password", e.target.value)}
            value={data.password}
          />
        </div>
        <div className="text-start lg:w-1/2 w-full mt-5">
          <InputLabel value={"Password Confirmation"} className="font-bold" />
          <TextInput
            placeholder="Repeat Password"
            className="w-full"
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            onChange={(e) => setData("password_confirmation", e.target.value)}
            value={data.password_confirmation}
          />
        </div>
        <div className="lg:w-1/2 w-full  text-end mt-2 text-sm ms-auto lg:ms-0">
          <a
            href="/"
            className="hover:text-[#2f2f31] hover:underline mt-2 text-end "
          >
            Have an account? Sing in
          </a>
        </div>
        <PrimaryButton
          onClick={onSubmit}
          disabled={processing}
          className="mt-5 w-1/2 bg-black hover:bg-[#2f2f31] focus:bg-[#2f2f31] focus:ring-black"
        >
          Sing up
        </PrimaryButton>
      </div>
    </div>
  );
}

export default Register;
