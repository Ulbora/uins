//OS finder
var exec = require('child_process').exec;
var constants = require("./constants");

exports.findOS = function (callback) {
    var returnVal = "none";
    console.log("finding OS");
    exec("uname -r", function (err, stdout, stderr) {
        if (!err && !stderr) {
            returnVal = constants.LINUX;
            console.log("OS: " + returnVal);
            callback(returnVal);
        } else {
            exec("systeminfo", function (err, stdout, stderr) {
                if (!err && !stderr) {
                    returnVal = constants.WINDOWS;
                    console.log("OS: " + returnVal);
                    callback(returnVal);
                } else {
                    console.log("OS: " + returnVal);
                    callback(returnVal);
                }
            });
        }

    });
};
