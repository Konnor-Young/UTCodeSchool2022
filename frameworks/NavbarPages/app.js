svar app = new Vue({
    el: "#app",
    data: {
        currentPage: 1,
        pageValue: null,
        totalPages: 3,
    },
    methods: {
        // updates page number variable
        goToPage: function (page_clicked) {
            this.currentPage = page_clicked;
        },
        goBackPage: function () {
            if(this.currentPage > 1){
                this.currentPage--;
            }
        },
        goForwardPage: function () {
            if(this.currentPage < 3){
                this.currentPage++;
            }
        },
        skipToPage: function () {
            if(this.pageValue <= this.totalPages){
                this.currentPage = this.pageValue;
                this.pageValue = null;
            }
        }
    }
});



// Extra Challenges:

// - Display two pages at a time - side by side (similar to a book). 
//     When you 'flip the page', show the next two pages.