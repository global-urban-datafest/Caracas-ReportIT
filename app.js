<<<<<<< HEAD

var express = require('express'), 
    http    = require('http'),
    app     = express(),
    server  = http.createServer(app),
	port    = 6969,
    path    = require('path');

var general = require('./router/get');
var func = require('./router/func');

=======
>>>>>>> 10ff92dab77e3de113b75fd2b825cf7bf4603d32
var express    = require('express'), 
    http       = require('http'),
	bodyParser = require('body-parser'),
	path       = require('path'),
	app        = express();

var general  = require('./router/get'),
    problema = require('./router/problema');

app.set('port', process.env.PORT || 6969);
<<<<<<< HEAD

=======
>>>>>>> 10ff92dab77e3de113b75fd2b825cf7bf4603d32
	
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', __dirname + '/views');

app.configure(function() {
	app.use(express.static(__dirname));
});

<<<<<<< HEAD

app.get("/", function(req,res){
	res.render("index.jade", 
		{
			title : "Report.IT ", 
			name : "yo!",
			tituloTabla : 'Problemas presentados en el municipio xD',
			actionTable : ['Editar', 'Borrar', 'Ir al problema'],
			columnsName : ['Problema','Categoria','Municipio','Usuario afectado', 'Estatus', 'Seleccione']
			//rowData 	: problema.buscarProblemas()
		});
});

app.get('/test/:hola', func.algo);

app.get('/paises', general.paises);

=======
app.get('/', function(req, res) {
	res.render('index.jade', {title : 'Chat con NodeJS, Express, Socket.IO y jQuery', name : ''});
});

app.get('/paises', general.paises);
>>>>>>> 10ff92dab77e3de113b75fd2b825cf7bf4603d32
app.get('/pais/:id', general.pais);

app.get('/estados/:pais', general.estados);
app.get('/estado/:id', general.estado);

app.get('/ciudades/:estado', general.ciudades);
app.get('/ciudad/:id', general.ciudad);

app.get('/municipios/:ciudad', general.municipios);
app.get('/municipio/:id', general.municipio);

app.get('/subcategorias', general.subcategorias);
app.get('/subcategoria/:id', general.subcategoria);

app.get('/problemas', problema.buscarProblemas);
app.post('/problema', problema.crearProblema);
app.post('/problema/certificar', problema.certificarProblema);
app.post('/problema/comentar', problema.comentarProblema);
app.put('/problema/cambiarEstatus', problema.cambiarEstatusProblema);


http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
