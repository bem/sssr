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
        mods: { autoscroll: true },
        js: { url: 'http://sssr.dmtry.apefront.tst.ape.yandex.net/search' }
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
                        'Social Services Search Robot &nbsp;',
                        { 
                            block: 'link',
                            mods : { theme : 'normal' },
                            content: 'github.com/bem/sssr',
                            url: 'http://github.com/bem/sssr/'
                        }
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
                                    val: 'bemup',
                                    placeholder: 'try me, baby!'
                                },
                                {
                                    block : 'button',
                                    mods: { theme: 'normal', size: 'm' },
                                    type: 'submit',
                                    text: 'Найти'
                                },
                                {
                                    block : 'button',
                                    mods: { theme: 'normal', size: 'm', togglable: 'check', checked: true },
                                    mix: { block: 'sssr', elem: 'autoscroll', js: true },
                                    text: 'Автоскролл'
                                },
                                {
                                    elem: 'filter',
                                    content: ['twitter', 'instagram'].map(function(service) {
                                        return {
                                            block: 'checkbox',
                                            mods: {
                                                theme: 'normal',
                                                size: 'l',
                                                checked: service === 'twitter'
                                            },
                                            name : service,
                                            text : service
                                        };
                                    })
                                },
                                {
                                    block: 'spin',
                                    mods: { theme: 'normal', size : 's' }
                                }
                            ]
                        }
                    ]
                },
                {
                    block: 'link',
                    content: {
                        block: 'ribbon'
                    },
                    url: 'http://github.com/bem/sssr/',
                }
            ]
        },
        {
            block: 'content'/*,
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
            })()*/
        }
        //,'<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100px" viewBox="0 0 101.5 83.9" enable-background="new 0 0 101.5 83.9" xml:space="preserve"><g><rect fill="#000" width="100%" height="100%"/><rect x="59.9" y="71.8" fill="#fff" width="41.5" height="12"/><path fill="#fff" d="M46,23.8H23.8V0H0v71.9l46,0c7.7,0,13.9-6.2,13.9-13.9V37.7C59.9,30,53.7,23.8,46,23.8z"/></g></svg>'
        ,{
            block: 'icon',
            mods: { type: 'bem' },
            url: 'data:image/svg+xml,%3Csvg%20version%3D%221.1%22%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%20viewBox%3D%220%200%20101.5%2083.9%22%20enable-background%3D%22new%200%200%20101.5%2083.9%22%20xml%3Aspace%3D%22preserve%22%3E%3Cg%3E%3Crect%20fill%3D%22%23000%22%20width%3D%22100%25%22%20height%3D%22100%25%22%2F%3E%3Crect%20x%3D%2259.9%22%20y%3D%2271.8%22%20fill%3D%22%23fff%22%20width%3D%2241.5%22%20height%3D%2212%22%2F%3E%3Cpath%20fill%3D%22%23fff%22%20d%3D%22M46%2C23.8H23.8V0H0v71.9l46%2C0c7.7%2C0%2C13.9-6.2%2C13.9-13.9V37.7C59.9%2C30%2C53.7%2C23.8%2C46%2C23.8z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E'
        }
    ]
})
