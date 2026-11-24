/* LISTA DE CAMPANHAS */

function lerLista(chave) {

    try {

        const dados = JSON.parse(localStorage.getItem(chave));

        return Array.isArray(dados) ? dados : [];

    } catch (erro) {

        return [];

    }

}


function escaparHTML(texto) {

    const div = document.createElement("div");

    div.textContent = texto;

    return div.innerHTML;

}


function plural(qtd, singular, pluralTxt) {

    return qtd + " " + (qtd === 1 ? singular : pluralTxt);

}


const listaCampanhas = document.getElementById("listaCampanhas");


function mostrarCampanhas() {

    const campanhas = lerLista("campanhas").filter(function (c) {

        return c && c.id;

    });

    listaCampanhas.innerHTML = "";


    if (campanhas.length === 0) {

        listaCampanhas.innerHTML = `
            <div class="sem-missoes">
                <p>Nenhuma campanha adicionada ainda.</p>
            </div>
        `;

        return;

    }


    campanhas.forEach(function (campanha) {

        const npcs = lerLista("campaign_npcs_" + campanha.id).length;
        const missoes = lerLista("campaign_missions_" + campanha.id).length;
        const mapas = lerLista("campaign_maps_" + campanha.id).length;

        const resumo =
            plural(npcs, "NPC", "NPCs") + " · " +
            plural(missoes, "missão", "missões") + " · " +
            plural(mapas, "mapa", "mapas");


        const card = document.createElement("article");

        card.className = "card-missao";

        card.innerHTML = `

            <div class="info-missao">

                <h3 class="nome-missao">
                    ${escaparHTML(campanha.nome || "Campanha sem nome")}
                </h3>

                <p class="descricao-missao">
                    ${resumo}
                </p>

            </div>

            <div class="acoes-missao">

                <button type="button" class="botao-detalhes" data-acao="editar">
                    editar
                </button>

                <button type="button" class="botao-remover" data-acao="remover">
                    remover
                </button>

            </div>

        `;

        card.querySelector('[data-acao="editar"]')
            .addEventListener("click", function () {

                window.location.href =
                    "editar-campanha.html?id=" +
                    encodeURIComponent(campanha.id);

            });

        card.querySelector('[data-acao="remover"]')
            .addEventListener("click", function () {

                removerCampanha(campanha.id);

            });

        listaCampanhas.appendChild(card);

    });

}


function removerCampanha(id) {

    if (!confirm("Deseja realmente remover esta campanha?")) {
        return;
    }

    const restantes = lerLista("campanhas").filter(function (c) {

        return c.id !== id;

    });

    localStorage.setItem("campanhas", JSON.stringify(restantes));

    localStorage.removeItem("campaign_npcs_" + id);
    localStorage.removeItem("campaign_missions_" + id);
    localStorage.removeItem("campaign_maps_" + id);

    mostrarCampanhas();

}


mostrarCampanhas();


window.addEventListener("pageshow", function (evento) {

    if (evento.persisted) {

        mostrarCampanhas();

    }

});
