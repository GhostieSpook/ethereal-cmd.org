import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

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

// Authentication state listener
export function setupAuthStateListeners() {
  const userProfile = document.getElementById("user-profile");
  const loginButton = document.getElementById("login-button");
  const logoutButton = document.getElementById("logout-button");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User logged in:", user.email);
      userProfile.textContent = `Welcome, ${user.email}`;
      loginButton.style.display = "none";
      logoutButton.style.display = "block";
    } else {
      console.log("No user logged in");
      userProfile.textContent = "Not logged in.";
      loginButton.style.display = "block";
      logoutButton.style.display = "none";
    }
  });
}
