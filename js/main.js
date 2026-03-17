// Form validation for the contact form
// Handles checking inputs, showing errors, and showing a confirmation message

// grab the form and all three input fields
const form = document.querySelector("#contact-form");
const nameInput = document.querySelector("#contact-name");
const emailInput = document.querySelector("#contact-email");
const messageInput = document.querySelector("#contact-message");

// run validation when the form is submitted
form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  // stop the form from actually submitting and reloading the page
  event.preventDefault();

  // get rid of any error messages from a previous attempt
  clearErrors();

  let isValid = true;

  // check name isn't empty
  if (nameInput.value.trim() === "") {
    showError(nameInput, "Please enter your name.");
    isValid = false;
  }

  // check email isn't empty, and if it's not empty, check that it looks like an email
  // the regex just checks for something@something.something, nothing too strict
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailInput.value.trim() === "") {
    showError(emailInput, "Please enter your email.");
    isValid = false;
  } else if (!emailPattern.test(emailInput.value.trim())) {
    showError(emailInput, "Please enter a valid email address.");
    isValid = false;
  }

  // check message isn't empty
  if (messageInput.value.trim() === "") {
    showError(messageInput, "Please enter a message.");
    isValid = false;
  }

  // if everything passed, show a thank you message and clear the form
  if (isValid) {
    const confirmation = document.createElement("p");
    confirmation.textContent = "Thanks! Your message has been sent.";
    confirmation.setAttribute("id", "form-confirmation");
    form.after(confirmation);

    form.reset();

    // auto-remove the confirmation after 4 seconds so it doesn't just sit there
    setTimeout(() => {
      confirmation.remove();
    }, 4000);
  }
}

// creates a little error message right below the input that failed
function showError(input, message) {
  const error = document.createElement("span");
  error.textContent = message;
  error.setAttribute("class", "error-message");
  input.after(error);
}

// removes all error messages and the confirmation, used at the start of each submit
function clearErrors() {
  const errors = document.querySelectorAll(".error-message");
  errors.forEach((error) => error.remove());

  const confirmation = document.querySelector("#form-confirmation");
  if (confirmation) {
    confirmation.remove();
  }
}
