// team.js — shared behaviors for the Our Team page

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

// Department filter tabs for the roster list
const deptTabs = document.querySelectorAll('#deptFilters .category-tab');
const rosterRows = document.querySelectorAll('#rosterList .roster-row');

deptTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        deptTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const dept = tab.dataset.dept;

        rosterRows.forEach(row => {
            const matches = dept === 'all' || row.dataset.dept === dept;
            row.classList.toggle('hidden-row', !matches);
        });
    });
});