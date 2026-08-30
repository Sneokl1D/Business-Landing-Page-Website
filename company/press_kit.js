// press-kit.js — shared behaviors for the Press Kit page

// Loading screen
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('hidden');
    }, 1500);
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (!header) return;
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for both the top nav and the press sidebar
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            e.preventDefault();
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = targetSection.offsetTop - headerHeight - 10;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            if (navMenu) navMenu.classList.remove('active');
            if (menuToggle) menuToggle.classList.remove('active');
        }
    });
});

// Scrollspy: highlight the matching sidebar link as each section comes into view
const sidebarLinks = document.querySelectorAll('#pressSidebar a');
const pressSections = document.querySelectorAll('.press-section');

if (sidebarLinks.length && pressSections.length) {
    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                sidebarLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

    pressSections.forEach(section => spyObserver.observe(section));
}

// Click-to-copy color swatches
document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', async () => {
        const hex = swatch.dataset.hex;
        try {
            await navigator.clipboard.writeText(hex);
        } catch (err) {
            console.error('Copy failed:', err);
        }

        swatch.classList.add('copied');
        setTimeout(() => swatch.classList.remove('copied'), 1500);
    });
});