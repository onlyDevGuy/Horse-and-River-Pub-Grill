document.addEventListener('DOMContentLoaded', () => {
    /* ==========================================
       STICKY NAVIGATION
       ========================================== */
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* ==========================================
       MOBILE MENU
       ========================================== */
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileClose = document.querySelector('.mobile-menu-close');
    const mobileLinks = document.querySelectorAll('.mobile-menu a');

    mobileToggle.addEventListener('click', () => {
        mobileMenu.classList.add('open');
    });

    mobileClose.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
        });
    });

    /* ==========================================
       SCROLL REVEAL ANIMATIONS
       ========================================== */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* ==========================================
       DYNAMIC OPENING HOURS STATUS
       ========================================== */
    // Hours of operation
    // 0 = Sunday, 1 = Monday, etc.
    const hours = {
        0: { open: 10, close: 18 }, // Sunday: 10am - 6pm
        1: { open: 10, close: 20 }, // Monday: 10am - 8pm
        2: { open: 10, close: 21 }, // Tuesday: 10am - 9pm
        3: { open: 10, close: 21 }, // Wednesday: 10am - 9pm
        4: { open: 10, close: 21 }, // Thursday: 10am - 9pm
        5: { open: 10, close: 21 }, // Friday: 10am - 9pm
        6: { open: 10, close: 21 }  // Saturday: 10am - 9pm
    };

    function updateStatus() {
        const now = new Date();
        const day = now.getDay();
        const hour = now.getHours();
        
        const todayHours = hours[day];
        const statusIndicator = document.getElementById('status-indicator');
        const statusText = statusIndicator.querySelector('.status-text');

        // Check if currently open
        if (hour >= todayHours.open && hour < todayHours.close) {
            statusIndicator.classList.remove('closed');
            statusIndicator.classList.add('open');
            
            // Format closing time
            const closeHour = todayHours.close;
            const ampm = closeHour >= 12 ? 'PM' : 'AM';
            const displayHour = closeHour > 12 ? closeHour - 12 : closeHour;
            
            statusText.textContent = `Open until ${displayHour}:00 ${ampm}`;
        } else {
            statusIndicator.classList.remove('open');
            statusIndicator.classList.add('closed');
            statusText.textContent = 'Currently Closed';
        }
    }

    // Run initially
    updateStatus();
    // Update every minute
    setInterval(updateStatus, 60000);
});
