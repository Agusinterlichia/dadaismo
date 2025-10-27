document.addEventListener('DOMContentLoaded', () => {
  // estado inicial
  document.querySelectorAll('.artist-card').forEach(card => {
    const btn = card.querySelector('.leer-mas-btn');
    if (!btn) return;
    card.classList.remove('is-open');
    btn.setAttribute('aria-expanded','false');
    btn.textContent = 'Leer más';
  });

  // delegación global
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.leer-mas-btn');
    if (!btn) return;
    const card = btn.closest('.artist-card');
    if (!card) return;

    const abierto = card.classList.contains('is-open');

    // cerrar otros
    document.querySelectorAll('.artist-card.is-open').forEach(c => {
      c.classList.remove('is-open');
      const b = c.querySelector('.leer-mas-btn');
      if (b) { b.textContent = 'Leer más'; b.setAttribute('aria-expanded','false'); }
    });

    // abrir actual
    if (!abierto) {
      card.classList.add('is-open');
      btn.textContent = 'Leer menos';
      btn.setAttribute('aria-expanded','true');
    }
  });
});
