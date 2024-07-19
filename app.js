//Install express server
const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const app = express();

//Load certificates
const options = {
    key: fs.readFileSync(__dirname + '/cert/apr.automatic-pr.com_key.txt'),
    cert: fs.readFileSync(__dirname + '/cert/apr.automatic-pr.com.crt')
  };

// Serve only the static files form the dist directory
app.use(express.static(__dirname + `/dist`));
// app.use(express.static(__dirname + '/sample'));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + `/dist/index.html`));
});

// Start the app by listening on the default Heroku port
// let port = process.env.PORT || 8080;
// console.log('Webserver Init');
// console.log('Listening on port: ' + port);
// app.listen(port);

https.createServer(options, app).listen(443, () => {
    console.log('Server is running on https://localhost:443');
});
