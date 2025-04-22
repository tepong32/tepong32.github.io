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


// for tech stacks popover
// Show or hide popover when a tech stack icon is clicked
document.querySelectorAll('.dev-icons .list-inline-item').forEach(item => {
    item.addEventListener('click', function(event) {
        // Prevent the click event from bubbling up to the document
        event.stopPropagation();

        const popover = document.getElementById('popover');
        const description = this.getAttribute('data-description');

        // Check if the popover is already visible
        if (popover.style.display === 'block' && popover.getAttribute('data-active-icon') === this.innerHTML) {
            // If the same icon is clicked, hide the popover
            popover.style.display = 'none';
            popover.removeAttribute('data-active-icon'); // Clear the active icon
        } else {
            // If a different icon is clicked, show the popover
            document.getElementById('popover-text').innerText = description;
            popover.style.display = 'block';

            // Position the popover to the right of the clicked icon
            const rect = this.getBoundingClientRect();
            popover.style.top = `${rect.top + window.scrollY}px`;
            popover.style.left = `${rect.right + 10}px`; // Position to the right of the icon

            // Set the active icon to the current one
            popover.setAttribute('data-active-icon', this.innerHTML);
        }
    });
});

// Close the popover when clicking outside of it
document.addEventListener('click', function(event) {
    const popover = document.getElementById('popover');
    if (popover.style.display === 'block') {
        popover.style.display = 'none';
        popover.removeAttribute('data-active-icon'); // Clear the active icon
    }
});


