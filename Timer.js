class Timer {
    constructor() {
        this.seconds = 0;
        this.running = false;
        this.timer = document.querySelector('#timer');
    }

    pad = () => {
        this.seconds = `0${this.seconds}`;
    }

    add = () => {
        if(this.running) {
            setTimeout(this.add, 1000);
            this.seconds++;
            if(this.seconds < 10) {
                this.pad();
            }
            this.timer.innerHTML = `TIME: ${this.seconds}`;
        }
    }

    start = () => {
        this.running = true;
        this.add();
    }
    
    clear = () => {
        this.seconds = 0;
    }

    stop = () => {
        this.running = false;
    }
}