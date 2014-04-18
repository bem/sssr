var Vow = require('vow'),
    Twitter = require('twit'),
    config = require('./service_type_twitter.config');

var twit = new Twitter(config);

modules.define('twitter', function(provide) {

    provide({
        get: function(query) {
            var dfd = Vow.defer();

            twit.get('search/tweets', { q: query, count: 20 }, function(err, res) {

                if (err) {
                    console.error(err);
                    dfd.reject(err);
                }

                dfd.resolve(res.statuses.map(function(status) {
                    return {
                        avatar: status.user.profile_image_url,
                        userName: status.user.name,
                        userNick: status.user.screen_name,
                        postLink: 'https://twitter.com/' + status.user.screen_name,
                        createdAt:  new Date(status.created_at),
                        text: status.text,
                        type: 'twitter'
                    };
                }));
            });

            return dfd.promise();

        }
    });


});
