document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
});

// oxlint-disable-next-line no-unused-vars
function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();
    
    if (!taskText) return; 

    const taskList = document.getElementById("taskList");
    const li = document.createElement("li");
    li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <button class="btn-x" onclick="removeTask(this)">×</button>
    `;
    taskList.appendChild(li);
    input.value = ''; 
    input.focus(); 

    saveTasks();
}

// oxlint-disable-next-line no-unused-vars
function removeTask(button) {
    if (confirm("Вы уверены, что хотите удалить задачу?")) {
        button.closest('li').remove();
        saveTasks();
    }
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li .task-text').forEach(taskSpan => {
        tasks.push(taskSpan.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (!savedTasks) return;

    try {
        const tasks = JSON.parse(savedTasks);
        const taskList = document.getElementById("taskList");
        
        tasks.forEach(taskText => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span class="task-text">${taskText}</span>
                <button class="btn-x" onclick="removeTask(this)">×</button>
            `;
            taskList.appendChild(li);
        });
    } catch (e) {
        console.error("Ошибка при загрузке задач:", e);
        localStorage.removeItem('tasks'); 
    }
}