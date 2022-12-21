import {
  faCircleCheck,
  faCircleXmark,
  faEnvelopeCircleCheck,
  faUserPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { BASE_URL } from "../lib/baseUrls";
import { FriendsList, UserToAdd } from "../types/typing";
import { useDispatch } from "react-redux";
import {
  addFriend,
  removeFriend,
  selectFriends,
} from "../redux/slices/friendsSlice";
import { useSelector } from "react-redux";

const AddFriends = () => {
  const { user } = useAuth();
  const [toAddUsers, setToAddUsers] = useState<UserToAdd[]>([]);
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  const friends: FriendsList[] = useSelector(selectFriends);

  useEffect(() => {
    fetch(`${BASE_URL}/api/users`)
      .then((res) => res.json())
      .then((data) => setToAddUsers(data.users));
  }, []);

  const acceptFriend = (friendId: string, toAddUser: UserToAdd) => {
    fetch(`${BASE_URL}/api/friend`, {
      method: "PUT",
      mode: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user?.id,
        friendId,
        toAddUser,
        type: "Accept Friend Request",
        user,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setErr(data.status);
          return;
        }
        dispatch(addFriend(data?.friendsUser[0]?.friends));
      });
  };

  const declineFriend = (friendId: string, toAddUser: UserToAdd) => {
    fetch(`${BASE_URL}/api/friend`, {
      method: "PUT",
      mode: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user?.id,
        friendId,
        toAddUser,
        type: "Decline Friend Request",
        user,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });
        if (data.status) {
          setErr(data.status);
          return;
        }
        dispatch(removeFriend(friendId));
      });
  };

  const addNewFriend = (friendId: string, toAddUser: UserToAdd) => {
    fetch(`${BASE_URL}/api/friend`, {
      method: "PUT",
      mode: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user?.id,
        friendId,
        toAddUser,
        type: "Friend Request",
        user,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setErr(data.status);
          return;
        }
        dispatch(addFriend(data?.friendsUser[0]?.friends));
      });
  };

  return (
    <div className="bg-[#1A1A1A] w-full xl:w-[350px] xl:min-w-[310px] rounded-xl my-5">
      <div className="w-[90%] mx-auto">
        <div className=" flex  flex-col  pt-5 pb-3 pl-3 pr-2 justify-between">
          <h1 className=" text-sm tracking-wider">Friends List</h1>
          {toAddUsers.map((toAddUser: UserToAdd) => {
            if (toAddUser?.uid === user?.uid) return;
            return (
              <div className="flex items-center justify-between mt-5 mb-1">
                <div className="flex items-center ">
                  <img
                    /* @ts-ignore */
                    id={`${toAddUser?._id}`}
                    alt="User Pic"
                    onError={(e) =>
                      /* @ts-ignore */
                      (document.getElementById(`${toAddUser._id}`).src =
                        "https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg?w=2000")
                    }
                    src={
                      toAddUser.photoUrl
                        ? toAddUser?.photoUrl
                        : "https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg?w=2000"
                    }
                    className="rounded-full h-[50px] object-contain"
                  />
                  <div className="flex flex-col ml-3 justify-start">
                    <p className="text-sm font-bold000000000000000000">
                      {toAddUser?.displayName || toAddUser?.email}
                    </p>
                    <p className="text-gray-100/20 text-xs">3 Followers</p>
                  </div>
                </div>
                {friends?.some(
                  (friend) =>
                    friend.friendId === toAddUser?._id &&
                    friend.sent === true &&
                    friend?.status === "pending"
                ) ? (
                  <FontAwesomeIcon
                    icon={faEnvelopeCircleCheck}
                    className="bg-indigo-500 p-2 rounded-full text-sm cursor-pointer"
                  />
                ) : null}
                {friends?.some(
                  (friend) =>
                    friend.friendId === toAddUser._id &&
                    friend.sent === false &&
                    friend?.status === "pending"
                ) ? (
                  <div className="flex items-center space-x-1">
                    {" "}
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="bg-green-500 p-2 rounded-full text-sm cursor-pointer"
                      onClick={
                        () =>
                          /* @ts-ignore */ acceptFriend(
                            toAddUser?._id,
                            toAddUser
                          ) /* @ts-ignore */
                      }
                    />
                    <FontAwesomeIcon
                      icon={faCircleXmark}
                      className="bg-red-500 p-2 rounded-full text-sm cursor-pointer"
                      onClick={() => declineFriend(toAddUser?._id, toAddUser)}
                    />
                  </div>
                ) : null}
                {!friends?.some(
                  (friend) => friend.friendId === toAddUser._id
                ) ? (
                  <FontAwesomeIcon
                    icon={faUserPlus}
                    className="bg-blue-600 p-2 rounded-full text-sm cursor-pointer"
                    onClick={
                      () =>
                        /* @ts-ignore */ addNewFriend(
                          toAddUser?._id,
                          toAddUser
                        ) /* @ts-ignore */
                    }
                  />
                ) : null}
                {friends?.some(
                  (friend) =>
                    friend.friendId === toAddUser._id &&
                    friend?.status === "accepted"
                ) ? (
                  <FontAwesomeIcon
                    icon={faUsers}
                    className="bg-blue-600 p-2 rounded-full text-sm "
                    onClick={
                      () =>
                        /* @ts-ignore */ addNewFriend(
                          toAddUser?._id,
                          toAddUser
                        ) /* @ts-ignore */
                    }
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AddFriends;
