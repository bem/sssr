modules.define('sssr', ['i-bem__dom', 'jquery', 'functions__debounce'], function(provide, BEMDOM, $, debounce) {

provide(BEMDOM.decl(this.name, {

    onSetMod: {
        js: {
            inited: function() {
                this._header = this.elem('header');
                this._setTheme();
                this._form = this.findBlockInside('form');
                this._spin = this.findBlockInside('spin');
                this._debounceRequest = debounce(this._sendRequest, 500, this);
                this._autoscroll = this.findBlockOn(this.elem('autoscroll'), 'button');
                this._autoscroll.on({ modName : 'checked', modVal: '*' }, this._onAutoscrollStateChange.bind(this));
            }
        },

        loading: function(modName, modVal) {
            this._spin.setMod('progress', modVal);
        },

        theme: {
            speechKit: function() {
                this._messageHtml = this.queryDict.message ? decodeURIComponent(this.queryDict.message) : ''
                BEMDOM.append(this._header, '<div class="sssr__message">' + this._messageHtml + '</div>' );
            },
        },
    },

    _clear: function() {
        this._abortRequest();
        this._updateContent('');
        this.delMod('loading');
    },

    _setTheme: function() {
        // var queryDict = {};
        this.queryDict = {};
        var _this = this;
        location.search.substr(1).split("&")
          .forEach(function(item) {
              _this.queryDict[item.split("=")[0]] = item.split("=")[1]
        })

        if (this.queryDict.theme) {
            this._theme = this.queryDict.theme;
            this.setMod('theme', this._theme);
        }

    },

    _doRequest: function(needDebounce) {
        if (this._form.isEmpty()) {
            this._clear();
            return;
        }
        this.setMod('loading');
        needDebounce? this._debounceRequest() : this._sendRequest();
    },

    _sendRequest: function() {
        this._abortRequest();

        this._xhr = $.ajax({
            type: 'GET',
            dataType: 'html',
            url: this.params.url,
            data: this._form.getVal(),
            cache: false,
            success: this._onSuccess.bind(this)
        });
    },

    _onAutoscrollStateChange: function() {
        console.log('autoscroll', this);
        this.toggleMod('autoscroll');
    },

    _abortRequest: function() {
        this._xhr && this._xhr.abort();
    },

    _onSuccess: function(result) {
        this._updateContent(result);
        this.delMod('loading');
    },

    _updateContent: function(html) {
        BEMDOM.update(this.elem('content'), html);
    }

}, {

    live: function() {
        this
            .liveInitOnBlockInsideEvent('submit change', 'form', function(e) {
                console.log('form changed!');
                this._doRequest(e.type === 'change');
            })
            .liveInitOnEvent('autoscroll', 'click', function() {
                this._onAutoscrollStateChange();
            });
    }

}));

});
