const API_URL = "https://fakestoreapi.com";

var app = new Vue({
    el: "#app",
    data: {
        list: [],
    },
    methods:{
    },
    created: async function () {
        let response = await fetch(API_URL + "/products");
        let data = await response.json();
        this.list = data;

        // fetch(API_URL + "/products").then((response)=> {
        //     response.json().then((data)=> {
        //         console.log(data);
        //         this.list = data;
        //     });
        // });
    }
});