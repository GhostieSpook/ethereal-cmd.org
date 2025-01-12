// Import Firebase libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiM4M43xo-oolH9XdQyrgg7agUkMnZeBg",
  authDomain: "ethereal-command-site.firebaseapp.com",
  projectId: "ethereal-command-site",
  storageBucket: "ethereal-command-site.appspot.com",
  messagingSenderId: "952627774206",
  appId: "1:952627774206:web:e00951cf33aaf2deb41baf",
  measurementId: "G-QQSB7ZYHN9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Assign login and logout functions to the global window object
window.login = async function () {
  try {
    await signInWithPopup(auth, provider);
    console.log("User signed in successfully.");
  } catch (error) {
    console.error("Error signing in:", error);
  }
};

window.logout = async function () {
  try {
    await signOut(auth);
    console.log("User signed out successfully.");
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

// Monitor Auth State
onAuthStateChanged(auth, (user) => {
  const loginBtn = document.getElementById("login-btn");
  const logoutBtn = document.getElementById("logout-btn");
  const userProfile = document.getElementById("user-profile");

  if (user) {
    // User is logged in
    loginBtn.style.display = "none";
    logoutBtn.style.display = "block";
    userProfile.innerHTML = `<p>Welcome, ${user.displayName || "User"}!</p>`;
  } else {
    // User is logged out
    loginBtn.style.display = "block";
    logoutBtn.style.display = "none";
    userProfile.innerHTML = "";
  }
});
