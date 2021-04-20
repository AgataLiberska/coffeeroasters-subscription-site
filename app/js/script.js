import toggleNav from './functions/toggleNav.js';
import toggleAccordion from './functions/toggleAccordion.js';
import handleInputs from './functions/handleInputs.js';
import validateInputs from './functions/validateInputs.js';
import displaySummaryModal from './functions/displaySummaryModal.js';
import submitForm from './functions/submitForm.js';


const navToggle = document.querySelector('.js-nav-toggle');
const accordionToggles = document.querySelectorAll('.js-accordion-toggle');
const subscriptionForm = document.getElementById('subscription-form');
const formInputs = document.querySelectorAll('input');
const confirmBtn = document.querySelector('.js-form-confirm');


// EVENT LISTENERS 
navToggle.addEventListener('click', toggleNav);

accordionToggles.forEach(accordion => {
    accordion.addEventListener('click', () => {
        toggleAccordion(accordion);
    })
})

formInputs.forEach(input => {
    input.addEventListener('change', e => {
        handleInputs(e);
    })
})

formInputs.forEach(input => {
    input.addEventListener('change', () => {
        validateInputs(formInputs);
    })
})

confirmBtn.addEventListener('click', displaySummaryModal);

subscriptionForm.addEventListener('submit', submitForm);


