import Navbar from "../components/Navbar";
import { GetServerSideProps } from "next";
import axios from "axios";
import UserCard from "../components/UserCard";
import PostAdd from "../components/PostAdd";
import Post from "../components/Post";
import { useEffect, useState } from "react";
import Drawer from "../components/Drawer";
import { useAuth } from "../context/AuthContext";
import AddFriends from "../components/AddFriends";
import Annouce from "../components/Annouce";
import { supabase } from "../lib/supabase";
import { PostType } from "../types/typing";
import ModalUserInfo from "../components/ModalUserInfo";
import ConfirmEmail from "../components/ConfirmEmail";
import { BASE_URL } from "../lib/baseUrls";
import { useDispatch } from "react-redux";
import { addFriend } from "../redux/slices/friendsSlice";

type Data = {
  id: number;
  name: string;
};

type Props = {
  posts: PostType[];
};
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

export default function Home(props: Props) {
  const [open, setOpen] = useState(false);
  const [openUserModal, setOpenUserModal] = useState(false);
  const [posts, setPosts] = useState<PostType[]>([]);
  const dispatch = useDispatch();

  const { user, setUser } = useAuth();

  useEffect(() => {
    if (open) {
      disableScrolling();
      return;
    } else {
      enableScrolling();
    }
  }, [open]);

  useEffect(() => {
    fetch("http://localhost:3000/api/post")
      .then((res) => res.json())
      .then((data) => setPosts(data.posts));
  }, []);

  useEffect(() => {
    if (!user) return;
    fetch(`${BASE_URL}/api/friend/${user?.id}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(addFriend(data.friend[0]?.friends));
      });
  }, [user]);

  //console.log({name: user.displayName});

  useEffect(() => {
    if (user?.displayName) {
      setOpenUserModal(false);
      return;
    }
    setOpenUserModal(true);
  }, [user]);

  return (
    <div className="min-h-screen bg-[#0d0d0d] w-full relative overflow-x-hidden ">
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
        <div className="mx-auto  w-[90%] mt-5 flex flex-col xl:flex-row items-start xl:space-x-10 ">
          <div className="w-full xl:w-fit hidden xl:flex xl:flex-col">
            <UserCard />
            <ConfirmEmail />
          </div>

          <div className="flex flex-col flex-grow w-full xl:w-fit my-5 xl:my-0 space-y-4">
            <PostAdd posts={posts} setPosts={setPosts} />
            {posts
              .sort(function (a, b) {
                return (
                  new Date(b.created_at).getTime() -
                  new Date(a.created_at).getTime()
                );
              })
              .map((post, index) => (
                <Post
                  key={post._id}
                  post={post}
                  lastPost={posts.length - 1 === index}
                  setPosts={setPosts}
                  posts={posts}
                />
              ))}
          </div>
          <div className="flex flex-col">
            <Annouce />
            <AddFriends />
          </div>
          <div className="w-full xl:w-fit xl:hidden mb-4">
            <UserCard />
          </div>
        </div>{" "}
      </div>
    </div>
  );
}
