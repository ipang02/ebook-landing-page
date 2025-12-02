document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Smooth Scroll Animation (Intersection Observer) ---
    // This watches for elements with class 'hidden-el' entering the viewport
    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-el');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden-el');
    hiddenElements.forEach(el => observer.observe(el));


    // --- 2. Form Validation ---
    const form = document.getElementById('optinForm');
    
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop actual submission for demo
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            let isValid = true;

            // Simple validation helper
            const validateField = (input, condition) => {
                const parent = input.parentElement;
                if (!condition) {
                    parent.classList.add('error');
                    isValid = false;
                } else {
                    parent.classList.remove('error');
                }
            };

            // Check Name (Not empty)
            validateField(nameInput, nameInput.value.trim() !== '');

            // Check Email (Regex)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            validateField(emailInput, emailRegex.test(emailInput.value.trim()));

            // Success State
            if (isValid) {
                const btn = form.querySelector('button');
                const originalText = btn.innerText;
                
                btn.innerText = 'Downloading...';
                btn.style.opacity = '0.7';
                
                setTimeout(() => {
                    alert('Success! Your download has started.');
                    form.reset();
                    btn.innerText = originalText;
                    btn.style.opacity = '1';
                }, 1500);
            }
        });
    }

    // --- 3. Navbar Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});