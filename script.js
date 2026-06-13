document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-link');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Smooth scrolling for in-page navigation.
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const target = document.querySelector(anchor.getAttribute('href'));

            if (!target) return;

            event.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Lightweight scroll progress indicator.
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.prepend(scrollProgress);

    function updateScrollState() {
        const scrollableHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;

        scrollProgress.style.width = `${scrolled}%`;
        header?.classList.toggle('is-scrolled', window.scrollY > 12);

        let currentSection = '';
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;

            if (window.scrollY >= sectionTop - 180) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
        });
    }

    window.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();

    // Calm reveal animation for the main content blocks.
    const revealTargets = document.querySelectorAll(
        '.hero-visual, .hero-proof, .section-header, .about-text, .profile-card, .timeline-item, .cert-card, .skill-category, .project-card, .contact-card, .contact-link'
    );

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -80px 0px'
        });

        revealTargets.forEach((element) => {
            element.classList.add('reveal');
            revealObserver.observe(element);
        });
    } else {
        revealTargets.forEach((element) => element.classList.add('is-visible'));
    }

    // Count-up microinteraction for hero proof points.
    const proofValues = document.querySelectorAll('.proof-value[data-count]');
    function animateProofValue(value) {
        if (value.classList.contains('animated')) return;

        const targetValue = parseInt(value.dataset.count || '0', 10);
        const suffix = value.dataset.suffix || '';
        value.classList.add('animated');

        if (prefersReducedMotion || Number.isNaN(targetValue)) {
            value.textContent = `${Number.isNaN(targetValue) ? 0 : targetValue}${suffix}`;
            return;
        }

        animateValue(value, 0, targetValue, 900);
    }

    if ('IntersectionObserver' in window && proofValues.length > 0) {
        const proofObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                animateProofValue(entry.target);
                proofObserver.unobserve(entry.target);
            });
        }, { threshold: 0.7 });

        proofValues.forEach((value) => proofObserver.observe(value));
    } else {
        proofValues.forEach(animateProofValue);
    }

    // Optional stat counters, kept for compatibility if stat cards are added later.
    const statCards = document.querySelectorAll('.stat-card');
    if ('IntersectionObserver' in window && statCards.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const value = entry.target.querySelector('.stat-value');
                if (!value || value.classList.contains('animated')) return;

                value.classList.add('animated');
                animateValue(value, 0, parseInt(value.dataset.value || '0', 10), 900);
                statsObserver.unobserve(entry.target);
            });
        }, { threshold: 0.45 });

        statCards.forEach((card) => statsObserver.observe(card));
    }
});

function animateValue(element, start, end, duration) {
    if (Number.isNaN(end)) return;

    const range = end - start;
    const startTime = performance.now();
    const suffix = element.dataset.suffix || '';

    function update(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const current = Math.floor(start + range * progress);

        element.textContent = `${current}${suffix}`;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

function toggleCertifications() {
    const content = document.getElementById('cert-content');
    const icon = document.getElementById('cert-icon');

    if (!content || !icon) return;

    const isOpen = content.style.display === 'block';
    content.style.display = isOpen ? 'none' : 'block';
    icon.textContent = isOpen ? '+' : '-';
}

window.toggleCertifications = toggleCertifications;
