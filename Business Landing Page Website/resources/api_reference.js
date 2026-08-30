// api-reference.js — shared behaviors for the API Reference page

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

// Smooth scrolling for top nav and endpoint sidebar links
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

// Scrollspy: highlight the active endpoint in the sidebar as you scroll
const endpointBlocks = document.querySelectorAll('.endpoint-block');
const sidebarLinks = document.querySelectorAll('#apiSidebar .api-link');

if (endpointBlocks.length) {
    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                sidebarLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { rootMargin: '-30% 0px -55% 0px', threshold: 0 });

    endpointBlocks.forEach(block => spyObserver.observe(block));
}

// Tab switching within each endpoint's code example panel
document.querySelectorAll('.endpoint-example').forEach(panelGroup => {
    const tabs = panelGroup.querySelectorAll('.code-tab');
    const panels = panelGroup.querySelectorAll('.code-tab-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            const target = panelGroup.querySelector(`.code-tab-panel[data-panel="${tab.dataset.tab}"]`);
            if (target) target.classList.add('active');
        });
    });
});

// Live search filter — only matches actual endpoint blocks, not the layout wrapper
const searchInput = document.getElementById('searchInput');
const searchItems = document.querySelectorAll('.endpoint-block.item');
const noResults = document.getElementById('noResults');

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        let visibleCount = 0;

        searchItems.forEach(item => {
            const matches = item.textContent.toLowerCase().includes(query);
            item.classList.toggle('hidden', !matches);
            if (matches) visibleCount++;
        });

        if (noResults) noResults.classList.toggle('visible', visibleCount === 0);
    });
}