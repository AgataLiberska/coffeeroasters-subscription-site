function disableAccordion(accordion) {
    accordion.setAttribute("disabled", "");
    accordion.setAttribute("tabindex", "-1");
}

export default disableAccordion;