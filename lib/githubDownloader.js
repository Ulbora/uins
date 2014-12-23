var constants = require("./constants");
var exec = require('child_process').exec;
var gitHub = require("./gitHubProxy");
var fs = require('fs');

exports.downloadZipFile = function (version, path, callback) {
    var returnVal = {
        success: false,
        message: null
    };
    getGitHubList(function (listResult) {
        returnVal.success = listResult.success;
        returnVal.message = listResult.message;
        if (returnVal.success) {
            downloadTheZipFile(version, path, listResult.jsonResponse, function (fileResult) {
                callback(fileResult);
            });
        } else {
            callback(returnVal);
        }
    });
};

getGitHubList = function (callback) {
    if (constants.USE_GITHUB_TAG) {
        // get tags
        var tagUrl = constants.PROJECT_REPOSITORY_TAGS;
        gitHub.getList(tagUrl, function (tagList) {
            callback(tagList);
        });
    } else {
        //get releases
        var relUrl = constants.PROJECT_REPOSITORY_RELEASES;
        gitHub.getList(relUrl, function (relList) {
            callback(relList);
        });
    }
};

downloadTheZipFile = function (version, path, data, callback) {
    var returnVal = {
        success: false,
        message: null
    };
    var listArray = JSON.parse(data);
    //console.log("GitHub List: " + JSON.stringify(listArray));
    console.log("GitHub List: " + listArray);
    if (listArray !== undefined && listArray !== null && listArray.length > 0) {
        var repUrl = null;
        if (version !== undefined && version !== null) {
            for (var cnt = 0; cnt < listArray.length; cnt++) {
                var name = listArray[cnt].name;
                var varIndex = name.indexOf(version);
                if (varIndex > -1) {
                    repUrl = listArray[cnt].zipball_url;
                    break;
                }
            }
        } else {
            repUrl = listArray[0].zipball_url;
        }
        if (repUrl !== null) {
            gitHub.get(repUrl, function (fileResult) {
                if (fileResult.success) {
                    //console.log("GitHub data: " + JSON.stringify(fileResult.jsonResponse));
                    saveZipFile(path, fileResult.jsonResponse, function (saveResult) {
                        callback(saveResult);
                    });
                } else if (fileResult.jsonResponse.statusCode === 301 || fileResult.jsonResponse.statusCode === 302 ||
                        fileResult.jsonResponse.statusCode === 303) {
                    gitHub.get(fileResult.jsonResponse.headers.location, function (fileResult) {
                        if (fileResult.success) {
                            saveZipFile(path, fileResult.jsonResponse, function (saveResult) {
                                callback(saveResult);
                            });
                        } else {
                            returnVal.message = fileResult.message;
                            callback(returnVal);
                        }
                    });
                } else {
                    returnVal.message = fileResult.message;
                    callback(returnVal);
                }
            });
        } else {
            callback(returnVal);
        }
    } else {
        callback(returnVal);
    }
};

saveZipFile = function (savePath, res, callback) {
    var returnVal = {
        success: false,
        message: null
    };

    var path;
    if (savePath !== undefined && savePath !== null) {
        path = savePath;
       
        var body;        
        console.log("statusCode: ", res.statusCode);
        console.log("headers: ", res.headers);        
        res.setEncoding('binary');        
        res.on('data', function (chunk) {
            if (body) {
                body += chunk;
            } else {
                body = chunk;
                console.log('saving file------------------------------------------------------------!');
            }            
        });
        res.on('end', function () {
            // all data has been downloaded
            fs.writeFile(savePath, body, {flag: "wx", encoding: "binary"}, function (err) {
                if (!err) {
                    returnVal.success = true;
                    console.log('It\'s saved!');
                    callback(returnVal);
                } else {
                    console.log(err);
                    returnVal.message = "file save failed";
                    callback(returnVal);
                }
            });
        });
        res.on('error', function (e) {
            console.log('problem with request: ' + e.message);
        });
        
    } else {
        returnVal.message = "no file path specified";
        callback(returnVal);
    }
};


