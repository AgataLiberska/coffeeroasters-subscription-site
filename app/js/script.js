// TOGGLE MOBILE NAVBAR

const navToggle = document.querySelector('.js-nav-toggle');
const openNav = document.querySelector('.js-toggle-open');
const closeNav = document.querySelector('.js-toggle-close');

const mobileNav = document.querySelector('.js-mobile-nav');



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