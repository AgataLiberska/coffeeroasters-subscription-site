const accordionToggles = document.querySelectorAll('.js-accordion-toggle');


accordionToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('is-open');
    })
})