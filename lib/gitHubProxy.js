
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