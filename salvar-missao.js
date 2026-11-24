(function () {

    const campos = [
        document.getElementById("missionName"),
        document.getElementById("history"),
        document.getElementById("objectives"),
        document.getElementById("rewards")
    ];

    const botaoSalvar = document.getElementById("salvarMissao");
    const botaoCancelar = document.getElementById("cancelarMissao");

    if (!botaoSalvar) {
        return;
    }


    const PROTEGIDAS = [
        "missoes",
        "mapas",
        "fichasRPG",
        "fichaAtivaId",
        "campaign_name",
        "active_page",
        "campaign_npcs",
        "campaign_missions",
        "campaign_maps"
    ];


    function limparCampos() {

        campos.forEach(function (campo) {

            if (campo) {
                campo.value = "";
            }

        });

    }


    function limparRascunhos() {

        const apagar = [];

        for (let i = 0; i < localStorage.length; i++) {

            const chave = localStorage.key(i);

            if (
                !PROTEGIDAS.includes(chave) &&
                /miss|mission|rascunho|draft|inserir/i.test(chave)
            ) {
                apagar.push(chave);
            }

        }

        apagar.forEach(function (chave) {
            localStorage.removeItem(chave);
        });

        sessionStorage.clear();

    }


    function recomecar() {

        limparRascunhos();
        limparCampos();

    }


    recomecar();

    document.addEventListener("DOMContentLoaded", recomecar);

    window.addEventListener("load", recomecar);

    window.addEventListener("pageshow", recomecar);


    if (botaoCancelar) {

        botaoCancelar.addEventListener("click", recomecar);

    }


    /* Salvar */

    botaoSalvar.addEventListener("click", function () {

        const nome = campos[0].value.trim();
        const historia = campos[1].value.trim();
        const objetivos = campos[2].value.trim();
        const recompensas = campos[3].value.trim();

        if (!nome) {
            alert("Digite o nome da missão.");
            campos[0].focus();
            return;
        }

        let missoes = [];

        try {
            missoes = JSON.parse(localStorage.getItem("missoes")) || [];
        } catch (erro) {
            missoes = [];
        }

        missoes.push({
            id: Date.now().toString() + Math.random().toString(36).substring(2),
            nome: nome,
            descricao: historia,
            mapa: "Não informado",
            dificuldade: "Não informada",
            objetivo: objetivos,
            recompensas: recompensas
        });

        localStorage.setItem("missoes", JSON.stringify(missoes));

        recomecar();

        window.location.href = "missoes.html";

    });

})();