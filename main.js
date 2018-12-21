const TIME_INTERVAL = 1000;

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function animateTransition (from, to) {
	from.setGreen();
	from.drawNode();

	await sleep(TIME_INTERVAL);

	from.drawArrowToNode(to);
	from.setDefault();
	from.drawNode();

	await sleep(TIME_INTERVAL);

	from.drawArrowToNode(to);
	to.setGreen();
	to.drawNode();
}

async function lineProccess(inputString, states) {
	const stateMachine = new StateMachine(states);
	const nodes = drawStateMachine(states);
	const findByName = name => nodes.find(node => node.name === name);

	for (let i = 0; i < inputString.length; i++) {
		const char = inputString[i];
		const from = findByName(stateMachine.currentState);

		if (stateMachine.next(char)) {
			const to = findByName(stateMachine.currentState);
			await animateTransition(from, to);
		} else {
		  await sleep(TIME_INTERVAL);

      alert('Автомат закончил выполнение с ошибкой');
      return;
	}
	}
	await sleep(TIME_INTERVAL);
	if (stateMachine.canIEnd) {
		alert(`Автомат закончил выполнение успешно`);
	} else {
		alert(`Автомат закончил выполнение с ошибкой\n${stateMachine.current} не является конечным состоянием`);
	}
}
