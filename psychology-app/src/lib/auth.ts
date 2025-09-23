import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, database } from "./firebase";
import { RegisterFormData, LoginFormData } from "./validationSchemas";


// Register user
export const registerUser = async (userData: RegisterFormData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: userData.name,
    });

    await set(ref(database, `users/${user.uid}`), {
      name: userData.name,
      email: userData.email,
      favorites: [],
      createdAt: new Date().toISOString(),
    });
    return user;
  } catch (error) {
    console.error("Registration error:", error);
    const errorCode = (error as { code?: string })?.code ?? "unknown";
    throw new Error(getAuthErrorMessage(errorCode));
  }
};

// Login user

export const loginUser = async (UserData: LoginFormData) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, UserData.email, UserData.password);
    return userCredential.user;
  } catch (error) {
    console.error("Login error:", error)
    const errorCode = (error as { code?: string })?.code ?? "unknown";
    throw new Error(getAuthErrorMessage(errorCode))
  }
}

// Logout user

export const logoutUser = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    console.error("Logout error:", error)
    
    throw new Error("Failed to logout. Please try again.")
  }
}

// Auth Error Messages

const getAuthErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "This email is already registered. Please use a different email or try logging in.";
    case "auth/weak-password":
      return "Password is too weak. Please choose a stronger password.";
    case "auth/user-not-found":
      return "No account found with this email. Please check your email or register.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again.";
    case "auth/invalid-email":
      return "Invalid email address. Please enter a valid email.";
    case "auth/user-disabled":
      return "This account has been disabled. Please contact support.";
    case "auth/too-many-requests":
      return "Too many failed attempts. Please try again later.";
    default:
      return "An error occurred. Please try again.";
  }
};
