var vow = require('vow'),
    http = require('http');

modules.define('yafotki', function(provide) {
    provide({
        get: function(query) {
            var dfd = vow.defer(),
                feedData = '';

            var searchUrl = 'http://fotki.yandex.ru/rss/search.xml?text=' + query + '&skin=json';

            http.get(searchUrl, function(res) {
                res.setEncoding('utf8');
                res.on('data', function(chunk) {
                    feedData += chunk;
                });
                res.on('end', function() {
                    feedData = JSON.parse(feedData);
                    dfd.resolve(feedData[0].items.map(function(media) {
                        return {
                            imageUrl: media.thumb.substr(0, media.thumb.length - 1) + 'L',
                            postLink: media.link,
                            createdAt: new Date(media.time),
                            alt: media.title,
                            type: 'yafotki'
                        };
                    }))
                });
                res.on('error', function() { dfd.resolve([]) });
            });
        return dfd.promise();
        }
    });
});