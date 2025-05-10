document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('show');
    });
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navMenu.classList.remove('show');
        });
    });
    
    // Booking and Order Modals
    const bookButtons = document.querySelectorAll('.book-button');
    const orderButtons = document.querySelectorAll('.order-button');
    const bookingModal = document.getElementById('bookingModal');
    const orderModal = document.getElementById('orderModal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            const service = this.getAttribute('data-service');
            document.getElementById('serviceTitle').textContent = service;
            bookingModal.style.display = 'flex';
        });
    });
    
    orderButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.getAttribute('data-product');
            document.getElementById('productTitle').textContent = product;
            orderModal.style.display = 'flex';
        });
    });
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            bookingModal.style.display = 'none';
            orderModal.style.display = 'none';
        });
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === bookingModal) {
            bookingModal.style.display = 'none';
        }
        if (e.target === orderModal) {
            orderModal.style.display = 'none';
        }
    });
    
    // Form Submissions
    const bookingForm = document.getElementById('bookingForm');
    const orderForm = document.getElementById('orderForm');
    const reviewForm = document.getElementById('reviewForm');
    const contactForm = document.getElementById('contactForm');
    
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = this.querySelector('input[type="text"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const date = this.querySelector('input[type="date"]').value;
        const notes = this.querySelector('textarea').value;
        
        const service = document.getElementById('serviceTitle').textContent;
        
        const message = `Booking Request for ${service}%0A%0AName: ${name}%0APhone: ${phone}%0ADate: ${date}%0ANotes: ${notes}`;
        
        window.open(`https://wa.me/256708801462?text=${message}`, '_blank');
        
        bookingModal.style.display = 'none';
        this.reset();
    });
    
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = this.querySelector('input[type="text"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const items = this.querySelector('textarea').value;
        
        const product = document.getElementById('productTitle').textContent;
        
        const message = `Order Request for ${product}%0A%0AName: ${name}%0APhone: ${phone}%0AItems: ${items}`;
        
        window.open(`https://wa.me/256708801462?text=${message}`, '_blank');
        
        orderModal.style.display = 'none';
        this.reset();
    });
    
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = this.querySelector('input[type="text"]').value;
        const service = this.querySelector('select').value;
        const review = this.querySelector('textarea').value;
        
        // In a real implementation, you would send this data to your server
        alert('Thank you for your review!');
        this.reset();
    });
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const regarding = this.querySelector('select').value;
        const message = this.querySelector('textarea').value;
        
        // In a real implementation, you would send this data to your server
        alert('Thank you for your message! We will contact you soon.');
        this.reset();
    });
    
    // Sticky Header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
});
