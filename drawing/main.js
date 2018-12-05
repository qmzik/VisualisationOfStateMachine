let canvas = document.getElementById('canvas');
let c = canvas.getContext('2d');

const CIRCLE_RADIUS = 20;

class Node {
	constructor (x, y, name) {
		this.name = name;
		this.x = x;
		this.y = y;
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

	drawArrowToNode (node) {
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
	}
}

const node = new Node(50, 50, 'z1')
node.drawNode()

const node1 = new Node(50, 150, 'z2')
node1.drawNode();

node.drawArrowToNode(node1);

const node2 = new Node(150, 50, 'z3');
node2.drawNode();
node1.drawArrowToNode(node2);
node2.setGreen();
node2.drawNode();