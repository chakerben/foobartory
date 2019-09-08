/* control and manage store of foobar (foobar , foo , bar and funds) */
let foobar = [];
let foo = [];
let bar = [];
let funds = 0;

//add a foobar 
exports.addFoobar = (foo , bar) => {
    foobar.push({"foo": foo, "bar": bar});
}
//delete a foobar
exports.deleteFoobar = (nbr) => {
    foobar.splice(0, nbr);
}
//get number of foobar 
exports.getnNumberFoobar = () => {
    return foobar.length;
}
//add a foo
exports.addFoo = (uid) => {
    foo.push(uid);
}

//get first element of foo 
exports.getFirstFoo = () => {
    return foo[0];
}

// delete foo
exports.deleteFoo = (nbr) => {
    foobar.splice(0, nbr);  
}

exports.getnumberFoo = () => {
    return foo.length;
}

//add a bar 
exports.addBar = (uid) => {
    bar.push(uid);
}
//delete a bar
exports.deleteBar = (uid) => {
    bar.splice(bar.indexOf(uid), 1);
}
exports.getnumberBar = () => {
    return bar.length;
}
//get first element of bar 
exports.getFirstBar = () => {
    return bar[0];
}

//add money 
exports.addFunds = (money) => {
    funds += money;
}
//delete money 
exports.deleteFunds = (money) => {
    funds -= money;
}
//Get total funds 
exports.getTotalFunds = () => {
    return funds;
}