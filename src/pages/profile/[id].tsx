import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { addFriend, selectFriends } from "../../redux/slices/friendsSlice";
import { FriendsList } from "../../types/typing";
import { BASE_URL } from "../../lib/baseUrls";

import ModalUserInfo from "../../components/ModalUserInfo";
import Drawer from "../../components/Drawer";
import Navbar from "../../components/Navbar";
import { STORAGE_URL } from "../../lib/supabase";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
function disableScrolling() {
  var x = window.scrollX;
  var y = window.scrollY;
  window.onscroll = function () {
    window.scrollTo(x, y);
  };
}

function enableScrolling() {
  window.onscroll = function () {};
}

const ProfileUser = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const router = useRouter();
  const friends: FriendsList[] = useSelector(selectFriends);
  const [open, setOpen] = useState<boolean>(false);
  const [openUserModal, setOpenUserModal] = useState<boolean>(false);
  const { id } = router.query;

  console.log({ id });

  useEffect(() => {
    if (open) {
      disableScrolling();
      return;
    } else {
      enableScrolling();
    }
  }, [open]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/friend/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });
        if (data.friend.length > 0) {
          dispatch(addFriend(data.friend[0]?.friends));
        }
      });
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#1a1a1a] relative overflow-x-hidden">
      <div className="min-h-screen bg-[#242424] w-full  ">
        {" "}
        {open ? <Drawer setOpen={setOpen} /> : null}
        {openUserModal ? (
          <ModalUserInfo
            openUserModal={openUserModal}
            setOpenUserModal={setOpenUserModal}
          />
        ) : null}
        <div className={`${open ? " pointer-events-none blur-sm" : null}`}>
          <Navbar setOpen={setOpen} />
          <div className="mx-auto w-[95%] lg:w-[75%] max-w-[400px] mt-5 flex flex-col items-start bg-[#1A1A1A] rounded-xl ">
            <h1 className="text-lg px-5 mt-2">Friends</h1>
            <ul className=" w-[200px] px-5 pb-3">
              {friends.map((friend) => (
                <li key={friend?.friendId} className="text-white">
                  <img
                    //  alt="User Pic"
                    id={`friends_user_${friend.user?.id}`}
                    onError={(e) =>
                      /* @ts-ignore */
                      (e.target.src =
                        "https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg?w=2000")
                    }
                    src={`${
                      (friend?.user?.provider === "Google" ||
                        friend?.user?.provider === "Facebook") &&
                      friend?.user?.photoUrl?.startsWith("http")
                        ? friend.user?.photoUrl
                        : `${STORAGE_URL}/${friend?.user?.photoUrl}`
                    }`}
                    className="rounded-xl h-20"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context): GetServerSideProps {
  console.log({ context });
  return {
    props: {},
  };
}

export default ProfileUser;
