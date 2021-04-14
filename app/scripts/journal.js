import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

import "./firebase";
import { id as userId } from "./auth";

const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "November", "December"]

const db = firebase.firestore().collection("users");
const ref = firebase.storage().ref().child("image");

export function setup() {
    db.doc(userId).onSnapshot(async doc => {
        let data = doc.data();
        let reverse = false;

        // Order the photos by retrieving dates, then sorting
        let photoDates = []

        // Organise the photos by day
        let photosByDate = new Map();
        for (let [time, photoId] of Object.entries(data.photos)) {
            let date = new Date(Number(time));
            let [y, m, d] = [
                date.getFullYear(),
                date.getMonth(),
                date.getDate()
            ];
            let dateStr = `${months[m]} ${String(d).padStart(2, "0")}, ${y}`;
            let photos = photosByDate.get(dateStr) || [];
            photos.push(photoId);
            photosByDate.set(dateStr, photos);

            photoDates.push([y, m, d]);
        }

        let previousPhotos = document.querySelector(".previousPhotos");
        // Clear existing elements as we're regenerating the journal
        previousPhotos.innerHTML = "";

        // Order the dates
        photoDates = photoDates
            .sort(([a, b, c], [x, y, z]) => (a > x || b > y || c > z) ? -1: 1)
            .filter(([a, b, c], i, arr) => {
                if (i + 1 === arr.length) return true
                let [x, y, z] = arr[i+1]
                return !(a === x && b === y && c === z)
            });

        if (reverse) {photoDates = photoDates.reverse()}

        for (let [y, m, d] of photoDates) {
            console.log([y,m,d])
            let date = `${months[m]} ${String(d).padStart(2, "0")}, ${y}`
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
