modules.define('sssr', ['jquery'], function(provide, $, Sssr) {

var $win = $(window);

provide(Sssr.decl({ modName: 'autoscroll' }, {

    onSetMod: {
        loading: function(modName, modVal) {
            this.__base.apply(this, arguments);
            modVal? this._clearTimer() : this._setTimer();
        },
        autoscroll: function() {
            this._setTimer();
        }
    },

    beforeSetMod: {
        autoscroll: function() {
            this._clearTimer();
        }
    },

    _clear: function() {
        this.__base();
        this._clearTimer();
    },

    _setTimer: function() {
        if (!window.scrollMaxY) return;

        var _this = this;

        this._counter = $win.scrollTop();
        this._timer = setInterval(function() {
            $win.scrollTop(++_this._counter);
            window.scrollY < window.scrollMaxY || _this._doRequest();
        }, 20);
    },

    _clearTimer: function() {
        clearInterval(this._timer);
    },

    _updateContent: function() {
        this.__base.apply(this, arguments);
        $win.scrollTop(0);
    }

}, {

    live: function() {
        this.__base();
        this.liveInitOnBlockInsideEvent('click', 'button', function(e) {
            if (this.elem('autoscroll')[0] === e.target.domElem[0]) {
                this.setMod('autoscroll', e.target.hasMod('checked'));
            }
        });
    }

}))

});