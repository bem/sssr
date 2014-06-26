modules.require(['twitter'], function(twitter) {

var fs = require('fs'),
    PATH = require('path'),
    VM = require('vm'),
    express = require('express'),
    app = express(),
    url = require('url'),
    querystring = require('querystring'),
    moment = require('moment'),
    morgan = require('morgan'),
    argv = require('optimist').argv,
    cocaine = require('cocaine'),
    http = cocaine.spawnedBy() ? cocaine.http : require('http'),
    sssrQueries = [],

    Vow = require('vow'),
    pathToBundle = PATH.join(process.cwd(), 'desktop.bundles', 'index'),
    BEMTREE = require(PATH.join(pathToBundle, 'index.bemtree.js')).BEMTREE,
    BEMHTML = require(PATH.join(pathToBundle, 'index.bemhtml.js')).BEMHTML;

app
    .disable('x-powered-by')
    .use(morgan('dev'))
    .use(express.static(pathToBundle));

app.get('/search', function(req, res) {

    var dataEntries = [],
        searchObj = url.parse(req.url, true).query,
        queryString = querystring.escape(searchObj.query),
        servicesEnabled = [],
        currentTime = Math.round(Date.now()/1000);

    searchObj.twitter && servicesEnabled.push(twitter.get(queryString));

    Vow.all(servicesEnabled)
        .then(function(results) {

            // Склеиваем результаты поиска в один массив,
            // понадобится при добавлении сервисов
            Object.keys(results).map(function(idx) {
                dataEntries = dataEntries.concat(results[idx]);
            });

            // Сортируем ответы по дате
            dataEntries.sort(function(a, b) {
                return b.createdAt.valueOf() - a.createdAt.valueOf();
            });

            // Формируем BEMJSON из ответов с помощью BEMTREE шаблонов
            BEMTREE.apply(dataEntries.map(function(dataEntry) {
                dataEntry.createdAt = moment(dataEntry.createdAt).fromNow();
                return {
                    block: 'island',
                    data: dataEntry,
                    mods: { type: dataEntry.type }
                };
            }))
            .then(function(bemjson) {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "X-Requested-With");
                res.header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
                if (searchObj.json) {
                    return res.end(JSON.stringify(bemjson, '\n', 4));
                }
                var html = BEMHTML.apply(bemjson);
                sssrQueries[queryString] = {
                    html: html,
                    timestamp: Math.round(Date.now()/1000)
                }

                res.end(html);

            })
            .fail(console.error);
        });
});

var server = http.createServer(app),
    port = process.env.PORT || 3000;

if(cocaine.spawnedBy()) {
    var W = new cocaine.Worker(argv),
        handle = W.getListenHandle('http');

    server.listen(handle, function() {
        console.log('listening on cocaine handle');
    });
} else {
    server.listen(port, function() {
        console.log('listening on port', server.address().port);
    });
}

});
