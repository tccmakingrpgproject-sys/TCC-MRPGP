/* SALVAMENTO DA FICHA ATIVA */

(function () {

    const CHAVES = [
        "nomePersonagem",
        "personagemStatus",
        "pericias",
        "valoresPericias",
        "dadosHistoria",
        "inventario",
        "ataques",
        "classeSelecionada",
        "classe",
        "arquetipoSelecionado",
        "arquetipoEscolhido",
        "arquetipoDetalhes",
        "atributo_for",
        "atributo_des",
        "atributo_con",
        "atributo_int",
        "atributo_von",
        "atributo_car"
    ];

    const CHAVE_IMAGEM = "imagemPersonagem";

    const idAtivo = localStorage.getItem("fichaAtivaId");
    if (!idAtivo) return;

    function lerFichas() {
        try {
            return JSON.parse(localStorage.getItem("fichasRPG")) || [];
        } catch (erro) {
            return [];
        }
    }

    const ficha = lerFichas().find(f => f.id === idAtivo);
    if (!ficha) return;

    const setOriginal = Storage.prototype.setItem;
    const removeOriginal = Storage.prototype.removeItem;

    /* CARREGAR */

    CHAVES.concat(CHAVE_IMAGEM).forEach(k => removeOriginal.call(localStorage, k));

    Object.keys(ficha.dados || {}).forEach(k => {
        setOriginal.call(localStorage, k, ficha.dados[k]);
    });

    if (ficha.imagem) {
        setOriginal.call(localStorage, CHAVE_IMAGEM, ficha.imagem);
    }

    /* SALVAR */

    function sincronizar() {

        const fichas = lerFichas();
        const i = fichas.findIndex(f => f.id === idAtivo);
        if (i < 0) return;

        const f = fichas[i];
        const dados = {};

        CHAVES.forEach(k => {
            const v = localStorage.getItem(k);
            if (v !== null) dados[k] = v;
        });

        f.dados = dados;
        f.nome = dados.nomePersonagem || "";
        f.imagem = localStorage.getItem(CHAVE_IMAGEM) || "";

        try {
            const s = JSON.parse(dados.personagemStatus);
            f.vidaAtual = s.vida.atual;
            f.vidaMax = s.vida.max;
            f.defesa = s.defesa.atual;
            f.sanidadeAtual = s.sanidade.atual;
            f.sanidadeMax = s.sanidade.max;
        } catch (erro) {}

        try {
            setOriginal.call(localStorage, "fichasRPG", JSON.stringify(fichas));
        } catch (erro) {
            console.error("Não foi possível salvar a ficha:", erro);
            alert("Não foi possível salvar: o armazenamento do navegador está cheio. Tente usar uma imagem menor.");
        }
    }

    const monitoradas = CHAVES.concat(CHAVE_IMAGEM);

    Storage.prototype.setItem = function (chave, valor) {
        setOriginal.call(this, chave, valor);
        if (this === localStorage && monitoradas.indexOf(chave) !== -1) {
            sincronizar();
        }
    };

    Storage.prototype.removeItem = function (chave) {
        removeOriginal.call(this, chave);
        if (this === localStorage && monitoradas.indexOf(chave) !== -1) {
            sincronizar();
        }
    };

    window.addEventListener("pagehide", sincronizar);

})();
