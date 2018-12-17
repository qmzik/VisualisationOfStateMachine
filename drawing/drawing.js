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
		if (this.name === node.name) {
			//рисуем петлю
		}
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

		c.beginPath();
		c.moveTo(x, y);
		c.lineTo(toX, toY);
    c.arc(toX, toY, 2, 0, 2 * Math.PI);
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
		const node = new Node(x, y, `z${count}`)
    yield node;
  }
}

function drawStateMachine (stateMachine) {
	const nodes = [];

	const generator = nodesGenerator();

	stateMachine.states.forEach(item => {
		let from = nodes.find(state => state.name === item.from)
		if (!from) {
			from = generator.next().value;
		}

		let to = nodes.find(state => state.name === item.to);
		if (!to) {
			to = generator.next().value;
		}

		nodes.push(from);
		nodes.push(to);

		from.drawArrowToNode(to);
	})

	nodes.forEach(node => {
		node.drawNode();
	})

	return nodes;
}
