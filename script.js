document.addEventListener('DOMContentLoaded', () => {
    const sosButton = document.getElementById('sos-button');
    const alertStatus = document.getElementById('alert-status');

    sosButton.addEventListener('click', () => {
        alertStatus.textContent = "ALERT SENT! Help is on the way.";

        // Log to console for verification
        console.log("SOS Alert triggered at: " + new Date().toLocaleTimeString());

        // Reset message after 5 seconds
        setTimeout(() => {
            alertStatus.textContent = "";
        }, 5000);
    });

    const contactForm = document.getElementById('contact-form');
    const contactList = document.getElementById('contact-list');
    const contactNameInput = document.getElementById('contact-name');
    const contactDetailInput = document.getElementById('contact-detail');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = contactNameInput.value.trim();
        const detail = contactDetailInput.value.trim();

        if (name && detail) {
            addContact(name, detail);
            contactNameInput.value = '';
            contactDetailInput.value = '';
        }
    });

    function addContact(name, detail) {
        const li = document.createElement('li');

        const contactInfo = document.createElement('span');
        contactInfo.textContent = `${name}: ${detail}`;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => {
            contactList.removeChild(li);
        });

        li.appendChild(contactInfo);
        li.appendChild(deleteBtn);
        contactList.appendChild(li);
    }
});
