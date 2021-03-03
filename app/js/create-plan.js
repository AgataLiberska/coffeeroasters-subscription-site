const accordionToggles = document.querySelectorAll('.js-accordion-toggle');


// open & close accordions - add class and aria-expanded
accordionToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        if (toggle.classList.contains('is-open')) {
            toggle.classList.remove('is-open');
            toggle.setAttribute("aria-expanded", "false")
        } else {
            toggle.classList.add('is-open');
            toggle.setAttribute("aria-expanded", "true");
        }
        
    })
})