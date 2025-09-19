document.addEventListener('DOMContentLoaded', function () {

  const webAppUrl = "https://script.google.com/macros/s/AKfycby6Z4qmFXXvSwMcU3If3x-4sLM-smx9WSteJdo1Yvv-zHR_XMbyKm2f5NzO4aJbM0Glkg/exec";

  const allContainers = Array.from(document.querySelectorAll('#fieldContainer'));
  const fieldContainer = allContainers.find(c => c.querySelector('.fieldForms')) || document.getElementById('fieldContainer');

  const addRowBtn = document.getElementById('addRow');
  const limitMessage = document.createElement('p');
  limitMessage.textContent = 'You can only add up to 10 guests.';
  limitMessage.style.color = 'red';
  limitMessage.style.display = 'none';

  if (addRowBtn && addRowBtn.parentNode) {
    addRowBtn.parentNode.insertBefore(limitMessage, addRowBtn.nextSibling);
  }

  // Start rowCount from existing number of guest blocks (keeps numbering sensible)
  let rowCount = (fieldContainer ? fieldContainer.querySelectorAll('.fieldForms').length : 0);

  // guest list loaded from Sheets
  let guestList = [];

  // Fetch current guest list from Apps Script
  async function loadGuestList() {
    try {
      const res = await fetch(webAppUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      guestList = await res.json();
      console.log('guestList loaded', guestList);
      validateAll();
    } catch (err) {
      console.error('Could not load guest list', err);
    }
  }

  // helper string normalization
  function normalize(s) {
    return (s || '').toString().toLowerCase().trim();
  }

  function checkGuestExists(first, last) {
    const firstToCheck = normalize(first);
    const lastToCheck = normalize(last);
    if (!firstToCheck && !lastToCheck) return false;
    return guestList.some(guest => normalize(guest.first) === firstToCheck && normalize(guest.last) === lastToCheck);
  }

  // UI helpers for submit button
  function setSubmitEnabled(enabled) {
    const btn = document.getElementById('submit');
    if (!btn) return;
    btn.disabled = !enabled;
    if (enabled) {
      btn.style.opacity = '1';
      btn.style.cursor = 'pointer';
      btn.style.pointerEvents = 'auto';
      btn.classList.remove('disabled-submit');
      btn.title = '';
    } else {
      btn.style.opacity = '0.6';
      btn.style.cursor = 'not-allowed';
      btn.style.pointerEvents = 'none';
      btn.classList.add('disabled-submit');
      btn.title = 'One or more guests are already registered.';
    }
  }

  // Ensure a warning element exists in a row and attach input listeners (only once)
  function attachRowListeners(row) {
    if (!row) return;
    if (row.dataset.listenersAttached === 'true') return;

    const first = row.querySelector('input[name="firstName"]');
    const last = row.querySelector('input[name="lastName"]');
    preventNumbers(first);
    preventNumbers(last);

    if (!first || !last) return;

    // create a small warning element if missing
    let warn = row.querySelector('.name-warning');
    if (!warn) {
      warn = document.createElement('div');
      warn.className = 'name-warning';
      warn.style.color = '#b30000';
      warn.style.fontSize = '0.9em';
      warn.style.marginTop = '0.3em';
      // append after the last name input
      last.parentNode.insertBefore(warn, last.nextSibling);
    }

    const handler = () => validateAll();
    first.addEventListener('input', handler);
    last.addEventListener('input', handler);

    row.dataset.listenersAttached = 'true';
  }

  // Validate all rows, show per-row warnings and enable/disable submit
  function validateAll() {
    if (!fieldContainer) return;
    const rows = Array.from(fieldContainer.querySelectorAll('.fieldForms'));
    let anyDuplicate = false;

    rows.forEach(row => {
      const first = row.querySelector('input[name="firstName"]');
      const last = row.querySelector('input[name="lastName"]');
      const warn = row.querySelector('.name-warning');

      const fVal = first ? first.value.trim() : '';
      const lVal = last ? last.value.trim() : '';

      // if both empty -> clear warning
      if (!fVal && !lVal) {
        if (warn) warn.textContent = '';
        row.classList.remove('duplicate');
        return;
      }

      if (checkGuestExists(fVal, lVal)) {
        anyDuplicate = true;
        if (warn) warn.textContent = 'This person is already on the RSVP list. Please contact us to amend or remove them.';
        row.classList.add('duplicate');
      } else {
        if (warn) warn.textContent = '';
        row.classList.remove('duplicate');
      }
    });

    setSubmitEnabled(!anyDuplicate);
  }

  // createFieldSet + attach listeners and limit handling (this preserves your original behaviour)
  function createFieldSet() {
    if (!fieldContainer) return;
    const existingForms = fieldContainer.querySelectorAll('.fieldForms');
    if (existingForms.length >= 10) {
      return; // limit
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

    // attach listeners for validation, update remove buttons and numbers
    attachRowListeners(newRow);
    updateRemoveButtons();
    updateGuestNumbers();

    // Check limit message
    if (fieldContainer.querySelectorAll('.fieldForms').length >= 10) {
      if (addRowBtn) addRowBtn.disabled = true;
      limitMessage.style.display = 'block';
    }

    // run validation for the new row
    validateAll();
  }

  function updateRemoveButtons() {
    if (!fieldContainer) return;
    const allRows = fieldContainer.querySelectorAll('.fieldForms');
    const allRemoveButtons = fieldContainer.querySelectorAll('.removeBtn');

    allRemoveButtons.forEach(btn => btn.remove());

    allRows.forEach(row => {
      // add a remove button for rows except the first (Guest 1)
      const heading = row.querySelector('h3');
      if (!heading) return;
      if (heading.textContent !== 'Guest 1') {
        // avoid adding duplicate remove buttons
        if (!row.querySelector('.removeBtn')) {
          const removeBtn = document.createElement('button');
          removeBtn.type = 'button';
          removeBtn.textContent = 'Remove this person';
          removeBtn.className = 'removeBtn';
          removeBtn.addEventListener('click', () => {
            row.remove();
            updateRemoveButtons();
            updateGuestNumbers();

            if (fieldContainer.querySelectorAll('.fieldForms').length < 10) {
              if (addRowBtn) addRowBtn.disabled = false;
              limitMessage.style.display = 'none';
            }
            validateAll();
          });
          row.appendChild(removeBtn);
        }
      }
      // ensure validation listeners present for every row
      attachRowListeners(row);
    });
  }

  function updateGuestNumbers() {
    if (!fieldContainer) return;
    const allGuests = fieldContainer.querySelectorAll('.fieldForms');
    allGuests.forEach((row, index) => {
      const heading = row.querySelector('h3');
      if (heading) heading.textContent = `Guest ${index + 1}`;
    });
  }

  // Wire up Add Row button
  if (addRowBtn) addRowBtn.addEventListener('click', createFieldSet);

  // Attach to existing rows
  if (fieldContainer) {
    fieldContainer.querySelectorAll('.fieldForms').forEach(r => attachRowListeners(r));
  }

  // Load guest list first then run an initial validation
  loadGuestList();

  // Also re-validate on page focus (handy if sheet updated in another tab)
  window.addEventListener('focus', () => {
    loadGuestList();
  });

  const submitBtn = document.getElementById('submit');
  submitBtn.addEventListener('click', async function (e) {
    e.preventDefault();

    // check form validity
    const form = document.getElementById('rsvp-form');
    if (!form.checkValidity()){
      form.reportValidity();
      return;
    }
    else if (checkDuplicates(form) === true ){
      return;
    };

    // Disable button + show loading text
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting…";
    submitBtn.style.opacity = "0.6";
    submitBtn.style.cursor = "not-allowed";

    const scriptURL = "https://script.google.com/macros/s/AKfycby6Z4qmFXXvSwMcU3If3x-4sLM-smx9WSteJdo1Yvv-zHR_XMbyKm2f5NzO4aJbM0Glkg/exec";
    const fieldSets = document.querySelectorAll(".fieldForms");
  
    let attendance = "";
    document.getElementsByName("attendance").forEach((radio) => {
      if (radio.checked) {
        attendance = radio.value;
      }
    });
  
    const submissionPromises = [];    

    fieldSets.forEach((fieldSet, index) => {
      let data = {};
      data["family"] = document.getElementById("familyInput").value || "";
      data["attendance"] = attendance;
      data["email"] = document.getElementById("email").value.trim();
      const inputs = fieldSet.querySelectorAll("input");
      inputs.forEach(input => {
        data[input.name] = input.value.trim();
      });
  
      submissionPromises.push(
        fetch(scriptURL, {
          method: "POST",
          mode: "no-cors", // Use "cors" if debugging
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })
      );
    });
  
    try {
      await Promise.all(submissionPromises);
      window.location.href = "../success/"; // redirect if ok
    } catch (err) {
      console.error("Submission failed", err);
      alert("Something went wrong. Please try again.");
      // Re-enable so user can retry
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit";
      submitBtn.style.opacity = "1";
      submitBtn.style.cursor = "pointer";
    }
  });

  function preventNumbers(input) {
    input.addEventListener("input", () => {
      input.value = input.value.replace(/[0-9]/g, "");
    });
  }

  function checkDuplicates(form) {
    const fieldSets = form.querySelectorAll(".fieldForms");
    let duplicatesFound = false;
  
    // Clear old warnings first
    fieldSets.forEach(fieldSet => {
      const oldWarn = fieldSet.querySelector(".duplicate-warning");
      if (oldWarn) oldWarn.remove();
      const inputs = fieldSet.querySelectorAll("input[name='firstName'], input[name='lastName']");
      inputs.forEach(inp => inp.style.borderColor = "");
    });
  
    const seen = new Set();
  
    fieldSets.forEach((fieldSet) => {
      const firstNameInput = fieldSet.querySelector('input[name="firstName"]');
      const lastNameInput = fieldSet.querySelector('input[name="lastName"]');
      const firstName = firstNameInput.value.trim().toLowerCase();
      const lastName = lastNameInput.value.trim().toLowerCase();
      const key = `${firstName} ${lastName}`;
  
      if (seen.has(key) && firstName && lastName) {
        duplicatesFound = true;
  
        // highlight fields
        firstNameInput.style.borderColor = "red";
        lastNameInput.style.borderColor = "red";
  
        // add warning text if missing
        let warn = fieldSet.querySelector(".duplicate-warning");
        if (!warn) {
          warn = document.createElement("div");
          warn.className = "duplicate-warning";
          warn.style.color = "#b30000";
          warn.style.fontSize = "0.9em";
          warn.style.marginTop = "0.3em";
          lastNameInput.parentNode.insertBefore(warn, lastNameInput.nextSibling);
        }
        warn.textContent = "This guest appears more than once in your RSVP.";
      } else {
        seen.add(key);
      }
    });
  
    return duplicatesFound;
  }  
});
