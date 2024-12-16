// Flag to track if clear is active
let isClearActive = false;
let default_cmd_out;

const inputBox = document.getElementById("command_input");
const cmdDiv = document.getElementById("command_div");

// Function to handle the command input
inputBox.addEventListener("keydown", function (event) {
  // Ensure the input is only processed when the user presses "Enter"
  if (isClearActive) {
    // Show the experience sections again
    resetExperience()
  }
  else {
    if (event.key === "Enter") {
      const command = document.getElementById("command_input").value.toLowerCase().trim();
      processCommand(command);
      document.getElementById("command_input").value = '';  // Clear the input field
      autoResizeInput(); // Refresh text box size
      event.preventDefault(); // Prevent form submission or default Enter key behavior
    }
  }

});


// Add listener for any kind of input on input box
inputBox.addEventListener("input", () => autoResizeInput());

// Add listener that focuses the input box on clicking the command div
cmdDiv.addEventListener("click", () => inputBox.focus());

// Function to process different commands
function processCommand(command) {
  const commandPrompt = document.querySelector("#cmd_out");
  console.log(command)
  switch (command) {
    case "help":
        displayHelp();
        break;
    case "clear":
        clearScreen();
        break;
    case "about":
        document.querySelector(`.nav-item a[data-section=${command}_section]`).click();
        break;
    case "skills":
        document.querySelector(`.nav-item a[data-section=${command}_section]`).click();
        break;
    case "experience":
        document.querySelector(`.nav-item a[data-section=${command}_section]`).click();
        break;
    case "contact":
        document.querySelector(`.nav-item a[data-section=${command}_section]`).click();
        break;
    default:
        commandPrompt.textContent = "Command not recognized";
        break;
  }
}

// Display help instructions
function displayHelp() {
  const commandPrompt = document.querySelector("#cmd_out");
  commandPrompt.textContent = "Commands: help, clear, about, skills, experience, contact";
}

// Clear the screen content (but keep the terminal visible)
function clearScreen() {
  // Hide sections
  const sections = document.querySelectorAll('.clear-section');
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
  const sections = document.querySelectorAll('.clear-section');
  document.querySelector('nav ul li a[data-section="about_section"]').click(); // TODO -- FIX THIS --- GO BACK TO PAGE USER WAS AT
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

// NAVBAR FUNCTIONALITY ***************************************************************************************

function switchSection(navElement) {
    // Get the ID of the clicked navbar element
    const navitems = document.querySelectorAll('nav a');
    console.log(navitems);
    navitems.forEach(navitem => {
        navitem.style.backgroundColor = "var(--background_color)";
        navitem.style.color = "var(--accent_color)";
    });
    
    
    
    const sectionId = navElement.getAttribute('data-section');
  
    

    // Hide all sections
    const sections = document.querySelectorAll('.clear-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Switch on the sectionId to determine which section to show
    document.getElementById(sectionId).style.display = 'block';
    // update active tab
    navElement.style.backgroundColor = "var(--accent_color)";
    navElement.style.color = "var(--background_color)";

}

