modules.require(['instagram', 'twitter', 'yafotki', 'yablogs'], function(instagram, twitter, yafotki, yablogs) {

var fs = require('fs'),
    PATH = require('path'),
    VM = require('vm'),
    HTTP = require('http'),
    express = require('express'),
    app = express(),
    url = require('url'),
    querystring = require('querystring'),
    morgan         = require('morgan'),
    Vow = require('vow'),
    pathToBundle = PATH.join('.', 'desktop.bundles', 'index');

app
    .disable('x-powered-by')
    .use(morgan('dev'))
    .use(express.static(pathToBundle));

var bemtreeTemplate = fs.readFileSync(PATH.join(pathToBundle, 'index.bemtree.js'), 'utf-8'),
    BEMHTML = require(PATH.join('../../' + pathToBundle, 'index.bemhtml.js')).BEMHTML;

var context = VM.createContext({
    console: console,
    Vow: Vow
});

VM.runInContext(bemtreeTemplate, context);
BEMTREE = context.BEMTREE;

app.get('/search', function(req, res) {

    var dataEntries = [];

    searchObj = url.parse(req.url, true).query;
    var queryString = querystring.escape(searchObj.query),
        servicesEnabled = [];

    searchObj.twitter && servicesEnabled.push(twitter.get(queryString));
    searchObj.instagram && servicesEnabled.push(instagram.get(queryString));
    searchObj.yafotki && servicesEnabled.push(yafotki.get(queryString));
    searchObj.yablogs && servicesEnabled.push(yablogs.get(queryString));

    Vow.all(servicesEnabled)
        .then(function(results) {

            Object.keys(results).map(function(idx) {
                dataEntries = dataEntries.concat(results[idx]);
            });

            dataEntries.sort(function(a, b) {
                return b.createdAt.getTime() - a.createdAt.getTime();
            });

            BEMTREE.apply(dataEntries.map(function(dataEntry) {
                return {
                    block: 'island',
                    data: dataEntry,
                    mods: { type: dataEntry.type }
                };
            }))
            .then(function(bemjson) {
                if (searchObj.json) {
                    return res.end(JSON.stringify(bemjson, '\n', 4));
                }
                res.end(BEMHTML.apply(bemjson));

            });

        })
        .fail(function() {
            console.error('FAIL! ##############');
           console.error(arguments);
        });
    });

    var server = app.listen(3000, function() {
        console.log('Listening on port %d', server.address().port);
    });

});
