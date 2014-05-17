modules.define('sssr', ['jquery'], function(provide, $, Sssr) {

var $win = $(window),
    docElem = document.documentElement;

provide(Sssr.decl({ modName: 'autoscroll' }, {

    onSetMod: {
        loading: function(modName, modVal) {
            this.__base.apply(this, arguments);
            modVal? this._stopScroll() : setTimeout(this._startScroll.bind(this), 2000);
        },
        autoscroll: function() {
            this._startScroll();
        }
    },

    beforeSetMod: {
        autoscroll: function() {
            this._stopScroll();
        }
    },

    _clear: function() {
        this.__base();
        this._stopScroll();
    },

    _startScroll: function() {
        if (docElem.offsetHeight < window.innerHeight) return;

        var top = $win.scrollTop();

        this._timer = setInterval(function() {
            $win.scrollTop(++top);
            top < (docElem.offsetHeight - window.innerHeight) || this._refresh();
        }.bind(this), 20);
    },

    _stopScroll: function() {
        clearInterval(this._timer);
    },

    _refresh: function() {
        this.setMod('loading');
        this._scrollTop();
    },

    _updateContent: function() {
        this.__base.apply(this, arguments);
    },

    _scrollTop: function() {
        var _this = this,
            top = $win.scrollTop(),
            timeout = 10;

        setTimeout(function() {
            top -= 150;
            $win.scrollTop(top);
            top > 0? setTimeout(arguments.callee, timeout) : _this._sendRequest();
        }, 500);
    }

    /*_scrollTop: function() {
        var _this = this,
            top= $win.scrollTop(),
            halfHeight = (docElem.offsetHeight - window.innerHeight) / 2,
            step = 10,
            timeout = 10;

        setTimeout(function() {
            $win.scrollTop() > halfHeight ? (step += 30) : (step > 10 && (step -= 30));
            top -= step;
            $win.scrollTop(top);
            top > 0? setTimeout(arguments.callee, timeout) : _this._sendRequest();
        }, 500);
    }*/

}, {

    /*live: function() {
        this.__base();
        this.liveInitOnBlockInsideEvent('click', 'button', function(e) {
            if (this.elem('autoscroll')[0] === e.target.domElem[0]) {
                this.setMod('autoscroll', e.target.hasMod('checked'));
            }
        });
    }*/

}))

});