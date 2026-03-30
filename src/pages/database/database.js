// database.js
const DB_NAME = 'uol_web_db';

// 1. Initialize data if it's the first time
if (!localStorage.getItem(DB_NAME)) {
    const sampleData = [
        { id: Date.now(), title: "Responsive Design", description: "Built with a mobile-first approach using Tailwind utilities." },
        { id: Date.now() + 1, title: "Modern UI", description: "Clean and professional interface using Flowbite components." }
    ];
    localStorage.setItem(DB_NAME, JSON.stringify(sampleData));
}

// 2. Helper to get data
function getDB() {
    return JSON.parse(localStorage.getItem(DB_NAME)) || [];
}

// 3. Helper to save data
function saveDB(data) {
    localStorage.setItem(DB_NAME, JSON.stringify(data));
}