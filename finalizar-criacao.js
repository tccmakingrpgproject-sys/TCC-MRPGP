(function () {
    const botao = document.getElementById('btnProximo');
    const campos = ['for', 'des', 'con', 'int', 'von', 'car'];
    if (!botao || !document.getElementById('for')) return;
    botao.textContent = 'Criar ficha →';

    campos.forEach(id => {
        const salvo = localStorage.getItem('atributo_' + id);
        const campo = document.getElementById(id);
        if (salvo !== null && campo) campo.value = salvo;
    });

    botao.addEventListener('click', function () {
        if (localStorage.getItem('criacaoEmAndamento') !== '1') {
            alert('Comece em Fichas > Criar ficha para iniciar um novo personagem.');
            window.location.href = 'fichas.html';
            return;
        }

        const classe = localStorage.getItem('classeSelecionada') || localStorage.getItem('classe');
        if (!classe) {
            alert('Selecione uma classe antes de continuar.');
            window.location.href = 'classes.html';
            return;
        }

        const arquetipo = localStorage.getItem('arquetipoSelecionado');
        if (!arquetipo) {
            alert('Selecione um arquétipo antes de continuar.');
            const chave = classe.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
            const paginas = { alquimista:'Alquimista.html', barbaro:'barbaro.html', bardo:'bardo.html', bruxo:'Bruxo.html', clerigos:'clerigo.html', clerigo:'clerigo.html', druida:'Druida.html', feiticeiro:'feiticeiro.html', guerreiro:'guerreiro.html', ladino:'ladino.html', mago:'Mago.html', monge:'Monge.html', nobre:'nobre.html', paladino:'Paladino.html', ranger:'Ranger.html', samurai:'samurai.html', vampiro:'vampiro.html', viking:'viking.html', vikings:'viking.html', xama:'xama.html' };
            if (paginas[chave]) window.location.href = paginas[chave];
            return;
        }

        campos.forEach(id => {
            const campo = document.getElementById(id);
            let valor = Number(campo.value);
            if (!Number.isFinite(valor)) valor = 0;
            valor = Math.max(0, Math.min(6, Math.round(valor)));
            campo.value = String(valor);
            localStorage.setItem('atributo_' + id, String(valor));
        });

        let novaFicha;
        try { novaFicha = JSON.parse(localStorage.getItem('novaFicha') || '{"tipo":"personagem"}'); }
        catch (_) { novaFicha = { tipo: 'personagem' }; }

        let fichas;
        try { fichas = JSON.parse(localStorage.getItem('fichasRPG') || '[]'); }
        catch (_) { fichas = []; }

        const id = 'ficha_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
        const dados = {
            classeSelecionada: classe,
            classe: classe,
            arquetipoSelecionado: arquetipo,
            arquetipoDetalhes: localStorage.getItem('arquetipoDetalhes') || JSON.stringify({ nome: arquetipo }),
            atributo_for: localStorage.getItem('atributo_for'),
            atributo_des: localStorage.getItem('atributo_des'),
            atributo_con: localStorage.getItem('atributo_con'),
            atributo_int: localStorage.getItem('atributo_int'),
            atributo_von: localStorage.getItem('atributo_von'),
            atributo_car: localStorage.getItem('atributo_car')
        };
        fichas.push({
            id,
            tipo: novaFicha.tipo || 'personagem',
            relacao: novaFicha.relacao || '',
            nome: '',
            classe,
            arquetipo,
            imagem: '',
            dados
        });
        localStorage.setItem('fichasRPG', JSON.stringify(fichas));
        localStorage.setItem('fichaAtivaId', id);
        localStorage.removeItem('criacaoEmAndamento');
        window.location.href = 'ficha.html';
    });
})();
