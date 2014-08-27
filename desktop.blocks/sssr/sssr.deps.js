({
    mustDeps: {
        block: 'i-bem',
        elems: [{
            name: 'dom',
            mods: { 'elem-instances': true }
        }]
    },
    shouldDeps: [
        {
            block: 'functions',
            elem: 'debounce'
        },
        {
            mods: { autoscroll: true }
        },
        {
            block: 'island',
            mods: { type: ['twitter', 'instagram'] }
        }
    ]
})
