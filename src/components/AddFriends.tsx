import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useAuth } from "../context/AuthContext";

const AddFriends = () => {
  const { user } = useAuth();

  return (
    <div className="bg-[#1A1A1A] w-full xl:w-[350px] xl:min-w-[310px] rounded-xl my-5">
      <div className="w-[90%] mx-auto">
        <div className=" flex  flex-col  pt-5 pb-3 pl-3 pr-2 justify-between">
          <h1 className=" text-sm tracking-wider">Friends List</h1>
          <div className="flex items-center justify-between mt-5 mb-1">
            <div className="flex items-center ">
              <img
                alt="User Pic"
                src={
                  "https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg?w=2000"
                }
                className="rounded-full h-[50px] object-contain"
              />
              <div className="flex flex-col ml-3 justify-start">
                <p className="text-sm font-bold000000000000000000">
                  {user?.displayName || user?.email}
                </p>
                <p className="text-gray-100/20 text-xs">3 Followers</p>
              </div>
            </div>

            <FontAwesomeIcon
              icon={faUserPlus}
              className="bg-[#104a56] p-2 rounded-full text-sm cursor-pointer"
            />
          </div>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center ">
              <img
                alt="User Pic"
                src={
                  "https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg?w=2000"
                }
                className="rounded-full h-[50px] object-contain"
              />
              <div className="flex flex-col ml-3 justify-start">
                <p className="text-sm font-bold000000000000000000">
                  {user?.displayName || user?.email}
                </p>
                <p className="text-gray-100/20 text-xs">3 Followers</p>
              </div>
            </div>

            <FontAwesomeIcon
              icon={faUserPlus}
              className="bg-[#104a56] p-2 rounded-full text-sm cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFriends;
