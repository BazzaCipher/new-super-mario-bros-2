let modalBackground;
let modalIdTemp;

document.addEventListener("DOMContentLoaded", () => {
    modalBackground = document.querySelector(".modalBackground");
});

// Shows a modal. Currently this closes any modals that are currently open.
// Since there is no close button yet the modal will also close after 5s.
export function showModal(id) {
    modalBackground.style.display = "block";
    for (let modal of modalBackground.children) {
        modal.style.display = "none";
    }
    let modal = document.querySelector(`.modalContent#${id}`)
    modal.style.display = "block";

    let modalId = Math.random();
    modalIdTemp = modalId;
    setTimeout(() => {
        // Keep a variable with a random value so we know if another modal
        // has been shown in the meantime
        if (modalIdTemp == modalId) {
            modal.style.display = "none";
            modalBackground.style.display = "none";
        }
    }, 3000);
}