function loadTasks() {
    // Task list element
    const taskList = document.getElementById('mainContent');
    // Get tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.forEach((task, index) => renderTask(task, index, taskList));
}

function renderTask(task, index, taskList) {
    const taskItem = document.createElement('div');
    taskItem.className = 'taskItem';

    const removeButton = document.createElement('button');
    removeButton.textContent = 'X';
    removeButton.addEventListener('click', () => {
        // Najdi vsechny ulozene ukoly
        let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        // Odstran ukol na 
        tasks.splice(index, 1);
        // Uloz zmeneny seznam ukolu
        localStorage.setItem('tasks', JSON.stringify(tasks));
        // Odeber ukol z DOM
        taskList.removeChild(taskItem);
    });

    const TaskName = document.createElement('h3');
    TaskName.textContent = task.name;

    const topBar = document.createElement('div');
    topBar.className = 'Bar';
    topBar.id = 'topBar';

    topBar.appendChild(TaskName);
    topBar.appendChild(removeButton);

    const TaskCheckbox = document.createElement('input');
    TaskCheckbox.type = 'checkbox';
    // pokud je checkbox checked, nastav completed na true
    TaskCheckbox.checked = task.completed || false;
    // pozoruj zmenu checkboxu
    TaskCheckbox.addEventListener('change', () => {
        // Vsechny tasky v localStorage
        let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        // Nastav completed podle indexu
        tasks[index].completed = TaskCheckbox.checked;

        // Uloz zmeny do localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    });
    
    const TaskDesc = document.createElement('p');
    TaskDesc.textContent = task.desc;
    TaskDesc.classList.add("TaskDesc");

    const downBar = document.createElement('div');
    downBar.className = 'Bar';
    downBar.appendChild(TaskDesc);
    downBar.appendChild(TaskCheckbox);
    
    taskItem.appendChild(topBar);
    taskItem.appendChild(downBar);
    taskList.appendChild(taskItem);
}


function createTask() {
    const taskFormContainer = document.getElementById('taskFormContainer');
    taskFormContainer.style.display = 'block';

    const form = document.getElementById('taskForm');

    form.onsubmit = function(event) {
        event.preventDefault();
        const taskName = document.getElementById('taskName').value.trim();
        const taskDesc = document.getElementById('taskDesc').value.trim();
        if (!taskName || !taskDesc) {
            alert('Vyplň obě pole!');
            return;
        }
        addTask(taskName, taskDesc);
        taskFormContainer.style.display = 'none';
        form.reset();
    };
}
function hideTaskForm(){
    const taskFormContainer = document.getElementById('taskFormContainer');
    taskFormContainer.style.display = 'none';
}

function addTask(taskName, taskDesc) {
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const newTask = { name: taskName, desc: taskDesc, completed: false };
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    const taskList = document.getElementById('mainContent');
    renderTask(newTask, tasks.length - 1, taskList);
}

function removeAllTasks() {
    localStorage.removeItem('tasks');
    const taskList = document.getElementById('mainContent');
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
}


function openSettings() {
    const panel = document.getElementById('settingsContainer');
    panel.style.display = 'block';
    const closeBtn = document.getElementById('closeSettings');
    closeBtn.onclick = () => {
        panel.style.display = 'none';
    }
}

// ↓ Profile picture upload logic ↓
// Using Base64 because img is binary data and localStorage only supports strings
const input = document.getElementById('profilePicUpload');
const profilePic = document.getElementById('profilePic');

input.addEventListener('change', () => {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            profilePic.src = reader.result;
            localStorage.setItem('savedProfilePicture', reader.result);
        }
        reader.readAsDataURL(file);
    }
});

function setName(name){
    const userName = document.getElementById('userName');
    if (name && name.trim() !== ''){
        userName.textContent = name;
        localStorage.setItem('savedName', name);
    } else {
        alert('I know you can come up with something and I mean SOMETHING');
    }
}

function loadProfilePicture(){
    if (localStorage.getItem('savedProfilePicture')){
        const profilePic = document.getElementById('profilePic');
        profilePic.src = localStorage.getItem('savedProfilePicture');
    } else {
        console.debug('No saved profile picture found in localStorage.');
    }
}
function loadUserName(){
    if (localStorage.getItem('savedName')){
        const userName = document.getElementById('userName');
        userName.textContent = localStorage.getItem('savedName');
    }
}
function loadInitialData(){
    loadTasks();
    loadProfilePicture();
    loadUserName();
}

// ↓ Auto-resize textarea ↓
const taskDesc = document.getElementById('taskDesc');
taskDesc.addEventListener('input', () => {
    taskDesc.style.height = 'auto';
    taskDesc.style.height = taskDesc.scrollHeight + 'px';
});

function Greeting(){
    const name = localStorage.getItem('savedName');
    const greeting = document.getElementById('greetingMessage');
    const hours = new Date().getHours();
    if (hours < 12) {
    greeting.textContent = `Good morning, ${name}!`;
    } else if (hours < 18) {
    greeting.textContent = `Good afternoon, ${name}!`;
    } else if (hours >= 18 && hours < 20) {
    greeting.textContent = `Good evening, ${name}!`;
    } else {
    greeting.textContent = `Good night, ${name}!`;
    }
    console.log(hours);
}
function fetchQuote() {
  fetch('https://api.breakingbadquotes.xyz/v1/quotes')
    .then(response => response.json())
    .then(data => {
      const quote = document.getElementById('quote');
      const author = document.getElementById('author');
      quote.textContent = `"${data[0].quote}"`;
      author.textContent = `— ${data[0].author}`;
    })
}

window.addEventListener('DOMContentLoaded', () => {
  loadInitialData();
  Greeting();
  fetchQuote();
});

