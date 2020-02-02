const { Graph } = require('./graph/Graph.js');

const graph = new Graph();

graph.addNode('A', 'B', 1);
graph.addNode('A', 'C', 4);
graph.addNode('A', 'D', 10);
graph.addNode('B', 'E', 3);
graph.addNode('C', 'D', 4);
graph.addNode('C', 'F', 2);
graph.addNode('D', 'E', 1);
graph.addNode('E', 'B', 3);
graph.addNode('E', 'A', 2);
graph.addNode('F', 'D', 1);



console.log('The delivery cost for route A-B-E', graph.directRoute('A-B-E'));
console.log('The delivery cost for route A-D', graph.directRoute('A-D'))
console.log('The delivery cost for route E-A-C-F', graph.directRoute('E-A-C-F'))
console.log('The delivery cost for route A-B-F', graph.directRoute('A-D-F'));


console.log('The number of possible delivery route from E to D with a maximum of 4 stop without using the same route twice in a delivery route', graph.allPossibleRoutes('E', 'D', {
  allowSameRoute: false,
  maxStop: 4
}).length);

console.log('The number of possible delivery route from E to E without using the same route twice in a delivery route', graph.allPossibleRoutes('E', 'E', {
  allowSameRoute: false
}).length)

console.log('The number of possible delivery route from E to E that delivery cost is less than 20. Given that the same route can be used twice in a delivery route', graph.allPossibleRoutes('E', 'E', {
  allowSameRoute: true,
  maxWeight: 19,
  allowLoop: true
}).length);

console.log('The cost of cheapest delivery route between E to D', graph.cheapestRoute('E', 'D').weight)
console.log('The cost of cheapest delivery route between E to E', graph.cheapestRoute('E', 'E').weight)