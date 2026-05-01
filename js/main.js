// Dhanvika Diagnostics - Main JavaScript
document.addEventListener('DOMContentLoaded', function () {

    // Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Close mobile nav on link click
    document.querySelectorAll('.nav-links a').forEach(function (link) {
        link.addEventListener('click', function () {
            navLinks.classList.remove('active');
            if (mobileToggle) mobileToggle.classList.remove('active');
        });
    });

    // Sticky Header
    const header = document.getElementById('header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    if (backToTop) {
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Active Navigation on Scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function () {
        const scrollY = window.scrollY + 100;
        sections.forEach(function (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector('.nav-links a[href="#' + sectionId + '"]');

            if (navLink) {
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-links a').forEach(function (link) {
                        link.classList.remove('active');
                    });
                    navLink.classList.add('active');
                }
            }
        });
    });

    // Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    function animateCounters() {
        statNumbers.forEach(function (counter) {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            function updateCounter() {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            }

            updateCounter();
        });
    }

    // Intersection Observer for counter animation
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && !countersAnimated) {
                    countersAnimated = true;
                    animateCounters();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }

    // Scroll Animations
    const animateElements = document.querySelectorAll(
        '.service-card, .package-card, .dept-card, .why-card, .testimonial-card, .contact-item'
    );

    const animationObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                animationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    animateElements.forEach(function (el, index) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.5s ease ' + (index % 3) * 0.1 + 's';
        animationObserver.observe(el);
    });

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value.trim();

            if (!name || !phone || !service) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }

            // Build WhatsApp message
            let whatsappMsg = 'Hello! I would like to enquire about your services.\n\n';
            whatsappMsg += 'Name: ' + name + '\n';
            whatsappMsg += 'Phone: ' + phone + '\n';
            whatsappMsg += 'Service: ' + service + '\n';
            if (message) {
                whatsappMsg += 'Message: ' + message + '\n';
            }

            var whatsappUrl = 'https://wa.me/+918885282637?text=' + encodeURIComponent(whatsappMsg);
            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

            showNotification('Redirecting to WhatsApp...', 'success');
            contactForm.reset();
        });
    }

    // Notification
    function showNotification(message, type) {
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = 'notification notification-' + type;
        notification.textContent = message;
        notification.style.cssText = 'position:fixed;top:20px;right:20px;padding:16px 24px;border-radius:8px;color:#fff;font-family:Poppins,sans-serif;font-size:0.9rem;z-index:10000;animation:fadeInUp 0.3s ease;box-shadow:0 4px 15px rgba(0,0,0,0.2);';

        if (type === 'success') {
            notification.style.background = '#76b043';
        } else {
            notification.style.background = '#e53935';
        }

        document.body.appendChild(notification);
        setTimeout(function () {
            notification.style.opacity = '0';
            setTimeout(function () { notification.remove(); }, 300);
        }, 3000);
    }

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
