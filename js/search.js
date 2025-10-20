
document.addEventListener('DOMContentLoaded', () => {
    const searchContainer = document.querySelector('.search-container');
    if (!searchContainer) return;

    const searchInput = searchContainer.querySelector('#searchInput');
    let suggestionsContainer = document.querySelector('.search-suggestions');

    // Crear el contenedor de sugerencias si no existe
    if (!suggestionsContainer) {
        suggestionsContainer = document.createElement('div');
        suggestionsContainer.classList.add('search-suggestions');
        searchContainer.appendChild(suggestionsContainer);
    }

    const pages = [
        { title: 'Esto no es una home', url: 'index.html' },
        { title: 'Dadaísmo (si es que existe)', url: 'historia.html' },
        { title: 'Los culpables de todo esto', url: 'artistas.html' },
        { title: 'Objetos que ya existian pero ahora son arte', url: 'obras.html' },
        { title: 'Perdes el tiempo aca', url: 'poesia.html' },
        { title: 'Vos que pensas? (Aunque no importe)', url: 'contacto.html' }
    ];

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        suggestionsContainer.innerHTML = '';

        if (query.length < 2) {
            suggestionsContainer.style.display = 'none';
            return;
        }

        const filteredPages = pages.filter(page => page.title.toLowerCase().includes(query));

        if (filteredPages.length > 0) {
            filteredPages.forEach(page => {
                const suggestionItem = document.createElement('a');
                suggestionItem.href = page.url;
                suggestionItem.textContent = page.title;
                suggestionsContainer.appendChild(suggestionItem);
            });
            suggestionsContainer.style.display = 'block';
        } else {
            suggestionsContainer.style.display = 'none';
        }
    });

    // Ocultar sugerencias si se hace clic fuera
    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target)) {
            suggestionsContainer.style.display = 'none';
        }
    });

     // Permitir navegar con el teclado
    searchInput.addEventListener('keydown', (e) => {
        const suggestions = suggestionsContainer.querySelectorAll('a');
        if (suggestions.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            suggestions[0].focus();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if(suggestions.length > 0) {
                window.location.href = suggestions[0].href;
            }
        }
    });

    suggestionsContainer.addEventListener('keydown', (e) => {
        const suggestions = Array.from(suggestionsContainer.querySelectorAll('a'));
        const currentIndex = suggestions.indexOf(document.activeElement);

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = (currentIndex + 1) % suggestions.length;
            suggestions[nextIndex].focus();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (currentIndex <= 0) {
                searchInput.focus();
            } else {
                const prevIndex = (currentIndex - 1 + suggestions.length) % suggestions.length;
                suggestions[prevIndex].focus();
            }
        }
    });
});
