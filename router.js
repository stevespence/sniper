var snipper = require("./snipper");

// Map of paths to handlers
var handlers = {
  "/add" : function(request, response) {
	snipper.addSnippet(request, response);	
  },
  "/unknown" : function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("unknown");
    response.end();	
  }	
};

function route(pathname, request, response) {
  if (handlers[pathname] !== undefined) {
    handlers[pathname](request, response);
  } else {
	handlers["/unknown"](request, response);
  }
}

exports.route = route;