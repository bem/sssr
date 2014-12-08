module.exports = function (config) {
    config.nodes('*.bundles/*', function (nodeConfig) {
        nodeConfig.addTechs([
            [require('enb/techs/file-provider'), { target: '?.bemjson.js' }],
            [require('enb/techs/files')],
            [require('enb/techs/deps')],
            [require('enb/techs/bemdecl-from-bemjson')],
            [require('enb-bemxjst/techs/bemtree-old')],
            [require('enb-diverse-js/techs/node-js'), { target: '?.pre.node.js' }],
            [require('enb-modules/techs/prepend-modules'), { source: '?.pre.node.js', target: '?.node.js' }],
            [require('enb-diverse-js/techs/browser-js'), { target: '?.pre.js' }],
            [require('enb-modules/techs/prepend-modules'), { source: '?.pre.js', target: '?.js' }],
            [require('enb-stylus/techs/css-stylus'), { target: '?.noprefix.css' }],
            [require('enb-bemxjst/techs/bemhtml-old')],
            [require('enb-bemxjst/techs/html-from-bemjson')],
        ]);

        nodeConfig.addTargets([
            '?.min.css',
            '?.bemtree.js',
            '?.node.js',
            '?.min.js',
            '?.min.node.js',
            '?.bemhtml.js',
            '?.html'
        ]);
    });

    config.nodes('*desktop.bundles/*', function (nodeConfig) {
        nodeConfig.addTechs([
            [require('enb/techs/levels'), { levels: getDesktops(config) }],
            [require('enb-autoprefixer/techs/css-autoprefixer'), {
                browserSupport: ['last 2 versions', 'ie 10', 'ff 24', 'opera 12.16'],
                sourceTarget: '?.noprefix.css'
            }]
        ]);
    });

    config.mode('development', function () {
        config.nodes('*.bundles/*', function (nodeConfig) {
            nodeConfig.addTechs([
                [require('enb-borschik/techs/borschik'), { sourceTarget: '?.css', destTarget: '?.min.css', tech: 'cleancss', freeze: true }],
                [require('enb-borschik/techs/borschik'), { sourceTarget: '?.js', destTarget: '?.min.js', freeze: true }],
                [require('enb-borschik/techs/borschik'), { sourceTarget: '?.node.js', destTarget: '?.min.node.js', freeze: true }]
            ]);
        });
    });

    config.mode('production', function () {
        config.nodes('*.bundles/*', function (nodeConfig) {
            nodeConfig.addTechs([
                [require('enb-borschik/techs/borschik'), { sourceTarget: '?.css', destTarget: '?.min.css' , freeze: true, tech: 'cleancss' }],
                [require('enb-borschik/techs/borschik'), { sourceTarget: '?.js', destTarget: '?.min.js', freeze: true }]
            ]);
        });
    });
};

function getDesktops(config) {
    return [
        { path: 'libs/bem-core/common.blocks', check: false },
        { path: 'libs/bem-core/desktop.blocks', check: false },
        { path: 'libs/bem-components/common.blocks', check: false },
        { path: 'libs/bem-components/design/common.blocks', check: false },
        { path: 'libs/bem-components/desktop.blocks', check: false },
        { path: 'libs/bem-components/design/desktop.blocks', check: false },
        'desktop.blocks'
    ].map(function (level) {
        return config.resolvePath(level);
    });
}
