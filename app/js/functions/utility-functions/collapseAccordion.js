function collapseAccordion(accordion) {
    accordion.classList.remove('is-open');
    accordion.setAttribute("aria-expanded", "false");
    let inputs = accordion.nextElementSibling.querySelectorAll('input');
    inputs.forEach(input => {
        input.setAttribute("tabindex", "-1");
    })
}

export default collapseAccordion;