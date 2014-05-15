module.exports = function(config) {

    ['index'].forEach(function(node) {
        config.node('desktop.bundles/' + node, function(nodeConfig) {
            nodeConfig.addTechs([
                [ require('enb/techs/levels'), { levels: getLevels() } ],
                [ require('enb/techs/file-provider'), { target: '?.bemjson.js' } ],
                require('enb/techs/bemdecl-from-bemjson'),
                require('enb/techs/deps'),
                require('enb/techs/files'),

                [ require('enb-roole/techs/css-roole'), { target: '?.pre.css' } ],
                [ require('enb-autoprefixer/techs/css-autoprefixer'), { sourceTarget: '?.pre.css', destTarget: '?.css' } ],
                [ require('enb/techs/file-copy'), { sourceTarget: '?.css', destTarget: '_?.css' } ],

                [ require('enb/techs/browser-js'), { target: '?.pre.js' } ],
                [ require('enb-modules/techs/prepend-modules'), { source: '?.pre.js', target: '?.js' } ],
                [ require('enb/techs/file-copy'), { sourceTarget: '?.js', destTarget: '_?.js' } ],

                [ require('enb-bemxjst/techs/bemtree'), { devMode: true } ],
                require('enb/techs/node-js'),

                [ require('enb-bemxjst/techs/bemhtml'), { devMode: true } ],
                require('enb/techs/html-from-bemjson')
            ]);
            nodeConfig.addTargets(['_?.css', '_?.js', '?.html']);

            function getLevels() {
                return [
                    'libs/bem-core/common.blocks',
                    'libs/bem-core/desktop.blocks',
                    'libs/bem-components/common.blocks',
                    'libs/bem-components/desktop.blocks',
                    'libs/bem-components/design/common.blocks',
                    'libs/bem-components/design/desktop.blocks',
                    'desktop.blocks'
                ].map(function(l) { return config.resolvePath(l); });
            }
        });
    });

};