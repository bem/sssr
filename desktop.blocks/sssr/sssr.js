modules.define('sssr', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {

provide(BEMDOM.decl('sssr', {

    onSetMod: {
        js: {
            inited: function() {
                this._form = this.findBlockInside('form')
                                .on('submit', this._doRequest, this);
            }
        },

        loading: function(modName, modVal) {
            this.findBlockInside('spin').setMod('progress', modVal);
        }
    },

    _doRequest: function() {
        this.setMod('loading');
        this._sendRequest();
    },

    _sendRequest: function() {
        $.ajax({
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
