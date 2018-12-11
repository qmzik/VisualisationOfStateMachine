/*onst a = {
  init: 'z1',
  ends: ['z3'],
  states: [
    { value: 'a', from: 'z1', to: 'z2' },
    { value: 'b', from: 'z1', to: 'z1' },
    { value: 'b', from: 'z2', to: 'z3' }
  ]
}/*

/*const nodes = [];

const generator = nodesGenerator();

nodes.push(generator.next().value)
nodes.push(generator.next().value)
nodes.push(generator.next().value)
nodes.push(generator.next().value)
nodes.push(generator.next().value)
nodes.push(generator.next().value)
nodes.push(generator.next().value)
nodes.push(generator.next().value)
nodes.push(generator.next().value)

nodes.forEach(node => {
  node.drawNode();
})

nodes[0].drawArrowToNode(nodes[5])
nodes[0].drawArrowToNode(nodes[7])
nodes[1].drawArrowToNode(nodes[2])

console.log(nodes)*/