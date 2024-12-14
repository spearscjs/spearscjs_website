// Flag to track if clear is active
let isClearActive = false;
let default_cmd_out;

const inputBox = document.getElementById("commandInput");
const cmdDiv = document.getElementById("commandDiv");
const submitButton = document.getElementById("submit-contact");

// Function to handle the command input
inputBox.addEventListener("keydown", function (event) {
  // Ensure the input is only processed when the user presses "Enter"
  if (isClearActive) {
    // Show the experience sections again
    resetExperience()
  }
  else {
    if (event.key === "Enter") {
      const command = document.getElementById("commandInput").value.toLowerCase().trim();
      processCommand(command);
      document.getElementById("commandInput").value = '';  // Clear the input field
      autoResizeInput(); // Refresh text box size
      event.preventDefault(); // Prevent form submission or default Enter key behavior
    }
  }
  
});


// Add listener for any kind of input on input box
inputBox.addEventListener("input", () => autoResizeInput());

// Add listener that focuses the input box on clicking the command div
cmdDiv.addEventListener("click", () => inputBox.focus());

// Add listener for form submission
submitButton.addEventListener("click", (event) => handleSubmit(event));

// Function to process different commands
function processCommand(command) {
  const commandPrompt = document.querySelector("#cmd_out");
  switch (command) {
    case "help":
        displayHelp();
        break;
    case "clear":
        clearScreen();
        break;
    default:
        commandPrompt.textContent = "Command not recognized";
        break;
  }
}

// Display help instructions
function displayHelp() {
  const commandPrompt = document.querySelector("#cmd_out");
  commandPrompt.textContent = "Commands: help, clear";
}

// Clear the screen content (but keep the terminal visible)
function clearScreen() {
  // Hide sections
  const sections = document.querySelectorAll('.clear_section');
  sections.forEach(section => {
      section.style.display = 'none';
  });
  // Update prompt
  const commandPrompt = document.querySelector("#cmd_out");
  commandPrompt.textContent = "Press any key to continue.";
  
  // Set flag to true after clear is executed
  isClearActive = true;

}

// Reset page when reloading to show all content
function resetExperience() {
  // Show sections
  const sections = document.querySelectorAll('.clear_section');
  sections.forEach(section => {
      section.style.display = 'block';
  });
  // Update prompt
  const commandPrompt = document.querySelector("#cmd_out");
  commandPrompt.textContent = default_cmd_out;
  isClearActive = false;
}

// On page load, show all content by default
window.onload = function() {
   default_cmd_out = document.querySelector("#cmd_out").textContent;
}

// Automatically resizes the input element to its contents
// This should also be placed anywhere the script itself
// is changing the contents of the text box.
function autoResizeInput() {
    let inputContents = inputBox.value;
    let inputLength = inputContents.length;

    /* TODO: properly implement character limit
    if(inputLength >= 32) {
        inputContents = '';
        inputLength = inputContents.length;
    }
    */
    inputBox.style.width = inputLength + "ch";
}

// Handler for the contact form submission
async function handleSubmit(event) {
    event.preventDefault();
    // Fetch reCAPTCHA response
    const reCAPTCHAResponse = grecaptcha.getResponse();
    // Force captcha completion
    if (!reCAPTCHAResponse) {
        alert("Please complete reCAPTCHA!");
        return;
    }
    grecaptcha.reset();

    const nameInput = document.getElementById("form-name");
    const emailInput = document.getElementById("form-email");
    const messageInput = document.getElementById("form-message");

    const formName = nameInput.value;
    const formEmail = emailInput.value;
    const formMessage = messageInput.value;

    try {
        // TODO: Important: this fetch needs to be changed to point to the actual website
        let errors;
        const response = await fetch("http://localhost:3000/submit-form", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({"token" : reCAPTCHAResponse, "name": formName, "email": formEmail, "message": formMessage}),
        })

        errors = await response.json()
            .then(data => errors = data);


        // TODO: add a better response to a submission

        if(response.status === 200) {
            if (errors.response === "success") {
                nameInput.value = "";
                emailInput.value = "";
                messageInput.value = "";
                // Reset colors to original green if they were changed
                nameInput.style.border = "1px solid #66ff66";
                emailInput.style.border = "1px solid #66ff66";
                messageInput.style.border = "1px solid #66ff66";
            } else {
                if (errors.hasOwnProperty("name")) nameInput.style.border = "1px solid red";
                if (errors.hasOwnProperty("email")) emailInput.style.border = "1px solid red";
                if (errors.hasOwnProperty("message")) messageInput.style.border = "1px solid red";
            }
        } else {
            alert("Submission unsuccessful!");
        }
    } catch (error) {
        alert("Submission unsuccessful!");
    }
}

