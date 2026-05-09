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

    // Site Search
    const PHONE = '+918885282637';
    const wa = function (text) {
        return 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(text);
    };

    const searchIndex = [
        // Tests (quick + common)
        { label: 'Complete Blood Picture (CBP)', meta: '₹ 300 · Test', kind: 'test', target: wa('I want to book Complete Blood Picture (CBP)') },
        { label: 'HbA1c (Glycated Haemoglobin)', meta: '₹ 499 · Test', kind: 'test', target: wa('I want to book HbA1c (Glycated Haemoglobin)') },
        { label: 'Thyroid Profile', meta: '₹ 500 · Test', kind: 'test', target: wa('I want to book Thyroid Profile') },
        { label: 'Lipid Profile', meta: '₹ 550 · Test', kind: 'test', target: wa('I want to book Lipid Profile') },
        { label: 'Liver Function Profile', meta: '₹ 550 · Test', kind: 'test', target: wa('I want to book Liver Function Profile') },
        { label: 'Vitamin B12', meta: '₹ 1099 · Test', keywords: 'cyanocobalamin', kind: 'test', target: wa('I want to book Vitamin B12') },
        { label: 'Vitamin D', meta: 'Test', kind: 'test', target: wa('I want to book Vitamin D test') },
        { label: 'Kidney Function Test', meta: 'Test', keywords: 'kft creatinine urea', kind: 'test', target: wa('I want to book Kidney Function Test') },
        { label: 'Blood Sugar (Fasting)', meta: 'Test', keywords: 'fbs glucose diabetes', kind: 'test', target: wa('I want to book Blood Sugar Fasting') },
        { label: 'Urine Analysis (CUE)', meta: 'Test', keywords: 'urine routine', kind: 'test', target: wa('I want to book Urine Analysis') },
        { label: 'CRP (C-Reactive Protein)', meta: 'Test', kind: 'test', target: wa('I want to book CRP test') },
        { label: 'Dengue Profile', meta: 'Test', kind: 'test', target: wa('I want to book Dengue Profile') },
        { label: 'ECG', meta: 'Test', keywords: 'electrocardiogram heart', kind: 'test', target: wa('I want to book ECG') },

        // Packages
        { label: 'Basic Health Checkup', meta: '₹ 999 · 30+ Parameters', kind: 'package', target: '#packages' },
        { label: 'Full Body Checkup', meta: '₹ 1,999 · 60+ Parameters', kind: 'package', target: '#packages' },
        { label: 'Cardiac Profile', meta: '₹ 2,499 · 40+ Parameters', kind: 'package', keywords: 'heart cardiology', target: '#packages' },

        // Services
        { label: 'Doctor Consultancy', meta: 'Service', kind: 'service', target: '#services' },
        { label: 'Home Sample Collection', meta: 'Service', kind: 'service', keywords: 'home collection phlebotomy', target: '#services' },
        { label: 'Corporate Health Camps', meta: 'Service', kind: 'service', target: '#services' },
        { label: 'Health Packages', meta: 'Service', kind: 'service', target: '#packages' },
        { label: 'Digital Reports', meta: 'Service', keywords: 'whatsapp email online', kind: 'service', target: '#services' },

        // Departments
        { label: 'Hematology & Coagulation', meta: 'Department', kind: 'dept', target: '#departments' },
        { label: 'Clinical Biochemistry', meta: 'Department', kind: 'dept', target: '#departments' },
        { label: 'Immunology', meta: 'Department', kind: 'dept', target: '#departments' },
        { label: 'Serology', meta: 'Department', kind: 'dept', target: '#departments' },
        { label: 'Microbiology', meta: 'Department', kind: 'dept', target: '#departments' },
        { label: 'Molecular Biology', meta: 'Department', kind: 'dept', target: '#departments' },
        { label: 'Histopathology & Cytology', meta: 'Department', kind: 'dept', target: '#departments' },
        { label: 'Radiology', meta: 'Department', keywords: 'xray x-ray scan', kind: 'dept', target: '#departments' },

        // Page sections
        { label: 'About Us', meta: 'Page', kind: 'page', target: '#about' },
        { label: 'Contact', meta: 'Page', kind: 'page', keywords: 'phone email address location', target: '#contact' },
        { label: 'Testimonials', meta: 'Page', kind: 'page', keywords: 'reviews', target: '#testimonials' }
    ];

    const ICON = {
        test: 'fa-vial',
        package: 'fa-box-open',
        service: 'fa-stethoscope',
        dept: 'fa-microscope',
        page: 'fa-link'
    };

    const searchInput = document.getElementById('siteSearch');
    const suggestionsBox = document.getElementById('searchSuggestions');
    const searchWrapper = document.getElementById('searchWrapper');

    if (searchInput && suggestionsBox && searchWrapper) {
        let activeIndex = -1;
        let lastResults = [];

        const escapeHtml = function (s) {
            return s.replace(/[&<>"']/g, function (c) {
                return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
            });
        };

        const highlight = function (text, query) {
            if (!query) return escapeHtml(text);
            const re = new RegExp('(' + query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
            return escapeHtml(text).replace(re, '<mark>$1</mark>');
        };

        const render = function (results, query) {
            if (!query) {
                suggestionsBox.hidden = true;
                suggestionsBox.innerHTML = '';
                return;
            }
            if (results.length === 0) {
                suggestionsBox.innerHTML = '<div class="search-empty">No results for "' + escapeHtml(query) + '". Try CBP, Thyroid, Full Body, etc.</div>';
                suggestionsBox.hidden = false;
                return;
            }
            const html = results.map(function (item, i) {
                const isWa = item.target.indexOf('wa.me') !== -1;
                const ctaIcon = isWa ? 'fa-brands fa-whatsapp' : 'fa-solid fa-arrow-right';
                return '' +
                    '<a class="search-result' + (i === activeIndex ? ' active' : '') + '" data-target="' + escapeHtml(item.target) + '" data-wa="' + (isWa ? '1' : '0') + '" href="' + escapeHtml(item.target) + '"' + (isWa ? ' target="_blank" rel="noopener noreferrer"' : '') + '>' +
                    '<i class="result-icon fa-solid ' + ICON[item.kind] + '"></i>' +
                    '<div class="result-text"><div class="result-label">' + highlight(item.label, query) + '</div>' +
                    '<div class="result-meta">' + escapeHtml(item.meta) + '</div></div>' +
                    '<i class="result-cta ' + ctaIcon + '"></i>' +
                    '</a>';
            }).join('');
            suggestionsBox.innerHTML = html;
            suggestionsBox.hidden = false;
        };

        const runSearch = function () {
            const q = searchInput.value.trim().toLowerCase();
            activeIndex = -1;
            if (!q) {
                lastResults = [];
                render([], '');
                return;
            }
            const scored = [];
            for (let i = 0; i < searchIndex.length; i++) {
                const item = searchIndex[i];
                const haystack = (item.label + ' ' + (item.keywords || '') + ' ' + item.meta).toLowerCase();
                if (haystack.indexOf(q) === -1) continue;
                let score = 0;
                if (item.label.toLowerCase().indexOf(q) === 0) score += 10;
                else if (item.label.toLowerCase().indexOf(q) !== -1) score += 5;
                else score += 1;
                scored.push({ item: item, score: score });
            }
            scored.sort(function (a, b) { return b.score - a.score; });
            lastResults = scored.slice(0, 8).map(function (s) { return s.item; });
            render(lastResults, q);
        };

        searchInput.addEventListener('input', runSearch);
        searchInput.addEventListener('focus', function () {
            if (searchInput.value.trim()) runSearch();
        });

        searchInput.addEventListener('keydown', function (e) {
            if (suggestionsBox.hidden || lastResults.length === 0) return;
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                activeIndex = Math.min(activeIndex + 1, lastResults.length - 1);
                render(lastResults, searchInput.value.trim().toLowerCase());
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                activeIndex = Math.max(activeIndex - 1, 0);
                render(lastResults, searchInput.value.trim().toLowerCase());
            } else if (e.key === 'Enter') {
                if (activeIndex >= 0 && lastResults[activeIndex]) {
                    e.preventDefault();
                    selectResult(lastResults[activeIndex]);
                }
            } else if (e.key === 'Escape') {
                suggestionsBox.hidden = true;
                searchInput.blur();
            }
        });

        const selectResult = function (item) {
            suggestionsBox.hidden = true;
            searchInput.value = item.label;
            const isWa = item.target.indexOf('wa.me') !== -1;
            if (isWa) {
                window.open(item.target, '_blank', 'noopener,noreferrer');
            } else {
                const el = document.querySelector(item.target);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }
        };

        suggestionsBox.addEventListener('click', function (e) {
            const link = e.target.closest('.search-result');
            if (!link) return;
            const isWa = link.getAttribute('data-wa') === '1';
            if (isWa) return;
            e.preventDefault();
            const target = link.getAttribute('data-target');
            const el = document.querySelector(target);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            suggestionsBox.hidden = true;
        });

        document.addEventListener('click', function (e) {
            if (!searchWrapper.contains(e.target)) {
                suggestionsBox.hidden = true;
            }
        });
    }
});
