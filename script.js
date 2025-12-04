// Matrix Rain Animation
function initMatrixAnimation() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Matrix characters
    const matrix = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    const matrixChars = matrix.split('');

    const fontSize = 14;
    let columns = 0;
    let drops = [];
    let animationId = null;

    // Initialize canvas and drops
    function initMatrix() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;
        
        // Calculate number of columns
        columns = Math.floor(width / fontSize);
        
        // Reset and initialize drops array
        drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100;
        }
    }

    // Initialize on load
    initMatrix();

    // Draw matrix rain
    function drawMatrix() {
        // Semi-transparent black to create trail effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#38bdf8';
        ctx.font = fontSize + 'px "JetBrains Mono", monospace';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';

        for (let i = 0; i < drops.length && i < columns; i++) {
            const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            
            // Only draw if within canvas bounds
            if (y >= 0 && y <= canvas.height) {
                ctx.fillText(text, x, y);
            }

            // Reset drop to top randomly, or when it goes off screen
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    // Start animation
    function startAnimation() {
        if (animationId) clearInterval(animationId);
        animationId = setInterval(drawMatrix, 50);
    }

    startAnimation();

    // Resize canvas on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            initMatrix();
        }, 100);
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMatrixAnimation);
} else {
    initMatrixAnimation();
}

// Smooth scrolling for navigation links
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

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.stat-card, .timeline-item, .skill-category, .project-card, .cert-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.transform = 'translateY(0)';
    } else if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Add active class to navigation links on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Terminal typing effect for contact section
const terminalOutputs = document.querySelectorAll('.terminal-output');
let currentLine = 0;

function typeTerminalLine() {
    if (currentLine < terminalOutputs.length) {
        const line = terminalOutputs[currentLine];
        const text = line.textContent;
        line.textContent = '';
        line.style.display = 'block';
        
        let charIndex = 0;
        const typeInterval = setInterval(() => {
            if (charIndex < text.length) {
                line.textContent += text.charAt(charIndex);
                charIndex++;
            } else {
                clearInterval(typeInterval);
                currentLine++;
                setTimeout(typeTerminalLine, 200);
            }
        }, 30);
    }
}

// Trigger terminal typing when contact section is visible
const contactSection = document.querySelector('#contact');
const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && currentLine === 0) {
            setTimeout(typeTerminalLine, 500);
        }
    });
}, { threshold: 0.5 });

if (contactSection) {
    contactObserver.observe(contactSection);
}

// Dynamic stats counter animation
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (element.dataset.suffix || '');
    }, 16);
}

// Observe stats cards for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const value = entry.target.querySelector('.stat-value');
            if (value && !value.classList.contains('animated')) {
                value.classList.add('animated');
                const targetValue = parseInt(value.dataset.value || '0');
                if (!isNaN(targetValue)) {
                    animateValue(value, 0, targetValue, 1000);
                }
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statsObserver.observe(card);
});

// Add glitch effect to title on hover
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    let glitchInterval;
    
    heroTitle.addEventListener('mouseenter', () => {
        let iterations = 0;
        const originalText = heroTitle.textContent;
        
        glitchInterval = setInterval(() => {
            if (iterations < 5) {
                heroTitle.textContent = heroTitle.textContent
                    .split('')
                    .map((char, index) => {
                        if (Math.random() > 0.8) {
                            return matrixChars[Math.floor(Math.random() * matrixChars.length)];
                        }
                        return originalText[index];
                    })
                    .join('');
                iterations++;
            } else {
                heroTitle.textContent = originalText;
                clearInterval(glitchInterval);
            }
        }, 100);
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.8;
    }
});

// Add cursor trail effect
const cursorTrail = [];
const trailLength = 20;

document.addEventListener('mousemove', (e) => {
    cursorTrail.push({ x: e.clientX, y: e.clientY });
    
    if (cursorTrail.length > trailLength) {
        cursorTrail.shift();
    }
});

// Create particles on button hover
const buttons = document.querySelectorAll('.btn-primary');
buttons.forEach(button => {
    button.addEventListener('mouseenter', (e) => {
        const rect = button.getBoundingClientRect();
        
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = '#38bdf8';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.left = rect.left + rect.width / 2 + 'px';
            particle.style.top = rect.top + rect.height / 2 + 'px';
            particle.style.zIndex = '1000';
            
            document.body.appendChild(particle);
            
            const angle = (Math.PI * 2 * i) / 10;
            const velocity = 2 + Math.random() * 2;
            
            let opacity = 1;
            let x = 0;
            let y = 0;
            
            const animate = () => {
                opacity -= 0.02;
                x += Math.cos(angle) * velocity;
                y += Math.sin(angle) * velocity;
                
                particle.style.opacity = opacity;
                particle.style.transform = `translate(${x}px, ${y}px)`;
                
                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    particle.remove();
                }
            };
            
            animate();
        }
    });
});

// Console greeting
console.log('%c Welcome to Goutham Vignesh\'s Portfolio ', 'background: #38bdf8; color: #0a0e17; font-size: 16px; font-weight: bold; padding: 10px;');
console.log('%c Machine Learning Engineer | 6+ Years Experience ', 'background: #0f1419; color: #38bdf8; font-size: 14px; padding: 5px;');
console.log('%c Looking for opportunities? Let\'s connect! ', 'color: #22c55e; font-size: 12px;');

// Performance optimization - reduce animations on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.querySelectorAll('.stat-card, .project-card, .skill-category').forEach(el => {
        el.style.transition = 'none';
    });
}

// Add Easter egg - Konami code
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-konamiPattern.length);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
        
        console.log('%c 🎉 Easter Egg Found! 🎉 ', 'background: #a78bfa; color: white; font-size: 20px; font-weight: bold; padding: 10px;');
    }
});

// Add rainbow animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    /* Scroll Progress Indicator */
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: var(--gradient-primary);
        z-index: 10000;
        transform-origin: left;
        transition: width 0.1s ease-out;
    }
    
    @keyframes slideInFromTop {
        0% {
            opacity: 0;
            transform: translateY(-50px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
    }
    
    .float-animate {
        animation: float 3s ease-in-out infinite;
    }
    
    @keyframes glow-pulse {
        0%, 100% { box-shadow: 0 0 20px rgba(56, 189, 248, 0.3); }
        50% { box-shadow: 0 0 40px rgba(56, 189, 248, 0.6), 0 0 60px rgba(167, 139, 250, 0.4); }
    }
    
    .glow-on-view {
        animation: glow-pulse 2s ease-in-out infinite;
    }
`;
document.head.appendChild(style);

// Create scroll progress indicator
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.prepend(scrollProgress);

// Update scroll progress
window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Enhanced section-specific parallax effects
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Section headers parallax
    document.querySelectorAll('.section-header').forEach(header => {
        const rect = header.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const offset = (window.innerHeight - rect.top) * 0.1;
            header.style.transform = `translateY(${-offset}px)`;
        }
    });
    
    // Cards 3D tilt effect on scroll
    document.querySelectorAll('.project-card, .skill-category').forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const cardCenter = rect.top + rect.height / 2;
            const windowCenter = window.innerHeight / 2;
            const tiltAmount = ((cardCenter - windowCenter) / windowCenter) * 2;
            if (card.classList.contains('visible-scroll')) {
                card.style.transform = `perspective(1000px) rotateX(${tiltAmount}deg) translateY(0)`;
            }
        }
    });
});

// Add floating animation to AI robot
const aiRobot = document.querySelector('.ai-robot-container');
if (aiRobot) {
    aiRobot.classList.add('float-animate');
}

// Smooth reveal for tech tags with stagger
document.querySelectorAll('.tech-tags, .skill-tags, .project-tech').forEach((container) => {
    const tags = container.querySelectorAll('.tech-tag, .skill-tag');
    tags.forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'scale(0.5) rotate(-10deg)';
        tag.style.transition = `all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.05}s`;
    });
    
    const tagsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const containerTags = entry.target.querySelectorAll('.tech-tag, .skill-tag');
                containerTags.forEach((tag) => {
                    tag.style.opacity = '1';
                    tag.style.transform = 'scale(1) rotate(0)';
                });
            }
        });
    }, { threshold: 0.2 });
    
    tagsObserver.observe(container);
});

// Add glow effect to cards when they come into view
const glowObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('glow-on-view');
            setTimeout(() => {
                entry.target.classList.remove('glow-on-view');
            }, 2000);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.timeline-content, .cert-card').forEach(el => {
    glowObserver.observe(el);
});

// Mouse parallax effect for hero section
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && window.pageYOffset < window.innerHeight) {
        const parallaxX = mouseX * 20;
        const parallaxY = mouseY * 20;
        heroContent.style.transform = `translate(${parallaxX}px, ${parallaxY}px)`;
    }
    
    // Parallax for AI robot
    const robot = document.querySelector('.ai-robot-container');
    if (robot && window.pageYOffset < window.innerHeight) {
        const parallaxX = mouseX * -30;
        const parallaxY = mouseY * -30;
        robot.style.transform = `translate(${parallaxX}px, ${parallaxY}px)`;
    }
});

// Enhanced scroll-triggered animations for different elements
const enhancedObserverOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const enhancedObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible-scroll');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1) rotateY(0)';
        }
    });
}, enhancedObserverOptions);

// Apply enhanced animations to section headers
document.querySelectorAll('.section-header').forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    enhancedObserver.observe(el);
});

// About section animations
document.querySelectorAll('.about-text').forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(-60px)';
    el.style.transition = 'all 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s';
    enhancedObserver.observe(el);
});

document.querySelectorAll('.terminal-box').forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(60px)';
    el.style.transition = 'all 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s';
    enhancedObserver.observe(el);
});

// Timeline animations with enhanced stagger
document.querySelectorAll('.timeline-item').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(-80px) scale(0.95)';
    el.style.transition = `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.15}s`;
    enhancedObserver.observe(el);
});

// Skills with scale and rotate animation
document.querySelectorAll('.skill-category').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'scale(0.85) rotate(-5deg)';
    el.style.transition = `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`;
    enhancedObserver.observe(el);
});

// Project cards with 3D flip animation
document.querySelectorAll('.project-card').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'perspective(1000px) rotateY(-30deg) translateY(30px)';
    el.style.transition = `all 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) ${(index % 3) * 0.15}s`;
    enhancedObserver.observe(el);
});

// Contact links with slide-in animation
document.querySelectorAll('.contact-link').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(60px)';
    el.style.transition = `all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`;
    enhancedObserver.observe(el);
});

// Animate status badge on load
const statusBadge = document.querySelector('.status-badge');
if (statusBadge) {
    statusBadge.style.animation = 'slideInFromTop 1s ease-out 0.5s both';
}

console.log('%c ✨ Enhanced Scroll Animations Loaded! ✨ ', 'background: #a78bfa; color: white; font-size: 14px; font-weight: bold; padding: 8px;');


