import expandAccordion from './utility-functions/expandAccordion.js';
import collapseAccordion from './utility-functions/collapseAccordion.js';

function toggleAccordion(accordion) {
    if (accordion.classList.contains('is-open')) {
        collapseAccordion(accordion);
    } else {
        expandAccordion(accordion);
    }
}


export default toggleAccordion;