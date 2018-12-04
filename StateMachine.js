class StateMachine {
  constructor(states) {
    checkStates(states.states)
    this.current = states.init;
    this.ends = states.ends;
    this.states = states.states;
  }
  get currentState () {
    return this.current;
  }

  get canIEnd() {
    return this.ends.includes(this.current)
  }

  next(value) {
    const found = this.states.find(item => item.value === value && item.from === this.current);
    if (!found) {
      return false;
    }
    this.current = found.to;

    return true;
  }
 }

function checkStates(states) {
  for (let i = 0; i < states.length; i++) {
    for (let j = i + 1; j < states.length; j++) {
      if (states[i].from === states[j].from && states[i].value === states[j].value) {
        throw new Error('This state machine cannot contain contain the same value that goes to different states');
      }
    }
  }
}

const a = {
  init: 'z1',
  ends: ['z3'],
  states: [
    { value: 'a', from: 'z1', to: 'z2' },
    { value: 'b', from: 'z1', to: 'z1' },
    { value: 'b', from: 'z2', to: 'z3' }
  ]
}

const stateMachine = new StateMachine(a);
stateMachine.next('a') // true
console.log(stateMachine.currentState) // z2
console.log(stateMachine.canIEnd) // false
console.log(stateMachine.next('b')) // true
console.log(stateMachine.currentState) // z3
console.log(stateMachine.canIEnd) // true