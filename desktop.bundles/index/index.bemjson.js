({
    block: 'page',
    title: 'Social Services Search Robot',
    favicon: '/favicon.ico',
    js: true,
    head: [
        { elem: 'meta', attrs: { name: 'description', content: 'find them all' }},
        { elem: 'css', url: 'index.min.css' }
    ],
    scripts: [{ elem: 'js', url: 'index.min.js' }],
    content: {
        block: 'sssr',
        mods: { autoscroll: true },
        js: { url: '/search' },
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
                                        val: 'bemup',
                                        placeholder: 'try me, baby!'
                                    },
                                    {
                                        block : 'button',
                                        mods: { theme: 'islands', size: 'm', type: 'submit' },
                                        text: 'Найти'
                                    },
                                    {
                                        block : 'button',
                                        mods: { theme: 'islands', size: 'm', togglable: 'check', checked: true },
                                        mix: { block: 'sssr', elem: 'autoscroll', js: true },
                                        text: 'Автоскролл'
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
                elem: 'content'
            },
            {
                block: 'icon',
                mods: { type: 'bem' }
            }
        ]
    }
})
