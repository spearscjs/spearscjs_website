document.addEventListener("DOMContentLoaded", () => {
    // Add listener for form submission
    document.getElementById("submit-contact").addEventListener("click", (event) => handleContactSubmit(event));
})

// reCAPTCHA callback -- specified in script tag
var onReCAPTCHALoadCallback = function() {
    grecaptcha.render('recaptcha-container', {
        'sitekey' : '6LfGPZsqAAAAAAi6-3qjt2M0w3fdZ35yB_ffC-aI',
        'theme': 'dark'
    });
};

// Handler for the contact form submission
async function handleContactSubmit(event) {
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
                "Content-Type": "application/json"
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
                // GIVE SOME INDICATION OF A SENT MESSAGE
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
