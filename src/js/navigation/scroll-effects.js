document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.main-header');

  const checkHeaderScroll = () => {
    if (header && window.scrollY > 20) {
      header.classList.add('scrolled');
    }
    else if (header) {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', checkHeaderScroll);

  checkHeaderScroll();
});
