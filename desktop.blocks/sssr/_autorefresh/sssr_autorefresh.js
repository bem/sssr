modules.define('sssr', ['tick'], function(provide, tick, Sssr) {
    provide(Sssr.decl({ modName: 'autorefresh' }, {
        onSetMod: {
            loading: function(modName, modVal) {
                // призовем методы блока
                this.__base.apply(this, arguments);
                // если происходит загрузка — обнуляем,
                // когда загрузка закончится — стартуем таймер
                modVal ? this._clearTimer(): this._setTimer();
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
        _onTick: function() {
            // проверяем время и отсылаем вовремя запрос
            (++this._counter * 50) % this.params.refreshInterval || this._sendRequest();
        },
        _clearTimer: function() {
            tick.un('tick', this._onTick, this);
        },
        getDefaultParams: function() {
            return {
                refreshInterval: 10000
            };
        }
    }));
});
