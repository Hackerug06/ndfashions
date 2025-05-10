document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('show');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                navMenu.classList.remove('show');
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Booking and Order Modals
    const bookingModal = document.getElementById('booking-modal');
    const orderModal = document.getElementById('order-modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    
    // Book Now buttons
    document.querySelectorAll('.book-btn').forEach(button => {
        button.addEventListener('click', function() {
            const serviceName = this.getAttribute('data-service');
            document.getElementById('service-name').textContent = serviceName;
            bookingModal.classList.remove('hidden');
        });
    });
    
    // Order Now buttons
    document.querySelectorAll('.order-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.getAttribute('data-product');
            document.getElementById('product-name').textContent = productName;
            orderModal.classList.remove('hidden');
        });
    });
    
    // Close modals
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            bookingModal.classList.add('hidden');
            orderModal.classList.add('hidden');
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === bookingModal) {
            bookingModal.classList.add('hidden');
        }
        if (e.target === orderModal) {
            orderModal.classList.add('hidden');
        }
    });

    // Form Submissions
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const service = document.getElementById('service-name').textContent;
            const name = document.getElementById('booking-name').value;
            const phone = document.getElementById('booking-phone').value;
            const date = document.getElementById('booking-date').value;
            const notes = document.getElementById('booking-notes').value;
            
            const message = `Booking Request:%0A%0AService: ${service}%0AName: ${name}%0APhone: ${phone}%0ADate: ${date}%0ANotes: ${notes}`;
            
            window.open(`https://wa.me/256708801462?text=${message}`, '_blank');
            
            bookingModal.classList.add('hidden');
            bookingForm.reset();
            
            alert('You will be redirected to WhatsApp to complete your booking.');
        });
    }
    
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const product = document.getElementById('product-name').textContent;
            const name = document.getElementById('order-name').value;
            const phone = document.getElementById('order-phone').value;
            const quantity = document.getElementById('order-quantity').value;
            const address = document.getElementById('order-address').value;
            const notes = document.getElementById('order-notes').value;
            
            const message = `Order Request:%0A%0AProduct: ${product}%0AName: ${name}%0APhone: ${phone}%0AQuantity: ${quantity}%0AAddress: ${address}%0ANotes: ${notes}`;
            
            window.open(`https://wa.me/256708801462?text=${message}`, '_blank');
            
            orderModal.classList.add('hidden');
            orderForm.reset();
            
            alert('You will be redirected to WhatsApp to complete your order.');
        });
    }
    
    // Review Form
    const addReviewBtn = document.getElementById('add-review-btn');
    const reviewForm = document.getElementById('review-form');
    
    if (addReviewBtn && reviewForm) {
        addReviewBtn.addEventListener('click', function() {
            reviewForm.classList.toggle('hidden');
        });
    }
    
    const reviewFormElement = document.getElementById('reviewForm');
    if (reviewFormElement) {
        reviewFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('review-name').value;
            const service = document.getElementById('review-service').value;
            const text = document.getElementById('review-text').value;
            const rating = document.getElementById('review-rating').value;
            
            // In a real application, you would send this data to a server
            // For this example, we'll just show an alert and reset the form
            alert(`Thank you for your review, ${name}! Your feedback about ${service} has been received.`);
            
            reviewFormElement.reset();
            reviewForm.classList.add('hidden');
        });
    }
    
    // Contact Form
    const inquiryForm = document.getElementById('inquiryForm');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // In a real application, you would send this data to a server
            // For this example, we'll just show an alert and reset the form
            alert(`Thank you for your inquiry, ${name}! We will get back to you soon.`);
            
            inquiryForm.reset();
        });
    }
});
