import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faLocationDot,
  faLaptop,
  faCircleCheck,
  faCircleXmark,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../lib/firebase";
const UserCard = () => {
  const { user } = useAuth();

  const sendVerificationEmail = () => {
    sendEmailVerification(auth?.currentUser).then(() => {
      console.log("Email Sent");
    });
  };

  const resetPasswordEmail = () => {
    sendPasswordResetEmail(auth, user?.email)
      .then(() => {
        console.log("Email Reset Success");
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  if (!user) {
    return null;
  }

  return (
    <div className="bg-[#1A1A1A] w-full xl:w-[350px] xl:min-w-[310px]  rounded-xl  ">
      <div className="w-[90%] mx-auto">
        <div className=" flex items-center pt-5 pb-3 pr-3 justify-between">
          <div className="flex items-center ">
            <img
              alt="User Pic"
              src={
                "https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg?w=2000"
              }
              className="rounded-full h-[50px] object-contain"
            />
            <div className="flex flex-col ml-3 justify-start">
              <p className="text-sm font-bold000000000000000000">
                {user?.displayName || user?.email}
              </p>
              <p className="text-gray-100/20 text-xs">3 Followers</p>
            </div>
          </div>
          <button>
            <FontAwesomeIcon icon={faGear} className="animate-spin" />
          </button>
        </div>
        <div className="border border-gray-700/20" />
        <div className="p-3 space-y-2">
          <div className="flex items-center ">
            <FontAwesomeIcon
              icon={faLocationDot}
              className="text-gray-300/80 w-[20px]"
            />
            <p className="ml-2 text-xs text-gray-100/20">Pinhal Novo</p>
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faLaptop} className="text-gray-300/80" />
            <p className="ml-2 text-xs text-gray-100/20">
              Full-Stack Developer
            </p>
          </div>
          <div className="flex items-center  justify-between">
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-gray-300/80 w-[20px]"
              />
              <p className="ml-2 text-xs text-gray-100/20">Email Confirmed</p>
            </div>
            {user.emailConfirmed ? (
              <button>
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="text-green-600 cursor-default"
                />
              </button>
            ) : (
              <button
                className="text-xs bg-green-700 hover:bg-green-700/80 transition-all rounded-full py-1 px-2"
                onClick={sendVerificationEmail}
              >
                Confirm
              </button>
            )}
          </div>
        </div>
        <div className="border border-gray-700/20" />
        <div className="p-3 space-y-2">
          <div className="flex items-center justify-between">
            <p className="ml-2 text-xs text-gray-100/20">
              Who's viewed your profile
            </p>
            <p className="text-xs">6780</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="ml-2 text-xs text-gray-100/20">
              How much posts do you have
            </p>
            <p className="text-xs">2</p>
          </div>
        </div>
        <div className="border border-gray-700/20" />
        <div className="p-3">
          <h1 className="text-gray-300/80 text-sm">Social Profiles</h1>
          <div className="py-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  className="w-[20px] object-contain"
                  src="https://raw.githubusercontent.com/ed-roh/mern-social-media/master/server/public/assets/twitter.png"
                />
                <div className="ml-3 space-y-1">
                  <p className="text-xs text-gray-300/80">Twitter</p>
                  <p
                    className="text-gray-100/10"
                    style={{ fontSize: "10px", lineHeight: "10px" }}
                  >
                    Social Network
                  </p>
                </div>
              </div>
              <button className="cursor-default">
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="text-red-500"
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  className="w-[20px] object-contain"
                  src="https://raw.githubusercontent.com/ed-roh/mern-social-media/master/server/public/assets/linkedin.png"
                />
                <div className="ml-3 space-y-1">
                  <p className="text-xs text-gray-300/80">Linkedin</p>
                  <p
                    className="text-gray-100/10"
                    style={{ fontSize: "10px", lineHeight: "10px" }}
                  >
                    Network Plataform
                  </p>
                </div>
              </div>
              <button className="cursor-default">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="text-green-600 "
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
