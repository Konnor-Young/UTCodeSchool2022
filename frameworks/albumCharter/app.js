const API_URL = "https://theaudiodb.com/api/v1/json/523532/searchalbum.php?s=";

var app = new Vue({
    el: "#app",
    data: {
        artistInput: "",
        searchAlbumList: [],
        pickedAlbumList: [],
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
        }
    }
})