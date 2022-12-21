import { Button, Modal, Upload, UploadFile } from "antd";
import React, { SetStateAction, useState, Dispatch } from "react";
import { poppins } from "../fonts/fonts";
import { PlusOutlined } from "@ant-design/icons";
import { BASE_URL } from "../lib/baseUrls";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import { User } from "../types/typing";

interface ModalUserInfoProps {
  openUserModal: boolean;
  setOpenUserModal: Dispatch<SetStateAction<boolean>>;
}

const ModalUserInfo = (modalProps: ModalUserInfoProps) => {
  const { openUserModal, setOpenUserModal } = modalProps;
  const [name, setName] = useState<string>("");
  const [file, setFile] = useState<File | null>();
  const [err, setErr] = useState<string>("");
  const { user, setUser } = useAuth();

  const handleSubmit = async () => {
    if (file) {
      const { error } = await supabase.storage
        .from("images")
        .upload(`/userPhotos/${file?.name}`, file);
      if (error) {
        setErr(error.message);
        return;
      }
    }

    fetch(`${BASE_URL}/api/users/${user?.uid}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, fileName: file?.name }),
    })
      .then((response) => response.json())
      .then((data) => {
        let userUpdate: User = {
          id: data.user?._id,
          email: data.user?.email,
          emailConfirmed: data.user?.emailConfirmed,
          displayName: data.user?.displayName,
          photoUrl: data.user?.photoUrl,
          uid: data.user?.uid,
          phoneNumber: data.user?.phoneNumber,
          provider: data.user?.provider,
        };
        setUser(userUpdate);
      });
  };

  return (
    <Modal
      className={`${poppins.className}`}
      title="Update User Information"
      centered
      open={openUserModal}
      closable={false}
      onOk={() => {}}
      okType="danger"
      footer={[
        <Button
          key="update"
          disabled={name ? false : true}
          className={`font-bold ${poppins.className}`}
          onClick={handleSubmit}
        >
          Update User
        </Button>,
      ]}
      // onCancel={() => setModal2Open(false)}
    >
      <div className="flex flex-col ">
        <div className=" flex w-full  flex-col ">
          <label htmlFor="website-admin" className="text-sm ">
            Name
          </label>
          <div className="flex mt-2">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              @
            </span>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="website-admin"
              className="rounded-none rounded-r-lg  bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Bonnie Green"
            />
          </div>
        </div>
        <div className="mt-2   flex-col  flex ">
          <p>Profile Image</p>
          <div className="hidden ">
            <Upload
              listType="picture-card"
              className="mt-1 sm:ml-2"

              // onChange={(e) => setFile(e.file)}
            >
              <div>
                <PlusOutlined />

                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </div>
          <div className="">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    aria-hidden="true"
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={
                    (e) =>
                      /* @ts-ignore */ setFile(
                        e.target.files[0]
                      ) /* @ts-ignore */
                  }
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalUserInfo;
