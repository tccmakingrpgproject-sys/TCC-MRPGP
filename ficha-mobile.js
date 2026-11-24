/* NAVEGAÇÃO MOBILE DA FICHA */

(function () {

    const ITENS = [
        { id: "ficha",      rotulo: "Ficha" },
        { id: "pericias",   rotulo: "Perícias" },
        { id: "inventario", rotulo: "Inventário" },
        { id: "ataques",    rotulo: "Ataques" },
        { id: "historia",   rotulo: "História" }
    ];

    const conteudoPrincipal = document.querySelector(".conteudo-principal");
    if (!conteudoPrincipal) return;

    const nav = document.createElement("nav");
    nav.className = "nav-mobile";
    nav.setAttribute("aria-label", "Navegação da ficha");

    ITENS.forEach(item => {
        const botao = document.createElement("button");
        botao.type = "button";
        botao.dataset.alvo = item.id;
        botao.textContent = item.rotulo;
        nav.appendChild(botao);
    });

    document.body.appendChild(nav);

    const botoesNav = Array.from(nav.querySelectorAll("button"));


    function secaoAtual() {
        const ativo = document.querySelector(".menu-botao-ficha.ativo");
        return ativo ? ativo.dataset.secao : "pericias";
    }


    function atualizarAtivo() {

        const topoConteudo = conteudoPrincipal.getBoundingClientRect().top;
        const alvo = topoConteudo > window.innerHeight * 0.6
            ? "ficha"
            : secaoAtual();

        botoesNav.forEach(botao => {
            const ativo = botao.dataset.alvo === alvo;
            botao.classList.toggle("ativo", ativo);
            if (ativo) {
                botao.setAttribute("aria-current", "true");
            } else {
                botao.removeAttribute("aria-current");
            }
        });
    }


    nav.addEventListener("click", evento => {

        const botao = evento.target.closest("button[data-alvo]");
        if (!botao) return;

        const alvo = botao.dataset.alvo;

        if (alvo === "ficha") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        const botaoOriginal = document.querySelector(
            `.menu-botao-ficha[data-secao="${alvo}"]`
        );

        if (botaoOriginal) botaoOriginal.click();

        const y = conteudoPrincipal.getBoundingClientRect().top + window.scrollY - 8;
        window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    });


    const observador = new MutationObserver(atualizarAtivo);

    document.querySelectorAll(".menu-botao-ficha").forEach(botao => {
        observador.observe(botao, { attributes: true, attributeFilter: ["class"] });
    });


    let agendado = false;

    function aoRolar() {
        if (agendado) return;
        agendado = true;
        requestAnimationFrame(() => {
            agendado = false;
            atualizarAtivo();
        });
    }

    window.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("resize", aoRolar);

    atualizarAtivo();

})();
