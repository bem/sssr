var fs = require('fs'),
    path = require('path'),
    request = require('request');

var download = function(uri, filename) {
    request(uri).pipe(fs.createWriteStream(filename));
};

var services = JSON.parse(fs.readFileSync('instagram.mockup.json', 'utf-8'))
    .concat(JSON.parse(fs.readFileSync('twitter.mockup.json', 'utf-8')));

services.forEach(function(i) {
    i.imageUrl && download(i.imageUrl, path.join('images', i.imageUrl.split('/').pop()));
    download(i.avatar, path.join('images', i.avatar.split('/').pop()));
});
