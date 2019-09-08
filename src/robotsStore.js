/* control and manage store of robots */
let variables = require('./variables');
let nbRobots = variables.starRobots;
let robots = [];

//Initialized robots
exports.initRobots = () => {
    for (let i = 1; i <= nbRobots; i++) {
        robots.push(i);
      }
}

//Add new rebot
exports.addRobot = () => {
    nbRobots++;
    robots.push(nbRobots);
}

//Get total number of robots
exports.getNumberRobots = () => {
    return nbRobots;
}

//Get robots 
exports.getRobots = () => {
    return robots;
}
