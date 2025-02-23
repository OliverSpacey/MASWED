document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menuButton");
    const menuDropdown = document.getElementById("menuDropdown");

    menuButton.addEventListener("click", function () {
        menuDropdown.classList.toggle("show"); // Toggle 'show' class
    });

    // Close menu if user clicks outside of it
    document.addEventListener("click", function (event) {
        if (!menuButton.contains(event.target) && !menuDropdown.contains(event.target)) {
            menuDropdown.classList.remove("show");
        }
    });
});
