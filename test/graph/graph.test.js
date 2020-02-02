const expect = require("expect");
const assert = require("assert");

const { Graph } = require("../../graph/Graph.js");

const fillGraph = (graph) => {
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
}


describe('Graph', () => {
  describe('Add Node', () => {
    it('Should not allow to add node without any data', () => {
      const graph = new Graph();
      expect(() => graph.addNode()).toThrow('Please enter valid data')
    });

    it('Should not allow to add node with missing parameter', () => {
      const graph = new Graph();
      expect(() => graph.addNode('A', 'B')).toThrow('Please enter valid data')
    });

    it('Should not allow to add node with incorrect data type', () => {
      const graph = new Graph();
      expect(() => graph.addNode(1, 'B')).toThrow('Please enter valid data')
    });

    it('Should not allow to add node with 0 weight', () => {
      const graph = new Graph();
      expect(() => graph.addNode('A', 'B', 0)).toThrow('Please enter valid data')
    });

    it('Should not allow to add node with string weight', () => {
      const graph = new Graph();
      expect(() => graph.addNode('A', 'B', 'C')).toThrow('Please enter valid data')
    });

    it('Should allow to add a node', () => {
      const graph = new Graph();
      graph.addNode('A', 'C', 4);

      let node = graph.paths.filter(p => p.source === 'A').pop()

      assert.equal(node.source, 'A')
      assert.equal(node.edge.length, 1)
      assert.equal(node.edge[0].destination, 'C')
      assert.equal(node.edge[0].weight, 4)
    })

    it('Should not allow to add duplicate node', () => {
      const graph = new Graph();
      graph.addNode('A', 'C', 4);
      expect(() => graph.addNode('A', 'C', 4)).toThrow('Edge already exist')
    })

    it('Should allow to add multiple nodes', () => {
      const graph = new Graph();
      graph.addNode('A', 'C', 4);

      let node = graph.paths.filter(p => p.source === 'A').pop()

      assert.equal(node.source, 'A')
      assert.equal(node.edge.length, 1)
      assert.equal(node.edge[0].destination, 'C')
      assert.equal(node.edge[0].weight, 4)

      graph.addNode('A', 'D', 10);

      node = graph.paths.filter(p => p.source === 'A').pop()

      assert.equal(node.source, 'A')
      assert.equal(node.edge.length, 2)
      assert.equal(node.edge[1].destination, 'D')
      assert.equal(node.edge[1].weight, 10)
    })
  })

  describe('Direct Route', () => {
    it('Should not find direct route with no data', () => {
      const graph = new Graph();
      expect(() => graph.directRoute('')).toThrow('Invalid route. Add route with - between them. Ex: ​​"E-A-C-F"')
    })

    it('Should not find direct route with incorrect data', () => {
      const graph = new Graph();
      expect(() => graph.directRoute('ABC')).toThrow('Invalid route. Add route with - between them. Ex: ​​"E-A-C-F"')
    })

    it('Should find route weight between two nodes', () => {
      const graph = new Graph();
      fillGraph(graph);
      const weight = graph.directRoute('A-D');
      assert.equal(weight, 10)
    });

    it('Should find route weight between three nodes', () => {
      const graph = new Graph();
      fillGraph(graph);
      const weight = graph.directRoute('A-B-E');
      assert.equal(weight, 4)
    });

    it('Should find route weight between four nodes', () => {
      const graph = new Graph();
      fillGraph(graph);
      const weight = graph.directRoute('E-A-C-F');
      assert.equal(weight, 8)
    });

    it('Should print No Such Route if no direct route found', () => {
      const graph = new Graph();
      fillGraph(graph);
      const weight = graph.directRoute('A-D-F');
      assert.equal(weight, 'No Such Route');
    });
  });

  describe('All Possible routes', () => {
    it('Should not find route without any data', () => {
      const graph = new Graph();
      fillGraph(graph);
      expect(() => graph.allPossibleRoutes()).toThrowError('Please enter valid data')
    });

    it('Should not find route with incorrect data', () => {
      const graph = new Graph();
      fillGraph(graph);
      expect(() => graph.allPossibleRoutes(1)).toThrowError('Please enter valid data')
    });

    it('Should not find route with incorrect data', () => {
      const graph = new Graph();
      fillGraph(graph);
      expect(() => graph.allPossibleRoutes(1,2,1)).toThrowError('Please enter valid data')
    });

    it('Should not find route if no source node exist', () => {
      const graph = new Graph();
      fillGraph(graph);
      let routes = graph.allPossibleRoutes('H', 'A');
      assert.equal(routes, 'No Such Route');
    });

    it('Should find all possible routes with maximum stop and not using same route twice', () => {
      const graph = new Graph();
      fillGraph(graph);
      let routes = graph.allPossibleRoutes('E', 'D', { maxStop: 4, allowSameRoute: false });
      assert.equal(routes.length, 3);
    });

    it('Should find all possible routes without using same route twice', () => {
      const graph = new Graph();
      fillGraph(graph);
      let routes = graph.allPossibleRoutes('E', 'E', { allowSameRoute: false });
      assert.equal(routes.length, 5);
    });

    it('Should find all possible routes with using same route twice and max weight less than 20', () => {
      const graph = new Graph();
      fillGraph(graph);
      let routes = graph.allPossibleRoutes('E', 'E', { allowSameRoute: true, allowLoop: true, maxWeight: 19 });
      assert.equal(routes.length, 29);
    });
  });
  describe('Cheapest Route', () => {
    it('Should not find route with empty data', () => {
      const graph = new Graph();
      fillGraph(graph);
      expect(() => graph.cheapestRoute()).toThrowError('Please enter valid data')
    });

    it('Should not find route with incorrect data', () => {
      const graph = new Graph();
      fillGraph(graph);
      expect(() => graph.cheapestRoute('A')).toThrowError('Please enter valid data')
    });

    it('Should find cheapest route weight between two routes', () => {
      const graph = new Graph();
      fillGraph(graph);
      const route = graph.cheapestRoute('E', 'D');
      assert.equal(route.weight, 9);
    });

    it('Should find cheapest route weight between two routes', () => {
      const graph = new Graph();
      fillGraph(graph);
      const route = graph.cheapestRoute('E', 'E');
      assert.equal(route.weight, 6);
    });
  })
});
