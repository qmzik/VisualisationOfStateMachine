let canvas = document.getElementById('canvas');
let c = canvas.getContext('2d');

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

	setDefault () {
		c.strokeStyle = 'black'
	}

	drawArrowToNode (node, value) {
		let { x, y } = this;
		let toX = node.x;
		let toY = node.y
		let margin = CIRCLE_RADIUS;

		if (x !== toX && y !== toY) {
			margin = margin / 1.5;
		}

		if (toX > x) {
			x += margin;
			toX -= margin;
		} else if (toX < x) {
			x -= margin;
			toX += margin;
		}

		if (toY > y) {
			y += margin;
			toY -= margin;
		} else if (toY < y) {
			y -= margin;
			toY += margin;
		}

		c.beginPath();
		c.moveTo(x, y);
		c.lineTo(toX, toY);
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