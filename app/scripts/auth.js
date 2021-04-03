import firebase from "firebase/app";
import "firebase/auth";

import "./firebase"

const authProvider = new firebase.auth.GoogleAuthProvider();

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        // Logged in
        console.log("[auth] login done")
        document.body.classList.add("user-logged-in");
        document.querySelector("#username").textContent = user.displayName
        document.querySelector("#userProfilePicture").style.backgroundImage = `url(${user.photoURL})`
    } else {
        // Not logged in
        console.log("[auth] logout done")
        document.body.classList.remove("user-logged-in");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#buttonLogin").addEventListener("click", () => {
        console.log("[auth] login started")
        firebase.auth().signInWithPopup(authProvider)
    })
    document.querySelector("#buttonLogout").addEventListener("click", () => {
        console.log("[auth] logout started")
        firebase.auth().signOut()
    })
})