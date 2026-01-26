document.addEventListener('DOMContentLoaded', () => {
    const settings = document.querySelector('.settings');
    const toggle = settings.querySelector('.settings__toggle');
    const panel = settings.querySelector('.settings__inner');
    const close = settings.querySelector('.settings__close');

    toggle.onclick = (e) => {
        e.stopPropagation();
        panel.classList.toggle('is-hidden');
    };

    close.onclick = () => panel.classList.add('is-hidden');

    document.addEventListener('click', (e) => {
        if (!settings.contains(e.target)) panel.classList.add('is-hidden');
    });

    const themeBtns = settings.querySelectorAll('[data-theme]');
    themeBtns.forEach(btn => {
        btn.onclick = () => {
            themeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            if (btn.dataset.theme === 'dark') {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
        };
    });

    const sizeBtns = settings.querySelectorAll('[data-size]');
    sizeBtns.forEach(btn => {
        btn.onclick = () => {
            sizeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const scale = btn.dataset.size;
            document.documentElement.style.setProperty('--font-scale', scale);
        };
    });
});