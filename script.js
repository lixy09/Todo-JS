import TodoManager from './todoManager.js';

const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector("input");
const todoCollection = document.querySelector(".todo-collection");

// Initialize TodoManager
const todoManager = new TodoManager(todoCollection);

// Load existing todos
todoManager.loadTodos();

// Add new todo on form submission
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (todoInput.value === "") {
    alert("Enter something!");
    return;
  }
  todoManager.addTodo(todoInput.value);
  todoInput.value = "";
});
