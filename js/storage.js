// Сохранение в localStorage
function saveToLocalStorage() {
    localStorage.setItem('taskFlowColumns', JSON.stringify(window.columns));
}

// Загрузка из localStorage
function loadFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem('taskFlowColumns')) || [];
    return data;
}