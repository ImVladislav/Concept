// Contact Form Handler - Fixed Version
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#contact-form");
  const nameInput = document.querySelector("#contact-name");
  const emailInput = document.querySelector("#contact-email");
  const messageInput = document.querySelector("#contact-message");
  const submitBtn = document.querySelector("#contact-submit");
  const inputElements = document.querySelectorAll(".input-form, .form-textarea");

  if (!form || !nameInput || !emailInput || !submitBtn) {
    console.log("Form elements not found");
    return;
  }

  // Placeholder handling
  inputElements.forEach(input => {
    const placeholderText = input.closest(".input-box")?.querySelector(".placeholder-text");
    if (!placeholderText) return;

    function togglePlaceholder() {
      if (input.value.trim() !== "" || document.activeElement === input) {
        placeholderText.style.display = "none";
      } else {
        placeholderText.style.display = "block";
      }
    }

    input.addEventListener("focus", togglePlaceholder);
    input.addEventListener("blur", togglePlaceholder);
    input.addEventListener("input", togglePlaceholder);
    togglePlaceholder(); // Initial state
  });

  // Validation functions
  function validateEmail(value) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(value);
  }

  function validateName(value) {
    return value.trim().length > 1;
  }

  function validateField(input, validateFn, errorElement) {
    const value = input.value.trim();
    const isValid = validateFn(value);
    
    if (value === "") {
      input.classList.remove("input-valid-state", "input-error-state");
      if (errorElement) errorElement.style.opacity = "0";
    } else if (isValid) {
      input.classList.remove("input-error-state");
      input.classList.add("input-valid-state");
      if (errorElement) errorElement.style.opacity = "0";
    } else {
      input.classList.remove("input-valid-state");
      input.classList.add("input-error-state");
      if (errorElement) errorElement.style.opacity = "1";
    }
    
    return isValid;
  }

  // Check form validity
  function checkFormValidity() {
    const nameValid = validateName(nameInput.value);
    const emailValid = validateEmail(emailInput.value);
    const isFormValid = nameValid && emailValid;

    if (isFormValid) {
      submitBtn.classList.remove("submit-disabled-state");
      submitBtn.style.pointerEvents = "auto";
    } else {
      submitBtn.classList.add("submit-disabled-state");
      submitBtn.style.pointerEvents = "none";
    }

    return isFormValid;
  }

  // Event listeners for validation
  nameInput.addEventListener("input", () => {
    const errorElement = nameInput.closest(".form-input-item")?.querySelector(".p-14px-red");
    validateField(nameInput, validateName, errorElement);
    checkFormValidity();
  });

  emailInput.addEventListener("input", () => {
    const errorElement = emailInput.closest(".form-input-item")?.querySelector(".p-14px-red");
    validateField(emailInput, validateEmail, errorElement);
    checkFormValidity();
  });

  // Form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    
    // Validate all fields before submission
    const nameValid = validateName(nameInput.value);
    const emailValid = validateEmail(emailInput.value);
    
    if (!nameValid || !emailValid) {
      // Show error modal for missing fields
      showErrorModal();
      return;
    }

    // Show success modal
    showSuccessModal();
    
    // Reset form
    form.reset();
    
    // Reset placeholders
    inputElements.forEach(input => {
      const placeholderText = input.closest(".input-box")?.querySelector(".placeholder-text");
      if (placeholderText) placeholderText.style.display = "block";
    });
    
    // Reset validation states
    inputElements.forEach(input => {
      input.classList.remove("input-valid-state", "input-error-state");
    });
    
    // Reset error messages
    document.querySelectorAll(".p-14px-red").forEach(error => {
      error.style.opacity = "0";
    });
    
    // Update button state
    checkFormValidity();
  });

  // Error modal for missing fields
  function showErrorModal() {
    let modal = document.getElementById('error-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'error-modal';
      modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.5); display: flex; justify-content: center;
        align-items: center; z-index: 10000; opacity: 0; transition: opacity 0.3s ease;`;
      
      modal.innerHTML = `
        <div style="background: white; padding: 40px; border-radius: 12px; text-align: center; max-width: 400px; margin: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); transform: translateY(20px); transition: transform 0.3s ease;">
          <div style="width: 60px; height: 60px; background: #f44336; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
            <svg width='30' height='30' viewBox='0 0 24 24' fill='white'>
              <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/>
            </svg>
          </div>
          <h3 style='margin:0 0 10px 0;color:#333;font-size:24px;font-weight:600;'>Please fill required fields</h3>
          <p style='margin:0;color:#666;font-size:16px;line-height:1.5;'>Please fill in the Name and Email fields to submit the form.</p>
        </div>
      `;
      
      document.body.appendChild(modal);
    }
    
    modal.style.opacity = '1';
    const modalContent = modal.querySelector('div');
    modalContent.style.transform = 'translateY(0)';
    
    setTimeout(() => {
      modal.style.opacity = '0';
      modalContent.style.transform = 'translateY(20px)';
      setTimeout(() => { 
        if (modal.parentNode) {
          modal.remove(); 
        }
      }, 300);
    }, 3000);
  }

  // Success modal
  function showSuccessModal() {
    let modal = document.getElementById('success-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'success-modal';
      modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.5); display: flex; justify-content: center;
        align-items: center; z-index: 10000; opacity: 0; transition: opacity 0.3s ease;`;
      
      modal.innerHTML = `
        <div style="background: white; padding: 40px; border-radius: 12px; text-align: center; max-width: 400px; margin: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); transform: translateY(20px); transition: transform 0.3s ease;">
          <div style="width: 60px; height: 60px; background: #4CAF50; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
            <svg width='30' height='30' viewBox='0 0 24 24' fill='white'>
              <path d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'/>
            </svg>
          </div>
          <h3 style='margin:0 0 10px 0;color:#333;font-size:24px;font-weight:600;'>Message Sent!</h3>
          <p style='margin:0;color:#666;font-size:16px;line-height:1.5;'>Your message has been successfully sent. We will get back to you soon!</p>
        </div>
      `;
      
      document.body.appendChild(modal);
    }
    
    modal.style.opacity = '1';
    const modalContent = modal.querySelector('div');
    modalContent.style.transform = 'translateY(0)';
    
    setTimeout(() => {
      modal.style.opacity = '0';
      modalContent.style.transform = 'translateY(20px)';
      setTimeout(() => { 
        if (modal.parentNode) {
          modal.remove(); 
        }
      }, 300);
    }, 2000);
  }

  // Initialize form state
  checkFormValidity();
}); 