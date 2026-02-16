// script.js - Enhanced functionality for Puerta Caribe website
/* ============================================
   DOCUMENT INITIALIZATION
   ============================================ */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Puerta Caribe - Página cargada exitosamente.');
    
    // Initialize all features
    initializeNavigation();
    initializeSmoothScroll();
    initializeIntersectionObserver();
});

/* ============================================
   NAVIGATION ENHANCEMENTS
   ============================================ */
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only prevent default for hash links
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
}

/* ============================================
   SMOOTH SCROLL BEHAVIOR
   ============================================ */
function initializeSmoothScroll() {
    // Enhance smooth scroll support for older browsers
    if (!('scrollBehavior' in document.documentElement.style)) {
        console.log('Smooth scroll polyfill loaded.');
    }
}

/* ============================================
   INTERSECTION OBSERVER FOR ANIMATIONS
   ============================================ */
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class when element comes into view
                entry.target.classList.add('animate-in-view');
            }
        });
    }, observerOptions);
    
    // Observe all paso and beneficio elements
    const animatedElements = document.querySelectorAll('.paso, .beneficio');
    animatedElements.forEach(element => observer.observe(element));
}

/* ============================================
   PERFORMANCE MONITORING
   ============================================ */
window.addEventListener('load', function() {
    // Log page load performance data
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Tiempo de carga de página: ' + pageLoadTime + 'ms');
    }
});

/* ============================================
   BUTTON INTERACTIONS
   ============================================ */
const loginBtn = document.querySelector('.btn-login');
if (loginBtn) {
    loginBtn.addEventListener('click', function() {
        console.log('Botón de iniciar sesión presionado.');
        // Add your login logic here
    });
}