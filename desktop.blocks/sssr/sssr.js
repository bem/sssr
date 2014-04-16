modules.define('sssr', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {

provide(BEMDOM.decl(this.name, {

    onSetMod: {
        js: {
            inited: function() {
                this._form = this.findBlockInside('form')
                                .on('submit change', this._doRequest, this);
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

    _doRequest: function() {
        if (this._form.isEmpty()) {
            this._clear();
            return;
        }
        this.setMod('loading');
        this._sendRequest();
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
