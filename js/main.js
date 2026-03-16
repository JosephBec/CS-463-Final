// Form validation for contact form

const form = document.querySelector("#contact-form");
const nameInput = document.querySelector("#contact-name");
const emailInput = document.querySelector("#contact-email");
const messageInput = document.querySelector("#contact-message");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  // clear old errors
  clearErrors();

  let isValid = true;

  // check name
  if (nameInput.value.trim() === "") {
    showError(nameInput, "Please enter your name.");
    isValid = false;
  }

  // check email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailInput.value.trim() === "") {
    showError(emailInput, "Please enter your email.");
    isValid = false;
  } else if (!emailPattern.test(emailInput.value.trim())) {
    showError(emailInput, "Please enter a valid email address.");
    isValid = false;
  }

  // check message
  if (messageInput.value.trim() === "") {
    showError(messageInput, "Please enter a message.");
    isValid = false;
  }

  if (isValid) {
    // show confirmation
    const confirmation = document.createElement("p");
    confirmation.textContent = "Thanks! Your message has been sent.";
    confirmation.setAttribute("id", "form-confirmation");
    form.after(confirmation);

    // reset form
    form.reset();

    // remove confirmation after a few seconds
    setTimeout(() => {
      confirmation.remove();
    }, 4000);
  }
}

function showError(input, message) {
  const error = document.createElement("span");
  error.textContent = message;
  error.setAttribute("class", "error-message");
  input.after(error);
}

function clearErrors() {
  const errors = document.querySelectorAll(".error-message");
  errors.forEach((error) => error.remove());

  const confirmation = document.querySelector("#form-confirmation");
  if (confirmation) {
    confirmation.remove();
  }
}
