const fs = require('fs');
const path = require('path');

// Файлы в порядке подключения
const jsFiles = [
    'utils.js',
    'storage.js',
    'dom.js',
    'dragdrop.js',
    'modals.js',
    'contextmenu.js', // Добавляем новый файл
    'app.js',
    'init.js'
];

// Читаем и объединяем все файлы
let bundledContent = '';
jsFiles.forEach(file => {
    const filePath = path.join(__dirname, 'js', file);
    const content = fs.readFileSync(filePath, 'utf8');
    bundledContent += `// ${file}\n${content}\n\n`;
});

// Записываем в один файл
fs.writeFileSync(path.join(__dirname, 'js', 'bundle.js'), bundledContent);
console.log('Бандл создан успешно!');