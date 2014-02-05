var url = require("url");
var querystring = require("querystring")
var extract = require("./extract")

function writeError(response, error_message) {
  response.writeHead(400, {"Content-Type": "text/html"});
  response.write('<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body>Error: ');
  response.write(error_message);
  response.write("</body></html>")
  response.end();
}

function addSnippet(request, response) {
  var query = url.parse(request.url).search;
  if (query == undefined || query.length == 0) {
	writeError(response, "No params in request.");
	return;
  }
  // remove the '?'
  query = query.substring(1);
  console.log("query param " + query);
  var target_url = querystring.parse(query)["u"];
  if (target_url == undefined || target_url.length == 0) {
	writeError(response, "No u param in request.");
	return;
  }

  extract.extractSnippet(target_url, function(lines, err) {
	if (err != undefined) {
	  writeError(response, err);
	  return;	
	}
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write('<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body>');
	for (var i = 0; i < lines.length; i++) {
	  //console.log(lines[i]);
	  response.write(lines[i]);	
	}
	response.write("</body></html>");
	response.end();
  });
}

exports.addSnippet = addSnippet