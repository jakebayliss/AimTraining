const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
let width = window.innerWidth - 5;
let height = window.innerHeight - 5;
canvas.width = width;
canvas.height = height;
let sacks = [];

function init() {
    for(let i = 0; i < 3; i++) {
        grow();
    }
}

function draw() {
    context.clearRect(0, 0, width, height);
    sacks.forEach(sack => {
        context.beginPath();
        context.arc(sack.x, sack.y, sack.r, 0, 2 * Math.PI);
        context.stroke();
        context.fillStyle = '#C0C0C0';
        context.fill();
    });
        
    window.requestAnimationFrame(draw);
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

canvas.addEventListener('click', (e) => {
    console.log('click', e.x, e.y);
    sacks.forEach((sack, i) => {
        if(tapped(e.x, e.y, sack)) {
            disappear(i);
            grow();
        }
    });
});

init();
draw();
