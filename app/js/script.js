// MOBILE NAVBAR
const navToggle = document.querySelector('.js-nav-toggle');
const openNav = document.querySelector('.js-toggle-open');
const closeNav = document.querySelector('.js-toggle-close');
const mobileNav = document.querySelector('.js-mobile-nav');

// accordion buttons
const accordionToggles = document.querySelectorAll('.js-accordion-toggle');

// all radio inputs
const formInputs = document.querySelectorAll('input');

// fields to update price of shipment
const weeklyPrice = document.querySelector('.js-weekly-price');
const biweeklyPrice = document.querySelector('.js-biweekly-price');
const monthlyPrice = document.querySelector('.js-monthly-price');
const priceLabels = document.querySelectorAll('.js-price-text');

// form submit button
const submitBtn = document.querySelector('.js-form-submit');

// order summary - full text
const orderSummary = document.querySelector('.js-summary');

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

// modal elements
const overlay = document.querySelector('.js-overlay');
const modal = document.querySelector('.js-modal');
const modalSummary = document.querySelector('.js-modal-summary');
const modalTotal = document.querySelector('.js-total');

// prices

let pricing = {
    setSize(size) {
        this.currentSize = size;
    },
    currentSize: "100g",

    getWeeklyPrice() {
        return `$${this.priceConfig[this.currentSize]["weekly"]}`;
    },
    getBiweeklyPrice() {
        return `$${this.priceConfig[this.currentSize]["biweekly"]}`;
    },
    getMonthlyPrice() {
        return `$${this.priceConfig[this.currentSize]["monthly"]}`;
    },

    priceConfig: {
        "250g": {
            weekly: "7.20", 
            biweekly: "9.60", 
            monthly: "12.00",
        },
        "500g": {
            weekly: "13.00", 
            biweekly: "17.50", 
            monthly: "22.00",
        },
        "1000g": {
            weekly: "22.00", 
            biweekly: "32.00", 
            monthly: "42.00",
        },
    }
}



// FUNCTIONS ============================================================

function fadeIn(element) {
    element.classList.remove('hidden');
    element.classList.remove('fade-out');
    element.classList.add('fade-in');
}

function fadeOut(element) {
    element.classList.remove('fade-in');
    element.classList.add('fade-out');
}

function hide(element) {
    element.classList.add('hidden');
}

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

function handleInputs(e) {
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
            pricing.setSize(e.target.value);
            updateField(weeklyPrice, pricing.getWeeklyPrice());
            updateField(biweeklyPrice, pricing.getBiweeklyPrice());
            updateField(monthlyPrice, pricing.getMonthlyPrice());

            priceLabels.forEach(label => {
                updateField(label, " per shipment.");
            })
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

// EVENT LISTENERS ======================================================

// toggle mobile nav
navToggle.addEventListener('click', () => {
    //check if nav is open
    if (mobileNav.classList.contains('fade-in')) {
        
        //update aria-expanded
        navToggle.setAttribute("aria-expanded", "false");

        //if it's already open, fade out the nav
        fadeOut(mobileNav);
        setTimeout(hide, 200, mobileNav);

        //fade out the X button
        fadeOut(closeNav);
        hide(closeNav);

        //fade-in the hamburger button
        fadeIn(openNav);

    }
    else { //if nav is not open

        //update aria-expanded
        navToggle.setAttribute("aria-expanded", "true");

        //fade out the hamburger button
        fadeOut(openNav);
        hide(openNav);

        //fade-in the nav
        fadeIn(mobileNav);

        //fade in the X button
        fadeIn(closeNav);


    }

    //fade in nav
    //change button image to cross
    //change aria-expanded to true


})

// toggle form accordions
accordionToggles.forEach(accordion => {
    accordion.addEventListener('click', () => {
        if (accordion.classList.contains('is-open')) {
            collapse(accordion);
        } else {
            expand(accordion);
        }
    })
})

// update order summary while filling out the form
formInputs.forEach(input => {
    input.addEventListener('change', e => {
        handleInputs(e);
    })
})

// validate form while filling out
formInputs.forEach(input => {
    input.addEventListener('change', e => {
        validateInputs(formInputs);
    })
})

// display modal on form submit
submitBtn.addEventListener('click', e => {
    e.preventDefault();
    fadeIn(overlay);
    fadeIn(modal);

    modalSummary.innerHTML = orderSummary.innerHTML;
})