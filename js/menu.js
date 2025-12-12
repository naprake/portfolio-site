console.log("JS loaded");

(() => {
    const burger = document.getElementById("burger");
    const mobileMenu = document.getElementById("mobileMenu");

    burger?.addEventListener("click", () => {
        burger.classList.toggle("active");
        mobileMenu.classList.toggle("open");
    });
})();