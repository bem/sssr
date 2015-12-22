modules.require(['twitter'], function(twitter) {

var fs = require('fs'),
    PATH = require('path'),
    VM = require('vm'),
    express = require('express'),
    app = express(),
    url = require('url'),
    querystring = require('querystring'),
    moment = require('moment'),
    Vow = require('vow'),
    pathToBundle = PATH.join('.', 'desktop.bundles', 'index'),
    BEMTREE = require(PATH.join('../../' + pathToBundle, 'index.bemtree.js')).BEMTREE,
    BEMHTML = require(PATH.join('../../' + pathToBundle, 'index.bemhtml.js')).BEMHTML;

app.use(express.static(pathToBundle));

app.get('/search', function(req, res) {

    var dataEntries = [],
        searchObj = url.parse(req.url, true).query,
        queryString = querystring.escape(searchObj.query),
        servicesEnabled = [];

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
                if (searchObj.json) {
                    return res.end(JSON.stringify(bemjson, null, 4));
                }
                res.end(BEMHTML.apply(bemjson));
            });

        })
        .fail(function() {
            console.error(arguments);
        });
    });

    var server = app.listen(process.env.QLOUD_HTTP_PORT || 3000, function() {
        console.log('Listening on port %d', server.address().port);
    });

});
