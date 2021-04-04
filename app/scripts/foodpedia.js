import firebase from "firebase/app";

document.addEventListener("DOMContentLoaded", async () => {
    if (!window.location.pathname.includes("foodPedia")) return

    let table = document.querySelector("#foodpediaTable")

    const db = firebase.firestore()

    db.collection('foodimals')

    let res = await fetch("/assets/foods/foodlist.json");
    let json = await res.json();
    for (let food of json.foods) {
        let row = document.createElement("tr");
        let imgCell = document.createElement("td");
        let image = new Image();
        image.width = 100;
        image.src = "/assets/QuestionMark.png"
        let text = document.createElement("td");
        text.innerText = food;
        imgCell.appendChild(image)
        table.appendChild(row);
        row.appendChild(imgCell);
        row.appendChild(text);
    } 
})