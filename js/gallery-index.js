console.log("JS loaded");

/* =======================================================================
   AUTO-LOAD IMAGES FROM GITHUB + THEN INITIALIZE GALLERY FEATURES
   - Replace username & repo below
======================================================================= */
(() => {
    const gallery = document.getElementById("dynamicGallery") || document.querySelector(".scroll-container");
    if (!gallery) return console.warn("Gallery container not found (id: dynamicGallery or .scroll-container)");

    // ───────── CHANGE THESE ─────────
    const username = "naprake";
    const repo = "portfolio-site";
    const folder = "assets/images/gallery";
    // ─────────────────────────────────

    const apiURL = `https://api.github.com/repos/${username}/${repo}/contents/${folder}`;

    async function fetchImageList() {
        const res = await fetch(apiURL);
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
        return res.json();
    }

    // create image element and return a load promise
    function createImageElement(file) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = file.download_url;
            img.alt = file.name.replace(/\.[^/.]+$/, "");

            img.addEventListener("load", () => resolve(img));
            img.addEventListener("error", (e) => reject(e));
        });
    }

    async function loadAllImages() {
        try {
            const files = await fetchImageList();
            const imageFiles = files.filter(f => f.type === "file" && /\.(jpg|jpeg|png|gif|webp)$/i.test(f.name));

            // Create image promises
            const imagePromises = imageFiles.map(f => createImageElement(f).then(img => ({ img, name: f.name })));

            const loaded = await Promise.allSettled(imagePromises);

            // append successful images in the original API order
            loaded.forEach(result => {
                if (result.status === "fulfilled") {
                    const { img } = result.value;

                    // classify portrait/landscape
                    const wrapper = document.createElement("div");
                    wrapper.className = img.naturalHeight > img.naturalWidth
                        ? "image-container-portrait"
                        : "image-container-landscape";

                    wrapper.appendChild(img);
                    gallery.appendChild(wrapper);
                } else {
                    console.warn("Failed to load image:", result.reason);
                }
            });

            // After images are appended, initialize features that rely on images
            initializeGalleryFeatures();

        } catch (err) {
            console.error("Error loading gallery images:", err);
            // fallback: still initialize features in case some static images exist
            initializeGalleryFeatures();
        }
    }

    // Start loading
    loadAllImages();
})();


/* =======================================================================
   GALLERY FEATURES
   - center detection (in-view zoom)
   - lightbox (delegated)
   - vertical -> horizontal wheel
======================================================================= */
function initializeGalleryFeatures() {
    /* -----------------------------
       Center detection (in-view)
       Uses live querying of containers so it works after dynamic load
       ----------------------------- */
    const scroller = document.querySelector(".scroll-container");
    if (!scroller) {
        console.warn("No .scroll-container for gallery features");
        return;
    }

    function updateInView() {
        const containers = document.querySelectorAll(".image-container-landscape, .image-container-portrait");
        const centerX = window.innerWidth / 2;

        containers.forEach(container => {
            const img = container.querySelector("img") || container;
            const rect = img.getBoundingClientRect();
            const imageCenter = rect.left + rect.width / 2;
            const distance = Math.abs(centerX - imageCenter);

            // Adjustable trigger — 0.5 = half the image width
            const trigger = rect.width * 0.5;
            container.classList.toggle("in-view", distance < trigger);
        });
    }

    // Efficient event binding (throttle using requestAnimationFrame)
    let rafId = null;
    scroller.addEventListener("scroll", () => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => { updateInView(); rafId = null; });
    });

    window.addEventListener("resize", () => {
        updateInView();
    });

    // Run once to set initial state
    updateInView();

    /* -----------------------------
       Lightbox (event delegation)
       - clicking an image opens the lightbox
       - clicking background closes it
       - clicking the image itself won't close (stopPropagation)
       ----------------------------- */
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    if (lightbox && lightboxImg) {
        // Delegated click on images inside scroller
        scroller.addEventListener("click", (e) => {
            const target = e.target;
            if (target && target.tagName === "IMG") {
                // open lightbox
                lightboxImg.src = target.src;
                lightbox.classList.add("open");
            }
        });

        // Close when clicking background (but not when clicking the image)
        lightbox.addEventListener("click", (e) => {
            // If clicked directly on the image, ignore
            if (e.target === lightboxImg) return;
            lightbox.classList.remove("open");
        });
    } else {
        console.warn("Lightbox elements not found; skipping lightbox setup.");
    }

    /* -----------------------------
       Vertical scroll -> horizontal
       ----------------------------- */
    scroller.addEventListener("wheel", (e) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            e.preventDefault();
            scroller.scrollLeft += e.deltaY * 1.4;
        }
    }, { passive: false });

    /* -----------------------------
       Re-run updateInView after images have settled
       - useful for layout stabilization after append
       ----------------------------- */
    // small timeout to ensure layout painted
    setTimeout(updateInView, 60);
    // also run one more time a bit later for safety
    setTimeout(updateInView, 500);
}
