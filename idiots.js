const searchInput = document.getElementById("searchInput");
const idiotsList = document.getElementById("idiotsList");

const sortButton = document.getElementById("sortButton");
const sortMenu = document.getElementById("sortMenu");

const sortButtons = sortMenu.querySelectorAll("button");

let currentSort = "default";


// =========================
// SEARCH
// =========================

searchInput.addEventListener("input", () => {

    const query = searchInput.value
        .toLowerCase()
        .trim();

    const idiots = idiotsList.querySelectorAll(".idiot-item");

    let visibleCount = 0;

    idiots.forEach((idiot) => {

        const name = idiot.dataset.name.toLowerCase();

        const tag = idiot
            .querySelector(".idiot-tag")
            .textContent
            .toLowerCase();

        if (
            name.includes(query) ||
            tag.includes(query)
        ) {
            idiot.style.display = "flex";
            visibleCount++;
        } else {
            idiot.style.display = "none";
        }

    });


    let emptyMessage = idiotsList.querySelector(".empty-message");

    if (visibleCount === 0) {

        if (!emptyMessage) {

            emptyMessage = document.createElement("div");

            emptyMessage.className = "empty-message";

            emptyMessage.textContent =
                "Никого подходящего не найдено. Повезло.";

            idiotsList.appendChild(emptyMessage);
        }

    } else {

        if (emptyMessage) {
            emptyMessage.remove();
        }

    }

});


// =========================
// SORT MENU
// =========================

sortButton.addEventListener("click", () => {

    sortMenu.classList.toggle("active");

});


// =========================
// SORTING
// =========================

sortButtons.forEach((button) => {

    button.addEventListener("click", () => {

        currentSort = button.dataset.sort;

        sortButton.innerHTML =
            `Сортировка: <span>${button.textContent}</span>`;

        sortMenu.classList.remove("active");

        sortIdiots(currentSort);

    });

});


function sortIdiots(type) {

    const idiots = Array.from(
        idiotsList.querySelectorAll(".idiot-item")
    );

    idiots.sort((a, b) => {

        if (type === "rating") {

            return (
                Number(b.dataset.rating) -
                Number(a.dataset.rating)
            );

        }


        if (type === "significance") {

            return (
                Number(b.dataset.significance) -
                Number(a.dataset.significance)
            );

        }


        if (type === "new") {

            return (
                new Date(b.dataset.date) -
                new Date(a.dataset.date)
            );

        }


        if (type === "old") {

            return (
                new Date(a.dataset.date) -
                new Date(b.dataset.date)
            );

        }


        return 0;

    });


    idiots.forEach((idiot) => {
        idiotsList.appendChild(idiot);
    });

}