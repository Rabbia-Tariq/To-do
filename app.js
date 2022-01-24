// Defining UT variable

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();

function loadEventListeners() {

    //Event Listner for Adding new task
    form.addEventListener('submit', addTask);

    //DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks);

    //Remove existing task
    taskList.addEventListener('click',removeTask)

    //Clear Tasks Events
    clearBtn.addEventListener('click',clearTasks);

    //Filter task event
    filter.addEventListener('keyup',filterTasks);
}

//Get Tasks from Local Storage
function getTasks() {
     let tasks;
     if(localStorage.getItem('tasks') === null){
       tasks = [];
     } else {
       tasks = JSON.parse(localStorage.getItem('tasks'));
     }

     tasks.forEach(function(task){
       //Creating a li element for list where Task will be added
    const li = document.createElement('li');

    // Add class for the element li
    li.className = 'collection-item';

    //Now we create Text node and will append to li element.
    li.appendChild(document.createTextNode(task));

    // create new link element for the delete icon
    const link = document.createElement('a');

    //Add class for the element a
    link.className = 'delete-item secondary-content';

    //Add icon html
    link.innerHTML= '<i class="fa fa-remove"></i>';

    // Append the link to li
    li.appendChild(link);
    
    //Append li to ul
    taskList.appendChild(li);

     });
}

function addTask(e) {
    if(taskInput.value === '') {
        alert('Add a Task');
    }
    
    //Creating a li element for list where Task will be added
    const li = document.createElement('li');

    // Add class for the element li
    li.className = 'collection-item';

    //Now we create Text node and will append to li element.
    li.appendChild(document.createTextNode(taskInput.value));

    // create new link element for the delete icon
    const link = document.createElement('a');

    link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  // Store in Local Storage
  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = '';

  e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();

      // Remove from Local Storage by calling parent of parent i.e. removing entire li element
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from Local Storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = []; //task variable will be set to an empty array if no tasks are found in the ls.
  } else { //since ls can only store strings we would have to use json parse method
    tasks = JSON.parse(localStorage.getItem('tasks'));

  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1); //delete/removes item from the array
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks)); //to convert into string since Ls only store string values
}

// Clear Tasks
function clearTasks() {
  //first method to clear task
  // taskList.innerHTML = '';

  //second method to clear using firstchild (recommended)
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear from Local Storage
  clearTasksFromLocalStorage();
}

// Clear Tasks from Local Storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}
     //Filter tasks

     function filterTasks(e){
         //This will get us everything that is being entered
        
         //We wan to get all of the list items which have a class 
         //of collection using loop
         
         //The text that is being typed will matched to the 'indexof'
         //If its not equal to -1(meaning its a match) it will be displayed    
            const text = e.target.value.toLowerCase();      
            document.querySelectorAll('.collection-item').forEach(function(task){
              const item = task.firstChild.textContent;
              if(item.toLowerCase().indexOf(text) != -1){
                task.style.display = 'block';
              } else {
                task.style.display = 'none';
              }
            });
          }
