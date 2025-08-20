// Инициализация приложения
function initApp() {
    // Загрузка данных из localStorage
    window.columns = loadFromLocalStorage();
    
    // Если колонок нет, создаем стандартные
    if (window.columns.length === 0) {
        window.columns = [
            { id: generateId(), title: 'Запланировано', tasks: [] },
            { id: generateId(), title: 'В работе', tasks: [] },
            { id: generateId(), title: 'Выполнено', tasks: [] }
        ];
        saveToLocalStorage();
    }
    
    // Отрисовка интерфейса
    renderColumns();
    
    // Настройка обработчиков событий
    setupEventListeners();
}

// Запуск приложения после загрузки DOM
document.addEventListener('DOMContentLoaded', initApp);