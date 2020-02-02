# Project 

Library to find direct route, all possible routes and cheapest route between nodes.

## Getting Started
**Pre requirements**
- node
- npm

1. Clone this repo
2. run `npm i`
3. run sh test.sh or `npm start`
4. For Test Case: `sh test.sh`

## Usage

Example: 
```js
const { Graph } = require('./graph/Graph.js);
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

//For Direct route
graph.directRoute('A-B-E')

//For all possible routes
graph.allPossibleRoutes('E', 'D', {
  allowSameRoute: false,
  maxStop: 4
})

//For Cheapest route
graph.cheapestRoute('E', 'D')
```
## DOC
* `addNode`
  * **Requires**: `source, destination, weight`
  * **Accepts**: `source, destination, weight`
  * **Example**: ```addNode('A', 'B', 1)```

* `directRoute`
  * **Requires**: `route`
  * **Accepts**: `route`
  * **Example**: ```directRoute('A-B')```
  * **Returns**: ```integer``` 

* `allPossibleRoutes`
  * **Requires**: `source, destination`
  * **Accepts**: `source, destination,  conditions`
  * **Example**: ```allPossibleRoutes('E', 'E', {
    allowSameRoute: false,
    maxStop: 10,
    maxWeight: 20,
    allowLoop: true
  })```
  * **Returns**: `array`


* `cheapestRoute`
  * **Requires**: `source, destination`
  * **Accepts**: `source, destination`
  * **Example**: ```cheapestRoute('E', 'D')```
  * **Returns**: `json`

