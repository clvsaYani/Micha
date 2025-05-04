// --- Navigation ---
const navContainer = document.querySelector('.nav-container');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navItems = document.querySelectorAll('.nav-item');
const navLogo = document.querySelector('.nav-logo'); // Select the logo

let lastScrollY = window.scrollY;
let isNavVisible = false;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Toggle nav visibility based on scroll position
    if (currentScrollY > 100 && !isNavVisible) {
        navContainer.classList.add('visible');
        isNavVisible = true;
    } else if (currentScrollY <= 100 && isNavVisible) {
        navContainer.classList.remove('visible');
        // Close mobile menu if navbar hides
        if (navContainer.classList.contains('nav-open')) {
            navContainer.classList.remove('nav-open');
        }
        isNavVisible = false;
    }

    lastScrollY = currentScrollY;
});

// Mobile Menu Toggle
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navContainer.classList.toggle('nav-open');
    });

    // Close menu when a nav item is clicked (optional)
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navContainer.classList.contains('nav-open')) {
                navContainer.classList.remove('nav-open');
            }
        });
    });
}


// --- 3D Hover Effect for Cards ---
document.querySelectorAll('.card-3d').forEach(card => {
    // Set initial transform slightly tilted using JS for consistency
    card.style.transform = 'rotateY(15deg) rotateX(5deg) translateZ(0)';

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5; // Center X = 0
        const y = (e.clientY - rect.top) / rect.height - 0.5; // Center Y = 0

        // Apply more subtle rotation, adjust multipliers as needed
        const rotateY = x * 15; // Max 7.5 deg rotation
        const rotateX = -y * 15; // Max 7.5 deg rotation
        const translateZ = 40; // Lift slightly more on hover

        card.style.transition = 'transform 0.1s linear'; // Faster transition during mouse move
        card.style.transform = `
            perspective(1000px)
            rotateY(${rotateY}deg)
            rotateX(${rotateX}deg)
            translateZ(${translateZ}px)
        `;
    });

    card.addEventListener('mouseleave', () => {
        // Reset to the initial slightly tilted state with smooth transition
        card.style.transition = 'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
        card.style.transform = 'perspective(1000px) rotateY(15deg) rotateX(5deg) translateZ(0)';
    });
});


// --- Code Snippet Interaction ---
function toggleCode(element) {
    // Simple toggle class for visual feedback (CSS handles the style)
    element.classList.toggle('expanded');

    // Optional: Reset after a short delay
    // setTimeout(() => {
    //     element.classList.remove('expanded');
    // }, 300);
}

// --- Scroll Animation for Build-In Elements ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Add 'active' class when element is intersecting
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
        // Optional: Remove class when it goes out of view to re-animate
        // else {
        //     entry.target.classList.remove('active');
        // }
    });
}, {
    threshold: 0.1 // Trigger when 10% of the element is visible
});

// Observe all elements with the class 'build-in' after the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.build-in').forEach(el => {
        // Ensure elements start in their 'before animation' state
        // The initial state is now primarily handled by CSS (.build-in rules)
        observer.observe(el);
    });
});

