console.log("JS loaded");

        const burger = document.getElementById("burger");
        const mobileMenu = document.getElementById("mobileMenu");

        burger.addEventListener("click", () => {
            burger.classList.toggle("active");
            mobileMenu.classList.toggle("open");
        });

        /* ----------------------------------------------------------- */
        /* CROSS-BROWSER CENTER DETECTION (NO ROOT, NO THRESHOLD BUGS) */
        /* ----------------------------------------------------------- */

        function updateInView() {
            const centerX = window.innerWidth / 2;

            document.querySelectorAll(".image-container-landscape, .image-container-portrait").forEach(container => {
                const rect = container.getBoundingClientRect();
                const imageCenter = rect.left + rect.width / 2;

                const distance = Math.abs(centerX - imageCenter);

                // smaller distance = closer to center
                if (distance < rect.width * 0.5) {
                    container.classList.add("in-view");
                } else {
                    container.classList.remove("in-view");
                }
            });
        }

        document.querySelector(".scroll-container").addEventListener("scroll", updateInView);
        window.addEventListener("resize", updateInView);

        // Run once on load
        updateInView();



        /* ----------------------------------------------------------- */
        /* LIGHTBOX CLICK TO EXPAND IMAGE                              */
        /* ----------------------------------------------------------- */

        const lightbox = document.getElementById("lightbox");
        const lightboxImg = document.getElementById("lightbox-img");

        document.querySelectorAll(".scroll-container img").forEach(img => {
            img.addEventListener("click", () => {
                lightboxImg.src = img.src;
                lightbox.classList.add("open");
            });
        });

        // Close when clicking background
        lightbox.addEventListener("click", () => {
            lightbox.classList.remove("open");
        });

        /* ----------------------------------------------------------- */
        /* VERTICAL SCROLL → HORIZONTAL SCROLL FOR GALLERY             */
        /* ----------------------------------------------------------- */

        const scroller = document.querySelector(".scroll-container");

        scroller.addEventListener("wheel", (e) => {
            // Only activate if vertical scroll exists
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                e.preventDefault();
                scroller.scrollLeft += e.deltaY * 1.4;  // multiplier = speed
            }
        }, { passive: false });