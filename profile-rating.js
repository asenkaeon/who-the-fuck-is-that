const ratingSection = document.querySelector(".public-rating");

if (ratingSection) {

    const profileKey = ratingSection.dataset.profileKey;

    const form = document.getElementById("ratingForm");
    const voteButton = document.getElementById("ratingVoteButton");
    const message = document.getElementById("ratingMessage");

    const appearanceAverage = document.getElementById("appearanceAverage");
    const adequacyAverage = document.getElementById("adequacyAverage");
    const potentialAverage = document.getElementById("potentialAverage");
    const totalAverage = document.getElementById("totalAverage");
    const votesCount = document.getElementById("votesCount");

    const appearanceBar = document.getElementById("appearanceBar");
    const adequacyBar = document.getElementById("adequacyBar");
    const potentialBar = document.getElementById("potentialBar");


    // =========================
    // BROWSER ID
    // =========================

    function getBrowserId() {

        const storageKey = "wtfia_browser_id";

        let browserId = localStorage.getItem(storageKey);

        if (!browserId) {

            browserId = crypto.randomUUID();

            localStorage.setItem(
                storageKey,
                browserId
            );

        }

        return browserId;
    }


    // =========================
    // FORMAT
    // =========================

    function formatScore(value) {

        if (value === null || value === undefined) {
            return "—";
        }

        return Number(value).toFixed(1);
    }


    function pluralizeVotes(number) {

        if (number % 10 === 1 && number % 100 !== 11) {
            return "оценка";
        }

        if (
            number % 10 >= 2 &&
            number % 10 <= 4 &&
            (
                number % 100 < 10 ||
                number % 100 >= 20
            )
        ) {
            return "оценки";
        }

        return "оценок";
    }


    // =========================
    // LOAD RATINGS
    // =========================

    async function loadRatings() {

        const {
            data,
            error
        } = await wtfiaSupabase
            .from("ratings")
            .select("appearance, adequacy, potential")
            .eq("profile_key", profileKey);


        if (error) {

            console.error(
                "Ошибка загрузки рейтинга:",
                error
            );

            return;

        }


        const count = data.length;


        if (count === 0) {

            appearanceAverage.textContent = "—";
            adequacyAverage.textContent = "—";
            potentialAverage.textContent = "—";
            totalAverage.textContent = "—";

            votesCount.textContent = "0 оценок";

            appearanceBar.style.width = "0%";
            adequacyBar.style.width = "0%";
            potentialBar.style.width = "0%";

            return;

        }


        const appearance =
            data.reduce(
                (sum, item) =>
                    sum + Number(item.appearance),
                0
            ) / count;


        const adequacy =
            data.reduce(
                (sum, item) =>
                    sum + Number(item.adequacy),
                0
            ) / count;


        const potential =
            data.reduce(
                (sum, item) =>
                    sum + Number(item.potential),
                0
            ) / count;


        const total =
            (appearance + adequacy + potential) / 3;


        appearanceAverage.textContent =
            formatScore(appearance);

        adequacyAverage.textContent =
            formatScore(adequacy);

        potentialAverage.textContent =
            formatScore(potential);

        totalAverage.textContent =
            formatScore(total);


        votesCount.textContent =
            `${count} ${pluralizeVotes(count)}`;


        appearanceBar.style.width =
            `${appearance / 5 * 100}%`;

        adequacyBar.style.width =
            `${adequacy / 5 * 100}%`;

        potentialBar.style.width =
            `${potential / 5 * 100}%`;

    }


    // =========================
    // CHECK PREVIOUS VOTE
    // =========================

    function hasVoted() {

        return localStorage.getItem(
            `wtfia_voted_${profileKey}`
        ) === "true";

    }


    function showAlreadyVoted() {

        voteButton.style.display = "none";

        message.textContent =
            "Вы уже оценивали этого кадра";

        message.classList.add("visible");

        form.style.display = "none";

    }


    // =========================
    // OPEN FORM
    // =========================

    voteButton.addEventListener(
        "click",
        () => {

            form.classList.add("visible");

            voteButton.style.display = "none";

        }
    );


    // =========================
    // SUBMIT
    // =========================

    form.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const appearance =
                Number(
                    form.querySelector(
                        'input[name="appearance"]:checked'
                    )?.value
                );


            const adequacy =
                Number(
                    form.querySelector(
                        'input[name="adequacy"]:checked'
                    )?.value
                );


            const potential =
                Number(
                    form.querySelector(
                        'input[name="potential"]:checked'
                    )?.value
                );


            if (
                !appearance ||
                !adequacy ||
                !potential
            ) {

                message.textContent =
                    "Пожалуйста, оцени все три параметра";

                message.classList.add("visible");

                return;

            }


            const browserId = getBrowserId();


            const {
                error
            } = await wtfiaSupabase
                .from("ratings")
                .insert({

                    profile_key: profileKey,
                    browser_id: browserId,

                    appearance: appearance,
                    adequacy: adequacy,
                    potential: potential

                });


            if (error) {

                console.error(
                    "Ошибка отправки рейтинга:",
                    error
                );


                if (error.code === "23505") {

                    localStorage.setItem(
                        `wtfia_voted_${profileKey}`,
                        "true"
                    );

                    showAlreadyVoted();

                    return;

                }


                message.textContent =
                    "Что-то пошло не так. Попробуйте ещё раз.";

                message.classList.add("visible");

                return;

            }


            localStorage.setItem(
                `wtfia_voted_${profileKey}`,
                "true"
            );


            form.style.display = "none";


            message.textContent =
                "Спасибо за вклад в развитие аналитического отдела и принятие мною стратегических решений";

            message.classList.add("visible");


            await loadRatings();

        }
    );


    // =========================
    // START
    // =========================

    loadRatings();


    if (hasVoted()) {
        showAlreadyVoted();
    }

}