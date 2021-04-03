import firebase from "firebase/app";
import "firebase/storage";

import "./firebase";
import { isLoggedIn, id } from "./auth";
import { randomString } from "./util";

const storageRef = firebase.storage().ref();

let currentFileURL = null

document.addEventListener("DOMContentLoaded", () => {
    const uploadForm = document.querySelector("#uploadForm");
    const fileUpload = document.querySelector("#fileUpload");
    const uploadPreview = document.querySelector("#uploadPreview");

    fileUpload.addEventListener("change", ev => {
        URL.revokeObjectURL(currentFileURL);
        currentFileURL = URL.createObjectURL(ev.target.files[0]);
        uploadForm.classList.add("previewing");
        uploadPreview.src = currentFileURL;
    });

    uploadForm.addEventListener("submit", async ev => {
        ev.preventDefault();
        if (!isLoggedIn) {
            console.log("[imageupload] Must be logged in to upload image");
            // ^ this should probably be visible to the user somehow
            return;
        }
        let uploadRef = storageRef.child(`image/${id}/i/${randomString(26)}`);
        let file = fileUpload.files[0];
        uploadRef.put(file);
    });
});