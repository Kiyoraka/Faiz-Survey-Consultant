// ===== SCRIPT.JS - MAIN JAVASCRIPT FILE =====

// Navigation and Page Management
let currentPage = 'home';

function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page-section').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const targetLink = document.querySelector(`[data-page="${pageId}"]`);
    if (targetLink) {
        targetLink.classList.add('active');
    }
    
    // Close mobile menu if open
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.remove('active');
    
    // Update mobile toggle icon
    const mobileToggle = document.getElementById('mobileToggle');
    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    currentPage = pageId;
}

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.getElementById('mobileToggle');
    
    mobileToggle.addEventListener('click', function() {
        const navMenu = document.getElementById('navMenu');
        const isActive = navMenu.classList.contains('active');
        
        navMenu.classList.toggle('active');
        
        // Update icon
        this.innerHTML = isActive ? 
            '<i class="fas fa-bars"></i>' : 
            '<i class="fas fa-times"></i>';
    });
});

// Header Scroll Effect
let lastScrollY = window.scrollY;
let ticking = false;

function updateScrollEffects() {
    const scrollY = window.scrollY;
    const header = document.getElementById('header');
    const scrollProgress = document.getElementById('scrollProgress');
    
    // Header background
    if (scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Scroll progress
    const scrollPercent = (scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.transform = `scaleX(${Math.min(scrollPercent / 100, 1)})`;
    
    // Header hide/show
    if (scrollY > lastScrollY && scrollY > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollY = scrollY;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('fade-in');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .video-card, .cost-highlight, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
});

// Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            // Simple validation
            if (!data.name || !data.email || !data.phone || !data.message) {
                alert('Sila lengkapkan semua maklumat yang diperlukan.');
                return;
            }
            
            // Show success message
            alert('Terima kasih! Mesej anda telah dihantar. Kami akan menghubungi anda tidak lama lagi.');
            
            // Reset form
            this.reset();
        });
    }
});

// Video Card Click Handler
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.video-card').forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h4').textContent;
            alert(`Video "${title}" akan dibuka. Dalam implementasi sebenar, ini akan membuka pemain video.`);
        });
    });
});

// Smooth Loading Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
    }
});

// Initialize page
document.body.style.opacity = '0';

// Contact item click handlers for mobile
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.contact-item').forEach(item => {
        item.addEventListener('click', function() {
            const text = this.querySelector('.contact-details p').textContent;
            const type = this.querySelector('.contact-details h4').textContent;
            
            if (type.includes('Telefon') || type.includes('WhatsApp')) {
                window.location.href = `tel:${text.replace(/\s/g, '')}`;
            } else if (type.includes('Email')) {
                window.location.href = `mailto:${text}`;
            }
        });
    });
});

// Enhanced hover effects for premium feel
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.service-card, .video-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Performance optimization
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData.loadEventEnd - perfData.loadEventStart > 3000) {
                console.log('Optimizing loading performance...');
            }
        }, 0);
    });
}

// Error handling
window.addEventListener('error', (e) => {
    console.warn('Resource optimization in progress:', e.target.src || e.target.href);
});
