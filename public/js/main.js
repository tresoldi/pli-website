/**
 * Plataforma de Línguas Indígenas - Main JavaScript
 * Handles: language switching, hero slideshow, scroll animations, mobile menu
 */

document.addEventListener('DOMContentLoaded', () => {
    initHeroSlideshow();
    initScrollAnimations();
    initMobileMenu();
    initMetricCounters();
    initSmoothScroll();
});

/**
 * Hero Image Slideshow
 */
function initHeroSlideshow() {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length === 0) return;

    let currentSlide = 0;
    const intervalTime = 5000;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Initialize first slide
    showSlide(0);

    // Auto-advance slides
    setInterval(nextSlide, intervalTime);
}

/**
 * Scroll-triggered Reveal Animations
 */
function initScrollAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optionally unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    reveals.forEach((el) => observer.observe(el));
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuClose = document.getElementById('menu-close');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (!menuToggle || !mobileMenu) return;

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
    });

    if (menuClose) {
        menuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    }

    // Close menu when clicking links
    mobileLinks.forEach((link) => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

/**
 * Animated Metric Counters
 */
function initMetricCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (counters.length === 0) return;

    const observerOptions = {
        threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach((counter) => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.dataset.counter, 10);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const suffix = element.dataset.suffix || '';

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = formatNumber(target) + suffix;
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current)) + suffix;
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000) {
        return num.toLocaleString('pt-BR');
    }
    return num.toString();
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach((link) => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        });
    });
}

/**
 * Language Switcher
 * Redirects to the corresponding page in the selected language
 */
function switchLanguage(lang) {
    const currentPath = window.location.pathname;
    let newPath;

    // Determine current language from path
    const isEnglish = currentPath.startsWith('/en/');
    const isSpanish = currentPath.startsWith('/es/');

    // Map page names between languages
    const pageMap = {
        pt: {
            index: 'index.html',
            platforms: 'plataformas.html',
            team: 'equipe.html',
            contact: 'contato.html',
        },
        en: {
            index: 'index.html',
            platforms: 'platforms.html',
            team: 'team.html',
            contact: 'contact.html',
        },
        es: {
            index: 'index.html',
            platforms: 'plataformas.html',
            team: 'equipo.html',
            contact: 'contacto.html',
        },
    };

    // Get current page type
    let pageType = 'index';
    if (currentPath.includes('platform') || currentPath.includes('plataforma')) {
        pageType = 'platforms';
    } else if (currentPath.includes('team') || currentPath.includes('equip')) {
        pageType = 'team';
    } else if (currentPath.includes('contact') || currentPath.includes('contato')) {
        pageType = 'contact';
    }

    // Build new path
    if (lang === 'pt') {
        newPath = '/' + pageMap.pt[pageType];
    } else {
        newPath = '/' + lang + '/' + pageMap[lang][pageType];
    }

    window.location.href = newPath;
}

// Expose to global scope for inline onclick handlers
window.switchLanguage = switchLanguage;
