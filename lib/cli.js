//cli
var constants = require("./constants");
var osFinder = require("./osFinder");
var winIns = require("./windows/windowsInstaller");
var linIns = require("./linux/linuxInstaller");

exports.run = function () {
    var args = process.argv.slice(2);
    

    if (args.length > 0) {
        var arg1 = args[0];
        var appName = null;
        //if (arg1 === constants.HELP || arg1 === constants.H) {
        //arg1 = constants.HELP;
        //}
        if (args.length > 1) {
            appName = args[1];
        }
        var params = processArgs(args);
        
        if (arg1 === constants.INSTALL) {
            processInstall(appName, params, function (result) {
                if(result.success){
                    console.log("Install successful");
                }else{
                    console.log("Install error: "+ result.message);
                }
            });
        } else if (arg1 === constants.HELP || arg1 === constants.H) {
            console.log(constants.DESC);
            console.log(constants.COMMAND_SIGNATURE);
            console.log(constants.PRESS_RETURN);
        }
        else {
            console.log("command not found");
            console.log(constants.HELP_MESSAGE);
        }

    }else{
        console.log("command not found");
        console.log(constants.HELP_MESSAGE);
    }
};


processInstall = function (appName, params, callback) {
    //console.log("installing software");
    var returnVal = {
        success: false,
        message: null
    };
    osFinder.findOS(function (OS) {
        if (OS === constants.LINUX) {
            linIns.install(appName, params, function(res){
                callback(res);
            });
        } else if (OS === constants.WINDOWS) {
            winIns.install(appName, params, function(res){
                callback(res);
            });
        }else{
            returnVal.message = "no compatible OS found";
            callback(returnVal);
        }
    });

};

processArgs = function (args) {
    var returnVal = {
        appVersion: null,
        path: null
    };
    if (args.length >= 2) {
        for (var c = 1; c < args.length; c++) {
            var arg2 = args[c];
            var arg2Result = processArg(arg2);
            if (arg2Result.appVersion !== null) {
                returnVal.appVersion = arg2Result.appVersion;
            } else if (arg2Result.path !== null) {
                returnVal.path = arg2Result.path;
            }
        }

    }
    return returnVal;
};

processArg = function (arg) {
    var returnVal = {
        appVersion: null,
        path: null
    };

    //console.log("arg:" + arg);
    var indexOfVer = arg.indexOf("ver=");
    var indexOfVersion = arg.indexOf("version=");
    var indexOfPath = arg.indexOf("path=");
    //console.log("ver= index:" + indexOfVer);
    //console.log("version= index:" + indexOfVersion);
    if (indexOfVer > -1) {
        arg = arg.replace("ver=", "");
        //console.log(arg);
        if (arg.length > 0) {
            returnVal.appVersion = arg;
            //console.log("ver:" + returnVal.appVersion);
        }

    } else if (indexOfVersion > -1) {
        arg = arg.replace("version=", "");
        //console.log(arg);
        if (arg.length > 0) {
            returnVal.appVersion = arg;
            //console.log("version:" +returnVal.appVersion);
        }

    } else if (indexOfPath > -1) {
        arg = arg.replace("path=", "");
        //console.log(arg);
        if (arg.length > 0) {
            returnVal.path = arg;
            //console.log("path:" +returnVal.path);
        }

    }
    return returnVal;
};

