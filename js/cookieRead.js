// Function to read cookies
function getCookie(name) {
    const value = `; ${document.cookie}`;
    console.log(value);
    const parts = value.split(`; ${name}=`);
    console.log(parts);
    if (parts.length > 0) return true;
    return false;
}

// Redirect early based on logged-in status
(function() {
    const loggedIn = getCookie('isLoggedIn');
    console.log(loggedIn);
    if (!loggedIn) {
        window.location.href = '/login'; // Redirect to login if no valid login cookie
    }
})();