import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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
  const formType = formData.get("formType") as string | null;

  if (!email || !password) {
    return { error: "Please fill out all required fields." };
  }

  try {
    if (formType === "login") {
      const user = await signInWithEmailAndPassword(auth, email, password);
      return user
        ? redirect(pathname)
        : { error: "Invalid email or password." };
    } else {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCred
        ? redirect("/login")
        : { error: "Failed to create account." };
    }
  } catch (error: any) {
    return { error: error.message || "An error occurred." };
  }
}
