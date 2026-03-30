// admin.js
const tableBody = document.getElementById('contentTableBody');
const adminForm = document.getElementById('adminForm');
const crudModal = document.getElementById('crudModal');

// --- THE CRUD OPERATIONS ---

// 1. READ: Display items in the table
// 1. READ: Display items in the table
function renderUI() {
    const items = getDB();
    if (!tableBody) return;

    tableBody.innerHTML = ''; // Clear table
    items.forEach((item) => {
        // Updated template with dark mode support
        tableBody.innerHTML += `
            <tr class="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors 
                       dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                
                <td class="px-6 py-4 font-bold text-gray-900 dark:text-white">
                    ${item.title}
                </td>
                
                <td class="px-6 py-4 text-gray-600 dark:text-gray-400">
                    ${item.description}
                </td>
                
                <td class="px-6 py-4 text-right">
                    <button onclick="editEntry(${item.id})" 
                            class="text-blue-600 dark:text-blue-400 font-bold hover:underline mr-4">
                        Edit
                    </button>
                    <button onclick="deleteEntry(${item.id})" 
                            class="text-red-600 dark:text-red-400 font-bold hover:underline">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

// 2. CREATE & UPDATE: Save form data
adminForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const id = document.getElementById('editId').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    let items = getDB();

    if (id) {
        // Update existing item
        items = items.map(item => item.id == id ? { ...item, title, description } : item);
    } else {
        // Create new item
        items.push({ id: Date.now(), title, description });
    }

    saveDB(items);    // Save to LocalStorage
    renderUI();       // UPDATE TABLE INSTANTLY
    closeModal();     // Close the popup
});

// 3. DELETE: Remove an item
window.deleteEntry = function(id) {
    if (confirm("Are you sure you want to delete this?")) {
        const filtered = getDB().filter(item => item.id != id);
        saveDB(filtered);
        renderUI();   // UPDATE TABLE INSTANTLY
    }
};

// 4. EDIT: Open modal and fill data
window.editEntry = function(id) {
    const item = getDB().find(i => i.id == id);
    if (item) {
        document.getElementById('editId').value = item.id;
        document.getElementById('title').value = item.title;
        document.getElementById('description').value = item.description;
        document.getElementById('modalTitle').innerText = "Edit Content";
        crudModal.classList.remove('hidden');
    }
};

// --- UI HELPERS ---

window.openAddModal = function() {
    adminForm.reset();
    document.getElementById('editId').value = '';
    document.getElementById('modalTitle').innerText = "Add New Content";
    crudModal.classList.remove('hidden');
};

window.closeModal = function() {
    crudModal.classList.add('hidden');
};

// Initial Load
document.addEventListener('DOMContentLoaded', renderUI);