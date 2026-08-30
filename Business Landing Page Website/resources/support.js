// support.js — shared behaviors for the Support page

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

// Smooth scrolling for in-page anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').substring(1);
        if (!targetId) return;
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            e.preventDefault();
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = targetSection.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            if (navMenu) navMenu.classList.remove('active');
            if (menuToggle) menuToggle.classList.remove('active');
        }
    });
});

// FAQ accordion toggle
document.querySelectorAll('#faqList .faq-question').forEach(question => {
    question.addEventListener('click', () => {
        question.closest('.faq-item').classList.toggle('open');
    });
});

// Category tiles + live search, working together
const categoryTiles = document.querySelectorAll('#categoryTiles .category-tile');
const faqItems = document.querySelectorAll('#faqList .faq-item');
const faqSearch = document.getElementById('faqSearch');
const noFaqResults = document.getElementById('noFaqResults');

let currentCategory = 'all';
let currentQuery = '';

function applyFaqFilter() {
    let visibleCount = 0;

    faqItems.forEach(item => {
        const matchesCategory = currentCategory === 'all' || item.dataset.cat === currentCategory;
        const matchesQuery = item.textContent.toLowerCase().includes(currentQuery);
        const shouldShow = matchesCategory && matchesQuery;

        item.classList.toggle('hidden-faq', !shouldShow);
        if (shouldShow) visibleCount++;
    });

    if (noFaqResults) noFaqResults.classList.toggle('visible', visibleCount === 0);
}

categoryTiles.forEach(tile => {
    tile.addEventListener('click', () => {
        categoryTiles.forEach(t => t.classList.remove('active'));
        tile.classList.add('active');
        currentCategory = tile.dataset.cat;
        applyFaqFilter();

        const faqSection = document.getElementById('faq');
        if (faqSection) {
            const headerHeight = header ? header.offsetHeight : 0;
            window.scrollTo({
                top: faqSection.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        }
    });
});

if (faqSearch) {
    faqSearch.addEventListener('input', (e) => {
        currentQuery = e.target.value.trim().toLowerCase();
        applyFaqFilter();
    });
}

// Ticket form submission
// const ticketForm = document.getElementById('ticketForm');
// if (ticketForm) {
//     ticketForm.addEventListener('submit', (e) => {
//         e.preventDefault();
//         const formData = new FormData(ticketForm);
//         const data = Object.fromEntries(formData);

//         alert(`Thanks ${data.name}! Your ticket has been submitted — we'll respond within 24 hours.`);
//         ticketForm.reset();
//     });
// }