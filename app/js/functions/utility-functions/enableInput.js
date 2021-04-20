function enableInput(input) {
    input.removeAttribute("disabled");
    input.setAttribute("required", "");
}

export default enableInput;