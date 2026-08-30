// blog.js — shared behaviors for the Blog page

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
        if (!targetId) return; // skip bare "#" post links, they're placeholders
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

// Category filter tabs
const blogTabs = document.querySelectorAll('#blogFilters .category-tab');
const articleCards = document.querySelectorAll('#blogGrid .article-card');
const loadMoreBtn = document.getElementById('loadMoreBtn');

let currentCategory = 'all';
let revealedAll = false;

function applyFilter() {
    articleCards.forEach(card => {
        const matches = currentCategory === 'all' || card.dataset.cat === currentCategory;
        const isExtra = card.classList.contains('extra-post');
        const shouldHide = !matches || (isExtra && !revealedAll);
        card.classList.toggle('hidden-post', shouldHide);
    });
}

// Mark the last three cards as "extra" so Load More can reveal them
const allCards = Array.from(articleCards);
allCards.slice(4).forEach(card => card.classList.add('extra-post'));
applyFilter();

blogTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        blogTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentCategory = tab.dataset.cat;
        applyFilter();
    });
});

if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        revealedAll = true;
        applyFilter();
        loadMoreBtn.style.display = 'none';
    });
}

// Newsletter form
// const newsletterForm = document.getElementById('newsletterForm');
// if (newsletterForm) {
//     newsletterForm.addEventListener('submit', (e) => {
//         e.preventDefault();
//         const email = newsletterForm.querySelector('input[type="email"]').value;
//         alert(`Thanks! ${email} has been subscribed.`);
//         newsletterForm.reset();
//     });
// }