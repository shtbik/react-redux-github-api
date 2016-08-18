var express = require('express')
var app = new (express)()
var port = 3000

var webpack = require('webpack')
var config = require('./webpack.config')
// var webpackDevMiddleware = require('webpack-dev-middleware')


// var compiler = webpack(config)
// app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath, lazy: false}))
// app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname + '/static'))

app.get('*', function(request, response){
  response.sendFile(__dirname + '/static/index.html')
})

app.listen(port, function(error) {
	if (error) {
		console.error(error)
	} else {
		console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
	}
})