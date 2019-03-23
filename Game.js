class Game {
    constructor() {
        this.sacks = [];
        this.score = 0;
        this.timer = new Timer();
        this.gameState = {
            menu: 1,
            playing: 2,
            end: 3,
            paused: 4
        }
        this.state = 1;
    }

    start = () => {
        this.state = 2;
        this.timer.clear();
        this.score = 0;

        this.timer.start();
    }

    end = () => {
        this.state = 3;
        this.timer.stop();
        this.showResult();
    }

    pause = () => {
        this.state = 4;
        this.timer.stop();
    }

    play = () => {
        this.state = 2;
        this.timer.start();
    }

    handleClick = (x, y) => {
        let hit = false;
        this.sacks.forEach((sack, i) => {
            if((x < sack.pos.x + sack.r) && (x > sack.pos.x - sack.r) && (y < sack.pos.y + sack.r) && (y > sack.pos.y - sack.r)){
                hit = true;
                this.disappear(i);
                this.growSomeBalls();
            }
        });
        if(this.state == this.gameState.playing){
            this.updateScore(hit);
        }
    }
    
    disappear = (index) => {
        this.sacks.splice(index, 1);
    }
    
    growSomeBalls = () => {
        const sack = new Ballsack(20);
        this.sacks.push(sack);
    }
    
    updateScore = (hit) => {
        if(hit){
            this.score++
        }
        else {
            this.score--;
        }
        let scoreElement = document.querySelector('#score');
        scoreElement.innerHTML = `SCORE: ${this.score}`;
    }

    showResult = () => {
        document.querySelector('#end-menu').style.display = 'block';
        let result = document.querySelector('#result');
        result.innerHTML = `Your score was ${this.score}`;
    }
}