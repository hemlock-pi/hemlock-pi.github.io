/* ==========================================================================
   Sophia Pi — shared chrome
   The header and footer are defined once here and injected into every page,
   so navigation can never drift between pages again. Templates are inlined
   rather than fetched so the site also works when opened from the filesystem.
   ========================================================================== */

(function () {
    "use strict";

    var EMAIL = "sophiapi@engineering.upenn.edu";

    var LINKS = {
        scholar: "https://scholar.google.com/citations?user=sRitvmkAAAAJ&hl=en",
        linkedin: "https://www.linkedin.com/in/sophia-yixinyun-pi/",
        instagram: "https://www.instagram.com/literally.just.lines",
        blog: "https://metotheipi.wordpress.com"
    };

    var NAV = [
        { label: "Home", href: "index.html", match: "index.html" },
        { label: "Projects", href: "index.html#projects", match: "index.html" },
        { label: "Blog", href: "blog.html", match: "blog.html" },
        { label: "Art", href: "art.html", match: "art.html" },
        { label: "Personal", href: "personal.html", match: "personal.html" },
        { label: "Tutoring", href: "tutoring.html", match: "tutoring.html" },
        { label: "Contact", href: "contact.html", match: "contact.html" }
    ];

    /* Inline icons — a handful of 16px strokes, so the site carries no icon
       library. Keys match the names used in page markup. */
    var ICONS = {
        menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
        mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
        linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-11h4v1.5"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
        instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>',
        pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>'
    };

    var SCHOLAR_SVG =
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
        '<path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14z"/>' +
        '<path d="M12 0 0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5 12 0z"/></svg>';

    function icon(name, size) {
        return (
            '<svg width="' + (size || 16) + '" height="' + (size || 16) + '" viewBox="0 0 24 24" ' +
            'fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" ' +
            'stroke-linejoin="round" aria-hidden="true">' + ICONS[name] + "</svg>"
        );
    }

    /* Which nav entry, if any, corresponds to the page being viewed. */
    function currentPage() {
        var file = window.location.pathname.split("/").pop();
        return file === "" ? "index.html" : file;
    }

    function buildHeader() {
        var here = currentPage();
        var seen = {};

        var items = NAV.map(function (item) {
            /* Home and Projects both point at index.html; only mark the first. */
            var active = item.match === here && !seen[item.match];
            if (active) { seen[item.match] = true; }
            return (
                '<a href="' + item.href + '"' +
                (active ? ' aria-current="page"' : "") +
                ">" + item.label + "</a>"
            );
        }).join("");

        return (
            '<header class="site-header">' +
            '<div class="shell site-header__inner">' +
            '<a class="wordmark" href="index.html">Sophia Pi <span>(&pi;)</span></a>' +
            '<button class="nav-toggle" type="button" aria-expanded="false" ' +
            'aria-controls="site-nav" aria-label="Toggle navigation">' + icon("menu", 20) + "</button>" +
            '<nav class="site-nav" id="site-nav">' + items + "</nav>" +
            "</div></header>"
        );
    }

    function buildFooter() {
        return (
            '<footer class="site-footer">' +
            '<div class="shell site-footer__inner">' +
            '<div class="site-footer__links">' +
            '<a href="mailto:' + EMAIL + '" aria-label="Email">' + icon("mail", 20) + "</a>" +
            '<a href="' + LINKS.scholar + '" target="_blank" rel="noopener noreferrer" ' +
            'aria-label="Google Scholar">' + SCHOLAR_SVG + "</a>" +
            '<a href="' + LINKS.linkedin + '" target="_blank" rel="noopener noreferrer" ' +
            'aria-label="LinkedIn">' + icon("linkedin", 20) + "</a>" +
            '<a href="' + LINKS.instagram + '" target="_blank" rel="noopener noreferrer" ' +
            'aria-label="Instagram">' + icon("instagram", 20) + "</a>" +
            '<a href="' + LINKS.blog + '" target="_blank" rel="noopener noreferrer" ' +
            'aria-label="Blog">' + icon("pen", 20) + "</a>" +
            "</div>" +
            '<p class="site-footer__note">&copy; ' + new Date().getFullYear() + " Sophia Pi</p>" +
            "</div></footer>"
        );
    }

    function mount() {
        document.body.insertAdjacentHTML("afterbegin", buildHeader());
        document.body.insertAdjacentHTML("beforeend", buildFooter());

        var toggle = document.querySelector(".nav-toggle");
        var nav = document.getElementById("site-nav");
        if (!toggle || !nav) { return; }

        toggle.addEventListener("click", function () {
            var open = nav.getAttribute("data-open") === "true";
            nav.setAttribute("data-open", String(!open));
            toggle.setAttribute("aria-expanded", String(!open));
        });

        nav.addEventListener("click", function (event) {
            if (event.target.tagName === "A") {
                nav.setAttribute("data-open", "false");
                toggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", mount);
    } else {
        mount();
    }
})();
