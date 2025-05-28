document.addEventListener('DOMContentLoaded', function () {

    const addRowBtn = document.getElementById('addRow');
    const fieldContainer = document.getElementById('fieldContainer');
    let rowCount = 0; // To ensure unique IDs
    const limitMessage = document.createElement('p');
    limitMessage.textContent = 'You can only add up to 10 guests.';
    limitMessage.style.color = 'red';
    limitMessage.style.display = 'none'; // hidden by default
    fieldContainer.parentNode.insertBefore(limitMessage, fieldContainer.nextSibling);

  
    function createFieldSet() {
        const existingForms = fieldContainer.querySelectorAll('.fieldForms');
        if (existingForms.length >= 10) {
          return; // Don't create more than 9
        }
      
        rowCount++;
        const newRow = document.createElement('div');
        newRow.classList.add('fieldForms');
      
        newRow.innerHTML = `
          <hr>
          <h3>Guest ${rowCount}</h3>
          <label for="firstName${rowCount}">Forename:</label>
          <input type="text" id="firstName${rowCount}" name="firstName" placeholder="Forename..." required>
          <p></p>
          <label for="lastName${rowCount}">Surname:</label>
          <input type="text" id="lastName${rowCount}" name="lastName" placeholder="Surname..." required>
          <p></p>
          <label for="comments${rowCount}">Comments:</label>
          <input type="text" id="comments${rowCount}" name="comments" placeholder="Dietary requirements, allergies, etc..." required>
          <p></p>
        `;
      
        fieldContainer.appendChild(newRow);
        // updateRemoveButtons();
        updateGuestNumbers();
        updateRemoveButtons();
      
        // Check if limit reached after adding
        if (fieldContainer.querySelectorAll('.fieldForms').length >= 10) {
          addRowBtn.disabled = true;
          limitMessage.style.display = 'block';
        }
    }
      
  
    function updateRemoveButtons() {
        const allRows = fieldContainer.querySelectorAll('.fieldForms');
        const allRemoveButtons = fieldContainer.querySelectorAll('.removeBtn');
      
        allRemoveButtons.forEach(btn => btn.remove());
      
        allRows.forEach(row => {
          //check for first row
          if ((row.querySelector('h3').textContent != 'Guest 1')) {
            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.textContent = 'Remove this person';
            removeBtn.className = 'removeBtn';
            removeBtn.addEventListener('click', () => {
              row.remove();
              updateRemoveButtons();
              updateGuestNumbers();
              
              if (fieldContainer.querySelectorAll('.fieldForms').length < 10) {
                addRowBtn.disabled = false;
                limitMessage.style.display = 'none';
              }
            });
            row.appendChild(removeBtn);
          }
        });
    }
      
    function updateGuestNumbers() {
        const allGuests = fieldContainer.querySelectorAll('.fieldForms');
        allGuests.forEach((row, index) => {
          const heading = row.querySelector('h3');
          if (heading) {
            heading.textContent = `Guest ${index + 1}`;
          }
        });
    }
      
  
    addRowBtn.addEventListener('click', createFieldSet);
  });
  