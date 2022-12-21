import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { addFriend, selectFriends } from "../../redux/slices/friendsSlice";
import { FriendsList } from "../../types/typing";
import { BASE_URL } from "../../lib/baseUrls";
import { STORAGE_URL } from "../../lib/supabase";

import ModalUserInfo from "../../components/ModalUserInfo";
import Drawer from "../../components/Drawer";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/router";

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

const Index = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const friends: FriendsList[] = useSelector(selectFriends);
  const [open, setOpen] = useState<boolean>(false);
  const [openUserModal, setOpenUserModal] = useState<boolean>(false);
 
  useEffect(() => {
    if (open) {
      disableScrolling();
      return;
    } else {
      enableScrolling();
    }
  }, [open]);

  useEffect(() => {
    if (!user) return;
    fetch(`${BASE_URL}/api/friend/${user?.id}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(addFriend(data.friend[0]?.friends));
      });
  }, [user]);

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
          <div className="mx-auto  w-[95%] mt-5 flex flex-col items-start ">
            <h1>Friends</h1>
            <ul className="">
              {friends.map((friend) => (
                <li key={friend?.friendId} className="text-white">
                  <img
                    alt="User Pic"
                    onError={(e) =>
                      /* @ts-ignore */
                      (document.getElementById(`${friend?.user?.id}`).src =
                        "https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg?w=2000")
                    }
                    src={`${friend.user?.photoUrl}`}
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

export default Index;
