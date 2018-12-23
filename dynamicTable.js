let stateMachine = {};

function addRow() {
  const table = document.getElementById('dynamicTable');
  const row = table.insertRow();

  for (let i = 0, j = table.rows[0].cells.length; i < j; i++) {
    const input = document.createElement('input');

    input.setAttribute('type', 'text');
    input.setAttribute('name',
        `row${table.rows.length - 1}_col${i}`);

    if (input.getAttribute('name').indexOf('col0') + 1 ||
        input.getAttribute('name').indexOf('col2') + 1) {
      input.setAttribute('pattern', '[a-z][1}[1-9]{1}');
    } else {
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

function deleteRow( ) {
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
    states.push(table.rows[i].cells[0].childNodes[0].value,
        table.rows[i].cells[2].childNodes[0].value);
  }

  return [...new Set(states.filter(e => e))];
}


function drawTable() {
  const table = document.getElementById('uniqueStates');
  const dynamicTable = document.getElementById('dynamicTable');
  const regexp = /[a-z][1-9]/;
  const valueRegexp = /^[a-z]$/;

  for (let i = 1; i < dynamicTable.rows.length; i++) {
    if (valueRegexp.test(dynamicTable.rows[i].cells[1].childNodes[0].value) === false ||
        regexp.test(dynamicTable.rows[i].cells[0].childNodes[0].value) === false ||
        regexp.test(dynamicTable.rows[i].cells[2].childNodes[0].value) === false) {
      alert(`Введены некорректные данные в строке №${i}`);
      return;
    }
  }

  console.log(dynamicTable.rows[1].cells[1].childNodes[0].value);

  const uniqueStates = getUniqueStates();

  if (table.rows.length > 1) {
    for (let i = 1, j = table.rows.length; i < j; i++) {
      table.deleteRow(table.rows.length - 1);
    }
  }

  for (let i = 0; i < uniqueStates.length; i++) {
    const row = table.insertRow();

    for (let i = 0; i < table.rows[0].cells.length; i++) {
      row.insertCell();
    }
  }
  
  for (let i = 1, j = table.rows.length; i < j; i++) {
    const initState = document.createElement('input');
    initState.setAttribute('type', 'radio');
    initState.setAttribute('name', 'init');

    const endState = document.createElement('input');
    endState.setAttribute('type', 'checkbox');

    const stateValue = document.createTextNode(uniqueStates[i - 1]);

    table.rows[i].cells[0].appendChild(initState);
    table.rows[i].cells[1].appendChild(endState);
    table.rows[i].cells[2].appendChild(stateValue);
  }
}

function createMachine() {
  const tableState = document.getElementById('uniqueStates');
  const tableMachine = document.getElementById('dynamicTable');

  let machine = {
    init: '',
    ends: [],
    states: []
  };

  const word = document.getElementById('word').children[0]
    .children[0].value;
  console.log(word);

  for (let i = 1, j = tableState.rows.length; i < j; i++) {
    const value = tableState.rows[i].cells[2].textContent;

    if (tableState.rows[i].cells[0].childNodes[0].checked === true) {
      machine.init = value;
    }

    if (tableState.rows[i].cells[1].childNodes[0].checked === true) {
      machine.ends.push(value);
    }
  }

  for (let i = 1, j = tableMachine.rows.length; i < j; i++) {
    const letter = tableMachine.rows[i].children[1].childNodes[0].value;
    const fromValue = tableMachine.rows[i].children[0].childNodes[0].value;
    const toValue = tableMachine.rows[i].children[2].childNodes[0].value;

    if (letter !== '' || fromValue !== '' || toValue !== '') {
      machine.states.push({
        value: letter,
        from: fromValue,
        to: toValue
      })
    }
  }

  stateMachine = machine;

  console.log(word, stateMachine);
  return drawStateMachine(stateMachine);
}