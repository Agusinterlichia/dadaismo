document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const clearBtn = document.getElementById('clear-btn');
    const formStatus = document.getElementById('form-status');
    const generateAbsurdAgainBtn = document.getElementById('generate-absurd-again-btn');

    const formFields = ['name', 'email', 'reason', 'message', 'privacy-consent'];
    const errorMessages = {
        name: 'Por favor, ingresa un nombre válido (mínimo 2 caracteres).',
        email: 'Por favor, ingresa un email válido (ej. dada@ejemplo.com).',
        reason: 'Por favor, selecciona un motivo.',
        message: 'Por favor, escribe un mensaje (mínimo 20 caracteres).',
        'privacy-consent': 'Debes aceptar la política de privacidad para continuar.'
    };

    // --- Form Validation ---
    const validateField = (field) => {
        const value = field.value.trim();
        const errorElement = document.getElementById(`${field.id}-error`);
        let isValid = true;

        errorElement.textContent = ''; // Clear previous error

        if (field.id === 'name') {
            if (value.length < 2) {
                isValid = false;
            }
        } else if (field.id === 'email') {
            const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
            if (!emailPattern.test(value)) {
                isValid = false;
            }
        } else if (field.id === 'reason') {
            if (value === '') {
                isValid = false;
            }
        } else if (field.id === 'message') {
            if (value.length < 20) {
                isValid = false;
            }
        } else if (field.id === 'privacy-consent') {
            if (!field.checked) {
                isValid = false;
            }
        }

        if (!isValid) {
            errorElement.textContent = errorMessages[field.id];
            field.setAttribute('aria-invalid', 'true');
        } else {
            field.setAttribute('aria-invalid', 'false');
        }
        return isValid;
    };

    formFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('blur', () => validateField(field)); // Validate on blur
            if (field.type === 'checkbox') {
                field.addEventListener('change', () => validateField(field));
            }
        }
    });

    // --- Form Submission ---
    let lastSubmissionTime = 0;
    const MIN_SUBMISSION_DELAY = 2000; // 2 seconds

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Honeypot check
        const honeypotField = document.getElementById('honeypot');
        if (honeypotField && honeypotField.value !== '') {
            console.warn('Honeypot field filled. Likely a bot.');
            formStatus.textContent = '¡Mensaje recibido! Nuestro urinario sagrado te responderá pronto.'; // Fake success for bots
            formStatus.className = 'form-status success';
            contactForm.reset();
            return;
        }

        // Client-side validation
        let allFieldsValid = true;
        formFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field && !validateField(field)) {
                allFieldsValid = false;
            }
        });

        if (!allFieldsValid) {
            formStatus.textContent = 'Por favor, corrige los errores en el formulario.';
            formStatus.className = 'form-status error';
            return;
        }

        // Delay check
        const currentTime = Date.now();
        if (currentTime - lastSubmissionTime < MIN_SUBMISSION_DELAY) {
            formStatus.textContent = 'Por favor, espera un momento antes de enviar de nuevo.';
            formStatus.className = 'form-status error';
            return;
        }
        lastSubmissionTime = currentTime;

        // Show sending state
        submitBtn.disabled = true;
        formStatus.textContent = 'Masticando nubes…';
        formStatus.className = 'form-status sending';

        // Simulate form submission (replace with actual fetch/XHR to your endpoint)
        try {
            // Example: Replace with your Formspree/Netlify/EmailJS endpoint
            // const response = await fetch('YOUR_FORM_ENDPOINT', {
            //     method: 'POST',
            //     body: new FormData(contactForm)
            // });
            // const result = await response.json(); // Or response.text()

            // Simulate network delay
            await new Promise(resolve => setTimeout(2000));

            // Simulate success/error
            const success = Math.random() > 0.2; // 80% success rate for demo

            if (success) {
                formStatus.textContent = '¡Mensaje recibido! Nuestro urinario sagrado te responderá pronto.';
                formStatus.className = 'form-status success';
                const newsletterChecked = document.getElementById('newsletter').checked;
                contactForm.reset();
                if (newsletterChecked) {
                    document.getElementById('email').value = ''; // Keep email if newsletter was checked
                }
            } else {
                throw new Error('Simulated submission error.');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            formStatus.textContent = 'Algo se cayó de la bicicleta. Probá otra vez.';
            formStatus.className = 'form-status error';
        } finally {
            submitBtn.disabled = false;
        }
    });

    // --- Clear Button ---
    clearBtn.addEventListener('click', () => {
        contactForm.reset();
        formFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.setAttribute('aria-invalid', 'false');
                const errorElement = document.getElementById(`${field.id}-error`);
                if (errorElement) {
                    errorElement.textContent = '';
                }
            }
        });
        formStatus.textContent = '';
        formStatus.className = '';
    });

    // --- Click-to-Copy Email ---
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const emailToCopy = button.dataset.email;
            try {
                await navigator.clipboard.writeText(emailToCopy);
                button.textContent = '¡Copiado!';
                setTimeout(() => {
                    button.textContent = 'Copiar';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy email:', err);
                button.textContent = 'Error';
            }
        });
    });

    // --- Absurd CTA Button ---
    generateAbsurdAgainBtn.addEventListener('click', () => {
        window.location.href = 'poesia.html'; // Link to the absurd page
    });

    // --- Social Icons Hover (already handled by CSS, but adding JS for consistency if needed) ---
    // const socialIcons = document.querySelectorAll('.social-icons-contact a img');
    // socialIcons.forEach(icon => {
    //     icon.addEventListener('mouseover', () => {
    //         icon.style.filter = 'grayscale(0%)'; // Example: make color on hover
    //     });
    //     icon.addEventListener('mouseout', () => {
    //         icon.style.filter = 'grayscale(100%)'; // Example: make grayscale on mouseout
    //     });
    // });
});