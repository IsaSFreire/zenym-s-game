function Quadrado(posX, posY, width, height, color, velocidade) {
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.color = color;
    this.velocidade = velocidade;
}

const imagemJogador1 =  new Image();
imagemJogador1.src = 'img/robo azul.png';

const imagemJogador2 =  new Image();
imagemJogador2.src = 'img/robo rosa.png';
