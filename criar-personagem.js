/* ELEMENTOS DA PÁGINA */

const passoTipo = document.getElementById("passo-tipo");

const passoRelacao = document.getElementById("passo-relacao");

const opcaoPersonagem = document.getElementById("opcao-personagem");

const opcaoNpc = document.getElementById("opcao-npc");

const opcaoAliado = document.getElementById("opcao-aliado");

const opcaoInimigo = document.getElementById("opcao-inimigo");

const botaoVoltarTipo = document.getElementById("voltar-tipo");


/* SALVAR ESCOLHA E CONTINUAR */

function continuarCriacao(tipo, relacao){

    const novaFicha = { tipo: tipo };

    if(relacao){
        novaFicha.relacao = relacao;
    }

    [
        "classeSelecionada", "classe", "arquetipoSelecionado",
        "arquetipoEscolhido", "arquetipoDetalhes", "personagemStatus",
        "atributo_for", "atributo_des", "atributo_con",
        "atributo_int", "atributo_von", "atributo_car",
        "nomePersonagem", "imagemPersonagem", "fichaAtivaId"
    ].forEach(chave => localStorage.removeItem(chave));

    localStorage.setItem("criacaoEmAndamento", "1");

    localStorage.setItem(
        "novaFicha",
        JSON.stringify(novaFicha)
    );


    window.location.href = "classes.html";

}


/* PASSO 1 */

opcaoPersonagem.addEventListener("click", function(){

    continuarCriacao("personagem");

});


opcaoNpc.addEventListener("click", function(){

    passoTipo.hidden = true;

    passoRelacao.hidden = false;

    opcaoAliado.focus();

});


/* PASSO 2 */

opcaoAliado.addEventListener("click", function(){

    continuarCriacao("npc", "aliado");

});


opcaoInimigo.addEventListener("click", function(){

    continuarCriacao("npc", "inimigo");

});


/* VOLTAR PARA O PASSO 1 */

botaoVoltarTipo.addEventListener("click", function(){

    passoRelacao.hidden = true;

    passoTipo.hidden = false;

    opcaoNpc.focus();

});
