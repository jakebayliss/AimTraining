const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;
let game = null;

//im shit at css
document.querySelectorAll('.menu').forEach(menu => {
    menu.style.marginLeft = `${(width - 400)/2}px`;
});

init = () => {
    game = new Game();

    for(let i = 0; i < 3; i++) {
        game.growSomeBalls();
    }
}

draw = () => {
    context.clearRect(0, 0, width, height);
    drawBallsacks();

    if(game.timer.seconds == 30) {
        game.state = 3;
        game.end();
    }
    
    if(game.state == 2) {
        requestAnimationFrame(draw);
    }
}

drawBallsacks = () => {
    game.sacks.forEach(sack => {
        context.beginPath();
        context.arc(sack.pos.x, sack.pos.y, sack.r, 0, 2 * Math.PI);
        context.stroke();
        // change colour with 5 seconds to go
        if(game.timer.seconds > (30 - 5)) {
            context.fillStyle = '#640000';
        }
        else {
            context.fillStyle = '#C0C0C0';
        }
        context.fill();
    });
}

const startButton = document.querySelector('#start');
startButton.addEventListener('click', () => {
    document.querySelector('#start-menu').style.display = 'none';
    game.start();
    draw();
});

const startAgain = document.querySelector('#start-again');
startAgain.addEventListener('click', () => {
    document.querySelector('#end-menu').style.display = 'none';
    game.start();
    draw();
});

const pause = document.querySelector('#pause');
const play = document.querySelector('#play');
pause.addEventListener('click', () => {
    pause.style.display = 'none';
    play.style.display = 'block';
    game.pause();
});

play.addEventListener('click', () => {
    play.style.display = 'none';
    pause.style.display = 'block';
    game.play();
    draw();
});

canvas.addEventListener('click', (e) => {
    console.log('click', e.x, e.y, game.score);
    game.handleClick(e.x, e.y);
});

init();
