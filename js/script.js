// Fungsi untuk cek apakah elemen terlihat di viewport
function isInView(element) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
}

// Ambil semua elemen dengan class .fade-in
const fadeElements = document.querySelectorAll('.fade-in');

// Cek setiap elemen saat halaman di-scroll
function checkScroll() {
    fadeElements.forEach(element => {
        if (isInView(element)) {
            element.classList.add('visible');  // Tambahkan class "visible"
        }
    });
}

// Navbar scroll effect
const navbar = document.getElementById('navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Toggle menu mobile
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Handle navbar appearance on scroll
window.addEventListener('scroll', function() {
    // Mengecek fade effect
    checkScroll();
    
    // Navbar style on scroll
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling untuk semua link anchor
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Tutup mobile menu jika terbuka
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset untuk navbar
                behavior: 'smooth'
            });
        }
    });
});

// Panggil fungsi checkScroll saat pertama kali halaman dimuat untuk elemen yang sudah terlihat
document.addEventListener('DOMContentLoaded', function() {
    checkScroll();
    
    // Tambahkan active class ke navbar link berdasarkan section yang terlihat
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Update active link saat scroll
    window.addEventListener('scroll', setActiveNavLink);
});
