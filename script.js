document.addEventListener('DOMContentLoaded', () => {
    // Search Filter for Emergency Contact List
    const contactSearch = document.getElementById('contactSearch');
    const contactTable = document.getElementById('contactTable');

    if (contactSearch && contactTable) {
        contactSearch.addEventListener('keyup', () => {
            const filter = contactSearch.value.toLowerCase();
            const rows = contactTable.getElementsByTagName('tr');

            for (let i = 1; i < rows.length; i++) {
                const cells = rows[i].getElementsByTagName('td');
                let found = false;

                for (let j = 0; j < cells.length; j++) {
                    if (cells[j].innerText.toLowerCase().includes(filter)) {
                        found = true;
                        break;
                    }
                }

                rows[i].style.display = found ? '' : 'none';
            }
        });
    }

    // Report Form Submission Mock
    const reportForm = document.getElementById('reportForm');
    const formMessage = document.getElementById('formMessage');

    if (reportForm) {
        reportForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Mock submission delay
            const submitBtn = reportForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'Submitting...';
            submitBtn.disabled = true;

            setTimeout(() => {
                reportForm.reset();
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;

                if (formMessage) {
                    formMessage.innerText = 'Thank you. Your report has been received and authorities have been notified.';
                    formMessage.className = 'success-msg';
                    formMessage.classList.remove('hidden');

                    // Hide message after 5 seconds
                    setTimeout(() => {
                        formMessage.classList.add('hidden');
                    }, 5000);
                }
            }, 1000);
        });
    }
});
