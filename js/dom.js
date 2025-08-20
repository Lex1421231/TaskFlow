// Отрисовка колонок
function renderColumns() {
    const columnsContainer = document.getElementById('columnsContainer');
    columnsContainer.innerHTML = '';
    
    window.columns.forEach(column => {
        const columnElement = document.createElement('div');
        columnElement.className = 'column';
        columnElement.setAttribute('data-column-id', column.id);
        
        columnElement.innerHTML = `
            <div class="column-header">
                <div>
                    <h3 class="column-title">${column.title}</h3>
                </div>
                <div>
                    <span class="task-count">${column.tasks.length}</span>
                    <button class="delete-column-btn" data-column-id="${column.id}">×</button>
                </div>
            </div>
            <div class="tasks-container" data-column-id="${column.id}">
                ${renderTasks(column.tasks)}
            </div>
            <button class="add-task-btn" data-column-id="${column.id}">+ Добавить задачу</button>
        `;
        
        columnsContainer.appendChild(columnElement);
    });
    
    // Добавляем кнопку для создания новой колонки
    const addColumnButton = document.createElement('div');
    addColumnButton.className = 'add-column-btn';
    addColumnButton.innerHTML = '+ Добавить колонку';
    addColumnButton.addEventListener('click', openColumnModal);
    columnsContainer.appendChild(addColumnButton);
    
    // Добавляем обработчики для кнопок удаления колонок
    document.querySelectorAll('.delete-column-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const columnId = this.getAttribute('data-column-id');
            deleteColumn(columnId);
        });
    });
    
    // Добавляем обработчики для кнопок добавления задач
    document.querySelectorAll('.add-task-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const columnId = this.getAttribute('data-column-id');
            window.currentColumnId = columnId;
            openTaskModal();
        });
    });
}

// Отрисовка задач
function renderTasks(tasks) {
    if (tasks.length === 0) {
        return '<p style="color: var(--secondary-color); text-align: center; padding: 1rem;">Задач нет</p>';
    }
    
    return tasks.map(task => `
        <div class="task" data-task-id="${task.id}" draggable="true">
            <div class="task-header">
                <h4 class="task-title">${task.title}</h4>
                <button class="delete-task-btn" data-task-id="${task.id}">×</button>
            </div>
            <p class="task-description">${task.description || ''}</p>
            <div class="task-footer">
                <span class="task-priority priority-${task.priority || 'medium'}">
                    ${getPriorityText(task.priority)}
                </span>
                ${task.dueDate ? `<span>📅 ${formatDate(task.dueDate)}</span>` : ''}
            </div>
        </div>
    `).join('');
}

// Поиск колонки, в которой находится задача
function findTaskColumnId(taskId) {
    for (const column of window.columns) {
        if (column.tasks.some(task => task.id === taskId)) {
            return column.id;
        }
    }
    return null;
}