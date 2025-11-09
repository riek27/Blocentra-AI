// Website Data
const productsData = [
    {
        name: "Voltage Regulators",
        description: "High-quality voltage regulators to protect your electronic devices from power fluctuations and surges. Our regulators ensure stable power supply even during voltage spikes.",
        image: "assets/scree.png"
    },
    {
        name: "Power Inverters",
        description: "Reliable power inverters for uninterrupted electricity supply during power outages. Available in various capacities to meet different power requirements.",
        image: "assets/screen.png"
    },
    {
        name: "JBL Bluetooth Speakers",
        description: "Premium quality JBL Bluetooth speakers for immersive audio experience and portable entertainment. Perfect for home, parties, and outdoor activities.",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        name: "Solar Panels & Accessories",
        description: "Efficient solar panels and complete solar energy system accessories for sustainable power solutions. Includes panels, batteries, charge controllers, and mounting kits.",
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        name: "Pure Sine Wave Inverters",
        description: "Advanced pure sine wave inverters for sensitive electronics and medical equipment. Provides clean, stable power similar to grid electricity.",
        image: "assets/scre.png"
    },
    {
        name: "Batteries & Chargers",
        description: "Durable batteries and fast chargers for all your power backup needs. Includes solar batteries, inverter batteries, and universal charging solutions.",
        image: "assets/sc.png"
    }
];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize All Website Functionality
function initializeWebsite() {
    initializeMobileNavigation();
    initializeHeroSlider();
    initializeProductCards();
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
    setInterval(nextSlide, 5000);
    
    // Initialize first slide
    showSlide(currentSlide);
}

// Dynamic Product Cards Generation
function initializeProductCards() {
    const productsGrid = document.getElementById('products-grid');
    
    if (productsGrid) {
        productsData.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-page__card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-page__image">
                <div class="product-page__content">
                    <h3 class="product-page__name">${product.name}</h3>
                    <p class="product-page__description">${product.description}</p>
                    <button class="button product-page__button request-quote" data-product="${product.name}">Request Quote</button>
                </div>
            `;
            productsGrid.appendChild(productCard);
        });
        
        // Add event listeners to quote buttons
        const quoteButtons = document.querySelectorAll('.request-quote');
        quoteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productName = this.getAttribute('data-product');
                showQuoteModal(productName);
            });
        });
    }
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
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !phone || !subject || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simulate form submission
            simulateFormSubmission(name, email, phone, subject, message);
        });
    }
}

// Simulate form submission
function simulateFormSubmission(name, email, phone, subject, message) {
    // Show loading state
    const submitButton = document.querySelector('#contact-form .form__button');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        alert(`Thank you, ${name}! Your message has been sent successfully. We will contact you at ${phone} or ${email} soon.`);
        
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
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
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
    
    // Form submission
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const name = formData.get('name');
            const product = formData.get('product');
            
            alert(`Thank you, ${name}! Your quote request for ${product} has been submitted. We will contact you shortly.`);
            closeModal();
        });
    }
    
    function closeModal() {
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

// Page transition effect
function animatePageTransition() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
}

// Initialize page transition when navigating
window.addEventListener('beforeunload', () => {
    document.body.style.opacity = '0';
});

// Initialize when page loads
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});
