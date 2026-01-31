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
    const zoomInBtn = document.querySelector(".zoom-in");
    const zoomOutBtn = document.querySelector(".zoom-out");

    let activeIndex = thumbs.findIndex(t => t.classList.contains("is-active"));
    if (activeIndex < 0) activeIndex = 0;

    let pendingIndex = null;
    let isFading = false;

    // Zoom state
    let scale = 1;
    let translateX = 0;
    let translateY = 0;
    let isDraggingZoom = false;
    let startDragX = 0;
    let startDragY = 0;

    const MIN_SCALE = 1;
    const MAX_SCALE = 5;

    // Background preload   
    const preloadedSet = new Set();

    function preloadImage(src) {
        if (!src || preloadedSet.has(src)) return;
        preloadedSet.add(src);

        const img = new Image();
        img.src = src;
    }

    function preloadNeighbors(index) {
        const neighbors = [index - 1, index + 1];
        neighbors.forEach(i => {
            const thumb = thumbs[i];
            if (!thumb) return;
            preloadImage(thumb.dataset.full);
            preloadImage(thumb.dataset.large);
        });
    }


    function scheduleBackgroundPreload(currentIndex) {
        const toLoad = [];
        thumbs.forEach((thumb, i) => {
            if (i === currentIndex || i === currentIndex - 1 || i === currentIndex + 1) return;
            const large = thumb.dataset.large;
            const full = thumb.dataset.full;
            if (large) toLoad.push(large);
            if (full) toLoad.push(full);
        });

        function loadNext(items, idx) {
            if (idx >= items.length) return;

            requestIdleCallback((deadline) => {
                let current = idx;
                while (current < items.length && deadline.timeRemaining() > 1) {
                    preloadImage(items[current]);
                    current++;
                }
                if (current < items.length) {
                    loadNext(items, current);
                }
            }, { timeout: 2000 });
        }

        loadNext(toLoad, 0);
    }


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

    function updateThumbArrows() {
        if (btnThumbPrev) btnThumbPrev.disabled = swiper.isBeginning;
        if (btnThumbNext) btnThumbNext.disabled = swiper.isEnd;
    }

    function isZoomOpen() {
        return !!zoomOverlay && zoomOverlay.classList.contains("is-open");
    }

    function updateZoomButtons() {
        if (!zoomInBtn || !zoomOutBtn) return;

        if (scale >= MAX_SCALE) {
            zoomInBtn.classList.add("at-limit");
            zoomInBtn.disabled = true;
        } else {
            zoomInBtn.classList.remove("at-limit");
            zoomInBtn.disabled = false;
        }

        if (scale <= MIN_SCALE) {
            zoomOutBtn.classList.add("at-limit");
            zoomOutBtn.disabled = true;
        } else {
            zoomOutBtn.classList.remove("at-limit");
            zoomOutBtn.disabled = false;
        }
    }

    function resetZoomTransform() {
        scale = 1;
        translateX = 0;
        translateY = 0;
        if (zoomImage) {
            zoomImage.style.transformOrigin = "center center";
            zoomImage.style.transform = `scale(1) translate(0px, 0px)`;
            zoomImage.style.cursor = "default";
        }
        updateZoomButtons();
    }

    function constrainTranslation() {
        if (!zoomImage || scale <= 1) {
            translateX = 0;
            translateY = 0;
            return;
        }

        const rect = zoomImage.getBoundingClientRect();
        const containerRect = zoomImage.parentElement.getBoundingClientRect();

        const scaledWidth = rect.width;
        const scaledHeight = rect.height;

        const maxTranslateX = Math.max(0, (scaledWidth - containerRect.width) / 2);
        const maxTranslateY = Math.max(0, (scaledHeight - containerRect.height) / 2);

        translateX = Math.max(-maxTranslateX, Math.min(maxTranslateX, translateX));
        translateY = Math.max(-maxTranslateY, Math.min(maxTranslateY, translateY));
    }

    function applyZoomTransform() {
        if (!zoomImage) return;

        constrainTranslation();

        zoomImage.style.transformOrigin = "center center";
        zoomImage.style.transform = `scale(${scale}) translate(${translateX / scale}px, ${translateY / scale}px)`;

        updateZoomButtons();
    }

    function openZoom() {
        if (!zoomOverlay || !zoomImage) return;
        const largeSrc = thumbs[activeIndex]?.dataset.large || mainImg.dataset.large || mainImg.src;
        zoomImage.src = largeSrc;
        zoomOverlay.classList.add("is-open");
        zoomOverlay.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        resetZoomTransform();
    }

    function closeZoom() {
        if (!zoomOverlay) return;
        zoomOverlay.classList.remove("is-open");
        zoomOverlay.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        resetZoomTransform();
    }

    function applyImage(index) {
        const prevIndex = activeIndex;
        activeIndex = index;

        const fullSrc = thumbs[index]?.dataset.full || thumbs[index]?.src;
        if (!fullSrc) return;

        mainImg.src = fullSrc;
        mainImg.dataset.large = thumbs[index]?.dataset.large || fullSrc;

        if (isZoomOpen() && zoomImage) {
            const largeSrc = thumbs[index]?.dataset.large || fullSrc;
            zoomImage.src = largeSrc;
            resetZoomTransform();
        }

        setActiveThumb(index);
        preloadNeighbors(index);

        const isLoopJump = (prevIndex === thumbs.length - 1 && index === 0) || (prevIndex === 0 && index === thumbs.length - 1);
        isLoopJump ? swiper.slideTo(index, 0, false) : swiper.slideTo(index, 300);

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

    function handleZoomWheel(e) {
        if (!isZoomOpen()) return;
        e.preventDefault();

        const delta = e.deltaY > 0 ? -0.3 : 0.3;
        const newScale = Math.min(Math.max(MIN_SCALE, scale + delta), MAX_SCALE);

        if (newScale === 1) {
            resetZoomTransform();
            return;
        }

        const rect = zoomImage.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const imgX = (x - centerX - translateX) / scale;
        const imgY = (y - centerY - translateY) / scale;

        scale = newScale;

        translateX = x - centerX - imgX * scale;
        translateY = y - centerY - imgY * scale;

        applyZoomTransform();
    }

    function handleZoomDragStart(e) {
        if (scale <= 1) return;

        isDraggingZoom = true;
        startDragX = (e.clientX || e.touches?.[0]?.clientX) - translateX;
        startDragY = (e.clientY || e.touches?.[0]?.clientY) - translateY;
        if (zoomImage) zoomImage.style.cursor = "grabbing";

        e.preventDefault();
    }

    function handleZoomDragMove(e) {
        if (!isDraggingZoom || scale <= 1) return;
        e.preventDefault();

        const clientX = e.clientX || e.touches?.[0]?.clientX;
        const clientY = e.clientY || e.touches?.[0]?.clientY;

        translateX = clientX - startDragX;
        translateY = clientY - startDragY;

        applyZoomTransform();
    }

    function handleZoomDragEnd(e) {
        if (!isDraggingZoom) return;

        isDraggingZoom = false;
        if (zoomImage && scale > 1) zoomImage.style.cursor = "grab";
    }

    function zoomIn() {
        if (scale >= MAX_SCALE) return;

        scale = Math.min(scale + 0.5, MAX_SCALE);
        applyZoomTransform();
    }

    function zoomOut() {
        if (scale <= MIN_SCALE) return;

        scale = Math.max(scale - 0.5, MIN_SCALE);
        if (scale === 1) {
            resetZoomTransform();
        } else {
            applyZoomTransform();
        }
    }

    // Main image events
    thumbs.forEach((thumb, i) => thumb.addEventListener("click", () => requestSwitch(i)));

    btnMainNext?.addEventListener("click", () => requestSwitch(activeIndex + 1));
    btnMainPrev?.addEventListener("click", () => requestSwitch(activeIndex - 1));

    btnThumbNext?.addEventListener("click", () => { swiper.slideNext(); updateThumbArrows(); });
    btnThumbPrev?.addEventListener("click", () => { swiper.slidePrev(); updateThumbArrows(); });

    zoomBtn?.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); openZoom(); });
    zoomClose?.addEventListener("click", closeZoom);

    zoomInBtn?.addEventListener("click", (e) => { e.stopPropagation(); zoomIn(); });
    zoomOutBtn?.addEventListener("click", (e) => { e.stopPropagation(); zoomOut(); });

    zoomOverlay?.addEventListener("click", (e) => {
        if (e.target === zoomOverlay || e.target.classList.contains('zoom-container')) {
            closeZoom();
        }
    });

    zoomNext?.addEventListener("click", (e) => { e.stopPropagation(); requestSwitch(activeIndex + 1); });
    zoomPrev?.addEventListener("click", (e) => { e.stopPropagation(); requestSwitch(activeIndex - 1); });

    // Zoom events
    if (zoomImage) {
        zoomImage.addEventListener("mousedown", handleZoomDragStart);
        zoomImage.addEventListener("mousemove", handleZoomDragMove);
        zoomImage.addEventListener("mouseup", handleZoomDragEnd);
        zoomImage.addEventListener("mouseleave", handleZoomDragEnd);

        zoomImage.addEventListener("wheel", handleZoomWheel, { passive: false });

        zoomImage.addEventListener("touchstart", handleZoomDragStart, { passive: false });
        zoomImage.addEventListener("touchmove", handleZoomDragMove, { passive: false });
        zoomImage.addEventListener("touchend", handleZoomDragEnd);

        zoomImage.addEventListener("load", () => {
            if (scale > 1) {
                applyZoomTransform();
            }
        });
    }

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
        if (!isZoomOpen()) return;

        switch (e.key) {
            case "Escape":
                closeZoom();
                break;
            case "ArrowRight":
                requestSwitch(activeIndex + 1);
                break;
            case "ArrowLeft":
                requestSwitch(activeIndex - 1);
                break;
            case "+":
            case "=":
                zoomIn();
                break;
            case "-":
            case "_":
                zoomOut();
                break;
        }
    });

    window.addEventListener("resize", () => {
        if (isZoomOpen() && scale > 1) {
            applyZoomTransform();
        }
    });

    // Main image swipe
    let startX = 0;
    let isDragging = false;
    const SWIPE_THRESHOLD = 40;

    function onPointerDown(e) {
        isDragging = true;
        startX = e.clientX ?? (e.touches?.[0]?.clientX ?? 0);
    }

    function onPointerUp(e) {
        if (!isDragging) return;
        isDragging = false;
        const endX = e.clientX ?? (e.changedTouches?.[0]?.clientX ?? 0);
        const dx = endX - startX;

        if (Math.abs(dx) < SWIPE_THRESHOLD) return;
        if (dx < 0) requestSwitch(activeIndex + 1);
        else requestSwitch(activeIndex - 1);
    }

    mainImg.addEventListener("mousedown", onPointerDown);
    mainImg.addEventListener("mouseup", onPointerUp);
    mainImg.addEventListener("touchstart", onPointerDown, { passive: true });
    mainImg.addEventListener("touchend", onPointerUp);

    applyImage(activeIndex);
    updateThumbArrows();
    scheduleBackgroundPreload(activeIndex);
})();