(function () {
    var carousel = document.querySelector('.carousel');
    if (!carousel) return;

    var cards = Array.prototype.slice.call(carousel.querySelectorAll('.card'));
    var btn = document.getElementById('btnAtributos');
    var dica = document.getElementById('dicaAtributos');
    var titulo = document.querySelector('.arquetipos h2');
    var classe = titulo ? titulo.textContent.trim() : '';
    var CHAVE = 'arquetipoEscolhido';
    var textoDica = dica ? dica.textContent : '';

    function nomeDo(card) {
        var h = card.querySelector('h2');
        return h ? h.textContent.trim() : '';
    }

    function detalhesDo(card) {
        var detalhes = { nome: nomeDo(card), classe: classe, descricao: '', vantagens: '', desvantagens: '' };
        var p = card.querySelector('.content p');
        if (!p) return detalhes;

        var texto = p.textContent.replace(/\s+/g, ' ').trim();
        var m = texto.match(/^(.*?)\s*Vantagens:\s*(.*?)\s*Desvantagens:\s*(.*)$/);
        if (m) {
            detalhes.descricao = m[1].trim();
            detalhes.vantagens = m[2].trim();
            detalhes.desvantagens = m[3].trim();
        } else {
            detalhes.descricao = texto;
        }
        return detalhes;
    }

    function salvar(card) {
        try {
            localStorage.setItem(CHAVE, JSON.stringify({ classe: classe, nome: nomeDo(card) }));
            localStorage.setItem('arquetipoSelecionado', nomeDo(card));
            localStorage.setItem('arquetipoDetalhes', JSON.stringify(detalhesDo(card)));
        } catch (e) {}
    }

    function selecionar(card, salvarEscolha, rolar) {
        cards.forEach(function (c) {
            var ativo = c === card;
            c.classList.toggle('active', ativo);
            c.classList.toggle('selected', ativo);
            c.setAttribute('aria-expanded', ativo ? 'true' : 'false');
        });
        var content = card.querySelector('.content');
        if (content) content.scrollTop = 0;

        if (btn) {
            btn.classList.remove('desativado');
            btn.removeAttribute('aria-disabled');
        }
        if (dica) {
            dica.classList.remove('aviso');
            dica.textContent = 'Arquétipo escolhido: ' + nomeDo(card) + '. Clique em Atributos para continuar.';
        }
        if (salvarEscolha) salvar(card);
        if (rolar) {
            setTimeout(function () {
                card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            }, 470);
        }
    }

    cards.forEach(function (card) {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-expanded', 'false');

        card.addEventListener('click', function () {
            if (!card.classList.contains('active')) selecionar(card, true, true);
        });
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (!card.classList.contains('active')) selecionar(card, true, true);
            }
        });
    });

    if (btn) {
        btn.addEventListener('click', function (e) {
            if (btn.classList.contains('desativado')) {
                e.preventDefault();
                if (dica) {
                    dica.classList.add('aviso');
                    dica.textContent = 'Escolha um arquétipo antes de ir para os atributos.';
                }
            }
        });
    }

    try {
        var salvo = JSON.parse(localStorage.getItem(CHAVE) || 'null');
        if (salvo && salvo.classe === classe) {
            cards.forEach(function (c) {
                if (nomeDo(c) === salvo.nome) selecionar(c, true, true);
            });
        }
    } catch (e) {}

    var down = false, moved = false, startX = 0, startLeft = 0;

    carousel.addEventListener('pointerdown', function (e) {
        if (e.pointerType !== 'mouse' || e.button !== 0) return;
        if (e.target.closest('.card.active .content')) return;
        down = true;
        moved = false;
        startX = e.clientX;
        startLeft = carousel.scrollLeft;
    });

    window.addEventListener('pointermove', function (e) {
        if (!down) return;
        var dx = e.clientX - startX;
        if (Math.abs(dx) > 5) {
            moved = true;
            carousel.classList.add('arrastando');
        }
        if (moved) carousel.scrollLeft = startLeft - dx;
    });

    window.addEventListener('pointerup', function () {
        down = false;
        carousel.classList.remove('arrastando');
    });

    carousel.addEventListener('click', function (e) {
        if (moved) {
            e.stopPropagation();
            e.preventDefault();
            moved = false;
        }
    }, true);
})();