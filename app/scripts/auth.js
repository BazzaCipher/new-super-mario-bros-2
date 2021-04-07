import firebase from "firebase/app";
import "firebase/auth";

import "./firebase";
import { setup as setupJournal } from "./journal";
import { setup as setupFoodpedia } from "./foodpedia"
import { showModal } from "./modal";

const authProvider = new firebase.auth.GoogleAuthProvider();

export let isLoggedIn = false;
export let id = null;

firebase.auth().onAuthStateChanged(async user => {
    if (user) {
        // Logged in
        isLoggedIn = true;
        id = user.uid;
        console.log("[auth] login done");
        document.body.classList.add("user-logged-in");

        setupFoodpedia();
        if (!window.location.pathname.includes("photoJournal")) return;
        setupJournal();

        const username = document.querySelector("#username");
        const profilePicture = document.querySelector("#userProfilePicture");
        username.textContent = user.displayName;
        profilePicture.src = user.photoURL;

        // Show the welcome modal if this is a new user
        if (user.metadata.creationTime === user.metadata.lastSignInTime) {
            showModal("initialHelp");
        }
    } else {
        // Not logged in
        isLoggedIn = false;
        id = null;
        console.log("[auth] logout done");

        if (!window.location.pathname.includes("photoJournal")) return;
        document.body.classList.remove("user-logged-in");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    if (!window.location.pathname.includes("photoJournal")) return;

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

export async function getToken() {
    return await firebase.auth().currentUser.getIdToken(true);
}