import firebase from "firebase/firebase-app";

// Initialise firebase
firebase.initializeApp({
    credential: firebase.credential.applicationDefault(),
    databaseURL: 'https://hackiethon-food-photo-journal.firebaseio.com'
});

document.addEventListener("DOMContentLoaded", () => {
    if (!window.location.pathname.includes("foodPedia")) return

    let table = document.querySelector("#foodpediaTable")

    const db = firebase.firestore()
    const foodimallist = db.collection('foodimals').listDocuments()

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