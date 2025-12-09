console.log("JS loaded");

/* =======================================================================
   MOBILE MENU (unchanged)
   Keeps burger/menu functionality isolated and safe
======================================================================= */
(() => {
    const burger = document.getElementById("burger");
    const mobileMenu = document.getElementById("mobileMenu");

    burger?.addEventListener("click", () => {
        burger.classList.toggle("active");
        mobileMenu.classList.toggle("open");
    });
})();