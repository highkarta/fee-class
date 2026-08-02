(function () {
  // IIFE - immediately invoked function expression, this function automatically gets invoked on page load, you need not manually invoke (calll) it
  // const todos = []; // the scope of this remains to this function only
  let todos = JSON.parse(localStorage.getItem('todos')) || []; // data stored in localStorage goes as JSON, now we parse it into an object using JSON.parse
  let id = Number(localStorage.getItem('id')) || 0; // default value 0 if no id exists yet
  // have to convert to Number() otherwise you'll get "old id" + 1 i.e. 41 as a string
  // Jis block of code mei ek variable ki need hai, usi block mei us variable ko define karo -> good practices

  // DOM Elements
  const main = document.getElementById('todo');
  if (!main) return;
  // main.style.border = '5px solid black';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Enter task...';

  const addBtn = document.createElement('button');
  addBtn.textContent = 'Add';

  const todoContainer = document.createElement('div');
  todoContainer.style.border = '2px solid black';

  main.append(input, addBtn, todoContainer); // JS runs T-B, so can add append only after the elements have been created

  // Event Listeners
  addBtn.addEventListener('click', addTodo); // no function call here, no arguments require to be passed
  input.addEventListener('keydown', function (e) {
    // console.log(e);
    if (e.key === 'Enter') {
      // account for key presses too
      addTodo();
    }
  });

  function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('id', id.toString());
  }

  // Render existing items stored in localStorage
  todos.forEach((todoObj) => renderTask(todoObj));

  // Implement crud operations in this todo app

  function addTodo() {
    const task = input.value.trim(); // Removes the leading and trailing white spaces and line terminator characters from the received string input.
    if (!task) {
      // prevent user from adding empty tasks
      return;
    }
    id = id + 1;
    const todoObj = {
      id: id, // different libraries to give id
      // save value of id in local storage
      text: task,
      complete: false,
    };

    todos.unshift(todoObj); // adds newest todo item to the beginning of the array
    saveToLocalStorage();
    renderTask(todoObj); // send task to function

    input.value = '';
    input.focus(); // automatically input pe focus aa jaye once we add
  }

  function renderTask(todoObj) {
    // loop on todos and render each task
    // only new todos are rendered on the screen, the old ones are already rendered, we don't render all todos from scratch each time
    // Each time a task is added, create a p element, which would contain the value of task as innerText

    // create a div for each task so that you can add a corresponding delete button with that task
    const todoItem = document.createElement('div');
    todoItem.style.border = '2px solid red';
    todoItem.style.margin = '10px';

    // todoContainer.className = 'todoContainer';

    const pEl = document.createElement('p');
    pEl.textContent = todoObj.text;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';

    // Event Handlers passing item-specific arguments
    editBtn.addEventListener('click', function () {
      editTodo(todoObj, todoItem, pEl);
    });

    deleteBtn.addEventListener('click', function () {
      deleteTodo(todoObj.id, todoItem);
    });

    todoItem.append(pEl, editBtn, deleteBtn); // use append here cause the order matters in todoItem
    todoContainer.prepend(todoItem); // use instead of append cause we want latest item added to the top
    // use local storage to preserve these array values across page reloads
  }

  function deleteTodo(todoId, todoItem) {
    // have to delete both from ui and the array itself (for permanent delete)
    todos = todos.filter((item) => item.id !== todoId);
    saveToLocalStorage();
    todoItem.remove();
    // const index = todos.indexOf(task); // finding index of task within the array. But the problem is that in case of duplicate tasks, indexOf() finds only first method and only deletes that
    // give each task an id
    // instead of creating an array, create an array of object where each task has a unique id (based on index)

    // doesn't an easier solution exist based on event.target or something
    // THIS IS FEE TASK!
    // Add edit button for each task, then add edit functionality
    // splice to delete that particular task from array based on index
    // todos.splice(index, 1); // starts from index and deletes only element starting from that index
    // todoItem.remove();
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
      const updatedText = editInput.value;
      if (!updatedText) {
        return;
      }
      todoObj.text = updatedText;
      saveToLocalStorage();
      pEl.textContent = updatedText;
      pEl.style.display = 'block';
      // const index = todos.indexOf(task);
      // todos[index] = updatedtask;
      editInput.remove();
      saveBtn.remove();
      // console.log(todos);
    });
  }
})();
