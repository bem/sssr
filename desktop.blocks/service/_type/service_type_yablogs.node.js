var vow = require('vow'),
    moment = require('moment'),
    http = require('http'),
    parser = require('xml2js').Parser();

modules.define('yablogs', function(provide) {

   provide({
       get: function(query) {
           var dfd = vow.defer(),
               resData = '',
               feedUrl = 'http://blogs.yandex.ru/search.rss?text=' + query;

           http.get(feedUrl, function(res) {
               res.setEncoding('utf8');

               res.on('data', function(chunk) {
                   resData += chunk;
               });

               res.on('end', function() {
                   parser.parseString(resData, function (err, result) {
                       if (err) {
                           return dfd.resolve([]);
                       }
                       var items = result.rss.channel[0].item;
                       if (!items) return dfd.resolve([]);
                       dfd.resolve(items.map(function(item) {
                           return {
                               userName: (item['yablogs:journal'][0]._ || item['yablogs:author'][0]._),
                               postLink: item.link,
                               title: item.title,
                               createdAt:  moment(item.pubDate, "ddd, DD MMM YYYY HH:mm:SS"),
                               text: item.description[0],
                               type: 'yablogs'
                           };
                       }));
                   });
               });

               res.on('error', function(err) {
                   console.error(err);
                   dfd.resolve([]);
               });
           });

           return dfd.promise();
       }
   });
});
