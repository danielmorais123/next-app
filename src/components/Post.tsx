import {
  faCircleCheck,
  faCircleXmark,
  faComment,
  faEnvelopeCircleCheck,
  faShare,
  faThumbsUp,
  faUserPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { FriendsList, PostType, User, UserToAdd } from "../types/typing";
import { STORAGE_URL } from "../lib/supabase";
import { BASE_URL } from "../lib/baseUrls";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { addFriend, removeFriend, selectFriends } from "../redux/slices/friendsSlice";

interface PostProps {
  post: PostType;
  lastPost: boolean;
  posts: PostType[];
  setPosts: Dispatch<SetStateAction<PostType[]>>;
}

interface Comment {
  created_at: string;
  comment: string;
  user: User;
}

const Post = (props: PostProps) => {
  const { post, posts, setPosts } = props;
  const { user } = useAuth();
  const [comment, setComment] = useState<boolean>(false);
  const [theComment, setTheComment] = useState<string>("");
  const [displayComment, setDisplayComment] = useState<Comment>();
  const [err, setErr] = useState("false");
  const router = useRouter();
  const friends: FriendsList[] = useSelector(selectFriends);
  const dispatch = useDispatch();

  console.log({ friends });

  useEffect(() => {
    if (post?.comments?.length === 0) return;
    setDisplayComment(
      /* @ts-ignore */ post?.comments?.sort(
        (a: Comment, b: Comment) => a.created_at - b.created
      )[post?.comments?.length - 1]
    );
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
  // TO DO DECLINE BACKEND
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

  // Add like to a post in the database
  const likePost = () => {
    fetch(`${BASE_URL}/api/post/like`, {
      method: "POST",
      mode: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: post?._id,
        user,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount === 1) {
          const newState = posts.map((p) => {
            if (p?._id === post?._id) {
              /* @ts-ignore */ let newLikes = [
                ...p?.likes,
                {
                  id: user?.id,
                },
              ];
              return { ...p, likes: newLikes };
            }

            // 👇️ otherwise return object as is
            return p;
          });
          /* @ts-ignore */
          setPosts(newState);
        } else {
          setErr("Can't like right now. Try again later.");
        }
      });
  };

  // Add unlike to a post in the database
  const dislikePost = () => {
    fetch(`${BASE_URL}/api/post/dislike`, {
      method: "POST",
      mode: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: post?._id,
        user,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount === 1) {
          const newState = posts.map((p) => {
            if (p?._id === post?._id) {
              /* @ts-ignore */
              let newLikes = [...p?.likes];

              let index = newLikes.findIndex((x) => x?.id === user?.id);

              newLikes.splice(index, 1);
              // console.log({ newLikes });
              return { ...p, likes: newLikes };
            }

            // 👇️ otherwise return object as is
            return p;
          });
          /* @ts-ignore */
          setPosts(newState);
        } else {
          setErr("Can't unlike right now. Try again later.");
        }
      });
  };

  // Add a comment to a post in the database
  const addComment = (e: React.FormEvent) => {
    e.preventDefault();
    let created_at = new Date();
    fetch(`${BASE_URL}/api/post/${post?._id}/addComment`, {
      method: "POST",
      mode: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: post._id,
        comment: theComment,
        user,
        created_at,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.myPost.modifiedCount === 1) {
          setDisplayComment({
            comment: theComment,
            user,
            created_at: data.created_at,
          });
          setTheComment("");
        } else {
          setErr("Your comment hasn't been added. Try later.");
        }
      });
  };

  useEffect(() => {
    if (!err) return;
    if (comment) return;
    setErr("");
  }, [comment]);
  /* @ts-ignore */
  const trya = post?.likes?.some((x) => x.id == user?.id);
  return (
    <div
      className={`${
        props.lastPost ? "!my-4 " : null
      } flex bg-[#1A1A1A] rounded-xl `}
    >
      <div className=" w-[95%] mx-auto p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              alt="User Pic"
              src={
                "https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg?w=2000"
              }
              className="rounded-full h-[50px] object-contain"
            />
            <div className="flex flex-col  ml-3">
              <p className="text-sm">
                {" "}
                {post?.user?.displayName || post?.user?.email}
              </p>
              <p className="text-xs text-gray-100/20">
                {
                  /* @ts-ignore */ new Date(
                    post?.created_at
                  ).toDateString() /* @ts-ignore */
                }
                {
                  /* @ts-ignore */ new Date(
                    post?.created_at
                  ).toLocaleTimeString()
                }
              </p>
            </div>
          </div>

          {friends?.some(
            (friend) =>
              friend.friendId === post?.user.id &&
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
              friend.friendId === post?.user.id &&
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
                      post?.user?.id,
                      post?.user
                    ) /* @ts-ignore */
                }
              />
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="bg-red-500 p-2 rounded-full text-sm cursor-pointer"
                onClick={
                  () =>
                    /* @ts-ignore */ declineFriend(
                      post?.user?.id,
                      post?.user
                    ) /* @ts-ignore */
                }
              />
            </div>
          ) : null}
          {!friends?.some((friend) => friend.friendId === post?.user.id) &&
          post?.user.id !== user?.id ? (
            <FontAwesomeIcon
              icon={faUserPlus}
              className="bg-blue-600 p-2 rounded-full text-sm "
              onClick={
                () =>
                  /* @ts-ignore */ addNewFriend(
                    post?.user?.id,
                    post?.user
                  ) /* @ts-ignore */
              }
            />
          ) : null}
          {friends?.some(
            (friend) =>
              friend.friendId === post?.user.id && friend?.status === "accepted"
          ) ? (
            <FontAwesomeIcon
              icon={faUsers}
              className="bg-blue-600 p-2 rounded-full text-sm cursor-pointer"
              onClick={
                () =>
                  /* @ts-ignore */ addNewFriend(
                    post?.user?.id,
                    post?.user
                  ) /* @ts-ignore */
              }
            />
          ) : null}
        </div>
        <div className="mt-5 flex flex-col ">
          <p className="text-sm text-gray-300/80 pl-1">{post?.comment}</p>
          {post.fileName ? (
            <img
              src={`${STORAGE_URL}${post?.fileName}`}
              className="w-full object-contain rounded-lg mt-3"
            />
          ) : null}
          <div className="flex items-center mt-3">
            {post?.likes?.some(
              /* @ts-ignore */
              (userWhoLikes) => user?.id === userWhoLikes.id
            ) ? (
              <div
                className={`flex items-center cursor-pointer text-blue-500 hover:text-gray-400 transition-all  px-2`}
                onClick={dislikePost}
              >
                <FontAwesomeIcon icon={faThumbsUp} className="" />
                <p
                  className={`hidden xs:flex text-xs text-gray-300/80  ml-2`}
                ></p>
              </div>
            ) : (
              <div
                className={`flex items-center cursor-pointer hover:text-blue-500  transition-all  px-2`}
                onClick={likePost}
              >
                <FontAwesomeIcon icon={faThumbsUp} className="" />
                <p
                  className={`hidden xs:flex text-xs text-gray-300/80  ml-2`}
                ></p>
              </div>
            )}

            <div
              className="flex items-center cursor-pointer hover:opacity-10 transition-all  px-2 "
              onClick={() => {
                if (user) {
                  setComment(!comment);
                }
              }}
            >
              <FontAwesomeIcon icon={faComment} className="" />
              <p className="text-xs hidden xs:flex text-gray-300/80  ml-2"></p>
            </div>
            <div className="flex items-center cursor-pointer hover:opacity-30 transition-all  px-2">
              <FontAwesomeIcon icon={faShare} className="" />
              <p className="text-xs hidden xs:flex text-gray-300/80  ml-2"></p>
            </div>
          </div>
          {post?.comments?.length && post?.comments?.length > 0 ? (
            <>
              <p className="text-[10px] pl-1 mt-2 text-gray-400 tracking-wider cursor-pointer">
                See the other {post?.comments?.length - 1} comments{" "}
              </p>
              <div className="flex items-center mt-2">
                <img
                  alt="User Pic"
                  src={
                    "https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg?w=2000"
                  }
                  className=" flex rounded-full h-[30px] object-contain"
                />
                <div className="flex flex-row items-start justify-between w-full ">
                  <div className="flex flex-col ml-3">
                    <p className="text-xs text-gray-300">
                      {" "}
                      {displayComment?.user?.displayName ||
                        displayComment?.user?.email}
                    </p>
                    <p className="text-[13px]  text-gray-200">
                      {displayComment?.comment}
                    </p>
                  </div>

                  <p className="text-[10px] text-gray-100/20 flex space-x-1">
                    <span>
                      {
                        /* @ts-ignore */ new Date(
                          displayComment?.created_at
                        ).toDateString()
                      }{" "}
                    </span>
                    <span className="hidden xs:flex">
                      {
                        /* @ts-ignore */ new Date(
                          displayComment?.created_at
                        ).toLocaleTimeString()
                      }
                    </span>
                  </p>
                </div>
              </div>
            </>
          ) : (
            <p className="text-[10px] pl-1 mt-2 text-gray-200 tracking-wider">
              Be the first to comment on this post
            </p>
          )}
          {comment ? (
            <>
              {err ? <h1>{err} Here</h1> : null}
              <motion.div
                initial={{ y: -10, opacity: 0.5 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex items-start mt-3 transition-all"
              >
                <img
                  alt="User Pic"
                  src={
                    "https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg?w=2000"
                  }
                  className=" hidden xs:flex rounded-full h-[30px] object-contain"
                />
                <form className="w-full xs:ml-2" onSubmit={addComment}>
                  <div className="w-full mb-4 rounded-lg   ">
                    <div className="px-4 py-2  rounded-lg bg-[#2c2c2c]">
                      <textarea
                        id="comment"
                        rows={3}
                        className="w-full px-0  border-0 bg-[#2c2c2c] text-xs focus:ring-0 outline-none text-gray-400 placeholder-gray-400"
                        placeholder="Write a comment..."
                        required
                        value={theComment}
                        onChange={(e) => setTheComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="w-full mt-2 flex justify-end ">
                      <button
                        type="submit"
                        className="inline-flex items-center transition-all  py-2 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                      >
                        Post comment
                      </button>
                    </div>
                  </div>
                </form>
              </motion.div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Post;
