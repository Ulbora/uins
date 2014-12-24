/*     
 Copyright (C) 2012 Driven Solutions (www.drivensolutions.com)
 All rights reserved.
 
 Copyright (C) 2012 Ken Williamson
 All rights reserved.
 
 Copyright (C) 2012 Chris Williamson
 All rights reserved.
 
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.
 
 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 
 
 Author: Ken Williamson (ken@drivensolutions.com) 
 */


var exec = require('child_process').exec;
var constants = require("../constants");
var githubDownloader = require("../githubDownloader");

exports.install = function (appName, params, callback) {
    console.log("OS: " + constants.LINUX);
    console.log("app =" + appName);
    console.log("ver =" + params.appVersion);
    console.log("path =" + params.path);
    var returnVal = {
        success: false,
        message: null
    };
    var appVersion = params.appVersion;
    var installPath;
    if (params.path !== undefined && params.path !== null) {
        installPath = params.path;
    } else {
        installPath = constants.LINUX_APPLICATION_INSTALL_PATH;
    }
    var installFile = installPath + ("/" + appName + "/" + appName + "-");
    //var installDir = installPath + ("/" + appName);
    //var createDirCommand = "mkdir " + installDir;

    //exec(createDirCommand, {maxBuffer: 1024 * 1000}, function (err, stdout, stderr) {
    //if (!err && !stderr) {
    githubDownloader.downloadZipFile(appVersion, installFile, function (result) {
        // code to unzip the file
        if (result.success) {
            //var installDir = installPath + ("/" + appName);
            //Apparently there is no standare unzip command in the windows world so we will not actually unzip the file----- 
            returnVal.success = true;
            callback(returnVal);
            //-------------------------------------------------------------------------------
            /*
             var unzipCommand = "unzip " + result.filePath + " -d " + installDir;
             console.log(unzipCommand);
             exec(unzipCommand, {maxBuffer: 1024 * 1000}, function (err, stdout, stderr) {
             if (!err && !stderr) {
             returnVal.success = true;
             callback(returnVal);
             } else {
             console.log(err);
             console.log(stderr);
             returnVal.message = err;
             callback(returnVal);
             }
             });
             */
        } else {
            returnVal.message = result.message;
            callback(returnVal);
        }
    });
    //} else {
    //console.log(err);
    // console.log(stderr);
    //returnVal.message = err;
    //callback(returnVal);
    // }
    //});


};
