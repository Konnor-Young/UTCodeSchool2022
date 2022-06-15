const API_URL = "https://theaudiodb.com/api/v1/json/523532/searchalbum.php?s=";

var app = new Vue({
    el: "#app",
    data: {
        artistInput: "",
        searchAlbumList: [],
        pickedAlbumList: [],
        tempList: [],
        pickedUp: -1,
        movedAlbum: '',
    },
    methods: {
        searchArtist: function () {
            fetch(API_URL + encodeURIComponent(this.artistInput)).then(response => {
                response.json().then(data => {
                    this.searchAlbumList = data.album;
                });
            });
            this.artistInput = "";
        },
        addAlbum: function (index) {
            let album = this.searchAlbumList[index];
            this.pickedAlbumList.push(album);
        },
        removeAlbum: function (index) {
            this.pickedAlbumList.splice(index, 1);
        },
        pickUpAlbum: function (index) {
            this.pickedUp = index;
            this.tempList = this.pickedAlbumList;
            this.movedAlbum = this.pickedAlbumList[index];
            console.log("mouse down", index);
        },
        dropAlbum: function (drop_index) {
            if (this.pickedUp < 0) {return;}
            if (drop_index >= this.pickedAlbumList.length) {
                drop_index = this.pickedAlbumList.length - 1;
            }
            let removed = this.movedAlbum;
            this.pickedAlbumList.splice(this.pickedUp, 1);
            this.pickedAlbumList.splice(drop_index, 0, removed);
            this.pickedUp = -1;
            console.log("mouse up", drop_index);
        },
        // hoverAlbum: function (hover_index) {
        //     if (this.pickedUp < 0) {return;}
        //     if (hover_index >= this.pickedAlbumList.length) {
        //         hover_index = this.pickedAlbumList.length - 1;
        //     }
        //     let removed = this.movedAlbum;
        //     this.pickedAlbumList.splice(hover_index, 0, removed);
        // },
    }
})