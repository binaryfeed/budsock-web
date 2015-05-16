var connect = require('connect')
  , path = require('path')
  , port = process.env.PORT || 9090;

console.log("listening at http://localhost:" + port)
connect().use(connect.static(path.join(__dirname, 'public'))).listen(port)
