// Sample passcodes for different types of users
const passcodes = {
    maryFamily: "22828",
    samFamily: "7490"
};

// Function to set cookies with an optional path
function setCookie(name, value, days, path = '/') {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value || ''}${expires}; path=${path}`;
}

function checkPasscode() {
    const userInput = document.getElementById('passcode-input').value;
    const errorMessage = document.getElementById('error-message');

    // Check the entered passcode and set cookie
    if (userInput === passcodes.maryFamily) {
        setCookie('userType', 'mary-family', 7);
        // Delay redirect to ensure cookie is set
        setTimeout(() => { window.location.href = '/'; }, 100);
    } else if (userInput === passcodes.samFamily) {
        setCookie('userType', 'sam-family', 7);
        setTimeout(() => { window.location.href = '/'; }, 100);
    } else {
        // Show error message if the passcode is invalid
        errorMessage.style.display = 'block';
    }
}