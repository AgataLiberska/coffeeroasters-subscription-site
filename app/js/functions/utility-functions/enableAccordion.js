function enableAccordion(accordion) {
    accordion.removeAttribute("disabled");
    accordion.setAttribute("tabindex", "0");
}

export default enableAccordion;