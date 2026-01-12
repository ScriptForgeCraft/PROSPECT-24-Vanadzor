(() => {
    const mainImg = document.getElementById("mainPlanImg");
    const track = document.querySelector(".gallery-track");

    const thumbsPrevBtn = document.querySelector(".gallery-arrow.prev");
    const thumbsNextBtn = document.querySelector(".gallery-arrow.next");

    const mainPrevBtn = document.querySelector(".main-arrow.prev");
    const mainNextBtn = document.querySelector(".main-arrow.next");

    if (!mainImg || !track) return;

    const thumbs = Array.from(track.querySelectorAll(".thumb"));
    if (thumbs.length === 0) {
        if (thumbsPrevBtn) thumbsPrevBtn.disabled = true;
        if (thumbsNextBtn) thumbsNextBtn.disabled = true;
        if (mainPrevBtn) mainPrevBtn.disabled = true;
        if (mainNextBtn) mainNextBtn.disabled = true;
        return;
    }

    let activeIndex = thumbs.findIndex(t => t.classList.contains("is-active"));
    if (activeIndex < 0) activeIndex = 0;

    let scrollIndex = 0;
    const visible = 4;
    const gap = 12;

    const getStep = () => {
        const first = thumbs[0];
        return first ? first.offsetWidth + gap : 0;
    };

    const getMaxScroll = () => Math.max(thumbs.length - visible, 0);

    const setActive = (nextActive) => {
        activeIndex = (nextActive + thumbs.length) % thumbs.length;

        const thumb = thumbs[activeIndex];
        mainImg.src = thumb.dataset.full || thumb.src;
        mainImg.alt = thumb.alt || "";

        thumbs.forEach(t => {
            t.classList.remove("is-active");
            t.setAttribute("aria-selected", "false");
        });

        thumb.classList.add("is-active");
        thumb.setAttribute("aria-selected", "true");
    };

    const updateTrack = () => {
        const step = getStep();
        track.style.transform = `translateX(${-scrollIndex * step}px)`;
    };

    const updateDisabled = () => {
        const maxScroll = getMaxScroll();

        if (thumbsPrevBtn) thumbsPrevBtn.disabled = scrollIndex <= 0;
        if (thumbsNextBtn) thumbsNextBtn.disabled = scrollIndex >= maxScroll;

        if (mainPrevBtn) mainPrevBtn.disabled = thumbs.length <= 1;
        if (mainNextBtn) mainNextBtn.disabled = thumbs.length <= 1;
    };

    const ensureActiveVisible = () => {
        const maxScroll = getMaxScroll();

        if (activeIndex < scrollIndex) {
            scrollIndex = activeIndex;
        } else if (activeIndex > scrollIndex + visible - 1) {
            scrollIndex = activeIndex - (visible - 1);
        }

        scrollIndex = Math.min(Math.max(scrollIndex, 0), maxScroll);
    };



    setActive(activeIndex);
    ensureActiveVisible();
    updateTrack();
    updateDisabled();


    track.addEventListener("click", (e) => {
        const thumb = e.target.closest(".thumb");
        if (!thumb) return;

        const idx = thumbs.indexOf(thumb);
        if (idx < 0) return;

        setActive(idx);
        ensureActiveVisible();
        updateTrack();
        updateDisabled();
    });


    mainNextBtn?.addEventListener("click", () => {
        setActive(activeIndex + 1);
        ensureActiveVisible();
        updateTrack();
        updateDisabled();
    });

    mainPrevBtn?.addEventListener("click", () => {
        setActive(activeIndex - 1);
        ensureActiveVisible();
        updateTrack();
        updateDisabled();
    });



    thumbsNextBtn?.addEventListener("click", () => {
        const maxScroll = getMaxScroll();
        scrollIndex = Math.min(scrollIndex + 1, maxScroll);
        updateTrack();
        updateDisabled();
    });

    thumbsPrevBtn?.addEventListener("click", () => {
        scrollIndex = Math.max(scrollIndex - 1, 0);
        updateTrack();
        updateDisabled();
    });


    window.addEventListener("resize", () => {
        ensureActiveVisible();
        updateTrack();
        updateDisabled();
    });
})();
