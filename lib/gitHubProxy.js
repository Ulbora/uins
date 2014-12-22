var Client = require('node-rest-client').Client;



exports.get = function (url, downloadFile, callback) {
    console.log("gethub proxy get: " + JSON.stringify(url));
    var returnVal = {
        success: false,
        message: "",
        jsonResponse: null
    };
    
    var client = new Client();
    

    var args = {
        requestConfig: {
            timeout: 2000
        },
        responseConfig: {
            timeout: 2000 //response timeout
        },
        headers:{"User-Agent: ": "node-installer"} 
    };
    console.log("github proxy get url: " + url);
    try {
        var reqRtn = client.get(url, args, function (data, res) {
            // parsed response body as js object
            console.log("data: " + data);
            //console.log(res.buffer);
            //var r = res.toString();
            //console.log("res: " + r);
            // raw response
            //console.log("response: "+ JSON.stringify(response));
            returnVal.success = true;
            if(downloadFile){
                returnVal.jsonResponse = res;
            }else{
                returnVal.jsonResponse = data;
            }
            
            returnVal.message = "gitHub file download successful";
            callback(returnVal);
        });
        reqRtn.on('requestTimeout', function (req) {
            console.log("request has expired");
            req.abort();
            returnVal.message = "service call request timed out";
            callback(returnVal);
        });
        reqRtn.on('responseTimeout', function (res) {
            console.log("response has expired");
            returnVal.message = "service call response timed out";
            callback(returnVal);
        });
        reqRtn.on('error', function (err) {
            console.log('request error', err);
            returnVal.message = "service call failed";
            callback(returnVal);
        });
    } catch (err) {
        console.log("proxy exception: " + err);
        callback(returnVal);
    }
};