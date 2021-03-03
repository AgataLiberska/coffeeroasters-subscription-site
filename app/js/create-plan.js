const accordionToggles = document.querySelectorAll('.js-accordion-toggle');


// open & close accordions
accordionToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('is-open');
    })
})