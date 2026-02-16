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
    initializeCalendar();
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
   CALENDAR FUNCTIONALITY
   ============================================ */
let currentDate = new Date();

function initializeCalendar() {
    const calendarGrid = document.getElementById('calendar-grid');
    
    if (!calendarGrid) return; // Not on calendar page
    
    const btnPrevMonth = document.getElementById('btn-prev-month');
    const btnNextMonth = document.getElementById('btn-next-month');
    const btnToday = document.querySelector('.btn-today');
    const filterBadges = document.querySelectorAll('.filter-badge');
    const filterSearch = document.querySelector('.filter-search');

    // Render initial calendar
    renderCalendar();

    // Event listeners for navigation
    btnPrevMonth?.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    btnNextMonth?.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    btnToday?.addEventListener('click', () => {
        currentDate = new Date();
        renderCalendar();
    });

    // Filter badges functionality
    filterBadges.forEach(badge => {
        badge.addEventListener('click', function() {
            filterBadges.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            console.log('Filter: ' + this.textContent);
        });
    });

    // Search functionality
    filterSearch?.addEventListener('input', function(e) {
        console.log('Search: ' + e.target.value);
    });

    // Initialize hero fade effect on agenda page
    initializeHeroFade();
}

function renderCalendar() {
    const calendarGrid = document.getElementById('calendar-grid');
    const monthYearDisplay = document.querySelector('.current-month-year');
    
    if (!calendarGrid || !monthYearDisplay) return;

    // Clear calendar
    calendarGrid.innerHTML = '';

    // Update month/year display
    const monthNames = [
        'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
        'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'
    ];
    const monthYear = monthNames[currentDate.getMonth()] + ' ' + currentDate.getFullYear();
    monthYearDisplay.textContent = monthYear;

    // Get first day of month and number of days
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    
    // Convert day (0 = Sunday) to (0 = Monday)
    const startDay = firstDay === 0 ? 6 : firstDay - 1;

    // Add days from previous month
    for (let i = startDay - 1; i >= 0; i--) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('calendar-day', 'empty');
        dayDiv.textContent = daysInPrevMonth - i;
        calendarGrid.appendChild(dayDiv);
    }

    // Add days of current month
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('calendar-day');
        dayDiv.textContent = day;
        
        // Check if today
        if (day === today.getDate() && 
            currentDate.getMonth() === today.getMonth() && 
            currentDate.getFullYear() === today.getFullYear()) {
            dayDiv.classList.add('today');
        }
        
        // Add click event
        dayDiv.addEventListener('click', function() {
            console.log('Selected date: ' + day + ' ' + monthYear);
        });
        
        calendarGrid.appendChild(dayDiv);
    }

    // Add days from next month
    const totalCells = calendarGrid.children.length;
    const remainingCells = 42 - totalCells; // 6 rows * 7 days
    for (let i = 1; i <= remainingCells; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('calendar-day', 'empty');
        dayDiv.textContent = i;
        calendarGrid.appendChild(dayDiv);
    }
}

/* ============================================
   HERO FADE ON SCROLL
   ============================================ */
function initializeHeroFade() {
    const heroSection = document.getElementById('agenda-hero');
    
    if (!heroSection) return; // If not on agenda page
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const heroHeight = heroSection.offsetHeight;
        
        // Calculate opacity: 1 at top, 0 after scrolling past hero
        let opacity = 1 - (scrollPosition / (heroHeight * 0.6));
        opacity = Math.max(0, Math.min(1, opacity));
        
        heroSection.style.opacity = opacity;
        
        // Optional: fade out pointer events when not visible
        if (opacity < 0.3) {
            heroSection.style.pointerEvents = 'none';
        } else {
            heroSection.style.pointerEvents = 'auto';
        }
    });
}

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