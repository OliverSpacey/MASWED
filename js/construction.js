document.addEventListener('DOMContentLoaded', () => {
    // Create the message element
    const message = document.createElement('div');
    message.textContent = "This page is still under construction. Please use the 'RSVP Form' page to submit your response.";
    message.style.backgroundColor = "#fff3cd";
    message.style.color = "#856404";
    message.style.border = "1px solid #ffeeba";
    message.style.padding = "1em";
    message.style.margin = "1em auto";
    message.style.fontFamily = "sans-serif";
    message.style.fontSize = "1rem";
    message.style.borderRadius = "8px";
    message.style.textAlign = "center";
    message.style.maxWidth = "600px";

    // Find the nav element
    const nav = document.querySelector('.test');
    if (nav) {
      // Hide everything after the nav
      let next = nav.nextElementSibling;
      while (next) {
        next.style.display = 'none';
        next = next.nextElementSibling;
      }

      // Insert the message after the nav
      nav.parentNode.insertBefore(message, nav.nextElementSibling);
    } else {
      // If no nav found, just hide body and show message at top
      Array.from(document.body.children).forEach(child => child.style.display = 'none');
      document.body.appendChild(message);
    }
});

