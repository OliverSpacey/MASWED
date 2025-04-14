// Function to read cookies
function getCookie(name) {
    const value = `; ${document.cookie}`;
    console.log(value);
    const parts = value.split(`; ${name}=`);
    console.log(parts);
    if (parts.length > 0) return parts;
    return null;
}
// Set the value of the input once the page loads
document.addEventListener('DOMContentLoaded', () => {
    const familyValue = getCookie('userType'); // replace 'family' with the name of your cookie
    document.getElementById('familyInput').value = familyValue || '';
  });