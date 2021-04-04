// sets up the navbar not appearing at the start then appearing after scrolling up.
// This sets the windows initial location

let prevPos = window.pageYOffset

window.addEventListener("load", function () {
    const navbar = document.getElementsByClassName("navbar")[0];
    setTimeout(() => window.scrollBy(0, navbar.scrollHeight || 48), 50)
})

// window.addEventListener("scroll", function () {
//     const navbar = document.getElementsByClassName("navbar")[0];
//     if (window.pageYOffset < prevPos) {
//         navbar.classList.add("sticky");
//     } else {
//         navbar.classList.remove("sticky");
//     }

//     prevPos = window.pageYOffset
// })