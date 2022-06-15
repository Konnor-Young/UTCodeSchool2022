const WALLS_URL = "https://api.jsonbin.io/b/62a94a26402a5b38022853a7"

var app = new Vue({
    el: "#app",
    data: {
        started: false,
        won: false,
        lose: false,
        walls: [],
    },
    methods: {
        startMaze: function () {
            this.started = true;
        },
        finishMaze: function () {
            this.started = false;
            this.won = true;
        },
        restartMaze: function () {
            this.started = false;
            this.won = false;
            this.lose = false;
        },
    },
    created: function () {
        fetch(WALLS_URL).then((response) => {
            response.json().then((data) => {
                this.walls = data;
            });
        });
    }
});


// Extra Challenges:
// - Restart button****
// - Create your own maze (your own walls, same or different css)
// - Have 'moving' walls (hint: transition property)
// - Have multiple levels