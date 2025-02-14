import { useState } from "react";
import "./index.css";
import { auth } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../../redux/tasks/tasksSlice";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [signupDetails, setSignupDetails] = useState({
    email: "",
    password: "",
  });
  const [isType, setIsType] = useState("login");
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (isType === "login") {
      setLoginDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else if (isType === "signup") {
      setSignupDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSignup = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        signupDetails.email,
        signupDetails.password
      );
      console.log(userCredential, "check");

      if (userCredential) {
        console.log("User signed up successfully");
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginDetails.email,
        loginDetails.password
      );

      if (user) {
        await dispatch(setLoggedIn(true))
        console.log(user, "User logged in successfully");

      }
    } catch (error) {
      console.error(error, "Error logging in");
    }
  };

  return (
    <div className="login-page">
      <h1>
        {" "}
        {isType === "login" ? "Log In" : isType === "signup" ? "Sign up" : ""}
      </h1>
      <form className="login-form">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={
            isType === "login"
              ? loginDetails.email
              : isType === "signup"
              ? signupDetails.email
              : ""
          }
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={
            isType === "login"
              ? loginDetails.password
              : isType === "signup"
              ? signupDetails.password
              : ""
          }
          onChange={handleChange}
          required
        />

        <button
          onClick={isType === "login" ? handleLogin : handleSignup}
          type="submit"
        >
          {isType === "login" ? "Log in" : "Sign up"}
        </button>
      </form>
      {isType === "login" && (
        <div>
          <p>Not signed up yet?</p>
          <p
            onClick={() => {
              setIsType("signup");
            }}
          >
            <strong>Create a account here!</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
