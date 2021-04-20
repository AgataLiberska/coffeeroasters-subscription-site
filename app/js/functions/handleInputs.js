import collapseAccordion from './utility-functions/collapseAccordion.js';
import disableAccordion from './utility-functions/disableAccordion.js';
import enableAccordion from './utility-functions/enableAccordion.js';
import disableInput from './utility-functions/disableInput.js';
import enableInput from './utility-functions/enableInput.js';
import updateField from './utility-functions/updateField.js';

import pricing from '../pricing/pricing.js';

function handleInputs(e) {
    // fields to update price of shipment
    const weeklyPrice = document.querySelector('.js-weekly-price');
    const biweeklyPrice = document.querySelector('.js-biweekly-price');
    const monthlyPrice = document.querySelector('.js-monthly-price');
    const priceLabels = document.querySelectorAll('.js-price-text');
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



    switch (e.target.name) {
        case 'preferences': 
            if (e.target.value === 'capsules') {
                disableAccordion(grindAccordion);
                collapseAccordion(grindAccordion);
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

export default handleInputs;