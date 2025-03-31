// Smooth Scroll for Navbar Links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        section.scrollIntoView({ behavior: 'smooth' });
    });
});

// Form Submission Alert (for demo)
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Message Sent! (This is a demo)');
    this.reset();
});

// Project Card Animation on Scroll
const projectCards = document.querySelectorAll('.project-card');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `slideUp 0.5s ease-in-out ${entry.target.style.getPropertyValue('--delay')}`;
        }
    });
}, { threshold: 0.3 });

projectCards.forEach(card => observer.observe(card));

// Toggle Social Links
const socialToggleBtn = document.querySelector('.social-toggle-btn');
const socialLinks = document.querySelector('#social-links');

socialToggleBtn.addEventListener('click', function() {
    socialLinks.classList.toggle('active');
});

// Animate icons on scroll
const animatedIcons = document.querySelectorAll('.animated-icon, .exp-icon');
const iconObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
        }
    });
}, { threshold: 0.5 });

animatedIcons.forEach(icon => {
    icon.style.opacity = '0'; // Initially hidden
    iconObserver.observe(icon);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});