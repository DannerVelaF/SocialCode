import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import { Link } from "@inertiajs/react";
import { IoIosLogOut } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { LuHash } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { LuUser } from "react-icons/lu";
import { IoSearchSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";

export default function Authenticated({ user, children }) {
  const links = [
    {
      text: "Home",
      icon: <IoHomeOutline className="lg:text-xl text-2xl text-black" />,
      href: "dashboard",
    },

    {
      text: "Message",
      icon: <MdOutlineEmail className="lg:text-xl text-2xl text-black" />,
      href: "dashboard",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col relative bg-[#fafafa]">
      <header className="h-16 flex px-5 justify-between items-center bg-black text-white">
        <Link className="flex gap-2 items-center" href="/">
          <ApplicationLogo />
          <span className="text-xl">Social Code</span>
        </Link>
        <div className="flex gap-5 w-1/2 justify-end">
          <div className="lg:block hidden relative w-full">
            <IoSearchSharp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              placeholder="Buscar usuario"
              type="text"
              className="w-full pl-10 border-2 rounded-lg"
            />
          </div>
          <Dropdown>
            <Dropdown.Trigger>
              <span
                className={`rounded-full overflow-hidden w-10 h-10 flex bg-white ${
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
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Link
                method="GET"
                as="button"
                href={route("profile.show", { user_name: user.user_name })}
                className="flex items-center gap-2"
              >
                <FaUser />
                Profile
              </Dropdown.Link>
              <Dropdown.Link
                method="post"
                as="button"
                href={route("logout")}
                className="flex items-center gap-2"
              >
                <IoIosLogOut />
                Logout
              </Dropdown.Link>
            </Dropdown.Content>
          </Dropdown>
        </div>
      </header>
      <main className="lg:grid grid-cols-[280px_1fr] flex-1">
        {/* Destop navbar */}
        <nav className="flex-col hidden lg:flex border-e-2">
          <div className="mb-5 flex p-4 items-center">
            <div className="flex items-center">
              <span
                className={`rounded-full overflow-hidden w-16 h-16 flex border-2 border-black ${
                  user.profile.profile_picture === "ProfileDefault.png"
                    ? "p-3"
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
            <div className="p-4 flex flex-col">
              <span className="font-bold text-pretty ">{user.name}</span>
              <span className="font-medium text-pretty text-gray-500">
                @{user.user_name}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4 ps-4">
            {links.map((link, index) => (
              <NavLink
                method="GET"
                key={index}
                className="text-2xl border-none w-full rounded-s-full hover:bg-slate-100 flex items-center px-3 py-2 gap-3"
                href={route(link.href)}
              >
                <span>{link.icon}</span>
                <span>{link.text}</span>
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Responsive navbar */}
        <nav className="lg:hidden absolute bottom-0 left-0 w-full border-t-2 border-gray-300">
          <div className="flex justify-between w-full p-4">
            {links.map((link, index) => (
              <NavLink
                href={route(link.href)}
                key={index}
                method="GET"
                className="hover:bg-slate-50"
              >
                {link.icon}
              </NavLink>
            ))}
          </div>
        </nav>
        {children}
      </main>
    </div>
  );
}
