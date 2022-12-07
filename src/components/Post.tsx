import {
  faComment,
  faShare,
  faThumbsUp,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { PostType } from "../types/typing";
import { STORAGE_URL } from "../lib/supabase";

interface PostProps {
  post: PostType;
  lastPost: boolean;
}

const Post = (props: PostProps) => {
  const { post } = props;
  const { user } = useAuth();
  const [comment, setComment] = useState(false);
  console.log({ l: props.lastPost });
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
              <p className="text-sm"> {user?.displayName || user?.email}</p>
              <p className="text-xs text-gray-100/20">Sat, 13 May 2022</p>
            </div>
          </div>

          <FontAwesomeIcon
            icon={faUserPlus}
            className="bg-[#104a56] p-2 rounded-full text-sm cursor-pointer"
          />
        </div>
        <div className="mt-5 flex flex-col ">
          <p className="text-sm text-gray-300/80">{post?.comment}</p>
          <img
            src={
              post.fileName
                ? `${STORAGE_URL}${post?.fileName}`
                : "https://ichef.bbci.co.uk/news/976/cpsprodpb/DF94/production/_123463275_gettyimages-1325401737.jpg"
            }
            className="w-full object-contain rounded-lg mt-3"
          />
          <div className="flex items-center mt-3">
            <div className="flex items-center cursor-pointer  hover:opacity-30 transition-all  px-2">
              <FontAwesomeIcon icon={faThumbsUp} className="" />
              <p className={`hidden xs:flex text-sm text-gray-300/80  ml-2`}>
                Likes
              </p>
            </div>
            <div
              className="flex items-center cursor-pointer hover:opacity-10 transition-all  px-2 "
              onClick={() => {
                if (user) {
                  setComment(!comment);
                }
              }}
            >
              <FontAwesomeIcon icon={faComment} className="" />
              <p className="text-sm hidden xs:flex text-gray-300/80  ml-2">
                Comments
              </p>
            </div>
            <div className="flex items-center cursor-pointer hover:opacity-30 transition-all  px-2">
              <FontAwesomeIcon icon={faShare} className="" />
              <p className="text-sm hidden xs:flex text-gray-300/80  ml-2">
                Share
              </p>
            </div>
          </div>
          {comment ? (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-start mt-3 transition-all"
            >
              <img
                alt="User Pic"
                src={
                  "https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg?w=2000"
                }
                className=" hidden xs:flex rounded-full h-[30px] object-contain"
              />
              <form className="w-full xs:ml-3">
                <div className="w-full mb-4 rounded-lg   ">
                  <div className="px-4 py-2  rounded-t-lg bg-[#2c2c2c]">
                    <textarea
                      id="comment"
                      rows={3}
                      className="w-full px-0  border-0 bg-[#2c2c2c] text-xs focus:ring-0 outline-none text-gray-400 placeholder-gray-400"
                      placeholder="Write a comment..."
                      required
                    ></textarea>
                  </div>
                  <div className="flex items-center border-t justify-between px-3 py-2 rounded-b-lg  bg-[#2c2c2c] dark:border-gray-200">
                    <button
                      type="submit"
                      className="inline-flex items-center transition-all py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                    >
                      Post comment
                    </button>
                    <div className="flex pl-0 space-x-1 sm:pl-2">
                      <button
                        type="button"
                        className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                      >
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span className="sr-only">Attach file</span>
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                      >
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span className="sr-only">Set location</span>
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                      >
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span className="sr-only">Upload image</span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </motion.div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Post;
