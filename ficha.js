/* NOME DO PERSONAGEM */

const input =
    document.getElementById("nomePersonagem");

const salvarBtn =
    document.getElementById("salvarBtn");

const LIMITE_CARACTERES = 100;


function atualizarInterface() {

    if (!input) return;

    const texto = input.value;

    if (salvarBtn) {

        salvarBtn.style.display =
            texto.length > 0
                ? "block"
                : "none";

    }

}


if (input) {

    input.addEventListener("input", () => {
        atualizarInterface();
    });

}


if (salvarBtn) {

    salvarBtn.addEventListener("click", () => {

        const nome =
            input.value.trim();

        if (nome === "") {

            salvarBtn.style.display =
                "none";

            return;

        }

        if (nome.length > LIMITE_CARACTERES) {

            alert(
                "O nome não pode ter mais de 100 caracteres."
            );

            return;

        }

        localStorage.setItem(
            "nomePersonagem",
            nome
        );

        input.value = nome;

        atualizarInterface();

        salvarBtn.style.display =
            "none";

    });

}


function carregarNome() {

    if (!input) return;

    const nomeSalvo =
        localStorage.getItem(
            "nomePersonagem"
        );

    if (nomeSalvo) {

        input.value =
            nomeSalvo;

        atualizarInterface();

        if (salvarBtn) {

            salvarBtn.style.display =
                "none";

        }

    }

}

carregarNome();


/* IMAGEM */

const imageInput =
    document.getElementById(
        "imageInput"
    );

const uploadButton =
    document.getElementById(
        "uploadButton"
    );

const preview =
    document.getElementById(
        "preview"
    );

const buttons =
    document.getElementById(
        "buttons"
    );

const uploadArea =
    document.getElementById(
        "uploadArea"
    );

const containerFoto =
    document.querySelector(
        ".container-foto"
    );

const removeImageButton =
    document.getElementById(
        "removeImageButton"
    );


if (uploadButton && imageInput) {

    uploadButton.addEventListener(
        "click",
        () => {

            imageInput.click();

        }
    );

}


function mostrarImagem(imagem) {

    if (
        !preview ||
        !buttons ||
        !uploadArea ||
        !containerFoto
    ) {
        return;
    }

    preview.src =
        imagem;

    uploadArea.classList.add(
        "has-image"
    );

    containerFoto.classList.add(
        "has-image"
    );

    preview.style.display =
        "block";

    buttons.style.display =
        "none";

}


if (imageInput) {

    imageInput.addEventListener(
        "change",
        function () {

            const arquivo =
                this.files[0];

            if (!arquivo) return;

            if (
                !arquivo.type.startsWith(
                    "image/"
                )
            ) {

                alert(
                    "Selecione uma imagem válida."
                );

                imageInput.value =
                    "";

                return;

            }

            const reader =
                new FileReader();

            reader.onload =
                function (event) {

                    const imagem =
                        event.target.result;

                    localStorage.setItem(
                        "imagemPersonagem",
                        imagem
                    );

                    mostrarImagem(
                        imagem
                    );

                };

            reader.readAsDataURL(
                arquivo
            );

        }
    );

}


if (removeImageButton) {

    removeImageButton.addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                "imagemPersonagem"
            );

            if (preview) {

                preview.src =
                    "";

                preview.style.display =
                    "none";

            }

            if (imageInput) {

                imageInput.value =
                    "";

            }

            if (uploadArea) {

                uploadArea.classList.remove(
                    "has-image"
                );

            }

            if (containerFoto) {

                containerFoto.classList.remove(
                    "has-image"
                );

            }

            if (buttons) {

                buttons.style.display =
                    "flex";

            }

        }
    );

}


function carregarImagemSalva() {

    if (
        !preview ||
        !uploadArea ||
        !containerFoto ||
        !buttons
    ) {
        return;
    }

    const imagemSalva =
        localStorage.getItem(
            "imagemPersonagem"
        );

    if (imagemSalva) {

        mostrarImagem(
            imagemSalva
        );

    } else {

        preview.style.display =
            "none";

        uploadArea.classList.remove(
            "has-image"
        );

        containerFoto.classList.remove(
            "has-image"
        );

        buttons.style.display =
            "flex";

    }

}

carregarImagemSalva();


/* CLASSES */

const CLASSES = {

    bárbaro: {
        vida: 140,
        defesa: 90,
        sanidade: 70
    },

    bardo: {
        vida: 110,
        defesa: 75,
        sanidade: 90
    },

    alquimista: {
        vida: 100,
        defesa: 75,
        sanidade: 80
    },

    mago: {
        vida: 110,
        defesa: 80,
        sanidade: 80
    },

    feiticeiro: {
        vida: 120,
        defesa: 75,
        sanidade: 80
    },

    bruxo: {
        vida: 115,
        defesa: 75,
        sanidade: 70
    },

    druida: {
        vida: 105,
        defesa: 70,
        sanidade: 90
    },

    rangers: {
        vida: 140,
        defesa: 85,
        sanidade: 70
    },

    clérigos: {
        vida: 120,
        defesa: 80,
        sanidade: 80
    },

    paladino: {
        vida: 130,
        defesa: 80,
        sanidade: 80
    },

    guerreiro: {
        vida: 150,
        defesa: 100,
        sanidade: 80
    },

    monge: {
        vida: 120,
        defesa: 75,
        sanidade: 100
    },

    ladino: {
        vida: 100,
        defesa: 70,
        sanidade: 90
    },

    vikings: {
        vida: 150,
        defesa: 100,
        sanidade: 70
    },

    nobre: {
        vida: 110,
        defesa: 70,
        sanidade: 80
    },

    xamã: {
        vida: 120,
        defesa: 75,
        sanidade: 90
    },

    samurai: {
        vida: 150,
        defesa: 100,
        sanidade: 70
    },

    vampiro: {
        vida: 120,
        defesa: 100,
        sanidade: 60
    }

};


CLASSES.ranger = CLASSES.rangers;
CLASSES.viking = CLASSES.vikings;


/* PERSONAGEM */

let personagem = {

    classe: null,

    vida: {
        atual: 0,
        max: 0
    },

    defesa: {
        atual: 0,
        max: 0
    },

    sanidade: {
        atual: 0,
        max: 0
    }

};


/* BANCO DE DADOS */

const BancoDados = {

    salvar(dados) {

        localStorage.setItem(
            "personagemStatus",
            JSON.stringify(dados)
        );

    },

    carregar() {

        const dados =
            localStorage.getItem(
                "personagemStatus"
            );

        if (!dados) {

            return null;

        }

        try {

            return JSON.parse(
                dados
            );

        } catch (erro) {

            console.error(
                "Erro ao carregar personagem:",
                erro
            );

            return null;

        }

    }

};


/* CLASSE SELECIONADA */

function pegarClasseSelecionada() {

    return (
        localStorage.getItem(
            "classeSelecionada"
        ) ||
        localStorage.getItem(
            "classe"
        )
    );

}


function criarPersonagem(classe) {

    const dadosClasse =
        CLASSES[classe];

    if (!dadosClasse) {

        return;

    }

    personagem = {

        classe: classe,

        vida: {
            atual: dadosClasse.vida,
            max: dadosClasse.vida
        },

        defesa: {
            atual: dadosClasse.defesa,
            max: dadosClasse.defesa
        },

        sanidade: {
            atual: dadosClasse.sanidade,
            max: dadosClasse.sanidade
        }

    };

    BancoDados.salvar(
        personagem
    );

}


function iniciarPersonagem() {

    const personagemSalvo =
        BancoDados.carregar();

    if (personagemSalvo) {

        personagem =
            personagemSalvo;

        atualizarTela();

        return;

    }

    const classe =
        pegarClasseSelecionada();

    if (!classe) {

        console.warn(
            "Nenhuma classe foi selecionada."
        );

        return;

    }

    criarPersonagem(
        classe.toLowerCase()
    );

    atualizarTela();

}


/* ALTERAR STATUS */

function alterarStatus(
    status,
    quantidade
) {

    if (!personagem[status]) {

        return;

    }

    const valor =
        quantidade > 0
            ? 1
            : -1;

    personagem[status].atual +=
        valor;

    if (
        personagem[status].atual < 0
    ) {

        personagem[status].atual =
            0;

    }

    if (
        personagem[status].atual >
        personagem[status].max
    ) {

        personagem[status].atual =
            personagem[status].max;

    }

    atualizarTela();

    BancoDados.salvar(
        personagem
    );

}


function atualizarTela() {

    const vidaAtual =
        document.getElementById(
            "vidaAtual"
        );

    const vidaMax =
        document.getElementById(
            "vidaMax"
        );

    const defesaAtual =
        document.getElementById(
            "defesaAtual"
        );

    const defesaMax =
        document.getElementById(
            "defesaMax"
        );

    const sanidadeAtual =
        document.getElementById(
            "sanidadeAtual"
        );

    const sanidadeMax =
        document.getElementById(
            "sanidadeMax"
        );


    if (vidaAtual) {

        vidaAtual.textContent =
            personagem.vida.atual;

    }

    if (vidaMax) {

        vidaMax.textContent =
            personagem.vida.max;

    }

    if (defesaAtual) {

        defesaAtual.textContent =
            personagem.defesa.atual;

    }

    if (defesaMax) {

        defesaMax.textContent =
            personagem.defesa.max;

    }

    if (sanidadeAtual) {

        sanidadeAtual.textContent =
            personagem.sanidade.atual;

    }

    if (sanidadeMax) {

        sanidadeMax.textContent =
            personagem.sanidade.max;

    }

}


/* PERÍCIAS */

const VALOR_INICIAL_PERICIA_CLASSE = 5;


const PERICIAS_DA_CLASSE = {
    alquimista: ["Alquimia", "Apotecário", "Prestidigitação"],
    barbaro: ["Intimidação", "Sobrevivência", "Atletismo"],
    bardo: ["Artes", "Persuasão", "Diplomacia"],
    bruxo: ["Religião", "Alquimia", "Arcanismo"],
    clerigo: ["Religião", "Intuição", "Persuasão"],
    druida: ["Sobrevivência", "Apotecário", "Intuição"],
    feiticeiro: ["Arcanismo", "Diplomacia", "Intuição"],
    guerreiro: ["Atletismo", "Esquiva", "Intimidação"],
    ladino: ["Crime", "Furtividade", "Blefe"],
    mago: ["Arcanismo", "Religião", "Intuição"],
    monge: ["Religião", "Atletismo", "Esquiva"],
    nobre: ["Intimidação", "Sobrevivência", "Atletismo"],
    paladino: ["Etiqueta", "Medicina", "Atletismo"],
    ranger: ["Sobrevivência", "Furtividade", "Intuição"],
    samurai: ["Atletismo", "Intimidação", "Percepção"],
    vampiro: ["Persuasão", "Esquiva", "Atletismo"],
    viking: ["Sobrevivência", "Atletismo", "Diplomacia"],
    xama: ["Medicina", "Sobrevivência", "Religião"]
};


const ALIAS_CLASSE = {
    clerigos: "clerigo",
    rangers: "ranger",
    vikings: "viking",
    xamas: "xama",
    barbaros: "barbaro"
};


const todasPericias = [

    "Alquimia",
    "Apotecário",
    "Arcanismo",
    "Artes",
    "Atletismo",
    "Blefe",
    "Crime",
    "Diplomacia",
    "Esquiva",
    "Etiqueta",
    "Furtividade",
    "Intimidação",
    "Intuição",
    "Investigação",
    "Medicina",
    "Percepção",
    "Persuasão",
    "Prestidigitação",
    "Religião",
    "Sobrevivência"

].sort(
    (a, b) => a.localeCompare(b, "pt-BR")
);


const conteudo =
    document.getElementById(
        "conteudo"
    );

const tituloSecao =
    document.getElementById(
        "titulo-secao"
    );

const botoesMenu =
    document.querySelectorAll(
        ".menu-botao-ficha"
    );


function normalizarTexto(texto) {

    return String(texto || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();

}


function obterClasse() {

    const classeSalva =
        localStorage.getItem(
            "classe"
        ) ||
        localStorage.getItem(
            "classeSelecionada"
        );

    if (!classeSalva) {

        return null;

    }

    const chave =
        normalizarTexto(
            classeSalva
        );

    return ALIAS_CLASSE[chave] || chave;

}


function lerValoresPericias() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "valoresPericias"
            )
        ) || {};

    } catch (erro) {

        return {};

    }

}


function prepararValoresPericias(
    classe,
    periciasDaClasse
) {

    let valores =
        lerValoresPericias();

    if ("Blefar" in valores) {

        if (!("Blefe" in valores)) {

            valores.Blefe =
                valores.Blefar;

        }

        delete valores.Blefar;

    }

    const marcador =
        localStorage.getItem(
            "periciasClasseAplicada"
        );

    const classeAtual =
        classe || "";

    if (marcador !== classeAtual) {

        if (marcador !== null) {

            valores = {};

        }

        periciasDaClasse.forEach(
            pericia => {

                if (!(pericia in valores)) {

                    valores[pericia] =
                        VALOR_INICIAL_PERICIA_CLASSE;

                }

            }
        );

        localStorage.setItem(
            "periciasClasseAplicada",
            classeAtual
        );

    }

    localStorage.setItem(
        "valoresPericias",
        JSON.stringify(
            valores
        )
    );

    return valores;

}


/* MOSTRAR PERÍCIAS */

function mostrarPericias() {

    if (!conteudo || !tituloSecao) {

        return;

    }

    tituloSecao.textContent =
        "Perícias";

    const classe =
        obterClasse();

    const periciasDaClasse =
        PERICIAS_DA_CLASSE[classe] || [];

    const outrasPericias =
        todasPericias.filter(
            pericia =>
                !periciasDaClasse.includes(
                    pericia
                )
        );

    const listaFinal = [
        ...periciasDaClasse,
        ...outrasPericias
    ];

    const valoresSalvos =
        prepararValoresPericias(
            classe,
            periciasDaClasse
        );

    const opcoes = [0, 5, 10, 15, 20];


    let html = `

        <div class="pericias-container">

            <div class="pericias-lista">

    `;


    listaFinal.forEach(
        pericia => {

            const daClasse =
                periciasDaClasse.includes(
                    pericia
                );

            const valor =
                Number(
                    valoresSalvos[
                        pericia
                    ] ?? 0
                );

            const nome =
                escapeHTML(
                    pericia
                );

            html += `

                <div class="pericia${
                    daClasse
                        ? " predefinida"
                        : ""
                }">

                    <span class="pericia-nome">
                        ${nome}${
                            daClasse
                                ? ` <span class="pericia-tag">da classe</span>`
                                : ""
                        }
                    </span>

                    <select
                        class="pericia-numero"
                        data-pericia="${nome}"
                        aria-label="Valor de ${nome}"
                    >

                        ${opcoes.map(
                            opcao => `
                                <option
                                    value="${opcao}"
                                    ${
                                        valor === opcao
                                            ? "selected"
                                            : ""
                                    }
                                >
                                    ${opcao}
                                </option>
                            `
                        ).join("")}

                    </select>

                </div>

            `;

        }
    );


    html += `

            </div>

        </div>

    `;

    conteudo.innerHTML =
        html;


    document
        .querySelectorAll(
            ".pericia-numero"
        )
        .forEach(
            select => {

                select.addEventListener(
                    "change",
                    () => {

                        const valores =
                            lerValoresPericias();

                        valores[
                            select.dataset.pericia
                        ] =
                            Number(
                                select.value
                            );

                        localStorage.setItem(
                            "valoresPericias",
                            JSON.stringify(
                                valores
                            )
                        );

                    }
                );

            }
        );

}


/* ARQUÉTIPO */

function lerJSONSalvo(chave) {

    try {

        return JSON.parse(
            localStorage.getItem(
                chave
            )
        );

    } catch (erro) {

        return null;

    }

}


const ARQUETIPOS_DADOS = {
  "alquimistas": [
    {
      "nome": "Transmutador",
      "descricao": "Alquimistas que estudam a transformação da matéria. Conseguem alterar propriedades de objetos, criar substâncias especiais e transformar materiais comuns em recursos extremamente úteis.",
      "vantagens": "Pode modificar materiais e criar soluções para diferentes situações, sendo extremamente versátil fora e dentro do combate.",
      "desvantagens": "Muitas de suas melhores criações precisam ser preparadas com antecedência, tornando-o menos eficiente quando é pego de surpresa."
    },
    {
      "nome": "Bombardeiro",
      "descricao": "Alquimistas que transformaram a criação de bombas, granadas e substâncias destrutivas em uma verdadeira arte. São especialistas em causar dano em grupos de inimigos e controlar áreas perigosas.",
      "vantagens": "Suas criações podem causar dano em área, permitindo atingir vários inimigos de uma vez.",
      "desvantagens": "Suas melhores criações dependem de materiais e preparados, que podem acabar durante uma aventura."
    },
    {
      "nome": "Toxicologista",
      "descricao": "Alquimistas especializados em toxinas, antídotos e substâncias debilitantes. Em vez de derrotar seus inimigos através da força, enfraquecem seus corpos até que se tornem incapazes de continuar lutando.",
      "vantagens": "Pode aplicar diferentes efeitos negativos aos inimigos, reduzindo sua força, velocidade ou capacidade de combate.",
      "desvantagens": "Criaturas resistentes a venenos ou que não podem ser afetadas por toxinas reduzem bastante sua eficácia."
    },
    {
      "nome": "Mutagênico",
      "descricao": "Alquimistas que utilizam suas próprias criações para alterar temporariamente o corpo. Bebem fórmulas especiais que aumentam força, velocidade, sentidos ou resistência, transformando-se em combatentes muito mais perigosos.",
      "vantagens": "Pode alterar suas características físicas para se adaptar ao combate e obter diferentes bônus.",
      "desvantagens": "O uso excessivo dos mutagênicos pode causar efeitos negativos temporários, como fraqueza, tontura ou perda de controle."
    },
    {
      "nome": "Herbalista",
      "descricao": "Alquimistas especializados em ervas, poções e substâncias medicinais. São responsáveis por tratar ferimentos, produzir antídotos e manter o grupo preparado para enfrentar doenças e condições perigosas.",
      "vantagens": "Pode produzir curativos, antídotos e preparados que restauram ou fortalecem os aliados.",
      "desvantagens": "Precisa encontrar ervas e outros componentes para manter seu estoque de poções."
    },
    {
      "nome": "Alquimista Arcano",
      "descricao": "Alquimistas que combinam conhecimento científico com energia mágica. Criam poções, cristais e artefatos capazes de reproduzir efeitos sobrenaturais sem depender exclusivamente de magia tradicional.",
      "vantagens": "Pode criar preparados com efeitos mágicos variados, oferecendo grande versatilidade.",
      "desvantagens": "Suas criações exigem conhecimento, materiais e preparação, tornando seu estilo mais difícil de dominar do que o de outros arquétipos."
    }
  ],
  "bruxo": [
    {
      "nome": "Arquifada",
      "descricao": "Bruxos que fizeram pacto com uma poderosa entidade feérica. Usam ilusões, manipulação emocional e truques mágicos para confundir inimigos, com personalidade misteriosa, brincalhona ou cruel.",
      "vantagens": "Recebe vantagem em testes envolvendo ilusão, encanto, persuasão ou enganação. Também é mais resistente a efeitos de sono e encantamento.",
      "desvantagens": "Tem dificuldade em resistir a impulsos ou emoções intensas. Magias podem produzir efeitos inesperados a critério do mestre quando estiver sob forte estresse."
    },
    {
      "nome": "Corruptor",
      "descricao": "Bruxos que selaram pactos com demônios ou entidades infernais. Suas magias são violentas e explosivas, marcadas por fogo sobrenatural, e muitos carregam marcas físicas do pacto.",
      "vantagens": "Magias de fogo e energia sombria causam +10 de dano adicional ou ignoram parte da resistência de criaturas comuns.",
      "desvantagens": "Possui uma aura perturbadora. Sofre desvantagem em testes sociais com pessoas de boa índole e é facilmente identificado por entidades sagradas."
    },
    {
      "nome": "Grande Antigo",
      "descricao": "Bruxos ligados a entidades incompreensíveis de além da realidade. Seus poderes envolvem mente, medo e conhecimento proibido, afetando pensamentos, sonhos e sanidade.",
      "vantagens": "Recebe vantagem em testes de investigação, ocultismo e resistência contra efeitos mentais. Pode se comunicar por telepatia em curta distância.",
      "desvantagens": "Após usar magias muito poderosas, pode sofrer confusão, alucinações ou perder momentaneamente a concentração"
    },
    {
      "nome": "Lâmina Hexagonal",
      "descricao": "Bruxos que fizeram pacto com uma arma amaldiçoada ou uma entidade ligada às sombras e à guerra. Combinam magia sombria e habilidade marcial, lutando na linha de frente.",
      "vantagens": "Pode canalizar magia através da arma, usando o atributo mágico para atacar e fortalecendo golpes corpo a corpo.",
      "desvantagens": "Quando está sem sua arma pactuada, suas magias ofensivas e capacidade de combate ficam reduzidas."
    },
    {
      "nome": "O Celestial",
      "descricao": "Bruxos que fizeram pacto com entidades de planos superiores, como anjos e espíritos sagrados. Usam luz radiante para proteger e curar, mas ainda lidam com o preço do pacto.",
      "vantagens": "Pode curar aliados e causa dano extra contra mortos-vivos e demônios. Também possui resistência à energia radiante.",
      "desvantagens": "Atos extremamente cruéis ou egoístas podem enfraquecer temporariamente seus poderes até que repare suas ações."
    },
    {
      "nome": "O Fathomless",
      "descricao": "Bruxos que fizeram pacto com entidades das profundezas do oceano, como krakens e leviatãs. Invocam tentáculos de água e controlam correntes com um poder silencioso e perigoso.",
      "vantagens": "Respira debaixo d'água, nada com grande velocidade e suas magias aquáticas ficam mais fortes em ambientes úmidos ou submersos.",
      "desvantagens": "Em regiões muito secas ou desérticas, sofre redução na eficácia de algumas magias e sente constante desconforto físico."
    },
    {
      "nome": "Morto-Vivo",
      "descricao": "Bruxos que servem a entidades que desafiam a morte, como liches e vampiros. Suas magias evocam medo e drenam vitalidade, e sua presença é fria e perturbadora.",
      "vantagens": "Grande resistência a venenos, doenças e efeitos de necromancia. Também pode recuperar parte da vitalidade ao derrotar inimigos.",
      "desvantagens": "Magias de cura são menos eficazes nele, e sua presença causa desconfiança ou medo em pessoas comuns."
    }
  ],
  "druida": [
    {
      "nome": "Círculo da Terra",
      "descricao": "Druidas que dedicam suas vidas à proteção de um ambiente específico, como florestas, desertos, montanhas, pântanos ou campos. Sua conexão com a natureza é tão profunda que conseguem canalizar a energia do próprio terreno, tornando-se mestres da magia e guardiões do equilíbrio natural.",
      "vantagens": "Recupera parte da energia mágica mais facilmente durante descansos e recebe bônus em magias relacionadas ao terreno ao qual pertence.",
      "desvantagens": "Longe de seu ambiente natural, algumas magias perdem eficácia e sua conexão com a natureza se torna mais fraca."
    },
    {
      "nome": "Círculo da Lua",
      "descricao": "Esses druidas enxergam a Forma Selvagem como sua maior força. Em vez de depender apenas de magias, transformam-se em criaturas ferozes para enfrentar inimigos diretamente, lutando com garras, presas e instintos animais.",
      "vantagens": "Pode assumir formas mais fortes, transformar-se mais rapidamente e recuperar parte da vida enquanto está transformado.",
      "desvantagens": "Após permanecer muito tempo transformado ou sofrer grande estresse, pode agir por impulso, dificultando ações que exijam raciocínio ou diplomacia."
    },
    {
      "nome": "Círculo do Pastor",
      "descricao": "Druidas que servem como intermediários entre o mundo natural e os espíritos da floresta. Invocam entidades espirituais e totens sagrados para proteger aliados, fortalecer companheiros e guiar criaturas da natureza durante o combate.",
      "vantagens": "Pode invocar espíritos que concedem cura, proteção ou aumento de força para aliados e criaturas convocadas.",
      "desvantagens": "Seu potencial de dano direto é menor, dependendo mais do trabalho em equipe e de invocações para alcançar todo seu poder."
    },
    {
      "nome": "Círculo dos Esporos",
      "descricao": "Esses druidas acreditam que a morte e a decomposição são partes essenciais do ciclo da vida. Eles manipulam fungos, esporos e formas microscópicas de vida para espalhar doenças, enfraquecer inimigos e até reanimar corpos temporariamente, mostrando que até a morte pode gerar nova vida.",
      "vantagens": "Inimigos próximos sofrem dano necrótico contínuo, e o druida recebe maior resistência em combate corpo a corpo. Também pode animar mortos temporariamente.",
      "desvantagens": "Sua presença causa desconforto em animais e pessoas comuns, e seus poderes têm eficácia reduzida em ambientes extremamente puros ou sagrados."
    }
  ],
  "mago": [
    {
      "nome": "Envocador",
      "descricao": "É o mago que domina energias puras e destrutivas. Ele manipula forças como fogo, gelo, raio ou explosões mágicas para causar dano direto aos inimigos. Esse tipo de mago costuma ser muito poderoso em combate, sendo capaz de lançar ataques que atingem várias pessoas ou causam grande impacto no campo de batalha. Sua magia é intensa, rápida e muitas vezes visualmente impressionante",
      "vantagens": "+5 em danos em áreas, e pode se vincular as seguintes magias (fogo, gelo, trovão, vento e água).",
      "desvantagens": "-5 em defesa e em teste de resistências."
    },
    {
      "nome": "Necromante",
      "descricao": "Trabalha com as forças da vida e da morte. Ele estuda energia vital, espíritos e o mundo dos mortos. Dependendo da história, pode invocar esqueletos, controlar mortos-vivos ou manipular a energia da morte para enfraquecer inimigos. Apesar de muitas vezes se associar a magia sombria, o necromante também pode ter um lado mais filosófico, estudando o ciclo natural da vida e tentando compreender o que existe além da morte.",
      "vantagens": "Pode invocar uma exércitos de mortos-vivos, causando +5 com um exército pequeno, +10 com exército grande.",
      "desvantagens": "-5 em qualquer teste de aparência"
    },
    {
      "nome": "Ilusionista",
      "descricao": "É um mestre em enganar os sentidos. Em vez de atacar diretamente, ele cria imagens falsas, altera sons, distorce percepções ou faz inimigos acreditarem em coisas que não são reais. Esse tipo de magia pode ser usado para confundir adversários, esconder aliados ou manipular situações sem precisar lutar. O poder do ilusionista está mais na mente das pessoas do que na força bruta",
      "vantagens": "+5 em testes de enganação e manipulação.",
      "desvantagens": "-5 em teste de força e ataques."
    },
    {
      "nome": "Abjurador",
      "descricao": "É o especialista em proteção. Sua magia cria barreiras, escudos e selamentos capazes de bloquear ataques ou impedir criaturas perigosas de agir. Ele também pode banir entidades mágicas ou neutralizar feitiços inimigos.",
      "vantagens": "+10 em todos os testes de defesa.",
      "desvantagens": "-10 em todos os testes de combates."
    },
    {
      "nome": "Transmutador",
      "descricao": "Foca em transformar a realidade física. Ele pode alterar a forma de objetos, mudar propriedades de matérias ou até modificar o corpo de criaturas. Essa magia pode ser usada de várias formas, como transformar pedra em metal, aumentar a força de alguém ou adaptar o ambiente ao redor. É um tipo de magia muito versátil, baseada na ideia de que tudo pode ser alterado.",
      "vantagens": "+2 pontos em 4 habilidades que quiser.",
      "desvantagens": "—"
    },
    {
      "nome": "Conjurador",
      "descricao": "É especialista em trazer coisas de outros lugares ou planos de existência. Ele pode invocar criaturas para ajudá-lo, transportar objetos mágicos ou abrir portais temporários. Esse tipo de magia conecta diferentes mundos e dimensões, permitindo que o mago utilize aliados ou recursos que normalmente não estariam presentes naquele lugar.",
      "vantagens": "Pode invocar criaturas e objetos ao mesmo tempo em apenas uma rodada",
      "desvantagens": "Ao invocar algo gasta muito energia e fica indefeso e fica uma rodada se recuperando."
    }
  ],
  "monges": [
    {
      "nome": "Caminho da Mão Aberta",
      "descricao": "Monges que seguem a tradição mais clássica das artes marciais. Aperfeiçoam o próprio corpo e utilizam golpes rápidos, precisos e desarmados para controlar seus inimigos e dominar o combate corpo a corpo.",
      "vantagens": "Seus golpes podem derrubar, afastar ou impedir que inimigos reajam adequadamente, oferecendo excelente controle de combate.",
      "desvantagens": "Precisa estar próximo dos inimigos para aproveitar todo seu potencial, ficando mais exposto a ataques."
    },
    {
      "nome": "Caminho do Kensei",
      "descricao": "Monges que transformam armas em uma extensão de seu próprio corpo. Treinam com espadas, arcos e outras armas até alcançar uma precisão extraordinária, combinando técnicas marciais com seu domínio do equipamento.",
      "vantagens": "Possui grande versatilidade com armas corpo a corpo e à distância, podendo aumentar sua precisão e eficiência durante o combate.",
      "desvantagens": "Parte de suas melhores habilidades depende de possuir suas armas adequadas, tornando-se menos eficiente quando desarmado."
    },
    {
      "nome": "Caminho do Mestre Bêbado",
      "descricao": "Monges que imitam os movimentos imprevisíveis de alguém embriagado. Cambaleiam, mudam de direção repentinamente e transformam movimentos aparentemente desajeitados em técnicas extremamente eficientes.",
      "vantagens": "Possui excelente mobilidade e consegue escapar de ataques com facilidade, podendo se reposicionar rapidamente depois de atacar.",
      "desvantagens": "Seu estilo depende de movimento constante e posicionamento. Em espaços apertados ou quando impedido de se mover, perde parte de sua eficiência."
    },
    {
      "nome": "Caminho do Eu Astral",
      "descricao": "Monges capazes de manifestar uma forma espiritual através de sua energia interior. Braços, rosto e corpo astrais surgem ao seu redor, permitindo que lutem a uma distância maior e canalizem sua força espiritual através dos golpes.",
      "vantagens": "A manifestação espiritual aumenta seu alcance e permite utilizar a Sabedoria de maneira mais significativa em seus ataques e habilidades.",
      "desvantagens": "Manifestar e manter seus poderes astrais exige bastante energia, limitando seu uso durante combates prolongados."
    },
    {
      "nome": "Caminho da Misericórdia",
      "descricao": "Monges que dominam o poder de controlar a energia vital. Utilizam máscaras misteriosas e técnicas especiais capazes tanto de restaurar a saúde dos aliados quanto de enfraquecer seus inimigos.",
      "vantagens": "Pode alternar entre cura e dano, tornando-se extremamente versátil e útil em praticamente qualquer grupo.",
      "desvantagens": "Suas melhores técnicas dependem de pontos de Ki, exigindo cuidado para não gastar toda sua energia rapidamente."
    },
    {
      "nome": "Caminho das Sombras",
      "descricao": "Monges que aprenderam a utilizar o Ki para manipular sombras e permanecer escondidos. Agem como ninjas, aparecendo de lugares inesperados e desaparecendo antes que seus inimigos possam reagir.",
      "vantagens": "Possui excelente furtividade, mobilidade e capacidade de surpreender inimigos, sendo perfeito para infiltração e ataques rápidos.",
      "desvantagens": "Seu potencial é maior em locais com pouca luz. Ambientes extremamente iluminados dificultam suas estratégias de furtividade."
    },
    {
      "nome": "Caminho dos Quatro Elementos",
      "descricao": "Monges que aprenderam a canalizar o Ki para controlar os elementos naturais. Podem manipular fogo, água, terra e ar, transformando suas artes marciais em manifestações elementais.",
      "vantagens": "Possui grande variedade de habilidades mágicas, podendo adaptar seus ataques a diferentes situações.",
      "desvantagens": "Suas técnicas elementais gastam bastante energia, podendo deixar o monge sem recursos para suas habilidades marciais."
    },
    {
      "nome": "Caminho da Alma do Sol",
      "descricao": "Monges que transformam sua energia interior em poder radiante. Em vez de depender apenas do combate corpo a corpo, conseguem lançar rajadas de energia à distância, tornando-se lutadores extremamente versáteis.",
      "vantagens": "Pode atacar inimigos à distância com energia espiritual, mantendo sua mobilidade sem precisar entrar diretamente no combate corpo a corpo.",
      "desvantagens": "Seus ataques de energia consomem Ki, limitando a frequência com que pode utilizá-los."
    },
    {
      "nome": "Caminho da Longa Morte",
      "descricao": "Monges obcecados pelo mistério da mortalidade. Estudam a morte e o medo para fortalecer seus próprios corpos, tornando-se combatentes extremamente resistentes e difíceis de derrotar.",
      "vantagens": "Consegue resistir a situações que normalmente derrubariam outros combatentes e pode utilizar o medo dos inimigos contra eles.",
      "desvantagens": "Sua conexão com a morte pode assustar ou afastar pessoas comuns, dificultando interações sociais e fazendo com que outros desconfiem dele."
    }
  ],
  "paladino": [
    {
      "nome": "Juramento da Devoção",
      "descricao": "Paladinos que seguem os ideais tradicionais de honra, justiça e bondade. São guerreiros sagrados que utilizam a luz divina para proteger seus companheiros e combater forças malignas.",
      "vantagens": "Aura Sagrada Fortalece aliados próximos, oferecendo proteção contra efeitos negativos e aumentando sua resistência.",
      "desvantagens": "Código de Honra: Quebrar seus princípios pode trazer consequências, limitando suas ações em situações moralmente duvidosas."
    },
    {
      "nome": "Juramento da Vingança",
      "descricao": "Paladinos que dedicam sua vida à caça e destruição daqueles que consideram responsáveis por grandes males. São excelentes perseguidores e duelistas, concentrando seu poder em eliminar alvos específicos.",
      "vantagens": "Inimigo Jurado Pode concentrar seus poderes em um inimigo específico, aumentando sua capacidade de causar dano e persegui-lo.",
      "desvantagens": "Obstinação Sua busca por vingança pode fazê-lo ignorar outros perigos ou tomar decisões impulsivas para alcançar seu alvo."
    },
    {
      "nome": "Juramento dos Anciões",
      "descricao": "Paladinos que juram proteger a vida, a natureza e a esperança. Mantêm uma ligação com forças antigas e naturais, utilizando sua energia divina para proteger aliados e combater aqueles que ameaçam a vida.",
      "vantagens": "Guardião da Vida Possui grande resistência contra magia e pode proteger e recuperar seus aliados com eficiência.",
      "desvantagens": "Proteção Excessiva Seu compromisso em preservar a vida pode dificultar decisões que exijam sacrificar alguém ou destruir um inimigo sem necessidade."
    },
    {
      "nome": "Juramento da Redenção",
      "descricao": "Paladinos que acreditam que até mesmo inimigos podem mudar. Preferem resolver conflitos através da conversa e da diplomacia, mas não hesitam em lutar quando seus companheiros estão ameaçados.",
      "vantagens": "Pacificador consegue reduzir conflitos, proteger aliados e transformar parte do dano recebido pelos companheiros em uma oportunidade de contra-atacar.",
      "desvantagens": "Relutância em Lutar evita causar dano desnecessário, podendo ter dificuldades quando a única solução é enfrentar o inimigo diretamente."
    },
    {
      "nome": "Juramento da Conquista",
      "descricao": "Paladinos que acreditam que a ordem só pode existir através da força e da autoridade. Utilizam o medo como arma, dominando o campo de batalha e fazendo inimigos hesitarem diante de seu poder.",
      "vantagens": "Presença Aterradora pode intimidar e amedrontar inimigos, reduzindo sua capacidade de lutar ou se aproximar.",
      "desvantagens": "Tirania sua abordagem baseada no medo pode gerar conflitos com aliados e pessoas que não aceitam sua forma de impor autoridade."
    },
    {
      "nome": "Juramento dos Observadores",
      "descricao": "Paladinos que dedicam sua existência a vigiar ameaças vindas de outros planos. Combatem criaturas sobrenaturais e protegem o mundo contra entidades que tentam atravessar as barreiras entre dimensões.",
      "vantagens": "Sentinela dos Planos possui grande resistência contra magia e habilidades sobrenaturais, além de ser especialmente eficaz contra criaturas extraplanares.",
      "desvantagens": "Vigilância Constante está sempre atento a ameaças sobrenaturais, podendo ter dificuldade em confiar em criaturas ou situações desconhecidas."
    },
    {
      "nome": "Quebrador de Juramento",
      "descricao": "Paladinos que abandonaram ou corromperam seus antigos ideais. Em vez de canalizar sua fé para proteger a vida, utilizam energia sombria e necrótica para dominar, destruir ou manipular aqueles ao seu redor.",
      "vantagens": "Poder Corrompido Pode manipular energia necrótica e fortalecer criaturas ligadas à morte, tornando-se extremamente perigoso em combates prolongados.",
      "desvantagens": "Corrupção Sua energia sombria pode afastar aliados e atrair a atenção de criaturas ou forças malignas. Quanto mais utiliza seu poder, maior pode ser sua influência sobre ele."
    }
  ],
  "ranger": [
    {
      "nome": "Caçador (hunter)",
      "descricao": "Especialistas em eliminar qualquer tipo de presa. Estudam monstros, feras e inimigos para encontrar seus pontos fracos, adaptando o estilo de combate à situação.",
      "vantagens": "Causa dano adicional contra inimigos feridos e pode escolher habilidades que aumentam sua eficiência ofensiva ou defensiva conforme evolui.",
      "desvantagens": "Muitas de suas habilidades dependem da posição dos inimigos ou de condições específicas para alcançar seu potencial máximo."
    },
    {
      "nome": "Senhor das Feras (Beast Master)",
      "descricao": "Esses Rangers criam um vínculo profundo com uma fera companheira, lutando lado a lado como uma única equipe. O animal não é apenas um aliado, mas um parceiro treinado que protege seu mestre, auxilia na exploração e participa diretamente dos combates.",
      "vantagens": "Possui uma fera fiel que pode ajudar em combate, exploração e rastreamento, oferecendo grande versatilidade e utilidade dentro e fora das batalhas.",
      "desvantagens": "Grande parte do poder do arquétipo depende da sobrevivência e atuação da fera. Se ela estiver incapacitada ou distante, a eficiência do Ranger diminui consideravelmente."
    }
  ],
  "barbaro": [
    {
      "nome": "Brutamonte Bobo",
      "descricao": "Apesar de sua aparência séria e assustadora, se comportam como uma criança, mal sabem contar até 3 ou falar corretamente. Costumam ser enganados facilmente e seguem ordens de outros personagens. Podem também se tornar emocionais quando confrontados por um assunto sensível e específico de seu bárbaro. Ao descobrirem que foram enganados ou quando a parte emotiva se inclina para o lado certo no momento certo, tornam-se uma verdadeira máquina poderosa, caçando incansavelmente seu alvo e destruindo tudo em seu caminho.",
      "vantagens": "+2d6 nos testes de força (quando confrontados) e intimidação.",
      "desvantagens": "Todos os testes de intelecto subtraem 1d6."
    },
    {
      "nome": "Combatentes Duros Pela Batalha",
      "descricao": "Tendem a ser quietos e sérios, principalmente intimidadores visualmente, porém não chamam muita atenção. Justamente por terem lutado em diversos lugares, recebem diversas cicatrizes, sabem como funciona um combate e são sobreviventes. É comum que sejam solitários e não gostem de perder tempo, indo direto ao assunto que querem tratar. Desconfiam de todos ao seu redor, já que possuem muita experiência de vida.",
      "vantagens": "2d6 em testes de sobrevivência e destreza (em furtividade e esquiva).",
      "desvantagens": "-1d6 em testes de vontade e carisma."
    },
    {
      "nome": "Tribal",
      "descricao": "Não civilizados e selvagens, suas roupas incorporam peles e ossos de animais e de outras criaturas. Pertencem a uma tribo ou civilização diferente do Reino, possuindo língua e escrita próprias. São primitivos e se impressionam facilmente com a civilização e coisas que nunca viram, podendo relacionar essas coisas aos deuses e se assustarem. Também tentam partir ao meio criaturas ainda não vistas. Possuem uma cultura e leis de vida diferentes das do Reino. No combate, combinam sua velocidade e força para se livrar logo de seus inimigos.",
      "vantagens": "2d6 em testes de força e destreza.",
      "desvantagens": "-1d6 em testes que envolvam interações sociais ou regras sociais."
    },
    {
      "nome": "Sanguinário",
      "descricao": "Seguem a sério o lema \"bata primeiro e pergunte depois\". Os sanguinários fazem as coisas da maneira mais bizarra que conseguirem, seja por diversão, mente perturbada ou motivos pessoais. Fazem sujeira por onde passam e agem de maneira macabra e assustadora. São personagens rápidos, de estatura comum, que não chamam muita atenção. Gostam de assustar e aterrorizar suas vítimas, querendo deixá-las irreconhecíveis.",
      "vantagens": "2d6 em testes de destreza e intimidação.",
      "desvantagens": "-1d6 em testes de diplomacia."
    },
    {
      "nome": "Grande Humorado",
      "descricao": "São consideravelmente fortes, com uma forma incrível de combate. Geralmente são o alívio cômico, alegres e amigáveis, sendo difícil perderem o bom humor. São fiéis e protetores.",
      "vantagens": "2d6 em testes de carisma e força.",
      "desvantagens": "-1d6 em testes de intimidação."
    }
  ],
  "bardo": [
    {
      "nome": "Menestrel Andarilho",
      "descricao": "Vivem viajando de cidade em cidade, tavernas em tavernas, contando histórias e cantando canções sobre heróis, guerras e lendas antigas. São sociáveis e costumam conhecer muitas pessoas por onde passam, sempre carregando histórias novas e rumores interessantes. Normalmente evitam conflitos diretos, preferindo usar palavras, música ou truques para escapar de problemas. Apesar da aparência despreocupada, guardam uma grande quantidade de conhecimento sobre o mundo.",
      "vantagens": "2d6 em testes de diplomacia e etiqueta",
      "desvantagens": "-1d6 em testes de força"
    },
    {
      "nome": "Trapaceiro Charmoso",
      "descricao": "Carismáticos e manipuladores, usam sua lábia para conseguir o que querem. Sabem mentir, improvisar histórias e convencer praticamente qualquer pessoa se tiverem tempo suficiente para falar. Frequentam tavernas, mercados e ambientes sociais onde podem obter vantagens com suas palavras. Alguns usam suas habilidades apenas para diversão, enquanto outros vivem de golpes, apostas e pequenos truques.",
      "vantagens": "2d6 em testes de crime e carisma",
      "desvantagens": "-1d6 em testes de vontade"
    },
    {
      "nome": "Artista Caótico",
      "descricao": "Improvisadores natos, vivem pela emoção do momento. Tocam, cantam, dançam ou contam histórias de forma completamente imprevisível. Gostam de provocar reações nas pessoas risos, surpresa ou até confusão. Podem transformar uma situação séria em algo engraçado ou criar espetáculo até no meio de uma batalha. São criativos, excêntricos e raramente seguem regras tradicionais da arte.",
      "vantagens": "2d4 em carisma",
      "desvantagens": "-1d4 em testes de etiqueta"
    },
    {
      "nome": "Cantor de Guerra",
      "descricao": "Diferente dos bardos tradicionais de tavernas, o Cantor de Guerra vive nos campos de batalha. Suas músicas não são suaves ou alegres, mas ritmadas, fortes e cheias de energia, feitas para elevar o espírito de aliados e intimidar inimigos. Costumam carregar instrumentos robustos como tambores de guerra, cornetas ou até instrumentos improvisados feitos de metal e madeira reforçada. Muitos já lutaram em batalhas reais e aprenderam a lutar lado a lado com soldados, usando sua música para marcar o ritmo da guerra.",
      "vantagens": "1d8 em testes de persuasão e intelecto",
      "desvantagens": "-1d6 em testes de destreza"
    },
    {
      "nome": "Arauto da Lamentação",
      "descricao": "Um bardo sombrio que canta histórias trágicas, mortes e destinos cruéis. Suas músicas são lentas, melancólicas e muitas vezes perturbadoras, capazes de causar arrepios em quem escuta. Dizem que esses bardos são atraídos por tragédias e lugares marcados por sofrimento, onde encontram inspiração para suas composições. Alguns acreditam que suas canções carregam ecos de espíritos ou memórias de pessoas que já morreram, tornando suas apresentações estranhamente inquietantes.",
      "vantagens": "1d6 em testes de intimidação e intuição",
      "desvantagens": "1d6 em testes de destreza"
    }
  ],
  "clerigo": [
    {
      "nome": "Domínio da Vida",
      "descricao": "Clérigos que dedicam seus poderes à preservação da vida e à proteção de seus aliados. São sacerdotes capazes de restaurar ferimentos, purificar doenças e manter o grupo de pé mesmo durante batalhas difíceis.",
      "vantagens": "Benção da Vida:Suas magias de cura são mais poderosas e podem restaurar uma quantidade maior de vida aos aliados.",
      "desvantagens": "Dependência do Suporte: Possui menos opções para causar grandes quantidades de dano, dependendo dos aliados para finalizar inimigos."
    },
    {
      "nome": "Domínio da Guerra",
      "descricao": "Clérigos que seguem divindades ligadas à batalha, coragem e conquista. Diferente de outros clérigos, estão preparados para lutar diretamente na linha de frente, combinando magia divina com armas e armaduras pesadas.",
      "vantagens": "Guerreiro Sagrado: Possui grande resistência e eficiência em combate corpo a corpo, podendo utilizar armas e armaduras mais poderosas.",
      "desvantagens": "Alcance Limitado: Precisa se aproximar dos inimigos para aproveitar seu potencial máximo, ficando mais exposto aos ataques."
    },
    {
      "nome": "Domínio do Conhecimento",
      "descricao": "Clérigos que buscam compreender os mistérios do mundo e os conhecimentos concedidos por suas divindades. São excelentes investigadores, conselheiros e especialistas em descobrir informações escondidas.",
      "vantagens": "Sabedoria Divina: Possui facilidade para obter informações, investigar mistérios e compreender conhecimentos desconhecidos.",
      "desvantagens": "Baixo Poder Ofensivo: Não é especializado em causar dano ou resistir diretamente aos combates, dependendo de estratégia e utilidade."
    },
    {
      "nome": "Domínio da Luz/Tempestade",
      "descricao": "Clérigos que canalizam forças naturais e divinas extremamente poderosas. Os da Luz utilizam energia radiante e chamas, enquanto os da Tempestade controlam trovões, relâmpagos e ventos. Ambos são excelentes para destruir grupos de inimigos.",
      "vantagens": "Fúria Divina: Pode causar grandes quantidades de dano mágico, especialmente contra vários inimigos reunidos em uma mesma área.",
      "desvantagens": "Alto Consumo Mágico: Suas habilidades ofensivas mais poderosas exigem bastante energia, podendo deixá-los sem recursos rapidamente."
    },
    {
      "nome": "Domínio da Enganação/Ordem",
      "descricao": "Clérigos especializados em manipular o comportamento dos inimigos e controlar o campo de batalha. Os da Enganação utilizam ilusões e truques divinos, enquanto os da Ordem impõem autoridade e obrigam inimigos e aliados a seguirem seus comandos.",
      "vantagens": "Controle Divino: Pode atrapalhar inimigos, manipular suas posições e criar situações favoráveis para todo o grupo.",
      "desvantagens": "Dependência Estratégica: Suas melhores habilidades exigem planejamento e posicionamento; quando não consegue controlar o campo de batalha, perde parte de sua eficiência."
    }
  ],
  "feiticeiros": [
    {
      "nome": "Linhagem Dracônica",
      "descricao": "Feiticeiros cujo poder mágico vem de uma herança dracônica. Seu sangue carrega características de um ancestral dragão, permitindo que desenvolvam resistência, habilidades físicas aprimoradas e maior domínio sobre um elemento específico.",
      "vantagens": "Possui maior resistência física e suas magias do elemento relacionado ao ancestral causam dano adicional.",
      "desvantagens": "Seu potencial ofensivo fica mais limitado quando enfrenta criaturas resistentes ou imunes ao elemento de sua linhagem."
    },
    {
      "nome": "Magia Selvagem",
      "descricao": "Feiticeiros cuja magia é completamente imprevisível. Seus poderes podem produzir resultados extraordinários, mas também podem sair do controle e gerar efeitos inesperados.",
      "vantagens": "Pode manipular a sorte e transformar situações desfavoráveis em oportunidades inesperadas.",
      "desvantagens": "Seus poderes podem gerar efeitos imprevisíveis quando utiliza magia, tornando difícil controlar completamente os resultados."
    },
    {
      "nome": "Alma Divina",
      "descricao": "Feiticeiros que possuem uma conexão inata com uma força divina. Sua magia combina o poder arcano dos feiticeiros com as bênçãos normalmente associadas aos clérigos, permitindo que atuem tanto no ataque quanto no suporte.",
      "vantagens": "Possui acesso a uma grande variedade de magias, incluindo cura, proteção e suporte, tornando-se extremamente versátil.",
      "desvantagens": "A grande quantidade de possibilidades mágicas pode exigir planejamento para escolher as magias mais adequadas para cada situação."
    },
    {
      "nome": "Mente Aberrante",
      "descricao": "Feiticeiros que despertaram poderes mentais sobrenaturais. Conseguem se comunicar telepaticamente, manipular pensamentos e utilizar energia psíquica para controlar ou confundir seus inimigos.",
      "vantagens": "Possui telepatia e diversas habilidades de controle mental, podendo interferir nas ações dos inimigos.",
      "desvantagens": "Seu estilo depende bastante de concentração e habilidades mentais, tornando-o mais vulnerável quando seus poderes são neutralizados."
    },
    {
      "nome": "Alma do Relógio",
      "descricao": "Feiticeiros ligados a forças de ordem, equilíbrio e precisão. Sua magia busca corrigir o caos e manter tudo funcionando como deveria, podendo proteger aliados e impedir que efeitos negativos interfiram em seus planos.",
      "vantagens": "Pode proteger aliados, reduzir efeitos negativos e corrigir situações que normalmente causariam desvantagens.",
      "desvantagens": "Seu poder é baseado na ordem e no equilíbrio, podendo ter dificuldades para lidar com situações completamente imprevisíveis ou caóticas."
    },
    {
      "nome": "Magia das Sombras",
      "descricao": "Feiticeiros cuja magia está ligada à escuridão e às forças sombrias. Conseguem manipular sombras, esconder sua presença e utilizar poderes relacionados à morte e à escuridão.",
      "vantagens": "Possui grande capacidade de furtividade, movimentação e sobrevivência em ambientes escuros.",
      "desvantagens": "Ambientes extremamente iluminados ou poderes que anulam sombras podem reduzir suas principais vantagens."
    },
    {
      "nome": "Magia da Tempestade",
      "descricao": "Feiticeiros cuja magia está conectada aos céus e às tempestades. Manipulam vento, trovões e relâmpagos, utilizando sua magia para atacar e se movimentar rapidamente pelo campo de batalha.",
      "vantagens": "Pode utilizar o vento e a energia da tempestade para se reposicionar rapidamente, mantendo grande mobilidade durante o combate.",
      "desvantagens": "Muitas de suas habilidades são mais eficientes a curta distância, obrigando o feiticeiro a se aproximar de inimigos apesar de sua menor resistência física."
    },
    {
      "nome": "Feitiçaria Lunar",
      "descricao": "Feiticeiros que extraem seu poder da Lua e de suas diferentes fases. Sua magia muda conforme a fase lunar escolhida, permitindo alternar entre estilos ofensivos, defensivos e utilitários.",
      "vantagens": "Possui grande versatilidade, podendo adaptar suas habilidades mágicas de acordo com a situação.",
      "desvantagens": "Precisa escolher cuidadosamente qual aspecto lunar utilizar, pois nem todas as habilidades estarão igualmente disponíveis ou eficientes ao mesmo tempo."
    }
  ],
  "guerreiro": [
    {
      "nome": "Campeão",
      "descricao": "Guerreiros que aperfeiçoaram suas habilidades físicas até o limite. São combatentes diretos, confiando em força, velocidade e precisão em vez de técnicas complexas ou magia.",
      "vantagens": "Possui maior facilidade para conseguir acertos críticos, aumentando seu potencial de dano.",
      "desvantagens": "Seu estilo é bastante direto e possui menos habilidades especiais para lidar com situações fora do combate."
    },
    {
      "nome": "Mestre de Batalha",
      "descricao": "Guerreiros que estudam profundamente as técnicas de combate e transformam cada movimento em uma estratégia. Utilizam manobras especiais para derrubar, desarmar, distrair ou provocar seus adversários.",
      "vantagens": "Pode utilizar técnicas especiais para controlar inimigos e adaptar seus ataques a diferentes situações.",
      "desvantagens": "Suas melhores técnicas dependem de dados de superioridade, que são limitados e precisam ser recuperados."
    },
    {
      "nome": "Cavaleiro Arcano",
      "descricao": "Guerreiros que aprenderam a combinar treinamento marcial com magia arcana. Usam feitiços para aumentar sua defesa, atacar inimigos e criar novas possibilidades durante o combate.",
      "vantagens": "Combina resistência e habilidades de combate com magia, tornando-se muito versátil.",
      "desvantagens": "Possui acesso a menos magias e níveis mágicos mais baixos do que um conjurador especializado."
    },
    {
      "nome": "Cavaleiro Rúnico",
      "descricao": "Guerreiros que aprenderam a utilizar antigas runas mágicas para aprimorar seus corpos e equipamentos. Podem aumentar drasticamente de tamanho e canalizar diferentes poderes através das runas.",
      "vantagens": "As runas fornecem habilidades variadas, aumentando sua força, resistência e utilidade em combate.",
      "desvantagens": "Grande parte de suas habilidades especiais depende do uso limitado das runas, exigindo que escolha cuidadosamente quando ativá-las."
    },
    {
      "nome": "Samurai",
      "descricao": "Guerreiros disciplinados que combinam técnica, determinação e precisão. Quando entram em seu estado de Espírito de Luta, conseguem superar suas limitações e realizar ataques extremamente precisos.",
      "vantagens": "Pode obter vantagem em ataques e maior resistência temporariamente, tornando-se muito mais eficiente em momentos decisivos.",
      "desvantagens": "Seu melhor desempenho depende do uso de recursos limitados, ficando menos eficiente depois que seu Espírito de Luta é utilizado."
    },
    {
      "nome": "Cavaleiro do Eco",
      "descricao": "Guerreiros capazes de criar uma manifestação mágica de si mesmos, chamada Eco. Essa cópia pode ocupar espaços diferentes do campo de batalha, permitindo ataques inesperados e uma mobilidade extraordinária.",
      "vantagens": "Pode utilizar o eco para atacar de posições diferentes, trocar de lugar e alcançar locais difíceis, tornando-se extremamente imprevisível.",
      "desvantagens": "Parte de sua mobilidade e de suas estratégias depende da presença do eco, que pode ser destruído."
    },
    {
      "nome": "Arqueiro Arcano",
      "descricao": "Guerreiros especializados em arcos mágicos, capazes de canalizar energia arcana através de suas flechas. Cada disparo pode carregar efeitos especiais para causar diferentes tipos de impacto no inimigo.",
      "vantagens": "Pode adicionar efeitos mágicos aos seus disparos, aumentando o dano ou controlando os inimigos à distância.",
      "desvantagens": "É muito mais eficiente quando possui espaço para atacar com seu arco, ficando vulnerável quando inimigos conseguem se aproximar."
    },
    {
      "nome": "Guerreiro Psíquico",
      "descricao": "Guerreiros que desenvolveram poderes mentais capazes de manipular energia psíquica. Utilizam a mente para aumentar seus ataques, proteger companheiros e realizar feitos físicos extraordinários.",
      "vantagens": "Pode aumentar o dano de seus ataques, reduzir danos recebidos e utilizar sua energia mental para realizar feitos especiais.",
      "desvantagens": "Seus poderes psíquicos dependem de uma reserva limitada, impedindo que sejam utilizados continuamente."
    },
    {
      "nome": "Cavaleiro",
      "descricao": "Guerreiros especializados em proteger seus companheiros e controlar o campo de batalha. São excelentes combatentes defensivos e podem se destacar tanto a pé quanto montados.",
      "vantagens": "Pode proteger aliados, dificultar que inimigos passem por sua posição e puni-los quando ignoram sua presença.",
      "desvantagens": "Seu estilo defensivo depende de manter posições estratégicas, sendo menos eficiente quando precisa lutar constantemente em movimento ou a longa distância."
    }
  ],
  "ladinos": [
    {
      "nome": "Ladrão",
      "descricao": "Ladinos que aperfeiçoaram as habilidades clássicas de um criminoso: furtividade, escalada, arrombamento e utilização de objetos. São extremamente habilidosos em explorar ambientes e aproveitar qualquer recurso disponível.",
      "vantagens": "Pode utilizar objetos e realizar determinadas ações com muito mais rapidez, tornando-se excelente para exploração e situações improvisadas.",
      "desvantagens": "Suas principais habilidades são voltadas para utilidade e exploração, não possuindo tantas ferramentas ofensivas especializadas."
    },
    {
      "nome": "Assassino",
      "descricao": "Ladinos treinados para eliminar seus alvos antes mesmo que eles tenham a chance de reagir. São mestres da emboscada, disfarce e ataques precisos, tornando-se especialmente perigosos quando conseguem surpreender o inimigo.",
      "vantagens": "Possui enorme potencial para causar dano no início de um combate, especialmente contra inimigos que ainda não perceberam sua presença.",
      "desvantagens": "Seu maior potencial ofensivo depende de conseguir surpreender o alvo. Em combates prolongados, sua vantagem diminui."
    },
    {
      "nome": "Trapaceiro Arcano",
      "descricao": "Ladinos que combinam furtividade e agilidade com magia arcana. Utilizam principalmente ilusões e encantamentos para enganar inimigos, infiltrar-se em lugares protegidos e criar oportunidades para seus ataques.",
      "vantagens": "A magia aumenta enormemente sua versatilidade, permitindo criar ilusões, manipular inimigos e resolver situações de maneiras criativas.",
      "desvantagens": "Possui poucos espaços de magia e um repertório menor do que conjuradores especializados."
    },
    {
      "nome": "Swashbuckler",
      "descricao": "Ladinos elegantes e confiantes que transformam o combate em um verdadeiro duelo. São especialistas em enfrentar inimigos individualmente, utilizando velocidade, carisma e movimentos acrobáticos para atacar e escapar rapidamente.",
      "vantagens": "Consegue realizar ataques furtivos em duelos individuais com maior facilidade e possui excelente mobilidade durante o combate.",
      "desvantagens": "Suas habilidades são especialmente fortes contra alvos individuais, sendo menos eficientes quando está cercado por muitos inimigos."
    },
    {
      "nome": "Batedor",
      "descricao": "Ladinos especializados em exploração, rastreamento e sobrevivência. São excelentes em ambientes selvagens e utilizam sua velocidade para manter distância dos inimigos, atacar de longe e mudar rapidamente de posição.",
      "vantagens": "Possui grande facilidade para sobreviver na natureza, rastrear criaturas e se movimentar rapidamente durante o combate.",
      "desvantagens": "Seu estilo favorece ataques à distância e mobilidade, ficando mais vulnerável quando um inimigo consegue prendê-lo em combate próximo."
    },
    {
      "nome": "Lâmina da Alma",
      "descricao": "Ladinos que despertaram poderes psíquicos e conseguem transformar sua energia mental em armas. Manifestam lâminas feitas de energia psíquica e utilizam seus poderes para se comunicar e realizar feitos extraordinários.",
      "vantagens": "Pode criar armas de energia mental quando necessário e possui habilidades de telepatia que oferecem grande utilidade dentro e fora do combate.",
      "desvantagens": "Suas habilidades especiais dependem de uma reserva limitada de energia psíquica, exigindo que escolha cuidadosamente quando utilizá-las."
    },
    {
      "nome": "Inquisidor",
      "descricao": "Ladinos que desenvolveram uma percepção extraordinária. São especialistas em descobrir mentiras, perceber detalhes escondidos e identificar inimigos que tentam permanecer ocultos.",
      "vantagens": "Possui grande facilidade para detectar enganos, encontrar pistas e identificar fraquezas ou inimigos escondidos.",
      "desvantagens": "É mais voltado para investigação e precisão do que para causar grandes quantidades de dano rapidamente."
    },
    {
      "nome": "Mestre da Estratégia",
      "descricao": "Ladinos que preferem vencer através da inteligência e do planejamento. São estrategistas capazes de analisar o campo de batalha e coordenar seus aliados, transformando pequenos movimentos em grandes vantagens.",
      "vantagens": "Pode ajudar e orientar aliados com eficiência, permitindo que companheiros aproveitem melhor suas próprias habilidades.",
      "desvantagens": "Seu foco está em fortalecer e auxiliar o grupo, fazendo com que seja menos especializado em causar dano sozinho."
    }
  ],
  "nobres": [
    {
      "nome": "O Líder Nato",
      "descricao": "Nobres que nasceram ou aprenderam a exercer poder através da influência e da palavra. São excelentes negociadores, conhecem as regras da corte e sabem como convencer pessoas a apoiar seus interesses. Em vez de lutar diretamente, preferem utilizar alianças, servos e sua posição social para alcançar seus objetivos.",
      "vantagens": "Possui grande facilidade para persuadir, negociar e conseguir apoio de aliados ou subordinados.",
      "desvantagens": "Em situações onde sua posição social não tem valor, como territórios estrangeiros ou ambientes hostis, perde boa parte de sua vantagem."
    },
    {
      "nome": "O Nobre Cavaleiro",
      "descricao": "Nobres que unem o prestígio de sua linhagem ao treinamento militar. São guerreiros dedicados à proteção de seu reino, família e aliados, seguindo ideais de honra, lealdade e cavalaria.",
      "vantagens": "É altamente eficiente em combate e consegue defender aliados, além de possuir autoridade para comandar soldados.",
      "desvantagens": "Seus princípios podem limitar suas escolhas, dificultando ações consideradas desonrosas, mesmo quando seriam vantajosas."
    },
    {
      "nome": "O Herdeiro Mimado",
      "descricao": "Nobres que cresceram cercados de riqueza, privilégios e expectativas. Alguns são arrogantes e acreditam que o mundo lhes deve obediência, enquanto outros tentam provar que são dignos de sua posição e superar a reputação de sua família.",
      "vantagens": "Possui acesso a dinheiro, propriedades, servos, educação e contatos importantes.",
      "desvantagens": "Pode ter dificuldade para lidar com situações comuns fora da vida nobre, além de ser facilmente reconhecido por sua origem."
    },
    {
      "nome": "O Burguês",
      "descricao": "Indivíduos que conquistaram poder através de dinheiro, comércio e influência econômica. Não dependem necessariamente de uma antiga linhagem, mas possuem recursos suficientes para influenciar nobres, governos e cidades.",
      "vantagens": "Pode financiar projetos, contratar serviços, comprar equipamentos e utilizar sua influência comercial para resolver problemas.",
      "desvantagens": "Perder seus recursos ou sofrer uma crise econômica pode diminuir drasticamente sua influência."
    },
    {
      "nome": "O Nobre Caído",
      "descricao": "Antigos membros da aristocracia que perderam suas terras, títulos ou influência. Podem ter sido traídos, derrotados em uma guerra ou expulsos de sua própria casa. Agora buscam recuperar aquilo que perderam ou reconstruir sua honra.",
      "vantagens": "Conhece profundamente a política e os costumes da nobreza, além de possuir antigos contatos que podem ajudá-lo.",
      "desvantagens": "Apesar de conhecer o mundo nobre, perdeu grande parte de sua riqueza, autoridade e proteção."
    },
    {
      "nome": "O Tirano",
      "descricao": "Nobres que utilizam sua posição para acumular ainda mais poder. São manipuladores, cruéis e dispostos a explorar seus próprios súditos para alcançar seus objetivos. Governam através do medo, da corrupção e da obediência forçada.",
      "vantagens": "Possui grande capacidade de controlar subordinados, intimidar inimigos e utilizar sua influência para conseguir o que deseja.",
      "desvantagens": "Sua crueldade cria revoltas, traições e inimigos, tornando difícil confiar até mesmo em seus próprios aliados."
    }
  ],
  "samurais": [
    {
      "nome": "Espírito Guerreiro",
      "descricao": "Samurais que transformam sua determinação em força durante o combate. São guerreiros extremamente disciplinados, capazes de continuar lutando mesmo quando estão feridos ou em situações desfavoráveis.",
      "vantagens": "Pode aumentar sua precisão durante momentos decisivos e ganhar resistência temporária, tornando-se mais difícil de derrotar.",
      "desvantagens": "Seu estado de determinação máxima pode ser utilizado apenas algumas vezes, fazendo com que seu desempenho diminua depois que seus recursos acabam."
    },
    {
      "nome": "Mestre Espadachim",
      "descricao": "Samurais que dedicaram suas vidas ao domínio absoluto da espada. Cada movimento é treinado para ser preciso e eficiente, transformando o combate em uma verdadeira arte.",
      "vantagens": "Possui grande precisão e eficiência com espadas, podendo realizar técnicas avançadas e golpes extremamente precisos.",
      "desvantagens": "Seu treinamento é fortemente concentrado em armas de lâmina, tornando-o menos versátil quando precisa utilizar outros estilos de combate."
    },
    {
      "nome": "Ronin",
      "descricao": "O Samurai é um guerreiro que serve fielmente a um senhor ou clã, colocando honra e lealdade acima de seus próprios interesses. Já o Ronin é aquele que perdeu ou abandonou seu mestre e passou a viver de maneira independente, seguindo seu próprio caminho.",
      "vantagens": "Samurais podem contar com a proteção, recursos e apoio de seu senhor ou clã. Ronins, por outro lado, possuem maior liberdade para tomar suas próprias decisões.",
      "desvantagens": "Um Samurai pode ser obrigado a cumprir ordens mesmo quando discorda delas. O Ronin perde o apoio e a proteção que teria pertencendo a um clã."
    },
    {
      "nome": "Cortês",
      "descricao": "Samurais que dominam não apenas a espada, mas também a etiqueta, política e cultura. São guerreiros capazes de negociar, planejar batalhas e compreender as complexas relações entre os diferentes clãs.",
      "vantagens": "Possui grande capacidade de planejamento, negociação e leitura das situações, podendo encontrar soluções antes que o conflito comece.",
      "desvantagens": "Por dividir seu treinamento entre combate, diplomacia e estratégia, não alcança o mesmo nível de especialização física de um Mestre Espadachim."
    }
  ],
  "vampiros": [
    {
      "nome": "Dom Juan",
      "descricao": "Vampiros que utilizam seu charme, inteligência e influência social para conseguir o que desejam. Preferem manipular pessoas e construir uma rede de aliados em vez de depender apenas da força.",
      "vantagens": "Possui grande facilidade para persuadir, intimidar e manipular outras pessoas, podendo conseguir informações e favores com facilidade.",
      "desvantagens": "É menos eficiente em situações onde não pode utilizar sua influência, como combates diretos ou ambientes onde ninguém conhece sua reputação."
    },
    {
      "nome": "A Besta",
      "descricao": "Vampiros que abandonaram quase completamente sua humanidade e abraçaram seus instintos predatórios. São criaturas solitárias, brutais e extremamente perigosas quando entram em combate.",
      "vantagens": "Possui força, resistência e sentidos sobrenaturais, tornando-se extremamente eficiente em combates próximos.",
      "desvantagens": "Situações de estresse ou ferimentos podem tornar mais difícil controlar seus instintos, prejudicando seu julgamento."
    },
    {
      "nome": "O Caçador",
      "descricao": "Vampiros que dedicaram sua existência a enfrentar outras criaturas sobrenaturais. Conhecem as fraquezas de diferentes monstros e utilizam esse conhecimento para caçar rivais, criaturas perigosas ou até outros vampiros.",
      "vantagens": "Possui conhecimento sobre criaturas sobrenaturais e recebe vantagens ao identificar ou combater seres desse tipo.",
      "desvantagens": "Sua atividade como caçador atrai a atenção de criaturas poderosas e pode colocá-lo constantemente em perigo."
    },
    {
      "nome": "O Senhor da Noite",
      "descricao": "Vampiros antigos que preferem conquistar poder através de conhecimento, política e influência. Possuem séculos de experiência e frequentemente ocupam posições importantes dentro da sociedade vampírica.",
      "vantagens": "Possui grande quantidade de conhecimento sobre história, política, magia e criaturas sobrenaturais, além de uma extensa rede de contatos.",
      "desvantagens": "Sua idade e experiência podem fazê-lo subestimar adversários mais jovens ou acreditar que sempre possui controle da situação."
    },
    {
      "nome": "Vigilante",
      "descricao": "Descendentes ou híbridos de humanos e vampiros que vivem entre os dois mundos. Muitos utilizam suas habilidades sobrenaturais para caçar criminosos, monstros ou aqueles que ameaçam pessoas inocentes.",
      "vantagens": "Combina capacidades humanas e vampíricas, permitindo grande versatilidade, resistência e recuperação durante o combate.",
      "desvantagens": "Pode não ser completamente aceito nem por humanos nem por vampiros, dificultando a formação de alianças."
    },
    {
      "nome": "Nosferatu",
      "descricao": "Vampiros que preferem permanecer escondidos nas sombras. Utilizam sua capacidade de espionagem, conhecimento de túneis e contato com animais como ratos e corvos para descobrir informações sem serem percebidos.",
      "vantagens": "Excelente em furtividade, investigação e coleta de informações, podendo utilizar animais para observar locais distantes.",
      "desvantagens": "Sua aparência pode assustar ou afastar pessoas comuns, tornando difícil interagir socialmente sem utilizar disfarces ou poderes."
    },
    {
      "nome": "Fera",
      "descricao": "Vampiros que abandonaram a vida urbana e abraçaram completamente sua natureza animal. Vivem em florestas, montanhas e outros ambientes selvagens, assumindo características de feras para sobreviver e caçar.",
      "vantagens": "Pode manifestar características animais ou transformar partes do corpo, ganhando sentidos aguçados, velocidade e capacidades físicas superiores.",
      "desvantagens": "Quanto mais utiliza sua natureza bestial, maior a influência de seus instintos, dificultando comportamentos sociais e decisões racionais."
    },
    {
      "nome": "Zarovich",
      "descricao": "Vampiros de uma linhagem associada ao domínio sobre criaturas da noite. Possuem uma ligação sobrenatural com corvos, morcegos e outros animais noturnos, utilizando-os para reconhecimento, comunicação e auxílio.",
      "vantagens": "Pode influenciar ou convocar criaturas noturnas para auxiliar na exploração, espionagem ou combate.",
      "desvantagens": "Seus poderes relacionados às criaturas da noite são muito menos úteis durante o dia ou em ambientes sem animais disponíveis."
    },
    {
      "nome": "Tolenkov",
      "descricao": "Vampiros especializados em velocidade, mobilidade e perseguição. Conseguem escalar superfícies, atravessar terrenos difíceis e alcançar suas presas antes que elas tenham tempo de fugir.",
      "vantagens": "Possui velocidade, reflexos e capacidade de escalada extraordinárias, sendo extremamente difícil de alcançar ou escapar.",
      "desvantagens": "Investe mais em velocidade do que em força e resistência, tornando-se mais vulnerável quando é obrigado a permanecer em um confronto prolongado."
    },
    {
      "nome": "Von Carstein",
      "descricao": "Vampiros conhecidos por sua força sobrenatural e capacidade de alterar parcialmente sua forma. Podem manifestar características monstruosas para aumentar seu poder durante o combate.",
      "vantagens": "Pode transformar partes do corpo, adquirindo maior força, garras, sentidos aguçados ou outras características sobrenaturais.",
      "desvantagens": "Alterações muito poderosas exigem grande quantidade de energia e podem dificultar o controle sobre seus próprios instintos."
    }
  ],
  "vikings": [
    {
      "nome": "Berserker",
      "descricao": "Vikings que vivem para o combate e utilizam força, resistência e agressividade para dominar seus inimigos. Os Berserkers são conhecidos por entrar em um estado de fúria durante a batalha, ignorando medo e dor e lutando até não conseguirem mais permanecer de pé.",
      "vantagens": "Recebe aumento de força e resistência durante o combate, tornando-se extremamente eficiente no combate corpo a corpo.",
      "desvantagens": "Ao entrar em fúria, pode perder parte da capacidade de agir estrategicamente, ficando mais vulnerável a armadilhas e ataques planejados."
    },
    {
      "nome": "Viking de Escudo",
      "descricao": "Vikings treinados para proteger seus companheiros e manter a linha de frente. Utilizam grandes escudos, lanças ou machados para bloquear ataques, controlar os inimigos e impedir que cheguem aos membros mais vulneráveis do grupo.",
      "vantagens": "Possui grande capacidade defensiva e pode proteger aliados próximos, reduzindo os danos recebidos pelo grupo.",
      "desvantagens": "O uso de escudos grandes e equipamentos pesados dificulta movimentos rápidos e perseguições."
    },
    {
      "nome": "Explorador",
      "descricao": "Vikings especializados em explorar territórios desconhecidos, rastrear animais e encontrar recursos. São rápidos, atentos e capazes de sobreviver longe da segurança da aldeia, utilizando arcos, facas e armas leves.",
      "vantagens": "Possui grande facilidade para rastrear, caçar, encontrar recursos e atravessar ambientes perigosos.",
      "desvantagens": "Por utilizar equipamentos mais leves, é mais vulnerável quando precisa enfrentar inimigos diretamente."
    },
    {
      "nome": "Völva",
      "descricao": "Praticantes de Seiðr, uma forma de magia ligada à tradição nórdica. Utilizam runas, espíritos e forças sobrenaturais para influenciar o destino, a natureza e o campo de batalha. Alguns também podem possuir familiares espirituais, como corvos ou lobos.",
      "vantagens": "Possui habilidades mágicas variadas, podendo causar dano, controlar elementos, auxiliar aliados e utilizar poderes sobrenaturais.",
      "desvantagens": "É menos resistente fisicamente e depende de sua energia mágica para utilizar suas habilidades mais poderosas."
    },
    {
      "nome": "Honrador dos Deuses",
      "descricao": "Vikings profundamente ligados à natureza e às forças divinas. Utilizam ervas, conhecimentos ancestrais e poderes naturais para curar ferimentos, fortalecer companheiros e sobreviver em ambientes hostis.",
      "vantagens": "Pode curar aliados, criar recursos naturais e conceder resistência contra diferentes perigos.",
      "desvantagens": "Seus poderes são mais eficientes quando possui acesso a recursos naturais, ervas ou ambientes adequados."
    },
    {
      "nome": "Artesão",
      "descricao": "Vikings responsáveis por transformar os recursos encontrados pelo grupo em armas, armaduras, ferramentas, construções e alimentos. São os responsáveis por manter a comunidade funcionando e garantir que os guerreiros estejam preparados para novas expedições.",
      "vantagens": "Pode fabricar e melhorar equipamentos, construir estruturas e preparar alimentos que aumentam a capacidade de sobrevivência do grupo.",
      "desvantagens": "Não é treinado para confrontos diretos, dependendo dos outros membros do grupo para protegê-lo durante batalhas."
    }
  ],
  "xamas": [
    {
      "nome": "Xamã Totêmico",
      "descricao": "Xamãs que possuem uma conexão direta com as forças elementais da natureza. Utilizam totens para canalizar fogo, terra, água e ar, podendo alterar o ambiente e controlar o campo de batalha.",
      "vantagens": "Pode utilizar diferentes elementos para causar dano, criar obstáculos e controlar grupos de inimigos.",
      "desvantagens": "Suas habilidades mais poderosas dependem da preparação e posicionamento dos totens, tornando-se menos eficientes quando não consegue estabelecê-los."
    },
    {
      "nome": "Xamã Mediúnico",
      "descricao": "Xamãs que servem como ponte entre o mundo dos vivos e o mundo espiritual. Conversam com ancestrais, espíritos e mortos, utilizando seus conhecimentos para proteger, curar e orientar seus companheiros.",
      "vantagens": "Pode receber orientação dos espíritos, obter conhecimentos esquecidos e utilizar poderes de cura e proteção.",
      "desvantagens": "A presença constante dos espíritos pode interferir em seus pensamentos e decisões, especialmente em locais carregados de energia sobrenatural."
    },
    {
      "nome": "Xamã Cambiante",
      "descricao": "Xamãs que permitem que espíritos animais se unam ao seu próprio corpo. Podem assumir características de diferentes feras ou transformar-se completamente em animais poderosos, adquirindo suas forças e sentidos.",
      "vantagens": "Pode assumir formas animais, recebendo diferentes capacidades físicas, como força, velocidade, sentidos aguçados ou resistência.",
      "desvantagens": "Quanto mais tempo permanece transformado, maior a influência dos instintos da criatura sobre seu comportamento."
    },
    {
      "nome": "Xamã da Sombra",
      "descricao": "Xamãs que estudam as forças espirituais mais obscuras para compreender e combater a corrupção. Atuam entre a luz e a escuridão, utilizando poderes sombrios sem necessariamente se entregar a eles.",
      "vantagens": "Pode manipular energia sombria, detectar corrupção e resistir a influências sobrenaturais malignas.",
      "desvantagens": "O uso excessivo dos poderes do Vazio pode afetar sua mente e espírito, tornando perigoso depender demais dessas forças."
    },
    {
      "nome": "Xamã do Espírito Guardião",
      "descricao": "Xamãs que estabelecem um vínculo profundo com um único espírito animal. O companheiro espiritual cresce junto com o xamã, tornando-se uma extensão de seus poderes e ajudando-o tanto em combate quanto na proteção de seus aliados.",
      "vantagens": "O espírito pode proteger aliados, conceder bônus e auxiliar diretamente durante os combates.",
      "desvantagens": "Como os poderes estão fortemente ligados ao companheiro, perder sua conexão com o espírito reduz significativamente sua capacidade de suporte."
    }
  ]
};


function buscarArquetipo(classe, nome) {

    const base =
        ARQUETIPOS_DADOS;

    const nomeNorm =
        normalizarTexto(nome);

    const achar =
        lista =>
            (lista || []).find(
                item =>
                    normalizarTexto(
                        item.nome
                    ) === nomeNorm
            );

    const daClasse =
        achar(
            base[
                normalizarTexto(
                    classe
                )
            ]
        );

    if (daClasse) {

        return daClasse;

    }

    for (const chave in base) {

        const encontrado =
            achar(base[chave]);

        if (encontrado) {

            return encontrado;

        }

    }

    return null;

}


function obterArquetipoSelecionado() {

    const escolhido =
        lerJSONSalvo(
            "arquetipoEscolhido"
        );

    const detalhes =
        lerJSONSalvo(
            "arquetipoDetalhes"
        );

    const nome =
        (escolhido && escolhido.nome) ||
        localStorage.getItem(
            "arquetipoSelecionado"
        ) ||
        (detalhes && detalhes.nome) ||
        "";

    if (!nome) {

        return null;

    }

    const classe =
        (escolhido && escolhido.classe) ||
        (detalhes && detalhes.classe) ||
        "";

    let dados =
        buscarArquetipo(
            classe,
            nome
        );

    if (
        !dados &&
        detalhes &&
        detalhes.nome === nome &&
        detalhes.descricao
    ) {

        dados =
            detalhes;

    }

    return {

        nome: nome,
        descricao:
            (dados && dados.descricao) || "",
        vantagens:
            (dados && dados.vantagens) || "",
        desvantagens:
            (dados && dados.desvantagens) || ""

    };

}


function montarCard(prefixo, titulo, corpo, chave) {

    const aberto =
        localStorage.getItem(
            chave
        ) !== "0";

    return `

        <section class="arquetipo-card" id="${prefixo}">

            <button
                type="button"
                class="arquetipo-cabecalho"
                id="${prefixo}-toggle"
                data-chave="${chave}"
                aria-expanded="${aberto}"
                aria-controls="${prefixo}-corpo"
            >

                <span>
                    ${escapeHTML(titulo)}
                </span>

                <span
                    class="arquetipo-seta"
                    aria-hidden="true"
                >
                    ${aberto ? "▲" : "▼"}
                </span>

            </button>

            <div
                class="arquetipo-corpo"
                id="${prefixo}-corpo"
                ${aberto ? "" : "hidden"}
            >
                ${corpo}
            </div>

        </section>

    `;

}


function ativarCard(prefixo) {

    const botao =
        document.getElementById(
            prefixo + "-toggle"
        );

    const corpo =
        document.getElementById(
            prefixo + "-corpo"
        );

    if (!botao || !corpo) {

        return;

    }

    botao.addEventListener(
        "click",
        () => {

            const abrir =
                corpo.hidden;

            corpo.hidden =
                !abrir;

            botao.setAttribute(
                "aria-expanded",
                abrir ? "true" : "false"
            );

            botao.querySelector(
                ".arquetipo-seta"
            ).textContent =
                abrir ? "▲" : "▼";

            localStorage.setItem(
                botao.dataset.chave,
                abrir ? "1" : "0"
            );

        }
    );

}


function criarCardArquetipo() {

    const arquetipo =
        obterArquetipoSelecionado();

    if (!arquetipo) {

        return "";

    }

    let corpo = "";

    if (arquetipo.descricao) {

        corpo += `
            <p class="arquetipo-texto">
                ${escapeHTML(arquetipo.descricao)}
            </p>
        `;

    }

    if (arquetipo.vantagens) {

        corpo += `
            <p class="arquetipo-texto">
                <strong class="arquetipo-rotulo vantagem">Vantagens:</strong>
                ${escapeHTML(arquetipo.vantagens)}
            </p>
        `;

    }

    if (arquetipo.desvantagens) {

        corpo += `
            <p class="arquetipo-texto">
                <strong class="arquetipo-rotulo desvantagem-rotulo">Desvantagens:</strong>
                ${escapeHTML(arquetipo.desvantagens)}
            </p>
        `;

    }

    if (!corpo) {

        corpo = `
            <p class="arquetipo-vazio">
                Sem detalhes salvos.
            </p>
        `;

    }

    return montarCard(
        "arquetipo-card",
        "Arquétipo: " + arquetipo.nome,
        corpo,
        "arquetipoCardAberto"
    );

}


const DADOS_CLASSES = {
    "alquimista": {
        "nome": "Alquimista",
        "descricao": "Especialista em alquimia e preparação de substâncias.",
        "pericias": [
            "Alquimia",
            "Apotecário",
            "Prestidigitação"
        ]
    },
    "nobre": {
        "nome": "Nobre",
        "descricao": "Personagem acostumado à influência, autoridade e aos privilégios da alta sociedade.",
        "pericias": [
            "Intimidação",
            "Sobrevivência",
            "Atletismo"
        ]
    },
    "barbaro": {
        "nome": "Bárbaro",
        "descricao": "Guerreiro resistente que confia em sua força, resistência e ferocidade.",
        "pericias": [
            "Intimidação",
            "Sobrevivência",
            "Atletismo"
        ]
    },
    "bardo": {
        "nome": "Bardo",
        "descricao": "Artista e aventureiro que utiliza sua presença, conhecimento e talento.",
        "pericias": [
            "Artes",
            "Persuasão",
            "Diplomacia"
        ]
    },
    "bruxo": {
        "nome": "Bruxo",
        "descricao": "Usuário de conhecimentos sobrenaturais e poderes mágicos.",
        "pericias": [
            "Religião",
            "Alquimia",
            "Arcanismo"
        ]
    },
    "druida": {
        "nome": "Druida",
        "descricao": "Guardião da natureza especializado em sobrevivência e conhecimentos naturais.",
        "pericias": [
            "Sobrevivência",
            "Apotecário",
            "Intuição"
        ]
    },
    "feiticeiro": {
        "nome": "Feiticeiro",
        "descricao": "Personagem dotado de poderes mágicos e afinidade sobrenatural.",
        "pericias": [
            "Arcanismo",
            "Diplomacia",
            "Intuição"
        ]
    },
    "guerreiro": {
        "nome": "Guerreiro",
        "descricao": "Combatente treinado para enfrentar seus adversários diretamente.",
        "pericias": [
            "Atletismo",
            "Esquiva",
            "Intimidação"
        ]
    },
    "ladino": {
        "nome": "Ladino",
        "descricao": "Especialista em furtividade, trapaças e infiltração.",
        "pericias": [
            "Crime",
            "Furtividade",
            "Blefe"
        ]
    },
    "mago": {
        "nome": "Mago",
        "descricao": "Estudioso das artes arcanas, capaz de dominar diferentes formas de magia.",
        "pericias": [
            "Arcanismo",
            "Religião",
            "Intuição"
        ]
    },
    "monge": {
        "nome": "Monge",
        "descricao": "Combatente disciplinado que utiliza controle corporal, técnica e agilidade.",
        "pericias": [
            "Religião",
            "Atletismo",
            "Esquiva"
        ]
    },
    "paladino": {
        "nome": "Paladino",
        "descricao": "Guerreiro guiado por seus princípios e treinamento marcial.",
        "pericias": [
            "Etiqueta",
            "Medicina",
            "Atletismo"
        ]
    },
    "ranger": {
        "nome": "Ranger",
        "descricao": "Explorador acostumado a ambientes selvagens, rastreamento e movimentação silenciosa.",
        "pericias": [
            "Sobrevivência",
            "Furtividade",
            "Intuição"
        ]
    },
    "samurai": {
        "nome": "Samurai",
        "descricao": "Guerreiro disciplinado e especializado em técnicas de combate.",
        "pericias": [
            "Atletismo",
            "Intimidação",
            "Percepção"
        ]
    },
    "vampiro": {
        "nome": "Vampiro",
        "descricao": "Criatura sobrenatural que combina presença, agilidade e capacidades físicas extraordinárias.",
        "pericias": [
            "Persuasão",
            "Esquiva",
            "Atletismo"
        ]
    },
    "viking": {
        "nome": "Viking",
        "descricao": "Guerreiro acostumado a viagens, sobrevivência e confrontos físicos.",
        "pericias": [
            "Sobrevivência",
            "Atletismo",
            "Diplomacia"
        ]
    },
    "xama": {
        "nome": "Xamã",
        "descricao": "Conhecedor de tradições, medicina e aspectos espirituais ligados à natureza.",
        "pericias": [
            "Medicina",
            "Sobrevivência",
            "Religião"
        ]
    },
    "clerigo": {
        "nome": "Clérigo",
        "descricao": "Devoto que utiliza sua fé, conhecimento religioso e força espiritual.",
        "pericias": [
            "Religião",
            "Intuição",
            "Persuasão"
        ]
    }
};


function criarCardClasse() {

    const salva =
        localStorage.getItem(
            "classe"
        ) ||
        localStorage.getItem(
            "classeSelecionada"
        );

    if (!salva) {

        return "";

    }

    const chave =
        normalizarTexto(salva);

    const dados =
        DADOS_CLASSES[
            ALIAS_CLASSE[chave] || chave
        ];

    const nome =
        dados ? dados.nome : salva;

    return `

        <section class="classe-card" id="classe-card">

            <div class="classe-cabecalho">

                <span>
                    ${escapeHTML("Classe: " + nome)}
                </span>

            </div>

        </section>

    `;

}


/* HISTÓRIA */

const listaDesvantagens = [

    "Cegueira",
    "Analfabetismo",
    "Surdez",
    "Problemas psicológicos",
    "Fala muito alto",
    "Fala muito baixo",
    "Sem noção",
    "Audição lenta",
    "Sem expressões",
    "Timidez",
    "Sem regras sociais",
    "Visão",
    "Saúde frágil",
    "Miopia"

];


function carregarDadosHistoria() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "dadosHistoria"
            )
        ) || {

            fisico: "",
            personalidade: "",
            historia: "",
            desvantagens: []

        };

    } catch (erro) {

        return {

            fisico: "",
            personalidade: "",
            historia: "",
            desvantagens: []

        };

    }

}


function salvarDadosHistoria() {

    const fisico =
        document.getElementById(
            "descricao-fisica"
        );

    const personalidade =
        document.getElementById(
            "personalidade-personagem"
        );

    const historia =
        document.getElementById(
            "historia-personagem"
        );

    const selecionadas =
        Array.from(
            document.querySelectorAll(
                ".checkbox-desvantagem:checked"
            )
        ).map(
            checkbox =>
                checkbox.value
        );


    const dados = {

        fisico:
            fisico
                ? fisico.value
                : "",

        personalidade:
            personalidade
                ? personalidade.value
                : "",

        historia:
            historia
                ? historia.value
                : "",

        desvantagens:
            selecionadas

    };


    localStorage.setItem(
        "dadosHistoria",
        JSON.stringify(
            dados
        )
    );

}


function mostrarHistoria() {

    if (!conteudo || !tituloSecao) {

        return;

    }

    tituloSecao.textContent =
        "História";


    const dados =
        carregarDadosHistoria();


    let html = `

        <div class="historia">

            ${criarCardClasse()}

            <div class="historia-bloco">

                <h2>
                    Descrição física do personagem
                </h2>

                <textarea
                    id="descricao-fisica"
                    placeholder="Descreva coisas como idade, aparência física, estilo..."
                ></textarea>

            </div>


            <div class="historia-bloco">

                <h2>
                    Personalidade do seu personagem
                </h2>

                <textarea
                    id="personalidade-personagem"
                    placeholder="Descreva a personalidade"
                ></textarea>

            </div>


            <div class="historia-bloco">

                <h2>
                    História do seu personagem
                </h2>

                <textarea
                    id="historia-personagem"
                    placeholder="Descreva o passado do seu personagem"
                ></textarea>

            </div>


            <div class="desvantagens">

                <h2>
                    Desvantagens
                </h2>

                <div class="desvantagens-lista">

    `;


    listaDesvantagens.forEach(
        desvantagem => {

            const marcada =
                dados.desvantagens.includes(
                    desvantagem
                );

            html += `

                <label class="desvantagem">

                    <input
                        type="checkbox"
                        class="checkbox-desvantagem"
                        value="${escapeHTML(
                            desvantagem
                        )}"
                        ${
                            marcada
                                ? "checked"
                                : ""
                        }
                    >

                    <span>
                        ${escapeHTML(
                            desvantagem
                        )}
                    </span>

                </label>

            `;

        }
    );


    html += `

                </div>

            </div>

        </div>

    `;


    conteudo.innerHTML =
        html;


    document.getElementById(
        "descricao-fisica"
    ).value =
        dados.fisico || "";


    document.getElementById(
        "personalidade-personagem"
    ).value =
        dados.personalidade || "";


    document.getElementById(
        "historia-personagem"
    ).value =
        dados.historia || "";


    document
        .querySelectorAll(
            "#descricao-fisica, #personalidade-personagem, #historia-personagem"
        )
        .forEach(
            campo => {

                campo.addEventListener(
                    "input",
                    salvarDadosHistoria
                );

            }
        );


    document
        .querySelectorAll(
            ".checkbox-desvantagem"
        )
        .forEach(
            checkbox => {

                checkbox.addEventListener(
                    "change",
                    salvarDadosHistoria
                );

            }
        );

}


/* INVENTÁRIO */

function carregarInventario() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "inventario"
            )
        ) || [];

    } catch (erro) {

        return [];

    }

}


function salvarInventario(
    itens
) {

    localStorage.setItem(
        "inventario",
        JSON.stringify(
            itens
        )
    );

}


function escapeHTML(texto) {

    if (
        texto === null ||
        texto === undefined
    ) {

        return "";

    }

    return String(texto)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


function mostrarInventario() {

    if (!conteudo || !tituloSecao) {

        return;

    }

    tituloSecao.textContent =
        "Inventário";


    const itens =
        carregarInventario();


    let html = `

        <div class="inventario">

            <button
                type="button"
                class="criar-registro"
                id="criar-item"
            >
                Criar item
            </button>

            <div class="inventario-lista">

    `;


    itens.forEach(
        (item, index) => {

            html += `

                <div
                    class="item-inventario"
                >

                    <button
                        type="button"
                        class="remover-registro"
                        data-index="${index}"
                    >
                        Remover
                    </button>

                    <input
                        type="text"
                        class="item-inventario-nome"
                        data-index="${index}"
                        value="${escapeHTML(
                            item.nome
                        )}"
                        placeholder="Digite o nome do item..."
                    >

                    <textarea
                        class="item-inventario-info"
                        data-index="${index}"
                        placeholder="Digite informações do item..."
                    >${escapeHTML(
                        item.info
                    )}</textarea>

                </div>

            `;

        }
    );


    html += `

            </div>

        </div>

    `;


    conteudo.innerHTML =
        html;


    /* CRIAR ITEM */

    const criarItem =
        document.getElementById(
            "criar-item"
        );


    if (criarItem) {

        criarItem.addEventListener(
            "click",
            () => {

                const itensAtuais =
                    carregarInventario();

                itensAtuais.push({

                    nome: "",
                    info: ""

                });

                salvarInventario(
                    itensAtuais
                );

                mostrarInventario();


                const campos =
                    document.querySelectorAll(
                        ".item-inventario-nome"
                    );

                if (campos.length) {

                    campos[
                        campos.length - 1
                    ].focus();

                }

            }
        );

    }


    /* REMOVER ITEM */

    document
        .querySelectorAll(
            ".item-inventario .remover-registro"
        )
        .forEach(
            botao => {

                botao.addEventListener(
                    "click",
                    () => {

                        const index =
                            Number(
                                botao.dataset.index
                            );

                        const itens =
                            carregarInventario();

                        if (
                            !itens[index]
                        ) {

                            return;

                        }

                        itens.splice(
                            index,
                            1
                        );

                        salvarInventario(
                            itens
                        );

                        mostrarInventario();

                    }
                );

            }
        );


    /* SALVAR NOME */

    document
        .querySelectorAll(
            ".item-inventario-nome"
        )
        .forEach(
            campo => {

                campo.addEventListener(
                    "input",
                    () => {

                        const itens =
                            carregarInventario();

                        const index =
                            Number(
                                campo.dataset.index
                            );

                        if (
                            !itens[index]
                        ) {

                            return;

                        }

                        itens[index].nome =
                            campo.value;

                        salvarInventario(
                            itens
                        );

                    }
                );

            }
        );


    /* SALVAR INFORMAÇÕES */

    document
        .querySelectorAll(
            ".item-inventario-info"
        )
        .forEach(
            campo => {

                campo.addEventListener(
                    "input",
                    () => {

                        const itens =
                            carregarInventario();

                        const index =
                            Number(
                                campo.dataset.index
                            );

                        if (
                            !itens[index]
                        ) {

                            return;

                        }

                        itens[index].info =
                            campo.value;

                        salvarInventario(
                            itens
                        );

                    }
                );

            }
        );

}


/* ATAQUES */

function carregarAtaques() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "ataques"
            )
        ) || [];

    } catch (erro) {

        return [];

    }

}


function salvarAtaques(
    ataques
) {

    localStorage.setItem(
        "ataques",
        JSON.stringify(
            ataques
        )
    );

}


function mostrarAtaques() {

    if (!conteudo || !tituloSecao) {

        return;

    }

    tituloSecao.textContent =
        "Ataques";


    const ataques =
        carregarAtaques();


    let html = `

        <div class="ataques">

            ${criarCardArquetipo()}

            <button
                type="button"
                class="criar-registro"
                id="criar-ataque"
            >
                Criar ataque
            </button>

    `;


    ataques.forEach(
        (ataque, index) => {

            html += `

                <div
                    class="registro-card"
                >

                    <button
                        type="button"
                        class="remover-registro"
                        data-index="${index}"
                    >
                        Remover
                    </button>

                    <input
                        type="text"
                        class="registro-nome"
                        data-index="${index}"
                        value="${escapeHTML(
                            ataque.nome
                        )}"
                        placeholder="Digite o nome do ataque..."
                    >

                    <textarea
                        class="registro-info"
                        data-index="${index}"
                        placeholder="Digite informações do ataque..."
                    >${escapeHTML(
                        ataque.info
                    )}</textarea>

                </div>

            `;

        }
    );


    html += `

        </div>

    `;


    conteudo.innerHTML =
        html;


    ativarCard("arquetipo-card");


    /* CRIAR ATAQUE */

    const criarAtaque =
        document.getElementById(
            "criar-ataque"
        );


    if (criarAtaque) {

        criarAtaque.addEventListener(
            "click",
            () => {

                const ataquesAtuais =
                    carregarAtaques();

                ataquesAtuais.push({

                    nome: "",
                    info: ""

                });

                salvarAtaques(
                    ataquesAtuais
                );

                mostrarAtaques();


                const campos =
                    document.querySelectorAll(
                        ".registro-nome"
                    );

                if (campos.length) {

                    campos[
                        campos.length - 1
                    ].focus();

                }

            }
        );

    }


    /* REMOVER ATAQUE */

    document
        .querySelectorAll(
            ".registro-card .remover-registro"
        )
        .forEach(
            botao => {

                botao.addEventListener(
                    "click",
                    () => {

                        const index =
                            Number(
                                botao.dataset.index
                            );

                        const ataques =
                            carregarAtaques();

                        if (
                            !ataques[index]
                        ) {

                            return;

                        }

                        ataques.splice(
                            index,
                            1
                        );

                        salvarAtaques(
                            ataques
                        );

                        mostrarAtaques();

                    }
                );

            }
        );


    /* SALVAR NOME DO ATAQUE */

    document
        .querySelectorAll(
            ".registro-nome"
        )
        .forEach(
            campo => {

                campo.addEventListener(
                    "input",
                    () => {

                        const ataquesAtuais =
                            carregarAtaques();

                        const index =
                            Number(
                                campo.dataset.index
                            );

                        if (
                            !ataquesAtuais[index]
                        ) {

                            return;

                        }

                        ataquesAtuais[index].nome =
                            campo.value;

                        salvarAtaques(
                            ataquesAtuais
                        );

                    }
                );

            }
        );


    /* SALVAR INFORMAÇÕES DO ATAQUE */

    document
        .querySelectorAll(
            ".registro-info"
        )
        .forEach(
            campo => {

                campo.addEventListener(
                    "input",
                    () => {

                        const ataquesAtuais =
                            carregarAtaques();

                        const index =
                            Number(
                                campo.dataset.index
                            );

                        if (
                            !ataquesAtuais[index]
                        ) {

                            return;

                        }

                        ataquesAtuais[index].info =
                            campo.value;

                        salvarAtaques(
                            ataquesAtuais
                        );

                    }
                );

            }
        );

}


/* ATRIBUTOS */

const atributos = [
    "for",
    "des",
    "con",
    "int",
    "von",
    "car"
];


function carregarAtributos() {

    atributos.forEach(
        atributo => {

            const campo =
                document.getElementById(
                    atributo
                );

            if (!campo) {

                return;

            }

            const valorSalvo =
                localStorage.getItem(
                    `atributo_${atributo}`
                );

            if (
                valorSalvo !== null
            ) {

                campo.value =
                    valorSalvo;

            }

        }
    );

}


atributos.forEach(
    atributo => {

        const campo =
            document.getElementById(
                atributo
            );

        if (!campo) {

            return;

        }

        campo.addEventListener(
            "input",
            () => {

                let valor =
                    Number(
                        campo.value
                    );

                if (valor < 0) {

                    valor = 0;

                }

                if (valor > 6) {

                    valor = 6;

                }

                campo.value =
                    valor;

                localStorage.setItem(
                    `atributo_${atributo}`,
                    valor
                );

            }
        );

    }
);


carregarAtributos();


/* TROCAR SEÇÃO */

function trocarSecao(
    secao
) {

    localStorage.setItem(
        "ultimaSecaoFicha",
        secao
    );


    switch (secao) {

        case "historia":

            mostrarHistoria();

            break;


        case "inventario":

            mostrarInventario();

            break;


        case "ataques":

            mostrarAtaques();

            break;


        case "pericias":

            mostrarPericias();

            break;


        default:

            mostrarPericias();

            break;

    }

}


/* MENU */

botoesMenu.forEach(
    botao => {

        botao.addEventListener(
            "click",
            () => {

                botoesMenu.forEach(
                    outroBotao => {

                        outroBotao.classList.remove(
                            "ativo"
                        );

                    }
                );


                const secao =
                    botao.dataset.secao;


                botao.classList.add(
                    "ativo"
                );


                trocarSecao(
                    secao
                );

            }
        );

    }
);


/* INICIALIZAÇÃO */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        iniciarPersonagem();


        const ultimaSecao =
            localStorage.getItem(
                "ultimaSecaoFicha"
            ) ||
            "pericias";


        botoesMenu.forEach(
            botao => {

                botao.classList.remove(
                    "ativo"
                );

            }
        );


        const botaoAtivo =
            document.querySelector(
                `[data-secao="${ultimaSecao}"]`
            );


        if (botaoAtivo) {

            botaoAtivo.classList.add(
                "ativo"
            );

        }


        trocarSecao(
            ultimaSecao
        );

    }
);