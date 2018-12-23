class StateMachine {
  constructor(states) {
    checkStates(states.states);

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
    const found = this.states
        .find(item => item.value === value && item.from === this.current);

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
      if (states[i].from === states[j].from &&
          states[i].value === states[j].value) {
        throw new Error('This state machine cannot contain contain ' +
            'the same value that goes to different states');
      }
    }
  }
}
