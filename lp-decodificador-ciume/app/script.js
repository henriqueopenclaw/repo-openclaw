/* Decodificador de Ciúme™ — Mini-App Script
 *
 * 3 padrões de diagnóstico:
 *   R = Ciúme Racional (baseado em comportamento real do parceiro)
 *   A = Ciúme Ansioso (padrão de apego, vem de dentro, independe do parceiro)
 *   D = Dependência Emocional (identidade fundida com o relacionamento)
 *
 * Cada resposta adiciona pontos ao padrão correspondente.
 * Ao final, o padrão com mais pontos define o diagnóstico.
 */

/* ═══ DADOS ═══ */

const perguntas = [
  {
    contexto: "Situação 1 de 5",
    texto: "Ele demorou 3 horas pra responder uma mensagem simples. Você viu que estava online. O que você fez?",
    opcoes: [
      { texto: "Mandei mensagem perguntando se estava tudo bem, de forma tranquila.", padrao: "R" },
      { texto: "Fiquei relendo a conversa tentando achar algum sinal de que algo mudou.", padrao: "A" },
      { texto: "Não consegui fazer mais nada até ele responder. A cabeça ficou travada naquilo.", padrao: "D" },
      { texto: "Mandei uma segunda mensagem com um tom mais seco, querendo ver a reação dele.", padrao: "A" },
    ]
  },
  {
    contexto: "Situação 2 de 5",
    texto: "Ele foi a uma festa sem você e chegou mais tarde do que combinado. Qual foi o seu pensamento automático?",
    opcoes: [
      { texto: "Pensei que ele deveria ter avisado o atraso — isso é justo de cobrar.", padrao: "R" },
      { texto: "A minha mente foi direto pra hipótese pior possível, mesmo sem nenhum motivo concreto.", padrao: "A" },
      { texto: "Me senti excluída, como se a vida dele pudesse existir sem mim e isso me assustou.", padrao: "D" },
      { texto: "Fiquei verificando as redes sociais dele pra tentar entender onde estava.", padrao: "A" },
    ]
  },
  {
    contexto: "Situação 3 de 5",
    texto: "Você viu uma ex dele comentar numa foto. Ele não falou nada sobre isso. Como você reagiu?",
    opcoes: [
      { texto: "Não gostei, mas esperei para ver se ele mencionaria — e se não mencionasse, eu falaria diretamente.", padrao: "R" },
      { texto: "Fiquei comparando a foto deles com a nossa relação por um tempo sem conseguir parar.", padrao: "A" },
      { texto: "Senti que precisava de uma garantia imediata de que eu ainda era importante pra ele.", padrao: "D" },
      { texto: "Fui ver o perfil dela e depois me senti péssima por ter feito isso.", padrao: "A" },
    ]
  },
  {
    contexto: "Situação 4 de 5",
    texto: "Vocês tiveram uma briga e ele ficou mais frio do que o normal nos dias seguintes. O que você fez?",
    opcoes: [
      { texto: "Pedi um momento pra conversar sobre o que tinha acontecido e como estávamos nos sentindo.", padrao: "R" },
      { texto: "Fiquei checando os sinais o tempo inteiro — tom de voz, tempo de resposta, emoji usado.", padrao: "A" },
      { texto: "Me senti mal a ponto de não conseguir focar em mais nada até ele agir de forma normal comigo.", padrao: "D" },
      { texto: "Mandei mensagens frequentes tentando resolver logo, mesmo que ele precisasse de espaço.", padrao: "A" },
    ]
  },
  {
    contexto: "Situação 5 de 5",
    texto: "Ele mencionou que está gostando de passar mais tempo no trabalho porque está num projeto interessante. Como você se sentiu?",
    opcoes: [
      { texto: "Fiquei feliz por ele, mas deixei claro que também preciso de tempo de qualidade com ele.", padrao: "R" },
      { texto: "Fiquei preocupada que o trabalho fosse uma forma de se afastar de mim aos poucos.", padrao: "A" },
      { texto: "Senti um vazio — como se ele ter uma vida rica fora de mim me ameaçasse.", padrao: "D" },
      { texto: "Perguntei várias vezes sobre o projeto para entender quem estava envolvido.", padrao: "A" },
    ]
  }
];

const resultados = {
  R: {
    badge: "Ciúme Racional",
    badgeClass: "result__badge--racional",
    titulo: "Ciúme Racional",
    descricao: "Seu ciúme não nasce do nada — ele é ativado por comportamentos concretos que percebe no parceiro. Quando algo acontece de verdade, você reage. O desafio aqui não é a intensidade do ciúme, mas aprender a nomear o que incomoda antes que vire acusação. Você tem mais recursos internos do que parece.",
    circuit: ["Comportamento real do parceiro", "Percepção direta", "Desconforto com a situação", "Expressão (ou repressão)"],
    acoes: [
      "Essa semana, quando sentir ciúme, escreva em uma linha o que o parceiro fez de concreto — não o que você interpretou, só o que aconteceu de fato.",
      "Antes de qualquer conversa difícil, espere 20 minutos após o gatilho. Você toma decisões muito melhores fora do estado reativo.",
      "Pratique o pedido direto: 'Quando você X acontece, eu me sinto Y. Posso te pedir Z?' Uma vez por dia, sobre qualquer coisa pequena."
    ],
    frase: "\"Eu quero te contar algo que me incomodou, não porque acho que você errou, mas porque é importante pra mim e quero que você saiba.\""
  },
  A: {
    badge: "Ciúme Ansioso",
    badgeClass: "result__badge--ansioso",
    titulo: "Ciúme Ansioso",
    descricao: "Seu ciúme não depende tanto do que o parceiro faz — ele nasce do seu sistema nervoso antes da situação terminar de acontecer. É um padrão de apego ansioso: o medo da rejeição ativa uma hipervigilância constante aos sinais do relacionamento. Isso cansa. E a boa notícia é que esse padrão tem chave — está na regulação interna, não no comportamento do parceiro.",
    circuit: ["Gatilho ambíguo", "Sistema nervoso em alerta", "Pensamento em espiral", "Ação de busca de segurança", "Alívio temporário"],
    acoes: [
      "Quando entrar em espiral, coloque os pés no chão e nomeie 5 coisas que consegue ver ao redor. Isso ativa o córtex pré-frontal e desacelera a amígdala.",
      "Crie uma lista de evidências reais de segurança no relacionamento — coisas que o parceiro fez nos últimos 30 dias que mostram presença. Leia quando o ciúme ativar.",
      "Identifique seu gatilho principal (atraso na resposta, distância física, assunto específico) e avise o parceiro com calma: 'Esse gatilho me afeta. Não é culpa sua, mas preciso que saiba.'"
    ],
    frase: "\"Eu sei que o que estou sentindo agora pode não ser proporcional ao que aconteceu. Mas é real pra mim, e precisava te contar.\""
  },
  D: {
    badge: "Dependência Emocional",
    badgeClass: "result__badge--dependencia",
    titulo: "Dependência Emocional",
    descricao: "O seu ciúme vai além do ciúme — é o medo de existir sem o relacionamento. Sua identidade e o relacionamento estão tão misturados que qualquer distância do parceiro parece uma ameaça à sua existência. Isso não é fraqueza. É um padrão aprendido. E ao contrário do que parece, a saída não é amar menos — é construir uma base interna de onde o amor possa vir de você, não depender de você.",
    circuit: ["Qualquer distância percebida", "Sensação de vazio ou ameaça existencial", "Urgência de reconexão", "Comportamentos de fusão", "Alívio temporário seguido de novo vazio"],
    acoes: [
      "Escolha uma atividade por semana que você faz completamente sozinha — sem envolver o parceiro nem falar sobre ele. Isso começa a reconstruir uma identidade própria.",
      "Toda manhã, anote três coisas sobre você que existem independente do relacionamento (habilidades, características, histórico). Isso parece simples e é mais difícil do que parece.",
      "Quando sentir o impulso de buscar o parceiro para regular uma emoção, espere 10 minutos e tente regular você mesma primeiro — respira, escreve, se move. Depois, se ainda precisar, vai."
    ],
    frase: "\"Eu quero estar com você porque te escolho, não porque preciso de você para me sentir inteira. E é por isso que estou trabalhando em mim.\""
  }
};

/* ═══ ESTADO ═══ */
let currentQuestion = 0;
let scores = { R: 0, A: 0, D: 0 };
let answered = false;

/* ═══ ELEMENTOS ═══ */
const screenIntro    = document.getElementById('screenIntro');
const screenQuestion = document.getElementById('screenQuestion');
const screenResult   = document.getElementById('screenResult');
const progressFill   = document.getElementById('progressFill');
const progressLabel  = document.getElementById('progressLabel');
const questionContext= document.getElementById('questionContext');
const questionText   = document.getElementById('questionText');
const optionsList    = document.getElementById('optionsList');
const btnStart       = document.getElementById('btnStart');
const btnRestart     = document.getElementById('btnRestart');

/* ═══ FUNÇÕES ═══ */

function showScreen(screen) {
  [screenIntro, screenQuestion, screenResult].forEach(s => {
    s.classList.remove('active');
    s.hidden = true;
  });
  screen.classList.add('active');
  screen.hidden = false;
}

function updateProgress(questionIndex) {
  const pct = questionIndex === null
    ? 100
    : Math.round((questionIndex / perguntas.length) * 100);
  progressFill.style.width = pct + '%';

  if (questionIndex === null) {
    progressLabel.textContent = 'Diagnóstico completo';
  } else {
    progressLabel.textContent = `Pergunta ${questionIndex + 1} de ${perguntas.length}`;
  }
}

function renderQuestion(index) {
  const q = perguntas[index];
  answered = false;

  questionContext.textContent = q.contexto;
  questionText.textContent = q.texto;

  // Limpa e renderiza opções
  optionsList.innerHTML = '';
  // Embaralha as opções para não ter padrão óbvio
  const opcoes = [...q.opcoes].sort(() => Math.random() - 0.5);

  opcoes.forEach((op) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.dataset.padrao = op.padrao;

    const indicator = document.createElement('div');
    indicator.className = 'option-btn__indicator';
    btn.appendChild(indicator);

    const text = document.createElement('span');
    text.textContent = op.texto;
    btn.appendChild(text);

    btn.addEventListener('click', () => selectOption(btn, op.padrao));
    optionsList.appendChild(btn);
  });

  updateProgress(index);
  lucide.createIcons();
}

function selectOption(btn, padrao) {
  if (answered) return;
  answered = true;

  // Visual: marcar selecionada
  document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');

  // Pontuar
  scores[padrao] = (scores[padrao] || 0) + 1;

  // Avançar após delay
  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < perguntas.length) {
      transitionTo(() => renderQuestion(currentQuestion));
    } else {
      showResult();
    }
  }, 600);
}

function transitionTo(callback) {
  const inner = screenQuestion.querySelector('.screen__inner');
  inner.style.opacity = '0';
  inner.style.transform = 'translateX(-16px)';
  inner.style.transition = 'opacity 0.22s ease, transform 0.22s ease';

  setTimeout(() => {
    callback();
    inner.style.opacity = '0';
    inner.style.transform = 'translateX(16px)';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        inner.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        inner.style.opacity = '1';
        inner.style.transform = 'translateX(0)';
      });
    });
  }, 220);
}

function getResultado() {
  let max = -1;
  let padrao = 'A';
  for (const [key, val] of Object.entries(scores)) {
    if (val > max) { max = val; padrao = key; }
  }
  return resultados[padrao];
}

function showResult() {
  const res = getResultado();
  updateProgress(null);

  // Badge
  const badge = document.getElementById('resultBadge');
  badge.textContent = res.badge;
  badge.className = 'result__badge ' + res.badgeClass;

  // Título e desc
  document.getElementById('resultTitle').textContent = res.titulo;
  document.getElementById('resultDesc').textContent = res.descricao;

  // Circuit map
  const circuitMap = document.getElementById('circuitMap');
  circuitMap.innerHTML = '';
  res.circuit.forEach((node, i) => {
    const nodeEl = document.createElement('span');
    nodeEl.className = 'circuit-node';
    nodeEl.textContent = node;
    circuitMap.appendChild(nodeEl);
    if (i < res.circuit.length - 1) {
      const arrowEl = document.createElement('i');
      arrowEl.setAttribute('data-lucide', 'arrow-right');
      arrowEl.className = 'circuit-arrow';
      circuitMap.appendChild(arrowEl);
    }
  });

  // Ações
  const acoesList = document.getElementById('acoesList');
  acoesList.innerHTML = '';
  res.acoes.forEach(acao => {
    const li = document.createElement('li');
    const icon = document.createElement('i');
    icon.setAttribute('data-lucide', 'check-circle-2');
    li.appendChild(icon);
    const text = document.createElement('span');
    text.textContent = acao;
    li.appendChild(text);
    acoesList.appendChild(li);
  });

  // Frase
  document.getElementById('fraseDestaque').textContent = res.frase;

  showScreen(screenResult);
  lucide.createIcons();

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startQuiz() {
  currentQuestion = 0;
  scores = { R: 0, A: 0, D: 0 };
  showScreen(screenQuestion);
  renderQuestion(0);
}

/* ═══ EVENTOS ═══ */
btnStart.addEventListener('click', startQuiz);
btnRestart.addEventListener('click', startQuiz);

/* ═══ INIT ═══ */
function init() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
  updateProgress(0);
}

document.readyState === 'loading'
  ? document.addEventListener('DOMContentLoaded', init)
  : init();
