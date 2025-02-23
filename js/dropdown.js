// document.addEventListener("DOMContentLoaded", function () {
//     const menuButton = document.getElementById("menuButton");
//     const menuDropdown = document.getElementById("menuDropdown");

//     menuButton.addEventListener("click", function () {
//         menuDropdown.classList.toggle("show"); // Toggle 'show' class
//         menuButton.classList.toggle("active"); // Add 'active' class when shown

//     });

//     // Close menu if user clicks outside of it
//     document.addEventListener("click", function (event) {
//         if (!menuButton.contains(event.target) && !menuDropdown.contains(event.target)) {
//             menuDropdown.classList.remove("show");
//             menuButton.classList.remove("active"); // Add 'active' class when shown
//         }
//     });
// });

document.addEventListener("DOMContentLoaded", function () {
    const dropbtn = document.querySelector(".dropbtn");
    const dropdownContent = document.querySelector(".dropdown-content");

    dropbtn.addEventListener("click", function () {
        const isOpen = dropdownContent.classList.contains("show");

        // Toggle dropdown visibility
        dropdownContent.classList.toggle("show");

        // Add 'active' class only when dropdown is open
        if (isOpen) {
            dropbtn.classList.remove("active"); // Remove highlight when closing
        } else {
            dropbtn.classList.add("active"); // Highlight when opening
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (event) {
        if (!dropbtn.contains(event.target) && !dropdownContent.contains(event.target)) {
            dropdownContent.classList.remove("show");
            dropbtn.classList.remove("active"); // Ensure highlight is removed
        }
    });
});
