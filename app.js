var restify = require('restify'),
	connectionManager = require('node-nm-vpn');

var server = restify.createServer({
	name: 'nm-vpn-rest',
	version: '0.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

/**
 * Adds links to a connection object
 * @param {Connection} The connection to which links are to be added
 * @return {Connection} The connection, with links added
 */
var injectLinksIntoConnection = function(connection) {
	connection._links = [
		{
			rel: 'self',
			href: '/connections/'  + connection.id
		}
	];

	return connection;
};

/**
 * Gets a connection given a UUID
 * @param {String} id Connection UUID
 * @return {Connection|null}
 */
var getConnectionById = function(id) {
	var connections = connectionManager.connections,
		connection = connections.filter(function (con) {
			return con.id === id;
		}).pop();

	if (connection) {
		connection = injectLinksIntoConnection(connection);
	}

	return connection ? connection : null;
};

server.get('/connections', function (req, res, next) {
	res.send(connectionManager.connections.map(function (connection) {
		return injectLinksIntoConnection(connection);
	}));
	return next();
});

server.get('/connections/:id', function (req, res, next) {
	res.send(getConnectionById(req.params.id));
});

server.put('/connections/:id', function (req, res, next) {
	var connection = getConnectionById(req.params.id);

	if (connection) {
		if (req.body.state === 'up') {
			connectionManager.up(connection.id);
			res.send(connection);
		} else if (req.body.state === 'down') {
			connectionManager.down(connection.id);
			res.send(connection);
		} else {
			res.status(400);
			res.send(new Error('Invalid connection state: ' + req.body.state));
		}
	}
});

server.listen(8080, function () {
	console.log('%s listening at %s', server.name, server.url);
});

