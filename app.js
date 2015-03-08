var express = require('express'), 
    http    = require('http'),
    app     = express(),
    server  = http.createServer(app),
	port    = 6969,
    path    = require('path');

var general = require('./router/get');
var func = require('./router/func');
	
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', __dirname + '/views');

app.configure(function(){
	app.use(express.static(__dirname));
});

app.get("/", function(req,res){
	res.render("index.jade", 
		{
			title : "Report.IT ", 
			name : "yo!",
			tituloTabla : 'Problemas presentados en el municipio xD',
			actionTable : ['Editar', 'Borrar', 'Ir al problema'],
			columnsName : ['Problema','Categoria','Municipio','Usuario afectado', 'Estatus', 'Seleccione'],
			rowData 	: [
				{
					"latitud":"-66.857541",
					"longitud":"10.493849",
					"id_dispositivo":"1",
					"estatus":"Reportado",
					"id_municipio":1,
					"id_sub_categoria":1,
					"id_tipo_problema":1,
					"usuario":"Yiin",
					"problema":"Calle cerrada por construccion y lleva 2 meses la construccion"
				},
				{
					"latitud":"-66.857541",	
					"longitud":"10.493849",
					"id_dispositivo":"1",
					"estatus":"Reportado",
					"id_municipio":1,
					"id_sub_categoria":1,
					"id_tipo_problema":1,
					"usuario":"Yiinco",
					"problema":"Poste de luz caido"
				}
			]
		});
});

app.get('/test/:hola', func.algo);

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


var io = require("socket.io").listen(server);

io.sockets.on('connection', function(socket) 
{
	socket.on("hola", function(username)
	{
		socket.emit("aja", {name:username});
	});
});