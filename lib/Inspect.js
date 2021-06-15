const util = require('util');

function Inspect(target){
    console.log(util.inspect(target, {showHidden:false,depth:null}));
}

module.exports = Inspect;
