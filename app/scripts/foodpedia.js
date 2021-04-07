import firebase from "firebase/app";
import "firebase/firestore";

import { id as userId } from "./auth";
import { showModal } from "./modal";
import "./firebase";

const foodimalsDb = firebase.firestore().collection('foodimals');
const usersDb = firebase.firestore().collection("users");

let oldFoodimals = [];

export async function setup() {
    let table = document.querySelector("#foodpediaTable");

    usersDb.doc(userId).onSnapshot(async doc => {
        const foodimalList = await foodimalsDb.get();
        const ownedFoodimals = doc.get("foodimals");
        if (window.location.pathname.includes("foodPedia")) table.innerHTML = "";

        let i = 0;
        foodimalList.forEach(foodimal => {
            console.log("asdmaskdjk")
            // If this foodimal wasn't owned before, show a message letting the
            // user know that they got a new foodimal. If ownedFoodimals is
            // empty, it's the first update and we'll assume nothing is new
            console.log(oldFoodimals, ownedFoodimals, i)
            if (
                oldFoodimals.length != 0
                && ownedFoodimals.includes(i)
                && !oldFoodimals.includes(i)
            ) {
                showFoodimalModal(
                    foodimal.id, foodimal.get("description"), foodimal.get("location")
                )
            }

            if (!window.location.pathname.includes("foodPedia")) {
                i++;
                return;
            };

            // Add the foodimal to the foodimal table
            let row = document.createElement("tr");
            let imgCell = document.createElement("td");
            let image = new Image();
            image.width = 100;
            image.src = ownedFoodimals.includes(i)
                        ? `/assets/foods/${foodimal.get("location")}`
                        : "/assets/QuestionMark.png";
            let text = document.createElement("td");
            if (ownedFoodimals.includes(i)) {
                text.innerHTML = `<strong>${foodimal.id}</strong><br><br>${foodimal.get('description')}`;
            } else {
                text.innerHTML = `<span style="color: #888">${foodimal.get('description')}</span>`;
            }
            imgCell.appendChild(image);
            table.appendChild(row);
            row.appendChild(imgCell);
            row.appendChild(text);

            i++;
        });
        oldFoodimals = ownedFoodimals;
    });
}

function showFoodimalModal(name, desc, img) {
    let foodimalModalImg = document.querySelector("#foodimalModalImg");
    let foodimalModalDesc = document.querySelector("#foodimalModalDesc");
    foodimalModalDesc.innerHTML = `<strong>${name}</strong><br><br>${desc}`;
    foodimalModalImg.src = `/assets/foods/${img}`;
    showModal("newFoodimal");
    console.log("djasjdlasd", name, desc, img)
}