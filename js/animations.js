document.addEventListener("DOMContentLoaded", function() {
    let path = document.querySelector(".swirl path");
    let length = path.getTotalLength(); // Get actual length of the path
    console.log(length);
  
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
  
    setTimeout(() => {
      path.style.transition = "stroke-dashoffset 3s ease-in-out";
      path.style.strokeDashoffset = "0";
    }, 100); // Small delay to ensure SVG is loaded
  });