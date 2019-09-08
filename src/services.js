//Check with random function and a percentage if we are lucky or not
exports.isSuccess = (success) => {
   let luck = (Math.random() * (100 - 0) + 0).toFixed(0);
   return luck <= success;
}

//Get a a random number included between 2 numbers
exports.getRandomIncludeInNumbers = (max, min) => {
    return  Math.random() * (max - min) + min;
}