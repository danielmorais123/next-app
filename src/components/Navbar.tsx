import { useState } from "react";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBell,
  faCircleQuestion,
  faInbox,
  faRightToBracket,
  faBars,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Badge, Dropdown, Menu, MenuProps } from "antd";
import { anton, poppins } from "../fonts/fonts";
import { BASE_URL } from "../lib/baseUrls";
import { Notification } from "../types/typing";
import { useDispatch } from "react-redux";
import { addFriend } from "../redux/slices/friendsSlice";

const Navbar = (props: any) => {
  const dispath = useDispatch();

  const [notifications, setNotifications] = useState<Notification>();
  const { user } = useAuth();
  const { setOpen } = props;
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    fetch(`${BASE_URL}/api/notifications/${user?.id}`)
      .then((data) => data.json())
      .then((res) => {
        setNotifications(res[0]);
      });
  }, [user]);

 
  let menus = (
    <div
      key="1"
      className="cursor-pointer transition-all hover:bg-gray-100 w-[350px]"
    >
      {" "}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            className="h-[60px] object-contain"
            src="https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg?w=2000"
          />
          <div className={`${poppins.className} ml-1 text-xs`}>
            <p className="tracking-wider font-bold">No notifications yet</p>
          </div>
        </div>
      </div>{" "}
    </div>
  );

  if (notifications?.notifications?.length > 0) {
    menus = Object.entries(notifications?.notifications).map((key) => {
      return (
        <div
          key={key[0]}
          className="cursor-pointer transition-all hover:bg-gray-100 w-[350px]"
        >
          {" "}
          <div className="flex flex-col h-[70px]">
            <div className="flex items-center h-full ">
              <img
                className="h-full  object-contain"
                src="https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg?w=2000"
              />
              <div className="flex flex-col justify-center ml-1">
                <div className={`${poppins.className}  text-xs`}>
                  <p className="tracking-wider font-bold">
                    {key[1]?.userSender?.displayName}
                  </p>
                  <p className="text-[12px] text-gray-500/80">
                    {key[1]?.description}
                  </p>
                </div>
                <div className={` flex flex-col ml-0  ${poppins.className}`}>
                  <span
                    className={`text-[10px] ${poppins.className} font-bold`}
                  >
                    {new Date(key[1]?.created_at).toDateString()} -
                    {new Date(key[1]?.created_at).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
      );
    });
  }

  const logOut = async () => {
    await signOut(auth);
    router.push("/auth/login");
  };

  return (
    <div className={`w-full  bg-[#1A1A1A] h-[70px]  mx-auto flex items-center`}>
      <div className="w-[90%] mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <p
            className={`tracking-wide text-2xl text-[#6C63FF] leading-10 ${anton.className} `}
          >
            Social Network{" "}
          </p>
        
        </div>
        <div className="md:w-[30%] mx-auto">
          <form className="relative cursor-pointer hidden md:flex">
            <input
              type="text"
              placeholder="Search..."
              className="h-8 w-[20px]  md:w-full py-5 pl-7 rounded-lg border-none text-sm outline-none tracking-wide bg-[#2c2c2c] placeholder-gray-400"
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute md:right-5 text-gray-400 top-3 right-3 md:top-3"
            />
          </form>
        </div>
        <div className="flex items-center">
          <ul className="md:flex space-x-7 items-center hidden ">
            <li>
              <FontAwesomeIcon
                icon={faUser}
                className="cursor-pointer w-[15px] h-[15px]"
              />
            </li>{" "}
            <li>
              <FontAwesomeIcon icon={faInbox} />
            </li>
            <li>
              {" "}
              <Dropdown
                overlay={
                  notifications?.notifications?.length === 0 ? (
                    <Menu>No notifications yet</Menu>
                  ) : (
                    <Menu>{menus}</Menu>
                  )
                }
                placement="bottomRight"
                arrow={{ pointAtCenter: true }}
                trigger={["click"]}
              >
                <Badge dot={true}>
                  <FontAwesomeIcon
                    icon={faBell}
                    className="cursor-pointer w-[16px] h-[16px] text-white"
                  />
                </Badge>
              </Dropdown>
            </li>
            <li>
              <FontAwesomeIcon icon={faCircleQuestion} />
            </li>
          </ul>
          {user ? (
            <button
              onClick={logOut}
              className="md:ml-5 hidden  bg-red-500 hover:bg-red-500/80 transition-all py-2 px-3 rounded-md text-xs xs:flex items-center"
            >
              Sign Out{" "}
              <FontAwesomeIcon icon={faRightToBracket} className="ml-2" />
            </button>
          ) : (
            <button
              onClick={() => router.push("/auth/login")}
              className="md:ml-5 hidden bg-blue-500 hover:bg-blue-500/80 transition-all py-2 px-3 rounded-md text-xs xs:flex items-center"
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
