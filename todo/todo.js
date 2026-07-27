(function () {
  // IIFE - immediately invoked function expression, this function automatically gets invoked on page load, you need not manually invoke (calll) it
  const todos = []; // the scope of this remains to this function only
  // Jis block of code mei ek variable ki need hai, usi block mei us variable ko define karo -> good practices

  const container = document.getElementById('todo');
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Enter task...';

  const addBtn = document.createElement('button');
  addBtn.textContent = 'Add';

  const todoList = document.createElement('div');
  todoList.style.border = '2px solid black';
  container.append(input, addBtn, todoList);

  // Implement crud operations in this todo app

  const task = input.value.trim(); // Removes the leading and trailing white space and line terminator characters from a string.

  function addTodo() {
    const task = input.value;
    // console.log(task);
    if (!task) {
      // prevent user from adding empty tasks
      return;
    }
    todos.unshift(task); // adds element to the beginning of the array
    rendertask(task); // send task to function
    input.value = '';
    input.focus(); // automatically input pe focus aa jaye once we add
  }

  addBtn.addEventListener('click', addTodo);
  input.addEventListener('keydown', function (e) {
    // console.log(e);
    if (e.key === 'Enter') {
      addTodo();
    }
  });


  function rendertask(task) {
    // only new todos are added to the screen, the old ones are already ended, we don't render all todos all times
    // When each time a task is added, create a p element, which would contain the value of task as innerText

    // create a div for each task so that you can add a corresponding delete button with that task
    const todoItem = document.createElement('div');
    todoItem.style.border = '2px solid red';
    todoItem.style.margin = '10px';
    todoList.className = 'todoContainer';
    const pEl = document.createElement('p');
    pEl.textContent = task;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';

    editBtn.addEventListener('click', function () {
      const editInput = document.createElement('input');
      editInput.value = task;
      const saveBtn = document.createElement('button');
      saveBtn.textContent = 'Save';
      todoItem.prepend(editInput, saveBtn);
      editInput.focus();
      saveBtn.addEventListener('click', function () {
        const updatedTask = editInput.value;
        if (!updatedTask) {
          return;
        }
        pEl.textContent = updatedTask;
        const index = todos.indexOf(task);
        todos[index] = updatedtask;
        editInput.remove();
        saveBtn.remove();
        console.log(todos);
      });
    });

    deleteBtn.addEventListener('click', function () {
      // have to delete both from ui and the array itself (for permanent delete)
      const index = todos.indexOf(task); // finding index of task within the array. But the problem is that in case of duplicate tasks, indexOf() finds only first method and only deletes that
      // give each task an id
      // instead of creating an array, create an array of object where each task has a unique id (based on index)

      // doesn't an easier solution exist based on event.target or something
      // THIS IS FEE TASK!
      // Add edit button for each task, then add edit functionality
      // splice to delete that particular task from array based on index
      todos.splice(index, 1); // starts from index and deletes only element starting from that index
      todoItem.remove();
    });
    todoItem.append(pEl, deleteBtn, editBtn); // use append here cause the order matters in todoItem
    todoList.prepend(todoItem); // use instead of append cause we want latest item added to the top
    // use local storage to preserve these array values across page reloads
  }

  /*
  function deleteTask(){
  }
  */

})();
