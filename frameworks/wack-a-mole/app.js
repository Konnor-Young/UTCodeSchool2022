var app = new Vue({
    el: "#app",
    data: {
        rows: 10,
        columns: 10,
        moleRow: -1,
        moleCol: 0,
        score: 0,
        total: 0,
    },
    methods: {
        updateMoleRecursive: function () {
            setTimeout(()=>{
                this.moleRow = Math.ceil(Math.random()*this.rows);
                this.moleCol = Math.ceil(Math.random()*this.columns);
                this.total++;
                if(this.total >= 10){
                    setTimeout(()=>{
                        this.moleRow = -1;
                    }, 500);
                    return;
                }
                this.updateMoleRecursive()
            }, 500);
            
            
        },
        hitMole: function () {
            this.score += 1;
            this.moleRow = -1;
        }
    },
    created: function () {
        this.updateMoleRecursive()
    }
});
// Extra Challenges:
// - Restart/Play button - begins the game
// - Stop the mole after a certain total (10, 20, etc.)
// - Keep a high score, separate from the current game's score
// - Have multiple Moles