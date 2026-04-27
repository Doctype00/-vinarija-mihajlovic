/* ─── NAVBAR ─────────────────────────────────── */
window.addEventListener('scroll', function () {
    var navbar = document.querySelector('nav');
    if (!navbar) return;
    if (window.scrollY > 0) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

/* ─── SIDEBAR ────────────────────────────────── */
function showSidebar() {
    var sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;
    sidebar.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function hideSidebar() {
    var sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;
    sidebar.style.display = 'none';
    document.body.style.overflow = '';
}

/* ─── GALLERY CAROUSEL ───────────────────────── */
var galleryContainer = document.querySelector('.gallery-container');
var galleryControlsContainer = document.querySelector('.gallery-controls');
var galleryControls = ['previous', 'next'];
var galleryItems = document.querySelectorAll('.gallery-item');

class Carousal {
    constructor(container, items, controls) {
        this.carousalContainer = container;
        this.carousalControls = controls;
        this.carousalArray = [...items];
    }

    updateGallery() {
        this.carousalArray.forEach(function (el) {
            el.classList.remove('gallery-item-1', 'gallery-item-2', 'gallery-item-3', 'gallery-item-4', 'gallery-item-5');
        });
        this.carousalArray.slice(0, 5).forEach(function (el, i) {
            el.classList.add('gallery-item-' + (i + 1));
        });
    }

    setCurrentState(direction) {
        if (direction.className === 'gallery-controls-previous') {
            this.carousalArray.unshift(this.carousalArray.pop());
        } else {
            this.carousalArray.push(this.carousalArray.shift());
        }
        this.updateGallery();
    }

    setControls() {
        this.carousalControls.forEach(function (control) {
            var button = document.createElement('button');
            button.className = 'gallery-controls-' + control;
            button.innerHTML = '';
            galleryControlsContainer.appendChild(button);
        });
    }

    useControl() {
        var self = this;
        var triggers = [...galleryControlsContainer.childNodes];
        triggers.forEach(function (control) {
            control.addEventListener('click', function (e) {
                e.preventDefault();
                self.setCurrentState(control);
            });
        });
    }
}

if (galleryContainer && galleryControlsContainer && galleryItems.length > 0) {
    var exampleCarousel = new Carousal(galleryContainer, galleryItems, galleryControls);
    exampleCarousel.setControls();
    exampleCarousel.useControl();
}

/* ─── WINE SECTION IN-VIEW ANIMATION ─────────── */
var wineSections = document.querySelectorAll('.wine-section');
if (wineSections.length > 0) {
    var wineObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            } else {
                entry.target.classList.remove('in-view');
            }
        });
    }, {
        /* Trigger when 45% of the section is visible —
           high enough to feel intentional, low enough to
           catch tall mobile sections mid-scroll             */
        threshold: 0.45
    });

    wineSections.forEach(function (section) {
        wineObserver.observe(section);
    });
}
