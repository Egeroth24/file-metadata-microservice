const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer({dest:'uploads/'}); // Initialises Multer and stores files in /uploads
const fs = require('fs');

app.use(express.static('public')); // Serves static files in the public directory.
app.use('/favicon.ico', express.static('/public/favicon.ico')); // Serves a favicon.

app.get('', function(req, res) { // Serves an index.html with description and usage examples.
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/upload', upload.single('file'), function(req, res) { // Uses Multer to get filesize and sends response object.
    let json = {'fileSize': req.file.size + ' bytes'};
    res.json(json);
    fs.unlink(req.file.path, function(err) { // Deletes the file after usage.
        if (err) console.log(err);
    });
});

let listener = app.listen(process.env.PORT || 3000, function () { // Starts server on PORT environment variable, or 3000 if no variable is provided.
    console.log('Good to go! Node listening on port ' + listener.address().port + '.');
});