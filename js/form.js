document.addEventListener('DOMContentLoaded', function () {
    const addRowBtn = document.getElementById('addRow');
    const fieldContainer = document.getElementById('fieldContainer');
    let rowCount = 0; // To ensure unique IDs
  
    function createFieldSet() {
      rowCount++; // Increment each time a new row is added
      const newRow = document.createElement('div');
      newRow.classList.add('fieldForms');
  
      newRow.innerHTML = `
        <p>-------------------------------------------------------</p>
        <label for="firstName">Forename:</label>
        <input type="text" id="firstName" name="first name" placeholder="Forename..." required>
        <p></p>
        <label for="lastName">Surname:</label>
        <input type="text" id="lastName" name="last name" placeholder="Surname..." required>
        <p></p>
        <label for="comments">Comments:</label>
        <input type="text" id="comments" name="comments" placeholder="Dietary requirements, allergies, etc..." required>
        <p></p>
      `;
  
      fieldContainer.appendChild(newRow);
      updateRemoveButtons();
    }
  
    function updateRemoveButtons() {
        const allRows = fieldContainer.querySelectorAll('.fieldForms');
        const allRemoveButtons = fieldContainer.querySelectorAll('.removeBtn');
      
        allRemoveButtons.forEach(btn => btn.remove()); // Clean up first
      
        allRows.forEach(row => {
          const removeBtn = document.createElement('button');
          removeBtn.type = 'button';
          removeBtn.textContent = 'Remove this person';
          removeBtn.className = 'removeBtn';
          removeBtn.addEventListener('click', () => {
            row.remove();
            updateRemoveButtons();
          });
          row.appendChild(removeBtn);
        });
      }
      
  
    addRowBtn.addEventListener('click', createFieldSet);
  });
  