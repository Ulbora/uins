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
        if (arg1 === constants.HELP || arg1 === constants.H) {
            arg1 = constants.HELP;
        }

        switch (arg1) {
            case constants.INSTALL:
                processInstall();
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


processInstall = function () {
    console.log("installing software");
    osFinder.findOS(function(OS){
        if(OS === constants.LINUX){
            linIns.install();
        }else if(OS === constants.WINDOWS){
            winIns.install();
        }
    });
    
};

