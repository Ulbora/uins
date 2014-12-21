var exec = require('child_process').exec;
var constants = require("./constants");

exports.install = function (appName, params) {
    console.log("OS: " + constants.LINUX);
    console.log("app =" + appName);
    console.log("ver =" + params.appVersion);
    console.log("path =" + params.path);
};
