// MOBILE NAVBAR ========================================
const navToggle = document.querySelector('.js-nav-toggle');
const openNav = document.querySelector('.js-toggle-open');
const closeNav = document.querySelector('.js-toggle-close');
const mobileNav = document.querySelector('.js-mobile-nav');

// FORM ==================================================
const subscriptionForm = document.getElementById('subscription-form');

// accordion buttons
const accordionToggles = document.querySelectorAll('.js-accordion-toggle');

// all radio inputs
const formInputs = document.querySelectorAll('input');

// fields to update price of shipment
const weeklyPrice = document.querySelector('.js-weekly-price');
const biweeklyPrice = document.querySelector('.js-biweekly-price');
const monthlyPrice = document.querySelector('.js-monthly-price');
const priceLabels = document.querySelectorAll('.js-price-text');

// form end of form (confirmation) button
const confirmBtn = document.querySelector('.js-form-confirm');

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

const submitBtn = document.querySelector('.js-form-submit')


// prices per package depending on frequency
const priceConfig = {
    "250g": {
        "every week": 7.20, 
        "every 2 weeks": 9.60, 
        "every month": 12.00,
    },
    "500g": {
        "every week": 13.00, 
        "every 2 weeks": 17.50, 
        "every month": 22.00,
    },
    "1000g": {
        "every week": 22.00, 
        "every 2 weeks": 32.00, 
        "every month": 42.00,
    },
}

const totalMultiplier = {
    "every week" : 4,
    "every 2 weeks" : 2,
    "every month" : 1,
}

// prices as displayed in the form
const pricing = {
    
    selectedSize: "",
    setSize(size) {
        this.selectedSize = size;
    },

    frequency: "",

    setFrequency(frequency) {
        this.frequency = frequency;
    },
    
    // get option prices to be displayed in the subscription form
    getWeeklyPrice() {
        return priceConfig[this.selectedSize]["every week"];
    },
    getBiweeklyPrice() {
        return priceConfig[this.selectedSize]["every 2 weeks"];
    },
    getMonthlyPrice() {
        return priceConfig[this.selectedSize]["every month"];
    },
    getTotal() {
        return priceConfig[this.selectedSize][this.frequency] * totalMultiplier[this.frequency];
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
    let inputs = accordion.nextElementSibling.querySelectorAll('input');
    inputs.forEach(input => {
        input.setAttribute("tabindex", "0");
    })
}

function collapse(accordion) {
    accordion.classList.remove('is-open');
    accordion.setAttribute("aria-expanded", "false");
    let inputs = accordion.nextElementSibling.querySelectorAll('input');
    inputs.forEach(input => {
        input.setAttribute("tabindex", "-1");
    })
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
            updateField(weeklyPrice, `$${pricing.getWeeklyPrice().toFixed(2)}`);
            updateField(biweeklyPrice, `$${pricing.getBiweeklyPrice().toFixed(2)}`);
            updateField(monthlyPrice, `$${pricing.getMonthlyPrice().toFixed(2)}`);

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
            pricing.setFrequency(e.target.value);
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
        confirmBtn.classList.remove('button-disabled');
        confirmBtn.removeAttribute('disabled');
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
    accordion.addEventListener('click', (e) => {
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

// display modal 
confirmBtn.addEventListener('click', e => {

    fadeIn(overlay);
    fadeIn(modal);
    
    modalSummary.innerHTML = orderSummary.innerHTML;
    updateField(modalTotal, pricing.getTotal().toFixed(2));
    
})


// // submit form
// subscriptionForm.addEventListener('submit', e=> {
//     e.preventDefault();
//     console.log(e);
//     fadeOut(overlay);
//     fadeOut(modal);
// })


