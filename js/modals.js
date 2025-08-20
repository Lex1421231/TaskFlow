// Открытие модального окна задачи
function openTaskModal(isEdit = false) {
    const taskModal = document.getElementById('taskModal');
    const modalTitle = document.getElementById('modalTitle');
    const deleteTaskBtn = document.getElementById('deleteTaskBtn');
    
    if (isEdit) {
        modalTitle.textContent = 'Редактировать задачу';
        const column = window.columns.find(c => c.id === window.currentColumnId);
        if (column) {
            const task = column.tasks.find(t => t.id === window.currentTaskId);
            if (task) {
                document.getElementById('taskId').value = task.id;
                document.getElementById('taskTitle').value = task.title;
                document.getElementById('taskDescription').value = task.description || '';
                document.getElementById('taskPriority').value = task.priority || 'medium';
                document.getElementById('dueDate').value = task.dueDate || '';
                
                // Показываем кнопку удаления
                deleteTaskBtn.style.display = 'block';
            }
        }
    } else {
        modalTitle.textContent = 'Добавить задачу';
        document.getElementById('taskForm').reset();
        document.getElementById('taskId').value = '';
        document.getElementById('dueDate').value = '';
        
        // Скрываем кнопку удаления
        deleteTaskBtn.style.display = 'none';
    }
    
    document.getElementById('columnId').value = window.currentColumnId;
    taskModal.classList.add('active');
}

// Открытие модального окна колонки
function openColumnModal(isEdit = false) {
    const columnModal = document.getElementById('columnModal');
    const modalColumnTitle = document.getElementById('modalColumnTitle');
    const deleteColumnBtn = document.getElementById('deleteColumn');
    
    if (isEdit) {
        modalColumnTitle.textContent = 'Редактировать колонку';
        const column = window.columns.find(c => c.id === window.currentColumnId);
        if (column) {
            document.getElementById('columnTitle').value = column.title;
            
            // Показываем кнопку удаления
            deleteColumnBtn.style.display = 'block';
        }
    } else {
        modalColumnTitle.textContent = 'Добавить колонку';
        document.getElementById('columnForm').reset();
        
        // Скрываем кнопку удаления
        deleteColumnBtn.style.display = 'none';
    }
    
    columnModal.classList.add('active');
}

// Закрытие модальных окон
function closeModals() {
    document.getElementById('taskModal').classList.remove('active');
    document.getElementById('columnModal').classList.remove('active');
}

// Сохранение задачи
function saveTask() {
    const taskId = document.getElementById('taskId').value;
    const columnId = document.getElementById('columnId').value;
    const title = document.getElementById('taskTitle').value.trim();
    const description = document.getElementById('taskDescription').value.trim();
    const priority = document.getElementById('taskPriority').value;
    const dueDate = document.getElementById('dueDate').value;
    
    if (!title) {
        alert('Введите название задачи');
        return;
    }
    
    const columnIndex = window.columns.findIndex(c => c.id === columnId);
    if (columnIndex === -1) return;
    
    if (taskId) {
        // Редактирование существующей задачи
        const taskIndex = window.columns[columnIndex].tasks.findIndex(t => t.id === taskId);
        if (taskIndex !== -1) {
            window.columns[columnIndex].tasks[taskIndex] = {
                id: taskId,
                title,
                description,
                priority,
                dueDate
            };
        }
    } else {
        // Добавление новой задачи
        window.columns[columnIndex].tasks.push({
            id: generateId(),
            title,
            description,
            priority,
            dueDate
        });
    }
    
    saveToLocalStorage();
    renderColumns();
    closeModals();
}

// Сохранение колонки
function saveColumn() {
    const title = document.getElementById('columnTitle').value.trim();
    const isEdit = document.getElementById('deleteColumn').style.display === 'block';
    
    if (!title) {
        alert('Введите название колонки');
        return;
    }
    
    if (isEdit) {
        // Редактирование существующей колонки
        const columnIndex = window.columns.findIndex(c => c.id === window.currentColumnId);
        if (columnIndex !== -1) {
            window.columns[columnIndex].title = title;
        }
    } else {
        // Добавление новой колонки
        window.columns.push({
            id: generateId(),
            title,
            tasks: []
        });
    }
    
    saveToLocalStorage();
    renderColumns();
    closeModals();
    document.getElementById('columnForm').reset();
}