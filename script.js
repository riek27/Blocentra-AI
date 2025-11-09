// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize All Website Functionality
function initializeWebsite() {
    initializeMobileNavigation();
    initializeHeroSlider();
    initializeQuoteButtons();
    initializeContactForm();
    initializeScrollEffects();
    initializeModal();
    setActiveNavLink();
}

// Mobile Navigation Toggle
function initializeMobileNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show');
            document.body.style.overflow = '';
        });
    }
    
    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
            document.body.style.overflow = '';
        });
    });
}

// Hero Slider with Ken Burns Effect 
function initializeHeroSlider() {
    const slides = document.querySelectorAll('.home__slide');
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Auto-slide every 5 seconds
    const slideInterval = setInterval(nextSlide, 5000);
    
    // Pause on hover
    const slider = document.querySelector('.home__slider');
    if (slider) {
        slider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        slider.addEventListener('mouseleave', () => {
            setInterval(nextSlide, 5000);
        });
    }
    
    // Initialize first slide
    showSlide(currentSlide);
}

// Initialize Quote Buttons
function initializeQuoteButtons() {
    const quoteButtons = document.querySelectorAll('.request-quote');
    
    quoteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.getAttribute('data-product');
            showQuoteModal(productName);
        });
    });
}

// Contact Form Handling
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const subject = formData.get('subject') || 'General Inquiry';
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !phone || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Phone validation
            if (!isValidPhone(phone)) {
                showNotification('Please enter a valid phone number.', 'error');
                return;
            }
            
            // Simulate form submission
            simulateFormSubmission(name, email, phone, subject, message);
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification__close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: var(--white);
                padding: 1rem 1.5rem;
                border-radius: var(--border-radius);
                box-shadow: var(--shadow-xl);
                z-index: 10000;
                display: flex;
                align-items: center;
                gap: 1rem;
                max-width: 400px;
                transform: translateX(120%);
                transition: transform 0.3s ease;
            }
            .notification.show {
                transform: translateX(0);
            }
            .notification--success {
                border-left: 4px solid #28a745;
            }
            .notification--error {
                border-left: 4px solid #dc3545;
            }
            .notification__content {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                flex: 1;
            }
            .notification__content i {
                font-size: 1.2rem;
            }
            .notification--success .notification__content i {
                color: #28a745;
            }
            .notification--error .notification__content i {
                color: #dc3545;
            }
            .notification__close {
                background: none;
                border: none;
                color: var(--gray);
                cursor: pointer;
                padding: 0.25rem;
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Close button
    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Simulate form submission
function simulateFormSubmission(name, email, phone, subject, message) {
    // Show loading state
    const submitButton = document.querySelector('#contact-form .form__button');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call with smooth animation
    setTimeout(() => {
        showNotification(`Thank you, ${name}! Your message has been sent successfully. We will contact you soon.`, 'success');
        
        // Reset form
        document.getElementById('contact-form').reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// Scroll Effects (Sticky Header, Back to Top)
function initializeScrollEffects() {
    const header = document.getElementById('header');
    const backToTop = document.getElementById('back-to-top');
    
    function handleScroll() {
        // Sticky header
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
        
        // Back to top button
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
        
        // Add scroll animation for elements
        animateOnScroll();
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
}

// Animate elements on scroll
function animateOnScroll() {
    const animatedElements = document.querySelectorAll('.product-page__card, .service-page__card, .featured__card');
    
    animatedElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize elements for scroll animation
function initializeScrollAnimation() {
    const animatedElements = document.querySelectorAll('.product-page__card, .service-page__card, .featured__card');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger initial animation
    setTimeout(() => {
        animateOnScroll();
    }, 100);
}

// Modal Functionality
function initializeModal() {
    const modal = document.getElementById('quote-modal');
    if (!modal) return;
    
    const closeButton = document.getElementById('modal-close');
    const quoteForm = document.getElementById('quote-form');
    
    // Close modal events
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Form submission
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const name = formData.get('name');
            const product = formData.get('product');
            
            // Validate form
            if (!name || !formData.get('email') || !formData.get('phone')) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            showNotification(`Thank you, ${name}! Your quote request for ${product} has been submitted. We will contact you shortly.`, 'success');
            closeModal();
            quoteForm.reset();
        });
    }
    
    function closeModal() {
        const modal = document.getElementById('quote-modal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Quote Modal
function showQuoteModal(productName) {
    const modal = document.getElementById('quote-modal');
    const productInput = document.getElementById('quote-product');
    
    if (modal && productInput) {
        productInput.value = productName;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add smooth opening animation
        const modalContent = modal.querySelector('.modal__content');
        modalContent.style.transform = 'scale(0.9)';
        modalContent.style.opacity = '0';
        
        setTimeout(() => {
            modalContent.style.transform = 'scale(1)';
            modalContent.style.opacity = '1';
        }, 10);
    }
}

// Set active navigation link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav__link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        
        if ((currentPage === 'index.html' && linkHref === 'index.html') ||
            (currentPage === 'about.html' && linkHref === 'about.html') ||
            (currentPage === 'products.html' && linkHref === 'products.html') ||
            (currentPage === 'contact.html' && linkHref === 'contact.html')) {
            link.classList.add('active');
        }
    });
}

// Smooth page transitions
function initializePageTransitions() {
    // Add fade-in animation to body
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Initialize scroll animations
    initializeScrollAnimation();
}

// Enhanced image loading with fade-in effect
function initializeImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loading state
        if (!img.complete) {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.4s ease';
        }
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Fallback for cached images
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
}

// Update initialization to include new features
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    initializePageTransitions();
    initializeImageLoading();
});

// Add smooth hover effects for interactive elements
function initializeHoverEffects() {
    const interactiveElements = document.querySelectorAll('.button, .product-page__card, .service-page__card, .nav__link');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Initialize hover effects
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    initializePageTransitions();
    initializeImageLoading();
    initializeHoverEffects();
});
