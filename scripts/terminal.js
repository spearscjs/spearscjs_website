


// Flag to track if clear is active
let isClearActive = false;
let default_cmd_out;
let commands = ["help", "clear", "about", "experience", "contact"]

const inputBox = document.getElementById("command_input");
const cmdDiv = document.getElementById("command_div");


// Add listener for any kind of input on input box
inputBox.addEventListener("input", () => autoResizeInput());
// Add listener for a selection change on input box
inputBox.addEventListener("selectionchange", () => repositionCaret());

// Add listener that focuses the input box on clicking the command div
cmdDiv.addEventListener("click", () => inputBox.focus());

// On page load, show all content by default
window.onload = function() {
  default_cmd_out = document.querySelector("#cmd_out").textContent;
}


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
      repositionCaret(); // Refresh caret position
      event.preventDefault(); // Prevent form submission or default Enter key behavior
    }
  }
});




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
    case "experience":
        document.querySelector(`.nav-item a[data-section=${command}_section]`).click();
        break;
    case "contact":
        document.querySelector(`.nav-item a[data-section=${command}_section]`).click();
        break;
    default:
        commandPrompt.textContent = `Command not recognized. Try ${commands}`
        break;
  }
}


// Display help instructions
function displayHelp() {
  const commandPrompt = document.querySelector("#cmd_out");
  commandPrompt.textContent = command_list_str;
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

// Dynamically changes the caret to be underlining the selected character
function repositionCaret() {
    const inputBoxWidth = inputBox.style.width.replace(/\D/g, ""); // .replace() removes non-numbers (the "ch" portion)
    document.getElementById("terminal_caret").style.right = (inputBoxWidth - inputBox.selectionStart) + "ch";
}

// NAVBAR FUNCTIONALITY ***************************************************************************************

function switchSection(navElement) {
    // Get the ID of the clicked navbar element
    const navItems = document.querySelectorAll('nav a');
    navItems.forEach(navItem => {
        if(navItem === navElement) {
            navItem.style.backgroundColor = "var(--accent_color)";
            navItem.style.color = "var(--background_color)";
        }
        else {
            navItem.style.backgroundColor = "var(--background_color)";
            navItem.style.color = "var(--accent_color)";
        }
    });
    
    // Hide all sections
    const sections = document.querySelectorAll('.clear-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // show section
    const sectionId = navElement.getAttribute('data-section');
    document.getElementById(sectionId).style.display = 'block';

}

