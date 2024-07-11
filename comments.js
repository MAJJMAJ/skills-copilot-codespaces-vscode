// create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

// create server
http.createServer(function(request, response) {
  var pathname = url.parse(request.url).pathname;
  var query = url.parse(request.url, true).query;
  var page = query.page;
  var id = query.id;

  if (pathname === '/') {
    if (!page) {
      page = 1;
    }

    fs.readFile(`./views/index${page}.html`, 'utf8', function(err, data) {
      if (err) {
        console.log(err);
        response.writeHead(404, {'Content-Type': 'text/html'});
        response.end('Not Found');
      } else {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(data);
      }
    });
  } else if (pathname === '/create_comment') {
    fs.readFile('./views/create_comment.html', 'utf8', function(err, data) {
      if (err) {
        console.log(err);
        response.writeHead(404, {'Content-Type': 'text/html'});
        response.end('Not Found');
      } else {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(data);
      }
    });
  } else if (pathname === '/create_process') {
    var body = '';
    request.on('data', function(data) {
      body = body + data;
    });
    request.on('end', function() {
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;

      fs.writeFile(`./data/${title}`, description, 'utf8', function(err) {
        if (err) {
          console.log(err);
          response.writeHead(404, {'Content-Type': 'text/html'});
          response.end('Not Found');
        } else {
          response.writeHead(302, {Location: `/?id=${title}`});
          response.end();
        }
      });
    });
  } else if (pathname === '/update_comment') {
    fs.readFile(`./views/update_comment.html`, 'utf8', function(err, data) {
      if (err) {
        console.log(err);
        response.writeHead(404, {'Content-Type': 'text/html'});
        response.end('Not Found');
      } else {
        response.writeHead(200, {'Content-Type': 'text