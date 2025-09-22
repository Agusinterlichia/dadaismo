document.addEventListener('DOMContentLoaded', () => {
    const artistGrid = document.querySelector('.artist-grid');

    if (!artistGrid) return;

    artistGrid.addEventListener('click', (e) => {
        const target = e.target;

        // Check if a "Leer más" button was clicked
        if (target.classList.contains('leer-mas-btn')) {
            const currentCard = target.closest('.artist-card');
            if (!currentCard) return;

            const wasOpen = currentCard.classList.contains('is-open');

            // Close all other cards first
            document.querySelectorAll('.artist-card').forEach(card => {
                card.classList.remove('is-open');
            });

            // If the clicked card was not already open, open it.
            if (!wasOpen) {
                currentCard.classList.add('is-open');
            }
            // If it was open, the loop above already closed it.
        }
    });
});
