function validateInputs(inputs) {
    const inputArr = Array.from(inputs)
    const invalidInputs = inputArr.some(input => input.validity.valueMissing);
    const confirmBtn = document.querySelector('.js-form-confirm');
    if (invalidInputs) {
        return;
    }
    else {
        confirmBtn.classList.remove('button-disabled');
        confirmBtn.removeAttribute('disabled');
    }
}

export default validateInputs;