import { useState } from "react";
import "./index.css";
import { auth } from "../../firebaseConfig";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Form, useActionData, useNavigation } from "react-router-dom";

const Login = () => {
  const [isType, setIsType] = useState("login");
  const actionData = useActionData();
  const navigation = useNavigation();
  const errorMessage = actionData?.error;

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      window.location.href = "/pomodoros/dashboard"; // Redirect on success
    } catch (error) {
      console.error("Google sign-in failed:", error);
    }
  };

  const buttonText = () => {
    if (isType === "login") {
      return navigation?.state === "submitting" ? "Logging in..." : "Log In";
    } else if (isType === "signup") {
      return navigation?.state === "submitting" ? "Signing up..." : "Sign Up";
    }
  };

  return (
    <div className="login-page">
      <h1>{isType === "login" ? "Log In" : "Sign Up"}</h1>
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      <Form method="post" className="login-form">
        <input type="hidden" name="formType" value={isType} />

        {isType === "signup" && (
          <>
            <label htmlFor="username">Username</label>
            <input type="username" id="username" name="username" required />
          </>
        )}

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />

        <button disabled={navigation.state === "submitting"} type="submit">
          {buttonText()}
        </button>
        <button onClick={handleGoogleSignIn} className="google-signin-btn">
          Sign in with Google
        </button>
      </Form>

      {actionData?.error && <p className="error">{actionData.error}</p>}

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
