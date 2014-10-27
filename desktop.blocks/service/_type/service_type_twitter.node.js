modules.define('twitter', function(provide) {

var vow = require('vow'),
    moment = require('moment'),
    twitter = require('twit'),
    twitterText = require('twitter-text'),
    config = require('./service_type_twitter.config'),
    twit = new twitter(config);

    provide({
        get: function(query) {
            var dfd = vow.defer();

            twit.get('search/tweets', { q: query, count: 20 }, function(err, res) {

                if (err) {
                    console.error(err);
                    dfd.resolve([]);
                }

                dfd.resolve(res.statuses.map(function(status) {
                    return {
                        avatar: status.user.profile_image_url,
                        userName: status.user.name,
                        userNick: status.user.screen_name,
                        postLink: 'https://twitter.com/' + status.user.screen_name,
                        createdAt:  moment(status.created_at),
                        text: twitterText.autoLink(twitterText.htmlEscape(status.text)),
                        type: 'twitter'
                    };
                }));
            });

            return dfd.promise();

        }
    });


});
