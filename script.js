// ==========================================
// CONFIGURACIÓN GENERAL
// ==========================================

const CONFIG = {
    WHATSAPP_NUMBER: '1234567890',
    WHATSAPP_MESSAGE: 'Hola! Quiero información sobre el servicio Web + Maps',
    ANIMATION_THRESHOLD: 0.1,
    ANIMATION_ROOT_MARGIN: '0px 0px -50px 0px'
};

// ==========================================
// INICIALIZACIÓN
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    initializeScrollAnimations();
    makeFirstSectionVisible();
});

// ==========================================
// EVENT LISTENERS
// ==========================================

function initializeEventListeners() {
    // Botones CTA
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', handleCtaButtonClick);
    });

    // Botones WhatsApp
    const whatsappButtons = document.querySelectorAll('.whatsapp-btn');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', handleWhatsAppClick);
    });

    // Botón Play Video
    const playBtn = document.querySelector('.play-btn');
    if (playBtn) {
        playBtn.addEventListener('click', playVideo);
    }

    // Todos los botones
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', handleButtonClick);
    });
}

// ==========================================
// MANEJADORES DE EVENTOS - BOTONES
// ==========================================

function handleCtaButtonClick(e) {
    e.preventDefault();
    scrollToContactSection();
}

function handleWhatsAppClick(e) {
    e.preventDefault();
    openWhatsApp();
}

function handleButtonClick(e) {
    // Agregar animación visual
    const button = e.currentTarget;
    addClickAnimation(button);
}

// ==========================================
// FUNCIONES DE BOTONES
// ==========================================

function addClickAnimation(button) {
    const originalTransform = button.style.transform;
    button.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        button.style.transform = originalTransform || '';
    }, 150);
}

function scrollToContactSection() {
    const lastSection = document.querySelector('section:last-of-type');
    if (lastSection) {
        lastSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function openWhatsApp() {
    const whatsappUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(CONFIG.WHATSAPP_MESSAGE)}`;
    window.open(whatsappUrl, '_blank');
}

// ==========================================
// FUNCIONALIDAD DE VIDEO
// ==========================================

function playVideo() {
    const videoContainer = document.querySelector('.video-container');
    if (!videoContainer) return;

    const originalHTML = videoContainer.innerHTML;

    videoContainer.innerHTML = `
        <div class="w-full h-full bg-gray-900 flex items-center justify-center">
            <div class="text-center text-white">
                <div class="text-4xl mb-4">🎬</div>
                <h3 class="text-xl font-bold mb-2">Video en reproducción</h3>
                <p class="text-sm opacity-75">En una implementación real, aquí se cargaría tu video VSL</p>
                <div class="mt-4 bg-red-600 px-4 py-2 rounded text-sm cursor-pointer hover:bg-red-700" onclick="stopVideo()">
                    ⸸ Pausar video
                </div>
            </div>
        </div>
    `;

    // Guardar HTML original para poder volver
    window.originalVideoHTML = originalHTML;
}

function stopVideo() {
    const videoContainer = document.querySelector('.video-container');
    if (videoContainer && window.originalVideoHTML) {
        videoContainer.innerHTML = window.originalVideoHTML;
        
        // Re-agregar event listener al play button
        const playBtn = document.querySelector('.play-btn');
        if (playBtn) {
            playBtn.addEventListener('click', playVideo);
        }
    }
}

// ==========================================
// ANIMACIONES DE SCROLL
// ==========================================

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: CONFIG.ANIMATION_THRESHOLD,
        rootMargin: CONFIG.ANIMATION_ROOT_MARGIN
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Opcional: dejar de observar después de animar
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar todas las secciones
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

function makeFirstSectionVisible() {
    const firstSection = document.querySelector('section');
    if (firstSection) {
        firstSection.classList.add('visible');
    }
}

// ==========================================
// UTILIDADES
// ==========================================

/**
 * Smooth scroll a un elemento específico
 */
function smoothScrollTo(element, offset = 0) {
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
    });
}

/**
 * Detectar si el usuario tiene preferencia de movimiento reducido
 */
function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Copiar texto al portapapeles
 */
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('Error al copiar:', err);
        return false;
    }
}

// ==========================================
// ANALYTICS Y TRACKING (Opcional)
// ==========================================

/**
 * Registrar clics en botones CTA
 */
function trackCTAClick(buttonText) {
    console.log('CTA Click:', buttonText);
    // Aquí puedes enviar datos a Google Analytics o similar
    // gtag('event', 'cta_click', { 'button_text': buttonText });
}

/**
 * Registrar vista de secciones
 */
function trackSectionView(sectionName) {
    console.log('Section View:', sectionName);
    // Aquí puedes enviar datos a Google Analytics o similar
    // gtag('event', 'section_view', { 'section': sectionName });
}

// ==========================================
// RESPONSIVE - MANEJO DE VENTANA
// ==========================================

/**
 * Detectar cambios de tamaño de ventana
 */
window.addEventListener('resize', function() {
    // Aquí puedes agregar lógica si es necesario
    console.log('Ventana redimensionada');
});

// ==========================================
// PERFIL DE RENDIMIENTO (DEV TOOLS)
// ==========================================

if (process.env.NODE_ENV === 'development') {
    console.log('%c🚀 Landing Page Initialized', 'color: #ffc700; font-size: 14px; font-weight: bold;');
    console.log('WhatsApp Number:', CONFIG.WHATSAPP_NUMBER);
    console.log('Animation Threshold:', CONFIG.ANIMATION_THRESHOLD);
}