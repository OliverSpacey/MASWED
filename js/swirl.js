window.addEventListener('load', function() {
    // Find the .plant element and add the 'grow' class to trigger the animation
    let path = document.querySelector(".swirl path");
    let length = path.getTotalLength(); // Get actual length of the path
    console.log(length);
  
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
      
    requestAnimationFrame(() => {
      path.style.transition = "stroke-dashoffset 7s ease-in-out";
      path.style.strokeDashoffset = "0";
    }); 
});