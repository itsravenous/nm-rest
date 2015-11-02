# nm-vpn-rest
RESTful API frontend to [node-nm-vpn](https://github.com/itsravenous/node-nm-vpn). Please see that module's page for important setup information.

## Setup
Copy `config.example.json` to `config.json` and set the values as desired:

```
{
	"secure": false,
	"host": "my-server.name",
	"port": 3000
}
```

The `secure` setting toggles the use of HTTPS.

## Usage
API entry point (lists connections with links to individual resource):

`GET /connections`

Retrieve a individual connection resource:

`curl -X GET /connections/b1ed3626-80f1-11e5-8bcf-feff819cdc9f`

Bring a connection up:

`curl -X PUT http://my-server.name:3000/connections/b1ed3626-80f1-11e5-8bcf-feff819cdc9f -h 'Content-Type: application/json' -d '{"up": false}'`

Take a connection down:

`curl -X PUT http://my-server.name:3000/connections/b1ed3626-80f1-11e5-8bcf-feff819cdc9f -h 'Content-Type: application/json' -d '{"up": false}'`

(I know, The above should be using `PATCH`; I'll get to it).
