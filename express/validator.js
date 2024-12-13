/* This function validates user input
 * by imposing character limits, non-
 * empty-fields, and proper email format
 */
function validateInput(request) {
    const name = request.body.name.trim();
    const email = request.body.email.trim();
    const message = request.body.message.trim();

    let errors = {};

    // Check for empty inputs
    if (!name) errors.name = "Name field must not be empty";
    if (!message) errors.message = "Message field must not be empty";
    if (!email) errors.email = "Email field must not be empty";
    // Check for proper email format
    else if(!validateEmail(email)) errors.email = "Email is invalid";

    // Check for character limits
    if (name.length > 32) errors.name = "Name field must not exceed 32 characters";
    if (message.length > 128) errors.message = "Message field must not exceed 128 characters";
    if (email.length > 64) errors.email = "Email field must not exceed 64 characters";

    return errors;
}

// I stole this function and its regex from stackoverflow
const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

module.exports = { validateInput };