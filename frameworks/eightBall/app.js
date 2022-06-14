const API_URL = 'https://cs2022-eight-ball.herokuapp.com';
var app = new Vue({
    el: "#app",
    data: {
        prompt: "Ask a Question.",
        message: "",
        messageColor: "#fff",
        question: "",
        answerReady: true,
        // messageBank: [
        //     "Yes",
        //     "No",
        //     "Signs Point to yes",
        //     "Maybe",
        //     "Unclear",
        //     "Ask Again Later",
        //     "Not Today"
        // ],
    },
    methods: {
        askQuestion: function () {
            if(this.isValidQuestion()){
                // let nextIndex = Math.floor(Math.random()*this.messageBank.length);
                // let nextResponse = this.messageBank[nextIndex];
                // this.message = nextResponse;
                this.answerReady = false;
                this.messageColor = "rgba(255,255,255,0)";
                setTimeout(() => {
                    fetch(API_URL + "/questions").then((response) => {
                        response.json().then((data) => {
                            let answerObject = data;
                            this.message = answerObject.answer;
                            this.messageColor = answerObject.color;
                            setTimeout(()=>{
                                this.answerReady = true;
                            }, 1000);
                        });
                    });
                }, 1500);
                this.question = "";
                this.prompt = "Ask Another."
            }
        },
        isValidQuestion: function () {
            return this.question[this.question.length-1] == "?"
        }
    }
})