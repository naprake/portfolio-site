(() => {
    const container = document.getElementById("archiveMasonry");
    if (!container) return; // only run on archive.html

    // ───────── GitHub Repo Settings ─────────
    const username = "naprake";
    const repo = "portfolio-site";
    const folder = "assets/images/archive";
    // ─────────────────────────────────────────

    const apiURL = `https://api.github.com/repos/${username}/${repo}/contents/${folder}`;

    async function fetchImageList() {
        const res = await fetch(apiURL);
        if (!res.ok) {
            console.error("GitHub error", res.status);
            return [];
        }
        return res.json();
    }

    function cleanArchiveImageTitle(name) {
        return name
            .replace(/^Anakin de Wet - /i, "")   // remove prefix
            .replace(/\.[^/.]+$/, "")            // remove extension
            .replace(/[_]/g, " ")               // hyphens → spaces
            .replace(/\b\w/g, c => c.toUpperCase()); // capitalize
    }

    function createMasonryItem(src, title) {
        const item = document.createElement("div");
        item.className = "masonry-item";

        const link = document.createElement("a");
        link.href = "#"; // project link

        const img = document.createElement("img");
        img.src = src;
        img.alt = title;

        const h3 = document.createElement("h3");
        h3.textContent = title;

        link.appendChild(img);
        link.appendChild(h3);
        item.appendChild(link);

        return item;
    }

    async function initArchive() {
        const files = await fetchImageList();
        const images = files.filter(f =>
            f.type === "file" && /\.(jpg|jpeg|png|gif|webp)$/i.test(f.name)
        );

        images.forEach(file => {
            const title = cleanArchiveImageTitle(file.name);
            const item = createMasonryItem(file.download_url, title);
            container.appendChild(item);
        });
    }

    initArchive();
})();
