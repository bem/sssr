({
    shouldDeps: [
        { block: 'server' },
        { block: 'island', mods: { type: ['twitter'] }},
        {
            block: 'functions',
            elem: 'debounce'
        },
        { mods: ['autorefresh']}
    ]
})
