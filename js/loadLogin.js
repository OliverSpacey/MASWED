//check the cookie to see if the user has visited the website before and load the login page if they have not
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
            //set div special to display
            specCollection = document.getElementsByClassName("special")
            for(var i = 0; i < specCollection.length; i++){
                specCollection[i].style.display = "block";
            }
            gmCollection = document.getElementsByClassName("gm")
            for(var i = 0; i < gmCollection.length; i++){
                gmCollection[i].style.display = "none";
            }
            bmCollection = document.getElementsByClassName("bm")
            for(var i = 0; i < bmCollection.length; i++){
                bmCollection[i].style.display = "none";
            }
        }
        else if (cookieArray[i].includes("bridesmaid")) {
            bm = true;
            //set div special and bm to display
            specCollection = document.getElementsByClassName("special")
            for(var i = 0; i < specCollection.length; i++){
                specCollection[i].style.display = "block";
            }
            gmCollection = document.getElementsByClassName("gm")
            for(var i = 0; i < gmCollection.length; i++){
                gmCollection[i].style.display = "none";
            }
            bmCollection = document.getElementsByClassName("bm")
            for(var i = 0; i < bmCollection.length; i++){
                bmCollection[i].style.display = "block";
            }
        }
        else if (cookieArray[i].includes("groomsman")) {
            gm = true;
            //set div special and gm to display
            specCollection = document.getElementsByClassName("special")
            for(var i = 0; i < specCollection.length; i++){
                specCollection[i].style.display = "block";
            }
            gmCollection = document.getElementsByClassName("gm")
            for(var i = 0; i < gmCollection.length; i++){
                gmCollection[i].style.display = "block";
            }
            bmCollection = document.getElementsByClassName("bm")
            for(var i = 0; i < bmCollection.length; i++){
                bmCollection[i].style.display = "none";
            }
        }
    }
    //If the user has visited the website before, do nothing
    if (guest || bm || gm) {
        return;
    }
    //If the user has not visited the website before, load the login page
    else {
        console.log("User has not visited the website before. Loading login page");
        window.location.href = "/login";
    }
}
