
/**
 * Prospect 24 - Core Interactions
 */

// Function to open the PDF Viewer Modal
function viewPDF(filePath, title) {
    const modal = document.getElementById('pdf-modal');
    const iframe = document.getElementById('pdf-frame');
    const titleEl = document.getElementById('modal-title');
    const downloadLink = document.getElementById('download-link');

    // Update Modal content
    titleEl.textContent = title;
    iframe.src = filePath;
    downloadLink.href = filePath;

    // Show modal
    modal.style.display = 'block';
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById('pdf-modal');
    const iframe = document.getElementById('pdf-frame');

    // Hide modal
    modal.style.display = 'none';
    
    // Clear iframe src to stop loading
    iframe.src = '';

    // Restore body scrolling
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside content
window.onclick = function(event) {
    const modal = document.getElementById('pdf-modal');
    if (event.target == modal) {
        closeModal();
    }
}

// Accessibility: Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Smooth reveal animation on scroll for gallery images
const revealOnScroll = () => {
    const images = document.querySelectorAll('.gallery-strip img, .valuation-images img');
    const windowHeight = window.innerHeight;

    images.forEach(img => {
        const rect = img.getBoundingClientRect();
        if (rect.top < windowHeight * 0.9) {
            img.style.opacity = '1';
            img.style.transform = 'translateY(0)';
        }
    });
};

// Initial state for gallery images
document.querySelectorAll('.gallery-strip img, .valuation-images img').forEach(img => {
    img.style.opacity = '0';
    img.style.transform = 'translateY(20px)';
    img.style.transition = 'all 0.6s ease-out';
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Navbar styling on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '5px 0';
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        navbar.style.padding = '15px 0';
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
    }
});
