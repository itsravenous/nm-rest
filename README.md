# nm-vpn-rest
RESTful API frontend to [node-nm-vpn](https://github.com/itsravenous/node-nm-vpn). Please see that module's page for important setup information.

## Setup
Copy `config.example.json` to `config.json` and set the values as desired:

```
{
	"secure": false,
	"host": "my-server.name",
	"port": 3000,
	"allowedClients": {
		"http://my-server.name:8080"
	}
}
```

Hints:
- `allowedClients` is an origin whitelist for the [cors](https://npmjs.org/package/cors). I use the [nm-vpn-web](https://github.com/itsravenous/nm-vpn-web) web app served on the same Raspberry Pi as this app runs; in this case I only need one origin. If, however, you wish to use the API in web apps from various devices then you'll need to ad each origin to this list to avoid CORS errors (if you're building non-web clients, e.g. [Cordova](https://cordova.apache.org) applications, then you obviously need to worry about CORS; indeed, **the whitelist will not prevent non-web clients from connecting**)
- `secure` toggles the use of HTTPS.

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
