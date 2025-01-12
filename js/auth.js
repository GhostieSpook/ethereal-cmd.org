// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiM4M43xo-oolH9XdQyrgg7agUkMnZeBg",
  authDomain: "ethereal-command-site.firebaseapp.com",
  projectId: "ethereal-command-site",
  storageBucket: "ethereal-command-site.firebasestorage.app",
  messagingSenderId: "952627774206",
  appId: "1:952627774206:web:e00951cf33aaf2deb41baf",
  measurementId: "G-QQSB7ZYHN9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Login Function
export function login() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("Logged in user:", user);
      document.getElementById("login-btn").style.display = "none";
      document.getElementById("logout-btn").style.display = "block";
      document.getElementById("user-profile").innerHTML = `Hello, ${user.displayName}`;
    })
    .catch((error) => {
      console.error("Login error:", error);
    });
}

// Logout Function
export function logout() {
  signOut(auth)
    .then(() => {
      console.log("Logged out");
      document.getElementById("login-btn").style.display = "block";
      document.getElementById("logout-btn").style.display = "none";
      document.getElementById("user-profile").innerHTML = "";
    })
    .catch((error) => {
      console.error("Logout error:", error);
    });
}

// Listen for Authentication State Changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in:", user);
    document.getElementById("login-btn").style.display = "none";
    document.getElementById("logout-btn").style.display = "block";
    document.getElementById("user-profile").innerHTML = `Hello, ${user.displayName}`;
  } else {
    console.log("No user is signed in.");
    document.getElementById("login-btn").style.display = "block";
    document.getElementById("logout-btn").style.display = "none";
    document.getElementById("user-profile").innerHTML = "";
  }
});
