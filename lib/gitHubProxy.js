var https = require('https');
var urlParser = require("url");


exports.getList = function (url, callback) {
    var returnVal = {
        success: false,
        message: "",
        jsonResponse: null
    };
    var theUrl = urlParser.parse(url);
    theUrl.headers = {"User-Agent: ": "node-installer"};
    https.get(theUrl, function (res) {
        if (res.statusCode === 200) {            
            var body;
            console.log("statusCode: ", res.statusCode);
            console.log("headers: ", res.headers);
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                if (body) {
                    body += chunk;
                } else {
                    body = chunk;                    
                }
            });
            res.on('end', function () {
                // all json data has been downloaded
                console.log('json : ' + body);
                returnVal.success = true;
                returnVal.jsonResponse = body;
                callback(returnVal);
            });
            res.on('error', function (e) {
                console.log('problem with request: ' + e.message);
                callback(returnVal);
            });
        } else {
            returnVal.message = "github service call failed";
            callback(returnVal);
        }        

    });
};

exports.get = function (url, callback) {
    var returnVal = {
        success: false,
        message: "",
        jsonResponse: null
    };
    var theUrl = urlParser.parse(url);
    theUrl.headers = {"User-Agent: ": "node-installer"};
    https.get(theUrl, function (res) {
        if (res.statusCode === 200) {
            returnVal.success = true;
        } else {
            returnVal.message = "github service call failed";
        }
        returnVal.jsonResponse = res;
        callback(returnVal);

    });
};