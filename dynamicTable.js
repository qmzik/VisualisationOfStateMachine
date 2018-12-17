function addRow() {
  const table = document.getElementById('dynamicTable');
  const row = table.insertRow();

  for (let i = 0, j = table.rows[0].cells.length; i < j; i++) {
    const input = document.createElement('input');

    input.setAttribute('type', 'text');
    input.setAttribute('name',
        `row${table.rows.length - 1}_col${i}`);

    if (input.getAttribute('name').indexOf('col0') + 1) {
      input.setAttribute('pattern', '[a-z]{1}[1-9]{1}');
    }

    if (input.getAttribute('name').indexOf('col2') + 1) {
      input.setAttribute('pattern', '[a-z]{1}[1-9]{1}');
    }

    if (input.getAttribute('name').indexOf('col1') + 1) {
      input.setAttribute('pattern', '[a-z]{1}');
    }

    if (table.rows.length > 21) {
      alert('Максимальный размер таблицы - 20 строк');
      return;
    }

    const cell = row.insertCell();
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

function getUniqueStates() {
  const table = document.getElementById('dynamicTable');
  let states = [];

  for (let i = 1; i < table.rows.length; i++) {
    states.push(table.rows[i].cells[0].childNodes[0].value);
  }

  return [...new Set(states.filter(e => e))];
}

function drawTable() {
  const table = document.getElementById('uniqueStates');
  const uniqueStates = getUniqueStates();
  console.log(uniqueStates);
}