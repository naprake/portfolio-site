const projectData = [
    {
        title: "FRAUEN FORMEN FEMINISMUS",
        type: "Typography Design, Base Year, HAW Hamburg",
        date: "2026",
        shortdescription: "Brochure of Feminist and Antidiscriminatory Literature",
        longdescription: "The task for this project was to create a brochure with at least two different feminist and/or anti-discriminatory texts, either chosen from options presented by Lisa Marie Fechteler and Saskia Kühne­mund or picked by yourself.<br><br>In the process of making this brochure, I decided to play with bold shapes and placement. My focus was on making the pages look interesting but still be very readable.",
        thumbnail: "FFF_Thumbnail.avif",
        gallery: [
            "FFF1.avif",
            "FFF2.avif",
            "FFF3.avif",
            "FFF4.avif",
            "FFF5.avif",
            "FFF6.avif"
        ],
        folder: "featured-projects/frauen-formen-feminismus"
    },
    {
        title: "PÂVOIA",
        type: "Graphic Design Work, Client",
        date: "2026",
        shortdescription: "Selected Work For the Pâvoia Festival",
        longdescription: "",
        thumbnail: "Pavoia_Thumbnail.avif",
        gallery: [
            "pavoia1.avif",
            "pavoia2.avif",
            "pavoia4.avif"
        ],
        folder: "featured-projects/pavoia"
    },
    {
        title: "ZEPHR",
        type: "Brand Design, Base Year, HAW Hamburg",
        date: "2025",
        shortdescription: "Coffee Brand Identity And Packaging",
        longdescription: "Zephr Coffee is the result of a Brand Design base course task. The goal was to create a new coffee brand identity from scratch.<br><br>Zephr is focused towards outdoorsy and adventurous people. It is supposed to portray movement and freshness.<br><br>The ›Zephr‹ stems from the Greek god of the west wind, ›Zephyr‹.",
        thumbnail: "Zephr_Thumbnail.avif",
        gallery: [
            "zephr7.jpg",
            "zephr8.jpg",
            "zephr6.avif",
            "zephr9.jpg",
            "zephr10.jpg"
        ],
        folder: "featured-projects/zephr"
    },
    {
        title: "XANNY",
        type: "Editorial Design, Base Year, HAW Hamburg",
        date: "2026",
        shortdescription: "Small Booklet for the song ›xanny‹ by Billie Eilish",
        longdescription: "",
        thumbnail: "Xanny_Thumbnail.avif",
        gallery: [
            "what1.avif",
            "what2.avif",
            "what3.avif",
            "what4.avif",
            "what5.avif"
        ],
        folder: "featured-projects/what-is-it-about-them"
    },
    {
        title: "IGNIT",
        type: "Interaction Design, Base Year, HAW Hamburg",
        date: "2025",
        shortdescription: "Ignit is a Visual Concept for an App",
        longdescription: "",
        thumbnail: "Ignit_Thumbnail.avif",
        gallery: [
            "ignit11.avif",
            "ignit1.avif",
            "ignit3.avif",
            "ignit4.avif",
            "ignit5.avif",
            "ignit6.avif",
            "ignit7.avif",
            "ignit9.avif"
        ],
        folder: "featured-projects/ignit"
    },
    {
        title: "SPEKTRUM",
        type: "Brand Design, 3rd Semester, HAW Hamburg",
        date: "2026",
        shortdescription: "A speculative visual identity concept for SPEKTRUM Festival",
        longdescription: "",
        thumbnail: "Spektrum_Thumbnail.png",
        gallery: [
            "spektrum2.png",
            "spektrum3.png",
            "spektrum4.png"
        ],
        folder: "featured-projects/spektrum"
    }
];

const projectContainer = document.getElementById('projectlist');

projectData.map(function(item) {

    let projectarticle = document.createElement('article');
    projectarticle.className = "project";

    const galleryMarkup = item.gallery.map(img => {
        return `<div><img loading="lazy" class="animation-slideInTop" src="${item.folder}/${img}" alt="Project Image"></div>`;
    }).join('');

    const markup = `
            <div class="project-items">
                <div class="project-details open-close">
                    <div class="project-details-title-wrapper">
                        <a class="project-details-title animation-slideInTop" tabindex="0">
                            <h2>${item.title}</h2>
                        </a>
                        <div class="button topbutton animation-slideInTop">
                            <a class="button-more" tabindex="0">+ EXPAND</a>
                            <a class="button-less" tabindex="0">- CLOSE</a>
                        </div>
                    </div>
                    <div class="project-details-text animation-slideInTop">
                        <ul>
                            <li class="text-left"><p>Description</p></li>
                            <li class="text-right"><p>${item.shortdescription}</p></li>
                        </ul>
                        <ul>
                            <li class="text-left"><p>Project Type</p></li>
                            <li class="text-right"><p>${item.type}</p></li>
                        </ul>
                        <ul>
                            <li class="text-left"><p>Date</p></li>
                            <li class="text-right"><p>${item.date}</p></li>
                        </ul>
                    </div>
                    <div class"project-details-image open-close"">
                        <img class="animation-slideInTop no-lightbox" src="featured-projects/thumbnails/${item.thumbnail}" alt="Project Thumbnail">
                    </div>
                </div>
            </div>
            <section class="project-expand">
                <p>${item.longdescription}</p>
                <div class="project-gallery">
                    ${galleryMarkup}
                </div>
                <div class="button bottombutton animation-slideInTop open-close">
                    <a class="button-more" tabindex="0">+ EXPAND</a>
                    <a class="button-less" tabindex="0">- CLOSE</a>
                </div>
            </section>
    `;

    projectarticle.innerHTML = markup;
    projectContainer.append(projectarticle);

});







const seeMore = document.querySelectorAll('.open-close');

seeMore.forEach(function(item) {
    item.addEventListener('click', function(e) {
        const parent = e.currentTarget.parentElement.parentElement;
        parent.classList.toggle('show-more');

        if (parent.classList.contains('show-more')) {
            this.parentElement.parentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    })
});







const scroller = document.querySelector(".projects");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

if (lightbox && lightboxImg) {
    scroller.addEventListener("click", (e) => {
        const target = e.target;
        if (target && target.tagName === "IMG" && !target.classList.contains("no-lightbox")) {
            lightboxImg.src = target.src;
            lightbox.classList.add("open");
        }
    });

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightboxImg) return;
        lightbox.classList.remove("open");
    });
} else {
    console.warn("Lightbox elements not found; skipping lightbox setup.");
}







const lenis = new Lenis({
  autoRaf: true,
});