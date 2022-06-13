var vm = new Vue({
    el: "#x",
    data: {
        y: "Hello, vue!",
        showText: true,
        globalColor: "#fff",
        items: [
            {text:"item a", show:true, color:"#a10"},
            {text:"item b", show:true, color:"#b29"},
            {text:"item c", show:true, color:"#c38"},
            {text:"item d", show:true, color:"#d47"}
        ],
        strings: ["a", "b", "c", "d", "e"],
        listA: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    methods: {
        toggleTextandAddA: function () {
            this.showText = !this.showText;
            this.y = this.y + "a";
        },
        toggleTextandAddA_item: function (item) {
            item.show = !item.show;
            item.text = item.text + "a";
        },
        changeColor: function (item) {
            if(item.color != "#000"){
                item.previousColor = item.color;
                item.color = "#000";
            }else{
                item.color = item.previousColor;
            }
        }
    }
})