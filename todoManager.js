export default class TodoManager {
    constructor(todoCollection) {
        this.todoCollection = todoCollection;
        this.todos = JSON.parse(localStorage.getItem("todos") || "[]");
    }

    // Create and return a new todo item element
    createTodoItem(todoText) {
        const li = this.createElement("li", ["todo-collection__item"]);
        const todoTitle = this.createElement(
        "span",
        ["todo-collection__item__title"],
        { innerText: todoText }
        );
        const editableInput = this.createElement(
        "input",
        ["input", "input--todo", "hidden"],
        { type: "text", value: todoText }
        );
        const editButton = this.createElement(
        "button",
        ["button", "button--todo", "button--edit"],
        { innerText: "Edit" }
        );
        const saveButton = this.createElement(
        "button",
        ["button", "button--save", "hidden"],
        { innerText: "Save" }
        );
        const deleteButton = this.createElement(
        "button",
        ["button", "button--todo", "button--delete"],
        { innerText: "Delete" }
        );

        li.append(todoTitle, editableInput, editButton, saveButton, deleteButton);

        const toggleTodoEditForm = () => {
        todoTitle.classList.toggle("hidden");
        editableInput.classList.toggle("hidden");
        editButton.classList.toggle("hidden");
        saveButton.classList.toggle("hidden");
        };

        editButton.addEventListener("click", () => {
        toggleTodoEditForm();
        editableInput.focus();
        });

        saveButton.addEventListener("click", () => {
        todoTitle.innerText = editableInput.value;
        toggleTodoEditForm();
        this.updateTodoInLS(todoText, editableInput.value);
        });

        deleteButton.addEventListener("click", () => {
        setTimeout(() => {
            this.todoCollection.removeChild(li);
            this.deleteTodoFromLS(todoText);
        }, 100);
        });

        return li;
    }

    // Utility function to create an element
    createElement(tag, classes = [], attributes = {}) {
        const element = document.createElement(tag);
        classes.forEach((cls) => element.classList.add(cls));
        Object.entries(attributes).forEach(([key, value]) => {
        element[key] = value;
        });
        return element;
    }

    // Add todo
    addTodo(todoText) {
        const todoItem = this.createTodoItem(todoText);
        this.todoCollection.appendChild(todoItem);
        this.saveTodoToLS(todoText);
    }

    // Load todos
    loadTodos() {
        this.todos.forEach((todo) => {
        const todoItem = this.createTodoItem(todo);
        this.todoCollection.appendChild(todoItem);
        });
    }

    // LocalStorage operations
    saveTodoToLS(todo) {
        this.todos.push(todo);
        localStorage.setItem("todos", JSON.stringify(this.todos));
    }

    deleteTodoFromLS(todo) {
        this.todos = this.todos.filter((t) => t !== todo);
        localStorage.setItem("todos", JSON.stringify(this.todos));
    }

    updateTodoInLS(oldTodo, newTodo) {
        const index = this.todos.indexOf(oldTodo);
        if (index !== -1) {
        this.todos[index] = newTodo;
        localStorage.setItem("todos", JSON.stringify(this.todos));
        }
    }
}
