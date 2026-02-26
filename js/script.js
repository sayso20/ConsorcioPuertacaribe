// script.js - Enhanced functionality for Puerta Caribe website
/* ============================================
   DOCUMENT INITIALIZATION
   ============================================ */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Puerta Caribe - Página cargada exitosamente.');
    
    // Initialize banner video scrubbing
    initializeBannerVideoScrubbing();
    
    // Initialize all features
    initializeNavigation();
    initializeSmoothScroll();
    initializeIntersectionObserver();
    initializeCalendar();
    initializeBannerAnimation();
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
   BANNER VIDEO SCRUBBING (SCROLL CONTROL)
   ============================================ */
function initializeBannerVideoScrubbing() {
    const bannerVideo = document.getElementById('banner-gif');
    const heroSection = document.querySelector('.hero');
    
    if (!bannerVideo || !heroSection || bannerVideo.tagName !== 'VIDEO') return;
    
    // Pause video initially
    bannerVideo.pause();
    bannerVideo.currentTime = 0;
    
    // Set video preload and buffering with GPU acceleration
    bannerVideo.preload = 'auto';
    bannerVideo.muted = true;
    bannerVideo.style.willChange = 'transform';
    bannerVideo.style.transform = 'translateZ(0)';
    bannerVideo.style.backfaceVisibility = 'hidden';
    
    let targetVideoTime = 0;
    let currentVideoTime = 0;
    let animationFrameId;
    let lastScrollY = 0;
    let isIntersecting = false;
    
    // Apple-style easing: exponential ease-out for super smooth feel
    const easeOutExpo = (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    
    // Secondary easing for ultra smooth interpolation
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
    
    // Smooth interpolation function with adaptive damping (Apple-style)
    // Lower damping = smoother but slower catch-up
    const smoothUpdate = () => {
        const delta = targetVideoTime - currentVideoTime;
        
        // Only update if meaningful difference exists
        if (Math.abs(delta) > 0.001) {
            // Adaptive damping: uses exponential decay for natural feel
            // Closer to target = slower approach (less responsive)
            const dampingFactor = Math.min(0.15, Math.max(0.08, Math.abs(delta) * 0.1));
            currentVideoTime += delta * dampingFactor;
            bannerVideo.currentTime = currentVideoTime;
        }
        animationFrameId = requestAnimationFrame(smoothUpdate);
    };
    
    // Intersection Observer for performance: only track scroll when visible
    const observerOptions = {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: '100px'
    };
    
    const intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isIntersecting = entry.isIntersecting || entry.intersectionRatio > 0;
        });
    }, observerOptions);
    
    // Wait for video to be ready
    const handleVideoReady = function() {
        // Remove listener after first call
        bannerVideo.removeEventListener('canplay', handleVideoReady);
        
        // Start smooth update loop
        smoothUpdate();
        
        // Observe the hero section
        intersectionObserver.observe(heroSection);
        
        // Update target time on scroll - optimized with RAF throttling
        let scrollTimeout;
        const updateVideoTarget = () => {
            // Only process scroll if hero is visible
            if (!isIntersecting) return;
            
            const heroRect = heroSection.getBoundingClientRect();
            const heroTop = heroRect.top;
            const windowHeight = window.innerHeight;
            const heroHeight = heroRect.height;
            
            // Calculate scroll percentage (0 to 1) with better precision
            let scrollProgress = 0;
            
            if (heroTop <= 0 && heroRect.bottom > 0) {
                // Hero is in viewport (partially or fully)
                scrollProgress = Math.abs(heroTop) / (heroHeight + windowHeight);
            } else if (heroTop > 0 && heroTop < windowHeight) {
                // Hero is entering from bottom
                scrollProgress = (windowHeight - heroTop) / (heroHeight + windowHeight);
            }
            
            // Clamp between 0 and 1
            scrollProgress = Math.max(0, Math.min(1, scrollProgress));
            
            // Apply easing for less linear, more natural feel (Apple-style)
            const easedProgress = easeOutExpo(scrollProgress);
            
            // Set target time
            if (bannerVideo.duration && !isNaN(bannerVideo.duration)) {
                targetVideoTime = easedProgress * bannerVideo.duration;
            }
        };
        
        // Use scroll event with passive listener and RAF throttling
        window.addEventListener('scroll', updateVideoTarget, { passive: true });
    };
    
    bannerVideo.addEventListener('canplay', handleVideoReady);
    
    // Fallback timeout
    setTimeout(() => {
        if (!bannerVideo.hasAttribute('data-loaded')) {
            bannerVideo.setAttribute('data-loaded', 'true');
            handleVideoReady();
        }
    }, 1000);
    
    // Cleanup on unload
    window.addEventListener('beforeunload', () => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        intersectionObserver.disconnect();
    });
}

/* ============================================
   APPLE-STYLE PARALLAX FOR RESPALDO IMAGE
   Uses optimized scroll handling with RAF and GPU acceleration
   ============================================ */
function initializeParallaxEffect() {
    const respaldoImage = document.querySelector('.respaldo-image');
    if (!respaldoImage) return;
    
    const img = respaldoImage.querySelector('img');
    if (!img) return;
    
    // Enable GPU acceleration
    img.style.willChange = 'transform';
    img.style.transform = 'translateZ(0) translateY(0)';
    img.style.backfaceVisibility = 'hidden';
    
    let currentY = 0;
    let targetY = 0;
    let animationFrameId;
    let isIntersecting = false;
    
    // Observer for performance - only animate when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isIntersecting = entry.isIntersecting;
        });
    }, {
        threshold: [0, 0.1, 0.5, 1],
        rootMargin: '100px'
    });
    
    observer.observe(respaldoImage);
    
    // Smooth animation loop with exponential interpolation
    const animate = () => {
        if (isIntersecting) {
            const delta = targetY - currentY;
            // Apple-style exponential easing for smooth motion
            currentY += delta * 0.08;
            img.style.transform = `translateZ(0) translateY(${currentY}px)`;
        }
        animationFrameId = requestAnimationFrame(animate);
    };
    
    // Calculate parallax offset on scroll
    const updateParallax = () => {
        if (!isIntersecting) return;
        
        const rect = respaldoImage.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate how far the element is from center of viewport
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;
        const distanceFromCenter = elementCenter - viewportCenter;
        
        // Parallax factor: negative moves up as you scroll down
        // Lower factor = subtler effect (Apple style is subtle)
        const parallaxFactor = 0.15;
        targetY = -distanceFromCenter * parallaxFactor;
        
        // Clamp to prevent extreme values
        targetY = Math.max(-50, Math.min(50, targetY));
    };
    
    // Start animation loop
    animate();
    
    // Listen to scroll with passive listener
    window.addEventListener('scroll', updateParallax, { passive: true });
    
    // Initial calculation
    updateParallax();
    
    // Cleanup
    window.addEventListener('beforeunload', () => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        observer.disconnect();
    });
}

// Initialize parallax on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the nosotros page
    if (document.querySelector('.respaldo-image')) {
        initializeParallaxEffect();
    }
    
    // Initialize hero parallax and floating logo
    initializeHeroParallax();
});

/* ============================================
   HERO PARALLAX & FLOATING LOGO EFFECT
   ============================================ */
function initializeHeroParallax() {
    const parallaxSections = document.querySelectorAll('.hero-parallax');
    const floatingLogo = document.querySelector('.floating-logo');
    
    if (parallaxSections.length === 0) return;
    
    let ticking = false;
    
    function updateParallax() {
        const scrollY = window.pageYOffset;
        
        // Aplicar parallax a todas las secciones con la clase
        parallaxSections.forEach(section => {
            const parallaxImage = section.querySelector('.parallax-image');
            if (!parallaxImage) return;
            
            const sectionRect = section.getBoundingClientRect();
            const sectionTop = sectionRect.top + scrollY;
            const sectionHeight = sectionRect.height;
            
            // Solo aplicar parallax cuando la sección está visible
            if (scrollY < sectionTop + sectionHeight && scrollY + window.innerHeight > sectionTop) {
                const parallaxSpeed = 0.4;
                const relativeScroll = scrollY - sectionTop + window.innerHeight;
                const yPos = (relativeScroll * parallaxSpeed) - (window.innerHeight * parallaxSpeed);
                parallaxImage.style.transform = `translateY(${yPos}px) scale(1.1)`;
            }
        });
        
        // Efecto en el logo flotante (solo en página nosotros)
        if (floatingLogo) {
            const heroSection = document.querySelector('.hero-nosotros');
            if (heroSection) {
                const heroHeight = heroSection.offsetHeight;
                
                if (scrollY > 10 && scrollY < heroHeight) {
                    floatingLogo.style.animationPlayState = 'paused';
                    
                    const logoParallaxSpeed = 0.25;
                    const logoYPos = scrollY * logoParallaxSpeed;
                    const scale = 1 - (scrollY * 0.0004);
                    const opacity = 1 - (scrollY * 0.0012);
                    
                    floatingLogo.style.transform = `translate(-50%, calc(-50% + ${logoYPos}px)) scale(${Math.max(scale, 0.75)})`;
                    floatingLogo.style.opacity = Math.max(opacity, 0.2);
                } else if (scrollY <= 10) {
                    floatingLogo.style.animationPlayState = 'running';
                    floatingLogo.style.transform = '';
                    floatingLogo.style.opacity = '';
                }
            }
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
    
    // Establecer estado inicial
    updateParallax();
}

/* ============================================
   MODAL LOGIN/REGISTRO
   ============================================ */
const loginModal = document.getElementById('loginModal');
const closeModalBtn = document.getElementById('closeModal');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const togglePasswordBtns = document.querySelectorAll('.toggle-password');

// Abrir modal
const loginBtn = document.querySelector('.btn-login');
if (loginBtn && loginModal) {
    loginBtn.addEventListener('click', function() {
        loginModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

// Cerrar modal con botón X
if (closeModalBtn && loginModal) {
    closeModalBtn.addEventListener('click', function() {
        loginModal.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Cerrar modal al hacer clic fuera
if (loginModal) {
    loginModal.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Cerrar modal con tecla Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && loginModal && loginModal.classList.contains('active')) {
        loginModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Cambiar entre pestañas
tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const targetTab = this.getAttribute('data-tab');
        
        // Remover active de todos los botones y contenidos
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Agregar active al botón clickeado y su contenido correspondiente
        this.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// Toggle mostrar/ocultar contraseña
togglePasswordBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const input = this.parentElement.querySelector('input');
        if (input.type === 'password') {
            input.type = 'text';
            this.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
            </svg>`;
        } else {
            input.type = 'password';
            this.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
            </svg>`;
        }
    });
});

/* ============================================
   SISTEMA DE AUTENTICACIÓN LOCAL
   ============================================
   Esta lógica funciona con localStorage.
   Para conectar a un backend real, solo hay que:
   1. Reemplazar las funciones dentro de AuthService
   2. Cambiar localStorage por llamadas fetch/axios
   ============================================ */

const AuthService = {
    // Clave para almacenar usuarios en localStorage
    USERS_KEY: 'puertacaribe_users',
    SESSION_KEY: 'puertacaribe_session',

    // Obtener todos los usuarios registrados
    getUsers: function() {
        const users = localStorage.getItem(this.USERS_KEY);
        return users ? JSON.parse(users) : [];
    },

    // Guardar usuarios
    saveUsers: function(users) {
        localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    },

    // Registrar nuevo usuario
    register: function(userData) {
        return new Promise((resolve, reject) => {
            // Simular delay de red
            setTimeout(() => {
                const users = this.getUsers();
                
                // Verificar si el usuario ya existe
                const existingUser = users.find(u => 
                    u.username === userData.username || u.email === userData.email
                );
                
                if (existingUser) {
                    reject({ success: false, message: 'El usuario o correo ya existe' });
                    return;
                }

                // Crear nuevo usuario
                const newUser = {
                    id: Date.now(),
                    username: userData.username,
                    email: userData.email,
                    password: userData.password, // En producción: NUNCA guardar en texto plano
                    nombre: userData.nombre,
                    apellido: userData.apellido,
                    createdAt: new Date().toISOString()
                };

                users.push(newUser);
                this.saveUsers(users);

                // Auto-login después del registro
                this.setSession(newUser);

                resolve({ 
                    success: true, 
                    message: 'Registro exitoso', 
                    user: { ...newUser, password: undefined } 
                });
            }, 500);
        });
    },

    // Iniciar sesión
    login: function(credentials) {
        return new Promise((resolve, reject) => {
            // Simular delay de red
            setTimeout(() => {
                const users = this.getUsers();
                
                // Buscar usuario por username o email
                const user = users.find(u => 
                    (u.username === credentials.usernameOrEmail || 
                     u.email === credentials.usernameOrEmail) &&
                    u.password === credentials.password
                );

                if (!user) {
                    reject({ success: false, message: 'Usuario o contraseña incorrectos' });
                    return;
                }

                // Guardar sesión
                this.setSession(user);

                resolve({ 
                    success: true, 
                    message: 'Inicio de sesión exitoso', 
                    user: { ...user, password: undefined } 
                });
            }, 500);
        });
    },

    // Cerrar sesión
    logout: function() {
        localStorage.removeItem(this.SESSION_KEY);
        this.updateUI();
        return { success: true, message: 'Sesión cerrada' };
    },

    // Establecer sesión
    setSession: function(user) {
        const session = {
            userId: user.id,
            username: user.username,
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
            loggedInAt: new Date().toISOString()
        };
        localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    },

    // Obtener sesión actual
    getSession: function() {
        const session = localStorage.getItem(this.SESSION_KEY);
        return session ? JSON.parse(session) : null;
    },

    // Verificar si hay sesión activa
    isAuthenticated: function() {
        return this.getSession() !== null;
    },

    // Obtener usuario actual
    getCurrentUser: function() {
        return this.getSession();
    },

    // Actualizar UI según estado de autenticación
    updateUI: function() {
        const loginBtn = document.querySelector('.btn-login');
        const session = this.getSession();

        if (loginBtn) {
            if (session) {
                // Usuario logueado
                loginBtn.textContent = session.nombre || session.username;
                loginBtn.href = 'mi-cuenta.html';
                
                // Agregar botón de cerrar sesión si no existe
                let logoutBtn = document.querySelector('.btn-logout');
                if (!logoutBtn) {
                    logoutBtn = document.createElement('a');
                    logoutBtn.className = 'btn-logout';
                    logoutBtn.href = '#';
                    logoutBtn.textContent = 'Salir';
                    logoutBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        AuthService.logout();
                        window.location.href = 'index.html';
                    });
                    loginBtn.parentNode.insertBefore(logoutBtn, loginBtn.nextSibling);
                }
            } else {
                // Usuario no logueado
                loginBtn.textContent = 'Iniciar sesión';
                loginBtn.href = 'perfil.html';
                
                // Remover botón de logout si existe
                const logoutBtn = document.querySelector('.btn-logout');
                if (logoutBtn) {
                    logoutBtn.remove();
                }
            }
        }
    }
};

// Inicializar UI al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    AuthService.updateUI();
});

// Formularios de autenticación
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const usernameOrEmail = this.querySelector('input[type="text"]').value;
        const password = this.querySelector('input[type="password"]').value;
        const remember = this.querySelector('input[type="checkbox"]')?.checked || false;

        // Mostrar loading (soporta ambos selectores de botón)
        const submitBtn = this.querySelector('.perfil-btn-submit') || this.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'INICIANDO...';
        submitBtn.disabled = true;

        AuthService.login({ usernameOrEmail, password, remember })
            .then(response => {
                console.log('Login exitoso:', response);
                // Cerrar modal si existe
                const modal = document.getElementById('loginModal');
                if (modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
                window.location.href = 'login-exito.html';
            })
            .catch(error => {
                console.error('Error de login:', error);
                alert(error.message || 'Error al iniciar sesión');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    });
}

if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const inputs = this.querySelectorAll('input');
        const userData = {
            username: inputs[0].value,
            email: inputs[1].value,
            password: inputs[2].value,
            nombre: inputs[3].value,
            apellido: inputs[4].value
        };

        // Verificar checkboxes de políticas
        const checkboxes = this.querySelectorAll('input[type="checkbox"]');
        const politicaPrivacidad = checkboxes[0]?.checked;
        const terminosCondiciones = checkboxes[1]?.checked;

        if (!politicaPrivacidad || !terminosCondiciones) {
            alert('Debes aceptar la política de privacidad y los términos y condiciones');
            return;
        }

        // Mostrar loading (soporta ambos selectores de botón)
        const submitBtn = this.querySelector('.perfil-btn-submit') || this.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'REGISTRANDO...';
        submitBtn.disabled = true;

        AuthService.register(userData)
            .then(response => {
                console.log('Registro exitoso:', response);
                // Cerrar modal si existe
                const modal = document.getElementById('loginModal');
                if (modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
                window.location.href = 'login-exito.html';
            })
            .catch(error => {
                console.error('Error de registro:', error);
                alert(error.message || 'Error al registrar');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    });
}

/* ============================================
   PÁGINA DE PERFIL - PESTAÑAS
   ============================================ */
const perfilTabBtns = document.querySelectorAll('.perfil-tab-btn');
const perfilTabContents = document.querySelectorAll('.perfil-tab-content');

// Cambiar entre pestañas en página de perfil
perfilTabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const targetTab = this.getAttribute('data-tab');
        
        // Remover active de todos los botones y contenidos
        perfilTabBtns.forEach(b => b.classList.remove('active'));
        perfilTabContents.forEach(c => c.classList.remove('active'));
        
        // Agregar active al botón clickeado y su contenido correspondiente
        this.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

/* ============================================
   BUSCADOR LANDING PAGE
   ============================================ */
document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');
    const searchSelects = document.querySelectorAll('.search-select');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const query = searchInput?.value || '';
            const ubicacion = searchSelects[0]?.value || '';
            const categoria = searchSelects[1]?.value || '';
            
            // Construir mensaje de búsqueda
            let searchTerms = [];
            if (query) searchTerms.push(`"${query}"`);
            if (ubicacion) searchTerms.push(`en ${ubicacion}`);
            if (categoria) searchTerms.push(`categoría: ${categoria}`);
            
            if (searchTerms.length > 0) {
                // Redirigir a la página de descubrir con parámetros de búsqueda
                const searchParams = new URLSearchParams();
                if (query) searchParams.set('q', query);
                if (ubicacion) searchParams.set('ubicacion', ubicacion);
                if (categoria) searchParams.set('categoria', categoria);
                
                window.location.href = 'descubre.html?' + searchParams.toString();
            } else {
                alert('Por favor ingresa al menos un criterio de búsqueda');
            }
        });
    }
});

/* ============================================
   FORMULARIOS DE SERVICIOS TURÍSTICOS
   ============================================ */
document.addEventListener('DOMContentLoaded', function() {
    // Formulario de búsqueda de hoteles
    const hotelesForm = document.querySelector('.servicios-form');
    if (hotelesForm) {
        hotelesForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const zona = this.querySelector('#zona')?.value;
            const tipo = this.querySelector('#tipo')?.value;
            
            if (!zona && !tipo) {
                alert('Por favor selecciona al menos una opción para buscar');
                return;
            }
            
            let mensaje = 'Buscando hoteles';
            if (zona) mensaje += ` en zona ${zona}`;
            if (tipo) mensaje += ` de tipo ${tipo}`;
            
            alert(mensaje + '.\n\nPróximamente mostraremos los resultados disponibles.');
        });
    }
    
    // Formulario de asesoría turística
    const asesoriaForm = document.querySelector('.servicios-form-asesoria');
    if (asesoriaForm) {
        asesoriaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const tipoServicio = this.querySelector('#tipo-servicio')?.value;
            const fecha = this.querySelector('#fecha')?.value;
            const personas = this.querySelector('#personas')?.value;
            const mensaje = this.querySelector('#mensaje')?.value;
            
            if (!tipoServicio) {
                alert('Por favor selecciona un tipo de servicio');
                return;
            }
            
            // Simular envío
            const submitBtn = this.querySelector('.btn-enviar');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'ENVIANDO...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('¡Solicitud enviada con éxito!\n\nNos pondremos en contacto contigo pronto para brindarte asesoría personalizada.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
});

/* ============================================
   ENLACES DE FOOTER (TÉRMINOS Y POLÍTICAS)
   ============================================ */
document.addEventListener('DOMContentLoaded', function() {
    // Manejar enlaces de términos y políticas que no tienen página dedicada
    const footerLinks = document.querySelectorAll('a[href="#terminos"], a[href="#politicas"]');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const linkType = this.getAttribute('href') === '#terminos' 
                ? 'Términos y Condiciones' 
                : 'Políticas de Privacidad';
            
            alert(`${linkType}\n\nEsta sección estará disponible próximamente.\n\nPara consultas, contáctenos en: info@puertacaribe.com`);
        });
    });
});