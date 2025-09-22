document.addEventListener('DOMContentLoaded', () => {

    // 4) Modal Behavior
    const modal = document.getElementById('dada-modal');
    const openBtn = document.getElementById('no-entres-btn');
    const closeBtn = document.querySelector('.modal .close-button');

    // Function to open the modal
    const openModal = (e) => {
        e.preventDefault(); // Prevent the link from navigating
        if (modal) {
            modal.style.display = 'flex';
        }
    };

    // Function to close the modal
    const closeModal = () => {
        if (modal) {
            modal.style.display = 'none';
        }
    };

    // Event listeners
    if (openBtn) {
        openBtn.addEventListener('click', openModal);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside the content area
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Close modal with the ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
            closeModal();
        }
    });

});