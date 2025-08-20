// Главный файл приложения
window.columns = [];
window.currentColumnId = null;
window.currentTaskId = null;
window.draggedTask = null;

// Настройка обработчиков событий
function setupEventListeners() {
    // Открытие модального окна задачи при клике на задачу
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('task') || e.target.closest('.task')) {
            const taskElement = e.target.closest('.task');
            if (taskElement) {
                const taskId = taskElement.getAttribute('data-task-id');
                const columnId = findTaskColumnId(taskId);
                if (columnId) {
                    window.currentColumnId = columnId;
                    window.currentTaskId = taskId;
                    openTaskModal(true);
                }
            }
        }
        
        // Удаление задачи через кнопку
        if (e.target.classList.contains('delete-task-btn')) {
            e.stopPropagation();
            const taskId = e.target.getAttribute('data-task-id');
            deleteTask(taskId);
        }
    });
    
    // Закрытие модальных окон
    document.getElementById('closeModal').addEventListener('click', closeModals);
    document.getElementById('closeColumnModal').addEventListener('click', closeModals);
    document.getElementById('cancelTask').addEventListener('click', closeModals);
    document.getElementById('cancelColumn').addEventListener('click', closeModals);
    
    // Сохранение задачи
    document.getElementById('saveTask').addEventListener('click', saveTask);
    
    // Удаление задачи из модального окна
    document.getElementById('deleteTaskBtn').addEventListener('click', function() {
        deleteTask(window.currentTaskId);
        closeModals();
    });
    
    // Сохранение колонки
    document.getElementById('saveColumn').addEventListener('click', saveColumn);
    
    // Удаление колонки из модального окна
    document.getElementById('deleteColumn').addEventListener('click', function() {
        deleteColumn(window.currentColumnId);
        closeModals();
    });
    
    // Добавление колонки через главную кнопку
    document.getElementById('addColumnBtn').addEventListener('click', function() {
        openColumnModal(false);
    });
    
    // Drag and Drop
    setupDragAndDrop();
    
    // Контекстное меню
    setupContextMenus();
}