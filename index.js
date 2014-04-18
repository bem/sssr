require('bem').api.make()
    .then(function() {
        require('bem/lib/level').resetLevelsCache();
        require('./desktop.bundles/index/index.node.js');
    });
