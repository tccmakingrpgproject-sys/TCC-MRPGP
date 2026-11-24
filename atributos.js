const menuToggle = document.getElementById("menuToggle");
const menuLista = document.getElementById("menuLista");

function definirMenu(aberto) {
    menuLista.classList.toggle("aberto", aberto);
    menuToggle.setAttribute("aria-expanded", String(aberto));
    menuToggle.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
}

if (menuToggle && menuLista) {
    menuToggle.addEventListener("click", () => {
        definirMenu(!menuLista.classList.contains("aberto"));
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") definirMenu(false);
    });

    window.matchMedia("(min-width: 769px)").addEventListener("change", (e) => {
        if (e.matches) definirMenu(false);
    });
}