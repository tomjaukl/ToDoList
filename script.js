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
    if (document.getElementById('taskForm')) return;
    const form = document.createElement('form');
    form.id = 'taskForm';
    form.innerHTML = `
        <label for="taskName">Task Name: </label>
        <input type="text" id="taskName" required>
        <label for="taskDesc">Description: </label>
        <input type="text" id="taskDesc" required>
        <button type="submit">Add Task</button>
    `;
    document.body.appendChild(form);

    form.onsubmit = function(event) {
        event.preventDefault();
        const taskName = document.getElementById('taskName').value.trim();
        const taskDesc = document.getElementById('taskDesc').value.trim();
        if (!taskName || !taskDesc) {
            alert('Vyplň obě pole!');
            return;
        }
        addTask(taskName, taskDesc);
        document.body.removeChild(form);
    };
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

function fancyAnimation() {
    const button = document.getElementById('removeAllTask');
    button.addEventListener('mouseover', () => {
        button.style.backgroundColor = 'red';
        const confirmationMessage = document.getElementById('confirmationMessage'); 
        confirmationMessage.style.display = 'block';
    });
    button.addEventListener('mouseout', () => {
        button.style.backgroundColor = '';
        const confirmationMessage = document.getElementById('confirmationMessage'); 
        confirmationMessage.style.display = 'none';
    });
}

function openSettings() {
    
}

window.addEventListener('DOMContentLoaded', loadTasks);
window.addEventListener('DOMContentLoaded', fancyAnimation);
