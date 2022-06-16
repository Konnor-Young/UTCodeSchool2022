var app = new Vue({
    el: "#app",
    data: {
        // 1. 3 number variables, one for each input
        redValue: 255,
        greenValue: 255,
        blueValue: 255,
        // 3. 1 list variable, holds strings (ex. ['rgb(0,255,128)', 'rgb(0,0,0)', ...])
        colorValues: [],
    },
    methods: {
        // 3. push the current rgbString into the color list
        addColor: function () {
            this.colorValues.push(this.rgbString);
        }
    },
    computed: {
        // 1. insert your variable names into their respective places
        rgbString: function () {
            let finalString = "rgb(";
            finalString += this.redValue + ",";
            finalString += this.greenValue + ",";
            finalString += this.blueValue + ")";
            return finalString;
        },
    }
});