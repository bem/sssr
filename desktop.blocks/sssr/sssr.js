modules.define('sssr', ['i-bem__dom', 'jquery', 'functions__debounce'], function(provide, BEMDOM, $, debounce) {

provide(BEMDOM.decl(this.name, {

    onSetMod: {
        js: {
            inited: function() {
                this._form = this.findBlockInside('form')
                                .on('submit change', function(e) {
                                    this._doRequest(e.type === 'change');
                                }, this);

                this._debounceRequest = debounce(this._sendRequest, 500, this);
            }
        },

        loading: function(modName, modVal) {
            this.findBlockInside('spin').setMod('progress', modVal);
        }
    },

    _clear: function() {
        this._xhr && this._xhr.abort();
        BEMDOM.update(this.findBlockInside('content').domElem, '');
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
        this._xhr && this._xhr.abort();

        this._xhr = $.ajax({
            type: 'GET',
            dataType: 'html',
            url: this.params.url,
            data: this._form.getVal(),
            cache: false,
            success: this._onSuccess.bind(this)
        });
    },

    _onSuccess: function(result) {
        BEMDOM.update(this.findBlockInside('content').domElem, result);
        this.delMod('loading');
    }

}));

});
