//cli
var constants = require("./constants");
var osFinder = require("./osFinder");
var winIns = require("./windowsInstaller");
var linIns = require("./linuxInstaller");

exports.run = function () {
    var args = process.argv.slice(2);
    //for(var cnt = 0; cnt < args.length; cnt++){
    //console.log(args[cnt]);
    //}


    if (args.length > 0) {
        var arg1 = args[0];
        var appName = null;
        if (arg1 === constants.HELP || arg1 === constants.H) {
            arg1 = constants.HELP;
        }
        if(args.length >1){
            appName = args[1];
        }
        var params = processArgs(args);
        //console.log("app =" + appName);
        //console.log("ver =" + params.appVersion);
        //console.log("path =" + params.path);
        switch (arg1) {
            case constants.INSTALL:
                processInstall(appName, params);
                break;
            case constants.HELP:
                console.log(constants.DESC);
                console.log(constants.COMMAND_SIGNATURE);
                console.log(constants.PRESS_RETURN);
                break;

            default:
                console.log("command not found");

        }
        /*
         if (arg1 === constants.INSTALL) {
         osFinder.findOS();
         console.log("installing software");
         } else if (arg1 === constants.HELP || arg1 === constants.H) {
         console.log(constants.DESC);
         console.log(constants.COMMAND_SIGNATURE);
         console.log(constants.PRESS_RETURN);
         }
         else {
         console.log("command not found");
         }
         */
    }
};


processInstall = function (appName, params) {
    //console.log("installing software");
    osFinder.findOS(function (OS) {
        if (OS === constants.LINUX) {
            linIns.install(appName, params);
        } else if (OS === constants.WINDOWS) {
            winIns.install(appName, params);
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

