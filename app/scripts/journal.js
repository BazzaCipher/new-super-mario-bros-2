import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

import "./firebase";
import { id as userId } from "./auth";

const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "November", "December"]

const db = firebase.firestore().collection("users");
const ref = firebase.storage().ref().child("image")

export function setup() {
    db.doc(userId).onSnapshot(async doc => {
        console.log(doc, doc.data());
        let data = doc.data();

        // Organise the photos by day
        let photosByDate = new Map();
        console.log(data.photos)
        for (let [time, photoId] of Object.entries(data.photos)) {
            let date = new Date(Number(time));
            let [y, m, d] = [
                String(date.getFullYear()),
                date.getMonth(),
                String(date.getDate()).padStart(2, "0")
            ];
            let dateStr = `${months[m]} ${d}, ${y}`;
            let photos = photosByDate.get(dateStr) || [];
            photos.push(photoId);
            photosByDate.set(dateStr, photos);
        }

        let previousPhotos = document.querySelector(".previousPhotos");
        // Clear existing elements as we're regenerating the journal
        previousPhotos.innerHTML = "";

        for (let date of photosByDate.keys()) {
            let dateHeading = document.createElement("p");
            dateHeading.classList.add("date");
            dateHeading.innerText = date;
            previousPhotos.appendChild(dateHeading);
            for (let photo of photosByDate.get(date)) {
                let url = await ref.child(`${userId}/i/${photo}`).getDownloadURL();
                let el = new Image();
                el.classList.add("foodPhoto");
                el.src = url;
                previousPhotos.appendChild(el);
            }
            previousPhotos.appendChild(document.createElement("hr"));
        }
    });
}
