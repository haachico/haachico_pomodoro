import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { ActionFunctionArgs } from "react-router";
import { redirect } from "react-router-dom";

export async function action({ request }: ActionFunctionArgs) {
  const url = new URL(request.url);

  const pathname = url.searchParams.get("redirectTo") || "/";

  const formData = await request.formData();
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;
  const username = formData.get("username") as string | null;
  const formType = formData.get("formType") as string | null;

  if (formType === "signup") {
    if (!email || !password || !username) {
      return { error: "Email, password, and username are required." };
    }
  } else {
    if (!email || !password) {
      return { error: "Email and password are required." };
    }
  }

  try {
    if (formType === "login") {
      const userLoggedin = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      sessionStorage.setItem(
        "displayName",
        userLoggedin.user.displayName || userLoggedin.user.email || ""
      );
      return userLoggedin
        ? redirect(pathname)
        : { error: "Invalid email or password." };
    } else {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCred.user;

      await signOut(auth);

      // Update the display name
      await updateProfile(user, { displayName: username });
      return userCred ? redirect("/") : { error: "Failed to create account." };
    }
  } catch (error: any) {
    return { error: error.message || "An error occurred." };
  }
}
