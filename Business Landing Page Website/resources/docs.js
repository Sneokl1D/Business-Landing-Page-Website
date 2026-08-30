// docs.js — shared behaviors for the Documentation page

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

// Smooth scrolling for top nav, left docs nav, and right TOC links
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

// Scrollspy: keep both the left nav and right TOC in sync with the visible section
const docsSections = document.querySelectorAll('.docs-article-section');
const navLinks = document.querySelectorAll('#docsNav .docs-link');
const tocLinks = document.querySelectorAll('#docsToc a');

if (docsSections.length) {
    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');

                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });

                tocLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

    docsSections.forEach(section => spyObserver.observe(section));
}

// Copy-to-clipboard for code blocks
document.querySelectorAll('.code-block-copy').forEach(button => {
    button.addEventListener('click', async () => {
        const codeEl = button.closest('.code-block').querySelector('code');
        try {
            await navigator.clipboard.writeText(codeEl.textContent);
        } catch (err) {
            console.error('Copy failed:', err);
        }

        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.classList.add('copied');

        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 1500);
    });
});

// Live search — filters article sections and dims/hides their matching nav links
const docsSearch = document.getElementById('docsSearch');
const noDocsResults = document.getElementById('noDocsResults');

if (docsSearch && docsSections.length) {
    docsSearch.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        let visibleCount = 0;

        docsSections.forEach(section => {
            const matches = query === '' || section.textContent.toLowerCase().includes(query);
            section.classList.toggle('hidden', !matches);
            if (matches) visibleCount++;

            const id = section.getAttribute('id');
            navLinks.forEach(link => {
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.toggle('hidden', !matches);
                }
            });
            tocLinks.forEach(link => {
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.toggle('hidden', !matches);
                }
            });
        });

        if (noDocsResults) noDocsResults.classList.toggle('visible', visibleCount === 0);
    });
}