import { faEnvelope, faInbox } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sendEmailVerification } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import { auth } from "../lib/firebase";

const ConfirmEmail = () => {
  const { user } = useAuth();

  const sendVerificationEmail = () => {
    sendEmailVerification(auth?.currentUser).then(() => {
      console.log("Email Sent");
    });
  };

  if (user?.emailConfirmed) return null;
  return (
    <div className="bg-[#ffb24e] rounded-lg text-[#1a1a1a] flex flex-row my-5 items-center ">
      <div className="flex flex-col space-y-2 p-3">
        <h1 className="text-[#1a1a1a] font-bold text-sm tracking-wide ">
          Please confirm your account
        </h1>
        <p className="text-xs text-[#1a1a1a]">
          You have signed in with{" "}
          <span className="text-xs text-[#1a1a1a] font-bold">
            {user?.email}
          </span>{" "}
        </p>
        <p className="text-xs text-[#1a1a1a]">
          Check your email inbox and confirm with the link we sent you
        </p>
        <div className="!mt-5">
          <div
            className="flex items-center space-x-1 cursor-pointer "
            onClick={sendVerificationEmail}
          >
            <FontAwesomeIcon icon={faEnvelope} />
            <p className="text-xs font-bold tracking-wider">
              Send Confirmation{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmail;
