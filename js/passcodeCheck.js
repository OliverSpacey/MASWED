//Check if the user has visited the website before
window.onload = function() {
    //check cookies
    var cookies = document.cookie;
    var cookieArray = cookies.split(";");
    var maryPass = "22828";
    var samPass = "7490";
    //Search cookie for family tag, and return if found
    for (var i = 0; i < cookieArray.length; i++) {
        if (cookieArray[i].includes("mary-family")) {
            return;
        }
        else if (cookieArray[i].includes("sam-family")) {
            return;
        }
    }

    //If the user has not visited the website before, ask for a passcode
    var passcode = prompt("Please enter the passcode to view this website");
    //Check the passcode against those stored in the database
    //If the passcode is correct, allow the user to view the website
    //If the passcode is incorrect, inform the user that this is incorrect
    if (passcode ===maryPass) {
        document.cookie = "guest=true";
    }
    else if (passcode === samPass) {
        document.cookie = "bm=true";
    }
    else {
        alert("Incorrect passcode. Please try again.");
        window.location.reload();
    }
}