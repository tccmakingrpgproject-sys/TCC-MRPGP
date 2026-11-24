/* CHAVES DO LOCALSTORAGE */

const STORAGE_KEYS = {

    title:
        "mission_title",

    history:
        "mission_history",

    objectives:
        "mission_objectives",

    rewards:
        "mission_rewards"

};


/* CAMPOS */

const titleInput =
    document.getElementById("missionName");


const historyInput =
    document.getElementById("history");


const objectivesInput =
    document.getElementById("objectives");


const rewardsInput =
    document.getElementById("rewards");


/* CARREGAR DADOS SALVOS */

function loadData() {

    /* TÍTULO */

    const savedTitle =
        localStorage.getItem(
            STORAGE_KEYS.title
        );

    if (
        savedTitle !== null &&
        titleInput
    ) {

        titleInput.value =
            savedTitle;

    }


    /* HISTÓRIA */

    const savedHistory =
        localStorage.getItem(
            STORAGE_KEYS.history
        );

    if (
        savedHistory !== null &&
        historyInput
    ) {

        historyInput.value =
            savedHistory;

    }


    /* OBJETIVOS */

    const savedObjectives =
        localStorage.getItem(
            STORAGE_KEYS.objectives
        );

    if (
        savedObjectives !== null &&
        objectivesInput
    ) {

        objectivesInput.value =
            savedObjectives;

    }


    /* RECOMPENSAS */

    const savedRewards =
        localStorage.getItem(
            STORAGE_KEYS.rewards
        );

    if (
        savedRewards !== null &&
        rewardsInput
    ) {

        rewardsInput.value =
            savedRewards;

    }

}


/* SALVAR TÍTULO */

if (titleInput) {

    titleInput.addEventListener(
        "input",
        function () {

            localStorage.setItem(
                STORAGE_KEYS.title,
                titleInput.value
            );

        }
    );

}


/* SALVAR HISTÓRIA */

if (historyInput) {

    historyInput.addEventListener(
        "input",
        function () {

            localStorage.setItem(
                STORAGE_KEYS.history,
                historyInput.value
            );

        }
    );

}


/* SALVAR OBJETIVOS */

if (objectivesInput) {

    objectivesInput.addEventListener(
        "input",
        function () {

            localStorage.setItem(
                STORAGE_KEYS.objectives,
                objectivesInput.value
            );

        }
    );

}


/* SALVAR RECOMPENSAS */

if (rewardsInput) {

    rewardsInput.addEventListener(
        "input",
        function () {

            localStorage.setItem(
                STORAGE_KEYS.rewards,
                rewardsInput.value
            );

        }
    );

}


/* GARANTIA DE SALVAMENTO AO SAIR */

window.addEventListener(
    "beforeunload",
    function () {

        /* TÍTULO */

        if (titleInput) {

            localStorage.setItem(
                STORAGE_KEYS.title,
                titleInput.value
            );

        }


        /* HISTÓRIA */

        if (historyInput) {

            localStorage.setItem(
                STORAGE_KEYS.history,
                historyInput.value
            );

        }


        /* OBJETIVOS */

        if (objectivesInput) {

            localStorage.setItem(
                STORAGE_KEYS.objectives,
                objectivesInput.value
            );

        }


        /* RECOMPENSAS */

        if (rewardsInput) {

            localStorage.setItem(
                STORAGE_KEYS.rewards,
                rewardsInput.value
            );

        }

    }
);


/* INICIAR */

loadData();
