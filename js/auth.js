import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

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

// Function to handle user state changes
export function setupAuthStateListeners() {
  const userProfile = document.getElementById("user-profile");
  const loginButton = document.getElementById("login-button");
  const logoutButton = document.getElementById("logout-button");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User logged in:", user.email);
      userProfile.textContent = `Logged in as: ${user.email}`;
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

// Login function
export async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Login successful:", userCredential.user.email);
    window.location.href = "/index.html"; // Redirect to homepage after login
  } catch (error) {
    console.error("Login error:", error.message);
    alert("Login failed: " + error.message);
  }
}

// Logout function
export async function logout() {
  try {
    await signOut(auth);
    console.log("Logout successful");
    window.location.href = "/login.html"; // Redirect to login page after logout
  } catch (error) {
    console.error("Logout error:", error.message);
    alert("Logout failed: " + error.message);
  }
}
