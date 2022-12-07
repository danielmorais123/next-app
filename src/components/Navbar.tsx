import { auth } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signOut } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBell,
  faMoon,
  faCircleQuestion,
  faInbox,
  faCircle,
  faRightToBracket,
  faBars,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { signInWithGoogle } from "../lib/authfunctions";
import { useEffect } from "react";
import { User } from "../types/typing";
import { useRouter } from "next/router";
import { Badge, Dropdown, MenuProps } from "antd";
import { poppins } from "../fonts/fonts";

const Navbar = (props: any) => {
  const { user, setUser } = useAuth();
  const { setOpen } = props;
  const router = useRouter();
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div className=" w-full max-w-[240px]">
          {" "}
          <div className="flex items-center">
            <img
              className="h-[60px] object-contain"
              src="https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg?w=2000"
            />
            <div className={`${poppins.className} ml-1 text-xs`}>
              <p className="tracking-wider font-bold">Paulo Pinto</p>
              <p className="text-[12px] text-gray-500/80">Paulo has commented your post. </p>
            </div>
          </div>{" "}
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className=" w-full max-w-[240px]">
          {" "}
          <div className="flex items-center">
            <img
              className="h-[60px] object-contain"
              src="https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg?w=2000"
            />
            <div className={`${poppins.className} ml-1 text-xs`}>
              <p className="tracking-wider font-bold">Paulo Pinto</p>
              <p className="text-[12px] text-gray-500/80">Paulo has commented your post. </p>
            </div>
          </div>{" "}
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div className=" w-full max-w-[240px]">
        {" "}
        <div className="flex items-center">
          <img
            className="h-[60px] object-contain"
            src="https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg?w=2000"
          />
          <div className={`${poppins.className} ml-1 text-xs`}>
            <p className="tracking-wider font-bold">Paulo Pinto</p>
            <p className="text-[12px] text-gray-500/80">Paulo has commented your post. </p>
          </div>
        </div>{" "}
      </div>
      ),
    },
    {
      key: "4",
      label: (
        <div className=" w-full max-w-[240px]">
        {" "}
        <div className="flex items-center">
          <img
            className="h-[60px] object-contain"
            src="https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg?w=2000"
          />
          <div className={`${poppins.className} ml-1 text-xs`}>
            <p className="tracking-wider font-bold">Paulo Pinto</p>
            <p className="text-[12px] text-gray-500/80">Paulo has commented your post. </p>
          </div>
        </div>{" "}
      </div>
      ),
    },
    {
      key: "5",
      label: (
        <div className="  w-[270px]">
        {" "}
        <div className="flex items-center">
          <img
            className="h-[60px] object-contain"
            src="https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg?w=2000"
          />
          <div className={`${poppins.className} ml-1 text-xs`}>
            <p className="tracking-wider font-bold">Paulo Pinto</p>
            <p className="text-[12px] text-gray-500/80">Paulo has commented your post. </p>
          </div>
        </div>{" "}
      </div>
      ),
    },
  ];

  const logOut = async () => {
    await signOut(auth);
    router.push("/auth/login");
  };

  return (
    <div className={`w-full  bg-[#1A1A1A] h-[70px]  mx-auto flex items-center`}>
      <div className="w-[90%] mx-auto flex items-center justify-between">
        <form className="relative cursor-pointer ">
          <input
            type="text"
            placeholder="Search..."
            className="h-8 w-[20px]  md:w-[250px] py-5 pl-7 rounded-lg border-none text-sm outline-none tracking-wide bg-[#2c2c2c] placeholder-gray-400"
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute md:right-5 text-gray-400 top-3 right-3 md:top-3"
          />
        </form>
        <div className="flex items-center">
          <ul className="md:flex space-x-7 items-center hidden ">
            <li>
              <FontAwesomeIcon icon={faUser} className="cursor-pointer w-[15px] h-[15px]" />
            </li>{" "}
            <li>
              <FontAwesomeIcon icon={faInbox} />
            </li>
            <li>
              {" "}
              <Dropdown
              
                menu={{ items }}
                placement="bottomRight"
                arrow={{ pointAtCenter: true }}
                trigger={["click"]}
              >
                <Badge dot={true}><FontAwesomeIcon icon={faBell} className="cursor-pointer w-[16px] h-[16px] text-white" /></Badge>
                
              </Dropdown>
            </li>
            <li>
              <FontAwesomeIcon icon={faCircleQuestion} />
            </li>
          </ul>
          {user ? (
            <button
              onClick={logOut}
              className="md:ml-5  bg-red-500 hover:bg-red-500/80 transition-all py-2 px-3 rounded-md text-xs flex items-center"
            >
              Sign Out{" "}
              <FontAwesomeIcon icon={faRightToBracket} className="ml-2" />
            </button>
          ) : (
            <button
              onClick={() => router.push("/auth/login")}
              className="md:ml-5  bg-blue-500 hover:bg-blue-500/80 transition-all py-2 px-3 rounded-md text-xs flex items-center"
            >
              Sign In{" "}
              <FontAwesomeIcon icon={faRightToBracket} className="ml-2" />
            </button>
          )}
          <FontAwesomeIcon
            className="ml-3 cursor-pointer md:hidden"
            icon={faBars}
            onClick={() => setOpen(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
