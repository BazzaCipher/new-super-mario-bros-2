import firebase from "firebase/app";
import "firebase/firestore";

import "./auth";
import "./firebase";

const db = firebase.firestore().collection('foodimals')
console.log(db.path)

document.addEventListener("DOMContentLoaded", async () => {
    if (!window.location.pathname.includes("foodPedia")) return

    let table = document.querySelector("#foodpediaTable")

    const foodimallist = (await db.get()).docs
    console.log(foodimallist)

    const owned = (await db.get())

    for (let foodimal of foodimallist) {
        let row = document.createElement("tr");
        let imgCell = document.createElement("td");
        let image = new Image();
        image.width = 100;
        image.src = "/assets/QuestionMark.png"
        let text = document.createElement("td");
        text.innerText = foodimal.get().get('description');
        imgCell.appendChild(image)
        table.appendChild(row);
        row.appendChild(imgCell);
        row.appendChild(text);
    } 
})