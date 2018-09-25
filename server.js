const express = require('express');
const path = require('path');
const compression = require('compression');
const proxy = require('http-proxy-middleware');
const app = express();
app.use(compression());
app.use(express.static(__dirname + '/dist'));
//后端代理服务器
const serverProxy = new proxy({
  target: 'http://beta-mplanetcms.jd.com'
});
app.use('/api/*', serverProxy);
app.use('/files/*', serverProxy);
app.use(
  '/agent/*',
  proxy({
    target: 'http://localhost:8010',
    pathRewrite: { '/agent/[0-9]*': '/' }
  })
);
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});
const server = app.listen(8010, '0.0.0.0', function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('server listening at http://%s:%s', host, port);
});
