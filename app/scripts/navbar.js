// sets up the navbar not appearing at the start then appearing after scrolling up.
// This sets the windows initial location

window.onload = function () {
    const navbar = document.getElementsByClassName("navbar")[0];
    setTimeout(()=>window.scrollBy(0, navbar.scrollHeight || 48), 50)
}

window.onscroll = function () {
    const j = document.getElementById("j");
    j.innerHTML = window.pageYOffset
}