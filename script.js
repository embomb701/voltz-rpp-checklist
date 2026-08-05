const form = document.getElementById("checklistForm");
const saveBtn = document.getElementById("saveBtn");
const printBtn = document.getElementById("printBtn");
const exportBtn = document.getElementById("exportBtn");
const resetBtn = document.getElementById("resetBtn");

const STORAGE_KEY = "voltz-rpp-startup-checklist-form";

function getFormData() {
  const data = {};
  const elements = form.querySelectorAll("input, select, textarea");

  elements.forEach((el) => {
    if (!el.name) return;
    if (el.type === "checkbox") {
      data[el.name] = el.checked;
    } else {
      data[el.name] = el.value;
    }
  });

  return data;
}

function setFormData(data) {
  if (!data) return;
  const elements = form.querySelectorAll("input, select, textarea");

  elements.forEach((el) => {
    if (!el.name || !(el.name in data)) return;
    if (el.type === "checkbox") {
      el.checked = !!data[el.name];
    } else {
      el.value = data[el.name] ?? "";
    }
  });
}

function saveToLocal() {
  const data = getFormData();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadFromLocal() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    const data = JSON.parse(raw);
    setFormData(data);
  } catch (err) {
    console.error("Could not load saved form data:", err);
  }
}

function exportData() {
  const data = getFormData();
  const serial = data.serialNumber || "no-serial";
  const date = data.date || new Date().toISOString().slice(0, 10);
  const fileName = `Voltz-RPP-Startup-${serial}-${date}.json`;

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json"
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// Improve print filename by setting document title temporarily
printBtn.addEventListener("click", () => {
  saveToLocal();

  const data = getFormData();
  const serial = data.serialNumber || "no-serial";
  const date = data.date || new Date().toISOString().slice(0, 10);
  const originalTitle = document.title;

  document.title = `Voltz-RPP-Startup-${serial}-${date}`;

  setTimeout(() => {
    window.print();
    document.title = originalTitle; // restore after print dialog
  }, 50);
});

form.addEventListener("input", saveToLocal);
form.addEventListener("change", saveToLocal);

saveBtn.addEventListener("click", () => {
  saveToLocal();
  alert("Form saved locally in this browser.");
});

exportBtn.addEventListener("click", exportData);

resetBtn.addEventListener("click", () => {
  setTimeout(() => {
    localStorage.removeItem(STORAGE_KEY);
  }, 0);
});

loadFromLocal();
