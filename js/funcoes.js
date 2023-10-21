let pontosJogador1 = 0;
        let pontosJogador2 = 0;
        let jogoTerminado = false;

        document.querySelector('#iniciar').addEventListener('click', function () {
            const nome1Input = document.querySelector('#nome1');
            const nome2Input = document.querySelector('#nome2');
            const placar = document.querySelector('#placar');
            const canvas = document.querySelector('#canvas');

            const nome1 = nome1Input.value.trim();
            const nome2 = nome2Input.value.trim();

            if (nome1 === "" || nome2 === "") {
                alert("É preciso preencher os nomes para iniciar o jogo.");
            } else {
                const nomeUsuarios = document.querySelector('#nomeUsuarios');
                nomeUsuarios.style.display = 'none';

                placar.style.display = 'block';
                placar.innerHTML = `${nome1}: ${pontosJogador1} | ${nome2}: ${pontosJogador2}`;
                canvas.style.display = 'block';

                const cnv = document.querySelector('#canvas');
                const ctx = cnv.getContext('2d');

                let moveLeft1 = false;
                let moveUp1 = false;
                let moveRight1 = false;
                let moveDown1 = false;

                let moveLeft2 = false;
                let moveUp2 = false;
                let moveRight2 = false;
                let moveDown2 = false;

                const quadrado1 = new Quadrado(20, 10, 50, 70, "#00549c", 5);
                const quadrado2 = new Quadrado(900, 10, 50, 70, "#df143c", 5);

                const obstaculos = [
                    new Quadrado(500, 200, 400, 50, "#8d6fbe", 0),
                    new Quadrado(750, 10, 100, 50, "#8d6fbe", 0),
                    new Quadrado(110, 10, 100, 50, "#8d6fbe", 0),
                    new Quadrado(250, 100, 150, 50, "#8d6fbe", 0),
                    new Quadrado(50, 300, 200, 50, "#8d6fbe", 0),
                    new Quadrado(620, 300, 50, 50, "#8d6fbe", 0),
                    new Quadrado(100, 380, 40, 50, "#8d6fbe", 0),
                    new Quadrado(400, 400, 40, 50, "#8d6fbe", 0),
                    new Quadrado(820, 440, 100, 50, "#8d6fbe", 0),
                    new Quadrado(400, 400, 20, 50, "#8d6fbe", 0),
                ];

                window.addEventListener('keydown', function (e) {
                    const nomeKey = e.key;
                    switch (nomeKey) {
                        case 'ArrowLeft':
                            moveLeft1 = true;
                            break;
                        case 'ArrowUp':
                            moveUp1 = true;
                            break;
                        case 'ArrowRight':
                            moveRight1 = true;
                            break;
                        case 'ArrowDown':
                            moveDown1 = true;
                            break;


                        case 'a':
                            moveLeft2 = true;
                            break;
                        case 'w':
                            moveUp2 = true;
                            break;
                        case 'd':
                            moveRight2 = true;
                            break;
                        case 's':
                            moveDown2 = true;
                            break;
                    }
                });

                window.addEventListener('keyup', (e) => {
                    const key = e.key;
                    switch (key) {
                        case 'ArrowLeft':
                            moveLeft1 = false;
                            break;
                        case 'ArrowUp':
                            moveUp1 = false;
                            break;
                        case 'ArrowRight':
                            moveRight1 = false;
                            break;
                        case 'ArrowDown':
                            moveDown1 = false;
                            break;


                        case 'a':
                            moveLeft2 = false;
                            break;
                        case 'w':
                            moveUp2 = false;
                            break;
                        case 'd':
                            moveRight2 = false;
                            break;
                        case 's':
                            moveDown2 = false;
                            break;
                    }
                });

                function moverQuadrados() {
                    if (jogoTerminado) {
                        return; 
                    }

                    if (moveLeft1 && !moveRight1) {
                        quadrado1.posX -= quadrado1.velocidade;
                    }
                    if (moveRight1 && !moveLeft1) {
                        quadrado1.posX += quadrado1.velocidade;
                    }
                    if (moveUp1 && !moveDown1) {
                        quadrado1.posY -= quadrado1.velocidade;
                    }
                    if (moveDown1 && !moveUp1) {
                        quadrado1.posY += quadrado1.velocidade;
                    }


                    if (moveLeft2 && !moveRight2) {
                        quadrado2.posX -= quadrado2.velocidade;
                    }
                    if (moveRight2 && !moveLeft2) {
                        quadrado2.posX += quadrado2.velocidade;
                    }
                    if (moveUp2 && !moveDown2) {
                        quadrado2.posY -= quadrado2.velocidade;
                    }
                    if (moveDown2 && !moveUp2) {
                        quadrado2.posY += quadrado2.velocidade;
                    }

                    for (const obstaculo of obstaculos) {
                        if (
                            quadrado1.posX < obstaculo.posX + obstaculo.width &&
                            quadrado1.posX + quadrado1.width > obstaculo.posX &&
                            quadrado1.posY < obstaculo.posY + obstaculo.height &&
                            quadrado1.posY + quadrado1.height > obstaculo.posY
                        ) {
                            quadrado1.posX = 20;
                            quadrado1.posY = 10;
                        }

                        if (
                            quadrado2.posX < obstaculo.posX + obstaculo.width &&
                            quadrado2.posX + quadrado2.width > obstaculo.posX &&
                            quadrado2.posY < obstaculo.posY + obstaculo.height &&
                            quadrado2.posY + quadrado2.height > obstaculo.posY
                        ) {
                            quadrado2.posX = 900;
                            quadrado2.posY = 10;
                        }
                    }

                    if (
                        quadrado1.posX < quadrado2.posX + quadrado2.width &&
                        quadrado1.posX + quadrado1.width > quadrado2.posX &&
                        quadrado1.posY < quadrado2.posY + quadrado2.height &&
                        quadrado1.posY + quadrado1.height > quadrado2.posY
                    ) {

                        if (quadrado1.posX < quadrado2.posX) {
                            pontosJogador1++;
                        } else {
                            pontosJogador2++;
                        }

                        placar.innerHTML = `${nome1}: ${pontosJogador1} | ${nome2}: ${pontosJogador2}`;

                        quadrado1.posX = 20;
                        quadrado1.posY = 10;
                        quadrado2.posX = 900;
                        quadrado2.posY = 10;

                        if (pontosJogador1 === 5) {
                            placar.innerHTML = `END GAME! ${nome1} ganhou!`;
                            jogoTerminado = true;
                        } else if (pontosJogador2 === 5) {
                            placar.innerHTML = `END GAME! ${nome2} ganhou!`;
                            jogoTerminado = true;
                        }
                    }

                    quadrado1.posX = Math.max(0, Math.min(cnv.width - quadrado1.width, quadrado1.posX));
                    quadrado1.posY = Math.max(0, Math.min(cnv.height - quadrado1.height, quadrado1.posY));

                    quadrado2.posX = Math.max(0, Math.min(cnv.width - quadrado2.width, quadrado2.posX));
                    quadrado2.posY = Math.max(0, Math.min(cnv.height - quadrado2.height, quadrado2.posY));
                }

                function exibirQuadrados() {
                  ctx.clearRect(0, 0, cnv.width, cnv.height);
              
                  ctx.drawImage(imagemJogador1, quadrado1.posX, quadrado1.posY, quadrado1.width, quadrado1.height);
                  ctx.drawImage(imagemJogador2, quadrado2.posX, quadrado2.posY, quadrado2.width, quadrado2.height);

                  for (const obstaculo of obstaculos) {
                    ctx.fillStyle = obstaculo.color;
                    ctx.fillRect(obstaculo.posX, obstaculo.posY, obstaculo.width, obstaculo.height);
                  }
              }
              

                function atualizarTela() {
                    window.requestAnimationFrame(atualizarTela);
                    moverQuadrados();
                    exibirQuadrados();
                }

                atualizarTela();
            }
        });