function expandAccordion(accordion) {
    accordion.classList.add('is-open');
    accordion.setAttribute("aria-expanded", "true");
    let inputs = accordion.nextElementSibling.querySelectorAll('input');
    inputs.forEach(input => {
        input.setAttribute("tabindex", "0");
    })
}

export default expandAccordion;