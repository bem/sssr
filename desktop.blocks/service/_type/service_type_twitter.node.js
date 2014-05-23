var vow = require('vow'),
    moment = require('moment'),
    twitter = require('twit'),
    twitterText = require('twitter-text'),
    config = require('./service_type_twitter.config'),
    path = require('path'),
    fs = require('fs');

var twit = new twitter(config);

modules.define('twitter', function(provide) {

    provide({
        get: function(query) {
            var dfd = vow.defer();

            if (process.env.GOLOCAL) {
                fs.readFile(path.resolve('twitter.mockup.json'), function(err, content) {
                    content = JSON.parse(content);
                    content = content.map(function(i) {
                        i.avatar = path.join('images', i.avatar.split('/').pop());
                        return i;
                    });

                    dfd.resolve(content);
                });

                return dfd.promise();
            }

            twit.get('search/tweets', { q: query, count: 20 }, function(err, res) {

                if (err) {
                    console.error(err);
                    dfd.resolve([]);
                }

                var result = res.statuses.slice(0, 10).map(function(status) {
                    return {
                        avatar: status.user.profile_image_url,
                        userName: status.user.name,
                        userNick: status.user.screen_name,
                        postLink: 'https://twitter.com/' + status.user.screen_name,
                        createdAt:  moment(status.created_at),
                        text: twitterText.autoLink(twitterText.htmlEscape(status.text)),
                        type: 'twitter'
                    };
                });

                // uncomment to update mockup
                // fs.writeFileSync('twitter.mockup.json', JSON.stringify(result));

                dfd.resolve(result);
            });

            return dfd.promise();

        }
    });


});
