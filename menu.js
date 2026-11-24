/* MENU MOBILE */

(function () {

const menu = document.querySelector(".menu");
const menuLista = document.getElementById("menuLista");
const menuToggle = document.getElementById("menuToggle");

if (menu && menuLista && menuToggle) {

    menuToggle.addEventListener("click", () => {

        const aberto = menu.classList.toggle("menu-aberto");

        menuToggle.setAttribute(
            "aria-expanded",
            aberto ? "true" : "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            aberto ? "Fechar menu" : "Abrir menu"
        );
    });

    menuLista.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            if (window.innerWidth <= 480) {

                menu.classList.remove("menu-aberto");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Abrir menu"
                );
            }
        });
    });

    function verificarTamanhoTela() {

        if (window.innerWidth > 480) {

            menu.classList.remove("menu-aberto");

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

    window.addEventListener("resize", verificarTamanhoTela);
}

})();
