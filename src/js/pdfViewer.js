function viewPDF(filePath, title) {
    const modal = document.getElementById('pdf-modal');
    const iframe = document.getElementById('pdf-frame');
    const titleEl = document.getElementById('modal-title');
    const downloadLink = document.getElementById('download-link');
    const header = document.querySelector(".main-header");
    const isGoogleDrive = (url) => url.includes('drive.google.com');

    titleEl.textContent = title;
    iframe.src = filePath;

    header.classList.add("main-header--hidden");

    if (isGoogleDrive(filePath)) {
        downloadLink.style.display = 'none';
    } else {
        downloadLink.style.display = 'inline-block';
    }
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('pdf-modal');
    const iframe = document.getElementById('pdf-frame');
    const header = document.querySelector(".main-header");

    modal.style.display = 'none';
    iframe.src = '';
    document.body.style.overflow = 'auto';
    header.classList.remove("main-header--hidden");
}

window.onclick = function (event) {
    const modal = document.getElementById('pdf-modal');
    if (event.target === modal) {
        closeModal();
    }
};

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

window.viewPDF = viewPDF;
window.closeModal = closeModal;
