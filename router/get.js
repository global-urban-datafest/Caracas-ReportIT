var connection = require('../config/db');

exports.paises = function(req, res) {
    var sql = 'SELECT id_pais, pais FROM report_it.tb_pais WHERE activo = 1';
	
	if (connection) {
        connection.db.query(sql, null, function(err, result) {
            if (err) throw err;
            res.contentType('application/json');
            res.write(JSON.stringify(result));
            res.end();
        });
    }
};

exports.pais = function(req, res) {
    var id = req.params.id;
	var sql = 'SELECT id_pais, pais FROM report_it.tb_pais WHERE id_pais = ? AND activo = 1';
	
    if (connection) {
        connection.db.query(sql, [id], function(err, result) {
            if (err) throw err;
            res.contentType('application/json');
            res.write(JSON.stringify(result));
            res.end();
        });
    }
};

exports.estados = function(req, res) {
    var pais = req.params.pais;
	var sql = 'SELECT id_estado, estado FROM report_it.tb_estado WHERE id_pais = ? AND activo = 1';
	
	if (connection) {
        connection.db.query(sql, [pais], function(err, result) {
            if (err) throw err;
            res.contentType('application/json');
            res.write(JSON.stringify(result));
            res.end();
        });
    }
};

exports.estado = function(req, res) {
    var id = req.params.id;
	var sql = 'SELECT id_estado, estado FROM report_it.tb_estado WHERE id_estado = ? AND activo = 1';
	
    if (connection) {
        connection.db.query(sql, [id], function(err, result) {
            if (err) throw err;
            res.contentType('application/json');
            res.write(JSON.stringify(result));
            res.end();
        });
    }
};

exports.ciudades = function(req, res) {
    var estado = req.params.estado;
	var sql = 'SELECT id_ciudad, ciudad FROM report_it.tb_ciudad WHERE id_estado = ? AND activo = 1';
	
	if (connection) {
        connection.db.query(sql, [pais], function(err, result) {
            if (err) throw err;
            res.contentType('application/json');
            res.write(JSON.stringify(result));
            res.end();
        });
    }
};

exports.ciudad = function(req, res) {
    var id = req.params.id;
	var sql = 'SELECT id_ciudad, ciudad FROM report_it.tb_ciudad WHERE id_ciudad = ? AND activo = 1';
	
    if (connection) {
        connection.db.query(sql, [id], function(err, result) {
            if (err) throw err;
            res.contentType('application/json');
            res.write(JSON.stringify(result));
            res.end();
        });
    }
};

exports.municipios = function(req, res) {
    var ciudad = req.params.ciudad;
	var sql = 'SELECT id_municipio, municipio FROM report_it.tb_municipio WHERE id_ciudad = ? AND activo = 1';
	
	if (connection) {
        connection.db.query(sql, [pais], function(err, result) {
            if (err) throw err;
            res.contentType('application/json');
            res.write(JSON.stringify(result));
            res.end();
        });
    }
};

exports.municipio = function(req, res) {
    var id = req.params.id;
	var sql = 'SELECT id_municipio, municipio FROM report_it.tb_municipio WHERE id_ciudad = ? AND activo = 1';
	
    if (connection) {
        connection.db.query(sql, [id], function(err, result) {
            if (err) throw err;
            res.contentType('application/json');
            res.write(JSON.stringify(result));
            res.end();
        });
    }
};

exports.subcategorias = function(req, res) {
	var sql = 'SELECT id_sub_categoria, sub_categoria, id_categoria, FLOOR(RAND() * 401) + 100 AS contador FROM report_it.tb_sub_categoria WHERE activo = 1';
	
    if (connection) {
        connection.db.query(sql, null, function(err, result) {
            if (err) throw err;
            res.contentType('application/json');
            res.write(JSON.stringify(result));
            res.end();
        });
    }
};

exports.subcategoria = function(req, res) {
	var id = req.params.id;
	var sql = 'SELECT id_sub_categoria, sub_categoria, id_categoria, FLOOR(RAND() * 101) + 1 AS contador FROM report_it.tb_sub_categoria WHERE id_sub_categoria = ? AND activo = 1';
	
    if (connection) {
        connection.db.query(sql, [id], function(err, result) {
            if (err) throw err;
            res.contentType('application/json');
            res.write(JSON.stringify(result));
            res.end();
        });
    }
};