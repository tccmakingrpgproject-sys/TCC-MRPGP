(() => {
    const pagina = location.pathname.split('/').pop().toLowerCase();

    if (pagina === 'criar-personagem.html') return;

    let proximo = null;
    let destinoVoltar = 'classes.html';
    let pontoInsercao = null;

    if (pagina === 'classes.html') {
        proximo = document.getElementById('btnProximo');
        destinoVoltar = 'criar-personagem.html';
        pontoInsercao = document.querySelector('.acoes');
    } else if (pagina === 'atributos.html') {
        proximo = document.getElementById('btnProximo');
        destinoVoltar = 'historico';
        pontoInsercao = document.querySelector('.legenda') || document.querySelector('.atributos');
    } else {
        proximo = document.getElementById('btnAtributos');
        destinoVoltar = 'classes.html';
        pontoInsercao = document.querySelector('.acoes');
    }

    const barra = document.createElement('div');
    barra.className = 'navegacao-paginas';

    const voltar = document.createElement('a');
    voltar.className = 'bnt-fichas bnt-voltar';
    voltar.href = destinoVoltar === 'historico' ? 'classes.html' : destinoVoltar;
    voltar.textContent = 'Voltar';

    if (destinoVoltar === 'historico') {
        voltar.addEventListener('click', (evento) => {
            if (history.length > 1) {
                evento.preventDefault();
                history.back();
            }
        });
    }

    barra.appendChild(voltar);

    if (proximo) {
        proximo.textContent = pagina === 'classes.html' ? 'Arquétipos →' :
            (pagina === 'atributos.html' ? 'Criar ficha →' : 'Atributos →');
        barra.appendChild(proximo);
    }

    if (pontoInsercao && pontoInsercao.parentNode) {
        pontoInsercao.insertAdjacentElement('afterend', barra);
    } else {
        document.querySelector('.container, .cont')?.appendChild(barra);
    }
})();