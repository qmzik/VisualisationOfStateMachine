function addRow() {
  const table = document.getElementById('dynamicTable');
  const row = table.insertRow(-1);

  for (let i = 0, j = table.rows[0].cells.length; i < j; i++) {
    const input = document.createElement('input');
    const cell = row.insertCell(-1);

    cell.appendChild(input);
  }
}

function deleteRow() {
  const table = document.getElementById('dynamicTable');

  if (table.rows.length < 3) {
    alert('В таблице должна быть минимум одна строка');

    return;
  }

  table.deleteRow(table.rows.length - 1);
}