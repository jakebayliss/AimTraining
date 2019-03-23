class Timer {
    constructor() {
        this.seconds = 0;
        this.running = false;
        let body = document.querySelector('body');
        this.timer = document.createElement('p');
        this.timer.className = 'timer';
        this.timer.innerHTML = 'TIME: 0'
        body.append(this.timer);
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