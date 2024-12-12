// Flag to track if clear is active
let isClearActive = false;
let default_cmd_out;


// Function to handle the command input
document.getElementById("commandInput").addEventListener("keydown", function (event) {
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
      event.preventDefault(); // Prevent form submission or default Enter key behavior
    }
  }
  
});



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

