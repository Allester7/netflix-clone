import { useState, useRef } from "react";
import { checkValidateData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import Header from "./Header";
import { auth } from "../utils/firebase";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { BACKGROUND } from "../utils/constants";
const Login = () => {
  const [isSignInForm, setSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const handleButtonClick = () => {
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    const { message } = checkValidateData(emailValue, passwordValue);
    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      // signUp logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          // const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorMessage);
        });
    } else {
      // signIn logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          // const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorMessage);
        });
    }
  };
  const handleSignClick = () => {
    setSignInForm(!isSignInForm);
    setErrorMessage("");
    email.current.value = "";
    password.current.value = "";
  };
  return (
    <div className="relative w-full h-screen">
      <Header />
      <div className="absolute top-0 left-0 w-full h-full">
        <img
          src={BACKGROUND}
          alt="Background Image"
          className="w-full h-full object-cover"
        />
        <form
          onSubmit={(e) => e.preventDefault()}
          className="absolute h-auto w-80 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/85 text-white p-8 opacity-90"
        >
          <h4 className="font-bold text-center">
            {isSignInForm ? "Sign In" : "Sign up"}
          </h4>
          {!isSignInForm ? (
            <input
              ref={name}
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              className="my-4 p-2 w-full h-10 rounded-lg border-white bg-gray-700"
            />
          ) : null}
          <input
            ref={email}
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            className="my-4 p-2 w-full h-10 rounded-lg border-white bg-gray-700"
          />
          <input
            ref={password}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="my-4 p-2 w-full h-10 rounded-lg border-white bg-gray-700"
          />
          {errorMessage === "Password is not valid" && (
            <p className="text-bold text-md m-2 text-red-500">{errorMessage}</p>
          )}
          {errorMessage &&
            errorMessage !== "Email is not valid" &&
            errorMessage !== "Password is not valid" && (
              <p className="text-bold text-md m-2 text-red-500">
                {errorMessage}
              </p>
            )}
          <button
            className="bg-red-600 w-full h-10 rounded-lg my-3"
            onClick={handleButtonClick}
          >
            {isSignInForm ? "Sign in" : "Sign up"}
          </button>
          <p className="my-10">
            {isSignInForm ? (
              <>
                New to Neflix?{" "}
                <span
                  className="cursor-pointer text-blue-700"
                  onClick={handleSignClick}
                >
                  Sign Up
                </span>
              </>
            ) : (
              <>
                Already a user?{" "}
                <span
                  className="cursor-pointer text-blue-700"
                  onClick={handleSignClick}
                >
                  Sign In
                </span>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
