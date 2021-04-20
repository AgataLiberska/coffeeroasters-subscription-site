function fadeIn(element) {
    element.classList.remove('hidden');
    element.classList.remove('fade-out');
    element.classList.add('fade-in');
}

//remove hidden may need to be removed if we stick to has-fade

export default fadeIn;