Vue.component('greeting', {
    template: `<div>
                    Hello, Vue Components, I am {{ name }}!
                    <button v-on:click="changeName()">Change Name</button>
                </div>`,
    data: function () {
        return {
            name: "greeting_component"
        }
    },
    methods: {
        changeName: function () {
            if(this.name == "greeting_component"){
                this.name = "slim shady";
            }else{
                this.name = "greeting_component";
            } 
        }
    }
});

Vue.component('counter', {
    template: `<button v-on:click="count++">You have clicked me {{ count }} times.</button>`,
    data: function () {
        return {
            count: 0
        }
    },
});

var app = new Vue({
    el: "#app",
});