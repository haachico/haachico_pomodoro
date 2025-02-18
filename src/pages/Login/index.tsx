import { useState } from "react";
import "./index.css";
import { auth } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedIn } from "../../redux/tasks/tasksSlice";
import { AppDispatch, RootState } from "../../store";
import { useLocation, useNavigate } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth";

const Login = () => {
  // const isLoggedIn = useSelector((state: RootState) => state.tasks.isLoggedIn);

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [signupDetails, setSignupDetails] = useState({
    email: "",
    password: "",
  });
  const [isType, setIsType] = useState("login");
  const [isSuccessfullySignedUp, setIsSuccessfullySignedUp] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const provider = new GoogleAuthProvider();

  const location = useLocation();
  const pathname =
    new URLSearchParams(location.search).get("redirectTo") || "/";

  console.log(new URL(window.location.href), pathname, "pathname in ");

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

      if (userCredential) {
        console.log("User signed up successfully");
        setIsSuccessfullySignedUp(true);
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const handleGoogleSignIn = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // The signed-in user info.
        const token = credential?.accessToken;

        if (token) {
          sessionStorage.setItem("token", token);
        }

        const user = result.user;

        if (user) {
          dispatch(setLoggedIn(true));

          navigate(pathname || "/", {
            replace: true,
          });
        }
      })
      .catch((error) => {
        console.error("Google Sign-In Error:", error);
      });
  };
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     const storedFrom = sessionStorage.getItem("from") || "/";
  //     const from = location.state?.from || storedFrom;

  //     navigate(pathname, { replace: true });
  //   }
  // }, [isLoggedIn, navigate, pathname]);

  const handleLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginDetails.email,
        loginDetails.password
      );

      if (user) {
        dispatch(setLoggedIn(true));

        const token = await user.user.getIdToken();

        sessionStorage.setItem("token", token);

        navigate(pathname, {
          replace: true,
        });
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
        {isType === "login" && (
          <button
            onClick={(e) => {
              handleGoogleSignIn(e);
            }}
          >
            Sign in with Google
          </button>
        )}
      </form>
      {isType === "login" ? (
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
      ) : isType === "signup" && isSuccessfullySignedUp ? (
        <button>
          <p>Successfully signed up!</p>
          <p
            onClick={() => {
              setIsType("login");
            }}
          >
            <strong>Log in here!</strong>
          </p>
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default Login;
