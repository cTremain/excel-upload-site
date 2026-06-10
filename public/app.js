const fileInput = document.querySelector("#fileInput");
const downloadButton = document.querySelector("#downloadButton");
const gridContainer = document.querySelector("#gridContainer");
const message = document.querySelector("#message");
const workbookStatus = document.querySelector("#workbookStatus");
const selectedAddress = document.querySelector("#selectedAddress");
const formulaInput = document.querySelector("#formulaInput");

let currentFileId = null;
let currentWorksheet = null;
let selectedInput = null;
const edits = new Map();

fileInput.addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  clearMessage();
  setBusy(true, "Uploading workbook...");

  try {
    const body = new FormData();
    body.append("workbook", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Upload failed.");
    }

    currentFileId = result.fileId;
    currentWorksheet = result.worksheet;
    edits.clear();
    renderWorksheet(result.worksheet);
    workbookStatus.textContent = `${result.filename} - ${result.worksheet.name}`;
    downloadButton.disabled = false;
    formulaInput.disabled = true;
    formulaInput.value = "";
    selectedAddress.textContent = "A1";
  } catch (error) {
    showMessage(error.message);
  } finally {
    setBusy(false);
    fileInput.value = "";
  }
});

downloadButton.addEventListener("click", async () => {
  if (!currentFileId || !currentWorksheet) return;

  clearMessage();
  setBusy(true, "Preparing download...");

  try {
    const cells = Array.from(edits.values());
    const response = await fetch("/api/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileId: currentFileId, cells })
    });

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.error || "Download failed.");
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "edited-workbook.xlsx";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  } catch (error) {
    showMessage(error.message);
  } finally {
    setBusy(false);
  }
});

formulaInput.addEventListener("input", () => {
  if (!selectedInput) return;
  selectedInput.value = formulaInput.value;
  recordEdit(selectedInput);
});

function renderWorksheet(worksheet) {
  gridContainer.innerHTML = "";

  const table = document.createElement("table");
  table.className = "spreadsheet";

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const corner = document.createElement("th");
  corner.className = "corner";
  headerRow.appendChild(corner);

  worksheet.columns.forEach((column) => {
    const th = document.createElement("th");
    th.className = "column-header";
    th.textContent = column.letter;
    th.style.width = `${Math.max(column.width, 84)}px`;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  worksheet.rows.forEach((row) => {
    const tr = document.createElement("tr");
    tr.style.height = `${Math.max(row.height, 26)}px`;

    const rowHeader = document.createElement("th");
    rowHeader.className = "row-header";
    rowHeader.textContent = row.index;
    tr.appendChild(rowHeader);

    row.cells.forEach((cell) => {
      if (cell.hiddenByMerge) {
        return;
      }

      const td = document.createElement("td");
      td.className = "cell";
      td.dataset.row = cell.row;
      td.dataset.col = cell.col;
      if (cell.rowSpan > 1) td.rowSpan = cell.rowSpan;
      if (cell.colSpan > 1) td.colSpan = cell.colSpan;
      Object.assign(td.style, cell.style || {});

      const input = document.createElement("input");
      input.className = "cell-input";
      input.value = cell.value || "";
      input.dataset.row = cell.row;
      input.dataset.col = cell.col;
      input.dataset.address = cell.address;
      Object.assign(input.style, cell.style || {});
      input.addEventListener("focus", () => selectCell(input));
      input.addEventListener("input", () => {
        formulaInput.value = input.value;
        recordEdit(input);
      });

      td.appendChild(input);
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  gridContainer.appendChild(table);
}

function selectCell(input) {
  if (selectedInput) {
    selectedInput.closest("td").classList.remove("is-selected");
  }
  selectedInput = input;
  selectedInput.closest("td").classList.add("is-selected");
  selectedAddress.textContent = input.dataset.address;
  formulaInput.disabled = false;
  formulaInput.value = input.value;
}

function recordEdit(input) {
  const key = `${input.dataset.row}:${input.dataset.col}`;
  edits.set(key, {
    row: Number(input.dataset.row),
    col: Number(input.dataset.col),
    value: input.value
  });
}

function setBusy(isBusy, text) {
  fileInput.disabled = isBusy;
  downloadButton.disabled = isBusy || !currentFileId;
  if (text) {
    workbookStatus.textContent = text;
  }
}

function showMessage(text) {
  message.textContent = text;
  message.hidden = false;
}

function clearMessage() {
  message.textContent = "";
  message.hidden = true;
}
