var http = require("http");
var https = require("https");

// todo:support 302, 301
function scrape(url, callback) {
  if (url.slice(0, 8) == "https://") {
	https.get(url, function(res) {
	  if (res.statusCode != 200) {
	    callback(null, "Https response " + res.statusCode);
	    return;
	  }
      var data = "";
      res.on('data', function (chunk) {
        data += chunk;
      });
      res.on("end", function() {
        callback(data);
      });
    }).on("error", function(err) {
      callback(null, err);
    });
  } else if (url.slice(0, 7) == "http://") {	
    http.get(url, function(res) {
	  if (res.statusCode != 200) {
	    callback(null, "Http response " + res.statusCode);
	    return;
	  }
      var data = "";
      res.on('data', function (chunk) {
        data += chunk;
      });
      res.on("end", function() {
        callback(data);
      });
    }).on("error", function(err) {
      callback(null, err);
    });
  } else {
    callback(null, "Unsupported protocol");
  }
}

exports.scrape = scrape;
