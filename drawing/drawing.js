let canvas = document.getElementById('canvas');
let c = canvas.getContext('2d');
c.lineWidth = 2;
c.strokeStyle = 'grey';
const CIRCLE_RADIUS = 20;

class Node {
	constructor (x, y, name) {
		this.name = name;
		this.x = x;
		this.y = y;
    this.paths = [];
	}

  addPath(value, node) {
    this.paths.push({ value, node })
  }

	drawNode () {
		c.beginPath();
		c.arc(this.x, this.y, CIRCLE_RADIUS, 0, 2 * Math.PI);
		c.font = '20px serif';
		c.fillText(this.name, this.x - 8, this.y + 5)
		c.stroke();
	}

	setGreen () {
		c.strokeStyle = 'green';
	}

	setRead () {
		c.strokeStyle = 'red';
	}

	setDefault () {
		c.strokeStyle = 'black';
	}

	drawArrowToNode (node, value) {
		let { x, y } = this;
		let toX = node.x;
		let toY = node.y
		let margin = CIRCLE_RADIUS;

		if (x !== toX && y !== toY) {
			margin = margin / 1.5;
		}

		let toMargin = margin + 3.5

		if (toX > x) {
			x += margin;
			toX -= toMargin;
		} else if (toX < x) {
			x -= margin;
			toX += toMargin;
		}

		if (toY > y) {
			y += margin;
			toY -= toMargin;
		} else if (toY < y) {
			y -= margin;
			toY += toMargin;
		}

		if (this.name === node.name) {
			c.save();
			c.beginPath();
			c.translate(x, y - CIRCLE_RADIUS * 2);
			c.scale(15 / 20, 1);
			c.arc(0, 0, 20, 0, Math.PI * 2, true);
			c.restore();
			c.closePath();
			toY -= CIRCLE_RADIUS;
		} else {
			c.beginPath();
			c.moveTo(x, y);
			c.lineTo(toX, toY);
		}
		c.stroke();

		c.beginPath()
		c.arc(toX, toY, 2, 0, 2 * Math.PI);
		c.fillStyle = c.strokeStyle;
		c.fill();
		c.stroke();

		this.addPath(value, node);
	}
}

function* nodesGenerator() {
  const STEP = 100;
  let x = 0;
  let y = STEP * 2;
  let count = 0;
  while (true) {
		if (y === STEP) {
			y += STEP;
		} else {
			y -= STEP;
			x += STEP;
		}
		count++;
		const node = new Node(x, y, ``)
    yield node;
  }
}

function drawStateMachine (stateMachine) {
	c.clearRect(0, 0, canvas.width, canvas.height);

	try {
		checkStates(stateMachine.states);
	}
	catch (e) {
		alert('Детерминированный автомат не должен иметь несколько переходов по одному значению из одного и того же узла');
		return;
	}
	const nodes = [];

	const generator = nodesGenerator();

	stateMachine.states.forEach(item => {
		let from = nodes.find(state => state.name === item.from)
		if (!from) {
			from = generator.next().value;
			from.name = item.from;
      nodes.push(from);
		}

		let to = nodes.find(state => state.name === item.to);
		if (!to) {
			to = generator.next().value;
			to.name = item.to;
      nodes.push(to);
		}

		from.drawArrowToNode(to);
	})

	nodes.forEach(node => {
		node.drawNode();
	})

	return nodes;
}
