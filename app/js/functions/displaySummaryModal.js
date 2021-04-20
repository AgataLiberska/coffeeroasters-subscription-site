import fadeIn from './utility-functions/fade-in.js';
import updateField from './utility-functions/updateField.js';
import pricing from '../pricing/pricing.js';


function displaySummaryModal() {
    const body = document.querySelector('body');
    const overlay = document.querySelector('.js-overlay');
    const modal = document.querySelector('.js-modal');
    const modalSummary = document.querySelector('.js-modal-summary');
    const modalTotal = document.querySelector('.js-total');
    const orderSummary = document.querySelector('.js-summary');

    body.classList.add('noscroll');

    fadeIn(overlay);
    fadeIn(modal);

    modalSummary.innerHTML = orderSummary.innerHTML;
    updateField(modalTotal, pricing.getTotal().toFixed(2));
}

export default displaySummaryModal;