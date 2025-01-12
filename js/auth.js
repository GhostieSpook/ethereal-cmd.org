import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDiM4M43xo-oolH9XdQyrgg7agUkMnZeBg",
  authDomain: "ethereal-command-site.firebaseapp.com",
  projectId: "ethereal-command-site",
  storageBucket: "ethereal-command-site.appspot.com",
  messagingSenderId: "952627774206",
  appId: "1:952627774206:web:e00951cf33aaf2deb41baf",
  measurementId: "G-QQSB7ZYHN9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

window.login = async function () {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Logged in as:", result.user.displayName);
  } catch (error) {
    console.error("Login error:", error);
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
