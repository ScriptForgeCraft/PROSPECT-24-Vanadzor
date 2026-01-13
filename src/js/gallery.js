import Swiper from "swiper";
import "swiper/css";

(() => {
    const mainImg = document.getElementById("mainPlanImg");
    if (!mainImg) return;

    const thumbs = Array.from(document.querySelectorAll(".thumb"));
    if (!thumbs.length) return;

    const btnThumbPrev = document.querySelector(".gallery-arrow.prev");
    const btnThumbNext = document.querySelector(".gallery-arrow.next");
    const btnMainPrev = document.querySelector(".main-arrow.prev");
    const btnMainNext = document.querySelector(".main-arrow.next");

    let activeIndex = thumbs.findIndex(t => t.classList.contains("is-active"));
    if (activeIndex < 0) activeIndex = 0;

    let pendingIndex = null;
    let isFading = false;

    const swiper = new Swiper(".gallery-strip.swiper", {
        slidesPerView: 4,
        spaceBetween: 12,
        speed: 400,
        grabCursor: true,
        navigation: {
            nextEl: ".gallery-arrow.next",
            prevEl: ".gallery-arrow.prev",
        },
        breakpoints: {
            0: { slidesPerView: 2 },
            768: { slidesPerView: 4 },
        },
        on: {
            slideChange: updateThumbArrows
        }
    });

    function setActiveThumb(index) {
        thumbs.forEach(t => t.classList.remove("is-active"));
        thumbs[index]?.classList.add("is-active");
    }

    function preloadImage(src) {
        if (!src) return;
        const img = new Image();
        img.src = src;
    }

    function preloadNeighbors(index) {
        preloadImage(thumbs[index - 1]?.dataset.full);
        preloadImage(thumbs[index + 1]?.dataset.full);
    }

    function updateThumbArrows() {
        const isBeginning = swiper.isBeginning;
        const isEnd = swiper.isEnd;

        if (btnThumbPrev) btnThumbPrev.disabled = isBeginning;
        if (btnThumbNext) btnThumbNext.disabled = isEnd;
    }


    function applyImage(index) {
        const prevIndex = activeIndex;
        activeIndex = index;

        const fullSrc = thumbs[index]?.dataset.full || thumbs[index]?.src;
        if (!fullSrc) return;

        mainImg.src = fullSrc;
        setActiveThumb(index);
        preloadNeighbors(index);

        const isLoopJump =
            (prevIndex === thumbs.length - 1 && index === 0) ||
            (prevIndex === 0 && index === thumbs.length - 1);

        if (isLoopJump) {
            swiper.slideTo(index, 0, false);
        } else {
            swiper.slideTo(index, 300);
        }

        updateThumbArrows();
    }

    function requestSwitch(index) {
        const normalized = (index + thumbs.length) % thumbs.length;
        pendingIndex = normalized;

        if (isFading) return;
        isFading = true;

        mainImg.classList.add("is-fading");

        setTimeout(() => {
            const nextIndex = pendingIndex;
            pendingIndex = null;

            applyImage(nextIndex);

            requestAnimationFrame(() => {
                mainImg.classList.remove("is-fading");
                isFading = false;

                if (pendingIndex !== null) requestSwitch(pendingIndex);
            });
        }, 10);
    }

    thumbs.forEach((thumb, i) => {
        thumb.addEventListener("click", () => requestSwitch(i));
    });

    btnMainNext?.addEventListener("click", () => {
        requestSwitch((activeIndex + 1) % thumbs.length);
    });

    btnMainPrev?.addEventListener("click", () => {
        requestSwitch((activeIndex - 1 + thumbs.length) % thumbs.length);
    });

    btnThumbNext?.addEventListener("click", () => {
        swiper.slideNext();
        updateThumbArrows();
    });

    btnThumbPrev?.addEventListener("click", () => {
        swiper.slidePrev();
        updateThumbArrows();
    });

    applyImage(activeIndex);
    updateThumbArrows();
})();
