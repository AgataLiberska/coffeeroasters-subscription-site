function disableInput(input) {
    input.setAttribute("disabled", "");
    input.removeAttribute("required");
}

export default disableInput;