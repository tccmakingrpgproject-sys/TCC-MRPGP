/* FLUXO DE CRIAÇÃO DE FICHA */

(function () {

    /* PÁGINAS DE ARQUÉTIPOS */

    const cardsArquetipo = document.querySelectorAll(".card[data-id]");
    const btnProximo = document.getElementById("btnProximo");

    if (cardsArquetipo.length > 0) {

        const estilo = document.createElement("style");
        estilo.textContent =
            ".card.selecionado{outline:3px solid #d4af37;outline-offset:2px;}" +
            ".card[role='button']{cursor:pointer;}";
        document.head.appendChild(estilo);

        const nomeDoCard = card => {
            const titulo = card.querySelector("h2");
            return titulo ? titulo.textContent.trim() : "";
        };

        const detalhesDoCard = card => {
            const p = card.querySelector(".content p");
            const dados = {
                nome: nomeDoCard(card),
                descricao: "",
                vantagens: "",
                desvantagens: ""
            };

            if (!p) return dados;

            let atual = "descricao";

            p.childNodes.forEach(no => {
                if (no.nodeType === 1 && no.classList.contains("vantagens")) {
                    atual = "vantagens";
                    return;
                }
                if (no.nodeType === 1 && no.classList.contains("desvantagens")) {
                    atual = "desvantagens";
                    return;
                }
                dados[atual] += (no.nodeName === "BR" ? " " : no.textContent) + " ";
            });

            Object.keys(dados).forEach(k => {
                dados[k] = dados[k]
                    .replace(/\s+/g, " ")
                    .replace(/^Desvantagens?:\s*/i, "")
                    .replace(/^Vantagens?:\s*/i, "")
                    .trim();
            });

            return dados;
        };

        const selecionar = card => {
            cardsArquetipo.forEach(c => {
                c.classList.remove("selecionado");
                c.setAttribute("aria-pressed", "false");
            });
            card.classList.add("selecionado");
            card.setAttribute("aria-pressed", "true");
            localStorage.setItem("arquetipoSelecionado", nomeDoCard(card));
            localStorage.setItem("arquetipoDetalhes", JSON.stringify(detalhesDoCard(card)));
        };

        const salvo = localStorage.getItem("arquetipoSelecionado");

        cardsArquetipo.forEach(card => {
            card.setAttribute("tabindex", "0");
            card.setAttribute("role", "button");
            card.setAttribute("aria-pressed", "false");

            if (salvo && nomeDoCard(card) === salvo) {
                card.classList.add("selecionado");
                card.setAttribute("aria-pressed", "true");
            }

            card.addEventListener("click", () => selecionar(card));

            card.addEventListener("keydown", e => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    selecionar(card);
                }
            });
        });

        if (btnProximo) {
            btnProximo.addEventListener("click", e => {
                e.stopImmediatePropagation();

                const escolhido = document.querySelector(".card.selecionado");

                if (!escolhido) {
                    alert("Selecione um arquétipo antes de continuar.");
                    return;
                }

                localStorage.setItem("arquetipoSelecionado", nomeDoCard(escolhido));
                localStorage.setItem("arquetipoDetalhes", JSON.stringify(detalhesDoCard(escolhido)));
                window.location.href = "atributos.html";
            }, true);
        }

        return;
    }

    /* PÁGINA DE ATRIBUTOS */

    const ATRIBUTOS = ["for", "des", "con", "int", "von", "car"];

    if (btnProximo && document.getElementById("for")) {

        btnProximo.addEventListener("click", () => {

            const classe = localStorage.getItem("classeSelecionada");

            if (!classe || localStorage.getItem("criacaoEmAndamento") !== "1") {
                alert("Escolha uma classe para criar a ficha.");
                window.location.href = "classes.html";
                return;
            }

            const dados = {
                classeSelecionada: classe
            };

            const arquetipo = localStorage.getItem("arquetipoSelecionado");
            if (arquetipo) {
                dados.arquetipoSelecionado = arquetipo;

                const detalhes = localStorage.getItem("arquetipoDetalhes");
                try {
                    if (detalhes && JSON.parse(detalhes).nome === arquetipo) {
                        dados.arquetipoDetalhes = detalhes;
                    }
                } catch (erro) {}
            }

            ATRIBUTOS.forEach(id => {
                let valor = Number(document.getElementById(id).value);
                if (isNaN(valor) || valor < 0) valor = 0;
                if (valor > 6) valor = 6;
                dados["atributo_" + id] = String(valor);
            });

            let fichas = [];
            try {
                fichas = JSON.parse(localStorage.getItem("fichasRPG")) || [];
            } catch (erro) {
                fichas = [];
            }

            const id = "ficha_" + Date.now();

            fichas.push({
                id: id,
                nome: "",
                classe: classe,
                arquetipo: arquetipo || "",
                imagem: "",
                dados: dados
            });

            localStorage.setItem("fichasRPG", JSON.stringify(fichas));
            localStorage.setItem("fichaAtivaId", id);
            localStorage.removeItem("criacaoEmAndamento");

            window.location.href = "ficha.html";
        });
    }

})();
