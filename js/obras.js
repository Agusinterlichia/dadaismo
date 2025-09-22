document.addEventListener('DOMContentLoaded', () => {
    // --- Filter Logic ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const obraCards = document.querySelectorAll('.obra-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Manage active button state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.dataset.filter;

            obraCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- Lightbox Logic ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');

    if (lightbox && lightboxImg && lightboxCaption && closeBtn) {
        obraCards.forEach(card => {
            card.addEventListener('click', () => {
                const img = card.querySelector('img');
                const info = card.querySelector('.obra-info').innerHTML;
                
                lightbox.classList.add('active');
                lightboxImg.src = img.src;
                lightboxCaption.innerHTML = info;
            });
        });

        // Close lightbox
        const closeLightbox = () => {
            lightbox.classList.remove('active');
        };

        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Close with ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }
});