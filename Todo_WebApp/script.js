const Form = document.querySelector('.form');
const Input = document.querySelector('.input');
const todoList = document.querySelector('.items');

let todos = [];

Form.addEventListener('submit',(event) => {
  event.preventDefault();
  addTodo(Input.value); 
});

// Add new todo to Todo list...

const addTodo = (item) => {
  if (item !== '') {
    const todo = {
      id: Date.now(),
      name: item,
      Done: false
    };
    todos.push(todo);
    addTodoToLocalStorage(todos); 
    Input.value = '';
  }
}

// Add todo to Local storage...
const addTodoToLocalStorage = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos));
  showTodos(todos);
}

//Display todo List...
const showTodos = (todos) => {
  todoList.innerHTML = '';
  todos.forEach(function(item) {
    const checked = item.Done ? 'checked': null;
    const li = document.createElement('li');
    li.setAttribute('class', 'item');
    li.setAttribute('data-key', item.id);
    if (item.Done === true) {
      li.classList.add('checked');
    }
li.innerHTML = `
      <input type="checkbox" class="checkbox" ${checked}>
      ${item.name}
      <button class="delete-button">DELETE TODO</button>
    `;
    todoList.append(li);
  });
}

// Checked/Unchecked the todo....

const toggle = (id) => {
  todos.forEach(function(todo) {
    if (todo.id == id) {
      todo.Done = !todo.Done;
    }
  });
  addTodoToLocalStorage(todos);
}

// delete todo from todo list...
const deleteTodo = (id) => {
  todos = todos.filter((item) => {
    return item.id != id;
  });
  addTodoToLocalStorage(todos);
}

// existing Todo List from Local storage....
const getFromLocalStorage = () => {
  const todoList = localStorage.getItem('todos');
  if (todoList) {
    todos = JSON.parse(todoList);
    showTodos(todos);
  }
}
getFromLocalStorage();

// add event listener to Todo list...

todoList.addEventListener('click', function(event) {
  if (event.target.type === 'checkbox') {
    toggle(event.target.parentElement.getAttribute('data-key'));
  }
  if (event.target.classList.contains('delete-button')) {
    deleteTodo(event.target.parentElement.getAttribute('data-key'));
  }
});