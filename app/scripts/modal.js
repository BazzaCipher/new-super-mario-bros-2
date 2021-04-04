let modalBackground;
let modalStateId;

document.addEventListener("DOMContentLoaded", () => {
    modalBackground = document.querySelector(".modalBackground");

    for (let button of document.querySelectorAll(".modalClose")) {
        button.addEventListener("click", () => {
            modalBackground.style.display = "none";
        });
    }
});

// Shows a modal. Currently this closes any modals that are currently open.
// The modal will also close automatically after 7s.
export function showModal(id) {
    modalBackground.style.display = "block";
    for (let modal of modalBackground.children) {
        modal.style.display = "none";
    }
    let modal = document.querySelector(`.modalContent#${id}`)
    modal.style.display = "block";

    let stateId = Math.random();
    modalStateId = stateId;
    setTimeout(() => {
        // Keep a variable with a random value so we know if another modal
        // has been shown in the meantime
        if (modalStateId == stateId) {
            modal.style.display = "none";
            modalBackground.style.display = "none";
        }
    }, 7000);
}