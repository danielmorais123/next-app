import React, { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faCircleQuestion,
  faClose,
  faHouse,
  faInbox,
  faList,
  faMagnifyingGlass,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/router";
import { anton } from "../fonts/fonts";

const Drawer = ({ setOpen }) => {
  const [selected, setSelected] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();

  const logOut = async () => {
    await signOut(auth);
    router.push("/auth/login");
  };

  console.log({ path: router.pathname });

  return (
    <motion.div
      initial={{ x: 300 }}
      whileInView={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className="h-screen bg-[#4e4e4e] absolute right-0 z-[9999] w-full xs:w-[330px] p-5 rounded-l-xl flex flex-col justify-between shadow-2xl"
    >
      <div>
        <div className=" flex items-center justify-between ">
          <p
            className={`tracking-wide text-xl text-[#6C63FF] leading-10 ${anton.className} `}
          >
            Social Network{" "}
          </p>
          <div className="cursor-pointer">
            <FontAwesomeIcon
              icon={faBars}
              className="hover:text-gray-300/80 transition-all"
              onClick={() => setOpen(false)}
            />
          </div>
        </div>
        <div className="border border-white mt-2" />
        {selected ? (
          <div className="mt-4">
            <div className="w-full flex justify-between items-center">
              <h1 className="text-sm tracking-wide ">Search Users, Posts</h1>
              <FontAwesomeIcon
                icon={faList}
                className="cursor-pointer"
                onClick={() => setSelected(false)}
              />
            </div>
            <form className="relative cursor-pointer mt-2 ">
              <input
                type="text"
                placeholder="Search..."
                className="h-8 w-full py-5 pl-7 rounded-lg border-none text-sm outline-none tracking-wide bg-[#2c2c2c] placeholder-gray-400"
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute md:right-5 text-gray-400 top-3 right-3 md:top-3"
              />
            </form>
            <ul>
              <li></li>
            </ul>
          </div>
        ) : null}
        <div className="mt-5 w-full">
          <ul className={`${selected ? "hidden" : "flex flex-col"}`}>
            <li
              onClick={() => router.push("/")}
              className={`${
                router.pathname === "/"
                  ? "bg-[#f6f6f6] font-bold text-[#6C63FF]"
                  : null
              }  p-2 rounded-lg text-sm tracking-wider cursor-pointer hover:bg-white hover:text-[#6C63FF] flex items-center`}
            >
              <FontAwesomeIcon icon={faHouse} />
              <p className="ml-2"> Home</p>
            </li>
            <li
              onClick={() => setSelected(true)}
              className={`  p-2 rounded-lg text-sm tracking-wider cursor-pointer hover:bg-white hover:text-[#6C63FF] flex items-center`}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <p className="ml-2"> Search</p>
            </li>
            <li
              onClick={() => router.push("/inbox")}
              className={`${
                router.pathname === "/inbox"
                  ? "bg-[#f6f6f6] font-bold text-[#6C63FF]"
                  : null
              } hover:font-bold  p-2 rounded-lg text-sm tracking-wider cursor-pointer hover:bg-white hover:text-[#6C63FF] flex items-center`}
            >
              <FontAwesomeIcon icon={faInbox} />
              <p className="ml-2"> Chat</p>
            </li>
            <li
              onClick={() => router.push("/")}
              className={`${
                router.pathname === "/notifications"
                  ? "bg-[#f6f6f6] font-bold text-[#6C63FF]"
                  : null
              } hover:font-bold  p-2 rounded-lg text-sm tracking-wider cursor-pointer hover:bg-white hover:text-[#6C63FF] flex items-center`}
            >
              {" "}
              <FontAwesomeIcon icon={faBell} />
              <p className="ml-2"> Notifications</p>
            </li>
            <li
              onClick={() => router.push("/help")}
              className={`${
                router.pathname === "/help"
                  ? "bg-[#f6f6f6] font-bold text-[#6C63FF]"
                  : null
              } hover:font-bold  p-2 rounded-lg text-sm tracking-wider cursor-pointer hover:bg-white hover:text-[#6C63FF] flex items-center`}
            >
              <FontAwesomeIcon icon={faCircleQuestion} />
              <p className="ml-2"> Help</p>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <button
          onClick={logOut}
          className="text-white w-full flex items-center justify-center bg-[#6C63FF] px-6 py-2 text-sm  rounded-full  tracking-wide hover:bg-[#6C63FF]/80 transition-all hover:shadow-2xl"
        >
          Sign Out
          <FontAwesomeIcon icon={faRightToBracket} className="ml-2" />
        </button>
      </div>
    </motion.div>
  );
};

export default Drawer;
