const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const logoutForm = document.querySelector("#logout-form");
const toDoTitle = document.querySelector("#todo-title");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";
const TODOS_KEY = "todos";



let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  span.classList.add("todoList");
  const button = document.createElement("button");
  button.innerText = "x";
  button.addEventListener("click", deleteToDo);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}


function onLoginSubmit(event) {
  event.preventDefault();
  loginForm.classList.add(HIDDEN_CLASSNAME);
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);
  paintGreetings(username);
  logoutForm.classList.remove(HIDDEN_CLASSNAME);
  toDoForm.classList.remove(HIDDEN_CLASSNAME);   
  toDoTitle.innerText = username+"'s TODO list.";
  console.log("onloginSubmit");
  loadTodoList();
}
function onLogoutSubmit(event) {
  localStorage.removeItem(USERNAME_KEY);
  console.log("onlogoutSubmit");
}
function paintGreetings(username) {
  greeting.innerText = `Welcome, you are ${username}`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
}
function removeGreetings() {
  greeting.innerText = null;
  greeting.classList.add(HIDDEN_CLASSNAME);
}

function loadTodoList () {
const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
  }
}

const savedUsername = localStorage.getItem(USERNAME_KEY);
console.log(savedUsername);
if (savedUsername === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  logoutForm.classList.add(HIDDEN_CLASSNAME);
  removeGreetings();

}  else {
  paintGreetings(savedUsername);
  logoutForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.classList.add(HIDDEN_CLASSNAME);
  loadTodoList();

}

toDoForm.addEventListener("submit", handleToDoSubmit);
loginForm.addEventListener("submit", onLoginSubmit); 
logoutForm.addEventListener("submit", onLogoutSubmit);