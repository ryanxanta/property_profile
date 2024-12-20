// Configuration
const YOUR_EMAIL = 'name@yourdomain.com';
const YOUR_WHATSAPP = '1234567890';

// Navigation Effects
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('.nav-container');
    const heroSection = document.querySelector('.hero-section');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scroll = window.pageYOffset;
        heroSection.style.backgroundPositionY = `${scroll * 0.5}px`;
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form handling functions
function submitContactForm(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    const emailBody = `
        Contact Form Submission
        Name: ${formData.get('name')}
        Email: ${formData.get('email')}
        Phone: ${formData.get('phone')}
        Message: ${formData.get('message')}
    `;

    window.location.href = `mailto:${YOUR_EMAIL}?subject=Contact Form Submission&body=${encodeURIComponent(emailBody)}`;
    
    showNotification('Thank you for your message. We will contact you shortly!');
    form.reset();
}

// Utility Functions
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-gold text-black px-6 py-3 rounded-lg shadow-lg fade-in z-50';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Animation triggers on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with animation classes
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.animate-on-scroll').forEach((element) => {
        observer.observe(element);
    });
});

// WhatsApp Function
function getWhatsAppLink(propertyName) {
    return `https://wa.me/${YOUR_WHATSAPP}?text=I'm%20interested%20in%20${encodeURIComponent(propertyName)}`;
}