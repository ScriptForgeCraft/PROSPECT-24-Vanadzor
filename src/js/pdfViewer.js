function viewPDF(filePath, title) {
    const modal = document.getElementById('pdf-modal');
    const iframe = document.getElementById('pdf-frame');
    const titleEl = document.getElementById('modal-title');
    const downloadLink = document.getElementById('download-link');

    titleEl.textContent = title;
    iframe.src = filePath;
    downloadLink.href = filePath;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('pdf-modal');
    const iframe = document.getElementById('pdf-frame');

    modal.style.display = 'none';
    iframe.src = '';
    document.body.style.overflow = 'auto';
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
