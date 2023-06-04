const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const clearButton = document.querySelector("#todoClearButton");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secontCardBody = document.querySelectorAll(".card-body")[1];
const searchInput = document.querySelector("#todoSearch");

let todos = [];

runEvents();

function runEvents() {
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",pageLoaded);
    secontCardBody.addEventListener("click",removeTodoUI);
    clearButton.addEventListener("click",allTodosEveryWhere);
    searchInput.addEventListener("keyup",filter);
}

function addTodo(e) {
    const inputText = addInput.value.trim();
    if (inputText == "" || inputText == null) {
        showAlert("danger","Lütfen boş bırakmayınız! ");
    }else{
        addTodoUI(inputText);  
        addTodoToStorage(inputText);
        showAlert("success","Todo Eklendi.");
    }
    e.preventDefault();
}

function filter(e) {
    const filterValue = e.target.value.trim().toLowerCase();
    const todoListesi = document.querySelectorAll(".list-group-item");
    if (todoListesi.length > 0) {
        todoListesi.forEach(todo => {
            if (todo.textContent.trim().toLowerCase().includes(filterValue)) {
                todo.setAttribute("style","display : block");
            }else{
                todo.setAttribute("style","display : none !important")
            }
        });
    }else{
        showAlert("warning","Filtreleme yapmak için todo olması gerekiyor.")
    }
}

function allTodosEveryWhere() {
    const todoListesi = document.querySelectorAll(".list-group-item");
    if (todoListesi.length > 0) {
        todoListesi.forEach(function (todo) {
            todo.remove();
        })
        todos= [];
        localStorage.setItem("todos",JSON.stringify(todos))
        showAlert("success","Başarılı bir şekilde silindi.")
    }else{
        showAlert("warning","Silmek için en az bir todo olmalıdır.")
    }
}

function removeTodoUI(e) {
    if (e.target.className == "fa fa-remove") {
        // Ekrandan Silme
        const todo = e.target.parentElement.parentElement;
        todo.remove();
        //Strogeden Silme
        removeTodoToLocalstroge(todo.textContent);
        showAlert("success","Todo Başarı İle Silindi.");
    }
}
function removeTodoToLocalstroge(removeTodo) {
    checkTodosFromStroge();
    todos.forEach(function(todo,index){
        if (removeTodo === todo) {
            todos.splice(index,1);
        }
    })
    localStorage.setItem("todos",JSON.stringify(todos));
}

function addTodoUI(newTodo) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    const i = document.createElement("i");
    li.className = "list-group-item d-flex justify-content-between";
    a.className ="delete-item";
    i.className ="fa fa-remove";
    a.href ="#";
    li.textContent = newTodo,
    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);
    addInput.value = ""
}

function addTodoToStorage(newTodo) {
    checkTodosFromStroge();
    todos.push(newTodo)
    localStorage.setItem("todos",JSON.stringify(todos))
}

function checkTodosFromStroge() {
    if (localStorage.getItem("todos") == null) {
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}
function showAlert(type,message) {
    const div = document.createElement("div");
    div.className ="alert alert-"+ type
    div.role = "alert";
    div.textContent = message;
    firstCardBody.appendChild(div);
    setTimeout(() => {
        div.remove();
    }, 2500);
}

function pageLoaded() {
    checkTodosFromStroge();
    todos.forEach(i => {
        addTodoUI(i);
    });
}