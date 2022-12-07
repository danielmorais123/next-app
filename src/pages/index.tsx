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

  const { user } = useAuth();
  useEffect(() => {
    if (open) {
      disableScrolling();
      return;
    } else {
      enableScrolling();
    }
  }, [open]);

  const { posts } = props;
  console.log({ posts });
  return (
    <div className="min-h-screen bg-[#0d0d0d] w-full relative overflow-x-hidden ">
      {" "}
      {open ? <Drawer setOpen={setOpen} /> : null}
      <div className={`${open ? " pointer-events-none blur-sm" : null}`}>
        <Navbar setOpen={setOpen} />
        <div className="mx-auto  w-[90%] mt-5 flex flex-col xl:flex-row items-start xl:space-x-10 ">
          <div className="w-full xl:w-fit hidden xl:flex">
            <UserCard />
          </div>

          <div className="flex flex-col flex-grow w-full xl:w-fit my-5 xl:my-0 space-y-4">
            <PostAdd />
            {posts.map((post, index) => (
              <Post
                key={post.id}
                post={post}
                lastPost={posts.length - 1 === index}
              />
            ))}
          </div>
          <div className="flex flex-col">
            <Annouce />
            <AddFriends />
          </div>
          <div className="w-full xl:w-fit xl:hidden">
            <UserCard />
          </div>
        </div>{" "}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch("http://localhost:3000/api/post");

  const posts = await response.json();
  console.log({ postsMap: posts });
  return { props: posts };
};
