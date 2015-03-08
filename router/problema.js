var connection = require('../config/db'),
    Q          = require('q');
	
exports.buscarProblemas = function(req, res) {
	var sql = 
		'SELECT ' + 
			'prob.problema AS problema, ' + 
			'prob.longitud AS longitud,  ' + 
			'prob.latitud AS latitud, ' + 
			'prob.id_estatus AS id_estatus, ' + 
			'prob.id_municipio AS id_municipio, ' + 
			'prob.id_sub_categoria AS id_sub_categoria, ' + 
			'subcat.sub_categoria AS sub_categoria, ' + 
			'prob.id_tipo_problema AS id_tipo_problema, ' + 
			'tipoprob.tipo AS tipo_problema, ' + 
			'prob.id_usuario AS id_usuario,  ' + 
			'usuario.usuario AS usuario, ' + 
			'img.imagen ' + 
		'FROM  ' + 
			'report_it.tb_problema AS prob ' + 
			'INNER JOIN ' + 
			'report_it.tb_tipo_problema AS tipoprob ' + 
			'ON prob.id_tipo_problema =  tipoprob.id_tipo_problema ' + 
			'INNER JOIN  ' + 
			'report_it.tb_sub_categoria AS subcat ' + 
			'ON prob.id_sub_categoria =  subcat.id_sub_categoria  ' + 
			'INNER JOIN  ' + 
			'report_it.tb_usuario AS usuario  ' + 
			'ON prob.id_usuario =  usuario.id_usuario  ' + 
			'LEFT OUTER JOIN  ' + 
			'report_it.tb_problema_imagen AS pi  ' + 
			'ON prob.id_problema = pi.id_problema  ' + 
			'LEFT OUTER JOIN  ' + 
			'report_it.tb_imagen AS img  ' + 
			'ON pi.id_imagen = img.id_imagen  ' + 
		'LIMIT 10;';
		
	if (connection) {
		connection.db.query(
			sql,
			null,
			function(err, result) {
				if (err) throw err;
				res.contentType('application/json');
				res.write(JSON.stringify(result));
				res.end();
			});
		}
};
	
exports.crearProblema = function(req, res) {

	var callback_1 = function(id_imagen, id_tipo_imagen) {
		var deferred = Q.defer();
		var sql = 
			'SET @id_imagen = -1; ' +
			'INSERT INTO report_it.tb_imagen (imagen, id_tipo_imagen) ' +
			'VALUES (?, ?); ' +
			'SET @id_imagen = LAST_INSERT_ID(); ' +
			'SELECT @id_imagen AS id_imagen;';
			
		connection.db.query(
			sql,
			[id_imagen, id_tipo_imagen],
			function(err, result) {
				if (err) deferred.reject(err);
				
				if (result.length <= 0)
					deferred.reject(JSON.stringify({ msg : 'ERROR - ! - Error buscando datos' }));				
				else                   
					deferred.resolve(result[3][0]['id_imagen']);
			}
		);
		
		return deferred.promise;
	};
	
	var callback_2 = function(id_imagen) {
		var sql =
			'SET @id_problema = -1; ' +
			'INSERT INTO report_it.tb_problema (problema, latitud, longitud, id_tipo_problema, id_sub_categoria, id_municipio, id_estatus, id_usuario, id_dispositivo, id_grupo) ' +
			'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?); ' +
			(
				id_imagen != null
				?	'SET @id_problema = LAST_INSERT_ID(); ' +
					'INSERT INTO report_it.tb_problema_imagen (id_problema, id_imagen) ' +
					'VALUES (@id_problema, ?);'
				: ''
			);
			
		if (connection) {
			connection.db.query(
				sql,
				[
					req.body.problema,
					req.body.latitud,
					req.body.longitud,
					req.body.id_tipo_problema,
					req.body.id_sub_categoria,
					req.body.id_municipio,
					req.body.id_estatus,
					typeof req.body.id_usuario !== undefined && req.body.id_usuario != null && req.body.id_usuario > 0 ? req.body.id_usuario : null,
					typeof req.body.id_dispositivo !== undefined && req.body.id_dispositivo != null && req.body.id_dispositivo > 0 ? req.body.id_dispositivo : null,
					typeof req.body.id_grupo !== undefined && req.body.id_grupo != null && req.body.id_grupo > 0 ? req.body.id_grupo : null,
					id_imagen
				],
				function(err, result) {
					if (err) throw err;
					res.contentType('application/json');
					res.write(JSON.stringify(result));
					res.end();
				});
		}
	};
	
	if (typeof req.body.imagen !== undefined && req.body.imagen != null && typeof req.body.id_tipo_imagen !== undefined && req.body.id_tipo_imagen != null && req.body.id_tipo_imagen > 0) {
		callback_1(req.body.imagen, req.body.id_tipo_imagen).then(
			callback_2,
			function(err) {
				throw err;
			}
		);
	}
	else {
		callback_2(null);
	}
};

exports.certificarProblema = function(req, res) {
	var sql =
		'INSERT INTO report_it.tb_usuario_problema (id_usuario, id_problema) ' +
		'VALUES (?, ?);';
	
	if (connection) {
		connection.db.query(
			sql,
			[
				req.body.id_usuario,
				req.body.id_problema
			],
			function(err, result) {
				if (err) throw err;
				res.contentType('application/json');
				res.write(JSON.stringify(result));
				res.end();
			});
	}
};

exports.comentarProblema = function(req, res) {
	var sql =
		'INSERT INTO report_it.tb_problema_comentario (id_problema, id_usuario, comentario) ' +
		'VALUES (?, ?, "");';

	
	if (connection) {
		connection.db.query(
			sql,
			[
				req.body.id_problema,
				req.body.id_usuario,
				req.body.comentario
			],
			function(err, result) {
				if (err) throw err;
				res.contentType('application/json');
				res.write(JSON.stringify(result));
				res.end();
			});
	}
};

exports.cambiarEstatusProblema = function(req, res) {
	var sql =
		'UPDATE report_it.tb_problema ' +
		'SET id_estatus = ? ' +
		'WHERE id_problema = ?;';
	
	if (connection) {
		connection.db.query(
			sql,
			[
				req.body.id_estatus,
				req.body.id_problema
			],
			function(err, result) {
				if (err) throw err;
				res.contentType('application/json');
				res.write(JSON.stringify(result));
				res.end();
			});
	}
};