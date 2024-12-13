document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const prioritySelector = document.getElementById('priority-selector');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');
    const clearCompletedButton = document.getElementById('clear-completed');
    const searchInput = document.getElementById('search-input');

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const renderTasks = (filter = '') => {
        taskList.innerHTML = '';
        tasks
            .filter(task => task.text.toLowerCase().includes(filter.toLowerCase()))
            .forEach((task, index) => {
                const li = document.createElement('li');
                li.className = `task ${task.priority} ${task.completed ? 'completed' : ''}`;
                li.innerHTML = `
                    <span>${task.text}</span>
                    <div>
                        <button onclick="toggleTask(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
                        <button onclick="editTask(${index})">Edit</button>
                        <button onclick="removeTask(${index})">Remove</button>
                    </div>
                `;
                taskList.appendChild(li);
            });
    };

    window.toggleTask = (index) => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks(searchInput.value);
    };

    window.editTask = (index) => {
        const newText = prompt('Edit your task:', tasks[index].text);
        if (newText) {
            tasks[index].text = newText.trim();
            saveTasks();
            renderTasks(searchInput.value);
        }
    };

    window.removeTask = (index) => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks(searchInput.value);
    };

    addTaskButton.addEventListener('click', () => {
        const text = taskInput.value.trim();
        const priority = prioritySelector.value;
        if (text) {
            tasks.push({ text, priority, completed: false });
            taskInput.value = '';
            saveTasks();
            renderTasks(searchInput.value);
        }
    });

    clearCompletedButton.addEventListener('click', () => {
        const remainingTasks = tasks.filter(task => !task.completed);
        tasks.length = 0;
        tasks.push(...remainingTasks);
        saveTasks();
        renderTasks(searchInput.value);
    });

    searchInput.addEventListener('input', (e) => {
        renderTasks(e.target.value);
    });

    renderTasks();
});
