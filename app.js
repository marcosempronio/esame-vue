var vue = new Vue({
    el: '#app',
    data: {
        todos: [],
        users: [],
        user: "",
        id: "",
        name: "",
        description: "",
        completed: "",
        assignedTo: ""
    },

    methods: {
        newTodo: function() {
            var newTodo = {
                name: this.name,
                description: this.description,
                assignedTo: this.assignedTo,
            }
            var url = 'https://aatodoserver.herokuapp.com/addTodo';
            this.$http.post(url, newTodo).then(response => {
                console.log("response: ", response);
            })        
        },

        getTodo: function() {
            var url = 'https://aatodoserver.herokuapp.com/todo';
            this.$http.get(url).then(response => {
                this.todos = response.body;
                return this.todos;
            });
        },

        getTodoByUser: function() {
            var url = 'https://aatodoserver.herokuapp.com/todo?assignedTo=' + this.user;
            this.$http.get(url).then(response => {
                this.todos = response.body;
                return this.todos;
            });
        },

        showUsers: function() {
            var url = 'https://aatodoserver.herokuapp.com/users';
            this.$http.get(url).then(response => {
                console.log("users:", JSON.stringify(response.body));
                this.users = response.body;
                return this.users;
            });
        },

        deleteTodo: function() {
            var url = 'https://aatodoserver.herokuapp.com/delete/' + this.id;
            this.$http.delete(url).then(response => {
                this.state = response.body;
                return this.state;
            })
        }
    },

    created: function() {
        this.getTodo();
        this.showUsers();
        this.getTodoByUser();
    }
})