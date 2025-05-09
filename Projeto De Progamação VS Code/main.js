// Seleciona todos os botões e os conteúdos das abas
const botoes = document.querySelectorAll(".botao");
const textos = document.querySelectorAll(".aba-conteudo");
const abasTexto = document.getElementById("abasTexto");

for (let i = 0; i < botoes.length; i++) {
  botoes[i].onclick = function () {
    for (let j = 0; j < botoes.length; j++) {
      botoes[j].classList.remove("ativo");
      textos[j].classList.remove("ativo", "fade-in");
    }

    botoes[i].classList.add("ativo");

    // Calcula altura antes e depois da troca
    const alturaAtual = abasTexto.offsetHeight;
    textos[i].classList.add("ativo");
    const novaAltura = textos[i].offsetHeight;
    textos[i].classList.remove("ativo");

    // Define altura fixa para animar transição
    abasTexto.style.maxHeight = alturaAtual + "px";
    setTimeout(() => {
        abasTexto.style.maxHeight = novaAltura + "px";
      }, 10);

    // Ativa nova aba após transição
    setTimeout(() => {
      textos[i].classList.add("ativo", "fade-in");
    }, 10);
  };
}

// Define datas para cada objetivo
const contadores = document.querySelectorAll(".contador");
const tempos = [
  new Date("2033-10-05T12:00:00"), // Casa Própria
  new Date("2029-12-05T12:00:00"), // Faculdade
  new Date("2034-06-15T12:00:00"), // Casamento
  new Date("2030-12-31T12:00:00")  // Psicologia
];

// Calcula tempo restante para o objetivo
function calculaTempo(tempoObjetivo) {
  let tempoAtual = new Date();
  let tempoFinal = tempoObjetivo - tempoAtual;
  let segundos = Math.floor(tempoFinal / 1000);
  let minutos = Math.floor(segundos / 60);
  let horas = Math.floor(minutos / 60);
  let dias = Math.floor(horas / 24);

  segundos %= 60;
  minutos %= 60;
  horas %= 24;

  return tempoFinal > 0 ? [dias, horas, minutos, segundos] : [0, 0, 0, 0];
}

// Atualiza os contadores no HTML
function atualizaCronometro() {
  for (let i = 0; i < contadores.length; i++) {
    const [d, h, m, s] = calculaTempo(tempos[i]);
    document.getElementById("dias" + i).textContent = d;
    document.getElementById("horas" + i).textContent = h;
    document.getElementById("min" + i).textContent = m;
    document.getElementById("seg" + i).textContent = s;
  }
}

// Inicia o cronômetro com atualização a cada segundo
function comecaCronometro() {
  atualizaCronometro();
  setInterval(atualizaCronometro, 1000);
}
comecaCronometro();

// Efeito de digitação no carregamento
const texto = "Meus objetivos do ano";
const elemento = document.getElementById("texto-maquina");
let index = 0;

function digitar() {
  if (index < texto.length) {
    elemento.innerHTML += texto.charAt(index);
    index++;
    setTimeout(digitar, 100);
  }
}
document.addEventListener("DOMContentLoaded", digitar);

// Alternância entre modo claro e escuro
const btnTema = document.getElementById('toggle-tema');
btnTema.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');

  // Atualiza ícone do botão
  btnTema.textContent = document.body.classList.contains('light-mode') ? '🌞' : '🌙';
});

// Botão secreto ativa o mini-game
document.getElementById('botao-mini-game').addEventListener('click', () => {
  const gameDiv = document.getElementById('pong-game');
  gameDiv.style.display = gameDiv.style.display === 'none' ? 'block' : 'none';
  if (gameDiv.style.display === 'block') iniciarPong();
});

// Mini Pong Game
function iniciarPong() {
  const canvas = document.getElementById('pong-canvas');
  const ctx = canvas.getContext('2d');

  let paddleHeight = 40, paddleWidth = 6;
  let ballX = canvas.width / 2, ballY = canvas.height / 2;
  let ballSpeedX = 2, ballSpeedY = 2;
  let paddleY = canvas.height / 2 - paddleHeight / 2;
  let aiY = canvas.height / 2 - paddleHeight / 2;
  const paddleSpeed = 3;

  document.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    paddleY = e.clientY - rect.top - paddleHeight / 2;
  });

  function draw() {
    // fundo
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // bola
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(ballX, ballY, 5, 0, Math.PI * 2);
    ctx.fill();

    // jogador
    ctx.fillRect(0, paddleY, paddleWidth, paddleHeight);

    // oponente simples
    ctx.fillRect(canvas.width - paddleWidth, aiY, paddleWidth, paddleHeight);
  }

  function update() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // rebater nas paredes
    if (ballY < 0 || ballY > canvas.height) ballSpeedY *= -1;

    // colisão com jogador
    if (ballX < paddleWidth && ballY > paddleY && ballY < paddleY + paddleHeight) {
      ballSpeedX *= -1;
    }

    // colisão com IA
    if (ballX > canvas.width - paddleWidth && ballY > aiY && ballY < aiY + paddleHeight) {
      ballSpeedX *= -1;
    }

    // movimentação da IA
    if (aiY + paddleHeight / 2 < ballY) aiY += paddleSpeed;
    else aiY -= paddleSpeed;
  }

  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }

  loop();
}

/*Rick Rolled*/

const konamiCode = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a"
];
let konamiIndex = 0;

document.addEventListener("keydown", (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      showRickRoll();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

function showRickRoll() {
  // Container
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.top = "0";
  container.style.left = "0";
  container.style.width = "100vw";
  container.style.height = "100vh";
  container.style.background = "rgba(0, 0, 0, 0.8)";
  container.style.display = "flex";
  container.style.alignItems = "center";
  container.style.justifyContent = "center";
  container.style.zIndex = "9999";
  container.id = "rickroll";

  // GIF
  const gif = document.createElement("img");
  gif.src = "https://media.giphy.com/media/Vuw9m5wXviFIQ/giphy.gif";
  gif.style.width = "400px";
  gif.style.border = "5px solid #fff";
  gif.style.boxShadow = "0 0 20px #000";
  gif.style.borderRadius = "12px";

  // Música
  const audio = document.createElement("audio");
  audio.src = "https://www.myinstants.com/media/sounds/rickroll.mp3";
  audio.autoplay = true;
  audio.loop = true;

  // Botão de fechar
  const closeBtn = document.createElement("button");
  closeBtn.innerText = "Fechar";
  closeBtn.style.position = "absolute";
  closeBtn.style.top = "20px";
  closeBtn.style.right = "20px";
  closeBtn.style.padding = "10px 15px";
  closeBtn.style.background = "#fff";
  closeBtn.style.border = "none";
  closeBtn.style.borderRadius = "8px";
  closeBtn.style.cursor = "pointer";
  closeBtn.style.fontWeight = "bold";
  closeBtn.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";

  closeBtn.onclick = () => {
    audio.pause();
    container.remove();
  };

  // Adiciona tudo ao container
  container.appendChild(gif);
  container.appendChild(audio);
  container.appendChild(closeBtn);
  document.body.appendChild(container);
}

/* Alto Constraste */

const contrastBtn = document.getElementById("toggle-contrast");

contrastBtn.addEventListener("click", () => {
  document.body.classList.toggle("high-contrast");
});