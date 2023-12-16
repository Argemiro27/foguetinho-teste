var segundos = 0;
var cronometro;

function atualizarCronometro() {
  segundos++;
  document.getElementById("cronometro").innerText = segundos + " segundo(s)";
  iniciarCronometro();
}

function iniciarCronometro() {
  cronometro = setTimeout(atualizarCronometro, 1000);
}

function pararCronometro() {
  clearTimeout(cronometro);
}

function resetarCronometro() {
  pararCronometro();
  segundos = 0;
  document.getElementById("cronometro").innerText = "0 segundo(s)";
}

function buscaTempo() {
  timeseconds = parseInt(document.getElementById("cronometro").innerText, 10);
  rocketcontainer = document.getElementById("rocket-emote");

  let newClassName;

  if (timeseconds <= 5) {
    if (timeseconds != 0) {
      newClassName = "rocket-container-5";
    } else {
      newClassName = "";
    }
  } else if (timeseconds <= 10) {
    newClassName = "rocket-container-10";
  } else if (timeseconds <= 15) {
    newClassName = "rocket-container-15";
  } else if (timeseconds <= 20) {
    newClassName = "rocket-container-20";
  } else if (timeseconds >= 25 || timeseconds <= 25) {
    newClassName = "rocket-container-25";
  }

  if (timeseconds >= 30) {
    pararCronometro();
    resetarCronometro();
  }

  // Verifica se a nova classe não é uma string vazia
  if (newClassName !== "") {
    // Verifica se a classe atual é diferente da nova classe
    if (rocketcontainer.className !== newClassName) {
      // Remove todas as classes existentes antes de adicionar a nova classe
      rocketcontainer.className = "";
      // Adiciona a nova classe
      rocketcontainer.classList.add(newClassName);
    }
  }
}

function iniciajogo() {
  var numeroSorteado = sortearNumero(); // Certifique-se de ter a função sortearNumero definida
  var numEscolhido = parseInt(
    document.getElementById("numeroEscolhido").value,
    10
  );

  document.getElementById("rocket-emote").style.display = "flex";
  document.getElementById("bomb-emote").style.display = "none";

  iniciarCronometro();

  setInterval(buscaTempo, 5000);

  // Usando setInterval para chamar verificaExplosaoBomba a cada segundo (1000 milissegundos)
  setInterval(function () {
    var timeseconds = parseInt(
      document.getElementById("cronometro").innerText,
      10
    );
    verificaExplosaoBomba(timeseconds, numEscolhido, numeroSorteado);
  }, 1000);
}

function verificaExplosaoBomba(timeseconds, numEscolhido, numeroSorteado) {
  if (timeseconds == numeroSorteado) {
    pararCronometro();
    resetarCronometro();
    document.getElementById("rocket-emote").style.display = "none";
    document.getElementById("bomb-emote").style.display = "flex";

    verificaWin(numEscolhido, numeroSorteado);
  }
}

function verificaWin(numEscolhido, numeroSorteado) {
    var mensagem = "";
  
    if (numEscolhido <= numeroSorteado) {
      mensagem = "Parabéns! Você venceu!";
    } else {
      mensagem = "Oh não! Você não ganhou desta vez. Tente novamente!";
    }
  
    exibirModal(mensagem);
  }
  
  function exibirModal(mensagem) {
    var modal = document.getElementById("modal");
    var mensagemElement = document.getElementById("mensagem");
  
    mensagemElement.innerHTML = mensagem;
    modal.style.display = "block";
  }
  
  function fecharModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
  }
  

function sortearNumero() {
  // Gera um número aleatório entre 10 e 30
  var numeroSorteado = Math.floor(Math.random() * (30 - 10 + 1)) + 10;

  // Retorna o número sorteado
  return numeroSorteado;
}
