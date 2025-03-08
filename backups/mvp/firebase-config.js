// Your Firebase configuration
// Adapted from the Firebase console for compatibility with firebase-compat
const firebaseConfig = {
  apiKey: "AIzaSyDzeE5C5ADBJmHBI3aiIGVz_OeEnE2l9fY",
  authDomain: "anthony-5f1ad.firebaseapp.com",
  databaseURL: "https://anthony-5f1ad-default-rtdb.firebaseio.com",
  projectId: "anthony-5f1ad",
  storageBucket: "anthony-5f1ad.firebasestorage.app",
  messagingSenderId: "14502560567",
  appId: "1:14502560567:web:2384394c0c2e1ea75710b2",
  measurementId: "G-8ZJCWS0QDN"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
const database = firebase.database();

// Create a reference to the memories node in the database
const memoriesRef = database.ref('memories');

// Check Firebase connection status
const connectedRef = firebase.database().ref(".info/connected");
connectedRef.on("value", (snap) => {
  if (snap.val() === true) {
    console.log("Connected to Firebase");
  } else {
    console.log("Not connected to Firebase");
  }
}); 