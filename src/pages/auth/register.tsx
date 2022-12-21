import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";

import { signInWithGoogle } from "../../lib/authfunctions";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faRightFromBracket, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { user } = useAuth();

  const logUpWithEmailAndPassword = async () => {
    const result = await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {})
      .catch((err) => {
     
        if (err.code.includes("already-in-use")) {
          setError("Email já está a ser utilizado. Escolha outro.");
          return;
        }
      });

    router.push("/");
  };

  const logInWithGoogle = async () => {
    await signInWithGoogle();
    router.push("/");
  };

  const logOut = async () => {
    await signOut(auth);
    router.push("/auth/login");
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  return (
    <div className="relative min-h-screen flex items-center justify-center w-full bg-[#2c2c2c]">
      <div className="lg:w-[90%] xl:w-[70%] w-[90%] md:w-[70%] mx-auto flex flex-col lg:flex-row justify-around items-center ">
        <div className="w-2/3 md:1/3 max-w-[500px] lg:w-[400px]  object-contain hidden lg:flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
            width="1100.50064"
            height="691.70682"
            viewBox="0 0 1100.50064 691.70682"
            className="w-full object-contain"
          >
            <title>two_factor_authentication</title>
            <path
              d="M1150.25032,388.23743h-1.85859V337.32194a29.4685,29.4685,0,0,0-29.46859-29.46853H1011.05186a29.4685,29.4685,0,0,0-29.46859,29.46853V616.64827a29.46851,29.46851,0,0,0,29.46859,29.46854h107.87128a29.46851,29.46851,0,0,0,29.46859-29.46854V424.47994h1.85859Z"
              transform="translate(-49.74968 -104.14659)"
              fill="#3f3d56"
            />
            <path
              d="M1142.121,339.05342v278.92a22.01111,22.01111,0,0,1-22.01,22.01h-108.39a22.00248,22.00248,0,0,1-22-22.01v-278.92a22.00031,22.00031,0,0,1,22-22h13.15a10.4608,10.4608,0,0,0,9.68,14.4h61.8a10.44027,10.44027,0,0,0,9.67993-14.4H1120.111A22.00894,22.00894,0,0,1,1142.121,339.05342Z"
              transform="translate(-49.74968 -104.14659)"
              fill="#d0cde1"
            />
            <rect
              x="945.85129"
              y="355.70682"
              width="126"
              height="34"
              fill="#6c63ff"
            />
            <path
              d="M1126.601,487.85341h-122a3.00328,3.00328,0,0,1-3-3v-30a3.00328,3.00328,0,0,1,3-3h122a3.00328,3.00328,0,0,1,3,3v30A3.00328,3.00328,0,0,1,1126.601,487.85341Zm-122-34a1.001,1.001,0,0,0-1,1v30a1.00067,1.00067,0,0,0,1,1h122a1.00067,1.00067,0,0,0,1-1v-30a1.001,1.001,0,0,0-1-1Z"
              transform="translate(-49.74968 -104.14659)"
              fill="#3f3d56"
            />
            <rect
              x="959.85129"
              y="374.70682"
              width="16"
              height="2"
              fill="#3f3d56"
            />
            <rect
              x="981.85129"
              y="374.70682"
              width="16"
              height="2"
              fill="#3f3d56"
            />
            <rect
              x="1003.85129"
              y="374.70682"
              width="16"
              height="2"
              fill="#3f3d56"
            />
            <rect
              x="1025.85129"
              y="374.70682"
              width="16"
              height="2"
              fill="#3f3d56"
            />
            <rect
              x="1047.85129"
              y="374.70682"
              width="16"
              height="2"
              fill="#3f3d56"
            />
            <path
              d="M1142.121,589.61342v28.36a22.01111,22.01111,0,0,1-22.01,22.01h-108.39a22.00248,22.00248,0,0,1-22-22.01v-130.46Z"
              transform="translate(-49.74968 -104.14659)"
              opacity="0.1"
            />
            <rect
              x="99.85129"
              y="459.70682"
              width="473"
              height="232"
              fill="#d0cde1"
            />
            <path
              d="M502.351,795.85341H151.601a2.00591,2.00591,0,0,1-2-2v-228a2.00587,2.00587,0,0,1,2-2h4.44Z"
              transform="translate(-49.74968 -104.14659)"
              opacity="0.1"
            />
            <rect
              x="318.85129"
              y="490.70682"
              width="732.99951"
              height="2"
              fill="#3f3d56"
            />
            <path
              d="M600.34268,108.46435H390.853v-4.31776H295.86217v4.31776H85.5089a14.17039,14.17039,0,0,0-14.1704,14.1704V409.4906a14.17043,14.17043,0,0,0,14.1704,14.17045H600.34268a14.17044,14.17044,0,0,0,14.1704-14.17045V122.63475A14.17039,14.17039,0,0,0,600.34268,108.46435Z"
              transform="translate(-49.74968 -104.14659)"
              fill="#3f3d56"
            />
            <rect
              x="40.59128"
              y="29.35679"
              width="505.16998"
              height="284.98004"
              fill="#d0cde1"
            />
            <circle cx="292.74433" cy="16.4075" r="5.18132" fill="#6c63ff" />
            <path
              d="M240.601,239.85341h-12a3.00328,3.00328,0,0,1-3-3v-12a3.00328,3.00328,0,0,1,3-3h12a3.00328,3.00328,0,0,1,3,3v12A3.00328,3.00328,0,0,1,240.601,239.85341Zm-12-16a1.0013,1.0013,0,0,0-1,1v12a1.0013,1.0013,0,0,0,1,1h12a1.0013,1.0013,0,0,0,1-1v-12a1.0013,1.0013,0,0,0-1-1Z"
              transform="translate(-49.74968 -104.14659)"
              fill="#3f3d56"
            />
            <rect
              x="176.85129"
              y="133.70682"
              width="228"
              height="2"
              fill="#3f3d56"
            />
            <rect
              x="345.85129"
              y="188.70682"
              width="53"
              height="16"
              fill="#6c63ff"
            />
            <path
              d="M452.601,304.85341h-49a3.00328,3.00328,0,0,1-3-3v-12a3.00328,3.00328,0,0,1,3-3h49a3.00328,3.00328,0,0,1,3,3v12A3.00328,3.00328,0,0,1,452.601,304.85341Zm-49-16a1.0013,1.0013,0,0,0-1,1v12a1.0013,1.0013,0,0,0,1,1h49a1.0013,1.0013,0,0,0,1-1v-12a1.0013,1.0013,0,0,0-1-1Z"
              transform="translate(-49.74968 -104.14659)"
              fill="#3f3d56"
            />
            <rect
              x="703.85129"
              y="206.70682"
              width="100"
              height="70"
              fill="#6c63ff"
            />
            <path
              d="M863.601,375.35341h-96a4.00427,4.00427,0,0,1-4-4v-66a4.00427,4.00427,0,0,1,4-4h96a4.00426,4.00426,0,0,1,4,4v66A4.00426,4.00426,0,0,1,863.601,375.35341Zm-96-70v66H863.6039l-.00293-66Z"
              transform="translate(-49.74968 -104.14659)"
              fill="#3f3d56"
            />
            <path
              d="M852.601,302.85341h-4a33,33,0,1,0-66,0h-4a37,37,0,1,1,74,0Z"
              transform="translate(-49.74968 -104.14659)"
              fill="#3f3d56"
            />
            <path
              d="M825.601,330.35341a10.00023,10.00023,0,1,0-15.29412,8.47258V349.5593a5.29411,5.29411,0,0,0,5.29412,5.29411h0a5.29411,5.29411,0,0,0,5.29411-5.29411V338.826A9.98327,9.98327,0,0,0,825.601,330.35341Z"
              transform="translate(-49.74968 -104.14659)"
              fill="#3f3d56"
            />
            <rect
              x="284.35129"
              y="562.70682"
              width="16"
              height="2"
              fill="#3f3d56"
            />
            <rect
              x="306.35129"
              y="562.70682"
              width="16"
              height="2"
              fill="#3f3d56"
            />
            <rect
              x="328.35129"
              y="562.70682"
              width="16"
              height="2"
              fill="#3f3d56"
            />
            <rect
              x="350.35129"
              y="562.70682"
              width="16"
              height="2"
              fill="#3f3d56"
            />
            <rect
              x="372.35129"
              y="562.70682"
              width="16"
              height="2"
              fill="#3f3d56"
            />
            <path
              d="M643.60059,778.85352H174.60107a4.00428,4.00428,0,0,1-4-4v-228a4.00427,4.00427,0,0,1,4-4H643.60059a4.004,4.004,0,0,1,4,4v228A4.004,4.004,0,0,1,643.60059,778.85352Zm-468.99952-232v228H643.60352l-.00293-228Z"
              transform="translate(-49.74968 -104.14659)"
              fill="#3f3d56"
            />
            <circle cx="145.85129" cy="470.70682" r="6" fill="#3f3d56" />
            <circle cx="166.85129" cy="470.70682" r="6" fill="#3f3d56" />
            <circle cx="187.85129" cy="470.70682" r="6" fill="#3f3d56" />
            <path
              d="M453.601,680.85341h-135a3.00328,3.00328,0,0,1-3-3v-34a3.00328,3.00328,0,0,1,3-3h135a3.00328,3.00328,0,0,1,3,3v34A3.00328,3.00328,0,0,1,453.601,680.85341Zm-135-38a1.001,1.001,0,0,0-1,1v34a1.001,1.001,0,0,0,1,1h135a1.001,1.001,0,0,0,1-1v-34a1.001,1.001,0,0,0-1-1Z"
              transform="translate(-49.74968 -104.14659)"
              fill="#3f3d56"
            />
            <circle cx="437.85129" cy="559.70682" r="18" fill="#6c63ff" />
            <path
              d="M493.601,679.85341a19,19,0,1,1,19-19A19.02162,19.02162,0,0,1,493.601,679.85341Zm0-36a17,17,0,1,0,17,17A17.019,17.019,0,0,0,493.601,643.85341Z"
              transform="translate(-49.74968 -104.14659)"
              fill="#3f3d56"
            />
            <polygon
              points="444.118 563.803 434.437 554.121 437.265 551.293 443.584 557.611 461.216 532.555 464.487 534.858 444.118 563.803"
              fill="#3f3d56"
            />
            <polygon
              points="433.761 314.337 40.591 314.337 40.591 50.947 433.761 314.337"
              opacity="0.1"
            />
            <path
              d="M628.69739,413.2984H579.39527v-3.55218a.7043.7043,0,0,0-.70431-.70432H561.78737a.70429.70429,0,0,0-.70431.70432v3.55218H550.51832v-3.55218a.7043.7043,0,0,0-.70432-.70432H532.91042a.7043.7043,0,0,0-.70432.70432v3.55218H521.64136v-3.55218a.70429.70429,0,0,0-.70431-.70432H504.03347a.7043.7043,0,0,0-.70432.70432v3.55218H492.76441v-3.55218a.7043.7043,0,0,0-.70432-.70432H475.15651a.70429.70429,0,0,0-.70431.70432v3.55218H463.88746v-3.55218a.7043.7043,0,0,0-.70432-.70432H446.27956a.7043.7043,0,0,0-.70432.70432v3.55218H435.0105v-3.55218a.70429.70429,0,0,0-.70431-.70432H417.4026a.7043.7043,0,0,0-.70431.70432v3.55218H406.13355v-3.55218a.7043.7043,0,0,0-.70432-.70432H273.01784a.7043.7043,0,0,0-.70432.70432v3.55218H261.74878v-3.55218a.7043.7043,0,0,0-.70432-.70432H244.14088a.70429.70429,0,0,0-.70431.70432v3.55218H232.87183v-3.55218a.7043.7043,0,0,0-.70432-.70432H215.26393a.7043.7043,0,0,0-.70432.70432v3.55218H203.99487v-3.55218a.70429.70429,0,0,0-.70431-.70432H186.387a.7043.7043,0,0,0-.70431.70432v3.55218H175.11792v-3.55218a.7043.7043,0,0,0-.70432-.70432H157.51a.7043.7043,0,0,0-.70432.70432v3.55218H146.241v-3.55218a.7043.7043,0,0,0-.70432-.70432H128.63307a.7043.7043,0,0,0-.70432.70432v3.55218H117.364v-3.55218a.7043.7043,0,0,0-.70431-.70432H99.75611a.70429.70429,0,0,0-.70431.70432v3.55218H66.65326A16.90359,16.90359,0,0,0,49.74968,430.202v7.6434a16.90358,16.90358,0,0,0,16.90358,16.90354H628.69739A16.90358,16.90358,0,0,0,645.601,437.84539V430.202A16.90359,16.90359,0,0,0,628.69739,413.2984Z"
              transform="translate(-49.74968 -104.14659)"
              fill="#3f3d56"
            />
            <path
              d="M474.601,321.85341h-264a3.00328,3.00328,0,0,1-3-3v-110a3.00328,3.00328,0,0,1,3-3h264a3.00328,3.00328,0,0,1,3,3v110A3.00328,3.00328,0,0,1,474.601,321.85341Zm-264-114a1.0013,1.0013,0,0,0-1,1v110a1.0013,1.0013,0,0,0,1,1h264a1.0013,1.0013,0,0,0,1-1v-110a1.0013,1.0013,0,0,0-1-1Z"
              transform="translate(-49.74968 -104.14659)"
              fill="#3f3d56"
            />
            <path
              d="M240.601,269.85341h-12a3.00328,3.00328,0,0,1-3-3v-12a3.00328,3.00328,0,0,1,3-3h12a3.00328,3.00328,0,0,1,3,3v12A3.00328,3.00328,0,0,1,240.601,269.85341Zm-12-16a1.0013,1.0013,0,0,0-1,1v12a1.0013,1.0013,0,0,0,1,1h12a1.0013,1.0013,0,0,0,1-1v-12a1.0013,1.0013,0,0,0-1-1Z"
              transform="translate(-49.74968 -104.14659)"
              fill="#3f3d56"
            />
            <rect
              x="176.85129"
              y="163.70682"
              width="228"
              height="2"
              fill="#3f3d56"
            />
            <rect
              x="264.85129"
              y="269.70682"
              width="732.99951"
              height="2"
              fill="#3f3d56"
            />
            <circle cx="264.85129" cy="269.70682" r="14" fill="#3f3d56" />
            <circle cx="997.85129" cy="271.70682" r="11" fill="#3f3d56" />
            <circle cx="1051.85129" cy="492.70682" r="11" fill="#3f3d56" />
            <circle cx="321.85129" cy="492.70682" r="11" fill="#3f3d56" />
          </svg>
        </div>
        <div className="max-w-[400px] w-full rounded-xl flex items-center p-2 flex-col ">
          <h1 className="font-bold text-2xl tracking-wider mt-3 w-full lg:w-fit">
            Welcome back!{" "}
          </h1>
          <h1 className="font-bold text-lg mt-2 tracking-wider w-full lg:w-fit">
            Sign Up{" "}
          </h1>
          <div className="flex mt-6 flex-col w-full items-center">
            <div className="w-full  ">
              {error ? (
                <span className="text-red-500 w-full mx-auto flex justify-start font-bold lg:justify-center">
                  {error}{" "}
                </span>
              ) : null}
              <label
                htmlFor="email-address-icon"
                className="block mb-2 text-sm font-medium text-white"
              >
                Email
              </label>
              <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="email-address-icon"
                  onChange={(e) => {
                    if (error) {
                      setError("");
                    }
                    setEmail(e.target.value);
                  }}
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    error ? "!border-red-500 border-2" : null
                  }`}
                  placeholder="name@flowbite.com"
                />
              </div>
            </div>
            <div className="w-full mt-4">
              <label
                htmlFor="email-address-icon"
                className="block mb-2 text-sm font-medium text-white"
              >
                Password
              </label>
              <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  />
                </div>
                <input
                  placeholder="your-password"
                  onChange={(e) => setPassword(e.target.value)}
                  type={`password`}
                  id="email-address-icon"
                  className={`${error ? "!border-red-500 border-2" : null}
                   bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="yourpassword`}
                />
              </div>
            </div>
            <div className="w-full mt-6 flex items-center justify-start lg:justify-center ">
              <button
                onClick={logUpWithEmailAndPassword}
                type="button"
                className="text-white bg-[#6C63FF] hover:bg-[#6C63FF]/90 focus:ring-4 w-1/2 focus:outline-none focus:ring-[#6C63FF]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center dark:focus:ring-[#6C63FF]/55 mr-2 mb-2"
              >
                Sign Up
              </button>
            </div>
          </div>
          <div className="flex flex-col lg:items-center items-start w-full space-y-2 mt-2">
            <p className="text-xs">
              Already have an account?
              <a href="/auth/login" className="ml-2 text-blue-500 underline">
                Login
              </a>
            </p>
          </div>
          <div className="border border-gray-200/20 my-3 w-full" />
          <div className="w-full lg:w-fit flex justify-start lg:justify-center">
            <p className="text-sm flex items-center">  Or Sign in using another provider<FontAwesomeIcon icon={faRightToBracket} className="ml-2" /></p>
          </div>
          <div className="my-5 w-full flex justify-start lg:justify-center items-center">
            <button
              type="button"
              className="text-white bg-[#3b5998] w-fit hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-full text-sm  px-3 py-3 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
            >
              <svg
                className="  w-4 h-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="facebook-f"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill="currentColor"
                  d="M279.1 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.4 0 225.4 0c-73.22 0-121.1 44.38-121.1 124.7v70.62H22.89V288h81.39v224h100.2V288z"
                ></path>
              </svg>
            </button>
            <button
              onClick={logInWithGoogle}
              type="button"
              className="text-white bg-[#DB4437] hover:bg-[#DB4437]/90 focus:ring-4 focus:outline-none border-none focus:ring-[#DB4437]/50 font-medium rounded-full text-sm px-3 py-3 text-center inline-flex items-center dark:focus:ring-[#DB4437]/55 mr-2 mb-2"
            >
              <svg
                className=" w-4 h-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
