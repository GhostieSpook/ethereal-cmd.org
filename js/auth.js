import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';

const firebaseConfig = {
  apiKey: 'AIzaSyDiM4M43xo-oolH9XdQyrgg7agUkMnZeBg',
  authDomain: 'ethereal-command-site.firebaseapp.com',
  projectId: 'ethereal-command-site',
  storageBucket: 'ethereal-command-site.appspot.com',
  messagingSenderId: '952627774206',
  appId: '1:952627774206:web:e00951cf33aaf2deb41baf',
  measurementId: 'G-QQSB7ZYHN9',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Login function
export async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('User logged in:', userCredential.user);
    // Redirect to the homepage or show success
    window.location.href = '/index.html'; // Change as needed
  } catch (error) {
    console.error('Login error:', error.message);
    throw error;
  }
}
