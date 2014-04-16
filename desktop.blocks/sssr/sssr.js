modules.define('sssr', ['i-bem__dom', 'jquery', 'functions__debounce'], function(provide, BEMDOM, $, debounce) {

provide(BEMDOM.decl(this.name, {

    onSetMod: {
        js: {
            inited: function() {
                this._form = this.findBlockInside('form');
                this._content = this.findBlockInside('content');
                this._spin = this.findBlockInside('spin');
                this._debounceRequest = debounce(this._sendRequest, 500, this);
            }
        },

        loading: function(modName, modVal) {
            this._spin.setMod('progress', modVal);
        }
    },

    _clear: function() {
        this._abortRequest();
        this._updateContent('');
        this.delMod('loading');
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

    _abortRequest: function() {
        this._xhr && this._xhr.abort();
    },

    _onSuccess: function(result) {
        this._updateContent(result);
        this.delMod('loading');
    },

    _updateContent: function(html) {
        BEMDOM.update(this._content.domElem, html);
    }

}, {

    live: function() {
        this.liveInitOnBlockInsideEvent('submit change', 'form', function(e) {
            this._doRequest(e.type === 'change');
        });
    }

}));

});
