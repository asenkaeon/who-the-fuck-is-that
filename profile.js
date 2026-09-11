const galleryTrack = document.querySelector(".gallery-track");
const galleryDots = document.querySelectorAll(".gallery-dot");

const profileSheet = document.getElementById("profileSheet");
const sheetHandle = document.getElementById("sheetHandle");


// =========================
// PHOTO SWIPE
// =========================

galleryTrack.addEventListener("scroll", () => {

    const slideWidth = galleryTrack.offsetWidth;

    const currentSlide = Math.round(
        galleryTrack.scrollLeft / slideWidth
    );

    galleryDots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === currentSlide
        );

    });

});


// =========================
// BOTTOM SHEET
// =========================

let startY = 0;
let currentY = 0;
let isDragging = false;

const CLOSED_OFFSET = 0.72;
const SHEET_HEIGHT = () => profileSheet.offsetHeight;


// начало свайпа

sheetHandle.addEventListener("touchstart", (event) => {

    startY = event.touches[0].clientY;

    isDragging = true;

    profileSheet.style.transition = "none";

}, { passive: true });


// движение

sheetHandle.addEventListener("touchmove", (event) => {

    if (!isDragging) return;

    currentY = event.touches[0].clientY;

    const deltaY = currentY - startY;

    const sheetHeight = SHEET_HEIGHT();

    let currentOffset;

    if (profileSheet.classList.contains("open")) {

        currentOffset = Math.max(
            0,
            deltaY
        );

    } else {

        currentOffset = Math.max(
            sheetHeight - 86 + deltaY,
            0
        );

    }

    profileSheet.style.transform =
        `translateY(${currentOffset}px)`;

}, { passive: true });


// окончание свайпа

sheetHandle.addEventListener("touchend", () => {

    if (!isDragging) return;

    isDragging = false;

    const deltaY = currentY - startY;

    profileSheet.style.transition =
        "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)";


    // свайп вверх

    if (deltaY < -60) {

        profileSheet.classList.add("open");

        profileSheet.style.transform = "";

    }


    // свайп вниз

    else if (deltaY > 60) {

        profileSheet.classList.remove("open");

        profileSheet.style.transform = "";

    }


    // если движения почти не было

    else {

        profileSheet.style.transform = "";

    }

});