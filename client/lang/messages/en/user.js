export const ADMIN_STRINGS = {
    USER_MANAGEMENT_TITLE: "User Management",
    RESOURCE_MANAGEMENT_TITLE: "Resource Management",
    
    LOGOUT_BUTTON: "Logout",
    DELETE_BUTTON: "X",
    
    DELETE_USER_CONFIRMATION: (username) => `Are you sure you want to delete user: ${username}?`,
    
    LOGOUT_SUCCESS: "Logout successful",
    
    LOGOUT_FAILED: "Logout failed. Please try again.",
    LOGOUT_ERROR: "An error occurred during logout. Please try again.",
    RESOURCE_FETCH_ERROR: "Error fetching resource data",
    DELETE_USER_ERROR: "An error occurred while deleting the user. Please try again.",
    
    USER_TABLE_HEADERS: ["Username", "Email", "Admin Status", "API Calls", "Actions"],
    RESOURCE_TABLE_HEADERS: ["Method", "Endpoint", "Requests"],
    
    NO_USERS_FOUND: "No users found",
    NO_RESOURCES_FOUND: "No resources found",
    
    ADMIN_STATUS: {
      YES: "Yes",
      NO: "No"
    }
  };

export const SIGNUP_STRINGS = {
    SIGNUP_PAGE_TITLE: "Sign Up",

    SIGNUP_HEADING: "Sign Up",

    LABEL_FIRST_NAME: "First Name",
    LABEL_EMAIL: "Email",
    LABEL_PASSWORD: "Password",

    BUTTON_SIGNUP: "Sign Up",

    ACCOUNT_EXISTS: "Already have an account?",
    LOGIN_LINK_TEXT: "Login",

    SIGNUP_SUCCESS: "Registration successful! Please login.",
    SIGNUP_FAILED: "Registration failed. Please try again.",
    SIGNUP_ERROR: "An error occurred during registration. Please try again."
  };

export const LOGIN_STRINGS = {
    PAGE_TITLE: "Login",

    LOGIN_HEADING: "Login",

    EMAIL_LABEL: "Email",
    PASSWORD_LABEL: "Password",

    LOGIN_BUTTON: "Login",

    NO_ACCOUNT_MESSAGE: "Don't have an account?",
    SIGNUP_LINK: "Sign Up",
    
    LOGIN_FAILED: "Login failed. Please try again.",
    GENERIC_ERROR: "An error occurred during login. Please try again."
  };


export const NAVBAR_STRINGS = {
    API_CALLS_LEFT: "API calls left: ",
    HELLO_USER: "Hello ",
    CHANGE_USERNAME: "Change username",
    LOGOUT: "Logout",
    
    MODAL_TITLE: "Change Username",
    NEW_USERNAME_LABEL: "New Username",
    CANCEL_BUTTON: "Cancel",
    SUBMIT_BUTTON: "Submit",

    EMPTY_USERNAME_ERROR: "Please enter a new username.",
    LOGOUT_FAILED: "Logout failed. Please try again.",
    LOGOUT_ERROR: "An error occurred during logout. Please try again.",
    UPDATE_SUCCESS: "User updated successfully",
    UPDATE_ERROR: "An error occurred while updating user. Please try again."
  };

export const USER_STRINGS = {
    pageTitle: "Story Generator Form",
    loading: "Please wait while we generate your story...",
    
    genre: {
      label: "Genre:",
      placeholder: "Select a genre",
      options: {
        fantasy: "Fantasy",
        sciFi: "Sci-Fi",
        mystery: "Mystery",
        romance: "Romance",
        horror: "Horror",
        adventure: "Adventure"
      }
    },
    characterName: {
      label: "Main Character Name:",
      pattern: "[A-Za-z\\s]+",
      title: "Only letters and spaces are allowed",
      maxLength: "50"
    },
    role: {
      label: "Role:",
      placeholder: "Select a role",
      options: {
        hero: "Hero",
        villain: "Villain",
        sidekick: "Sidekick",
        antihero: "Antihero",
        mentor: "Mentor"
      }
    },
    setting: {
      label: "Setting:",
      placeholder: "Select a setting",
      options: {
        medievalKingdom: "Medieval Kingdom",
        futuristicCity: "Futuristic City",
        smallTown: "Small Town",
        spaceStation: "Space Station",
        hauntedHouse: "Haunted House"
      }
    },
    tone: {
      label: "Tone:",
      placeholder: "Select a tone",
      options: {
        dark: "Dark",
        lighthearted: "Lighthearted",
        suspenseful: "Suspenseful",
        humorous: "Humorous",
        inspirational: "Inspirational"
      }
    },
    plotTwist: {
      label: "Plot Twist (Optional):",
      checkboxLabel: "Include a plot twist"
    },
    
    generateButton: "Generate Story",

    errors: {
      storyGeneration: "Failed to generate story.",
      generic: "Error: "
    },
    alerts: {
      noApiCalls: "You have 0 API calls left. We'll let you off this time but soon you will have to start paying!"
    },

    apiCalls: "API calls left: "
  };