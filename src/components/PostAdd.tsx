import React, { FormEventHandler, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faShareFromSquare } from "@fortawesome/free-solid-svg-icons";
import { supabase } from "../lib/supabase";
import { BASE_URL } from "../lib/baseUrls";

const PostAdd = () => {
  const [file, setFile] = useState<File>();
  const { user } = useAuth();
  const [err, setErr] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const onSubmitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file) {
      const { error } = await supabase.storage
        .from("images")
        .upload(`/postImages/${file?.name}`, file);
      if (error) {
        setErr(error.message);
        return;
      }
    }
    let objectParam = { user, comment, fileName: file?.name };
    fetch(`http://localhost:3000/api/post`, {
      method: "POST",
      mode: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objectParam),
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
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                id="post-file"
                name="post-file"
                className="hidden"
              />
            </div>
            <button className="text-sm bg-[#6C63FF]  px-3 py-1 rounded-md hover:bg-[#6C63FF]/80 transition-all">
              Submit{" "}
              <FontAwesomeIcon
                icon={faShareFromSquare}
                className="ml-1 w-3  "
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostAdd;
