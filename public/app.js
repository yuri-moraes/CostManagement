"use strict";
var _a, _b, _c, _d, _e, _f;
var salary = 0;
var fixedCosts = [];
var flexibleCosts = [];
var currentId = 1;
var salaryInput = document.getElementById("salary");
salaryInput.addEventListener("input", function () {
    salary = parseFloat(salaryInput.value) || 0;
    updateRemaining();
});
var fixedCostNameInput = document.getElementById("fixed-cost-name");
var fixedCostValueInput = document.getElementById("fixed-cost-value");
var formFixedCost = document.getElementById("form-fixed-cost");
var flexibleCostNameInput = document.getElementById("flexible-cost-name");
var flexibleCostValueInput = document.getElementById("flexible-cost-value");
var flexibleCostDateInput = document.getElementById("flexible-cost-date");
var formFlexibleCost = document.getElementById("form-flexible-cost");
var totalExpensesElement = document.getElementById("total-expenses");
var remainingElement = document.getElementById("remaining");
var fixedCostList = document.getElementById("fixed-cost-list");
var flexibleCostList = document.getElementById("flexible-cost-list");
var fixedCostCategoryInput = document.getElementById("fixed-cost-category");
var flexibleCostCategoryInput = document.getElementById("flexible-cost-category");
var filterStartDateInput = document.getElementById("filter-start-date");
var filterEndDateInput = document.getElementById("filter-end-date");
var toggleThemeButton = document.getElementById("toggle-theme");
var themeIcon = document.getElementById("theme-icon");
function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        themeIcon.innerHTML = "\n      <!-- Novo \u00EDcone de Sol -->\n      <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-6 w-6\" fill=\"none\" stroke=\"currentColor\"\n           stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" viewBox=\"0 0 24 24\">\n        <circle cx=\"12\" cy=\"12\" r=\"5\"/>\n        <line x1=\"12\" y1=\"1\" x2=\"12\" y2=\"3\"/>\n        <line x1=\"12\" y1=\"21\" x2=\"12\" y2=\"23\"/>\n        <line x1=\"4.22\" y1=\"4.22\" x2=\"5.64\" y2=\"5.64\"/>\n        <line x1=\"18.36\" y1=\"18.36\" x2=\"19.78\" y2=\"19.78\"/>\n        <line x1=\"1\" y1=\"12\" x2=\"3\" y2=\"12\"/>\n        <line x1=\"21\" y1=\"12\" x2=\"23\" y2=\"12\"/>\n        <line x1=\"4.22\" y1=\"19.78\" x2=\"5.64\" y2=\"18.36\"/>\n        <line x1=\"18.36\" y1=\"5.64\" x2=\"19.78\" y2=\"4.22\"/>\n      </svg>\n    ";
        localStorage.setItem("theme", "dark");
    }
    else {
        themeIcon.innerHTML = "\n      <!-- \u00CDcone de Lua para o modo claro -->\n      <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-6 w-6\" fill=\"none\"\n           viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"\n              d=\"M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z\" />\n      </svg>\n    ";
        localStorage.setItem("theme", "light");
    }
}
toggleThemeButton.addEventListener("click", toggleTheme);
// Carregar tema ao iniciar
function loadTheme() {
    var theme = localStorage.getItem("theme");
    if (theme === "dark") {
        document.body.classList.add("dark-mode");
        themeIcon.innerHTML = "\n      <!-- Novo \u00EDcone de Sol -->\n      <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-6 w-6\" fill=\"none\" stroke=\"currentColor\"\n           stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" viewBox=\"0 0 24 24\">\n        <circle cx=\"12\" cy=\"12\" r=\"5\"/>\n        <line x1=\"12\" y1=\"1\" x2=\"12\" y2=\"3\"/>\n        <line x1=\"12\" y1=\"21\" x2=\"12\" y2=\"23\"/>\n        <line x1=\"4.22\" y1=\"4.22\" x2=\"5.64\" y2=\"5.64\"/>\n        <line x1=\"18.36\" y1=\"18.36\" x2=\"19.78\" y2=\"19.78\"/>\n        <line x1=\"1\" y1=\"12\" x2=\"3\" y2=\"12\"/>\n        <line x1=\"21\" y1=\"12\" x2=\"23\" y2=\"12\"/>\n        <line x1=\"4.22\" y1=\"19.78\" x2=\"5.64\" y2=\"18.36\"/>\n        <line x1=\"18.36\" y1=\"5.64\" x2=\"19.78\" y2=\"4.22\"/>\n      </svg>\n    ";
    }
    else {
        themeIcon.innerHTML = "\n      <!-- \u00CDcone de Lua para o modo claro -->\n      <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-6 w-6\" fill=\"none\"\n           viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"\n              d=\"M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z\" />\n      </svg>\n    ";
    }
}
function updateLocalStorage() {
    var data = {
        salary: salary,
        fixedCosts: fixedCosts,
        flexibleCosts: flexibleCosts,
    };
    localStorage.setItem("financeData", JSON.stringify(data));
}
function loadFromLocalStorage() {
    var savedData = localStorage.getItem("financeData");
    if (savedData) {
        var data = JSON.parse(savedData);
        salary = data.salary || 0;
        salaryInput.value = salary.toString();
        fixedCosts = data.fixedCosts || [];
        flexibleCosts = data.flexibleCosts || [];
        updateRemaining();
        renderCosts();
    }
}
function updateRemaining() {
    var totalFixed = fixedCosts.reduce(function (acc, cost) { return acc + cost.value; }, 0);
    var totalFlexible = flexibleCosts.reduce(function (acc, cost) { return acc + cost.value; }, 0);
    var totalExpenses = totalFixed + totalFlexible;
    var remaining = salary - totalExpenses;
    totalExpensesElement.textContent = "Custo total: R$ ".concat(totalExpenses.toFixed(2));
    remainingElement.textContent = "Sobra: R$ ".concat(remaining.toFixed(2));
    remainingElement.className =
        remaining >= 0 ? "text-green-500" : "text-red-500";
}
function formatDate(dateString) {
    var date = new Date(dateString);
    var day = String(date.getDate()).padStart(2, "0");
    var month = String(date.getMonth() + 1).padStart(2, "0");
    var year = date.getFullYear();
    return "".concat(day, "/").concat(month, "/").concat(year);
}
function renderCosts() {
    fixedCostList.innerHTML = "";
    flexibleCostList.innerHTML = "";
    fixedCosts.forEach(function (cost) {
        var li = document.createElement("li");
        li.className =
            "flex justify-between items-center p-4 border rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300";
        var costInfo = document.createElement("div");
        costInfo.className = "flex-1";
        costInfo.innerHTML = "<span class=\"font-semibold\">".concat(cost.name, "</span>: R$ ").concat(cost.value.toFixed(2), " ").concat(cost.category
            ? "<span class=\"text-blue-500\">(".concat(cost.category, ")</span>")
            : "");
        li.appendChild(costInfo);
        li.addEventListener("click", function () { return editCost(cost, "fixed"); });
        var removeButton = document.createElement("button");
        removeButton.innerHTML = "Remover";
        removeButton.className =
            "ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200";
        removeButton.addEventListener("click", function (e) {
            e.stopPropagation();
            removeCost(cost.id, "fixed");
        });
        li.appendChild(removeButton);
        fixedCostList.appendChild(li);
    });
    flexibleCosts.forEach(function (cost) {
        var li = document.createElement("li");
        li.className =
            "flex justify-between items-center p-4 border rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300";
        var costInfo = document.createElement("div");
        costInfo.className = "flex-1";
        costInfo.innerHTML = "<span class=\"font-semibold\">".concat(cost.name, "</span>: R$ ").concat(cost.value.toFixed(2), " <span class=\"text-gray-500 text-sm\">(Data: ").concat(cost.date ? formatDate(cost.date) : "Data não disponível", ")</span> ").concat(cost.category
            ? "<span class=\"text-blue-500\">(".concat(cost.category, ")</span>")
            : "");
        li.appendChild(costInfo);
        li.addEventListener("click", function () { return editCost(cost, "flexible"); });
        var removeButton = document.createElement("button");
        removeButton.textContent = "Remover";
        removeButton.className =
            "ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200";
        removeButton.addEventListener("click", function (e) {
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
        fixedCosts = fixedCosts.filter(function (cost) { return cost.id !== id; });
    }
    else {
        flexibleCosts = flexibleCosts.filter(function (cost) { return cost.id !== id; });
    }
    renderCosts();
    updateRemaining();
}
formFixedCost.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = fixedCostNameInput.value.trim();
    var value = parseFloat(fixedCostValueInput.value);
    var category = fixedCostCategoryInput.value.trim();
    if (name && !isNaN(value)) {
        fixedCosts.push({ id: currentId++, name: name, value: value, category: category });
        fixedCostNameInput.value = "";
        fixedCostValueInput.value = "";
        fixedCostCategoryInput.value = "";
        renderCosts();
        updateRemaining();
    }
});
formFlexibleCost.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = flexibleCostNameInput.value.trim();
    var value = parseFloat(flexibleCostValueInput.value);
    var date = flexibleCostDateInput.value;
    var category = flexibleCostCategoryInput.value.trim();
    if (name && !isNaN(value) && date) {
        flexibleCosts.push({ id: currentId++, name: name, value: value, date: date, category: category });
        flexibleCostNameInput.value = "";
        flexibleCostValueInput.value = "";
        flexibleCostDateInput.value = "";
        flexibleCostCategoryInput.value = "";
        renderCosts();
        updateRemaining();
    }
});
function exportData() {
    var data = { salary: salary, fixedCosts: fixedCosts, flexibleCosts: flexibleCosts };
    var dataStr = JSON.stringify(data);
    var blob = new Blob([dataStr], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "finance_data.json";
    a.click();
    URL.revokeObjectURL(url);
}
function importData(event) {
    var _a;
    var input = event.target;
    var file = (_a = input.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            var result = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            if (result) {
                var data = JSON.parse(result);
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
(_d = document.getElementById("clear-filter")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", function () {
    filterStartDateInput.value = "";
    filterEndDateInput.value = "";
    renderCosts();
});
function filterFlexibleCosts() {
    var startDate = filterStartDateInput.value
        ? new Date(filterStartDateInput.value)
        : null;
    var endDate = filterEndDateInput.value
        ? new Date(filterEndDateInput.value)
        : null;
    var filteredCosts = flexibleCosts.filter(function (cost) {
        var costDate = new Date(cost.date);
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
    filteredCosts.forEach(function (cost) {
        var li = document.createElement("li");
        li.className =
            "flex justify-between items-center p-4 border rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300";
        var costInfo = document.createElement("div");
        costInfo.className = "flex-1";
        costInfo.innerHTML = "<span class=\"font-semibold\">".concat(cost.name, "</span>: R$ ").concat(cost.value.toFixed(2), " <span class=\"text-gray-500 text-sm\">(Data: ").concat(cost.date ? formatDate(cost.date) : "Data não disponível", ")</span> ").concat(cost.category
            ? "<span class=\"text-blue-500\">(".concat(cost.category, ")</span>")
            : "");
        li.appendChild(costInfo);
        var removeButton = document.createElement("button");
        removeButton.textContent = "Remover";
        removeButton.className =
            "ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200";
        removeButton.addEventListener("click", function (e) {
            e.stopPropagation();
            removeCost(cost.id, "flexible");
        });
        li.appendChild(removeButton);
        flexibleCostList.appendChild(li);
    });
}
var filterCategoryInput = document.getElementById("filter-category");
(_e = document
    .getElementById("filter-category-button")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", filterByCategory);
(_f = document
    .getElementById("clear-category-filter")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", function () {
    filterCategoryInput.value = "";
    renderCosts();
});
function filterByCategory() {
    var category = filterCategoryInput.value.trim().toLowerCase();
    if (!category) {
        renderCosts();
        return;
    }
    var filteredFixedCosts = fixedCosts.filter(function (cost) { var _a; return (_a = cost.category) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(category); });
    var filteredFlexibleCosts = flexibleCosts.filter(function (cost) { var _a; return (_a = cost.category) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(category); });
    renderFilteredCosts(filteredFixedCosts, filteredFlexibleCosts);
}
function renderFilteredCosts(filteredFixedCosts, filteredFlexibleCosts) {
    fixedCostList.innerHTML = "";
    flexibleCostList.innerHTML = "";
    filteredFixedCosts.forEach(function (cost) {
        var li = document.createElement("li");
        li.className =
            "flex justify-between items-center p-4 border rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300";
        var costInfo = document.createElement("div");
        costInfo.className = "flex-1";
        costInfo.innerHTML = "<span class=\"font-semibold\">".concat(cost.name, "</span>: R$ ").concat(cost.value.toFixed(2), " ").concat(cost.category
            ? "<span class=\"text-blue-500\">(".concat(cost.category, ")</span>")
            : "");
        li.appendChild(costInfo);
        li.addEventListener("click", function () { return editCost(cost, "fixed"); });
        var removeButton = document.createElement("button");
        removeButton.textContent = "Remover";
        removeButton.className =
            "ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200";
        removeButton.addEventListener("click", function (e) {
            e.stopPropagation();
            removeCost(cost.id, "fixed");
        });
        li.appendChild(removeButton);
        fixedCostList.appendChild(li);
    });
    filteredFlexibleCosts.forEach(function (cost) {
        var li = document.createElement("li");
        li.className =
            "flex justify-between items-center p-4 border rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300";
        var costInfo = document.createElement("div");
        costInfo.className = "flex-1";
        costInfo.innerHTML = "<span class=\"font-semibold\">".concat(cost.name, "</span>: R$ ").concat(cost.value.toFixed(2), " <span class=\"text-gray-500 text-sm\">(Data: ").concat(cost.date ? formatDate(cost.date) : "Data não disponível", ")</span> ").concat(cost.category
            ? "<span class=\"text-blue-500\">(".concat(cost.category, ")</span>")
            : "");
        li.appendChild(costInfo);
        li.addEventListener("click", function () { return editCost(cost, "flexible"); });
        var removeButton = document.createElement("button");
        removeButton.textContent = "Remover";
        removeButton.className =
            "ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200";
        removeButton.addEventListener("click", function (e) {
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
