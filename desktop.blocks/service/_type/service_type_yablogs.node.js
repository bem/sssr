var vow = require('vow'),
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
                       var items = result.rss.channel[0].item;
                       dfd.resolve(items.map(function(item) {
                           return {
                               postLink: item.link,
                               title: item.title,
                               createdAt:  new Date(item.pubDate),
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
           })
       }
   });
});