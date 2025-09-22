document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Absurd Phrase Generator ---
    const generatePhraseBtn = document.getElementById('generate-phrase-btn');
    const absurdPhraseEl = document.getElementById('absurd-phrase');
    
    if (generatePhraseBtn && absurdPhraseEl) {
        const phrases = [
            "Dada no duerme, solo bosteza al revés.",
            "El bigote de Dada se esconde en tu sopa.",
            "Dada ríe mientras el reloj camina de costado.",
            "La máquina de escribir canta Dada en secreto.",
            "Un zapato grita Dada desde la ventana.",
            "Dada es un espejo que se olvida de reflejar.",
            "Las tijeras recortan silencios en nombre de Dada.",
            "Dada no explica, solo mastica palabras.",
            "El pez canta ópera en la bañera del lunes.",
            "Tu sombra juega ajedrez con una silla rota.",
            "Las nubes coleccionan zapatos perdidos en el techo.",
            "El reloj bosteza y derrama café en la mesa.",
            "Un bigote navega en bicicleta por la sopa.",
            "Las paredes susurran poemas a las cucharas.",
            "El paraguas se ríe mientras llueven palabras.",
            "El piano discute con una lámpara encendida."
        ];

        generatePhraseBtn.addEventListener('click', () => {
            const phrase = phrases[Math.floor(Math.random() * phrases.length)];
            absurdPhraseEl.textContent = phrase;
        });
    }

    // --- 2. Useless Button ---
    const uselessBtn = document.getElementById('useless-btn');
    if (uselessBtn) {
        uselessBtn.addEventListener('mouseover', () => {
            uselessBtn.classList.add('shake');
            // Change color
            const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
            uselessBtn.style.backgroundColor = randomColor;
        });

        uselessBtn.addEventListener('animationend', () => {
            uselessBtn.classList.remove('shake');
        });
    }

    // --- 3. Collage Drag-and-Drop & Controls ---
    const collageContainer = document.querySelector('.collage-container');
    const items = document.querySelectorAll('.collage-item');
    const resetButton = document.getElementById('reset-collage-btn');
    const shuffleButton = document.getElementById('shuffle-collage-btn');

    if (!collageContainer || items.length === 0) return;

    let initialPositions = [];

    const setInitialPositions = () => {
        const containerRect = collageContainer.getBoundingClientRect();
        items.forEach(item => {
            const itemWidth = item.offsetWidth;
            const itemHeight = item.offsetHeight;
            const maxLeft = containerRect.width - itemWidth;
            const maxTop = containerRect.height - itemHeight;
            item.style.left = `${Math.random() * maxLeft}px`;
            item.style.top = `${Math.random() * maxTop}px`;
        });
    };

    const storePositionsForReset = () => {
        initialPositions = [];
        items.forEach(item => {
            initialPositions.push({ top: item.style.top, left: item.style.left });
        });
    };

    // Drag and Drop Logic
    let activeItem = null, offsetX = 0, offsetY = 0, highestZIndex = 10;

    const startDrag = (e, item) => {
        // Store positions right before the first drag starts
        if (initialPositions.length === 0) {
            storePositionsForReset();
        }
        activeItem = item;
        activeItem.style.zIndex = ++highestZIndex;
        const event = e.touches ? e.touches[0] : e;
        const itemRect = activeItem.getBoundingClientRect();
        const containerRect = collageContainer.getBoundingClientRect();
        offsetX = event.clientX - (itemRect.left - containerRect.left);
        offsetY = event.clientY - (itemRect.top - containerRect.top);
        document.addEventListener('mousemove', drag);
        document.addEventListener('touchmove', drag, { passive: false });
        document.addEventListener('mouseup', endDrag);
        document.addEventListener('touchend', endDrag);
    };

    const drag = (e) => {
        if (!activeItem) return;
        e.preventDefault();
        const event = e.touches ? e.touches[0] : e;
        const containerRect = collageContainer.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        let newLeft = event.clientX - offsetX - containerRect.left;
        let newTop = event.clientY - offsetY - containerRect.top;
        const maxLeft = containerRect.width - itemRect.width;
        const maxTop = containerRect.height - itemRect.height;
        newLeft = Math.max(0, Math.min(newLeft, maxLeft));
        newTop = Math.max(0, Math.min(newTop, maxTop));
        activeItem.style.left = `${newLeft}px`;
        activeItem.style.top = `${newTop}px`;
    };

    const endDrag = () => {
        activeItem = null;
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('touchmove', drag);
        document.removeEventListener('mouseup', endDrag);
        document.removeEventListener('touchend', endDrag);
    };

    items.forEach(item => {
        item.addEventListener('mousedown', (e) => startDrag(e, item));
        item.addEventListener('touchstart', (e) => startDrag(e, item));
    });

    // Button controls
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            items.forEach((item, index) => {
                if(initialPositions[index]) {
                    item.style.top = initialPositions[index].top;
                    item.style.left = initialPositions[index].left;
                }
            });
        });
    }

    if (shuffleButton) {
        shuffleButton.addEventListener('click', () => {
            setInitialPositions();
            storePositionsForReset(); // After shuffling, save the new state as the one to reset to
        });
    }

    // Initial setup on window load to ensure images are rendered
    window.addEventListener('load', () => {
        setInitialPositions();
        storePositionsForReset();
    });
});