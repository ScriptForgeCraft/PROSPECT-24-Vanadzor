import Swiper from "swiper";
import { FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";

(() => {
    const mainImg = document.getElementById("mainPlanImg");
    if (!mainImg) return;

    const thumbs = Array.from(document.querySelectorAll(".thumb"));
    if (!thumbs.length) return;

    const btnThumbPrev = document.querySelector(".gallery-arrow.prev");
    const btnThumbNext = document.querySelector(".gallery-arrow.next");
    const btnMainPrev = document.querySelector(".main-arrow.prev");
    const btnMainNext = document.querySelector(".main-arrow.next");

    const zoomOverlay = document.getElementById("zoomOverlay");
    const zoomImage = document.getElementById("zoomImage");
    const zoomClose = zoomOverlay?.querySelector(".zoom-close");
    const zoomPrev = zoomOverlay?.querySelector(".zoom-arrow.prev");
    const zoomNext = zoomOverlay?.querySelector(".zoom-arrow.next");
    const zoomBtn = document.querySelector(".zoom-btn");

    let activeIndex = thumbs.findIndex(t => t.classList.contains("is-active"));
    if (activeIndex < 0) activeIndex = 0;

    let pendingIndex = null;
    let isFading = false;

    const swiper = new Swiper(".gallery-strip.swiper", {
        
        modules: [FreeMode],
        
        slidesPerView: 4,
        spaceBetween: 12,
        speed: 400,
        grabCursor: true,
        
        freeMode: {
            enabled: true,
            sticky: false,   
            momentum: true,  
        },

        breakpoints: {
            0: { slidesPerView: 2.5 },
            768: { slidesPerView: 5 },
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
        if (btnThumbPrev) btnThumbPrev.disabled = swiper.isBeginning;
        if (btnThumbNext) btnThumbNext.disabled = swiper.isEnd;
    }

    function isZoomOpen() {
        return !!zoomOverlay && zoomOverlay.classList.contains("is-open");
    }

    function openZoom() {
        if (!zoomOverlay || !zoomImage) return;
        zoomImage.src = mainImg.src;
        zoomOverlay.classList.add("is-open");
        zoomOverlay.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeZoom() {
        if (!zoomOverlay) return;
        zoomOverlay.classList.remove("is-open");
        zoomOverlay.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    function applyImage(index) {
        const prevIndex = activeIndex;
        activeIndex = index;

        const fullSrc = thumbs[index]?.dataset.full || thumbs[index]?.src;
        if (!fullSrc) return;

        mainImg.src = fullSrc;

        if (isZoomOpen() && zoomImage) {
            zoomImage.src = fullSrc;
        }

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

    zoomBtn?.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        openZoom();
    });

    zoomClose?.addEventListener("click", closeZoom);

    zoomOverlay?.addEventListener("click", (e) => {
        if (e.target === zoomOverlay) closeZoom();
    });

    zoomNext?.addEventListener("click", () => requestSwitch(activeIndex + 1));
    zoomPrev?.addEventListener("click", () => requestSwitch(activeIndex - 1));

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && isZoomOpen()) closeZoom();
        if (isZoomOpen()) {
            if (e.key === "ArrowRight") requestSwitch(activeIndex + 1);
            if (e.key === "ArrowLeft") requestSwitch(activeIndex - 1);
        }
    });

    applyImage(activeIndex);
    updateThumbArrows();
})();