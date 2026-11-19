// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";

import {
    getDatabase,
    ref,
    push,
    onValue
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-database.js";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBWskmkElrA6algOljM4tTAbf0VkrOOJX0",
    authDomain: "fir-260a0.firebaseapp.com",
    databaseURL: "https://fir-260a0-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "fir-260a0",
    storageBucket: "fir-260a0.firebasestorage.app",
    messagingSenderId: "212139764215",
    appId: "1:212139764215:web:bbe16b0e607203f87126f2",
    measurementId: "G-G2M1VG4PTT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Connect to Realtime Database
const db = getDatabase(app);

// Reference to "personer"
const personerRef = ref(db, "personer");

// Save data when button is clicked
document.getElementById("lagreBtn").addEventListener("click", () => {

    const navnInput = document.getElementById("navn");
    const navn = navnInput.value;

    if (navn.trim() === "") {
        alert("Skriv inn et navn!");
        return;
    }

    push(personerRef, {
        navn: navn
    });

    navnInput.value = "";
});

// Read and display data
onValue(personerRef, (snapshot) => {

    const liste = document.getElementById("liste");
    liste.innerHTML = "";

    const data = snapshot.val();

    if (!data) {
        return;
    }

    for (let key in data) {

        const li = document.createElement("li");
        li.textContent = data[key].navn;

        liste.appendChild(li);
    }
});