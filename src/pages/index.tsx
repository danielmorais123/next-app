import Navbar from "../components/Navbar";
import UserCard from "../components/UserCard";
import PostAdd from "../components/PostAdd";
import Post from "../components/Post";
import { useEffect, useState } from "react";
import Drawer from "../components/Drawer";
import { useAuth } from "../context/AuthContext";
import AddFriends from "../components/AddFriends";
import Annouce from "../components/Annouce";
import { PostType } from "../types/typing";
import ModalUserInfo from "../components/ModalUserInfo";
import ConfirmEmail from "../components/ConfirmEmail";
import { BASE_URL } from "../lib/baseUrls";
import { useDispatch, useSelector } from "react-redux";
import { addFriend } from "../redux/slices/friendsSlice";
import { selectPosts, setPosts } from "../redux/slices/postSlice";

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
  const [openUserModal, setOpenUserModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const posts: PostType[] = useSelector(selectPosts);
  const { user, setUser } = useAuth();

  console.log({ posts });

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
      .then((data) => {
        console.log({ data });
        dispatch(setPosts(data.posts));
      });
  }, []);

  useEffect(() => {
    if (!user) return;
    fetch(`${BASE_URL}/api/friend/${user?.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.friend[0]?.friends) return;
        dispatch(addFriend(data.friend[0]?.friends));
      });
  }, [user]);

  //console.log({name: user.displayName});

  useEffect(() => {
    if (!user) return;
    if (user?.displayName) {
      setOpenUserModal(false);
      return;
    }
    setOpenUserModal(true);
  }, [user]);

  return (
    <div className="min-h-screen bg-[#222222] w-full relative overflow-x-hidden ">
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
        <div className="mx-auto  w-[95%] mt-5 flex flex-col xl:flex-row items-start xl:space-x-10 ">
          <div className="w-full xl:w-fit hidden xl:flex xl:flex-col">
            <UserCard />
            <ConfirmEmail />
          </div>

          <div className="flex flex-col flex-grow w-full xl:w-fit my-5 xl:my-0 space-y-4">
            <PostAdd />
            {posts
              .sort(function (a, b) {
                return (
                  /* @ts-ignore */
                  new Date(b.created_at).getTime() -
                  /* @ts-ignore */ new Date(
                    a.created_at
                  ).getTime() /* @ts-ignore */
                );
              })
              .map((post, index) => (
                <Post
                  key={post._id}
                  post={post}
                  lastPost={posts.length - 1 === index}
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
