(function () {
  let todos = JSON.parse(localStorage.getItem('todos')) || []; // at the start when localStorage does not contain anything, todos is an array and post that we extract the value of todos already stored from the localStorage
  let id = Number(localStorage.getItem('id')) || 0; // same here, initially id is 0. Here we convert the obtained value from localStorage to a number so that string concatenation doesn't happen on reload

  // DOM Elements
  const main = document.getElementById('todo');
  if (!main) return; // to check whether the div with id todo even exists in the HTML element

  // Input wrapper for layout
  const inputWrapper = document.createElement('div');
  inputWrapper.className = 'input-wrapper';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Enter task...';

  const addBtn = document.createElement('button');
  addBtn.textContent = 'Add';

  inputWrapper.append(input, addBtn);

  // Search wrapper for layout
  const searchWrapper = document.createElement('div');
  searchWrapper.className = 'search-wrapper';

  const search = document.createElement('input');
  search.type = 'text';
  search.placeholder = 'Search for task...';

  searchWrapper.append(search);

  const todoContainer = document.createElement('div');
  todoContainer.className = 'todoContainer';

  main.append(inputWrapper, searchWrapper, todoContainer);

  // Event Listeners
  addBtn.addEventListener('click', addTodo); // When you attach an event listener, you want to pass a reference to the function so the browser can call it later when the user triggers the event.
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      addTodo();
    }
  });

  // Real-time search filter
  search.addEventListener('input', function () {
    const query = search.value.toLowerCase().trim();
    const items = todoContainer.querySelectorAll('.todo-item');
    items.forEach((item) => {
      const text = item.querySelector('.task-text').textContent.toLowerCase();
      item.style.display = text.includes(query) ? 'flex' : 'none';
    });
  });

  function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos)); // store the value of todos as a string in the localStorage with the associated todos key
    localStorage.setItem('id', id);
  }

  todos.forEach((todoObj) => renderTask(todoObj));

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
    renderTask(todoObj); // each time we save a task to localStorage, we render it out on the UI

    input.value = '';
    input.focus();
  }

  function renderTask(todoObj) {
    const todoItem = document.createElement('div');
    todoItem.className = 'todo-item';
    todoItem.dataset.id = todoObj.id;

    // Checkbox for task completion
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todoObj.complete;
    checkbox.className = 'task-checkbox';

    const pEl = document.createElement('p');
    pEl.className = 'task-text';
    pEl.textContent = todoObj.text; // accessing values from object using object.key notation

    if (todoObj.complete) {
      pEl.classList.add('completed');
    }

    checkbox.addEventListener('change', function () {
      todoObj.complete = checkbox.checked;
      pEl.classList.toggle('completed', todoObj.complete);
      saveToLocalStorage();
    });

    const actionWrapper = document.createElement('div');
    actionWrapper.className = 'action-buttons';

    // These buttons should only render when a task itself is rendered
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'btn-edit';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'btn-delete';

    editBtn.addEventListener('click', function () {
      editTodo(todoObj, todoItem, pEl, editBtn);
    });

    deleteBtn.addEventListener('click', function () {
      deleteTodo(todoObj.id, todoItem);
    });

    actionWrapper.append(editBtn, deleteBtn);
    todoItem.append(checkbox, pEl, actionWrapper);
    todoContainer.prepend(todoItem);
  }

  function deleteTodo(todoId, todoItem) {
    todos = todos.filter((item) => item.id !== todoId);
    saveToLocalStorage();
    todoItem.remove();
  }

  function editTodo(todoObj, todoItem, pEl, editBtn) {
    // FIX: Guard clause to prevent opening multiple edit fields
    if (todoItem.classList.contains('is-editing')) return;
    todoItem.classList.add('is-editing');

    const editWrapper = document.createElement('div');
    editWrapper.className = 'edit-wrapper';

    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = todoObj.text;
    editInput.className = 'edit-input';

    // Save button should only generate once you edit a task
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.className = 'btn-save';

    pEl.style.display = 'none';
    editBtn.style.display = 'none';

    editWrapper.append(editInput, saveBtn);
    todoItem.insertBefore(editWrapper, pEl);
    editInput.focus();

    function handleSave() {
      const updatedText = editInput.value.trim();
      if (!updatedText) {
        return;
      }

      todoObj.text = updatedText;
      saveToLocalStorage(); // each time we make a change to any of the existing todo properties like the text in this case, we save the changes made to localStorage

      pEl.textContent = updatedText;
      pEl.style.display = 'block';
      editBtn.style.display = 'inline-block';

      editWrapper.remove();
      todoItem.classList.remove('is-editing');
    }

    saveBtn.addEventListener('click', handleSave);
    editInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') handleSave();
    });
  }
})();