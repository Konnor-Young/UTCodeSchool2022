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
        tempToDo: {},
        tempTags: [],
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
            this.resetTags();
        },
        resetTags: function () {
            this.tagNames.forEach(tag => {
                this.tagsValue[tag] = false;
            });
        },
        editToDo: function (ToDo_object, ToDo_index) {
            this.editingTodo = ToDo_index;
            this.tempToDo = {...ToDo_object};
            if(Object.keys(ToDo_object).includes('tags')) {
                this.tempTags = [];
                this.tagNames.forEach(tag => {
                    this.tempTags.push(ToDo_object.tags.includes(tag));
                });
            }
        },
        cancelEdit: function (){
            this.editingTodo = -1;
            this.tempToDo = {};
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
        putToDo: function (ToDo_ID) {
            let updatedTags = [];
            this.tagNames.forEach((tag, index) => {
                if(this.tempTags[index]){
                    updatedTags.push(tag);
                }
            });
            console.log(updatedTags);
            console.log(this.tempToDo.tags);
            this.tempToDo.tags = updatedTags;

            fetch(URL + "/todo/" + ToDo_ID, {
                method: "PUT",
                body: JSON.stringify(this.tempToDo),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => {
                response.json().then((updated_todo) => {
                    this.newToDoId = updated_todo._id;
                    this.getToDo();
                });
            });
            this.editingTodo = -1;
            this.tempToDo = {};
        },
        deleteToDo: function (ToDo_ID) {
            fetch(URL + "/todo/" + ToDo_ID, {
                method: "DELETE"
            }).then((response) => {
                if(response.status == 200){
                    console.log("deleted", ToDo_ID)
                    this.getToDo();
                }
            })
        }
    },
    created: function () {
        fetch(URL + "/todos").then((response) => {
            response.json().then((data) => {
                this.todos = data;
                this.todos.forEach((todo) => {
                    todo.deadline = todo.deadline.split("T")[0];
                });
            });
        });
        fetch(URL + "/tags").then((response) => {
            response.json().then((data) => {
                this.tagNames = data;
                this.resetTags();
            });
        });
    }
});