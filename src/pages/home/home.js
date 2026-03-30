// 1. Selection of the containers
const container = document.getElementById('features-container');
const searchInput = document.getElementById('content-search');
const sortSelect = document.getElementById('sort-order');
const statChars = document.getElementById('stat-chars');

/**
 * Task 5: Object CRUD
 */
const uiState = {
    currentSearch: "",
    sortBy: "asc"
};

/**
 * 2. The Main Render Function
 */
export const renderFeatures = () => {
    // Task 5: Read from Object
    const searchTerm = uiState.currentSearch;
    const sortOrder = uiState.sortBy;

    // Task 6: String Methods (Data Cleaning)
    const cleanSearch = searchTerm.trim().toLowerCase();

    // Retrieve data from database.js
    const data = getDB(); 

    // --- TASK 3: ARRAY METHODS ---

    // 1. arr.filter() & arr.includes() (Search)
    let processedData = data.filter(item => 
        item.title.toLowerCase().includes(cleanSearch) || 
        item.description.toLowerCase().includes(cleanSearch)
    );

    // 2. arr.sort() (Sorting)
    processedData.sort((a, b) => {
        // String Method: localeCompare for accurate alphabetical sorting
        return sortOrder === "asc" 
            ? a.title.localeCompare(b.title) 
            : b.title.localeCompare(a.title);
    });

    // 3. arr.reduce() (Statistics - Task 3)
    const totalChars = processedData.reduce((acc, item) => acc + item.description.length, 0);
    if (statChars) statChars.innerText = totalChars; // Update UI

    // 4. arr.map() (Transforming for UI - Task 3)
    const finalUI = processedData.map(item => {
        // Task 6: String Methods (Formatting)
        const displayTitle = item.title.toUpperCase();
        const displayDesc = item.description.slice(0, 80).concat("...");
        return { ...item, displayTitle, displayDesc };
    });

    // --- RENDERING ---
    container.innerHTML = ''; 

    if (finalUI.length === 0) {
        container.innerHTML = `<p class="col-span-full text-center py-10 text-gray-400">No results found.</p>`;
        return;
    }

    finalUI.forEach(item => {
        // Locate your loop in home.js and update the innerHTML template:
container.innerHTML += `
    <div class="group p-8 bg-white border border-gray-200 rounded-[2rem] shadow-sm transition-all duration-500 
                hover:-translate-y-3 hover:shadow-2xl hover:border-blue-500 
                dark:bg-gray-800 dark:border-gray-700 dark:hover:border-blue-400">
        
        <span class="inline-block px-3 py-1 mb-6 text-[10px] font-black uppercase tracking-widest text-blue-700 bg-blue-50 rounded-full dark:bg-blue-900/30 dark:text-blue-300">
            Engineering Module
        </span>

        <h5 class="mb-4 text-2xl font-black tracking-tight text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
            ${item.displayTitle}
        </h5>
        
        <p class="text-base font-medium text-gray-600 dark:text-gray-400 leading-relaxed">
            ${item.displayDesc}
        </p>

        <div class="mt-8 flex items-center text-blue-700 dark:text-blue-400 font-extrabold text-sm uppercase tracking-tighter cursor-pointer">
            View Specification 
            <svg class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
        </div>
    </div>
`;
    });
};

/**
 * 3. Event Listeners (Fixing the "Not Working" issue)
 */
if (searchInput) {
    searchInput.addEventListener('keyup', (e) => {
        uiState.currentSearch = e.target.value; // Task 5: Update Object
        renderFeatures();
    });
}

if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
        uiState.sortBy = e.target.value; // Task 5: Update Object
        renderFeatures();
    });
}



// Initial Load
document.addEventListener('DOMContentLoaded', renderFeatures);