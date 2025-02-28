import { useState } from "react";
import "./index.css";
import { auth } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { ActionFunctionArgs, Form, useActionData } from "react-router-dom";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const formType = formData.get("formType");

  if (!email || !password) {
    return { error: "Please fill out all required fields." };
  }

  try {
    if (formType === "login") {
      const user = await signInWithEmailAndPassword(auth, email, password);
      return user
        ? { redirect: "/pomodoros/dashboard" }
        : { error: "Invalid email or password." };
    } else {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCred
        ? { redirect: "/pomodoros/dashboard" }
        : { error: "Failed to create account." };
    }
  } catch (error) {
    return { error: error.message || "An error occurred." };
  }
}

const Login = () => {
  const [isType, setIsType] = useState("login");
  const actionData = useActionData();

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      window.location.href = "/pomodoros/dashboard"; // Redirect on success
    } catch (error) {
      console.error("Google sign-in failed:", error);
    }
  };

  return (
    <div className="login-page">
      <h1>{isType === "login" ? "Log In" : "Sign Up"}</h1>
      <Form method="post" className="login-form">
        <input type="hidden" name="formType" value={isType} />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />

        <button type="submit">
          {isType === "login" ? "Log in" : "Sign up"}
        </button>
      </Form>

      {actionData?.error && <p className="error">{actionData.error}</p>}

      <button onClick={handleGoogleSignIn} className="google-signin-btn">
        Sign in with Google
      </button>

      <div>
        {isType === "login" ? (
          <p>
            Not signed up yet?{" "}
            <strong onClick={() => setIsType("signup")}>
              Create an account here!
            </strong>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <strong onClick={() => setIsType("login")}>Log in here!</strong>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
