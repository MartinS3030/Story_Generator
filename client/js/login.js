import { APP_DOMAIN } from "./config.js";
import { LOGIN_STRINGS } from "../lang/messages/en/user.js";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("page-title").textContent = LOGIN_STRINGS.PAGE_TITLE;
  document.getElementById("login-heading").textContent = LOGIN_STRINGS.LOGIN_HEADING;
  document.getElementById("email-label").textContent = LOGIN_STRINGS.EMAIL_LABEL;
  document.getElementById("password-label").textContent = LOGIN_STRINGS.PASSWORD_LABEL;
  document.getElementById("login-button").textContent = LOGIN_STRINGS.LOGIN_BUTTON;
  document.getElementById("no-account-text").textContent = LOGIN_STRINGS.NO_ACCOUNT_MESSAGE;
  document.getElementById("signup-link").textContent = LOGIN_STRINGS.SIGNUP_LINK;

  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    console.log(email, password);

    try {
      const response = await fetch(`${APP_DOMAIN}/api/v1/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        // Login successful, redirect based on user role
        if (data.isAdmin) {
          window.location.href = "admin.html";
        } else {
          window.location.href = "user.html";
        }
      } else {
        // Show error message
        alert(data.message || LOGIN_STRINGS.LOGIN_FAILED);
      }
    } catch (error) {
      console.error("Error:", error);
      alert(LOGIN_STRINGS.GENERIC_ERROR);
    }
  });
});