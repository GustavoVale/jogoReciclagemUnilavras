/* Informações Lixeira */
var lixeira, direcaoLixeiraEixoX, direcaoLixeiraEixoY;
var velocidadeLixeira, posicaoLixeiraEixoX, posicaoLixeiraEixoY;

/* Informações Garrafa */
var velocidadeGarrafa;
var freqCriaGarrafa;
var contaGarrafas;
var contaGarrafasInicial;
var tempoCriaGarrafa;
var garrafasColetadas;
var contadorGarrafasColetadas;

var idMoeda;
var idColisao;
var idSom, idSom2;

/* Informações tela */
var telaWidth, telaHeight;
var frames;
var telaInicio;

/* Status do Jogo */
var jogoEstaRodando;

/** Funções de direção/ gerenciamento da lixeira*/

// Quando aperta tecla
function teclaDw() {
    var tecla = parseInt(event.keyCode);
    if(tecla === 38) { // Move pra cima
        direcaoLixeiraEixoY = -1;
    } else if (tecla === 40) { // Move pra baixo
       direcaoLixeiraEixoY = 1; 
    } 
    
    if (tecla === 39) { // Move para a direita
        direcaoLixeiraEixoX = 1;
    } else if (tecla === 37) { // Move para a esquerda
        direcaoLixeiraEixoX = -1;
    }

}

// Quando desaperta tecla
function teclaUp() {
    var tecla = parseInt(event.keyCode);
    
    if(tecla == 38 || tecla == 40) { // Pra cima ou pra baixo
        direcaoLixeiraEixoY = 0;
    }
    
    if(tecla == 39 || tecla == 37) { //Pra direita ou pra esquerda
        direcaoLixeiraEixoX = 0;
    }
}

// Atualiza posição lixeira
function controlaLixeira() {
    posicaoLixeiraEixoY += direcaoLixeiraEixoY * velocidadeLixeira;
    posicaoLixeiraEixoX += direcaoLixeiraEixoX * velocidadeLixeira;
    lixeira.style.top = posicaoLixeiraEixoY + "px";
    lixeira.style.left = posicaoLixeiraEixoX + "px";
}

/** Funções para gerenciar garrafas */

function criaGarrafa() {
    if(jogoEstaRodando) {
        const posicaoEixoX = Math.random() * telaWidth;
        const posicaoEixoY = 0;
        const garrafa = document.createElement("div");
        const att1 = document.createAttribute("class");
        const att2 = document.createAttribute("style");
        att1.value = "garrafa";
        att2.value = "top:" + posicaoEixoY + "px; left:" + posicaoEixoX + "px;";
        garrafa.setAttributeNode(att1);
        garrafa.setAttributeNode(att2);
        document.body.appendChild(garrafa);
        contaGarrafas--;
    }
}

function controlaGarrafa() {
    const garrafas = document.getElementsByClassName("garrafa");
    const numeroDeGarrafas = garrafas.length;
    for (let i = 0; i < numeroDeGarrafas; i++) {
        if (garrafas[i]) {
            var posicaoGarrafaAtual = garrafas[i].offsetTop;
            posicaoGarrafaAtual += velocidadeGarrafa;
            garrafas[i].style.top = posicaoGarrafaAtual + "px";
            if (posicaoGarrafaAtual > telaHeight) {
                colisaoChao(garrafas[i].offsetLeft);
                garrafas[i].remove();
            }
        }
    }
}

function removeGarrafas() {
    const garrafas = document.getElementsByClassName("garrafa");
    const numeroDeGarrafas = garrafas.length;
    for (let i = 0; i < numeroDeGarrafas; i++) {
        if (garrafas[i]) {
            garrafas[i].remove();
        }
    }
}

/** Representa colisao */
function colisaoGarrafaLixeira() {
    const garrafas = document.getElementsByClassName("garrafa");
    const lixeira = document.getElementById("lixeira");
    const numeroDeGarrafas = garrafas.length;
    for (let i = 0; i < numeroDeGarrafas; i++) {
        if (garrafas[i]) {
            // teste de colisão
            if (
                (
                    lixeira.offsetTop <= garrafas[i].offsetTop + 60 && // Em cima da lixeira com embaixo da garrafa
                    lixeira.offsetTop + 80 >= garrafas[i].offsetTop // Embaixo/meio da lixeira com em cima da garrafa
                )
                &&
                (
                    lixeira.offsetLeft <= garrafas[i].offsetLeft + 29 && // Esquerda da lixeira com a direita da garrafa
                    lixeira.offsetLeft + 60 >= garrafas[i].offsetLeft // Direita da lixeira com esqueda da garrafa
                )
            ){
                criaMoeda(garrafas[i].offsetLeft, garrafas[i].offsetTop);
                garrafas[i].remove();
            }
        }
    }
}

function colisaoChao(x) {
    if (document.getElementById("colisao" + (idColisao - 3))) {
        document.getElementById("colisao" + (idColisao - 3)).remove();
    }
    let colisao = document.createElement("div");
    let img = document.createElement("img");
    let som = document.createElement("audio");
    let att1 = document.createAttribute("class");
    let att2 = document.createAttribute("style");
    let att3 = document.createAttribute("id");
    let att4 = document.createAttribute("src");
    let att5 = document.createAttribute("src");
    let att6 = document.createAttribute("id");
    att1.value = "colisao";
    att2.value = "top:" + (telaHeight- 50)  + "px; left:" + x + "px;";
    att3.value = "colisao" + idColisao;
    att4.value = "alerta.png?" + new Date();
    att5.value = "erro.wav?" + new Date();
    att6.value = "som" + idSom2;
    colisao.setAttributeNode(att1);
    colisao.setAttributeNode(att2);
    colisao.setAttributeNode(att3);
    img.setAttributeNode(att4);
    som.setAttributeNode(att5);
    som.setAttributeNode(att6);
    colisao.appendChild(img);
    colisao.appendChild(som);
    document.body.appendChild(colisao);
    document.getElementById("som" + idSom2).play();
    idColisao++;
    contadorGarrafasColetadas.innerHTML = "Garrafas coletadas: " + garrafasColetadas;
    idSom2++;

}

/** Cria Moeda */
function criaMoeda(x, y) {
    if (document.getElementById("moeda" + (idMoeda - 5))) {
        document.getElementById("moeda" + (idMoeda - 5)).remove();
    }
    let moeda = document.createElement("div");
    let img = document.createElement("img");
    let som = document.createElement("audio");
    let att1 = document.createAttribute("class");
    let att2 = document.createAttribute("style");
    let att3 = document.createAttribute("id");
    let att4 = document.createAttribute("src");
    let att5 = document.createAttribute("src");
    let att6 = document.createAttribute("id");
    att1.value = "moeda";
    att2.value = "top:" + y + "px; left:" + x + "px;";
    att3.value = "moeda" + idMoeda;
    att4.value = "moeda.png?" + new Date();
    att5.value = "moeda-sucesso.wav?" + new Date();
    att6.value = "som" + idSom;
    moeda.setAttributeNode(att1);
    moeda.setAttributeNode(att2);
    moeda.setAttributeNode(att3);
    img.setAttributeNode(att4);
    som.setAttributeNode(att5);
    som.setAttributeNode(att6);
    moeda.appendChild(img);
    moeda.appendChild(som);
    document.body.appendChild(moeda);
    document.getElementById("som" + idSom).play();
    idMoeda++;
    garrafasColetadas++;
    contadorGarrafasColetadas.innerHTML = "Garrafas coletadas: " + garrafasColetadas;
    idSom++;
}

/** Finaliza o jogo */
function finalizaGame() {
    if (jogoEstaRodando){
        setTimeout(function () {    
            removeGarrafas();
            jogoEstaRodando = false;
            
            document.getElementById("btnJogarNovamente").addEventListener("click", reinicia);
            lixeira.style.display = "none";
            contadorGarrafasColetadas.style.display = "none";
            telaFim.style.display = "block";
            document.getElementById("resultadoColetadas").innerHTML = garrafasColetadas +  " / " + contaGarrafasInicial;  
            
        }, 2000);
    }

    clearInterval(tempoCriaGarrafa);
}

function gameLoop() {
    
    if (jogoEstaRodando) {
        controlaLixeira();
        colisaoGarrafaLixeira();
        controlaGarrafa();
    }

    if (contaGarrafas <= 0) {
        finalizaGame();
    }

    frames = requestAnimationFrame(gameLoop);
}

function reinicia() {

    // Muda status do jogo
    jogoEstaRodando = true;

    // Inicialização do game
    telaWidth = window.innerWidth;
    telaHeight = window.innerHeight;

    // Inicializações do jogador
    direcaoLixeiraEixoX = 0;
    direcaoLixeiraEixoY = 0;
    posicaoLixeiraEixoX = telaWidth / 2;
    posicaoLixeiraEixoY = telaHeight - telaHeight / 5;
    lixeira = document.getElementById("lixeira");
    lixeira.style.top = posicaoLixeiraEixoY + "px";
    lixeira.style.left = posicaoLixeiraEixoX + "px";

    // Define quais elementos serão exibidos
    telaInicio.style.display = "none";
    telaFim.style.display = "none";
    lixeira.style.display = "block";
    contadorGarrafasColetadas = document.getElementById("contadorGarrafasColetadas");
    contadorGarrafasColetadas.style.display = "block";

    // Remover Garrafas Restantes da ultima execução
    removeGarrafas();
    garrafasColetadas = 0;

    // Limpa intervalos
    clearInterval(tempoCriaGarrafa);
    cancelAnimationFrame(frames);
    
    // Define parametros do jogo
    velocidadeLixeira = 10;
    velocidadeGarrafa = 3;
    contaGarrafas = 10;
    contaGarrafasInicial = contaGarrafas;
    freqCriaGarrafa = 1700;
    garrafasColetadas = 0;
    idSom, idSom2 = 0;
    idColisao = 0;
    
    // Define valor de garrafas coletadas no inicio do jogo
    contadorGarrafasColetadas.innerHTML = "Garrafas coletadas: " + garrafasColetadas;

    // Inicialização do contador de ids para moedas
    idMoeda = 0;

    // Define intervalo para criação de garrafas
    tempoCriaGarrafa = setInterval(criaGarrafa, freqCriaGarrafa);
    
    gameLoop();
}

function inicia() {
    
    // Pausa jogo
    jogoEstaRodando = false;
    
    // Cria tela inicial
    telaInicio = document.getElementById("telaInicio");
    document.getElementById("btnJogar").addEventListener("click", reinicia);
    telaInicio.style.display = "block";

}

window.addEventListener("load", inicia);
document.addEventListener("keydown", teclaDw);
document.addEventListener("keyup", teclaUp);