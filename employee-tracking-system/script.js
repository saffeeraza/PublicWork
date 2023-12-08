document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskDetails = document.getElementById('taskDetails');
    const taskHours = document.getElementById('taskHours');
    const taskDeadline = document.getElementById('taskDeadline');
    const task = taskInput.value.trim();
    const details = taskDetails.value.trim();
    const hours = taskHours.value;
    const deadline = taskDeadline.value;

    if (task && hours && deadline) {
        const tasks = getTasks();
        tasks.push({ title: task, details, hours, deadline, completed: false });
        saveTasks(tasks);
        loadTasks();
        clearForm();
    } else {
        alert("Please enter task title, hours, and deadline!");
    }
}

function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = getTasks();
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'task completed' : 'task';
        li.innerHTML = `
            <div class="task-info">
                <span class="task-title">${task.title}</span>
                <span class="task-details">${task.details}</span>
                <span class="task-hours">${task.hours} hours</span>
                <span class="task-deadline">Deadline: ${task.deadline}</span>
            </div>
            <div class="task-actions">
                <button onclick="toggleCompletion(${index})">${task.completed ? 'Completed' : 'Complete'}</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>`;
        taskList.appendChild(li);
    });
}

function toggleCompletion(index) {
    const tasks = getTasks();
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    loadTasks();
}

function deleteTask(index) {
    const tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    loadTasks();
}

function clearForm() {
    document.getElementById('taskInput').value = '';
    document.getElementById('taskDetails').value = '';
    document.getElementById('taskHours').value = '';
    document.getElementById('taskDeadline').value = '';
}

function createButton(text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.onclick = onClick;
    return button;
}
