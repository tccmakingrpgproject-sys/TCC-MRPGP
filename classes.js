/* MENU MOBILE */

const menu = document.querySelector(".menu");
const menuLista = document.getElementById("menuLista");
const menuToggle = document.getElementById("menuToggle");


if (
    menu &&
    menuLista &&
    menuToggle
) {

    menuToggle.addEventListener(
        "click",
        () => {

            const aberto =
                menu.classList.toggle(
                    "menu-aberto"
                );


            menuToggle.setAttribute(
                "aria-expanded",
                aberto ? "true" : "false"
            );


            menuToggle.setAttribute(
                "aria-label",
                aberto
                    ? "Fechar menu"
                    : "Abrir menu"
            );

        }
    );


    menuLista
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    if (
                        window.innerWidth <= 480
                    ) {

                        menu.classList.remove(
                            "menu-aberto"
                        );

                        menuToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                        menuToggle.setAttribute(
                            "aria-label",
                            "Abrir menu"
                        );

                    }

                }
            );

        });


    function verificarTamanhoTela() {

        if (
            window.innerWidth > 480
        ) {

            menu.classList.remove(
                "menu-aberto"
            );

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Abrir menu"
            );

        }

    }


    window.addEventListener(
        "resize",
        verificarTamanhoTela
    );

}


/* ELEMENTOS */

const cards =
    document.querySelectorAll(
        ".card-classes"
    );


const btnProximo =
    document.getElementById(
        "btnProximo"
    );


const modalOverlay =
    document.getElementById(
        "modalOverlay"
    );


const modalDetalhes =
    document.querySelector(
        ".modal-detalhes"
    );


const fecharModal =
    document.getElementById(
        "fecharModal"
    );


const modalNome =
    document.getElementById(
        "modalNome"
    );


const modalDescricao =
    document.getElementById(
        "modalDescricao"
    );


const modalImagem =
    document.getElementById(
        "modalImagem"
    );


const modalVida =
    document.getElementById(
        "modalVida"
    );


const modalDefesa =
    document.getElementById(
        "modalDefesa"
    );


const modalSanidade =
    document.getElementById(
        "modalSanidade"
    );


const modalPericias =
    document.getElementById(
        "modalPericias"
    );


/* DADOS DAS CLASSES */

const dadosClasses = {

    "Alquimista": {

        imagem: "img/Alquimista_Icon.jpg",

        descricao:
            "Especialista em alquimia e preparação de substâncias.",

        pericias: [
            "Alquimia",
            "Apotecário",
            "Prestidigitação"
        ],

        vida: "100",
        defesa: "75",
        sanidade: "80"

    },


    "Nobre": {

        imagem: "img/Nobre_Icon.jpg",

        descricao:
            "Personagem acostumado à influência, autoridade e aos privilégios da alta sociedade.",

        pericias: [
            "Intimidação",
            "Sobrevivência",
            "Atletismo"
        ],

        vida: "110",
        defesa: "70",
        sanidade: "80"

    },


    "Bárbaro": {

        imagem: "img/Barbaro_Icon.jpg",

        descricao:
            "Guerreiro resistente que confia em sua força, resistência e ferocidade.",

        pericias: [
            "Intimidação",
            "Sobrevivência",
            "Atletismo"
        ],

        vida: "140",
        defesa: "90",
        sanidade: "70"

    },


    "Bardo": {

        imagem: "img/Bardo_Icon.jpg",

        descricao:
            "Artista e aventureiro que utiliza sua presença, conhecimento e talento.",

        pericias: [
            "Artes",
            "Persuasão",
            "Diplomacia"
        ],

        vida: "110",
        defesa: "75",
        sanidade: "90"

    },


    "Bruxo": {

        imagem: "img/Bruxa_Icon.jpg",

        descricao:
            "Usuário de conhecimentos sobrenaturais e poderes mágicos.",

        pericias: [
            "Religião",
            "Alquimia",
            "Arcanismo"
        ],

        vida: "115",
        defesa: "75",
        sanidade: "70"

    },


    "Clérigos": {

        imagem: "img/Clerigo_Icon.jpg",

        descricao:
            "Devoto que utiliza sua fé, conhecimento religioso e força espiritual.",

        pericias: [
            "Religião",
            "Intuição",
            "Persuasão"
        ],

        vida: "130",
        defesa: "80",
        sanidade: "80"

    },


    "Druida": {

        imagem: "img/Druida_Icon.jpg",

        descricao:
            "Guardião da natureza especializado em sobrevivência e conhecimentos naturais.",

        pericias: [
            "Sobrevivência",
            "Apotecário",
            "Intuição"
        ],

        vida: "105",
        defesa: "70",
        sanidade: "90"

    },


    "Feiticeiro": {

        imagem: "img/Feiticeiro_Icon.jpg",

        descricao:
            "Personagem dotado de poderes mágicos e afinidade sobrenatural.",

        pericias: [
            "Arcanismo",
            "Diplomacia",
            "Intuição"
        ],

        vida: "170",
        defesa: "75",
        sanidade: "80"

    },


    "Guerreiro": {

        imagem: "img/Guerreiro_Icon.jpg",

        descricao:
            "Combatente treinado para enfrentar seus adversários diretamente.",

        pericias: [
            "Atletismo",
            "Esquiva",
            "Intimidação"
        ],

        vida: "150",
        defesa: "100",
        sanidade: "80"

    },


    "Ladino": {

        imagem: "img/Ladino_Icon.jpg",

        descricao:
            "Especialista em furtividade, trapaças e infiltração.",

        pericias: [
            "Crime",
            "Furtividade",
            "Blefe"
        ],

        vida: "100",
        defesa: "70",
        sanidade: "90"

    },


    "Mago": {

        imagem: "img/Mago_Icon.jpg",

        descricao:
            "Estudioso das artes arcanas, capaz de dominar diferentes formas de magia.",

        pericias: [
            "Arcanismo",
            "Religião",
            "Intuição"
        ],

        vida: "110",
        defesa: "80",
        sanidade: "80"

    },


    "Monge": {

        imagem: "img/Monge_Icon.jpg",

        descricao:
            "Combatente disciplinado que utiliza controle corporal, técnica e agilidade.",

        pericias: [
            "Religião",
            "Atletismo",
            "Esquiva"
        ],

        vida: "120",
        defesa: "75",
        sanidade: "100"

    },


    "Paladino": {

        imagem: "img/Paladino_Icon.jpg",

        descricao:
            "Guerreiro guiado por seus princípios e treinamento marcial.",

        pericias: [
            "Etiqueta",
            "Medicina",
            "Atletismo"
        ],

        vida: "130",
        defesa: "80",
        sanidade: "80"

    },


    "Ranger": {

        imagem: "img/Ranger_Icon.png",

        descricao:
            "Explorador acostumado a ambientes selvagens, rastreamento e movimentação silenciosa.",

        pericias: [
            "Sobrevivência",
            "Furtividade",
            "Intuição"
        ],

        vida: "140",
        defesa: "85",
        sanidade: "80"

    },


    "Samurai": {

        imagem: "img/Samurai_Icon.jpg",

        descricao:
            "Guerreiro disciplinado e especializado em técnicas de combate.",

        pericias: [
            "Atletismo",
            "Intimidação",
            "Percepção"
        ],

        vida: "150",
        defesa: "100",
        sanidade: "70"

    },


    "Vampiro": {

        imagem: "img/Vampiro_Icon.jpg",

        descricao:
            "Criatura sobrenatural que combina presença, agilidade e capacidades físicas extraordinárias.",

        pericias: [
            "Persuasão",
            "Esquiva",
            "Atletismo"
        ],

        vida: "150",
        defesa: "100",
        sanidade: "60"

    },


    "Viking": {

        imagem: "img/Viking_Icon.jpg",

        descricao:
            "Guerreiro acostumado a viagens, sobrevivência e confrontos físicos.",

        pericias: [
            "Sobrevivência",
            "Atletismo",
            "Diplomacia"
        ],

        vida: "150",
        defesa: "100",
        sanidade: "70"

    },


    "Xamã": {

        imagem: "img/Xamã_Icon.jpg",

        descricao:
            "Conhecedor de tradições, medicina e aspectos espirituais ligados à natureza.",

        pericias: [
            "Medicina",
            "Sobrevivência",
            "Religião"
        ],

        vida: "120",
        defesa: "75",
        sanidade: "90"

    }

};


/* CLASSE SELECIONADA */

let classeSelecionada =
    localStorage.getItem(
        "classeSelecionada"
    );



/* MOSTRAR ESCOLHA */

const dicaClasse =
    document.getElementById(
        "dicaClasse"
    );


function atualizarEscolha() {

    if (!classeSelecionada) {

        return;

    }


    let nomeExibido = classeSelecionada;

    cards.forEach(card => {

        if (
            card.dataset.classe ===
            classeSelecionada
        ) {

            const titulo =
                card.querySelector("h2");

            if (titulo) {

                nomeExibido =
                    titulo.textContent.trim();

            }

        }

    });


    btnProximo.classList.remove(
        "desativado"
    );

    btnProximo.removeAttribute(
        "aria-disabled"
    );


    if (dicaClasse) {

        dicaClasse.classList.remove(
            "aviso"
        );

        dicaClasse.textContent =
            "Classe escolhida: " +
            nomeExibido +
            ". Clique em Arquétipos para continuar.";

    }

}


/* RESTAURAR CLASSE */

if (classeSelecionada) {

    cards.forEach(card => {

        if (
            card.dataset.classe ===
            classeSelecionada
        ) {

            card.classList.add(
                "selecionado"
            );

        }

    });

    atualizarEscolha();

}


/* CARDS */

cards.forEach(card => {

    const btnDetalhes =
        card.querySelector(
            ".btn-detalhes"
        );


    card.setAttribute(
        "tabindex",
        "0"
    );


    card.setAttribute(
        "role",
        "button"
    );


    card.setAttribute(
        "aria-expanded",
        "false"
    );


    card.addEventListener(
        "click",
        event => {

            if (
                event.target.closest(
                    ".btn-detalhes"
                )
            ) {

                return;

            }


            alternarCard(card);

        }
    );


    card.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                alternarCard(card);

            }

        }
    );


    btnDetalhes.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            abrirModal(
                card.dataset.classe,
                btnDetalhes
            );

        }
    );

});


/* EXPANDIR CARD */

function alternarCard(card) {

    const estaAberto =
        card.classList.contains(
            "aberto"
        );


    cards.forEach(c => {

        c.classList.remove(
            "aberto"
        );

        c.setAttribute(
            "aria-expanded",
            "false"
        );

    });


    if (!estaAberto) {

        card.classList.add(
            "aberto"
        );

        card.setAttribute(
            "aria-expanded",
            "true"
        );

    }


    cards.forEach(c => {

        c.classList.remove(
            "selecionado"
        );

    });


    card.classList.add(
        "selecionado"
    );


    classeSelecionada =
        card.dataset.classe;


    localStorage.setItem(
        "classeSelecionada",
        classeSelecionada
    );


    atualizarEscolha();

}


/* BOTÃO QUE ABRIU O MODAL */

let elementoQueAbriuModal = null;


/* ABRIR MODAL */

function abrirModal(
    nomeClasse,
    elementoOrigem
) {

    const classe =
        dadosClasses[nomeClasse];


    if (!classe) {

        console.error(
            "Dados não encontrados para:",
            nomeClasse
        );

        return;

    }


    elementoQueAbriuModal =
        elementoOrigem;


    modalNome.textContent =
        nomeClasse;


    modalDescricao.textContent =
        classe.descricao;


    modalImagem.src =
        classe.imagem;


    modalImagem.alt =
        nomeClasse;


    modalVida.textContent =
        classe.vida;


    modalDefesa.textContent =
        classe.defesa;


    modalSanidade.textContent =
        classe.sanidade;


    modalPericias.innerHTML =
        "";


    classe.pericias.forEach(
        pericia => {

            const elemento =
                document.createElement(
                    "span"
                );

            elemento.classList.add(
                "pericia"
            );

            elemento.textContent =
                pericia;

            modalPericias.appendChild(
                elemento
            );

        }
    );


    modalOverlay.classList.add(
        "ativo"
    );


    modalOverlay.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";


    setTimeout(() => {

        fecharModal.focus();

    }, 50);

}


/* FECHAR MODAL */

function fecharModalDetalhes() {

    modalOverlay.classList.remove(
        "ativo"
    );


    modalOverlay.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";


    if (
        elementoQueAbriuModal &&
        document.body.contains(
            elementoQueAbriuModal
        )
    ) {

        setTimeout(() => {

            elementoQueAbriuModal.focus();

        }, 50);

    }

}


/* BOTÃO FECHAR */

fecharModal.addEventListener(
    "click",
    fecharModalDetalhes
);


/* CLIQUE FORA */

modalOverlay.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            modalOverlay
        ) {

            fecharModalDetalhes();

        }

    }
);


/* FOCUS TRAP DO MODAL */

function controlarFocoModal(event) {

    if (
        !modalOverlay.classList.contains(
            "ativo"
        )
    ) {

        return;

    }


    if (
        event.key !== "Tab"
    ) {

        return;

    }


    const elementosFocaveis =
        modalDetalhes.querySelectorAll(
            `
            button:not([disabled]),
            [href],
            input:not([disabled]),
            select:not([disabled]),
            textarea:not([disabled]),
            [tabindex]:not([tabindex="-1"])
            `
        );


    const focaveis =
        Array.from(
            elementosFocaveis
        ).filter(
            elemento =>
                elemento.offsetParent !== null
        );


    if (
        focaveis.length === 0
    ) {

        event.preventDefault();

        modalDetalhes.focus();

        return;

    }


    const primeiro =
        focaveis[0];


    const ultimo =
        focaveis[
            focaveis.length - 1
        ];


    if (
        !event.shiftKey &&
        document.activeElement === ultimo
    ) {

        event.preventDefault();

        primeiro.focus();

    }


    if (
        event.shiftKey &&
        document.activeElement === primeiro
    ) {

        event.preventDefault();

        ultimo.focus();

    }

}


document.addEventListener(
    "keydown",
    controlarFocoModal
);


/* ESC FECHA O MODAL */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            modalOverlay.classList.contains(
                "ativo"
            )
        ) {

            fecharModalDetalhes();

        }

    }
);


/* BOTÃO PRÓXIMO */

btnProximo.addEventListener(
    "click",
    () => {

        if (
            btnProximo.classList.contains(
                "desativado"
            )
        ) {

            if (dicaClasse) {

                dicaClasse.classList.add(
                    "aviso"
                );

                dicaClasse.textContent =
                    "Escolha uma classe antes de ir para os arquétipos.";

            }

            return;

        }


        const chaveClasse = classeSelecionada
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();

        const paginasArquétipos = {
            alquimista: "Alquimista.html",
            barbaro: "barbaro.html",
            bardo: "bardo.html",
            bruxo: "Bruxo.html",
            clerigos: "clerigo.html",
            clerigo: "clerigo.html",
            druida: "Druida.html",
            feiticeiro: "feiticeiro.html",
            guerreiro: "guerreiro.html",
            ladino: "ladino.html",
            mago: "Mago.html",
            monge: "Monge.html",
            nobre: "nobre.html",
            paladino: "Paladino.html",
            ranger: "Ranger.html",
            samurai: "samurai.html",
            vampiro: "vampiro.html",
            viking: "viking.html",
            vikings: "viking.html",
            xama: "xama.html"
        };

        const destino = paginasArquétipos[chaveClasse];
        if (!destino) {
            alert("Não foi possível localizar a página de arquétipos desta classe.");
            return;
        }
        localStorage.setItem("classe", classeSelecionada);
        window.location.href = destino;

    }
); 