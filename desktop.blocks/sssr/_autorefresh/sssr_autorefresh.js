modules.define('sssr', ['tick'], function(provide, tick, Sssr) {

provide(Sssr.decl({ modName: 'autorefresh' }, {

    onSetMod: {
        loading: function(modName, modVal) {
            this.__base.apply(this, arguments);
            modVal? this._clearTimer() : this._setTimer();
        }
    },

    _clear: function() {
        this.__base();
        this._clearTimer();
    },

    _setTimer: function() {
        this._counter = 0;
        tick.on('tick', this._onTick, this);
    },

    _clearTimer: function() {
        tick.un('tick', this._onTick, this);
    },

    _onTick: function() {
        (++this._counter * 50) % this.params.refreshInterval || this._sendRequest();
    },

    getDefaultParams: function() {
        return {
            refreshInterval: 10000
        };
    }

}))

});