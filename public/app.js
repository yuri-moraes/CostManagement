"use strict";
var _a, _b, _c, _d, _e, _f;
let salary = 0;
let fixedCosts = [];
let flexibleCosts = [];
let currentId = 1;
const salaryInput = document.getElementById("salary");
salaryInput.addEventListener("input", () => {
    salary = parseFloat(salaryInput.value) || 0;
    updateRemaining();
});
const fixedCostNameInput = document.getElementById("fixed-cost-name");
const fixedCostValueInput = document.getElementById("fixed-cost-value");
const formFixedCost = document.getElementById("form-fixed-cost");
const flexibleCostNameInput = document.getElementById("flexible-cost-name");
const flexibleCostValueInput = document.getElementById("flexible-cost-value");
const flexibleCostDateInput = document.getElementById("flexible-cost-date");
const formFlexibleCost = document.getElementById("form-flexible-cost");
const totalExpensesElement = document.getElementById("total-expenses");
const remainingElement = document.getElementById("remaining");
const fixedCostList = document.getElementById("fixed-cost-list");
const flexibleCostList = document.getElementById("flexible-cost-list");
const fixedCostCategoryInput = document.getElementById("fixed-cost-category");
const flexibleCostCategoryInput = document.getElementById("flexible-cost-category");
const filterStartDateInput = document.getElementById("filter-start-date");
const filterEndDateInput = document.getElementById("filter-end-date");
const toggleThemeButton = document.getElementById("toggle-theme");
const themeIcon = document.getElementById("theme-icon");
function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        themeIcon.innerHTML = `
      <!-- Novo ícone de Sol -->
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" stroke="currentColor"
           stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>
    `;
        localStorage.setItem("theme", "dark");
    }
    else {
        themeIcon.innerHTML = `
      <!-- Ícone de Lua para o modo claro -->
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
           viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
      </svg>
    `;
        localStorage.setItem("theme", "light");
    }
}
toggleThemeButton.addEventListener("click", toggleTheme);
// Carregar tema ao iniciar
function loadTheme() {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
        document.body.classList.add("dark-mode");
        themeIcon.innerHTML = `
      <!-- Novo ícone de Sol -->
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" stroke="currentColor"
           stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>
    `;
    }
    else {
        themeIcon.innerHTML = `
      <!-- Ícone de Lua para o modo claro -->
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
           viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
      </svg>
    `;
    }
}
function updateLocalStorage() {
    const data = {
        salary,
        fixedCosts,
        flexibleCosts,
    };
    localStorage.setItem("financeData", JSON.stringify(data));
}
function loadFromLocalStorage() {
    const savedData = localStorage.getItem("financeData");
    if (savedData) {
        const data = JSON.parse(savedData);
        salary = data.salary || 0;
        salaryInput.value = salary.toString();
        fixedCosts = data.fixedCosts || [];
        flexibleCosts = data.flexibleCosts || [];
        updateRemaining();
        renderCosts();
    }
}
function updateRemaining() {
    const totalFixed = fixedCosts.reduce((acc, cost) => acc + cost.value, 0);
    const totalFlexible = flexibleCosts.reduce((acc, cost) => acc + cost.value, 0);
    const totalExpenses = totalFixed + totalFlexible;
    const remaining = salary - totalExpenses;
    totalExpensesElement.textContent = `Custo total: R$ ${totalExpenses.toFixed(2)}`;
    remainingElement.textContent = `Sobra: R$ ${remaining.toFixed(2)}`;
    remainingElement.className =
        remaining >= 0 ? "text-green-500" : "text-red-500";
}
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}
function renderCosts() {
    fixedCostList.innerHTML = "";
    flexibleCostList.innerHTML = "";
    fixedCosts.forEach((cost) => {
        const li = document.createElement("li");
        li.className =
            "flex justify-between items-center p-4 border rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300";
        const costInfo = document.createElement("div");
        costInfo.className = "flex-1";
        costInfo.innerHTML = `<span class="font-semibold">${cost.name}</span>: R$ ${cost.value.toFixed(2)} ${cost.category
            ? `<span class="text-blue-500">(${cost.category})</span>`
            : ""}`;
        li.appendChild(costInfo);
        li.addEventListener("click", () => editCost(cost, "fixed"));
        const removeButton = document.createElement("button");
        removeButton.innerHTML = "Remover";
        removeButton.className =
            "ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200";
        removeButton.addEventListener("click", (e) => {
            e.stopPropagation();
            removeCost(cost.id, "fixed");
        });
        li.appendChild(removeButton);
        fixedCostList.appendChild(li);
    });
    flexibleCosts.forEach((cost) => {
        const li = document.createElement("li");
        li.className =
            "flex justify-between items-center p-4 border rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300";
        const costInfo = document.createElement("div");
        costInfo.className = "flex-1";
        costInfo.innerHTML = `<span class="font-semibold">${cost.name}</span>: R$ ${cost.value.toFixed(2)} <span class="text-gray-500 text-sm">(Data: ${cost.date ? formatDate(cost.date) : "Data não disponível"})</span> ${cost.category
            ? `<span class="text-blue-500">(${cost.category})</span>`
            : ""}`;
        li.appendChild(costInfo);
        li.addEventListener("click", () => editCost(cost, "flexible"));
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remover";
        removeButton.className =
            "ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200";
        removeButton.addEventListener("click", (e) => {
            e.stopPropagation();
            removeCost(cost.id, "flexible");
        });
        li.appendChild(removeButton);
        flexibleCostList.appendChild(li);
    });
    updateLocalStorage();
}
function editCost(cost, type) {
    if (type === "fixed") {
        fixedCostNameInput.value = cost.name;
        fixedCostValueInput.value = cost.value.toString();
        fixedCostCategoryInput.value = cost.category || "";
        removeCost(cost.id, "fixed");
    }
    else {
        flexibleCostNameInput.value = cost.name;
        flexibleCostValueInput.value = cost.value.toString();
        flexibleCostDateInput.value = cost.date || "";
        flexibleCostCategoryInput.value = cost.category || "";
        removeCost(cost.id, "flexible");
    }
}
function removeCost(id, type) {
    if (type === "fixed") {
        fixedCosts = fixedCosts.filter((cost) => cost.id !== id);
    }
    else {
        flexibleCosts = flexibleCosts.filter((cost) => cost.id !== id);
    }
    renderCosts();
    updateRemaining();
}
formFixedCost.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = fixedCostNameInput.value.trim();
    const value = parseFloat(fixedCostValueInput.value);
    const category = fixedCostCategoryInput.value.trim();
    if (name && !isNaN(value)) {
        fixedCosts.push({ id: currentId++, name, value, category });
        fixedCostNameInput.value = "";
        fixedCostValueInput.value = "";
        fixedCostCategoryInput.value = "";
        renderCosts();
        updateRemaining();
    }
});
formFlexibleCost.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = flexibleCostNameInput.value.trim();
    const value = parseFloat(flexibleCostValueInput.value);
    const date = flexibleCostDateInput.value;
    const category = flexibleCostCategoryInput.value.trim();
    if (name && !isNaN(value) && date) {
        flexibleCosts.push({ id: currentId++, name, value, date, category });
        flexibleCostNameInput.value = "";
        flexibleCostValueInput.value = "";
        flexibleCostDateInput.value = "";
        flexibleCostCategoryInput.value = "";
        renderCosts();
        updateRemaining();
    }
});
function exportData() {
    const data = { salary, fixedCosts, flexibleCosts };
    const dataStr = JSON.stringify(data);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "finance_data.json";
    a.click();
    URL.revokeObjectURL(url);
}
function importData(event) {
    var _a;
    const input = event.target;
    const file = (_a = input.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            const result = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            if (result) {
                const data = JSON.parse(result);
                salary = data.salary || 0;
                fixedCosts = data.fixedCosts || [];
                flexibleCosts = data.flexibleCosts || [];
                updateRemaining();
                renderCosts();
            }
        };
        reader.readAsText(file);
    }
}
(_a = document.getElementById("export-data")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", exportData);
(_b = document.getElementById("import-data")) === null || _b === void 0 ? void 0 : _b.addEventListener("change", importData);
(_c = document
    .getElementById("filter-costs")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", filterFlexibleCosts);
(_d = document.getElementById("clear-filter")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
    filterStartDateInput.value = "";
    filterEndDateInput.value = "";
    renderCosts();
});
function filterFlexibleCosts() {
    const startDate = filterStartDateInput.value
        ? new Date(filterStartDateInput.value)
        : null;
    const endDate = filterEndDateInput.value
        ? new Date(filterEndDateInput.value)
        : null;
    const filteredCosts = flexibleCosts.filter((cost) => {
        const costDate = new Date(cost.date);
        if (startDate && costDate < startDate)
            return false;
        if (endDate && costDate > endDate)
            return false;
        return true;
    });
    renderFilteredFlexibleCosts(filteredCosts);
}
function renderFilteredFlexibleCosts(filteredCosts) {
    flexibleCostList.innerHTML = "";
    filteredCosts.forEach((cost) => {
        const li = document.createElement("li");
        li.className =
            "flex justify-between items-center p-4 border rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300";
        const costInfo = document.createElement("div");
        costInfo.className = "flex-1";
        costInfo.innerHTML = `<span class="font-semibold">${cost.name}</span>: R$ ${cost.value.toFixed(2)} <span class="text-gray-500 text-sm">(Data: ${cost.date ? formatDate(cost.date) : "Data não disponível"})</span> ${cost.category
            ? `<span class="text-blue-500">(${cost.category})</span>`
            : ""}`;
        li.appendChild(costInfo);
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remover";
        removeButton.className =
            "ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200";
        removeButton.addEventListener("click", (e) => {
            e.stopPropagation();
            removeCost(cost.id, "flexible");
        });
        li.appendChild(removeButton);
        flexibleCostList.appendChild(li);
    });
}
const filterCategoryInput = document.getElementById("filter-category");
(_e = document
    .getElementById("filter-category-button")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", filterByCategory);
(_f = document
    .getElementById("clear-category-filter")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", () => {
    filterCategoryInput.value = "";
    renderCosts();
});
function filterByCategory() {
    const category = filterCategoryInput.value.trim().toLowerCase();
    if (!category) {
        renderCosts();
        return;
    }
    const filteredFixedCosts = fixedCosts.filter((cost) => { var _a; return (_a = cost.category) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(category); });
    const filteredFlexibleCosts = flexibleCosts.filter((cost) => { var _a; return (_a = cost.category) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(category); });
    renderFilteredCosts(filteredFixedCosts, filteredFlexibleCosts);
}
function renderFilteredCosts(filteredFixedCosts, filteredFlexibleCosts) {
    fixedCostList.innerHTML = "";
    flexibleCostList.innerHTML = "";
    filteredFixedCosts.forEach((cost) => {
        const li = document.createElement("li");
        li.className =
            "flex justify-between items-center p-4 border rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300";
        const costInfo = document.createElement("div");
        costInfo.className = "flex-1";
        costInfo.innerHTML = `<span class="font-semibold">${cost.name}</span>: R$ ${cost.value.toFixed(2)} ${cost.category
            ? `<span class="text-blue-500">(${cost.category})</span>`
            : ""}`;
        li.appendChild(costInfo);
        li.addEventListener("click", () => editCost(cost, "fixed"));
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remover";
        removeButton.className =
            "ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200";
        removeButton.addEventListener("click", (e) => {
            e.stopPropagation();
            removeCost(cost.id, "fixed");
        });
        li.appendChild(removeButton);
        fixedCostList.appendChild(li);
    });
    filteredFlexibleCosts.forEach((cost) => {
        const li = document.createElement("li");
        li.className =
            "flex justify-between items-center p-4 border rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300";
        const costInfo = document.createElement("div");
        costInfo.className = "flex-1";
        costInfo.innerHTML = `<span class="font-semibold">${cost.name}</span>: R$ ${cost.value.toFixed(2)} <span class="text-gray-500 text-sm">(Data: ${cost.date ? formatDate(cost.date) : "Data não disponível"})</span> ${cost.category
            ? `<span class="text-blue-500">(${cost.category})</span>`
            : ""}`;
        li.appendChild(costInfo);
        li.addEventListener("click", () => editCost(cost, "flexible"));
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remover";
        removeButton.className =
            "ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200";
        removeButton.addEventListener("click", (e) => {
            e.stopPropagation();
            removeCost(cost.id, "flexible");
        });
        li.appendChild(removeButton);
        flexibleCostList.appendChild(li);
    });
}
loadTheme();
// Carregar dados do localStorage ao iniciar
loadFromLocalStorage();
