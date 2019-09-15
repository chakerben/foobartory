/* control and manage store of robots */
let variables = require('./variables');
let nbRobots = variables.starRobots;
let robots = [];

//Initialized robots
exports.initRobots = () => {
    for (let i = 0; i < nbRobots; i++) {
        robots[i]= {
            idRobot : 'R' + (i+1),
            lastAction : null,
            newAction : null
        }
      }
}

//Add new rebot
exports.addRobot = () => {
    nbRobots++;
    robots[nbRobots-1]= {
        idRobot : 'R' + (nbRobots),
        lastAction : null,
        newAction : null
    }
}

//Set Action (id, last, new)
exports.setAction = (idR, lastA, newA) => {
    robots.forEach(robot => {
        if (robot.idRobot === idR) {
            robot.lastAction = lastA;
            if(newA !== null) {
                robot.newAction = newA 
            }
            }
    });
}
//Return last action for a robot
exports.getLastAction = (idR) => {
    robots.forEach(robot => {
        if (robot.idRobot === idR) {
            return robot.lastAction;
            }
    });
}

//Return new action for a robot 
exports.getNewAction = (idR) => {
    robots.forEach(robot => {
        if (robot.idRobot === idR) {
            return robot.newAction;
            }
    });
}

//Get total number of robots
exports.getNumberRobots = () => {
    return nbRobots;
}

//Get robots 
exports.getRobots = () => {
    return robots;
}