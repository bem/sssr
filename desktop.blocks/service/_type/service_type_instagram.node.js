var vow = require('vow'),
    instagram = require('instagram-node').instagram(),
    querystring = require('querystring'),
    config = require('./service_type_instagram.config'),
    path = require('path'),
    fs = require('fs');

instagram.use(config);

modules.define('instagram', function(provide) {
    provide({
        get: function(query) {
            var dfd = vow.defer();

            if (process.env.GOLOCAL) {
                fs.readFile(path.resolve('instagram.mockup.json'), function(err, content) {
                    content = JSON.parse(content);
                    content = content.map(function(i) {
                        i.imageUrl = path.join('images', i.imageUrl.split('/').pop());
                        return i;
                    });

                    dfd.resolve(content);
                });

                return dfd.promise();
            }

            query = querystring.unescape(query).replace(/(\.|-)/g, "").replace(/(\s)/g, "");

            instagram.tag_media_recent(query, function(err, medias, pagination, limit) {
                if(err) {
                    console.error(err);
                    dfd.reject(err);
                }

                if (medias && (medias.length > 0)) {
                    var result = medias.slice(0, 5).map(function(media) {
                        var createdAt = new Date(parseInt(media.created_time) * 1000);
                        return {
                            avatar: media.user.profile_picture,
                            userNick: media.user.username,
                            imageUrl: media.images.standard_resolution.url,
                            postLink: media.link,
                            createdAt: createdAt,
                            alt: media.caption && media.caption.text || '',
                            type: 'instagram'
                        };
                    });

                    // uncomment to update mockup
                    // require('fs').writeFileSync('instagram.mockup.json', JSON.stringify(result));

                    dfd.resolve(result);
                } else {
                    dfd.resolve([]);
                }
            });

            return dfd.promise();
        }
    });
});
