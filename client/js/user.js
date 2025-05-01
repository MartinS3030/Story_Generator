import { renderNavbar } from "./util.js";
import { APP_DOMAIN } from "./config.js";
import { USER_STRINGS } from "../lang/messages/en/user.js";

const STORY_PROMPT_TEMPLATE = `
  Write a {tone} {genre} story set in a {setting}. The main character is {characterName}, who plays the role of a {role}. {plotTwistText}
  Can you please return the story in this json format please: { "title": (string, title of the story), "paragraphs": (array of strings for each paragraph of the story) }
`;
const PLOT_TWIST_TEXT = "Add an unexpected plot twist.";

document.addEventListener("DOMContentLoaded", async () => {
  populateFormTexts();
  
  let apicalls;
  let userId;
  let username;

  try {
    const response = await fetch(`${APP_DOMAIN}/api/v1/checkUser`, {
      method: "GET",
      credentials: "include",
    });

    if (response.status === 200) {
      const userData = await response.json();
      userId = userData.id;
      username = userData.username;
    } else {
      window.location.href = "./login.html";
    }
  } catch (error) {
    console.error("Error:", error);
    window.location.href = "./login.html";
  }

  try {
    const response = await fetch(`${APP_DOMAIN}/api/v1/getApiCalls`, {
      method: "GET",
      credentials: "include",
    });

    if (response.status === 200) {
      const data = await response.json();
      apicalls = data.apiCalls;
    }
  } catch (error) {
    console.error("Error:", error);
  }

  renderNavbar(apicalls, userId, username);
  displayAPIWarningMessage(apicalls);

  document
    .getElementById("storyForm")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      const genre = document.getElementById("genre").value;
      const characterName = document.getElementById("characterName").value;
      const role = document.getElementById("role").value;
      const setting = document.getElementById("setting").value;
      const tone = document.getElementById("tone").value;
      const plotTwist = document.getElementById("plotTwist").checked;

      const plotTwistText = plotTwist ? PLOT_TWIST_TEXT : "";
      
      const prompt = STORY_PROMPT_TEMPLATE
        .replace("{tone}", tone.toLowerCase())
        .replace("{genre}", genre.toLowerCase())
        .replace("{setting}", setting.toLowerCase())
        .replace("{characterName}", characterName)
        .replace("{role}", role.toLowerCase())
        .replace("{plotTwistText}", plotTwistText);

      try {
        showLoadingOverlay();

        const response = await fetch(`${APP_DOMAIN}/api/v1/generate`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
          throw new Error(USER_STRINGS.errors.storyGeneration);
        }

        const data = await response.json();

        const parsedData = JSON.parse(data.generatedText);
        console.log(parsedData);
        const title = parsedData.title;
        const paragraphs = parsedData.paragraphs;

        displayGeneratedStory(title, paragraphs);
        updateAPICallsLeft();
      } catch (error) {
        alert(USER_STRINGS.errors.generic + error.message);
      } finally {
        hideLoadingOverlay();
      }
    });
});

function populateFormTexts() {
  document.getElementById("pageTitle").textContent = USER_STRINGS.pageTitle;
  document.getElementById("loadingText").textContent = USER_STRINGS.loading;
  
  document.getElementById("genreLabel").textContent = USER_STRINGS.genre.label;
  document.getElementById("genrePlaceholder").textContent = USER_STRINGS.genre.placeholder;
  
  document.getElementById("characterNameLabel").textContent = USER_STRINGS.characterName.label;
  const characterNameInput = document.getElementById("characterName");
  characterNameInput.pattern = USER_STRINGS.characterName.pattern;
  characterNameInput.title = USER_STRINGS.characterName.title;
  characterNameInput.maxLength = USER_STRINGS.characterName.maxLength;
  characterNameInput.addEventListener("input", validateCharacterName);
  
  document.getElementById("roleLabel").textContent = USER_STRINGS.role.label;
  document.getElementById("rolePlaceholder").textContent = USER_STRINGS.role.placeholder;
  
  document.getElementById("settingLabel").textContent = USER_STRINGS.setting.label;
  document.getElementById("settingPlaceholder").textContent = USER_STRINGS.setting.placeholder;
  
  document.getElementById("toneLabel").textContent = USER_STRINGS.tone.label;
  document.getElementById("tonePlaceholder").textContent = USER_STRINGS.tone.placeholder;
  
  document.getElementById("plotTwistLabel").textContent = USER_STRINGS.plotTwist.label;
  document.getElementById("plotTwistCheckboxLabel").textContent = USER_STRINGS.plotTwist.checkboxLabel;
  
  document.getElementById("generateButton").textContent = USER_STRINGS.generateButton;

  populateDropdownOptions("genre", USER_STRINGS.genre.options);
  populateDropdownOptions("role", USER_STRINGS.role.options);
  populateDropdownOptions("setting", USER_STRINGS.setting.options);
  populateDropdownOptions("tone", USER_STRINGS.tone.options);
}

function populateDropdownOptions(selectId, options) {
  const selectElement = document.getElementById(selectId);
  while (selectElement.options.length > 1) {
    selectElement.remove(1);
  }

  Object.entries(options).forEach(([value, text]) => {
    const option = document.createElement("option");
    option.value = text;
    option.textContent = text;
    selectElement.appendChild(option);
  });
}

function showLoadingOverlay() {
  const loadingOverlay = document.getElementById("loadingOverlay");
  loadingOverlay.style.display = "flex";
}

function hideLoadingOverlay() {
  const loadingOverlay = document.getElementById("loadingOverlay");
  loadingOverlay.style.display = "none";
}

function displayGeneratedStory(title, paragraphs) {
  const storyOutput = document.getElementById("storyOutput");
  storyOutput.innerHTML = "";
  storyOutput.style.display = "block";

  const storyTitle = document.createElement("h2");
  storyTitle.classList.add("story-title");
  storyTitle.textContent = title;
  storyOutput.appendChild(storyTitle);

  paragraphs.forEach((p) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = p;
    storyOutput.appendChild(paragraph);
  });
}

function updateAPICallsLeft() {
  const apiTextElement = document.getElementById("apitext");
  const apiText = apiTextElement.innerHTML;
  const apiCallsLeft = parseInt(apiText.match(/\d+/)[0], 10);
  // only decrement the apicalls if apicallsLeft is greater than 0
  if (apiCallsLeft > 0) {
    apiTextElement.innerHTML = `${USER_STRINGS.apiCalls}${apiCallsLeft - 1}`;
  }
}

function displayAPIWarningMessage(apicalls) {
  if (apicalls > 0) {
    return;
  }
  const apiWarningContainer = document.getElementById("apiWarningContainer");
  apiWarningContainer.classList.add("alert", "alert-warning", "apiWarningMsg");
  apiWarningContainer.setAttribute("role", "alert");
  apiWarningContainer.innerHTML = USER_STRINGS.alerts.noApiCalls;
}

function validateCharacterName(event) {
  const input = event.target;
  input.value = input.value.replace(/[^A-Za-z\s]/g, "");
}