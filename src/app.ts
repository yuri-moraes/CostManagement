interface Cost {
  id: number;
  name: string;
  value: number;
  date?: string;
}

let salary = 0;
let fixedCosts: Cost[] = [];
let flexibleCosts: Cost[] = [];
let currentId = 1;

const salaryInput = document.getElementById("salary") as HTMLInputElement;
const fixedCostNameInput = document.getElementById(
  "fixed-cost-name"
) as HTMLInputElement;
const fixedCostValueInput = document.getElementById(
  "fixed-cost-value"
) as HTMLInputElement;
const formFixedCost = document.getElementById(
  "form-fixed-cost"
) as HTMLFormElement;
const flexibleCostNameInput = document.getElementById(
  "flexible-cost-name"
) as HTMLInputElement;
const flexibleCostValueInput = document.getElementById(
  "flexible-cost-value"
) as HTMLInputElement;
const flexibleCostDateInput = document.getElementById(
  "flexible-cost-date"
) as HTMLInputElement;
const formFlexibleCost = document.getElementById(
  "form-flexible-cost"
) as HTMLFormElement;
const totalExpensesElement = document.getElementById(
  "total-expenses"
) as HTMLElement;
const remainingElement = document.getElementById("remaining") as HTMLElement;
const fixedCostList = document.getElementById(
  "fixed-cost-list"
) as HTMLUListElement;
const flexibleCostList = document.getElementById(
  "flexible-cost-list"
) as HTMLUListElement;

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
    fixedCosts = data.fixedCosts || [];
    flexibleCosts = data.flexibleCosts || [];
    updateRemaining();
    renderCosts();
  }
}

function updateRemaining() {
  const totalFixed = fixedCosts.reduce((acc, cost) => acc + cost.value, 0);
  const totalFlexible = flexibleCosts.reduce(
    (acc, cost) => acc + cost.value,
    0
  );
  const totalExpenses = totalFixed + totalFlexible;
  const remaining = salary - totalExpenses;

  totalExpensesElement.textContent = `Custo total: R$ ${totalExpenses.toFixed(
    2
  )}`;
  remainingElement.textContent = `Sobra: R$ ${remaining.toFixed(2)}`;
  remainingElement.className =
    remaining >= 0 ? "text-green-500" : "text-red-500";
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Os meses começam em 0
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
    costInfo.innerHTML = `<span class="font-semibold">${
      cost.name
    }</span>: R$ ${cost.value.toFixed(2)}`;

    li.appendChild(costInfo);
    li.addEventListener("click", () => editCost(cost, "fixed"));

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remover";
    removeButton.className =
      "text-red-500 ml-4 px-3 py-1 border border-red-500 rounded-full hover:bg-red-500 hover:text-white transition-colors duration-200";
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
    costInfo.innerHTML = `<span class="font-semibold">${
      cost.name
    }</span>: R$ ${cost.value.toFixed(
      2
    )} <span class="text-gray-500 text-sm">(Data: ${
      cost.date ? formatDate(cost.date) : "Data não disponível"
    })</span>`;

    li.appendChild(costInfo);
    li.addEventListener("click", () => editCost(cost, "flexible"));

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remover";
    removeButton.className =
      "text-red-500 ml-4 px-3 py-1 border border-red-500 rounded-full hover:bg-red-500 hover:text-white transition-colors duration-200";
    removeButton.addEventListener("click", (e) => {
      e.stopPropagation();
      removeCost(cost.id, "flexible");
    });

    li.appendChild(removeButton);
    flexibleCostList.appendChild(li);
  });

  updateLocalStorage();
}

function editCost(cost: Cost, type: "fixed" | "flexible") {
  if (type === "fixed") {
    fixedCostNameInput.value = cost.name;
    fixedCostValueInput.value = cost.value.toString();
    removeCost(cost.id, "fixed");
  } else {
    flexibleCostNameInput.value = cost.name;
    flexibleCostValueInput.value = cost.value.toString();
    flexibleCostDateInput.value = cost.date || "";
    removeCost(cost.id, "flexible");
  }
}

function removeCost(id: number, type: "fixed" | "flexible") {
  if (type === "fixed") {
    fixedCosts = fixedCosts.filter((cost) => cost.id !== id);
  } else {
    flexibleCosts = flexibleCosts.filter((cost) => cost.id !== id);
  }
  renderCosts();
  updateRemaining();
}

formFixedCost.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!salary) {
    salary = parseFloat(salaryInput.value);
  }
  const name = fixedCostNameInput.value.trim();
  const value = parseFloat(fixedCostValueInput.value);
  if (name && !isNaN(value)) {
    fixedCosts.push({ id: currentId++, name, value });
    fixedCostNameInput.value = "";
    fixedCostValueInput.value = "";
    renderCosts();
    updateRemaining();
  }
});

formFlexibleCost.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = flexibleCostNameInput.value.trim();
  const value = parseFloat(flexibleCostValueInput.value);
  const date = flexibleCostDateInput.value;
  if (name && !isNaN(value) && date) {
    flexibleCosts.push({ id: currentId++, name, value, date });
    flexibleCostNameInput.value = "";
    flexibleCostValueInput.value = "";
    flexibleCostDateInput.value = "";
    renderCosts();
    updateRemaining();
  }
});

function exportData() {
  const data = {
    salary,
    fixedCosts,
    flexibleCosts,
  };
  const dataStr = JSON.stringify(data);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "finance_data.json";
  a.click();
  URL.revokeObjectURL(url);
}

function importData(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const result = e.target?.result;
      if (result) {
        const data = JSON.parse(result as string);
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

document.getElementById("export-data")?.addEventListener("click", exportData);
document.getElementById("import-data")?.addEventListener("change", importData);

// Carregar dados do localStorage ao iniciar
loadFromLocalStorage();
