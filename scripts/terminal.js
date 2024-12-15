
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