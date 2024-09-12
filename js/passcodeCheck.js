//On the FIRST website load, ask for a passcode
//Check this passcode against those stored in the database
//If the passcode is correct, allow the user to view the website
//If the passcode is incorrect, inform the user that this is incorrect and 

//Any subsequent website loads should not ask for a passcode
//Instead, the user should be able to view the website



//Check if the user has visited the website before
window.onload = function() {
    //check cookies
    var cookies = document.cookie;
    var cookieArray = cookies.split(";");
    var guest = false;
    var bm = false;
    var gm = false;
    for (var i = 0; i < cookieArray.length; i++) {
        if (cookieArray[i].includes("guest")) {
            guest = true;
        }
        else if (cookieArray[i].includes("bm")) {
            bm = true;
        }
        else if (cookieArray[i].includes("gm")) {
            gm = true;
        }
    }
    //If the user has visited the website before, do nothing
    if (guest || bm || gm) {
        return;
    }
    //If the user has not visited the website before, ask for a passcode
    else {
        var passcode = prompt("Please enter the passcode to view this website");
        //Check the passcode against those stored in the database
        //If the passcode is correct, allow the user to view the website
        //If the passcode is incorrect, inform the user that this is incorrect
        if (passcode === "1") {
            document.cookie = "guest=true";
        }
        else if (passcode === "2") {
            document.cookie = "bm=true";
        }
        else if (passcode === "3") {
            document.cookie = "gm=true";
        }
        else {
            alert("Incorrect passcode. Please try again.");
            window.location.reload();
        }
    }
}