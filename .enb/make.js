var enbBemTechs = require('enb-bem-techs'),
    borschikTech = require('enb-borschik/techs/borschik'),
    levels = [
        { path: 'libs/bem-core/common.blocks', check: false },
        { path: 'libs/bem-core/desktop.blocks', check: false },
        { path: 'libs/bem-components/common.blocks', check: false },
        { path: 'libs/bem-components/design/common.blocks', check: false },
        { path: 'libs/bem-components/desktop.blocks', check: false },
        { path: 'libs/bem-components/design/desktop.blocks', check: false },
        'common.blocks',
        'desktop.blocks'
    ],
    isProd = process.env.YENV === 'production';

module.exports = function (config) {
    config.nodes('*.bundles/*', function (nodeConfig) {
        nodeConfig.addTechs([
            // essential
            [enbBemTechs.levels, { levels: levels }],
            [require('enb/techs/file-provider'), { target: '?.bemjson.js' }],
            [enbBemTechs.bemjsonToBemdecl],
            [enbBemTechs.files],
            [enbBemTechs.deps],

            // bemtree
            [require('enb-bemxjst/techs/bemtree'), { devMode: process.env.BEMTREE_ENV === 'development' }],
            // node.js
            [require('enb-js/techs/node-js'), { includeYM: true }],
            // browser.js
            [require('enb-js/techs/browser-js'), {
                includeYM: true,
                target: '?.browser.js'
            }],
            [require('enb/techs/file-merge'), {
                target: '?.js',
                sources: ['?.browser.bemhtml.js', '?.browser.js']
            }],
            // css
            [require('enb-stylus/techs/stylus'), {
                target: '?.css',
                autoprefixer: {
                    browsers: ['ie >= 10', 'last 2 versions', 'opera 12.1', '> 2%']
                }
            }],
            // bemhtml
            [require('enb-bemxjst/techs/bemhtml'), { devMode: process.env.BEMHTML_ENV === 'development' }],
            // client bemhtml
            [enbBemTechs.depsByTechToBemdecl, {
                target: '?.bemhtml.bemdecl.js',
                sourceTech: 'js',
                destTech: 'bemhtml'
            }],
            [enbBemTechs.deps, {
                target: '?.bemhtml.deps.js',
                bemdeclFile: '?.bemhtml.bemdecl.js'
            }],
            [enbBemTechs.files, {
                depsFile: '?.bemhtml.deps.js',
                filesTarget: '?.bemhtml.files',
                dirsTarget: '?.bemhtml.dirs'
            }],
            [require('enb-bemxjst/techs/bemhtml'), {
                target: '?.browser.bemhtml.js',
                filesTarget: '?.bemhtml.files',
                devMode: process.env.BEMHTML_ENV === 'development'
            }],
            // html
            [require('enb-bemxjst/techs/bemjson-to-html')],
            // borschik
            [borschikTech, { sourceTarget: '?.css', destTarget: '?.min.css', tech: 'cleancss', freeze: true, minify: isProd }],
            [borschikTech, { sourceTarget: '?.js', destTarget: '?.min.js', freeze: true, minify: isProd }]
        ]);

        nodeConfig.addTargets([
            '?.min.css',
            '?.min.js',
            '?.bemtree.js',
            '?.node.js',
            '?.bemhtml.js',
            '?.html'
        ]);
    });
};
