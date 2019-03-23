class Ballsack {
    constructor(radius) {
        this.pos = this.getSpawnPoint();
        this.r = radius;
    }

    getSpawnPoint = () => {
        const x = Math.floor(Math.random() * ((width - 20) - 20)) + 20;
        const y = Math.floor(Math.random() * ((height - 20) - 20)) + 20;
        return {
            x: x,
            y: y
        }
    }
}