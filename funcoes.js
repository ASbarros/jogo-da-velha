let jogador,
    //variavel para armazenar a escolha do jagador...
    computador,
    //variavel para armazenar a escolha do jagador...
    m_lugarVazio = new Array(3),
    //matriz para armazenar as posicoes escolhidas...
    m_jogador = new Array(3),
    //matriz para armazenar as posicoes escolhidas pelo jogador...
    m_computador = new Array(3),
    //matriz para armazenar as posicoes escolhidas pelo computador...
    jogadas = 0;
//para controlar o numero de jogados no jogo...
for (let index = 0; index < 3; index++) {
    m_lugarVazio[index] = new Array(3);
    m_computador[index] = new Array(3);
    m_jogador[index] = new Array(3);
}
for (let i = 0; i < m_computador.length; i++) {
    for (let j = 0; j < m_computador[i].length; j++) {
        m_computador[i][j] = false;
        m_jogador[i][j] = false;
        m_lugarVazio[i][j] = true;
    }
}

document.body.onload = function () {
    //quando a pagina for carregada...
    let div = document.createElement('div');
    div.setAttribute('id', 'conteiner');
    div.setAttribute('class', 'div');
    document.body.appendChild(div);
    createPergunta();
    $(this).one('click', (e) => {
        escolha = returnPositionX_porcentagem(e.pageX);
        if (escolha < 50) {
            //jogador escolheu X...
            jogador = 'x', computador = 'c';
        }
        else {
            //jogador escolheu circulo...
            jogador = 'c', computador = 'x';
        }
        //depois de 0,5 segundos...
        setTimeout(() => {
            $('#pergunta').remove();
            //remover a div da pergunta...
            createTabuleiro();
            //cria o tabuleiro do jogo da velha...
        }, 500);
    })
}
function returnPositionX_porcentagem(valor) {
    //retorna a posicao do click em porcentagem para qualquer lugar na tela...
    let x = (valor * 100) / $(window).width();
    return x;
}
function returnPositionY_porcentagem(valor) {
    //retorna a posicao do click em porcentagem para qualquer lugar na tela...
    let x = (valor * 100) / $(window).height();
    return x;
}
function createPergunta() {
    //usuario escolhe se quer jogar com X ou circulo...
    let div = document.createElement('div');
    div.setAttribute('id', 'pergunta');
    div.setAttribute('class', 'div');
    document.getElementById('conteiner').appendChild(div);
    createSVG('pergunta');
    createLine(50, 0, 50, 100, 'linhaPergunta1', 'svg', 'linha');
    createLine(6, 10, 45, 90, 'linhaPergunta2', 'svg', 'linha');
    createLine(45, 10, 6, 90, 'linhaPergunta', 'svg', 'linha');
    createCirculo(75, 50, 25);
}
function createTabuleiro() {
    //onde sera criado o quadro de desenho...
    let div = document.createElement('div');
    div.setAttribute('id', 'tabuleiro');
    div.setAttribute('class', 'div');
    document.getElementById('conteiner').appendChild(div);
    createSVG('tabuleiro');
    createLine(1, 33.3333, 99, 33.3333, 'linha', 'svg', 'linha');
    createLine(1, 66.6666, 99, 66.6666, 'linha', 'svg', 'linha');
    createLine(33.333, 1, 33.3333, 99, 'linha', 'svg', 'linha');
    createLine(66.6666, 1, 66.6666, 99, 'linha', 'svg', 'linha');
    jogar('jogador');
}
function createSVG(_dad) {
    //desenhando a tela a ser pintada...
    var canvasSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    canvasSVG.setAttributeNS(null, "id", "svg");
    canvasSVG.setAttributeNS(null, "width", "100%");
    canvasSVG.setAttributeNS(null, "height", "100%");
    canvasSVG.setAttributeNS(null, "class", "svg");

    //apendando o elemento no corpo do svg...
    document.getElementById(_dad).appendChild(canvasSVG);
}
function createLine(x1, y1, x2, y2, idName, idDiv, classe) {
    //desenhando um linha...
    var myLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    myLine.setAttributeNS(null, "id", idName + "-" + idDiv);
    myLine.setAttributeNS(null, "x1", x1 + "%");
    myLine.setAttributeNS(null, "y1", y1 + "%");
    myLine.setAttributeNS(null, "x2", x2 + "%");
    myLine.setAttributeNS(null, "y2", y2 + "%");
    myLine.setAttributeNS(null, "class", classe);

    document.getElementById(idDiv).appendChild(myLine);
    //apendando o elemento no canvas criado...
}
function createCirculo(x, y, r, classe) {
    let circulo = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    circulo.setAttributeNS(null, 'r', r + '%');
    circulo.setAttributeNS(null, 'cx', x + '%');
    circulo.setAttributeNS(null, 'cy', y + '%');
    circulo.setAttributeNS(null, 'class', classe);
    document.getElementById('svg').appendChild(circulo);
}
function createX(x, y, classe) {
    createLine(5 + x, 26 + y, 30 + x, 7 + y, 'linha1', 'svg', classe);
    createLine(5 + x, 7 + y, 30 + x, 26 + y, 'linha2', 'svg', classe);
}
function valorX(e) {
    if (returnPositionX_porcentagem(e.pageX) >= 0 && returnPositionX_porcentagem(e.pageX) <= 32) {
        return 15;
    }
    else if (returnPositionX_porcentagem(e.pageX) > 32 && returnPositionX_porcentagem(e.pageX) <= 65) {
        return 50;
    }
    else if (returnPositionX_porcentagem(e.pageX) > 65 && returnPositionX_porcentagem(e.pageX) <= 99) {
        return 85;
    }
}
function valorY(e) {
    if (returnPositionY_porcentagem(e.pageY) >= 0 && returnPositionY_porcentagem(e.pageY) <= 30) {
        return 15;
    }
    else if (returnPositionY_porcentagem(e.pageY) >= 31 && returnPositionY_porcentagem(e.pageY) <= 63) {
        return 50;
    }
    else if (returnPositionY_porcentagem(e.pageY) > 63 && returnPositionY_porcentagem(e.pageY) <= 100) {
        return 85;
    }
}

function val(_valor) {
    if (_valor == 15) return 0;
    else if (_valor == 50) return 33;
    else if (_valor == 85) return 66;
}

function confere(_valor) {
    //para saber qual coluna ou linha...
    if (_valor == 15) return 0;
    else if (_valor == 50) return 1;
    else if (_valor == 85) return 2;
}
function confereInverso(_valor) {
    if (_valor == 0) return 15;
    else if (_valor == 1) return 50;
    else if (_valor == 2) return 85;
}
function jogar(_vez) {
    let semVencedor = true;
    if (jogadas < 9) {
        //se o numero de jogadas for menor que nove...
        if (_vez === 'jogador') {
            $('#svg').one('click', function (e) {
                //adiciona o evento de click apenas uma vez...
                if (event.target && event.target.classList.contains('svg')) {
                    //esse if garante que o click nao vai ser em cima da linha...
                    let x = valorX(e), y = valorY(e);
                    if (m_lugarVazio[confere(y)][confere(x)]) {
                        //se nao estivar preenchido o logar do click...
                        m_lugarVazio[confere(y)][confere(x)] = false;
                        if (jogador == 'c') createCirculo(x, y, 8, 'circulo');
                        else createX(val(x), val(y), 'x');

                        m_jogador[confere(y)][confere(x)] = true;
                        jogadas++;

                        if (jogadas >= 5) {
                            //jogador so pode ganhar depois de tres jogadas dele +
                            //duas jogadas do computador...
                            semVencedor = vencedor(m_jogador);
                        }
                        if (semVencedor) {
                            setTimeout(() => {
                                jogar('computador');
                            }, 1000);
                        }
                        else resultado(_vez);
                    }
                    else jogar(_vez);
                }
                else jogar(_vez);
            });
        }
        else {
            var i = Math.floor(Math.random() * 3),
                j = Math.floor(Math.random() * 3);
            if (m_lugarVazio[i][j]) {
                //se nao estivar preenchido o logar do click...
                m_lugarVazio[i][j] = false;
                if (computador == 'c') createCirculo(confereInverso(j), confereInverso(i), 8, 'circulo');
                else createX(val(confereInverso(j)), val(confereInverso(i)), 'x');
                m_computador[i][j] = true;
                jogadas++;

                if (jogadas >= 6) {
                    //computador so pode ganhar depois de tres jogadas dele +
                    //tres jogadas do jogador...
                    semVencedor = vencedor(m_computador);
                }
                if (semVencedor) {
                    setTimeout(() => {
                        jogar('jogador');
                    }, 500);
                }
                else resultado(_vez);
            }
            else jogar(_vez);
        }
    }
    else if (semVencedor) resultado('velha');
}

function vencedor(_matriz) {
    for (let k = 0; k < 3; k++) {
        //verifica as linhas...
        if (_matriz[k][0] === true && true === _matriz[k][1] && true === _matriz[k][2]) {
            return false;
        }
    }
    for (let k = 0; k < 3; k++) {
        //verifica as colunas...
        if (_matriz[0][k] === true && true === _matriz[1][k] && true === _matriz[2][k]) {
            return false;
        }
    }
    if (_matriz[0][0] === true && true === _matriz[1][1] && true === _matriz[2][2]) {
        //verifica a diagonal principal...
        return false;
    }
    else if (_matriz[0][2] === true && true === _matriz[1][1] && true === _matriz[2][0]) {
        //verifica a digonal segundaria...
        return false;
    }
    return true;
    //retorna verdadeiro caso o jogo precise continuar,
    //caso ainda nao tenha um vencedor...
}

function resultado(_nome) {
    //exibe na tela o ganhador da partida...
    //ou velha, se for o caso...
    let div = document.createElement('div');
    div.setAttribute('id', 'result');
    div.setAttribute('class', 'div');
    document.body.appendChild(div);
    div = document.createElement('div');
    div.setAttribute('id', 'text');
    if (_nome === 'velha')
        div.innerHTML = 'O jogo terminou empadado!!!';
    else
        div.innerHTML = 'O ' + _nome + ' ganhou!!!';
    document.getElementById('result').appendChild(div);
    let btn = document.createElement('button');
    btn.setAttribute('id', 'button');
    btn.setAttribute('class', 'div');
    btn.innerHTML='<a id="novamente">Jogue novamente!</a>';
    document.getElementById('result').appendChild(btn);
    $('#novamente').one('click',function(){
        history.pushState('teste','Titulo de teste','/teste');
    });
}