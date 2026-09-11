const people = {
    ivan: {
        name: "Иван Привалов",
        radar: [5, 5, 1.5, 4.5],
        incomeMin: 300000,
        incomeMax: 300000,
        incomeLabel: "300 000 ₽",
        attitude: 4.2,
        sex: 5,
        charisma: 4.8,
        potential: 4.5,
        idiot: 1.5
    },

    matvey: {
        name: "Матвей Поляков",
        radar: [5, 4.8, 5, 5],
        incomeMin: 100000,
        incomeMax: 100000,
        incomeLabel: "100 000 ₽",
        attitude: 4.3,
        sex: null,
        charisma: 3.8,
        potential: 3,
        idiot: 3
    },

    alexey: {
        name: "Алексей Алябьев",
        radar: [4, 2, 5, 5],
        incomeMin: 0,
        incomeMax: 0,
        incomeLabel: "Не зарабатывает",
        attitude: 3,
        sex: null,
        charisma: 1.5,
        potential: 1.5,
        idiot: 4.5
    },

    dmitry: {
        name: "Дмитрий Шацкий",
        radar: [4, 4, 5, 4.5],
        incomeMin: 0,
        incomeMax: 0,
        incomeLabel: "Не зарабатывает",
        attitude: 4,
        sex: 4,
        charisma: 4.5,
        potential: 1.8,
        idiot: 4.2
    },

    "denis-smirnov": {
        name: "Денис Смирнов",
        radar: null,
        incomeMin: 200000,
        incomeMax: 200000,
        incomeLabel: "200 000 ₽",
        attitude: 4,
        sex: null,
        charisma: 5,
        potential: 3.2,
        idiot: 2.8
    },

    oleg: {
        name: "Олег Мелин",
        radar: [5, 3, 5, 4],
        incomeMin: 150000,
        incomeMax: 150000,
        incomeLabel: "150 000 ₽",
        attitude: 3.5,
        sex: 2.5,
        charisma: 4,
        potential: 1.7,
        idiot: 4.3
    },

    andrey: {
        name: "Андрей Федоров",
        radar: null,
        incomeMin: 0,
        incomeMax: 0,
        incomeLabel: "Не зарабатывает",
        attitude: 3,
        sex: null,
        charisma: 1,
        potential: 1.4,
        idiot: 4.6
    },

    nikita: {
        name: "Никита Горынкин",
        radar: [2.5, 1, 5, 4],
        incomeMin: 80000,
        incomeMax: 80000,
        incomeLabel: "80 000 ₽",
        attitude: 2,
        sex: 4.3,
        charisma: 4,
        potential: 1.8,
        idiot: 4.2
    },

    roman: {
        name: "Роман Беликов",
        radar: null,
        incomeMin: 130000,
        incomeMax: 130000,
        incomeLabel: "130 000 ₽",
        attitude: 3,
        sex: null,
        charisma: 5,
        potential: 2.8,
        idiot: 3
    },

    "denis-selivanov": {
        name: "Денис Селиванов",
        radar: [5, 5, 3, 4.5],
        incomeMin: 200000,
        incomeMax: 200000,
        incomeLabel: "200 000 ₽",
        attitude: 5,
        sex: null,
        charisma: 5,
        potential: 4.1,
        idiot: 1.5
    },

    gleb: {
        name: "Глеб Гудков",
        radar: null,
        incomeMin: 40000,
        incomeMax: 40000,
        incomeLabel: "40 000 ₽",
        attitude: 2.5,
        sex: 3,
        charisma: 2,
        potential: 2,
        idiot: 4
    },

    vyacheslav: {
        name: "Вячеслав Романов",
        radar: null,
        incomeMin: 100000,
        incomeMax: 150000,
        incomeLabel: "100 000–150 000 ₽",
        attitude: 3,
        sex: null,
        charisma: 4,
        potential: 2.5,
        idiot: 3.5
    }
};


/* =========================
   РАДАР
========================= */

const radarCanvas = document.getElementById("radarChart");
const radarCtx = radarCanvas.getContext("2d");

const radarLabels = [
    "АДЕКВАТНОСТЬ",
    "НАДЁЖНОСТЬ",
    "ИНИЦИАТИВНОСТЬ",
    "ЭМОЦИОНАЛЬНАЯ\nВОВЛЕЧЁННОСТЬ"
];

const radarSelect = document.getElementById("radarPerson");


function drawRadar(personKey) {

    const person = people[personKey];

    if (!person || !person.radar) return;

    const width = radarCanvas.parentElement.clientWidth;
    const height = radarCanvas.parentElement.clientHeight;

    const dpr = window.devicePixelRatio || 1;

    radarCanvas.width = width * dpr;
    radarCanvas.height = height * dpr;

    radarCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

    radarCtx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;

    const radius = Math.min(width, height) * 0.31;

    const count = radarLabels.length;
    const angleStep = (Math.PI * 2) / count;
    const startAngle = -Math.PI / 2;


    /* СЕТКА */

    for (let level = 1; level <= 5; level++) {

        const levelRadius = radius * (level / 5);

        radarCtx.beginPath();

        for (let i = 0; i < count; i++) {

            const angle = startAngle + angleStep * i;

            const x =
                centerX +
                Math.cos(angle) * levelRadius;

            const y =
                centerY +
                Math.sin(angle) * levelRadius;

            if (i === 0) {
                radarCtx.moveTo(x, y);
            } else {
                radarCtx.lineTo(x, y);
            }
        }

        radarCtx.closePath();

        radarCtx.strokeStyle = "rgba(10, 10, 10, 0.13)";
        radarCtx.lineWidth = 1;

        radarCtx.stroke();
    }


    /* ОСИ */

    for (let i = 0; i < count; i++) {

        const angle = startAngle + angleStep * i;

        const x =
            centerX +
            Math.cos(angle) * radius;

        const y =
            centerY +
            Math.sin(angle) * radius;

        radarCtx.beginPath();
        radarCtx.moveTo(centerX, centerY);
        radarCtx.lineTo(x, y);

        radarCtx.strokeStyle = "rgba(10, 10, 10, 0.13)";
        radarCtx.lineWidth = 1;

        radarCtx.stroke();
    }


    /* ЗНАЧЕНИЯ */

    radarCtx.beginPath();

    person.radar.forEach((value, i) => {

        const angle = startAngle + angleStep * i;
        const valueRadius = radius * (value / 5);

        const x =
            centerX +
            Math.cos(angle) * valueRadius;

        const y =
            centerY +
            Math.sin(angle) * valueRadius;

        if (i === 0) {
            radarCtx.moveTo(x, y);
        } else {
            radarCtx.lineTo(x, y);
        }
    });

    radarCtx.closePath();

    radarCtx.fillStyle = "rgba(78, 0, 1, 0.15)";
    radarCtx.fill();

    radarCtx.strokeStyle = "#4E0001";
    radarCtx.lineWidth = 2;
    radarCtx.stroke();


    /* ТОЧКИ */

    person.radar.forEach((value, i) => {

        const angle = startAngle + angleStep * i;
        const valueRadius = radius * (value / 5);

        const x =
            centerX +
            Math.cos(angle) * valueRadius;

        const y =
            centerY +
            Math.sin(angle) * valueRadius;

        radarCtx.beginPath();
        radarCtx.arc(x, y, 4, 0, Math.PI * 2);

        radarCtx.fillStyle = "#4E0001";
        radarCtx.fill();
    });


    /* ПОДПИСИ */

    radarCtx.fillStyle = "#0a0a0a";
    radarCtx.font = "800 8px Arial";
    radarCtx.textAlign = "center";
    radarCtx.textBaseline = "middle";

    radarLabels.forEach((label, i) => {

        const angle = startAngle + angleStep * i;

        const labelRadius = radius + 30;

        const x =
            centerX +
            Math.cos(angle) * labelRadius;

        const y =
            centerY +
            Math.sin(angle) * labelRadius;

        const lines = label.split("\n");

        lines.forEach((line, lineIndex) => {

            radarCtx.fillText(
                line,
                x,
                y + (lineIndex - (lines.length - 1) / 2) * 10
            );
        });
    });


    /* ЦЕНТРАЛЬНОЕ ЗНАЧЕНИЕ */

    const average =
        person.radar.reduce((sum, value) => sum + value, 0)
        / person.radar.length;

    radarCtx.fillStyle = "#4E0001";
    radarCtx.font = "900 20px Arial";
    radarCtx.textAlign = "center";
    radarCtx.textBaseline = "middle";

    radarCtx.fillText(
        average.toFixed(1),
        centerX,
        centerY
    );
}


radarSelect.addEventListener("change", () => {
    drawRadar(radarSelect.value);
});


/* =========================
   СРАВНИТЕЛЬНЫЙ ГРАФИК
========================= */

const comparisonCanvas =
    document.getElementById("comparisonChart");

const comparisonCtx =
    comparisonCanvas.getContext("2d");

const comparisonSelect =
    document.getElementById("comparisonParameter");

const peopleOrder = [
    "ivan",
    "matvey",
    "alexey",
    "dmitry",
    "denis-smirnov",
    "oleg",
    "andrey",
    "nikita",
    "roman",
    "denis-selivanov",
    "gleb",
    "vyacheslav"
];

function normalizeIncome(person) {
    if (
        person.incomeMin === null ||
        person.incomeMax === null
    ) {
        return null;
    }

    const average =
        (person.incomeMin + person.incomeMax) / 2;

    return Math.min(
        5,
        (average / 300000) * 5
    );
}

const comparisonParameters = {
    income: {
        label: "ЗАРАБОТОК",
        getValue: normalizeIncome,
        max: 5
    },

    attitude: {
        label: "ОТНОШЕНИЕ КО МНЕ",
        getValue: person => person.attitude,
        max: 5
    },

    sex: {
        label: "СЕКС",
        getValue: person => person.sex,
        max: 5
    },

    charisma: {
        label: "ХАРИЗМА",
        getValue: person => person.charisma,
        max: 5
    },

    potential: {
        label: "ПОТЕНЦИАЛ",
        getValue: person => person.potential,
        max: 5
    },

    idiot: {
        label: "УРОВЕНЬ ДЕБИЛИЗМА",
        getValue: person => person.idiot,
        max: 5
    }
};

function drawComparison() {
    const parameterKey = comparisonSelect.value;
    const parameter =
        comparisonParameters[parameterKey];

    const width =
        comparisonCanvas.parentElement.clientWidth;

    const height =
        comparisonCanvas.parentElement.clientHeight;

    const dpr =
        window.devicePixelRatio || 1;

    comparisonCanvas.width = width * dpr;
    comparisonCanvas.height = height * dpr;

    comparisonCtx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

    comparisonCtx.clearRect(
        0,
        0,
        width,
        height
    );

    const left = 112;
    const right = 18;
    const top = 20;
    const bottom = 18;

    const chartWidth =
        width - left - right;

    const rowHeight =
        (height - top - bottom) /
        peopleOrder.length;

    /* СЕТКА */

    for (let level = 0; level <= 5; level++) {
        const x =
            left +
            chartWidth *
            (level / 5);

        comparisonCtx.beginPath();

        comparisonCtx.moveTo(
            x,
            top
        );

        comparisonCtx.lineTo(
            x,
            height - bottom
        );

        comparisonCtx.strokeStyle =
            "rgba(10, 10, 10, 0.10)";

        comparisonCtx.lineWidth = 1;

        comparisonCtx.stroke();

        comparisonCtx.fillStyle =
            "#77716f";

        comparisonCtx.font =
            "700 7px Arial";

        comparisonCtx.textAlign =
            "center";

        comparisonCtx.textBaseline =
            "bottom";

        comparisonCtx.fillText(
            level,
            x,
            top - 5
        );
    }

    /* СТРОКИ */

    peopleOrder.forEach((key, index) => {
        const person = people[key];

        const value =
            parameter.getValue(person);

        const centerY =
            top +
            rowHeight * index +
            rowHeight / 2;

        /* ИМЯ */

        comparisonCtx.fillStyle =
            "#0a0a0a";

        comparisonCtx.font =
            "800 8px Arial";

        comparisonCtx.textAlign =
            "right";

        comparisonCtx.textBaseline =
            "middle";

        comparisonCtx.fillText(
            person.name.toUpperCase(),
            left - 10,
            centerY
        );

        /* ЕСЛИ ДАННЫХ НЕТ */

        if (value === null) {
            comparisonCtx.fillStyle =
                "#aaa5a3";

            comparisonCtx.font =
                "700 7px Arial";

            comparisonCtx.textAlign =
                "left";

            comparisonCtx.fillText(
                "НЕТ ДАННЫХ",
                left + 6,
                centerY
            );

            return;
        }

        /* ФОНОВАЯ ЛИНИЯ */

        comparisonCtx.beginPath();

        comparisonCtx.moveTo(
            left,
            centerY
        );

        comparisonCtx.lineTo(
            left + chartWidth,
            centerY
        );

        comparisonCtx.strokeStyle =
            "rgba(10, 10, 10, 0.08)";

        comparisonCtx.lineWidth = 4;

        comparisonCtx.stroke();

        /* ЗНАЧЕНИЕ */

        const valueWidth =
            chartWidth *
            (value / parameter.max);

        comparisonCtx.beginPath();

        comparisonCtx.moveTo(
            left,
            centerY
        );

        comparisonCtx.lineTo(
            left + valueWidth,
            centerY
        );

        comparisonCtx.strokeStyle =
            "#4E0001";

        comparisonCtx.lineWidth = 5;

        comparisonCtx.lineCap =
            "round";

        comparisonCtx.stroke();

        /* ТОЧКА */

        comparisonCtx.beginPath();

        comparisonCtx.arc(
            left + valueWidth,
            centerY,
            4,
            0,
            Math.PI * 2
        );

        comparisonCtx.fillStyle =
            "#4E0001";

        comparisonCtx.fill();

        /* ЧИСЛО */

        comparisonCtx.fillStyle =
            "#4E0001";

        comparisonCtx.font =
            "900 8px Arial";

        comparisonCtx.textAlign =
            "left";

        comparisonCtx.textBaseline =
            "middle";

        comparisonCtx.fillText(
            value.toFixed(1),
            Math.min(
                left + valueWidth + 7,
                width - 20
            ),
            centerY
        );
    });

    /* ПОДПИСЬ ПАРАМЕТРА */

    comparisonCtx.fillStyle =
        "#77716f";

    comparisonCtx.font =
        "800 7px Arial";

    comparisonCtx.textAlign =
        "left";

    comparisonCtx.textBaseline =
        "top";

    comparisonCtx.fillText(
        `ШКАЛА: 0–5 · ${parameter.label}`,
        left,
        height - 8
    );
}

comparisonSelect.addEventListener(
    "change",
    drawComparison
);


/* =========================
   ЗАПУСК
========================= */

drawRadar("ivan");
drawComparison();


window.addEventListener("resize", () => {
    drawRadar(radarSelect.value);
    drawComparison();
});