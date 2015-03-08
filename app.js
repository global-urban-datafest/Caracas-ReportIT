var express = require('express'), 
    http    = require('http'),
    app     = express(),
    server  = http.createServer(app),
	port    = 6969,
    path    = require('path');

var general = require('./router/get');
	
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', __dirname + '/views');

app.configure(function(){
	app.use(express.static(__dirname));
});

app.get('/', function(req, res){
	res.render('index.jade', {title : 'Chat con NodeJS, Express, Socket.IO y jQuery', name : ''});
});

app.get('/pais', general.paises);
app.get('/pais/:id', general.pais);

app.get('/estado/:pais', general.estados);
app.get('/estado/:id', general.estado);

app.get('/ciudad/:estado', general.ciudades);
app.get('/ciudad/:id', general.ciudad);

app.get('/municipio/:ciudad', general.municipios);
app.get('/municipio/:id', general.municipio);

server.listen(port, function() {
    console.log('Express server listening on port ' + port);
});
