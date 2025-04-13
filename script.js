// DOM Elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task when the button is clicked
addTaskBtn.addEventListener('click', addTask);

// Add task when Enter key is pressed
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    // Create task object
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    // Add task to the list
    addTaskToDOM(task);
    
    // Save tasks to localStorage
    saveTasks();

    // Clear input
    taskInput.value = '';
}

// Function to add task to the DOM
function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.dataset.id = task.id;

    li.innerHTML = `
        <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
        <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
        <button class="delete-btn">Delete</button>
    `;

    // Add event listeners
    const checkbox = li.querySelector('.task-checkbox');
    const deleteBtn = li.querySelector('.delete-btn');

    checkbox.addEventListener('change', toggleTask);
    deleteBtn.addEventListener('click', deleteTask);

    taskList.appendChild(li);
}

// Function to toggle task completion
function toggleTask(e) {
    const taskItem = e.target.parentElement;
    const taskText = taskItem.querySelector('.task-text');
    taskText.classList.toggle('completed');
    
    // Update localStorage
    saveTasks();
}

// Function to delete a task
function deleteTask(e) {
    const taskItem = e.target.parentElement;
    taskItem.remove();
    
    // Update localStorage
    saveTasks();
}

// Function to save tasks to localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task-item').forEach(taskItem => {
        tasks.push({
            id: taskItem.dataset.id,
            text: taskItem.querySelector('.task-text').textContent,
            completed: taskItem.querySelector('.task-checkbox').checked
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task));
} 