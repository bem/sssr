({
    block: 'page',
    title: 'Social Services Search Robot',
    favicon: '/favicon.ico',
    head: [
        { elem: 'meta', attrs: { name: 'description', content: 'find them all' }},
        { elem: 'css', url: '_index.css' }
    ],
    scripts: [{ elem: 'js', url: '_index.js' }],
    mix: {
        block: 'sssr',
        mods: { autorefresh: true },
        js: { url: '/search', refreshInterval: 60000 }
    },
    content: [
        {
            block: 'header',
            content: [
                {
                    block: 'logo',
                    mix: { block: 'header', elem: 'logo' },
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
                    mix: { block: 'header', elem: 'form' },
                    content: [
                        {
                            elem: 'search',
                            content: [
                                {
                                    block: 'input',
                                    mods: { theme: 'normal', size: 'm', 'has-clear' : true },
                                    name: 'query',
                                    placeholder: 'try me, baby!'
                                },
                                {
                                    block : 'button',
                                    mods: { theme: 'normal', size: 'm' },
                                    type: 'submit',
                                    text: 'Найти'
                                },
                                {
                                    block: 'spin',
                                    mods: { theme: 'normal', size : 's' }
                                }
                            ]
                        },
                        {
                            elem: 'filter',
                            content: ['twitter', 'instagram', 'yafotki'].map(function(service) {
                                return {
                                    block: 'checkbox',
                                    mods: { theme: 'normal', size: 'l', checked: false },
                                    name : service,
                                    text : service
                                };
                            })
                        }
                    ]
                }
            ]
        },
        {
            block: 'content',
            content: (function() {

                return 'Minsk is extermly cool'.split('').map(function() {
                    var service = ['twitter', 'instagram'][Math.floor(Math.random()*2)];

                    return {
                        service: service,
                        user: [{
                            login: 'tadatuta',
                            name: 'Vladimir',
                            avatar: 'https://pbs.twimg.com/profile_images/1384848690/image_400x400.jpg'
                        }, {
                            login: 'dmtry',
                            name: 'Dmitry',
                            avatar: 'https://pbs.twimg.com/profile_images/1384848690/image_400x400.jpg'
                        },  {
                            login: 'sipayrt',
                            name: 'Jack Konstantinov',
                            avatar: 'https://pbs.twimg.com/profile_images/1384848690/image_400x400.jpg'
                        }, {
                            login: 'einstein',
                            name: 'Slava',
                            avatar: 'https://pbs.twimg.com/profile_images/1384848690/image_400x400.jpg'
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
                                            url: 'http://yandex.ru',
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
})
