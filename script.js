document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');
    const clearCompletedButton = document.getElementById('clear-completed');

    // Load tasks from localStorage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = `task ${task.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <span>${task.text}</span>
                <button onclick="toggleTask(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="removeTask(${index})">Remove</button>
            `;
            taskList.appendChild(li);
        });
    };

    window.toggleTask = (index) => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    };

    window.removeTask = (index) => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    addTaskButton.addEventListener('click', () => {
        const text = taskInput.value.trim();
        if (text) {
            tasks.push({ text, completed: false });
            taskInput.value = '';
            saveTasks();
            renderTasks();
        }
    });

    clearCompletedButton.addEventListener('click', () => {
        const remainingTasks = tasks.filter(task => !task.completed);
        tasks.length = 0;
        tasks.push(...remainingTasks);
        saveTasks();
        renderTasks();
    });

    // Initial render
    renderTasks();
});
