const uniqueStatesTable = document.getElementById('uniqueStates');
const dynamicTable = document.getElementById('dynamicTable');

let stateMachine = {};

function addRowInDynamicTable() {
  const row = dynamicTable.insertRow();

  for (let i = 0, j = dynamicTable.rows[0].cells.length; i < j; i++) {
    const input = document.createElement('input');

    input.setAttribute('type', 'text');
    input.setAttribute('name',
        `row${dynamicTable.rows.length - 1}_col${i}`);

    if (input.getAttribute('name').indexOf('col0') + 1 ||
        input.getAttribute('name').indexOf('col2') + 1) {
      input.setAttribute('pattern', '^[a-z][1-9]$');
    } else {
      input.setAttribute('pattern', '^[a-z]$');
    }

    if (dynamicTable.rows.length > 21) {
      alert('Максимальный размер таблицы - 20 строк');
      return;
    }

    const cell = row.insertCell();
    cell.appendChild(input);
  }
}

function deleteRowInDynamicTable( ) {
  if (dynamicTable.rows.length < 3) {
    alert('В таблице должна быть минимум одна строка');

    return;
  }

  dynamicTable.deleteRow(dynamicTable.rows.length - 1);
}

function drawUniqueStatesTable() {
  uniqueStatesTablePreparation();

  const uniqueStates = getUniqueStates();

  for (let i = 0; i < uniqueStates.length; i++) {
    const row = uniqueStatesTable.insertRow();

    for (let i = 0; i < uniqueStatesTable.rows[0].cells.length; i++) {
      row.insertCell();
    }
  }

  for (let i = 1, j = uniqueStatesTable.rows.length; i < j; i++) {
    const initState = document.createElement('input');
    initState.setAttribute('type', 'radio');
    initState.setAttribute('name', 'init');

    const endState = document.createElement('input');
    endState.setAttribute('type', 'checkbox');

    const stateValue = document.createTextNode(uniqueStates[i - 1]);

    uniqueStatesTable.rows[i].cells[0].appendChild(initState);
    uniqueStatesTable.rows[i].cells[1].appendChild(endState);
    uniqueStatesTable.rows[i].cells[2].appendChild(stateValue);
  }
}

function uniqueStatesTablePreparation() {

  if (checkValueInDynamicTable() === false) {
    return;
  }

  clearUniqueStateTable();
}

function getUniqueStates() {
  let states = [];

  for (let i = 1; i < dynamicTable.rows.length; i++) {
    const fromValue = dynamicTable.rows[i].cells[0].childNodes[0].value;
    const toValue = dynamicTable.rows[i].cells[2].childNodes[0].value;

    states.push(fromValue, toValue);
  }

  return [...new Set(states.filter(e => e))];
}

function checkValueInDynamicTable() {
  const regexp = /^[a-z][1-9]$/;
  const valueRegexp = /^[a-z]$/;

  for (let i = 1; i < dynamicTable.rows.length; i++) {
    const fromValue = dynamicTable.rows[i].cells[0].childNodes[0].value;
    const valueState = dynamicTable.rows[i].cells[1].childNodes[0].value;
    const toValue = dynamicTable.rows[i].cells[2].childNodes[0].value;

    if (valueRegexp.test(valueState) === false ||
      regexp.test(fromValue) === false ||
      regexp.test(toValue) === false) {
      alert(`Введены некорректные данные в строке №${i}`);

      return false;
    }
  }

  return true;
}

function clearUniqueStateTable() {
  if (uniqueStatesTable.rows.length > 1) {
    for (let i = 1, j = uniqueStatesTable.rows.length; i < j; i++) {
      uniqueStatesTable.deleteRow(uniqueStatesTable.rows.length - 1);
    }
  }
}

function createMachine() {
  let machine = {
    init: '',
    ends: [],
    states: []
  };

  for (let i = 1, j = uniqueStatesTable.rows.length; i < j; i++) {
    const value = uniqueStatesTable.rows[i].cells[2].textContent;
    const initChecked = uniqueStatesTable.rows[i].cells[0].childNodes[0].checked;
    const endsChecked = uniqueStatesTable.rows[i].cells[1].childNodes[0].checked;

    if (initChecked === true) {
      machine.init = value;
    }

    if (endsChecked === true) {
      machine.ends.push(value);
    }
  }

  for (let i = 1, j = dynamicTable.rows.length; i < j; i++) {
    const letter = dynamicTable.rows[i].children[1].childNodes[0].value;
    const fromValue = dynamicTable.rows[i].children[0].childNodes[0].value;
    const toValue = dynamicTable.rows[i].children[2].childNodes[0].value;

    if (letter !== '' || fromValue !== '' || toValue !== '') {
      machine.states.push({
        value: letter,
        from: fromValue,
        to: toValue
      })
    }
  }

  stateMachine = machine;

  return drawStateMachine(stateMachine);
}