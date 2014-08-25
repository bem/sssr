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
        js: { url: '/search' }
    },
    content: [
        {
            block: 'sssr',
            elem: 'header',
            content: [
                {
                    block: 'logo',
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
                                    block: 'spin',
                                    mods: { theme: 'normal', size : 's' }
                                }
                            ]
                        },
                        {
                            elem: 'filter',
                            content: ['twitter', 'instagram', 'yafotki', 'yablogs'].map(function(service) {
                                return {
                                    block: 'checkbox',
                                    mods: {
                                        theme: 'normal',
                                        size: 'l',
                                        checked: service === 'twitter' || service === 'instagram'
                                    },
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
            block: 'sssr',
            elem: 'content'
        },
        {
            block: 'icon',
            mods: { type: 'bem' },
            url: 'data:image/svg+xml,%3Csvg%20version%3D%221.1%22%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%20viewBox%3D%220%200%20101.5%2083.9%22%20enable-background%3D%22new%200%200%20101.5%2083.9%22%20xml%3Aspace%3D%22preserve%22%3E%3Cg%3E%3Crect%20fill%3D%22%23000%22%20width%3D%22100%25%22%20height%3D%22100%25%22%2F%3E%3Crect%20x%3D%2259.9%22%20y%3D%2271.8%22%20fill%3D%22%23fff%22%20width%3D%2241.5%22%20height%3D%2212%22%2F%3E%3Cpath%20fill%3D%22%23fff%22%20d%3D%22M46%2C23.8H23.8V0H0v71.9l46%2C0c7.7%2C0%2C13.9-6.2%2C13.9-13.9V37.7C59.9%2C30%2C53.7%2C23.8%2C46%2C23.8z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E'
        }
    ]
})
