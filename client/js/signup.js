import { APP_DOMAIN } from "./config.js";
import { SIGNUP_STRINGS } from "../lang/messages/en/user.js";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("page-title").textContent = SIGNUP_STRINGS.SIGNUP_PAGE_TITLE;
  document.getElementById("signup-heading").textContent = SIGNUP_STRINGS.SIGNUP_HEADING;
  document.getElementById("firstname-label").textContent = SIGNUP_STRINGS.LABEL_FIRST_NAME;
  document.getElementById("email-label").textContent = SIGNUP_STRINGS.LABEL_EMAIL;
  document.getElementById("password-label").textContent = SIGNUP_STRINGS.LABEL_PASSWORD;
  document.getElementById("signup-button").textContent = SIGNUP_STRINGS.BUTTON_SIGNUP;
  document.getElementById("account-exists-text").textContent = SIGNUP_STRINGS.ACCOUNT_EXISTS;
  document.getElementById("login-link").textContent = SIGNUP_STRINGS.LOGIN_LINK_TEXT;

  const signupForm = document.getElementById("signup-form");

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("signup-firstname").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    try {
      // Make API call to register endpoint
      const response = await fetch(`${APP_DOMAIN}/api/v1/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        // Registration successful, show success message and redirect to login page
        alert(data.message || SIGNUP_STRINGS.SIGNUP_SUCCESS);
        window.location.href = "../html/login.html";
      } else {
        // Show error message
        alert(data.message || SIGNUP_STRINGS.SIGNUP_FAILED);
      }
    } catch (error) {
      console.error("Error:", error);
      alert(SIGNUP_STRINGS.SIGNUP_ERROR);
    }
  });
});