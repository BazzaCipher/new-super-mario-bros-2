import firebase from "firebase/app";
import "firebase/auth";

import "./firebase";

const authProvider = new firebase.auth.GoogleAuthProvider();

export let isLoggedIn = false;
export let id = null;

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        // Logged in
        isLoggedIn = true
        id = user.uid
        console.log("[auth] login done");
        document.body.classList.add("user-logged-in");

        const username = document.querySelector("#username");
        const profilePicture = document.querySelector("#userProfilePicture");
        username.textContent = user.displayName;
        profilePicture.style.backgroundImage = `url(${user.photoURL})`;
    } else {
        // Not logged in
        isLoggedIn = false
        id = null
        console.log("[auth] logout done");
        document.body.classList.remove("user-logged-in");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.querySelector("#buttonLogin");
    const logoutButton = document.querySelector("#buttonLogout");

    loginButton.addEventListener("click", () => {
        console.log("[auth] login started");
        firebase.auth().signInWithPopup(authProvider);
    });

    logoutButton.addEventListener("click", () => {
        console.log("[auth] logout started");
        firebase.auth().signOut();
    });
});