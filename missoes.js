/* SISTEMA DE MISSÕES */


function obterMissoes() {

    const dados = localStorage.getItem("missoes");

    if (!dados) {
        return [];
    }

    try {

        return JSON.parse(dados);

    } catch (erro) {

        console.error("Erro ao carregar missões:", erro);

        return [];

    }

}


function salvarMissoes(missoes) {

    localStorage.setItem(
        "missoes",
        JSON.stringify(missoes)
    );

}


function criarId() {

    return Date.now().toString() +
           Math.random().toString(36).substring(2);

}


/* PÁGINA PRINCIPAL */

const listaMissoes =
    document.getElementById("listaMissoes");


if (listaMissoes) {

    mostrarMissoes();

}


function mostrarMissoes() {

    const missoes = obterMissoes();

    listaMissoes.innerHTML = "";


    if (missoes.length === 0) {

        listaMissoes.innerHTML = `

            <div class="sem-missoes">

                <p>
                    Nenhuma missão adicionada ainda.
                </p>

            </div>

        `;

        return;

    }


    missoes.forEach(function (missao) {

        const card = document.createElement("article");

        card.className = "card-missao";


        card.innerHTML = `

            <div class="info-missao">

                <h3 class="nome-missao">
                    ${escaparHTML(missao.nome)}
                </h3>

                <p class="descricao-missao">
                    ${escaparHTML(missao.descricao || "")}
                </p>

            </div>

            <div class="acoes-missao">

                <button
                    type="button"
                    class="botao-detalhes"
                    onclick="verDetalhes('${missao.id}')"
                >
                    ver detalhes
                </button>

                <button
                    type="button"
                    class="botao-remover"
                    onclick="removerMissao('${missao.id}')"
                >
                    remover
                </button>

            </div>

        `;


        listaMissoes.appendChild(card);

    });

}


/* REMOVER MISSÃO */

function removerMissao(id) {

    const confirmar =
        confirm("Deseja realmente remover esta missão?");


    if (!confirmar) {
        return;
    }


    let missoes = obterMissoes();


    missoes = missoes.filter(function (missao) {

        return missao.id !== id;

    });


    salvarMissoes(missoes);


    mostrarMissoes();

}


/* DETALHES */

function verDetalhes(id) {

    const missoes = obterMissoes();


    const missao = missoes.find(function (item) {

        return item.id === id;

    });


    if (!missao) {
        return;
    }


    const nome =
        document.getElementById("detalheNome");

    if (!nome) {
        return;
    }

    nome.textContent = missao.nome;

    missaoAberta = id;


    const itens = [
        ["detalheDescricao", missao.descricao],
        ["detalheObjetivo", missao.objetivo],
        ["detalheRecompensas", missao.recompensas]
    ];

    itens.forEach(function (item) {

        const campo = document.getElementById(item[0]);

        campo.textContent = item[1] || "";

        campo.parentElement.style.display =
            item[1] ? "block" : "none";

    });


    sairEdicao();

    document
        .getElementById("modalDetalhes")
        .classList.add("ativo");

}


/* FECHAR MODAL */

const fecharModal =
    document.getElementById("fecharModal");


if (fecharModal) {

    fecharModal.addEventListener("click", function () {

        if (editando) {
            sairEdicao();
        }

        document
            .getElementById("modalDetalhes")
            .classList.remove("ativo");

    });

}


const modal =
    document.getElementById("modalDetalhes");


if (modal) {

    modal.addEventListener("click", function (evento) {

        if (evento.target === modal && !editando) {

            modal.classList.remove("ativo");

        }

    });

}


/* EDITAR MISSÃO */

let missaoAberta = null;

let editando = false;


const CAMPOS_MISSAO = [
    { texto: "detalheDescricao", campo: "editarDescricao", chave: "descricao" },
    { texto: "detalheObjetivo", campo: "editarObjetivo", chave: "objetivo" },
    { texto: "detalheRecompensas", campo: "editarRecompensas", chave: "recompensas" }
];


function missaoDoModal() {

    return obterMissoes().find(function (item) {
        return item.id === missaoAberta;
    });

}


function entrarEdicao() {

    const missao = missaoDoModal();

    if (!missao) {
        return;
    }

    editando = true;

    document.getElementById("editarNome").value = missao.nome || "";

    document.getElementById("detalheNome").hidden = true;
    document.getElementById("editarNome").hidden = false;

    CAMPOS_MISSAO.forEach(function (item) {

        const texto = document.getElementById(item.texto);
        const campo = document.getElementById(item.campo);

        campo.value = missao[item.chave] || "";

        texto.parentElement.style.display = "block";
        texto.hidden = true;
        campo.hidden = false;

    });

    document.getElementById("botaoEditar").hidden = true;
    document.getElementById("acoesEdicao").hidden = false;

    document.getElementById("editarNome").focus();

}


function sairEdicao() {

    editando = false;

    document.getElementById("detalheNome").hidden = false;
    document.getElementById("editarNome").hidden = true;

    const missao = missaoDoModal();

    CAMPOS_MISSAO.forEach(function (item) {

        const texto = document.getElementById(item.texto);
        const campo = document.getElementById(item.campo);

        texto.hidden = false;
        campo.hidden = true;

        texto.parentElement.style.display =
            missao && missao[item.chave] ? "block" : "none";

    });

    document.getElementById("botaoEditar").hidden = false;
    document.getElementById("acoesEdicao").hidden = true;

}


function salvarEdicao() {

    const campoNome = document.getElementById("editarNome");

    const nome = campoNome.value.trim();

    if (!nome) {

        alert("O nome da missão não pode ficar vazio.");

        campoNome.focus();

        return;

    }

    const missoes = obterMissoes();

    const missao = missoes.find(function (item) {
        return item.id === missaoAberta;
    });

    if (!missao) {
        return;
    }

    missao.nome = nome;

    CAMPOS_MISSAO.forEach(function (item) {

        missao[item.chave] =
            document.getElementById(item.campo).value.trim();

    });

    try {

        salvarMissoes(missoes);

    } catch (erro) {

        alert("Não foi possível salvar as alterações.");

        return;

    }

    document.getElementById("detalheNome").textContent = nome;

    CAMPOS_MISSAO.forEach(function (item) {

        document.getElementById(item.texto).textContent =
            missao[item.chave];

    });

    sairEdicao();

    mostrarMissoes();

    document.getElementById("botaoEditar").focus();

}


const botaoEditar = document.getElementById("botaoEditar");

if (botaoEditar) {

    botaoEditar.addEventListener("click", entrarEdicao);

    document.getElementById("cancelarEdicao")
        .addEventListener("click", function () {
            sairEdicao();
            botaoEditar.focus();
        });

    document.getElementById("salvarEdicao")
        .addEventListener("click", salvarEdicao);

    document.getElementById("editarNome")
        .addEventListener("keydown", function (evento) {

            if (evento.key === "Enter") {
                evento.preventDefault();
                salvarEdicao();
            }

        });

    document.addEventListener("keydown", function (evento) {

        if (evento.key === "Escape" && editando) {

            sairEdicao();

            botaoEditar.focus();

        }

    });

}


/* FORMULÁRIO DE NOVA MISSÃO */

const formMissao =
    document.getElementById("formMissao");


if (formMissao) {

    formMissao.addEventListener("submit", function (evento) {

        evento.preventDefault();


        const nome =
            document.getElementById("nome").value.trim();

        const descricao =
            document.getElementById("descricao").value.trim();

        const mapa =
            document.getElementById("mapa").value.trim();

        const dificuldade =
            document.getElementById("dificuldade").value;

        const objetivo =
            document.getElementById("objetivo").value.trim();


        const novaMissao = {

            id: criarId(),

            nome: nome,

            descricao: descricao,

            mapa: mapa,

            dificuldade: dificuldade,

            objetivo: objetivo

        };


        const missoes = obterMissoes();


        missoes.push(novaMissao);


        salvarMissoes(missoes);


        window.location.href = "index.html";

    });

}


/* MISSÕES PRÉ-DEFINIDAS */

const botoesAdicionar =
    document.querySelectorAll(".botao-adicionar");


botoesAdicionar.forEach(function (botao) {

    botao.addEventListener("click", function () {


        const missao = {

            id: criarId(),

            nome: botao.dataset.nome,

            descricao: botao.dataset.descricao,

            mapa: botao.dataset.mapa,

            dificuldade: botao.dataset.dificuldade,

            objetivo: botao.dataset.objetivo

        };


        const missoes = obterMissoes();


        missoes.push(missao);


        salvarMissoes(missoes);


        botao.textContent = "✓ adicionada";

        botao.disabled = true;


        setTimeout(function () {

            window.location.href = "index.html";

        }, 500);

    });

});


/* SEGURANÇA */

function escaparHTML(texto) {

    const div = document.createElement("div");

    div.textContent = texto;

    return div.innerHTML;

}