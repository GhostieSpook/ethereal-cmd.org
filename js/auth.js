// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiM4M43xo-oolH9XdQyrgg7agUkMnZeBg",
  authDomain: "ethereal-command-site.firebaseapp.com",
  projectId: "ethereal-command-site",
  storageBucket: "ethereal-command-site.appspot.com",
  messagingSenderId: "952627774206",
  appId: "1:952627774206:web:e00951cf33aaf2deb41baf",
  measurementId: "G-QQSB7ZYHN9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to log in a user
export async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

// Function to create a new user
export async function register(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User registered:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}

// Function to log out a user
export async function logout() {
  try {
    await signOut(auth);
    console.log("User logged out.");
    window.location.href = "/login.html"; // Redirect to login page after logout
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
}

// Function to get the currently logged-in user
export function getCurrentUser() {
  return auth.currentUser;
}

// Listener for authentication state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Auth state changed: User is logged in:", user.email);
  } else {
    console.log("Auth state changed: No user logged in.");
  }
});
