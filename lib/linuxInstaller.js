var exec = require('child_process').exec;
var constants = require("./constants");

exports.install = function(){
    console.log("os: "+ constants.LINUX);
};
