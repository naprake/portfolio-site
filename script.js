console.log("JS loaded");

/* =======================================================================
   MOBILE MENU
======================================================================= */
(() => {
    const burger = document.getElementById("burger");
    const mobileMenu = document.getElementById("mobileMenu");

    burger?.addEventListener("click", () => {
        burger.classList.toggle("active");
        mobileMenu.classList.toggle("open");
    });
})();


/* =======================================================================
   CROSS-BROWSER CENTER DETECTION
======================================================================= */
(() => {
    const containers = document.querySelectorAll(
        ".image-container-landscape, .image-container-portrait"
    );
    const scroller = document.querySelector(".scroll-container");

    if (!scroller || containers.length === 0) return;

    const updateInView = () => {
        const centerX = window.innerWidth / 2;

        containers.forEach(container => {
            const rect = container.getBoundingClientRect();
            const imageCenter = rect.left + rect.width / 2;
            const distance = Math.abs(centerX - imageCenter);

            container.classList.toggle("in-view", distance < rect.width * 0.5);
        });
    };

    scroller.addEventListener("scroll", updateInView);
    window.addEventListener("resize", updateInView);
    updateInView(); // initialize
})();


/* =======================================================================
   LIGHTBOX
======================================================================= */
(() => {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const thumbnails = document.querySelectorAll(".scroll-container img");

    if (!lightbox || !lightboxImg || thumbnails.length === 0) return;

    thumbnails.forEach(img => {
        img.addEventListener("click", () => {
            lightboxImg.src = img.src;
            lightbox.classList.add("open");
        });
    });

    lightbox.addEventListener("click", () => {
        lightbox.classList.remove("open");
    });
})();


/* =======================================================================
   VERTICAL SCROLL → HORIZONTAL SCROLL
======================================================================= */
(() => {
    const scroller = document.querySelector(".scroll-container");
    if (!scroller) return;

    scroller.addEventListener("wheel", (e) => {
        // Only redirect if this was a vertical scroll gesture
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            e.preventDefault();
            scroller.scrollLeft += e.deltaY * 1.4; // adjust speed multiplier
        }
    }, { passive: false });
})();


