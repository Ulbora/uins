var exec = require('child_process').exec;
var constants = require("./constants");
var githubDownloader = require("./githubDownloader");

exports.install = function (appName, params, callback) {
    console.log("OS: " + constants.LINUX);
    console.log("app =" + appName);
    console.log("ver =" + params.appVersion);
    console.log("path =" + params.path);
    var appVersion = params.appVersion;
    var installPath;
    if(params.path !== undefined && params.path !== null){
        installPath = params.path;
    }else{
        installPath = constants.LINUX_APPLICATION_INSTALL_PATH;
    } 
    installPath += ("/" + appName + "/"+ appName + ".zip");
    githubDownloader.downloadZipFile(appVersion, installPath, function(result){
        // code to unzip the file
        
        callback(result);
    });
    
};
