/**
 * Modou Lamin Kinteh - Portfolio Interactivity
 * Features: Smooth Scroll, Sticky Nav, Project Filter, Skill Animation, Counters
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- State & Constants ---
    const body = document.body;
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-links');
    const themeToggle = document.getElementById('theme-toggle');
    const yearSpan = document.getElementById('year');
    
    // Set Current Year
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // --- Mobile Menu ---
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // --- Theme Toggle (Optional but requested) ---
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        const icon = themeToggle.querySelector('i');
        if (body.classList.contains('light-theme')) {
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    });

    // --- Sticky Nav & Active Links ---
    const handleScroll = () => {
        // Sticky Styling
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg');
        } else {
            navbar.classList.remove('shadow-lg');
        }

        // Active Link Highlighting
        let current = '';
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);

    // --- Project Filtering ---
    const filterBtns = document.querySelectorAll('.projects-filter .filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });

    // --- Intersection Observer for Animations ---
    const observerOptions = {
        threshold: 0.25
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Skill Bars
                if (entry.target.id === 'skills') {
                    const bars = entry.target.querySelectorAll('.progress-bar');
                    bars.forEach(bar => {
                        bar.style.width = bar.getAttribute('data-width');
                    });
                }

                // Counters
                if (entry.target.classList.contains('hero')) {
                    const counters = entry.target.querySelectorAll('.stat-number');
                    counters.forEach(counter => {
                        animateCounter(counter);
                    });
                }
                
                // General Fade Up
                entry.target.classList.add('appear');
            }
        });
    }, observerOptions);

    // Observe sections and elements
    document.querySelectorAll('section, .project-card, .cert-card, .about-text-card').forEach(el => {
        el.classList.add('fade-up');
        sectionObserver.observe(el);
    });

    // --- Counter Animation Function ---
    function animateCounter(counter) {
        if (counter.classList.contains('counted')) return;
        
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 16ms approx per frame
        
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
                counter.classList.add('counted');
            }
        };
        
        updateCounter();
    }

    // --- Contact Form ---
    const contactForm = document.getElementById('portfolio-contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            // Simulate API call
            setTimeout(() => {
                formFeedback.innerHTML = 'Thank you! Your message has been sent successfully.';
                formFeedback.className = 'form-feedback success';
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;

                // Clear feedback after 5s
                setTimeout(() => {
                    formFeedback.innerHTML = '';
                }, 5000);
            }, 1500);
        });
    }
});
