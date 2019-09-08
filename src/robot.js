//Manage all activity of a robot 
let sleep = require('thread-sleep');
let uuid = require('uuid/v1');
let foobarStore = require('./foobarStore');
let robotsStore = require('./robotsStore');
let variables = require('./variables');
let services = require('./services');

//Change activity for robot
let changeActivity = () => {
    sleep(5 * variables.appTime);
}

//Mine Foo
let mineFoo = (robot) => {
    let uid = uuid();
    foobarStore.addFoo(uid);
    sleep(variables.appTime);
    console.log('Robot R' + robot + ' is mining Foo with UID : ' + uid );
}

//Mine Bar 
let mineBar = (robot) => {
    let uid = uuid();
    foobarStore.addBar(uid);
    let timeToSleep = services.getRandomIncludeInNumbers(2, 0.5).toFixed(1);
    sleep(timeToSleep * variables.appTime);
    console.log('Robot R' + robot + ' is mining Bar with UID : ' + uid );
}

//Assembling of a foobar from a foo and a bar with 60% of success 
let assemble = (foo, bar, robot) => {
    let success = services.isSuccess(variables.success);
    console.log('Robot R' + robot + ' is assembling Foobar');
    if(success) {
        foobarStore.addFoobar(foo, bar);
        foobarStore.deleteFoo(foo);
        foobarStore.deleteBar(bar);
        sleep(2 * variables.appTime);
        console.log('Successed in assembling Foobar');
    }
    else {
        foobarStore.deleteFoo(1);
        sleep(2 * variables.appTime);
        console.log('Failed in assembling Foobar');
    }
}

// Sell a foobar 
let sellFoobar = (nbrFoobar, robot) => {
    foobarStore.addFunds(nbrFoobar);
    foobarStore.deleteFoobar(nbrFoobar);
    sleep(10 * variables.appTime);
    console.log('Robot R' + robot + ' is selling ' + nbrFoobar + ' Foobar ** Total funds after selling: ' + foobarStore.getTotalFunds() + "€");
}

// Buy a robot
let buyRobot = (robot) => {
    robotsStore.addRobot();
    foobarStore.deleteFunds(3);
    foobarStore.deleteFoo(6);
    console.log('Robot R' + robot + ' is selling new robot ** Total Robot : ' + robotsStore.getNumberRobots());
}

//max to sell by robot is 5 
let checkForSell = (robot) => {
    let nbrFoobar = foobarStore.getnNumberFoobar();
    if(nbrFoobar > 5)    {
        nbrFoobar = 5;
    }
    sellFoobar(nbrFoobar, robot);
}

//Buy only if we have more than 3€ and 6 foo
let checkForBuy = (robot) => {
    if(foobarStore.getTotalFunds() > 3 && foobarStore.getnumberFoo() > 6 && robotsStore.getNumberRobots() < variables.maxRobots) {
        buyRobot(robot);
    }
}

//Start Activity 
exports.start = () => {
    robotsStore.initRobots();
    console.log("Start Production");
    while (robotsStore.getNumberRobots() < variables.maxRobots) {
        let robots = robotsStore.getRobots();
        
        robots.forEach(robot => {
            mineFoo(robot);
        });
        changeActivity();
        
        robots.forEach(robot => {
            mineBar(robot);
        });
        changeActivity();

        robots.forEach(robot => {
            if( foobarStore.getnumberFoo() > 0 && foobarStore.getnumberBar() > 0) {
                assemble(foobarStore.getFirstFoo(), foobarStore.getFirstBar(), robot);
            }
        });
        changeActivity();
       
        robots.forEach(robot => {
            if(foobarStore.getnNumberFoobar() > 0) {
                checkForSell(foobarStore.getnNumberFoobar(), robot);
            }
        });
        changeActivity();

        robots.forEach(robot => {
            checkForBuy(robot);
        });
        changeActivity();
    }
    console.log("Finish Production");
}