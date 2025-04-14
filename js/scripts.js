/*!
* Start Bootstrap - Resume v7.0.5 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});


// Get the social icons container
const socialIcons = document.querySelector('.social-icons');
const stickySocialIcons = document.querySelector('.sticky-social-icons');

// Function to handle scroll event
window.addEventListener('scroll', () => {
    const rect = socialIcons.getBoundingClientRect();
    if (rect.bottom < 0) {
        stickySocialIcons.classList.add('show'); // Add class to show sticky icons
    } else {
        stickySocialIcons.classList.remove('show'); // Remove class to hide sticky icons
    }
});