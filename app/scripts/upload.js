import { isLoggedIn, getToken } from "./auth";
import { showModal } from "./modal";

let currentFileURL = null

document.addEventListener("DOMContentLoaded", () => {
    if (!window.location.pathname.includes("photoJournal")) return
    const uploadForm = document.querySelector("#uploadForm");
    const fileUpload = document.querySelector("#fileUpload");
    const uploadPreview = document.querySelector("#uploadPreview");

    function updatePreview() {
        URL.revokeObjectURL(currentFileURL);
        if (fileUpload.files.length > 0) {
            currentFileURL = URL.createObjectURL(fileUpload.files[0]);
            uploadForm.classList.add("previewing");
            uploadPreview.src = currentFileURL;
        } else {
            uploadForm.classList.remove("previewing");
            uploadPreview.src = "";
        }
    }

    fileUpload.addEventListener("change", updatePreview);

    uploadForm.addEventListener("submit", async ev => {
        ev.preventDefault();

        if (!isLoggedIn) {
            showModal("uploadSignedOut")
            return;
        }

        let token = await getToken();
        let response;
        try {
            response = await fetch("https://reduce-fidelity.herokuapp.com", {
                method: "POST",
                body: fileUpload.files[0],
                headers: new Headers({
                    'X-Firebase-Token': token,
                    'Content-Type': 'application/octet-stream'
                })
            });
        } catch {
            showModal("uploadError")
        }

        if (response.status != 200) {
            console.error(response);
            showModal("uploadError");
        }

        fileUpload.value = null;
        updatePreview();
    });
});
