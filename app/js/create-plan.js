// accordion butttons
const accordionToggles = document.querySelectorAll('.js-accordion-toggle');

// form
const subscriptionForm = document.querySelector('.js-form');

// submit buttons
const submitBtn = document.querySelector('.js-form-submit');

// all radio inputs
const formInputs = document.querySelectorAll('input');

// order summary
const orderSummary = document.querySelector('.create-plan__order-summary__text');

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

function updateField(field, content) {
    field.textContent = content;
}


function updateOrderSummary(e) {
    switch (e.target.name) {
        case 'preferences': 
            if (e.target.value === 'capsules') {
                disableAccordion(grindAccordion);
                collapse(grindAccordion);
                grindInputs.forEach(input => disableInput(input));

                updateField(preferenceIntro,"using ");
                
                // remove grind from summary if capsules are selected
                updateField(grindIntro, "");
                updateField(grind, "");
            } 
            
            else {
                enableAccordion(grindAccordion);
                grindInputs.forEach(input => enableInput(input));

                preferenceIntro.textContent = "as ";

                // don't add ground ala if wholebean has been chosen
                if (grind.textContent !== 'wholebean') {
                    updateField(grindIntro, " ground ala");
                }
                
                // only add empty field when no option has been chosen
                if (!grind.textContent) {
                    updateField(grind, "_____");
                }
            }
            updateField(preference, e.target.value);
            break;

        case 'bean-type':
            updateField(beanType, e.target.value);
            break;

        case 'quantity':
            updateField(quantity, e.target.value);
            break;

        case 'grind':
            // remove 'ground ala' from order summary for wholebean
            if (e.target.value === 'wholebean') {
                updateField(grindIntro, "");
            }                 
            else {
                updateField(grindIntro, " ground ala");
            }
            updateField(grind, e.target.value);
            break;

        case 'delivery': 
            updateField(delivery, e.target.value);
            break;
    }
}

function validateInputs(inputs) {
    const inputArr = Array.from(inputs)
    const invalidInputs = inputArr.some(input => input.validity.valueMissing);
    if (invalidInputs) {
        return;
    }
    else {
        submitBtn.classList.remove('button-disabled');
        submitBtn.removeAttribute('disabled');
    }
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
        updateOrderSummary(e);
    })
})


formInputs.forEach(input => {
    input.addEventListener('change', e => {
        validateInputs(formInputs);
    })
})