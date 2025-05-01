import { APP_DOMAIN } from "./config.js";
import { ADMIN_STRINGS } from "../lang/messages/en/user.js";

document.addEventListener("DOMContentLoaded", async () => {
  const logoutButton = createLogoutButton();
  document.body.insertBefore(logoutButton, document.getElementById("app"));

  try {
    const response = await fetch(`${APP_DOMAIN}/api/v1/admin/data`, {
      method: "GET",
      credentials: "include",
    });

    if (response.status === 200) {
      const userData = await response.json();
      console.log(userData);
      if (!userData.isAdmin) {
        window.location.href = "./user.html";
      } else {
        displayUserTable(userData.users);
      }
    } else {
      window.location.href = "./login.html";
    }
  } catch (error) {
    console.error("Error:", error);
    window.location.href = "./login.html";
  }

  try {
    const response = await fetch(`${APP_DOMAIN}/api/v1/admin/resource`, {
      method: "GET",
      credentials: "include",
    });

    if (response.status === 200) {
      const resourceData = await response.json();
      displayResourceTable(resourceData.resources);
    } else {
      console.error(ADMIN_STRINGS.RESOURCE_FETCH_ERROR);
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

function createLogoutButton() {
  const logoutButton = document.createElement("button");
  logoutButton.textContent = ADMIN_STRINGS.LOGOUT_BUTTON;
  logoutButton.style.position = "absolute";
  logoutButton.style.top = "10px";
  logoutButton.style.right = "10px";
  logoutButton.style.padding = "5px 10px";
  logoutButton.style.backgroundColor = "#f44336";
  logoutButton.style.color = "white";
  logoutButton.style.border = "none";
  logoutButton.style.borderRadius = "4px";
  logoutButton.style.cursor = "pointer";

  logoutButton.addEventListener("click", async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch(`${APP_DOMAIN}/api/v1/logout`, {
        method: "POST",
        credentials: "include"
      });
      
      if (response.ok) {
        window.location.href = "./login.html";
      } else {
        alert(ADMIN_STRINGS.LOGOUT_FAILED);
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert(ADMIN_STRINGS.LOGOUT_ERROR);
    }
  });

  return logoutButton;
}

async function deleteUserById(userId, username) {
  if (confirm(ADMIN_STRINGS.DELETE_USER_CONFIRMATION(username))) {
    try {
      const response = await fetch(
        `${APP_DOMAIN}/api/v1/admin/delete/${userId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.status === 200) {
        const result = await response.json();
        alert(result.message);
        location.reload();
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert(ADMIN_STRINGS.DELETE_USER_ERROR);
    }
  }
}

function displayUserTable(users) {
  const app = document.getElementById("app");

  const heading = document.createElement("h1");
  heading.textContent = ADMIN_STRINGS.USER_MANAGEMENT_TITLE;
  app.appendChild(heading);

  const table = document.createElement("table");
  table.classList.add("user-table");

  const tableHeader = document.createElement("thead");
  const headerRow = document.createElement("tr");

  ADMIN_STRINGS.USER_TABLE_HEADERS.forEach((headerText) => {
    const th = document.createElement("th");
    th.textContent = headerText;
    headerRow.appendChild(th);
  });

  tableHeader.appendChild(headerRow);
  table.appendChild(tableHeader);

  const tableBody = document.createElement("tbody");

  if (users.length === 0) {
    const emptyRow = document.createElement("tr");
    const emptyCell = document.createElement("td");
    emptyCell.colSpan = 5;
    emptyCell.classList.add("empty-state");
    emptyCell.textContent = ADMIN_STRINGS.NO_USERS_FOUND;
    emptyRow.appendChild(emptyCell);
    tableBody.appendChild(emptyRow);
  } else {
    users.forEach((user) => {
      const row = document.createElement("tr");

      // Username
      const usernameCell = document.createElement("td");
      usernameCell.textContent = user.username;
      row.appendChild(usernameCell);

      // Email
      const emailCell = document.createElement("td");
      emailCell.textContent = user.email;
      row.appendChild(emailCell);

      // Admin status
      const adminCell = document.createElement("td");
      adminCell.textContent = user.is_admin ? ADMIN_STRINGS.ADMIN_STATUS.YES : ADMIN_STRINGS.ADMIN_STATUS.NO;
      row.appendChild(adminCell);

      // API calls
      const apiCallsCell = document.createElement("td");
      apiCallsCell.textContent = user.api_calls;
      row.appendChild(apiCallsCell);

      // Delete
      const actionsCell = document.createElement("td");
      if (!user.is_admin) {
        const deleteButton = document.createElement("button");
        deleteButton.textContent = ADMIN_STRINGS.DELETE_BUTTON;
        deleteButton.classList.add("delete-btn");
        deleteButton.addEventListener("click", () => {
          deleteUserById(user.id, user.username);
        });
        actionsCell.appendChild(deleteButton);
      }
      row.appendChild(actionsCell);

      tableBody.appendChild(row);
    });
  }

  table.appendChild(tableBody);
  app.appendChild(table);
}

function displayResourceTable(resources) {
  const app = document.getElementById("app");

  const heading = document.createElement("h1");
  heading.textContent = ADMIN_STRINGS.RESOURCE_MANAGEMENT_TITLE;
  app.appendChild(heading);

  const table = document.createElement("table");
  table.classList.add("user-table");

  const tableHeader = document.createElement("thead");
  const headerRow = document.createElement("tr");

  ADMIN_STRINGS.RESOURCE_TABLE_HEADERS.forEach((headerText) => {
    const th = document.createElement("th");
    th.textContent = headerText;
    headerRow.appendChild(th);
  });

  tableHeader.appendChild(headerRow);
  table.appendChild(tableHeader);

  const tableBody = document.createElement("tbody");

  if (resources.length === 0) {
    const emptyRow = document.createElement("tr");
    const emptyCell = document.createElement("td");
    emptyCell.colSpan = 3;
    emptyCell.classList.add("empty-state");
    emptyCell.textContent = ADMIN_STRINGS.NO_RESOURCES_FOUND;
    emptyRow.appendChild(emptyCell);
    tableBody.appendChild(emptyRow);
  } else {
    resources.forEach((resource) => {
      const row = document.createElement("tr");

      // Method
      const methodCell = document.createElement("td");
      methodCell.textContent = resource.method;
      row.appendChild(methodCell);

      // Endpoint
      const endpointCell = document.createElement("td");
      endpointCell.textContent = resource.endpoint;
      row.appendChild(endpointCell);

      // Requests
      const requestsCell = document.createElement("td");
      requestsCell.textContent = resource.requests;
      row.appendChild(requestsCell);

      tableBody.appendChild(row);
    });
  }

  table.appendChild(tableBody);
  app.appendChild(table);
}

