import fadeOut from './utility-functions/fade-out.js';

function submitForm() {
    const overlay = document.querySelector('.js-overlay');

    fadeOut(overlay);

    //and this is where the form handler would be if I had backend
}

export default submitForm;