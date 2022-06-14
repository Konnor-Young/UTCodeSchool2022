var app = new Vue({
    el: "#app",
    data: {
        name: "",
        address: "",

        persons: [],

        hoverIndex: -1,
    },
    methods: {
        recordAddress: function () {
            this.persons.push({"name":this.name, "address": this.address});
            this.name = '';
            this.address = '';
        },
        deleteRecord: function (index) {
            this.persons.splice(index, 1);
        }
    }
})