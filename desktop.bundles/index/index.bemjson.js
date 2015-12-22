({
    block: 'page',
    title: 'Social Services Search Robot',
    favicon: '/favicon.ico',
    head: [
        { elem: 'meta', attrs: { name: 'description', content: 'find them all' }},
        { elem: 'css', url: 'index.min.css' }
    ],
    scripts: [{ elem: 'js', url: 'index.min.js' }],
    content: {
        block: 'sssr',
        mods: { autorefresh: true },
        js: {
            url: '/search/',
            refreshInterval: 10000
        },
        content: [
            {
                elem: 'header',
                content: [
                    {
                        elem: 'logo',
                        content: [
                            {
                                block: 'icon',
                                mods: { type: 'sssr' }
                            },
                            'Social Services Search Robot:'
                        ]
                    },
                    {
                        block: 'form',
                        content: [
                            {
                                elem: 'search',
                                content: [
                                    {
                                        block: 'input',
                                        mods: { theme: 'islands', size: 'm', 'has-clear' : true },
                                        name: 'query',
                                        val: '#b_',
                                        placeholder: 'try me, baby!'
                                    },
                                    {
                                        block: 'button',
                                        mods: { theme: 'islands', size: 'm', type: 'submit' },
                                        text: 'Найти'
                                    },
                                    {
                                        block: 'spin',
                                        mods: { theme: 'islands', size : 's' }
                                    }
                                ]
                            },
                            {
                                elem: 'filter',
                                content: ['twitter', 'instagram'].map(function(service) {
                                    return {
                                        block: 'checkbox',
                                        mods: {
                                            theme: 'islands',
                                            size: 'l',
                                            checked: service === 'twitter'
                                        },
                                        name: service,
                                        text: service
                                    };
                                })
                            }
                        ]
                    }
                ]
            },
            {
                elem: 'content',
                content: (function() {

                    return 'BEM is extermly cool'.split('').map(function() {
                        var service = ['twitter', 'instagram'][Math.floor(Math.random()*2)];

                        return {
                            service: service,
                            user: [{
                                login: 'tadatuta',
                                name: 'Vladimir',
                                avatar: 'https://raw.githubusercontent.com/bem/bem-identity/master/sign/_theme/sign_theme_batman.png'
                            }, {
                                login: 'dmtry',
                                name: 'Dmitry',
                                avatar: 'https://raw.githubusercontent.com/bem/bem-identity/master/sign/_theme/sign_theme_captain-america.png'
                            },  {
                                login: 'sipayrt',
                                name: 'Jack Konstantinov',
                                avatar: 'https://raw.githubusercontent.com/bem/bem-identity/master/sign/_theme/sign_theme_ironman.png'
                            }, {
                                login: 'einstein',
                                name: 'Slava',
                                avatar: 'https://raw.githubusercontent.com/bem/bem-identity/master/sign/_theme/sign_theme_robin.png'
                            }][Math.floor(Math.random()*4)],
                            time: Math.floor((Math.random()*12)+1) + 'h',
                            img: service === 'instagram' ? 'http://bla.jpg' : undefined,
                            text: [
                                'Блок — это независимый интерфейсный компонент. Блок может быть простым или составным (содержать другие блоки).',
                                'Элемент — это составная часть блока.',
                                'У блока или элемента может быть несколько модификаторов одновременно.'][Math.floor(Math.random()*3)]
                        };
                    }).map(function(dataItem) {
                        return {
                            block: 'island',
                            content: [
                                {
                                    elem: 'header',
                                    content: {
                                        block: 'user',
                                        content: [
                                            {
                                                block: 'link',
                                                mix: { block: 'user', elem: 'name' },
                                                url: 'https://www.yandex.ru',
                                                target: '_blank',
                                                content: dataItem.user.name
                                            },
                                            {
                                                elem: 'post-time',
                                                content: dataItem.time
                                            },
                                            {
                                                block: 'image',
                                                mix: { block: 'user', elem: 'icon' },
                                                url: dataItem.user.avatar,
                                                alt: dataItem.user.name
                                            }
                                        ]
                                    }
                                },
                                {
                                    elem: 'text',
                                    content: dataItem.text
                                },
                                {
                                    elem: 'footer',
                                    content: [
                                        {
                                            block: 'service',
                                            mods: { type: dataItem.service }
                                        }
                                    ]
                                }
                            ]
                        };
                    });
                })()
            }
        ]
    }
})
