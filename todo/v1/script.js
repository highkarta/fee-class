(function () {
  let todos = JSON.parse(localStorage.getItem('todos')) || []; // at the start when localStorage does not contain anything, todos is an array and post that we extract the value of todos already stored in the localStorage
  // JSON.pase() to convert the JSON data obtained from localStorage into a native data structure, which is array in this case
  let id = Number(localStorage.getItem('id')) || 0; // same here, initially id is 0. Here we convert the obtained value from localStorage to a number so that string concatenation doesn't happen on reload

  // DOM Elements
  const main = document.getElementById('todo');
  // if (!main) return; // what's the use of this? -> to check whether the div with id todo even exists in the HTML element

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Enter task...';
  
  const search = document.createElement('input');
  search.type = 'text';
  search.placeholder = 'Search for task';
  
  const addBtn = document.createElement('button');
  addBtn.textContent = 'Add';
  
  const searchBtn = document.createElement('button');
  searchBtn.textContent = 'Search';
  
  const inputDiv = document.createElement('div');
  inputDiv.className = 'userInput';
  // inputDiv.id = 'inputDiv';
  inputDiv.append(input, addBtn);

  const searchDiv = document.createElement('div');
  searchDiv.className = 'userInput';
  // searchDiv.id = 'searchDiv';
  searchDiv.append(search, searchBtn);

  const todoContainer = document.createElement('div');
  todoContainer.id = 'todoContainer';
  // todoContainer.style.border = '2px solid black';

  main.append(inputDiv, searchDiv, todoContainer);

  // Event Listeners
  addBtn.addEventListener('click', addTodo); // When you attach an event listener, you want to pass a reference to the function so the browser can call it later when the user triggers the event.
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      addTodo();
    }
  });

  search.addEventListener('click', function (e) {
    let searchVal = search.value; // use value, not innerText
    if (e.key === 'Enter' && searchVal) {
      // console.log("search val");
      searchTodo(searchVal);
    }
  });

  searchBtn.addEventListener('click', function () {
    let searchVal = search.value; // use value, not innerText
    if (!searchVal) {
      return;
    }
    searchTodo(searchVal);
  });

  function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos)); // store the value of todos as a string in the localStorage with the associated todos key
    localStorage.setItem('id', id);
  }

  todos.forEach((todoObj) => renderTask(todoObj)); // the parameter

  function addTodo() {
    const task = input.value.trim();
    if (!task) {
      return;
    }

    id = id + 1;
    const todoObj = {
      id: id,
      text: task,
      complete: false,
    };

    todos.unshift(todoObj); // you append each todo object in an array
    saveToLocalStorage();
    renderTask(todoObj); // each time we save a task to localStorage, we render it out on the UI, sending todoObj as an argument to renderTask

    input.value = '';
    input.focus();
  }

  function renderTask(todoObj) {
    const todoItem = document.createElement('div');
    todoItem.className = 'todoItem';
    // todoItem.style.border = '2px solid black';
    // todoItem.style.backgroundColor = 'white';
    // todoItem.style.margin = '10px';
    // todoItem.style.padding = '10px';

    const pEl = document.createElement('p');
    pEl.textContent = todoObj.text; // accessing values from object using object.key notation

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';

    // These buttons should only render when a task itself is rendered
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';

    editBtn.addEventListener('click', function () {
      editTodo(todoObj, todoItem, pEl, deleteBtn);
      // editBtn.remove(); // removing it will remove it from the dom itself, not a viable option
      editBtn.classList.remove('show');
      editBtn.classList.add('hide');
    });

    deleteBtn.addEventListener('click', function () {
      deleteTodo(todoObj.id, todoItem);
    });

    const taskFuncs = document.createElement('div');
    taskFuncs.append(editBtn, deleteBtn)
    taskFuncs.className = 'taskFuncs';

    todoItem.append(pEl, taskFuncs);
    todoContainer.prepend(todoItem);
  }

  function deleteTodo(todoId, todoItem) {
    todos = todos.filter((item) => item.id !== todoId);
    saveToLocalStorage();
    todoItem.remove();
  }

  function editTodo(todoObj, todoItem, pEl, deleteBtn) {
    const editInput = document.createElement('input');
    editInput.value = todoObj.text;

    // Save button should only generate once you edit a task
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';

    const editBtn = document.createElement('button'); // obviously incorrect
    editBtn.textContent = 'Edit';

    pEl.style.display = 'none';
    todoItem.prepend(editInput, saveBtn);
    editInput.focus();

    saveBtn.addEventListener('click', function () {
      const updatedText = editInput.value;
      if (!updatedText) {
        return;
      }

      todoObj.text = updatedText;
      saveToLocalStorage(); // each time we make a change to any of the existing todo properties like the text in this case, we save the changes made to localStorage

      pEl.textContent = updatedText;
      pEl.style.display = 'block';

      editInput.remove();
      saveBtn.remove();
      // todoItem.insertBefore(editBtn, deleteBtn);
      // editBtn.append();
      editBtn.classList.remove('hide');
      editBtn.classList.add('show');
    });
  }

  function searchTodo(value) {
    for (let i = 0; i < todos.length; i++) {
      let todoValue = todos[i].text;
      if (todoValue.includes(value)) {
        todoContainer.innerHTML = '';
        renderTask(todos[i]);
        // todos[i].style.display = 'hidden';
      }
    }

    /*
    todos.forEach(element => {
      if(element.contains(searchVal)){
      }
    });
    */
  }
})();
