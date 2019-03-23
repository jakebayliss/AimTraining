const body = document.querySelector('body');
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;
let sacks = [];
let score = 0;
let timer = null;
const gameState = {
    menu: 1,
    playing: 2,
    end: 3
}
let state = 1;

init = () => {
    createStartInterface();

    sacks = [];
    for(let i = 0; i < 3; i++) {
        grow();
    }
}

createStartInterface = () => {
    let startMenu = document.createElement('div');
    body.append(startMenu);

    let play = document.createElement('button');
    play.innerHTML = 'Play';

    play.addEventListener('click', () => {
        body.removeChild(startMenu);
        startGame();
    });
    startMenu.append(play);

    let scoreElement = document.createElement('p');
    scoreElement.className = 'score';
    scoreElement.innerHTML = `SCORE: ${score}`;
    body.append(scoreElement);

    timer = new Timer();
}

startGame = () => {
    timer.clear();
    timer.start();
    state = 2;
    draw();
}

createEndInterface = () => {
    let endMenu = document.createElement('div');
    
    let finalScore = document.createElement('h3');
    finalScore.innerHTML = `Your score was ${score}!`;
    
    let playAgain = document.createElement('button');
    playAgain.innerHTML = 'Play Again';

    playAgain.addEventListener('click', () => {
        body.removeChild(endMenu);
        startGame();
    })
    
    body.append(endMenu);
    endMenu.append(finalScore);
    endMenu.append(playAgain);
}

draw = () => {
    context.clearRect(0, 0, width, height);
    drawBallsacks();

    if(timer.seconds == 30) {
        state = 3;
        endGame();
    }
    
    if(state == 2) {
        requestAnimationFrame(draw);
    }
}

endGame = () => {
    timer.stop();
    createEndInterface();
}

drawBallsacks = () => {
    sacks.forEach(sack => {
        context.beginPath();
        context.arc(sack.x, sack.y, sack.r, 0, 2 * Math.PI);
        context.stroke();
        context.fillStyle = '#C0C0C0';
        context.fill();
    });
}

getSpawnPoint = () => {
    const x = Math.floor(Math.random() * ((width - 20) - 20)) + 20;
    const y = Math.floor(Math.random() * ((height - 20) - 20)) + 20;
    return {
        x: x,
        y: y
    }
}

tapped = (x, y, sack) => {
    if((x < sack.x + sack.r) && (x > sack.x - sack.r) && (y < sack.y + sack.r) && (y > sack.y - sack.r)){
        return true;
    }
    return false;
}

disappear = (index) => {
    sacks.splice(index, 1);
}

grow = () => {
    const sack = new Ballsack(getSpawnPoint(), 20);
    sacks.push(sack);
}

updateScore = (hit) => {
    if(hit){
        score++
    }
    else {
        score--;
    }
    let scoreElement = document.querySelector('p');
    scoreElement.innerHTML = `SCORE: ${score}`;
}

canvas.addEventListener('click', (e) => {
    let hit = false;
    console.log('click', e.x, e.y, score);
    sacks.forEach((sack, i) => {
        if(tapped(e.x, e.y, sack)) {
            hit = true;
            disappear(i);
            grow();
        }
    });
    if(state == gameState.playing){
        updateScore(hit);
    }
});

init();
