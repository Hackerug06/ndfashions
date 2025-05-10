document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });

    // Modal functionality for booking/ordering
    const modal = document.getElementById('bookingModal');
    const closeBtn = document.querySelector('.close');
    const whatsappLink = document.getElementById('whatsappLink');
    const serviceName = document.getElementById('serviceName');
    const phoneNumber = "+256708801462";

    document.querySelectorAll('.book-btn, .order-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const item = this.getAttribute('data-service') || this.getAttribute('data-product');
            serviceName.textContent = item;
            
            const message = `I would like to book/order: ${item}`;
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            whatsappLink.setAttribute('href', whatsappUrl);
            
            modal.style.display = 'block';
        });
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Form submissions
    const reviewForm = document.getElementById('reviewForm');
    const contactForm = document.getElementById('contactForm');

    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your review!');
            this.reset();
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message. We will contact you soon.');
            this.reset();
        });
    }

    // Mobile menu toggle (for smaller screens)
    const mobileMenuToggle = document.createElement('div');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '☰';
    mobileMenuToggle.style.display = 'none';
    document.querySelector('header .container').appendChild(mobileMenuToggle);

    const nav = document.querySelector('nav ul');
    
    function toggleMobileMenu() {
        if (nav.style.display === 'flex') {
            nav.style.display = 'none';
        } else {
            nav.style.display = 'flex';
        }
    }

    mobileMenuToggle.addEventListener('click', toggleMobileMenu);

    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            mobileMenuToggle.style.display = 'block';
            nav.style.display = 'none';
        } else {
            mobileMenuToggle.style.display = 'none';
            nav.style.display = 'flex';
        }
    }

    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
});
