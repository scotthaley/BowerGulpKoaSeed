var koa = require('koa');
var render = require('koa-swig');
var path = require('path');
var app = koa();

app.context.render = render({
    root: path.join(__dirname, 'views'),
    autoescape: true,
    ext: 'swig'
});

app.use(function *() {
    yield this.render('index');
});

app.listen(8080);
