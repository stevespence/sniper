var scraper = require("./scraper");
var cheerio = require("cheerio");

var snippet_lines = new Array();
var header_set = {};

function addHeader(text) {
  if (text in header_set) { return;	}	
  header_set[text] = 1;
  var header = "<h2>" + text + "</h2>";
  snippet_lines[snippet_lines.length] = header;
}

function addPara(text) {
  var para = "<p>" + text + "</p>";
  snippet_lines[snippet_lines.length] = para;	
}

function extractParas($) {
  // todo:maybe count the number of words and keep going to reach word count rather than para count
  var max_paras = 3;
  $("div p").each(function(i) {
    if (i < max_paras) { 
      $(this).parent().prevAll(":header").each(function(j) {
	    addHeader($(this).text().trim());
	  });
	  $(this).prevAll(":header").each(function(j) {
	    addHeader($(this).text().trim());
	  });
	  addPara($(this).text().trim());	
	}
  });
  // todo:could do a search for headers and add any that have not been picked up so far
}

function extractSnippet(url, callback) {
  scraper.scrape(url, function(data, err) {
    if ((err == undefined) && data) {
      var $ = cheerio.load(data);
      var num_paras = $("div p").length;
      if (num_paras > 3) {
	    extractParas($);
	    callback(snippet_lines);
      } else {
	    callback(null, "Not enough paras found in page.");
      }
    }
    else {
	  callback(null, err);
	} 
  });
}

exports.extractSnippet = extractSnippet;
	