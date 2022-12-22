import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faShareFromSquare } from "@fortawesome/free-solid-svg-icons";
import { supabase } from "../lib/supabase";
import { BASE_URL } from "../lib/baseUrls";
import { PostType } from "../types/typing";
import { useDispatch, useSelector } from "react-redux";
import { selectPosts, setPosts } from "../redux/slices/postSlice";


const PostAdd = () => {
  const posts: PostType[] = useSelector(selectPosts);
  const { user } = useAuth();
  const dispatch = useDispatch();

  const [file, setFile] = useState<File>();
  const [err, setErr] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const onSubmitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dateNow = new Date();
    const dateNowFormat = dateNow.toDateString() + dateNow.toLocaleTimeString();
    if (file) {
      const { error } = await supabase.storage
        .from("images")
        .upload(
          `/postImages/${file?.name.replaceAll(
            " ",
            "_"
          )}_${dateNowFormat.replaceAll(" ", "_")}_${user?.uid}`,
          file
        );
      if (error) {
        setErr(error.message);
        return;
      }
    }
    let objectParam = {
      user,
      comment,
      fileName: `${file?.name.replaceAll(" ", "_")}_${dateNowFormat.replaceAll(
        " ",
        "_"
      )}_${user?.uid}`,
      likes: [],
      comments: [],
      created_at: new Date(),
    };

    fetch(`http://localhost:3000/api/post`, {
      method: "POST",
      mode: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objectParam),
    })
      .then((res) => res.json())
      .then((data) => {
        const newPosts = [
          ...posts,
          {
            _id: data._id,
            user: data.user,
            likes: data.likes,
            fileName: data.fileName,
            created_at: data.created_at,
            comment: data.comment,
            comments: data.comments,
          },
        ];
        dispatch(setPosts(newPosts));
      });

    setComment("");
    setFile(undefined);
  };

  if (!user) return null;

  return (
    <div className="bg-[#1A1A1A] rounded-xl w-full">
      <div className="w-[95%] mx-auto p-3 py-5">
        <form onSubmit={onSubmitPost}>
          <div className="flex items-center">
            <img
              alt="User Pic"
              src={
                "https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg?w=2000"
              }
              className="rounded-full h-[50px] object-contain"
            />
            <input
              onChange={(e) => setComment(e.target.value)}
              required
              type="text"
              className="w-full ml-8  py-4 px-5 rounded-full bg-[#2c2c2c] border-none outline-none text-xs"
              placeholder="What's on your mind.. "
            />
          </div>
          <div className="border border-gray-700/20 my-3" />
          <div className="flex items-center justify-between">
            <div className="cursor-pointer flex items-center space-x-2 text-gray-100/20 hover:text-white transition-all">
              <FontAwesomeIcon icon={faImage} />
              <label htmlFor="post-file" className="text-xs cursor-pointer">
                Image
              </label>
              <input
                required
                onChange={(e) => {
                  if (e.target.files !== null) setFile(e.target.files[0]);
                }}
                type="file"
                id="post-file"
                name="post-file"
                className="hidden"
              />
            </div>
            <button className="  bg-blue-500 hover:bg-blue-500/80 transition-all py-2 px-3 rounded-md text-xs xs:flex items-center">
              Submit{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostAdd;
