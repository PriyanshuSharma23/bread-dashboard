import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { Pane } from "../components/Pane";
import LoginSplash from "../assets/login-splash.svg";
import * as AiIcon from "react-icons/ai";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export const SignIn = () => {
  const navigator = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const googleLogin = (e) => {
    e.preventDefault();
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        navigator("/forms");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigator("/forms");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <Pane className="grid place-items-center bg-white shadow-xl">
      <img src={LoginSplash} alt="login-splash" className="login-splash" />
      <img src="/logo.png" alt="" className="absolute left-4 top-4 w-44" />
      <div className="w-full px-6 lg:px-10">
        <button
          onClick={googleLogin}
          className="login-google w-full rounded-full bg-red-800 px-5 py-2 text-white"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <AiIcon.AiOutlineGoogle
            style={{
              display: "block",
              height: "2rem",
            }}
            size={"1.5rem"}
          />
          Sign in With Google
        </button>
        <div className="my-4 flex items-center">
          <div className="h-px flex-1 bg-gray-300"></div>
          <div className="px-4 text-lg text-gray-500">or</div>
          <div className="h-px flex-1 bg-gray-300"></div>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="group/input flex items-center rounded-full bg-gray-100 px-3">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-neutral-500 transition-colors duration-200 group-hover/input:text-neutral-600"
            >
              <path
                d="M15.8571 12C15.8571 14.1302 14.1302 15.8571 12 15.8571C9.86976 15.8571 8.14286 14.1302 8.14286 12C8.14286 9.86976 9.86976 8.14286 12 8.14286C14.1302 8.14286 15.8571 9.86976 15.8571 12ZM15.8571 12V13.2857C15.8571 14.7059 17.0084 15.8571 18.4286 15.8571C19.3408 15.8571 20.1422 15.3821 20.5986 14.6658C20.8528 14.2671 21 13.7936 21 13.2857V12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C13.9122 21 15.6851 20.4037 17.1429 19.3868"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-full bg-transparent py-2 pl-2 pr-5 text-neutral-700 transition-colors duration-200 placeholder:text-neutral-500 hover:placeholder:text-neutral-600 focus:outline-none"
              required
              ref={emailRef}
            />
          </div>
          <div className="group/input mt-2 flex items-center rounded-full bg-gray-100 px-3">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-neutral-500 transition-colors duration-200 group-hover/input:text-neutral-600"
            >
              <path
                d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11M5 11H19V21H5V11Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>

            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-full bg-transparent py-2 pl-2 pr-5 text-neutral-700 transition-colors duration-200 placeholder:text-neutral-500 hover:placeholder:text-neutral-600 focus:outline-none"
              required
              ref={passwordRef}
            />
          </div>
          <div className="mt-8 flex items-center justify-end">
            <Link
              to="/sign-up"
              className="text-sm text-neutral-500 transition-colors duration-200 hover:text-neutral-600 hover:underline"
            >
              Don't have an account?
            </Link>
            <button className="ml-4 rounded-full bg-red-800 px-5 py-2 text-white">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </Pane>
  );
};
