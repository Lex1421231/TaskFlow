// Настройка Drag and Drop
function setupDragAndDrop() {
    document.addEventListener('dragstart', function(e) {
        if (e.target.classList.contains('task')) {
            window.draggedTask = e.target;
            e.target.classList.add('dragging');
        }
    });
    
    document.addEventListener('dragend', function(e) {
        if (e.target.classList.contains('task')) {
            e.target.classList.remove('dragging');
        }
    });
    
    document.addEventListener('dragover', function(e) {
        e.preventDefault();
        const column = e.target.closest('.column');
        if (column) {
            column.classList.add('drop-target');
        }
    });
    
    document.addEventListener('dragleave', function(e) {
        const column = e.target.closest('.column');
        if (column) {
            column.classList.remove('drop-target');
            // Убедимся, что все колонки сбросили класс, если курсор покинул область колонки
            document.querySelectorAll('.column').forEach(col => {
                const rect = col.getBoundingClientRect();
                if (e.clientX < rect.left || e.clientX > rect.right || 
                    e.clientY < rect.top || e.clientY > rect.bottom) {
                    col.classList.remove('drop-target');
                }
            });
        }
    });
    
    document.addEventListener('drop', function(e) {
        e.preventDefault();
        document.querySelectorAll('.column').forEach(col => {
            col.classList.remove('drop-target');
        });
        
        const column = e.target.closest('.column');
        if (column && window.draggedTask) {
            const taskId = window.draggedTask.getAttribute('data-task-id');
            const newColumnId = column.getAttribute('data-column-id');
            moveTaskToColumn(taskId, newColumnId);
        }
    });
}

// Перемещение задачи между колонками
function moveTaskToColumn(taskId, newColumnId) {
    let task = null;
    let oldColumnIndex = -1;
    
    // Находим задачу и её текущую колонку
    window.columns.forEach((column, columnIndex) => {
        const taskIndex = column.tasks.findIndex(t => t.id === taskId);
        if (taskIndex !== -1) {
            task = column.tasks[taskIndex];
            oldColumnIndex = columnIndex;
            column.tasks.splice(taskIndex, 1);
        }
    });
    
    if (task && oldColumnIndex !== -1) {
        // Добавляем задачу в новую колонку
        const newColumnIndex = window.columns.findIndex(c => c.id === newColumnId);
        if (newColumnIndex !== -1) {
            window.columns[newColumnIndex].tasks.push(task);
            saveToLocalStorage();
            renderColumns();
        }
    }
}