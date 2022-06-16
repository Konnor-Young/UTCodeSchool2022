const URL="http://todo2022.codeschool.cloud"

var app = new Vue({
    el: "#app",
    data: {
        todos: [],
        tagNames: [],
        nameValue: '',
        descValue: '',
        dateValue: '',
        doneCheck: false,
        tagsValue: {},
        newToDoId: '',
        editingTodo: -1,
    },
    methods: {
        addToDo: function () {
            let addTagList = [];
            this.tagNames.forEach(tag => {
                if(this.tagsValue[tag]){
                    addTagList.push(tag);
                }
            });
            let newToDo = {
                "name" : this.nameValue,
                "description" : this.descValue,
                "done" : this.doneCheck,
                "deadline" : this.dateValue,
                "tags": addTagList
            };
            this.postToDo(newToDo);
            this.getToDo();

            this.nameValue = '';
            this.descValue = '';
            this.doneCheck = false;
            this.dateValue = '';
            this.tagsValue = {};
            this.resetTags;
        },
        resetTags: function () {
            this.tagNames.forEach(tag => {
                this.tagsValue[tag] = false;
            });
        },
        editToDo: function (ToDo_index) {
            this.editingTodo = ToDo_index;
        },

        getToDo: function () {
            fetch(URL + "/todos").then((response) => {
                response.json().then((data) => {
                    this.todos = data;
                    this.todos.forEach((todo) => {
                        todo.deadline = todo.deadline.split("T")[0];
                    });
                });
            });
        },
        postToDo: function (newToDo) {
            fetch(URL + "/todo", {
                method: "POST",
                body: JSON.stringify(newToDo),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => {
                response.json().then((created_todo) => {
                    this.newToDoId = created_todo._id;
                    this.getToDo();
                });
            });
        },
        // putToDo: function (todoId) {
        //     fetch(URL + "/todo" + todoId, {
        //         method: "PUT",
        //         body: JSON.stringify(todo),
        //         headers: {
        //             "Content-Type": "application/json"
        //         }
        //     }).then((response) => {
        //         response.json().then((updated_todo) => {
        //             console.log(updated_todo);
        //         });
        //     });
        // }
    },
    created: function () {
        this.getToDo();
        fetch(URL + "/tags").then((response) => {
            response.json().then((data) => {
                this.tagNames = data;
                this.resetTags();
            });
        });
    }
});