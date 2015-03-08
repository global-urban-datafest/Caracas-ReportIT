var express    = require('express'), 
    http       = require('http'),
	bodyParser = require('body-parser'),
	path       = require('path'),
	app        = express();

var general  = require('./router/get'),
    problema = require('./router/problema');

app.set('port', process.env.PORT || 6969);
	
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', __dirname + '/views');

app.configure(function() {
	app.use(express.static(__dirname));
});

app.get('/', function(req, res) {
	res.render('index.jade', {title : 'Chat con NodeJS, Express, Socket.IO y jQuery', name : ''});
});

app.get('/paises', general.paises);
app.get('/pais/:id', general.pais);

app.get('/estados/:pais', general.estados);
app.get('/estado/:id', general.estado);

app.get('/ciudades/:estado', general.ciudades);
app.get('/ciudad/:id', general.ciudad);

app.get('/municipios/:ciudad', general.municipios);
app.get('/municipio/:id', general.municipio);

app.get('/subcategorias', general.subcategorias);
app.get('/subcategoria/:id', general.subcategoria);

app.post('/problema', problema.crearProblema);
app.post('/problema/certificar', problema.certificarProblema);
app.post('/problema/comentar', problema.comentarProblema);
app.put('/problema/cambiarEstatus', problema.cambiarEstatusProblema);

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
