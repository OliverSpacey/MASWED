//check the cookie to see if the user has visited the website before and load the login page if they have not
window.onload = function() {
    //check cookies
    var cookies = document.cookie;
    var cookieArray = cookies.split(";");
    var maryFamily = false;
    var samFamily = false;
    for (var i = 0; i < cookieArray.length; i++) {
        if (cookieArray[i].includes("mary-family")) {
            return;
        }
        else if (cookieArray[i].includes("sam-family")) {
            return;
        }
    }
    //If the user has not visited the website before, load the login page
    console.log("User has not visited the website before. Loading login page");
    window.location.href = "/login";
}
