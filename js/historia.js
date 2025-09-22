document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.history-block-image');

    if (cards.length === 0) return;

    // Función para cerrar todos los overlays
    const closeAllOverlays = (exceptThisCard = null) => {
        cards.forEach(card => {
            if (card !== exceptThisCard) {
                card.classList.remove('is-open');
            }
        });
    };

    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Solo activar con click en pantallas táctiles/móviles
            if (window.matchMedia("(hover: none)").matches) {
                e.preventDefault(); // Prevenir cualquier acción por defecto
                
                const wasOpen = card.classList.contains('is-open');
                
                // Cerrar todos los overlays antes de abrir uno nuevo
                closeAllOverlays();

                // Si no estaba abierto, ábrelo. Si ya estaba abierto, el paso anterior lo cerró.
                if (!wasOpen) {
                    card.classList.add('is-open');
                }
            }
        });
    });

    // Event listener para cerrar tocando fuera
    document.addEventListener('click', (e) => {
        // Si el click no fue dentro de una tarjeta, cierra todas
        const clickedCard = e.target.closest('.history-block-image');
        if (!clickedCard) {
            closeAllOverlays();
        }
    });
});
