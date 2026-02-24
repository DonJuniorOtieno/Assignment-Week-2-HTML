document.addEventListener('DOMContentLoaded', () => {
    const contactInput = document.getElementById('contact-input');
    const addContactBtn = document.getElementById('add-contact-btn');
    const contactList = document.getElementById('contact-list');
    const startTimerBtn = document.getElementById('start-timer-btn');
    const timerSelect = document.getElementById('timer-select');
    const sosButton = document.getElementById('sos-button');

    // Add Contact
    addContactBtn.addEventListener('click', () => {
        const value = contactInput.value.trim();
        if (value) {
            addContact(value);
            contactInput.value = '';
        }
    });

    function addContact(number) {
        const li = document.createElement('li');
        li.className = 'contact-item';

        // Create elements manually to avoid XSS
        const contactInfo = document.createElement('div');
        contactInfo.className = 'contact-info';

        const iconBg = document.createElement('div');
        iconBg.className = 'contact-icon-bg';
        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-user';
        iconBg.appendChild(icon);

        const span = document.createElement('span');
        span.textContent = number; // Safe text content

        contactInfo.appendChild(iconBg);
        contactInfo.appendChild(span);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        const trashIcon = document.createElement('i');
        trashIcon.className = 'fa-solid fa-trash';
        deleteBtn.appendChild(trashIcon);

        li.appendChild(contactInfo);
        li.appendChild(deleteBtn);

        contactList.appendChild(li);
    }

    // Event Delegation for Delete Buttons
    contactList.addEventListener('click', (e) => {
        const deleteBtn = e.target.closest('.delete-btn');
        if (deleteBtn) {
            deleteBtn.closest('.contact-item').remove();
        }
    });

    // Start Timer
    startTimerBtn.addEventListener('click', () => {
        const time = timerSelect.value;
        const originalText = startTimerBtn.textContent;
        const originalBg = window.getComputedStyle(startTimerBtn).backgroundColor;

        startTimerBtn.textContent = `Timer Started (${time}m)`;
        startTimerBtn.style.backgroundColor = '#4CAF50';

        setTimeout(() => {
            startTimerBtn.textContent = originalText;
            startTimerBtn.style.backgroundColor = originalBg;
        }, 3000); // Reset after 3 seconds for demo
    });

    // SOS Button Hold simulation
    let holdTimer;

    const startHold = (e) => {
        if (e.type === 'mousedown' && e.button !== 0) return; // Only left click
        e.preventDefault();
        sosButton.style.transform = 'scale(0.9)';
        sosButton.querySelector('.sos-subtext').textContent = 'Activating...';

        holdTimer = setTimeout(() => {
            alert('SOS ACTIVATED! Emergency contacts notified.');
            cancelHold();
        }, 2000); // 2 seconds hold
    };

    const cancelHold = () => {
        clearTimeout(holdTimer);
        sosButton.style.transform = 'scale(1)';
        sosButton.querySelector('.sos-subtext').textContent = 'Hold to Activate';
    };

    sosButton.addEventListener('mousedown', startHold);
    sosButton.addEventListener('touchstart', startHold);

    sosButton.addEventListener('mouseup', cancelHold);
    sosButton.addEventListener('mouseleave', cancelHold);
    sosButton.addEventListener('touchend', cancelHold);
});
