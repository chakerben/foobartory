//Manage all activity of a robot 
let uuid = require('uuid/v1');
let foobarStore = require('./foobarStore');
let robotsStore = require('./robotsStore');
let variables = require('./variables');
let services = require('./services');

//Mine Foo
let mineFoo = (robot) => {
    setTimeout(() => {
        let uid = uuid();
        foobarStore.addFoo(uid);
        console.log('Robot ' + robot.idRobot + ' is mining Foo with UID : ' + uid);
        robotsStore.setAction(robot.idRobot, variables.mineFoo, null);
        move(robot).catch(reason => {
            console.log(reason)
        });
    }, variables.appTime);
}

//Mine Bar 
let mineBar = (robot) => {
    let timeToSleep = services.getRandomIncludeInNumbers(2, 0.5).toFixed(1);
    setTimeout(() => {
        let uid = uuid();
        foobarStore.addBar(uid);
        console.log('Robot ' + robot.idRobot + ' is mining Bar with UID : ' + uid);
        robotsStore.setAction(robot.idRobot, variables.mineBar, null);
        move(robot).catch(reason => {
            console.log(reason)
        });
    }, timeToSleep * variables.appTime);
}

//Assembling of a foobar from a foo and a bar with 60% of success 
let assemble = (foo, bar, robot) => {
    setTimeout(() => {
        let success = services.isSuccess(variables.success);
        console.log('Robot ' + robot.idRobot + ' is assembling Foobar');
        if (success) {
            foobarStore.addFoobar(foo, bar);
            foobarStore.deleteFoo(foo);
            foobarStore.deleteBar(bar);
            console.log('Successed in assembling Foobar');
        } else {
            foobarStore.deleteFoo(1);
            console.log('Failed in assembling Foobar');
        }
        robotsStore.setAction(robot.idRobot, variables.assemble, null);
        move(robot).catch(reason => {
            console.log(reason)
        });
    }, 2 * variables.appTime);
}

// Sell a foobar 
let sellFoobar = (robot) => {

    setTimeout(() => {
        robotsStore.setAction(robot.idRobot, variables.sell, null);
        if (checkForSell() === true) {
            let nbrFoobar = foobarStore.getnNumberFoobar();
            if (nbrFoobar > 5) {
                nbrFoobar = 5;
            }
            foobarStore.addFunds(nbrFoobar);
            foobarStore.deleteFoobar(nbrFoobar);
            console.log('Robot ' + robot.idRobot + ' is selling ' + nbrFoobar + ' Foobar ** Total funds after selling: ' + foobarStore.getTotalFunds() + '€');
        }
        move(robot).catch(reason => {
            console.log(reason)
        });
    }, 10 * variables.appTime);
}

// Buy a robot
let buyRobot = (robot) => {
    robotsStore.setAction(robot.idRobot, variables.buy, null);
    if (checkForBuy()) {
        robotsStore.addRobot();
        foobarStore.deleteFunds(3);
        foobarStore.deleteFoo(6);
        console.log('Robot ' + robot.idRobot + ' is buying new robot ** Total Robot : ' + robotsStore.getNumberRobots());
        if (robotsStore.getNumberRobots() < variables.maxRobots) {
            move(robotsStore.getRobots()[robotsStore.getNumberRobots() - 1]).catch(reason => {
                console.log(reason)
            });
            move(robot).catch(reason => {
                console.log(reason)
            });
        }
    } else {
        move(robot).catch(reason => {
            console.log(reason)
        });
    }

}

//max to sell by robot is 5 
let checkForSell = () => {
    if (foobarStore.getnNumberFoobar() > 0) {
        return true;
    }
    return false;
}

//Buy only if we have 3€ or more and 6 foo
let checkForBuy = () => {
    if ((foobarStore.getTotalFunds() >= 3) && (foobarStore.getnumberFoo() >= 6) && (robotsStore.getNumberRobots() < variables.maxRobots)) {
        return true;
    }
    return false;
}
//Change activity for robot
let changeActivity = (robot) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            robotsStore.setAction(robot.idRobot, robot.lastAction, chooseAction(robot.lastAction));
            if (robotsStore.getNewAction(robot.idRobot) === variables.finish || robotsStore.getLastAction(robot.idRobot) === variables.finish) {
                reject(false);
            } else {
                resolve(robot.newAction);
            }
        }, 5 * variables.appTime);
    });
}

//Choose perform action for robot 
let chooseAction = (lastAction) => {
    let newActionRobot = null;
    if (robotsStore.getNumberRobots() >= variables.maxRobots)  {
        newActionRobot = variables.finish;
    }
    else if (lastAction === null) {
        if (foobarStore.getnumberFoo() === 0) {
            newActionRobot = variables.mineFoo;
        } else if (foobarStore.getnumberBar() === 0) {
            newActionRobot = variables.mineBar;
        } else {
            newActionRobot = variables.assemble;
        }
    } else if (lastAction === variables.mineFoo && foobarStore.getnumberBar() === 0) {
        newActionRobot = variables.mineBar;
    } else if (lastAction === variables.mineBar && foobarStore.getnumberFoo() === 0) {
        newActionRobot = variables.mineFoo;
    } else if (foobarStore.getnumberFoo() < 6) {
        newActionRobot = variables.mineFoo;
    } else if (lastAction === variables.mineFoo || lastAction === variables.mineBar) {
        newActionRobot = variables.assemble;
    } else if (lastAction === variables.assemble) {
        if (checkForSell() === true) {
            newActionRobot = variables.sell;
        } else if (checkForBuy() === true) {
            newActionRobot = variables.buy;
        } else if (robotsStore.getNumberRobots() >= variables.maxRobots) {
            newActionRobot = variables.finish;
        } else if (foobarStore.getnumberFoo() < 6) {
            newActionRobot = variables.mineFoo;
        } else if (foobarStore.getnumberFoo() === 0) {
            newActionRobot = variables.mineFoo;
        } else if (foobarStore.getnumberBar() === 0) {
            newActionRobot = variables.mineBar;
        } else {
            newActionRobot = variables.assemble;
        }
    } else if (lastAction === variables.sell) {
        if (checkForBuy() === true) {
            newActionRobot = variables.buy;
        } else if (robotsStore.getNumberRobots() >= variables.maxRobots) {
            newActionRobot = variables.finish;
        } else if (foobarStore.getnumberFoo() < 6) {
            newActionRobot = variables.mineFoo;
        } else if (checkForSell() === true) {
            newActionRobot = variables.sell;
        } else if (foobarStore.getnumberFoo() === 0) {
            newActionRobot = variables.mineFoo;
        } else if (foobarStore.getnumberBar() === 0) {
            newActionRobot = variables.mineBar;
        } else {
            newActionRobot = variables.assemble;
        }
    } else if (lastAction === variables.buy) {
        if (robotsStore.getNumberRobots() < variables.maxRobots) {
            if (checkForBuy() === true) {
                newActionRobot = variables.buy;
            } else if (foobarStore.getnumberFoo() < 6) {
                newActionRobot = variables.mineFoo;
            } else if (checkForSell() === true) {
                newActionRobot = variables.sell;
            } else if (foobarStore.getnumberFoo() === 0) {
                newActionRobot = variables.mineFoo;
            } else if (foobarStore.getnumberBar() === 0) {
                newActionRobot = variables.mineBar;
            } else {
                newActionRobot = variables.assemble;
            }
        } else {
            if (robotsStore.getNumberRobots() >= variables.maxRobots)  {
                newActionRobot = variables.finish;
            }
        }
    } else {
        if (robotsStore.getNumberRobots() >= variables.maxRobots)  {
            newActionRobot = variables.finish;
        }
    }
    return newActionRobot;
}
// move robot
let move = (robot) => {
    return new Promise((reject) => {
        console.log('Robot ' + robot.idRobot + ' in move to change activity');
        changeActivity(robot).then(newActivity => {
            switch (newActivity) {
                case variables.mineFoo:
                case null:
                    mineFoo(robot);
                    break;
                case variables.mineBar:
                    mineBar(robot);
                    break;
                case variables.assemble:
                    assemble(foobarStore.getFirstFoo(), foobarStore.getFirstBar(), robot);
                    break;
                case variables.sell:
                    sellFoobar(robot);
                    break;
                case variables.buy:
                    buyRobot(robot);
                    break;
                default:
                    reject('Fin de la production');
            }
        })
    });
}
//Start Production 
exports.start = () => {
    robotsStore.initRobots();
    let initrobots = robotsStore.getRobots();
    console.log("Start Production");
    initrobots.forEach(robot => {
        move(robot).catch(reason => {
            console.log(reason)
        });
    });
}