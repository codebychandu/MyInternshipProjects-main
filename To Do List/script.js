document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to save tasks to local storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
                <input type="checkbox" ${task.completed ? 'checked' : ''} data-index="${index}">
            `;
            taskList.appendChild(li);
        });
    }

    // Function to add task
    function addTask(text) {
        tasks.push({ text, completed: false });
        saveTasks();
        renderTasks();
        taskInput.value = '';
    }

    // Function to edit task
    function editTask(index, newText) {
        tasks[index].text = newText;
        saveTasks();
        renderTasks();
    }

    // Function to delete task
    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    // Function to toggle task completion
    function toggleTaskCompletion(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }

    // Event listener for task submission
    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const text = taskInput.value.trim();
        if (text !== '') {
            addTask(text);
        }
    });

    // Event delegation for edit and delete buttons
    taskList.addEventListener('click', function(event) {
        if (event.target.classList.contains('edit-btn')) {
            const index = event.target.dataset.index;
            const newText = prompt('Edit Task:', tasks[index].text);
            if (newText !== null) {
                editTask(index, newText.trim());
            }
        } else if (event.target.classList.contains('delete-btn')) {
            const index = event.target.dataset.index;
            if (confirm('Are you sure you want to delete this task?')) {
                deleteTask(index);
            }
        } else if (event.target.type === 'checkbox') {
            const index = event.target.dataset.index;
            toggleTaskCompletion(index);
        }
    });

    // Initial render
    renderTasks();
});
