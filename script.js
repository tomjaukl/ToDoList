function loadTasks() {
    const taskList = document.getElementById('mainContent');
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.forEach((task, index) => renderTask(task, index, taskList));
}

function renderTask(task, index, taskList) {
    const taskItem = document.createElement('div');
    taskItem.className = 'taskItem';

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
        let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskList.removeChild(taskItem);
    });
    const TaskCheckbox = document.createElement('input');
    TaskCheckbox.type = 'checkbox';
    TaskCheckbox.checked = task.completed || false;
    TaskCheckbox.addEventListener('change', () => {
        let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks[index].completed = TaskCheckbox.checked;
        
        localStorage.setItem('tasks', JSON.stringify(tasks));
    });
    
    const TaskName = document.createElement('h3');
    TaskName.textContent = task.name;
    
    const TaskDesc = document.createElement('p');
    TaskDesc.textContent = task.desc;

    taskItem.appendChild(removeButton);
    taskItem.appendChild(TaskCheckbox);
    taskItem.appendChild(TaskName);
    taskItem.appendChild(TaskDesc);
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

window.addEventListener('DOMContentLoaded', loadTasks);
