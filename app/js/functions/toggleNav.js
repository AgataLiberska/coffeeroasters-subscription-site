import fadeIn from './utility-functions/fade-in.js';
import fadeOut from './utility-functions/fade-out.js';

function toggleNav() {
    const body = document.querySelector('body');
    const navToggle = document.querySelector('.js-nav-toggle');
    const openNav = document.querySelector('.js-toggle-open');
    const closeNav = document.querySelector('.js-toggle-close');
    const mobileNav = document.querySelector('.js-mobile-nav');

    // if nav is open - close
    if (mobileNav.classList.contains('fade-in')) {
        body.classList.remove('noscroll');
        navToggle.setAttribute('aria-expanded', 'false');
        fadeOut(mobileNav);
        fadeOut(closeNav);
        fadeIn(openNav);        
    } else {
        body.classList.add('noscroll');
        navToggle.setAttribute('aria-expanded', 'true');
        fadeOut(openNav);
        fadeIn(mobileNav);
        fadeIn(closeNav);
    }
}

export default toggleNav;