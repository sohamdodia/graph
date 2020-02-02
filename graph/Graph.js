const isType = type => x => typeof x === type;
const isString = isType('string');
const isNumber = isType('number');
const isObject = isType('object');


class Graph {
  constructor() {
    this.paths = [];
  }

  //Add new node
  addNode(source, destination, weight) {

    //Check valid data
    if (!isString(source) || !isString(destination) || !isNumber(weight) || weight < 1) {
      throw new Error('Please enter valid data');
    }

    let foundNode = this.findNode(source);

    //if node not found with the source
    if (!foundNode) {
      foundNode = {
        source,
        edge: []
      };

      //Add node to the paths
      this.paths.push(foundNode);
    }

    //Add edge for the node
    this.addEdge(foundNode, destination, weight);
  }

  //Add edge for the node
  addEdge(node, edge, weight) {

    //check if for this node, edge already exist
    let foundEdge = node.edge.filter(n => n.destination === edge)
    if (foundEdge.length) {
      throw new Error('Edge already exist')
    } else {
      node.edge.push({
        destination: edge,
        weight
      });
    }
  }

  //Find node from paths
  findNode(name) {
    return this.paths.filter(n => n.source === name).pop()
  }

  //Check if edge exist
  checkEdgeExist(source, destination) {
    let node = this.findNode(source)
    if (!node) return;
    return node.edge.filter(n => n.destination === destination).pop()
  }

  
  //Find the direct path between multiple stops
  directRoute(route) {
    const routes = route.split('-');
    if (routes.length < 2) {
      throw new Error('Invalid route. Add route with - between them. Ex: ​​"E-A-C-F"')
    }

    let sourceNode = this.findNode(routes[0]);
    
    //If source node does not exist
    if (!sourceNode) {
      return 'No Such Route';
    }


    let weight = 0;

    for (let i = 0; i < routes.length - 1; i++) {
      let foundRoute = this.checkEdgeExist(routes[i], routes[i + 1]);
      if (!foundRoute) {
        return 'No Such Route'
      }

      weight += foundRoute.weight;
    }

    return weight;
  }

  //Find all the possible routes between two nodes
  allPossibleRoutes(source, destination, conditions) {
    //Check valid data
    if (!isString(source) || !isString(destination) || (conditions && !isObject(conditions))) {
      throw new Error('Please enter valid data');
    }
    //Setting default value
    conditions = conditions ? { maxStop:15, ...conditions }: { maxStop: 15, allowLoop: false};
    let sourceNode = this.findNode(source);

    if (!sourceNode) {
      return 'No Such Route'
    }

    let possibleRoutesArr = [];

    this.possibleRoutes(sourceNode, [sourceNode.source], possibleRoutesArr, conditions);

    possibleRoutesArr = possibleRoutesArr.filter(r => r[r.length - 1] === destination);

    //If not allowing the same route to be used for finding route
    if (!conditions || !conditions.allowSameRoute) {
      for (let i = 0; i < possibleRoutesArr.length; i++) {
        for (let j = 0; j < possibleRoutesArr[i].length; j++) {
          let exist = false;
          for (let k = 0; k < possibleRoutesArr.length; k++) {
            let route1 = possibleRoutesArr[i];
            let route2 = possibleRoutesArr[k];
            // check if route2 is already exist in route 1
            if (k !== i && route2.join(',') && route1.join(',').indexOf(route2.join(',')) === 0 && route1[route1.length - 1] === destination) {
              exist = true
              break
            }
          }
          //if route already exist, then 
          if (exist) {
            possibleRoutesArr[i] = [];
            break
          } else {
            let route = possibleRoutesArr[i].shift();
            possibleRoutesArr[i].push(route);
          }
        }
      }
      possibleRoutesArr = possibleRoutesArr.filter(r => r.length);
    }
    return possibleRoutesArr;
  }

  possibleRoutes(node, routes, possibleRoutes, conditions) {
    node.edge.forEach(n => {
      if (!conditions || !conditions.allowSameRoute) {
        let route = routes.join(',');

        //If route already exist in the routes
        if (route.indexOf(`${node.destination},${n.destination}`) !== -1) {
          return
        }
      }

      let currentRoute = routes.slice(0)
      currentRoute.push(n.destination);

      if (conditions && conditions.maxWeight) {
        let weight = this.directRoute(currentRoute.join('-'))
        if (weight > conditions.maxWeight)
          return
      }
      possibleRoutes.push(currentRoute);
      if(!conditions || !conditions.allowLoop) {
        //If route already visited
        let foundRoute = routes.filter(r => r === n.destination)
        if (foundRoute.length) {
          return
        }
    }


      if (conditions && conditions.maxStop) {
        if (currentRoute.length - 1 === conditions.maxStop) {
          return;
        }
      }
      let currentNode = this.findNode(n.destination)
      if (currentNode) {
        this.possibleRoutes(currentNode, currentRoute, possibleRoutes, conditions)
      }
    })
  }

  //Find the cheapest route between two nodes
  cheapestRoute(source, destination) {
    if (!isString(source) || !isString(destination)) {
      throw new Error('Please enter valid data');
    }

    let possibleRoutes = this.allPossibleRoutes(source, destination);
    
    let cheapestRoute = [];
    let minWeight = Infinity;
    possibleRoutes.forEach(r => {
      let weight = this.directRoute(r.join('-'));
      if (weight < minWeight) {
        cheapestRoute = r;
        minWeight = weight
      }
    });

    return {
      route: cheapestRoute,
      weight: minWeight
    }
  }
};


module.exports = {
  Graph
};