// time to used in production ,  1000 = 1Second
const APPROVED_TIME = 10;

// Maximum robots to produce
const MAX_ROBOTS = 30;

//number of robots to Start with 
const STARTS_ROBOTS = 2;

//Activity of robot 
const MINE_FOO = 'mine_foo';
const MINE_BAR = 'mine_bar';
const ASSEMBLE = 'assemble';
const SELL = 'sell' ;
const BUY = 'buy';
const FINISH = 'finish';
const CHANGE_ACTIVITY = 'change_activity'

//Percentage of success 
const SUCCESS_PERCENT = 60;

module.exports = {
    appTime : APPROVED_TIME,
    maxRobots : MAX_ROBOTS,
    starRobots : STARTS_ROBOTS,
    mineFoo : MINE_FOO,
    mineBar : MINE_BAR,
    assemble  : ASSEMBLE,
    sell : SELL,
    buy : BUY,
    finish: FINISH,
    changeActivity: CHANGE_ACTIVITY,
    success : SUCCESS_PERCENT
}