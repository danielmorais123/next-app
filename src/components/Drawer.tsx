import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faCircleQuestion,
  faHouse,
  faInbox,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/router";
import { anton } from "../fonts/fonts";

const Drawer = ({ setOpen }) => {
  const router = useRouter();

  const logOut = async () => {
    await signOut(auth);
    router.push("/auth/login");
  };

  console.log({path: router.pathname})

  return (
    <motion.div
      initial={{ x: 300 }}
      whileInView={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className="h-screen bg-[#4e4e4e] absolute right-0 z-[9999] w-[330px] p-5 rounded-l-xl flex flex-col justify-between shadow-2xl"
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
        <div className="mt-5 w-[85%]">
          <ul>
            <li className="bg-[#f6f6f6] font-bold text-[#6C63FF] p-2 rounded-lg text-sm tracking-wider cursor-pointer hover:bg-white flex items-center">
              <FontAwesomeIcon icon={faHouse} />
              <p className="ml-2"> Home</p>
            </li>
            <li className=" text-white p-2 hover:text-[#6C63FF]  rounded-lg text-sm tracking-wider cursor-pointer hover:bg-white flex items-center transition-all">
              <FontAwesomeIcon icon={faInbox} />
              <p className="ml-2"> Chat</p>
            </li>
            <li className=" text-white p-2 hover:text-[#6C63FF] rounded-lg text-sm tracking-wider cursor-pointer hover:bg-white flex items-center transition-all">
              {" "}
              <FontAwesomeIcon icon={faBell} />
              <p className="ml-2"> Notifications</p>
            </li>
            <li className=" text-white p-2 rounded-lg hover:text-[#6C63FF] text-sm tracking-wider cursor-pointer hover:bg-white flex items-center transition-all">
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
