(function () {
  // --- LocalStorage Initialization ---
  // Safely parse array or default to an empty array
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  let id = Number(localStorage.getItem('id')) || 0;

  // --- Main DOM Elements ---
  const main = document.getElementById('todo');
  if (!main) return;

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Enter task...';

  const addBtn = document.createElement('button');
  addBtn.textContent = 'Add';

  const todoContainer = document.createElement('div');
  todoContainer.style.border = '2px solid black';

  main.append(input, addBtn, todoContainer);

  // --- Event Listeners ---
  addBtn.addEventListener('click', addTodo);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') addTodo();
  });

  // --- Helper to sync state with LocalStorage ---
  function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('id', id.toString());
  }

  // --- Initial Render on Page Load ---
  // Render existing items stored in localStorage
  todos.forEach((todoObj) => renderTask(todoObj));

  // --- CRUD Operations ---

  function addTodo() {
    const taskText = input.value.trim();
    if (!taskText) return; // Prevent empty tasks

    id += 1;
    const todoObj = {
      id: id,
      text: taskText,
      complete: false
    };

    // Add to state array & update localStorage
    todos.unshift(todoObj);
    saveToLocalStorage();

    // Render in UI
    renderTask(todoObj);

    // Reset input
    input.value = '';
    input.focus();
  }

  function renderTask(todoObj) {
    // Create elements unique to this task
    const todoItem = document.createElement('div');
    todoItem.style.border = '2px solid red';
    todoItem.style.margin = '10px';

    const pEl = document.createElement('p');
    pEl.textContent = todoObj.text;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';

    // Event Handlers passing item-specific arguments
    deleteBtn.addEventListener('click', function () {
      deleteTodo(todoObj.id, todoItem);
    });

    editBtn.addEventListener('click', function () {
      editTodo(todoObj, todoItem, pEl);
    });

    todoItem.append(pEl, editBtn, deleteBtn);
    todoContainer.prepend(todoItem);
  }

  function deleteTodo(todoId, todoItem) {
    // 1. Remove from JS array state
    todos = todos.filter((item) => item.id !== todoId);

    // 2. Persist updated array to localStorage
    saveToLocalStorage();

    // 3. Remove node from DOM
    todoItem.remove();
  }

  function editTodo(todoObj, todoItem, pEl) {
    const editInput = document.createElement('input');
    editInput.value = todoObj.text;

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';

    pEl.style.display = 'none';
    todoItem.prepend(editInput, saveBtn);
    editInput.focus();

    saveBtn.addEventListener('click', function () {
      const updatedText = editInput.value.trim();
      if (!updatedText) return;

      // Update state object
      todoObj.text = updatedText;

      // Sync state array to localStorage
      saveToLocalStorage();

      // Update UI elements
      pEl.textContent = updatedText;
      pEl.style.display = 'block';

      // Cleanup inline edit inputs
      editInput.remove();
      saveBtn.remove();
    });
  }
})();