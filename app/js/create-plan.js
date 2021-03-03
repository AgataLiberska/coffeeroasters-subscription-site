// accordion butttons
const accordionToggles = document.querySelectorAll('.js-accordion-toggle');

// all radio inputs
const formInputs = document.querySelectorAll('input');

// order summary fields
const preference = document.querySelector('.js-preference');
const preferenceIntro = document.querySelector('.js-preference-intro');
const beanType = document.querySelector('.js-bean-type');
const quantity = document.querySelector('.js-quantity');
const grind = document.querySelector('.js-grind');
const grindIntro = document.querySelector('.js-grind-intro');
const delivery = document.querySelector('.js-delivery');

// elements which need to be disabled if 'capsule' is chosen
const grindAccordion = document.querySelector('.js-grind-toggle');
const grindInputs = document.querySelectorAll('.js-grind-input');


// FUNCTIONS =========================================

function expand(accordion) {
    accordion.classList.add('is-open');
    accordion.setAttribute("aria-expanded", "true");
}

function collapse(accordion) {
    accordion.classList.remove('is-open');
    accordion.setAttribute("aria-expanded", "false");
}

function disableAccordion(accordion) {
    accordion.setAttribute("disabled", "");
    accordion.setAttribute("tabindex", "-1");
}

function enableAccordion(accordion) {
    accordion.removeAttribute("disabled");
    accordion.setAttribute("tabindex", "0");
}

function disableInput(input) {
    input.setAttribute("disabled", "");
    input.removeAttribute("required");
}

function enableInput(input) {
    input.removeAttribute("disabled");
    input.setAttribute("required", "");
}

function updateSummary(field, content) {
    field.textContent = content;
}


// EVENT LISTENERS ===================================

accordionToggles.forEach(accordion => {
    accordion.addEventListener('click', () => {
        if (accordion.classList.contains('is-open')) {
            collapse(accordion);
        } else {
            expand(accordion);
        }
    })
})

formInputs.forEach(input => {
    input.addEventListener('change', e => {
        switch (e.target.name) {
            case 'preferences': 
                if (e.target.value === 'capsules') {
                    disableAccordion(grindAccordion);
                    collapse(grindAccordion);
                    grindInputs.forEach(input => disableInput(input));

                    updateSummary(preferenceIntro,"using ");
                    
                    // remove grind from summary if capsules are selected
                    updateSummary(grindIntro, "");
                    updateSummary(grind, "");
                } 
                
                else {
                    enableAccordion(grindAccordion);
                    grindInputs.forEach(input => enableInput(input));

                    preferenceIntro.textContent = "as ";

                    // don't add ground ala if wholebean has been chosen
                    if (grind.textContent !== 'wholebean') {
                        updateSummary(grindIntro, " ground ala");
                    }
                    
                    // only add empty field when no option has been chosen
                    if (!grind.textContent) {
                        updateSummary(grind, "_____");
                    }
                }
                updateSummary(preference, e.target.value);
                break;

            case 'bean-type':
                updateSummary(beanType, e.target.value);
                break;

            case 'quantity':
                updateSummary(quantity, e.target.value);
                break;

            case 'grind':
                // remove 'ground ala' from order summary for wholebean
                if (e.target.value === 'wholebean') {
                    updateSummary(grindIntro, "");
                }                 
                else {
                    updateSummary(grindIntro, " ground ala");
                }
                updateSummary(grind, e.target.value);
                break;

            case 'delivery': 
                updateSummary(delivery, e.target.value);
                break;
        }
    })
})