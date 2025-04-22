/**
 * Portfolio Website JavaScript
 * This script adds interactivity to Halid Haniz's portfolio website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('#navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active nav link highlighting based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinksArray = document.querySelectorAll('.nav-links a');
    
    function highlightNavLink() {
        let scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinksArray.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);

    // Typewriter effect for the hero subtitle
    const subtitle = document.querySelector('.hero-text h2');
    const originalText = subtitle.textContent;
    subtitle.textContent = '';
    
    let charIndex = 0;
    function typeEffect() {
        if (charIndex < originalText.length) {
            subtitle.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeEffect, 50);
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(typeEffect, 500);

    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.about-text, .about-image, .timeline-item, .project-card, .contact-info, .contact-form');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    // Add animation class to CSS
    const style = document.createElement('style');
    style.innerHTML = `
        .about-text, .about-image, .timeline-item, .project-card, .contact-info, .contact-form {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .about-text.animate, .about-image.animate, .timeline-item.animate, .project-card.animate, 
        .contact-info.animate, .contact-form.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .hamburger.active .bar:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger.active .bar:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active .bar:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    `;
    document.head.appendChild(style);
    
    window.addEventListener('scroll', animateOnScroll);
    // Initial check for elements in view
    animateOnScroll();

    // Form submission handling
    const contactForm = document.getElementById('messageForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Validate form (basic validation)
        if (!name || !email || !message) {
            showFormNotification('Please fill all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showFormNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Here you would normally send data to a server
        // For demo purposes, we'll just show a success message
        
        // Show success message
        showFormNotification('Message sent successfully! I will get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
    });
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showFormNotification(message, type) {
        // Create notification element if it doesn't exist
        let notification = document.querySelector('.form-notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'form-notification';
            contactForm.parentNode.insertBefore(notification, contactForm.nextSibling);
            
            // Add notification styles to the style element
            style.innerHTML += `
                .form-notification {
                    padding: 12px 16px;
                    margin-top: 20px;
                    border-radius: 5px;
                    font-weight: 500;
                    animation: fadeIn 0.3s ease-out;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .form-notification.success {
                    background-color: rgba(40, 167, 69, 0.2);
                    color: #28a745;
                    border-left: 4px solid #28a745;
                }
                
                .form-notification.error {
                    background-color: rgba(220, 53, 69, 0.2);
                    color: #dc3545;
                    border-left: 4px solid #dc3545;
                }
            `;
        }
        
        // Update notification
        notification.textContent = message;
        notification.className = 'form-notification ' + type;
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.style.display = 'none';
                notification.style.opacity = '1';
            }, 300);
        }, 5000);
    }

    // Navbar scroll effect
    function handleNavbarScroll() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
            
            // Add scrolled class styling
            if (!document.querySelector('.navbar-scrolled-style')) {
                const scrollStyle = document.createElement('style');
                scrollStyle.className = 'navbar-scrolled-style';
                scrollStyle.innerHTML = `
                    #navbar.scrolled {
                        background-color: rgba(18, 18, 18, 0.95);
                        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                        padding: 0.7rem 2rem;
                        transition: all 0.3s ease;
                    }
                `;
                document.head.appendChild(scrollStyle);
            }
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Skill tag animation
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.1}s`;
        tag.style.animation = 'fadeInUp 0.5s ease-out forwards';
    });
    
    // Add skill tag animation keyframes
    const skillTagStyle = document.createElement('style');
    skillTagStyle.innerHTML = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(skillTagStyle);
    
    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero');
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        if (scrollPosition < window.innerHeight) {
            heroSection.style.backgroundPositionY = `${scrollPosition * 0.3}px`;
        }
    });
    
    // Initialize page
    highlightNavLink();
    handleNavbarScroll();
});