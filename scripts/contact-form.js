document.addEventListener("DOMContentLoaded", () => {
    // Add listener for form submission
    document.getElementById("submit-contact").addEventListener("click", (event) => handleContactSubmit(event));
})


// reCAPTCHA callback -- specified in script tag
var onReCAPTCHALoadCallback = function() {
    grecaptcha.render('recaptcha-container', {
        'sitekey' : '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
        'theme': 'dark'
    });
};

// Handler for the contact form submission
async function handleContactSubmit(event) {
    event.preventDefault();
    const contactResponse = document.getElementById("contact-response");
    // Fetch reCAPTCHA response
    const reCAPTCHAResponse = grecaptcha.getResponse();
    // Force captcha completion
    if (!reCAPTCHAResponse) {
        contactResponse.classList.add("contact-error", "fade-out");
        contactResponse.style.visibility = "visible";
        contactResponse.textContent = "please complete reCAPTCHA";
        setTimeout(() => {
            contactResponse.classList.remove("contact-error", "fade-out");
            contactResponse.style.visibility = "hidden";
            contactResponse.textContent = "\u00A0";
        }, 2500)
        return;
    }
    grecaptcha.reset();

    const nameInput = document.getElementById("form-name");
    const emailInput = document.getElementById("form-email");
    const messageInput = document.getElementById("form-message");

    // Reset all classes/content
    nameInput.labels[0].textContent = '\u00A0'; // Equivalent to &nbsp
    emailInput.labels[0].textContent = '\u00A0';
    messageInput.labels[0].textContent = '\u00A0';
    if (nameInput.classList.contains("contact-error")) nameInput.classList.remove("contact-error");
    if (emailInput.classList.contains("contact-error")) emailInput.classList.remove("contact-error");
    if (messageInput.classList.contains("contact-error")) messageInput.classList.remove("contact-error");

    const formName = nameInput.value;
    const formEmail = emailInput.value;
    const formMessage = messageInput.value;

    try {
        // TODO: Important: this fetch needs to be changed to point to the actual website
        // Currently, it's pointing to the local Apache test server
        let errors;
        const response = await fetch("http://10.12.1.21/submit-form", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({"token" : reCAPTCHAResponse, "name": formName, "email": formEmail, "message": formMessage}),
        })

        errors = await response.json()
            .then(data => errors = data);

        if(response.status === 200) {
            if (errors.response === "success") {
                nameInput.value = "";
                emailInput.value = "";
                messageInput.value = "";

                contactResponse.classList.add("contact-success", "fade-out");
                contactResponse.style.visibility = "visible";
                contactResponse.textContent = "message sent!";
                // Delay this until after the animation is finished
                setTimeout(() => {
                    contactResponse.classList.remove("contact-success", "fade-out");
                    contactResponse.style.visibility = "hidden";
                    contactResponse.textContent = "\u00A0";
                }, 2500)
            } else {
                for (const error in errors) {
                    switch (error) {
                        case "name": {
                           nameInput.labels[0].textContent = errors[error];
                           nameInput.classList.add("contact-error");
                           break;
                        }
                        case "email": {
                            emailInput.labels[0].textContent = errors[error];
                            emailInput.classList.add("contact-error");
                            break;
                        }
                        case "message": {
                            messageInput.labels[0].textContent = errors[error];
                            messageInput.classList.add("contact-error");
                            break;
                        }
                    }
                }
            }
        } else {
            contactResponse.classList.add("contact-error", "fade-out");
            contactResponse.style.visibility = "visible";
            contactResponse.textContent = "request rejected by server";
            setTimeout(() => {
                contactResponse.classList.remove("contact-error", "fade-out");
                contactResponse.style.visibility = "hidden";
                contactResponse.textContent = "\u00A0";
            }, 2500)
        }
    } catch (error) {
        contactResponse.classList.add("contact-error", "fade-out");
        contactResponse.style.visibility = "visible";
        contactResponse.textContent = "server unreachable";
        setTimeout(() => {
            contactResponse.classList.remove("contact-error", "fade-out");
            contactResponse.style.visibility = "hidden";
            contactResponse.textContent = "\u00A0";
        }, 2500)
    }
}
