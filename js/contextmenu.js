// Контекстное меню для задач и колонок
function setupContextMenus() {
    const taskContextMenu = document.getElementById('taskContextMenu');
    const columnContextMenu = document.getElementById('columnContextMenu');
    
    // Показать контекстное меню для задач
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        
        // Проверяем, кликнули ли на задачу
        const task = e.target.closest('.task');
        if (task) {
            const taskId = task.getAttribute('data-task-id');
            window.currentTaskId = taskId;
            window.currentColumnId = findTaskColumnId(taskId);
            
            // Позиционируем меню
            taskContextMenu.style.display = 'block';
            taskContextMenu.style.left = e.pageX + 'px';
            taskContextMenu.style.top = e.pageY + 'px';
            return;
        }
        
        // Проверяем, кликнули ли на колонку
        const column = e.target.closest('.column');
        if (column) {
            const columnId = column.getAttribute('data-column-id');
            window.currentColumnId = columnId;
            
            // Позиционируем меню
            columnContextMenu.style.display = 'block';
            columnContextMenu.style.left = e.pageX + 'px';
            columnContextMenu.style.top = e.pageY + 'px';
        }
    });
    
    // Скрыть контекстное меню при клике в любом месте
    document.addEventListener('click', function() {
        taskContextMenu.style.display = 'none';
        columnContextMenu.style.display = 'none';
    });
    
    // Обработчики для пунктов меню задач
    document.getElementById('editTaskContext').addEventListener('click', function() {
        openTaskModal(true);
    });
    
    document.getElementById('deleteTaskContext').addEventListener('click', function() {
        deleteTask(window.currentTaskId);
    });
    
    // Обработчики для пунктов меню колонок
    document.getElementById('renameColumnContext').addEventListener('click', function() {
        openColumnModal(true);
    });
    
    document.getElementById('deleteColumnContext').addEventListener('click', function() {
        deleteColumn(window.currentColumnId);
    });
}

// Удаление задачи
function deleteTask(taskId) {
    if (!taskId || !confirm('Вы уверены, что хотите удалить эту задачу?')) return;
    
    for (const column of window.columns) {
        const taskIndex = column.tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            column.tasks.splice(taskIndex, 1);
            saveToLocalStorage();
            renderColumns();
            break;
        }
    }
}

// Удаление колонки
function deleteColumn(columnId) {
    if (!columnId || !confirm('Вы уверены, что хотите удалить эту колонку? Все задачи в ней будут удалены.')) return;
    
    const columnIndex = window.columns.findIndex(column => column.id === columnId);
    if (columnIndex !== -1) {
        window.columns.splice(columnIndex, 1);
        saveToLocalStorage();
        renderColumns();
    }
}