({
    block: 'page',
    title: 'Social Services Search Robot',
    favicon: '/favicon.ico',
    head: [
        { elem: 'meta', attrs: { name: 'description', content: 'find them all' }},
        { elem: 'css', url: '_index.css' }
    ],
    scripts: [{ elem: 'js', url: '_index.js' }],
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
                elem: 'content'
            },
            {
                block: 'icon',
                mods: { type: 'bem' }
            }
        ]
    }
})
