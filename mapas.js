/* SISTEMA DE MAPAS */

function obterMapas() {

    const dados = localStorage.getItem("mapas");

    if (!dados) {
        return [];
    }

    try {
        return JSON.parse(dados);
    } catch (erro) {
        console.error("Erro ao carregar mapas:", erro);
        return [];
    }

}


function salvarMapas(mapas) {

    localStorage.setItem("mapas", JSON.stringify(mapas));

}


function criarId() {

    return Date.now().toString() +
           Math.random().toString(36).substring(2);

}


function escaparHTML(texto) {

    const div = document.createElement("div");

    div.textContent = texto;

    return div.innerHTML;

}


/* PÁGINA PRINCIPAL */

const listaMapas = document.getElementById("listaMapas");

if (listaMapas) {
    mostrarMapas();
}


function mostrarMapas() {

    const mapas = obterMapas();

    listaMapas.innerHTML = "";

    if (mapas.length === 0) {

        listaMapas.innerHTML = `
            <div class="sem-mapas">
                <p>Nenhum mapa adicionado ainda.</p>
            </div>
        `;

        return;

    }

    mapas.forEach(function (mapa) {

        const card = document.createElement("article");

        card.className = "card-mapa";

        card.innerHTML = `

            <img
                class="miniatura-mapa"
                src="${mapa.imagem || ''}"
                alt=""
            >

            <div class="info-mapa">

                <h3 class="nome-mapa">
                    ${escaparHTML(mapa.nome)}
                </h3>

                <p class="descricao-mapa">
                    ${escaparHTML(mapa.descricao || "")}
                </p>

            </div>

            <div class="acoes-mapa">

                <button type="button" class="botao-detalhes"
                        onclick="verDetalhes('${mapa.id}', this)">
                    ver detalhes
                </button>

                <button type="button" class="botao-remover"
                        onclick="removerMapa('${mapa.id}')">
                    remover
                </button>

            </div>

        `;

        listaMapas.appendChild(card);

    });

}


/* REMOVER MAPA */

function removerMapa(id) {

    if (!confirm("Deseja realmente remover este mapa?")) {
        return;
    }

    const mapas = obterMapas().filter(function (mapa) {
        return mapa.id !== id;
    });

    salvarMapas(mapas);

    mostrarMapas();

    focarAposRemover();

}


function focarAposRemover() {

    const proximo = listaMapas
        ? listaMapas.querySelector(".botao-detalhes")
        : null;

    const alvo = proximo || document.querySelector(".botao-acao");

    if (alvo) {
        alvo.focus();
    }

}


/* DETALHES */

function verDetalhes(id, abridor) {

    const mapa = obterMapas().find(function (item) {
        return item.id === id;
    });

    if (!mapa) {
        return;
    }

    const imagem = document.getElementById("detalheImagem");
    const botaoAmpliar = document.getElementById("botaoAmpliar");

    mapaAberto = mapa.id;
    sairEdicao();

    document.getElementById("detalheNome").textContent = mapa.nome;
    document.getElementById("detalheDescricao").textContent = mapa.descricao || "";

    document.querySelector(".detalhe-descricao").style.display =
        mapa.descricao ? "block" : "none";

    imagem.src = mapa.imagem || "";
    imagem.alt = "Imagem do mapa " + mapa.nome;
    botaoAmpliar.style.display = mapa.imagem ? "block" : "none";

    abrirModalDetalhes(abridor);

}


/* FECHAR MODAL */

const fecharModal = document.getElementById("fecharModal");

const modal = document.getElementById("modalDetalhes");

const lightbox = document.getElementById("lightbox");


const FOCAVEIS =
    'a[href], button:not([disabled]), input:not([disabled]), ' +
    'select:not([disabled]), textarea:not([disabled]), ' +
    '[tabindex]:not([tabindex="-1"])';

let abridorModal = null;


function visivel(elemento) {

    return elemento.getClientRects().length > 0;

}


function modalAberto() {

    return !!modal && modal.classList.contains("ativo");

}


function imagemAberta() {

    return !!lightbox && lightbox.classList.contains("ativo");

}


if (modal) {

    const janela = modal.querySelector(".modal");

    if (janela) {

        janela.setAttribute("role", "dialog");
        janela.setAttribute("aria-modal", "true");
        janela.setAttribute("aria-labelledby", "detalheNome");
        janela.setAttribute("tabindex", "-1");

    }

}

if (fecharModal) {

    fecharModal.setAttribute("type", "button");
    fecharModal.setAttribute("aria-label", "Fechar detalhes");

}

if (lightbox) {

    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");

    if (!lightbox.getAttribute("aria-label")) {
        lightbox.setAttribute("aria-label", "Imagem ampliada");
    }

    const botaoFecharImagem = document.getElementById("fecharLightbox");

    if (botaoFecharImagem) {

        botaoFecharImagem.setAttribute("type", "button");
        botaoFecharImagem.setAttribute("aria-label", "Fechar imagem ampliada");

    }

}


function bloquear(elemento, ligado, protegidos) {

    Array.from(elemento.children).forEach(function (filho) {

        if (filho.tagName === "SCRIPT" || filho.hasAttribute("vw")) {
            return;
        }

        if (protegidos.indexOf(filho) !== -1) {
            return;
        }

        const contemProtegido = protegidos.some(function (p) {
            return filho.contains(p);
        });

        if (contemProtegido) {

            bloquear(filho, ligado, protegidos);

            return;

        }

        if (ligado) {
            filho.setAttribute("inert", "");
        } else {
            filho.removeAttribute("inert");
        }

    });

}


function atualizarFundo() {

    const protegidos = [];

    if (modal) {
        protegidos.push(modal);
    }

    if (lightbox) {
        protegidos.push(lightbox);
    }

    const algumAberto = modalAberto() || imagemAberta();

    bloquear(document.body, algumAberto, protegidos);

    if (modal) {

        if (imagemAberta()) {
            modal.setAttribute("inert", "");
        } else {
            modal.removeAttribute("inert");
        }

    }

    document.body.style.overflow = algumAberto ? "hidden" : "";

}


function abrirModalDetalhes(abridor) {

    if (!modal) {
        return;
    }

    abridorModal = abridor || document.activeElement;

    modal.classList.add("ativo");

    atualizarFundo();

    document.querySelectorAll(".detalhe-descricao").forEach(function (area) {

        if (area.scrollHeight > area.clientHeight) {

            area.setAttribute("tabindex", "0");
            area.setAttribute("role", "region");
            area.setAttribute("aria-label", "Descrição do mapa (rolável)");

        } else {

            area.removeAttribute("tabindex");
            area.removeAttribute("role");
            area.removeAttribute("aria-label");

        }

    });

    const janela = modal.querySelector(".modal");

    if (janela) {
        janela.focus();
    }

}


function fecharModalDetalhes() {

    if (!modal) {
        return;
    }

    if (editando) {
        sairEdicao();
    }

    modal.classList.remove("ativo");

    atualizarFundo();

    if (
        abridorModal &&
        document.contains(abridorModal) &&
        visivel(abridorModal)
    ) {

        abridorModal.focus();

    } else {

        focarAposRemover();

    }

    abridorModal = null;

}


if (fecharModal) {

    fecharModal.addEventListener("click", fecharModalDetalhes);

}

if (modal) {

    modal.addEventListener("click", function (evento) {

        if (evento.target === modal && !editando) {
            fecharModalDetalhes();
        }

    });

}


/* EDITAR NOME E DESCRIÇÃO */

let mapaAberto = null;

let editando = false;


function mapaDoModal() {

    return obterMapas().find(function (item) {
        return item.id === mapaAberto;
    });

}


function entrarEdicao() {

    const mapa = mapaDoModal();

    if (!mapa) {
        return;
    }

    editando = true;

    document.getElementById("editarNome").value = mapa.nome || "";
    document.getElementById("editarDescricao").value = mapa.descricao || "";

    document.getElementById("detalheNome").hidden = true;
    document.getElementById("editarNome").hidden = false;

    document.querySelector(".detalhe-descricao").style.display = "none";
    document.getElementById("blocoEditarDescricao").hidden = false;

    document.getElementById("botaoEditar").hidden = true;
    document.getElementById("acoesEdicao").hidden = false;

    document.getElementById("editarNome").focus();

}


function sairEdicao() {

    editando = false;

    document.getElementById("detalheNome").hidden = false;
    document.getElementById("editarNome").hidden = true;

    document.getElementById("blocoEditarDescricao").hidden = true;

    document.getElementById("botaoEditar").hidden = false;
    document.getElementById("acoesEdicao").hidden = true;

    const mapa = mapaDoModal();

    document.querySelector(".detalhe-descricao").style.display =
        mapa && mapa.descricao ? "block" : "none";

}


function salvarEdicao() {

    const campoNome = document.getElementById("editarNome");

    const nome = campoNome.value.trim();

    const descricao =
        document.getElementById("editarDescricao").value.trim();

    if (!nome) {

        alert("O nome do mapa não pode ficar vazio.");

        campoNome.focus();

        return;

    }

    const mapas = obterMapas();

    const mapa = mapas.find(function (item) {
        return item.id === mapaAberto;
    });

    if (!mapa) {
        return;
    }

    mapa.nome = nome;
    mapa.descricao = descricao;

    try {

        salvarMapas(mapas);

    } catch (erro) {

        alert("Não foi possível salvar as alterações.");

        return;

    }

    document.getElementById("detalheNome").textContent = nome;
    document.getElementById("detalheDescricao").textContent = descricao;
    document.getElementById("detalheImagem").alt = "Imagem do mapa " + nome;

    sairEdicao();

    mostrarMapas();

    if (listaMapas) {

        const botoes = Array.from(listaMapas.querySelectorAll(".botao-detalhes"));

        abridorModal = botoes.find(function (botao) {
            return (botao.getAttribute("onclick") || "")
                .indexOf("'" + mapaAberto + "'") !== -1;
        }) || null;

    }

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

}


/* IMAGEM AMPLIADA */

if (lightbox) {

    const imagemAmpliada = document.getElementById("imagemAmpliada");
    const botaoAmpliar = document.getElementById("botaoAmpliar");
    const botaoFecharLightbox = document.getElementById("fecharLightbox");

    function abrirImagem() {

        const origem = document.getElementById("detalheImagem");

        imagemAmpliada.src = origem.src;
        imagemAmpliada.alt = origem.alt;
        imagemAmpliada.classList.remove("zoom");

        imagemAmpliada.setAttribute(
            "aria-label",
            (origem.alt ? origem.alt + ". " : "") +
            "Alternar entre ajustar à tela e tamanho real"
        );

        lightbox.classList.add("ativo");

        atualizarFundo();

        botaoFecharLightbox.focus();

    }

    function fecharImagem() {

        lightbox.classList.remove("ativo");
        imagemAmpliada.src = "";

        atualizarFundo();

        botaoAmpliar.focus();

    }

    imagemAmpliada.setAttribute("tabindex", "0");
    imagemAmpliada.setAttribute("role", "button");

    imagemAmpliada.addEventListener("keydown", function (evento) {

        if (evento.key === "Enter" || evento.key === " ") {

            evento.preventDefault();

            imagemAmpliada.classList.toggle("zoom");

        }

    });

    botaoAmpliar.addEventListener("click", abrirImagem);

    botaoFecharLightbox.addEventListener("click", fecharImagem);

    imagemAmpliada.addEventListener("click", function () {
        imagemAmpliada.classList.toggle("zoom");
    });

    lightbox.addEventListener("click", function (evento) {
        if (evento.target === lightbox) {
            fecharImagem();
        }
    });

}


/* TECLADO NOS MODAIS */

document.addEventListener("keydown", function (evento) {

    if (!modalAberto() && !imagemAberta()) {
        return;
    }

    if (evento.key === "Escape") {

        evento.preventDefault();

        if (imagemAberta()) {

            const botao = document.getElementById("fecharLightbox");

            if (botao) {
                botao.click();
            }

        } else if (editando) {

            sairEdicao();

            document.getElementById("botaoEditar").focus();

        } else {

            fecharModalDetalhes();

        }

        return;

    }

    if (evento.key === "Tab") {

        const alvo = imagemAberta() ? lightbox : modal;

        const itens = Array.from(alvo.querySelectorAll(FOCAVEIS))
            .filter(visivel);

        if (itens.length === 0) {
            evento.preventDefault();
            return;
        }

        const primeiro = itens[0];
        const ultimo = itens[itens.length - 1];
        const ativo = document.activeElement;
        const janela = alvo.querySelector(".modal");

        if (
            evento.shiftKey &&
            (ativo === primeiro || ativo === janela)
        ) {

            evento.preventDefault();
            ultimo.focus();

        } else if (!evento.shiftKey && ativo === ultimo) {

            evento.preventDefault();
            primeiro.focus();

        }

    }

});


/* FORMULÁRIO DE NOVO MAPA */

function prepararImagem(arquivo, maxLado, callback) {

    const leitor = new FileReader();

    leitor.onload = function (e) {

        const img = new Image();

        img.onload = function () {

            const escala = Math.min(1, maxLado / Math.max(img.width, img.height));

            const canvas = document.createElement("canvas");
            canvas.width = Math.round(img.width * escala);
            canvas.height = Math.round(img.height * escala);

            const ctx = canvas.getContext("2d");
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            callback(canvas.toDataURL("image/jpeg", 0.8));

        };

        img.onerror = function () {
            alert("Não foi possível ler essa imagem.");
        };

        img.src = e.target.result;

    };

    leitor.readAsDataURL(arquivo);

}


const formMapa = document.getElementById("formMapa");

if (formMapa) {

    const campoImagem = document.getElementById("imagem");
    const previa = document.getElementById("previaImagem");

    campoImagem.addEventListener("change", function () {

        const arquivo = campoImagem.files[0];

        if (!arquivo) {
            previa.innerHTML = "<span>Nenhuma imagem selecionada</span>";
            return;
        }

        previa.innerHTML = "";

        const img = document.createElement("img");
        img.src = URL.createObjectURL(arquivo);
        img.alt = "Prévia da imagem escolhida";

        previa.appendChild(img);

    });

    /* Salvar */

    formMapa.addEventListener("submit", function (evento) {

        evento.preventDefault();

        const arquivo = campoImagem.files[0];

        if (!arquivo) {
            alert("Escolha uma imagem.");
            return;
        }

        const nome = document.getElementById("nome").value.trim();
        const descricao = document.getElementById("descricao").value.trim();

        prepararImagem(arquivo, 1200, function (imagemBase64) {

            const mapas = obterMapas();

            mapas.push({
                id: criarId(),
                nome: nome,
                descricao: descricao,
                imagem: imagemBase64
            });

            try {
                salvarMapas(mapas);
            } catch (erro) {
                alert("Não há espaço para guardar essa imagem. " +
                      "Remova algum mapa ou use uma imagem menor.");
                return;
            }

            window.location.href = "mapas.html";

        });

    });

}


/* MAPAS PRÉ-DEFINIDOS */

const botoesAdicionar = document.querySelectorAll(".botao-adicionar");

function adicionarPredefinido(botao) {

    if (botao.classList.contains("adicionado")) {
        return;
    }

    const mapas = obterMapas();

    mapas.push({
        id: criarId(),
        nome: botao.dataset.nome,
        descricao: botao.dataset.descricao || "",
        imagem: botao.dataset.imagem
    });

    try {
        salvarMapas(mapas);
    } catch (erro) {
        alert("Não há espaço para guardar esse mapa. Remova algum mapa existente.");
        return;
    }

    botao.classList.add("adicionado");

    const texto = botao.querySelector(".nome-predefinido");

    if (texto) {
        texto.textContent = "✓ adicionado";
    }

    setTimeout(function () {
        window.location.href = "mapas.html";
    }, 500);

}

botoesAdicionar.forEach(function (botao) {

    botao.addEventListener("click", function () {
        adicionarPredefinido(botao);
    });

    botao.addEventListener("keydown", function (evento) {

        if (evento.key === "Enter" || evento.key === " ") {
            evento.preventDefault();
            adicionarPredefinido(botao);
        }

    });

});