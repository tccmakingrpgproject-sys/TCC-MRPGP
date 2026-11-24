/* DADOS CRIADOS PELO USUÁRIO */

function readStorage(key) {

    try {

        const data = JSON.parse(localStorage.getItem(key));

        return Array.isArray(data) ? data : [];

    } catch {

        return [];

    }

}


function esc(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

}


function getNpcDatabase() {

    return readStorage("fichasRPG")
        .filter(function (ficha) {

            return ficha &&
                   ficha.id &&
                   ficha.tipo === "npc";

        })
        .map(function (ficha) {

            return {
                id: String(ficha.id),
                nome: esc(ficha.nome || "NPC sem nome"),
                classe: esc(ficha.classe || ""),
                imagem: esc(ficha.imagem || ""),
                descricao: esc(ficha.descricao || ""),
                vida: esc((ficha.vidaAtual ?? "??") + "/" + (ficha.vidaMax ?? "??")),
                defesa: esc(ficha.defesa ?? "??"),
                sanidade: esc((ficha.sanidadeAtual ?? "??") + "/" + (ficha.sanidadeMax ?? "??")),
                idade: esc(ficha.idade || ""),
                local: esc(ficha.local || ""),
                historia: esc(ficha.historia || "")
            };

        });

}


function getMissionDatabase() {

    return readStorage("missoes")
        .filter(function (missao) {

            return missao && missao.id;

        })
        .map(function (missao) {

            return {
                id: String(missao.id),
                nome: esc(missao.nome || "Missão sem nome"),
                descricao: esc(missao.descricao || ""),
                objetivo: esc(missao.objetivo || ""),
                recompensas: esc(missao.recompensas || "")
            };

        });

}


function getMapDatabase() {

    return readStorage("mapas")
        .filter(function (mapa) {

            return mapa && mapa.id;

        })
        .map(function (mapa) {

            return {
                id: String(mapa.id),
                nome: esc(mapa.nome || "Mapa sem nome"),
                descricao: esc(mapa.descricao || ""),
                imagem: esc(mapa.imagem || "")
            };

        });

}


function emptyAvailable(container, message, linkText, href) {

    container.innerHTML = `

        <p class="modal-description">
            ${message}
        </p>

        <a class="empty-add-button" href="${href}">
            ${linkText}
        </a>

    `;

}


/* LOCAL STORAGE */

/* CAMPANHAS */

const CAMPAIGNS_KEY = "campanhas";

function getCampaigns() {

    return readStorage(CAMPAIGNS_KEY).filter(function (c) {

        return c && c.id;

    });

}

function saveCampaigns(list) {

    localStorage.setItem(CAMPAIGNS_KEY, JSON.stringify(list));

}

function newCampaignId() {

    return Date.now().toString() +
           Math.random().toString(36).substring(2);

}

const currentCampaignId = (function () {

    const id = new URLSearchParams(window.location.search).get("id");

    if (id && getCampaigns().some(function (c) { return c.id === id; })) {

        return id;

    }

    return newCampaignId();

})();

function ensureCampaign() {

    const list = getCampaigns();

    let campaign = list.find(function (c) {

        return c.id === currentCampaignId;

    });

    if (!campaign) {

        campaign = { id: currentCampaignId, nome: "" };

        list.push(campaign);

        saveCampaigns(list);

        try {

            history.replaceState(null, "", "?id=" + currentCampaignId);

        } catch (erro) {}

    }

    return campaign;

}


/* NOME DA CAMPANHA */

function setupCampaignName() {

    const form = document.getElementById("campaignNameForm");
    const input = document.getElementById("campaignNameInput");
    const status = document.getElementById("campaignNameStatus");

    if (!form || !input) {
        return;
    }

    const saved = getCampaigns().find(function (c) {

        return c.id === currentCampaignId;

    });

    input.value = saved ? saved.nome : "";

    input.addEventListener("input", function () {

        status.textContent = "";

    });

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const nome = input.value.trim();

        if (!nome) {

            status.textContent = "Digite um nome para a campanha.";
            input.focus();
            return;

        }

        ensureCampaign();

        const list = getCampaigns();

        list.forEach(function (c) {

            if (c.id === currentCampaignId) {
                c.nome = nome;
            }

        });

        saveCampaigns(list);

        input.value = nome;
        status.textContent = "✓ Nome salvo";

    });

}


const STORAGE = {

    activePage:
        "active_page",

    npcs:
        "campaign_npcs_" + currentCampaignId,

    missions:
        "campaign_missions_" + currentCampaignId,

    maps:
        "campaign_maps_" + currentCampaignId

};


/* STORAGE */

function getList(key) {

    const saved =
        localStorage.getItem(key);


    if (!saved) {

        return [];

    }


    try {

        return JSON.parse(saved);

    } catch {

        return [];

    }

}


function saveList(key, list) {

    ensureCampaign();

    localStorage.setItem(
        key,
        JSON.stringify(list)
    );

}


function addItem(key, id) {

    const list =
        getList(key);


    if (!list.includes(id)) {

        list.push(id);

        saveList(
            key,
            list
        );

    }

}


function removeItem(key, id) {

    const list =
        getList(key)
            .filter(
                item =>
                    item !== id
            );


    saveList(
        key,
        list
    );

}


/* TROCA DE ABAS */

function setupTabs() {

    const tabs =
        document.querySelectorAll(".tab");


    tabs.forEach(function (tab) {

        tab.addEventListener(
            "click",
            function () {

                const page =
                    this.dataset.page;


                changePage(page);

            }
        );

    });

}


/* ALTERAR ABA */

function changePage(page) {

    const validPages = [

        "npcs",
        "missoes",
        "mapas"

    ];


    if (!validPages.includes(page)) {

        page = "npcs";

    }


    /* BOTÕES */

    document
        .querySelectorAll(".tab")
        .forEach(function (tab) {

            const active =
                tab.dataset.page === page;


            tab.classList.toggle(
                "active",
                active
            );


            tab.setAttribute(
                "aria-selected",
                active
            );

        });


    /* PÁGINAS */

    document
        .querySelectorAll(".page")
        .forEach(function (section) {

            section.classList.remove(
                "active-page"
            );

        });


    const selected =
        document.getElementById(
            "page-" + page
        );


    if (selected) {

        selected.classList.add(
            "active-page"
        );

    }


    /* SALVAR ABA */

    localStorage.setItem(
        STORAGE.activePage,
        page
    );

}


/* IMAGEM FALLBACK */

function fallbackImage(name) {

    const letter =
        name
            .charAt(0)
            .toUpperCase();


    const svg = `

        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 100 100"
        >

            <circle
                cx="50"
                cy="50"
                r="48"
                fill="#697653"
            />

            <circle
                cx="50"
                cy="40"
                r="18"
                fill="#eeeeee"
            />

            <path
                d="
                    M20 92
                    C22 65 78 65 80 92
                "
                fill="#eeeeee"
            />

            <text
                x="50"
                y="18"
                text-anchor="middle"
                font-size="10"
                fill="#ffffff"
            >
                ${letter}
            </text>

        </svg>

    `;


    return (
        "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(svg)
    );

}


function setupImage(image) {

    if (!image) {

        return;

    }


    image.addEventListener(
        "error",
        function () {

            image.src =
                fallbackImage(
                    image.alt || "?"
                );

        }
    );

}


/* ABRIR A FICHA DO NPC */

function openNpcSheet(id) {

    localStorage.setItem(
        "fichaAtivaId",
        id
    );

    window.location.href =
        "ficha.html";

}


/* NPCS */

function renderNPCs() {

    const list =
        document.getElementById("npcList");


    const empty =
        document.getElementById("npcEmpty");


    const addButton =
        document.getElementById("addNpcButton");


    const ids =
        getList(STORAGE.npcs);


    const npcs =
        ids
            .map(function (id) {

                return getNpcDatabase().find(
                    function (npc) {

                        return npc.id === id;

                    }
                );

            })
            .filter(Boolean);


    list.innerHTML = "";


    if (npcs.length === 0) {

        empty.style.display =
            "block";

        addButton.style.display =
            "none";

        return;

    }


    empty.style.display =
        "none";

    addButton.style.display =
        "block";


    npcs.forEach(function (npc) {

        const item =
            document.createElement("article");


        item.className =
            "npc-item";


        item.innerHTML = `

            <img
                class="npc-image"
                src="${npc.imagem}"
                alt="${npc.nome}"
            >


            <div class="npc-main-info">

                <h3 class="npc-name">
                    ${npc.nome}
                </h3>

                <div class="npc-class">
                    ${npc.classe}
                </div>

            </div>


            <div class="item-buttons">

                <button
                    type="button"
                    class="item-action-button"
                aria-label="Ver ficha de ${npc.nome}"
                >
                    ver ficha
                </button>

                <button
                    type="button"
                    class="remove-button"
                    title="Remover NPC"
                    aria-label="Remover NPC ${npc.nome}"
                >
                    remover
                </button>

            </div>

        `;


        setupImage(
            item.querySelector(".npc-image")
        );


        item.addEventListener(
            "click",
            function (event) {

                if (
                    event.target.closest(
                        ".remove-button"
                    )
                ) {

                    return;

                }


                openNpcSheet(npc.id);

            }
        );


        item
            .querySelector(".remove-button")
            .addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();


                    removeItem(
                        STORAGE.npcs,
                        npc.id
                    );


                    renderNPCs();


                    focusAfterRemove("npcList");

                }
            );


        list.appendChild(item);

    });

}


/* MODAL NPCS */

function openNpcModal(opener) {

    renderAvailableNpcs();

    openModal("npcModal", opener);

}


function renderAvailableNpcs() {

    const container =
        document.getElementById(
            "availableNpcs"
        );


    const added =
        getList(STORAGE.npcs);


    container.innerHTML = "";


    if (getNpcDatabase().length === 0) {

        emptyAvailable(
            container,
            "Você ainda não criou nenhum NPC.",
            "Criar NPC",
            "fichas.html"
        );

        return;

    }


    getNpcDatabase().forEach(function (npc) {

        const alreadyAdded =
            added.includes(npc.id);


        const item =
            document.createElement("button");


        item.type = "button";

        item.className =
            "available-item";


        if (alreadyAdded) {

            item.classList.add(
                "disabled"
            );

            item.setAttribute(
                "aria-disabled",
                "true"
            );

        }


        item.innerHTML = `

            <img
                class="available-image"
                src="${npc.imagem}"
                alt="${npc.nome}"
                aria-hidden="true"
            >

            <div class="available-info">

                <div class="available-name">
                    ${npc.nome}
                </div>

                <div class="available-description">

                    ${
                        alreadyAdded
                            ? "Já adicionado"
                            : npc.descricao
                    }

                </div>

            </div>

        `;


        setupImage(
            item.querySelector(
                ".available-image"
            )
        );


        if (!alreadyAdded) {

            item.addEventListener(
                "click",
                function () {

                    addItem(
                        STORAGE.npcs,
                        npc.id
                    );


                    renderNPCs();


                    closeModal("npcModal");

                }
            );

        }


        container.appendChild(item);

    });

}


/* MISSÕES */

function renderMissions() {

    const list =
        document.getElementById(
            "missionList"
        );


    const empty =
        document.getElementById(
            "missionEmpty"
        );


    const addButton =
        document.getElementById(
            "addMissionButton"
        );


    const ids =
        getList(STORAGE.missions);


    const missions =
        ids
            .map(function (id) {

                return getMissionDatabase().find(
                    function (mission) {

                        return mission.id === id;

                    }
                );

            })
            .filter(Boolean);


    list.innerHTML = "";


    if (missions.length === 0) {

        empty.style.display =
            "block";

        addButton.style.display =
            "none";

        return;

    }


    empty.style.display =
        "none";

    addButton.style.display =
        "block";


    missions.forEach(function (mission) {

        const item =
            document.createElement("article");


        item.className =
            "mission-item";


        item.innerHTML = `

            <div class="mission-info">

                <h3 class="mission-title">
                    ${mission.nome}
                </h3>

                <p class="mission-description">
                    ${mission.descricao}
                </p>

            </div>


            <div class="item-buttons">

                <button
                    type="button"
                    class="item-action-button"
                aria-label="Ver detalhes da missão ${mission.nome}"
                >
                    ver detalhes
                </button>

                <button
                    type="button"
                    class="remove-button"
                    title="Remover missão"
                    aria-label="Remover missão ${mission.nome}"
                >
                    remover
                </button>

            </div>

        `;


        item.addEventListener(
            "click",
            function (event) {

                if (
                    event.target.closest(
                        ".remove-button"
                    )
                ) {

                    return;

                }


                showDetails(
                    "missao",
                    mission.id,
                    item.querySelector(".item-action-button")
                );

            }
        );


        item
            .querySelector(".remove-button")
            .addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();


                    removeItem(
                        STORAGE.missions,
                        mission.id
                    );


                    renderMissions();


                    focusAfterRemove("missionList");

                }
            );


        list.appendChild(item);

    });

}


/* MODAL MISSÕES */

function openMissionModal(opener) {

    renderAvailableMissions();

    openModal("missionModal", opener);

}


function renderAvailableMissions() {

    const container =
        document.getElementById(
            "availableMissions"
        );


    const added =
        getList(STORAGE.missions);


    container.innerHTML = "";


    if (getMissionDatabase().length === 0) {

        emptyAvailable(
            container,
            "Você ainda não criou nenhuma missão.",
            "Criar missão",
            "inserir-missoes.html"
        );

        return;

    }


    getMissionDatabase().forEach(function (mission) {

        const alreadyAdded =
            added.includes(
                mission.id
            );


        const item =
            document.createElement("button");


        item.type = "button";

        item.className =
            "available-item";


        if (alreadyAdded) {

            item.classList.add(
                "disabled"
            );

            item.setAttribute(
                "aria-disabled",
                "true"
            );

        }


        item.innerHTML = `

            <div class="available-info">

                <div class="available-name">
                    ${mission.nome}
                </div>

                <div class="available-description">

                    ${
                        alreadyAdded
                            ? "Já adicionada"
                            : mission.descricao
                    }

                </div>

            </div>

        `;


        if (!alreadyAdded) {

            item.addEventListener(
                "click",
                function () {

                    addItem(
                        STORAGE.missions,
                        mission.id
                    );


                    renderMissions();


                    closeModal("missionModal");

                }
            );

        }


        container.appendChild(item);

    });

}


/* MAPAS */

function renderMaps() {

    const list =
        document.getElementById(
            "mapList"
        );


    const empty =
        document.getElementById(
            "mapEmpty"
        );


    const addButton =
        document.getElementById(
            "addMapButton"
        );


    const ids =
        getList(STORAGE.maps);


    const maps =
        ids
            .map(function (id) {

                return getMapDatabase().find(
                    function (map) {

                        return map.id === id;

                    }
                );

            })
            .filter(Boolean);


    list.innerHTML = "";


    if (maps.length === 0) {

        empty.style.display =
            "block";

        addButton.style.display =
            "none";

        return;

    }


    empty.style.display =
        "none";

    addButton.style.display =
        "block";


    maps.forEach(function (map) {

        const item =
            document.createElement("article");


        item.className =
            "map-item";


        item.innerHTML = `

            ${
                map.imagem
                    ? `<img class="item-thumb" src="${map.imagem}" alt="">`
                    : ""
            }

            <div class="map-info">

                <h3 class="map-title">
                    ${map.nome}
                </h3>

                <p class="map-description">
                    ${map.descricao}
                </p>

            </div>


            <div class="item-buttons">

                <button
                    type="button"
                    class="item-action-button"
                aria-label="Ver detalhes do mapa ${map.nome}"
                >
                    ver detalhes
                </button>

                <button
                    type="button"
                    class="remove-button"
                    title="Remover mapa"
                    aria-label="Remover mapa ${map.nome}"
                >
                    remover
                </button>

            </div>

        `;


        item.addEventListener(
            "click",
            function (event) {

                if (
                    event.target.closest(
                        ".remove-button"
                    )
                ) {

                    return;

                }


                showDetails(
                    "mapa",
                    map.id,
                    item.querySelector(".item-action-button")
                );

            }
        );


        item
            .querySelector(".remove-button")
            .addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();


                    removeItem(
                        STORAGE.maps,
                        map.id
                    );


                    renderMaps();


                    focusAfterRemove("mapList");

                }
            );


        list.appendChild(item);

    });

}


/* MODAL MAPAS */

function openMapModal(opener) {

    renderAvailableMaps();

    openModal("mapModal", opener);

}


function renderAvailableMaps() {

    const container =
        document.getElementById(
            "availableMaps"
        );


    const added =
        getList(STORAGE.maps);


    container.innerHTML = "";


    if (getMapDatabase().length === 0) {

        emptyAvailable(
            container,
            "Você ainda não adicionou nenhum mapa.",
            "Adicionar mapa",
            "mapas.html"
        );

        return;

    }


    getMapDatabase().forEach(function (map) {

        const alreadyAdded =
            added.includes(map.id);


        const item =
            document.createElement("button");


        item.type = "button";

        item.className =
            "available-item";


        if (alreadyAdded) {

            item.classList.add(
                "disabled"
            );

            item.setAttribute(
                "aria-disabled",
                "true"
            );

        }


        item.innerHTML = `

            ${
                map.imagem
                    ? `<img class="available-image" src="${map.imagem}" alt="${map.nome}" aria-hidden="true">`
                    : ""
            }

            <div class="available-info">

                <div class="available-name">
                    ${map.nome}
                </div>

                <div class="available-description">

                    ${
                        alreadyAdded
                            ? "Já adicionado"
                            : map.descricao
                    }

                </div>

            </div>

        `;


        if (!alreadyAdded) {

            item.addEventListener(
                "click",
                function () {

                    addItem(
                        STORAGE.maps,
                        map.id
                    );


                    renderMaps();


                    closeModal("mapModal");

                }
            );

        }


        container.appendChild(item);

    });

}


/* DETALHES */

function showDetails(type, id, opener) {

    const container =
        document.getElementById(
            "detailsContent"
        );


    /* NPC */

    if (type === "npc") {

        const npc =
            getNpcDatabase().find(
                function (item) {

                    return item.id === id;

                }
            );


        if (!npc) {

            return;

        }


        container.innerHTML = `

            <div class="details-header">

                <img
                    class="details-image"
                    src="${npc.imagem}"
                    alt="${npc.nome}"
                >


                <div>

                    <h1 class="details-title" id="detailsTitulo">
                        ${npc.nome}
                    </h1>

                    <div class="details-subtitle">
                        ${npc.classe}
                    </div>

                </div>

            </div>


            <div class="details-grid">

                <div class="detail-stat">

                    <strong>
                        VIDA
                    </strong>

                    <span>
                        ${npc.vida}
                    </span>

                </div>


                <div class="detail-stat">

                    <strong>
                        DEFESA
                    </strong>

                    <span>
                        ${npc.defesa}
                    </span>

                </div>


                <div class="detail-stat">

                    <strong>
                        SANIDADE
                    </strong>

                    <span>
                        ${npc.sanidade}
                    </span>

                </div>

            </div>


            <div class="details-text">

                ${
                    npc.descricao
                        ? `<strong>Descrição</strong><p>${npc.descricao}</p>`
                        : ""
                }

                ${
                    npc.historia
                        ? `<strong>História</strong><p>${npc.historia}</p>`
                        : ""
                }

                ${
                    npc.idade
                        ? `<strong>Idade:</strong> ${npc.idade}<br><br>`
                        : ""
                }

                ${
                    npc.local
                        ? `<strong>Local:</strong> ${npc.local}`
                        : ""
                }

            </div>

        `;


        setupImage(
            container.querySelector(
                ".details-image"
            )
        );

    }


    /* MISSÃO */

    if (type === "missao") {

        const mission =
            getMissionDatabase().find(
                function (item) {

                    return item.id === id;

                }
            );


        if (!mission) {

            return;

        }


        container.innerHTML = `

            <h1 class="details-title" id="detailsTitulo">
                ${mission.nome}
            </h1>


            <div class="details-text">

                ${
                    mission.descricao
                        ? `<strong>História</strong><p>${mission.descricao}</p>`
                        : ""
                }

                ${
                    mission.objetivo
                        ? `<strong>Objetivos</strong><p>${mission.objetivo}</p>`
                        : ""
                }

                ${
                    mission.recompensas
                        ? `<strong>Recompensas</strong><p>${mission.recompensas}</p>`
                        : ""
                }

            </div>

        `;

    }


    /* MAPA */

    if (type === "mapa") {

        const map =
            getMapDatabase().find(
                function (item) {

                    return item.id === id;

                }
            );


        if (!map) {

            return;

        }


        container.innerHTML = `

            <h1 class="details-title" id="detailsTitulo">
                ${map.nome}
            </h1>


            ${
                map.imagem
                    ? `<button type="button" class="details-zoom" aria-label="Ampliar imagem">
                            <img src="${map.imagem}" alt="Imagem do mapa ${map.nome}">
                            <span class="dica-ampliar">clique para ampliar</span>
                        </button>`
                    : ""
            }


            <div class="details-text">

                ${
                    map.descricao
                        ? `<strong>Descrição</strong><p>${map.descricao}</p>`
                        : ""
                }

            </div>

        `;

    }


    /* ABRIR MODAL */

    openModal("detailsModal", opener);

}


/* FECHAR MODAIS */

const FOCUSABLE =
    'a[href], button:not([disabled]), input:not([disabled]), ' +
    'select:not([disabled]), textarea:not([disabled]), ' +
    '[tabindex]:not([tabindex="-1"])';

let modalOpener = null;


function isVisible(element) {

    return element.getClientRects().length > 0;

}


function getOpenModals() {

    return Array.from(
        document.querySelectorAll(".modal:not(.hidden)")
    );

}


function setBackgroundInert(on) {

    const container =
        document.querySelector(".container");

    if (!container) {

        return;

    }

    Array.from(container.children).forEach(function (element) {

        if (
            element.classList.contains("modal") ||
            element.id === "lightbox"
        ) {

            return;

        }

        if (on) {

            element.setAttribute("inert", "");

        } else {

            element.removeAttribute("inert");

        }

    });

    document.body.style.overflow = on ? "hidden" : "";

}


function pageActionTarget() {

    const page =
        document.querySelector(".page.active-page");

    if (!page) {

        return null;

    }

    return Array.from(
        page.querySelectorAll(".empty-add-button, .floating-add")
    ).find(isVisible) || null;

}


function focusAfterRemove(listId) {

    const list =
        document.getElementById(listId);

    const next =
        list && list.querySelector(".item-action-button");

    const target =
        next || pageActionTarget();

    if (target) {

        target.focus();

    }

}


function restoreFocus() {

    let target = modalOpener;

    modalOpener = null;

    if (
        !target ||
        !document.contains(target) ||
        !isVisible(target)
    ) {

        target = pageActionTarget();

    }

    if (target) {

        target.focus();

    }

}


function openModal(id, opener) {

    const modal =
        document.getElementById(id);

    if (!modal) {

        return;

    }

    if (!modalOpener) {

        modalOpener = opener || document.activeElement;

    }

    modal.classList.remove("hidden");

    setBackgroundInert(true);

    const box =
        modal.querySelector(".modal-box");

    if (box) {

        box.focus();

    }

}


function closeModal(id) {

    const modal =
        document.getElementById(id);

    if (!modal || modal.classList.contains("hidden")) {

        return;

    }

    modal.classList.add("hidden");

    if (getOpenModals().length === 0) {

        setBackgroundInert(false);

        restoreFocus();

    }

}


document.addEventListener(
    "keydown",
    function (event) {

        if (event.key !== "Tab") {

            return;

        }

        const modals = getOpenModals();

        if (modals.length === 0) {

            return;

        }

        const modal = modals[modals.length - 1];

        const box = modal.querySelector(".modal-box");

        const items =
            Array.from(modal.querySelectorAll(FOCUSABLE))
                .filter(isVisible);

        if (items.length === 0) {

            event.preventDefault();

            return;

        }

        const first = items[0];
        const last = items[items.length - 1];
        const active = document.activeElement;

        if (
            event.shiftKey &&
            (active === first || active === box)
        ) {

            event.preventDefault();
            last.focus();

        } else if (!event.shiftKey && active === last) {

            event.preventDefault();
            first.focus();

        }

    }
);


/* BOTÕES X DOS MODAIS */

document
    .querySelectorAll("[data-close]")
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                closeModal(
                    button.dataset.close
                );

            }
        );

    });


/* CLICAR FORA DO MODAL */

document.addEventListener(
    "click",
    function (event) {

        if (
            event.target.classList.contains(
                "modal"
            )
        ) {

            closeModal(event.target.id);

        }

    }
);


/* ESC FECHA MODAIS */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key !== "Escape"
        ) {

            return;

        }


        getOpenModals().forEach(function (modal) {

            closeModal(modal.id);

        });

    }
);


/* BOTÕES NPC */

document
    .getElementById("openNpcButton")
    .addEventListener(
        "click",
        function () {

            openNpcModal(this);

        }
    );


document
    .getElementById("addNpcButton")
    .addEventListener(
        "click",
        function () {

            openNpcModal(this);

        }
    );


/* BOTÕES MISSÕES */

document
    .getElementById("openMissionButton")
    .addEventListener(
        "click",
        function () {

            openMissionModal(this);

        }
    );


document
    .getElementById("addMissionButton")
    .addEventListener(
        "click",
        function () {

            openMissionModal(this);

        }
    );


/* BOTÕES MAPAS */

document
    .getElementById("openMapButton")
    .addEventListener(
        "click",
        function () {

            openMapModal(this);

        }
    );


document
    .getElementById("addMapButton")
    .addEventListener(
        "click",
        function () {

            openMapModal(this);

        }
    );


/* INICIALIZAÇÃO */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        setupTabs();

        setupCampaignName();


        renderNPCs();

        renderMissions();

        renderMaps();


        /* RECUPERA A ÚLTIMA ABA */

        const savedPage =
            localStorage.getItem(
                STORAGE.activePage
            );


        const validPages = [
            "npcs",
            "missoes",
            "mapas"
        ];


        if (
            savedPage &&
            validPages.includes(savedPage)
        ) {

            changePage(
                savedPage
            );

        } else {

            changePage(
                "npcs"
            );

        }

    }
);


/* ATUALIZA AO VOLTAR DE OUTRA PÁGINA */

window.addEventListener("pageshow", function (event) {

    if (event.persisted) {

        renderNPCs();

        renderMissions();

        renderMaps();

    }

});


/* IMAGEM DO MAPA AMPLIADA */

(function () {

    const lightbox =
        document.getElementById("lightbox");

    if (!lightbox) {
        return;
    }

    const image =
        document.getElementById("imagemAmpliada");

    const closeButton =
        document.getElementById("fecharLightbox");

    let lastButton = null;

    image.setAttribute("tabindex", "0");
    image.setAttribute("role", "button");

    image.addEventListener("keydown", function (event) {

        if (event.key === "Enter" || event.key === " ") {

            event.preventDefault();

            image.classList.toggle("zoom");

        }

    });


    function openImage(button) {

        const source =
            button.querySelector("img");

        lastButton = button;

        image.src = source.src;
        image.alt = source.alt;
        image.setAttribute(
            "aria-label",
            source.alt + ". Alternar entre ajustar à tela e tamanho real"
        );
        image.classList.remove("zoom");

        lightbox.classList.add("ativo");

        document.getElementById("detailsModal").setAttribute("inert", "");

        closeButton.focus();

    }


    function closeImage() {

        lightbox.classList.remove("ativo");
        image.src = "";

        document.getElementById("detailsModal").removeAttribute("inert");

        if (lastButton) {
            lastButton.focus();
        }

    }


    document
        .getElementById("detailsContent")
        .addEventListener("click", function (event) {

            const button =
                event.target.closest(".details-zoom");

            if (button) {
                openImage(button);
            }

        });

    closeButton.addEventListener("click", closeImage);

    image.addEventListener("click", function () {
        image.classList.toggle("zoom");
    });

    lightbox.addEventListener("click", function (event) {

        if (event.target === lightbox) {
            closeImage();
        }

    });

    document.addEventListener("keydown", function (event) {

        if (
            event.key === "Escape" &&
            lightbox.classList.contains("ativo")
        ) {

            event.stopImmediatePropagation();

            closeImage();

        }

        if (
            event.key === "Tab" &&
            lightbox.classList.contains("ativo")
        ) {

            const items = [closeButton, image];

            const index = items.indexOf(document.activeElement);

            let next;

            if (event.shiftKey) {
                next = index <= 0 ? items.length - 1 : index - 1;
            } else {
                next = index === items.length - 1 ? 0 : index + 1;
            }

            event.preventDefault();
            event.stopImmediatePropagation();

            items[next].focus();

        }

    }, true);

})();