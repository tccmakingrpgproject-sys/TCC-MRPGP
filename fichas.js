/* ELEMENTOS DA PÁGINA */

const listaFichas = document.getElementById("lista-fichas");

const botaoCriar = document.getElementById("criarFicha");

const mensagemSemFichas = document.getElementById("sem-fichas");

const abaPersonagens = document.getElementById("aba-personagens");

const abaNpcs = document.getElementById("aba-npcs");

let abaAtual = "personagem";


/* BOTÃO CRIAR FICHA */

botaoCriar.addEventListener("click", function(){

    window.location.href = "criar-personagem.html";

});


/* TROCAR ABA */

function trocarAba(tipo){

    abaAtual = tipo;

    abaPersonagens.classList.toggle("ativa", tipo === "personagem");
    abaNpcs.classList.toggle("ativa", tipo === "npc");

    abaPersonagens.setAttribute("aria-selected", tipo === "personagem");
    abaNpcs.setAttribute("aria-selected", tipo === "npc");

    carregarFichas();

}

abaPersonagens.addEventListener("click", function(){
    trocarAba("personagem");
});

abaNpcs.addEventListener("click", function(){
    trocarAba("npc");
});


/* CARREGAR FICHAS */

function carregarFichas(){

    listaFichas.innerHTML = "";


    const fichas = JSON.parse(
        localStorage.getItem("fichasRPG")
    ) || [];


    const fichasDaAba = fichas
        .map(function(personagem, index){
            return { personagem: personagem, index: index };
        })
        .filter(function(item){
            return (item.personagem.tipo || "personagem") === abaAtual;
        });


    /* NENHUMA FICHA */

    if(fichasDaAba.length === 0){

        mensagemSemFichas.textContent =
            abaAtual === "npc"
                ? "Nenhum NPC criado ainda."
                : "Nenhum personagem criado ainda.";

        mensagemSemFichas.style.display = "block";

        return;
    }


    /* EXISTEM FICHAS */

    mensagemSemFichas.style.display = "none";


    /* CRIAR CADA FICHA */

    fichasDaAba.forEach(function(item){

        const personagem = item.personagem;

        const index = item.index;

        const ficha = document.createElement("div");

        ficha.classList.add("ficha");


        const imagem =
            personagem.imagem ||
            "img/personagem-padrao.png";


        ficha.innerHTML = `

            <!-- FOTO -->

            <div class="ficha-foto">

                <img
                    src="${imagem}"
                    alt="Foto do personagem"
                >

            </div>


            <!-- NOME E CLASSE -->

            <div class="ficha-info">

                <div class="ficha-nome">

                    ${personagem.nome || "Nome do personagem"}

                </div>


                <div class="ficha-classe">

                    ${personagem.classe || "Classe do personagem"}

                </div>

            </div>


            <!-- STATUS -->

            <div class="ficha-status">


                <!-- VIDA -->

                <div class="status">

                    <span>
                        vida:
                    </span>

                    <span>

                        ${personagem.vidaAtual ?? "??"}/${personagem.vidaMax ?? "??"}

                    </span>

                </div>


                <!-- DEFESA -->

                <div class="status">

                    <span>
                        defesa:
                    </span>

                    <span>

                        ${personagem.defesa ?? "??"}

                    </span>

                </div>


                <!-- SANIDADE -->

                <div class="status">

                    <span>
                        sanidade:
                    </span>

                    <span>

                        ${personagem.sanidadeAtual ?? "??"}/${personagem.sanidadeMax ?? "??"}

                    </span>

                </div>


            </div>


            <!-- BOTÃO ABRIR -->

            <button
                class="btn-abrir"
                onclick="abrirFicha(${index})"
            >

                Abrir

            </button>


            <!-- BOTÃO EXCLUIR -->

            <button
                class="btn-excluir"
                onclick="excluirFicha(${index})"
            >

                X

            </button>

        `;


        listaFichas.appendChild(ficha);

    });

}


/* ABRIR FICHA */

function abrirFicha(index){
    const fichas = JSON.parse(localStorage.getItem("fichasRPG") || "[]");
    const ficha = fichas[index];
    if (!ficha) return;

    localStorage.setItem("fichaAtivaId", ficha.id);
    window.location.href = "ficha.html";
}


/* EXCLUIR FICHA */

function excluirFicha(index){

    const confirmar = confirm(
        "Tem certeza que deseja excluir este personagem?"
    );


    if(!confirmar){

        return;
    }


    const fichas = JSON.parse(
        localStorage.getItem("fichasRPG")
    ) || [];


    fichas.splice(index, 1);


    localStorage.setItem(
        "fichasRPG",
        JSON.stringify(fichas)
    );


    carregarFichas();

}


/* INICIAR PÁGINA */

carregarFichas();