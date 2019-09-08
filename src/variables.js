// time to used in production , here 1000 = 1Second
const APPROVED_TIME = 10;

// Maximum robots to produce
const MAX_ROBOTS = 30;

//number of robots to Start with 
const STARTS_ROBOTS = 2;

//Percentage of success 
const SUCCESS_PERCENT = 60;

module.exports = {
    appTime : APPROVED_TIME,
    maxRobots : MAX_ROBOTS,
    starRobots : STARTS_ROBOTS,
    success : SUCCESS_PERCENT
}