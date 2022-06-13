var app = new Vue({
    el: "#app",
    data: {
        prompt: "Ask a Question.",
        message: "",
        messageBank: [
            "Yes",
            "No",
            "Signs Point to yes",
            "Maybe",
            "Unclear",
            "Ask Again Later",
            "Not Today"
        ],
        question: "",
    },
    methods: {
        askQuestion: function () {
            if(this.isValidQuestion()){
                let nextIndex = Math.floor(Math.random()*this.messageBank.length);
                let nextResponse = this.messageBank[nextIndex];
                this.message = nextResponse;
                this.question = "";
                this.prompt = "Ask Another."
            }
        },
        isValidQuestion: function () {
            return this.question[this.question.length-1] == "?"
        }
    }
})