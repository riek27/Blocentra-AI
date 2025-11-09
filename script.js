// Website Data
const productsData = [
    {
        name: "Voltage Regulators",
        description: "High-quality voltage regulators to protect your electronic devices from power fluctuations and surges.",
        image: "https://source.unsplash.com/random/600x400/?voltage,regulator"
    },
    {
        name: "Power Inverters",
        description: "Reliable power inverters for uninterrupted electricity supply during power outages.",
        image: "https://source.unsplash.com/random/600x400/?power,inverter"
    },
    {
        name: "JBL Bluetooth Speakers",
        description: "Premium quality JBL Bluetooth speakers for immersive audio experience and portable entertainment.",
        image: "https://source.unsplash.com/random/600x400/?jbl,speaker"
    },
    {
        name: "Solar Panels & Accessories",
        description: "Efficient solar panels and complete solar energy system accessories for sustainable power solutions.",
        image: "https://source.unsplash.com/random/600x400/?solar,panel"
    },
    {
        name: "Pure Sine Wave Inverters",
        description: "Advanced pure sine wave inverters for sensitive electronics and medical equipment.",
        image: "https://source.unsplash.com/random/600x400/?sine,inverter"
    },
    {
        name: "Batteries & Chargers",
        description: "Durable batteries and fast chargers for all your power backup needs.",
        image: "https://source.unsplash.com/random/600x400/?battery,charger"
    }
];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize All Website Functionality
function initializeWebsite() {
    initializeSmoothScrolling();
    initializeMobileNavigation();
    initializeHeroSlider();
    initializeProductCards();
    initializeContactForm();
    initializeScrollEffects();
}

// Smooth Scrolling Implementation [citation:1][citation:7]
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                navMenu.classList.remove('show');
            }
        });
    });
}

// Mobile Navigation Toggle
function initializeMobileNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show');
        });
    }
    
    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show');
        });
    }
    
    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
        });
    });
}

// Hero Slider with Ken Burns Effect [citation:8]
function initializeHeroSlider() {
    const slides = document.querySelectorAll('.home__slide');
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
            productCard.className = 'product__card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product__image">
                <div class="product__content">
                    <h3 class="product__name">${product.name}</h3>
                    <p class="product__description">${product.description}</p>
                    <button class="button product__button request-quote" data-product="${product.name}">Request Quote</button>
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
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !phone || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simulate form submission
            simulateFormSubmission(name, email, phone, message);
        });
    }
}

// Simulate form submission (replace with actual backend integration)
function simulateFormSubmission(name, email, phone, message) {
    // Show loading state
    const submitButton = document.querySelector('.form__button');
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

// Quote Modal Functionality
function showQuoteModal(productName) {
    // Create modal HTML
    const modalHTML = `
        <div class="modal-overlay" id="quote-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Request Quote: ${productName}</h3>
                    <button class="modal-close" id="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="quote-form">
                        <div class="form__group">
                            <label for="quote-name" class="form__label">Full Name</label>
                            <input type="text" id="quote-name" name="name" class="form__input" required>
                        </div>
                        <div class="form__group">
                            <label for="quote-email" class="form__label">Email Address</label>
                            <input type="email" id="quote-email" name="email" class="form__input" required>
                        </div>
                        <div class="form__group">
                            <label for="quote-phone" class="form__label">Phone Number</label>
                            <input type="tel" id="quote-phone" name="phone" class="form__input" required>
                        </div>
                        <div class="form__group">
                            <label for="quote-product" class="form__label">Product</label>
                            <input type="text" id="quote-product" name="product" class="form__input" value="${productName}" readonly>
                        </div>
                        <div class="form__group">
                            <label for="quote-message" class="form__label">Additional Requirements</label>
                            <textarea id="quote-message" name="message" class="form__textarea" rows="4"></textarea>
                        </div>
                        <button type="submit" class="button form__button">Submit Quote Request</button>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add modal styles
    addModalStyles();
    
    // Initialize modal functionality
    const modal = document.getElementById('quote-modal');
    const closeButton = document.getElementById('modal-close');
    const quoteForm = document.getElementById('quote-form');
    
    // Close modal events
    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Form submission
    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const name = formData.get('name');
        const product = formData.get('product');
        
        alert(`Thank you, ${name}! Your quote request for ${product} has been submitted. We will contact you shortly.`);
        closeModal();
    });
    
    function closeModal() {
        modal.remove();
    }
}

// Add modal styles dynamically
function addModalStyles() {
    const modalStyles = `
        <style>
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
                padding: 20px;
            }
            
            .modal-content {
                background: var(--white);
                border-radius: var(--border-radius-lg);
                box-shadow: var(--shadow-xl);
                max-width: 500px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;
                border-bottom: 1px solid var(--light-gray);
            }
            
            .modal-header h3 {
                color: var(--dark);
                margin: 0;
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: var(--gray);
                transition: var(--transition);
            }
            
            .modal-close:hover {
                color: var(--dark);
            }
            
            .modal-body {
                padding: 1.5rem;
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', modalStyles);
}
