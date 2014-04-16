modules.define('form', ['i-bem__dom'], function(provide, BEMDOM) {

provide(BEMDOM.decl('form', {

    onSetMod: {

        js: {
            inited: function() {
                this.bindTo('submit', this._onSubmit);
            }
        }

    },

    _onSubmit: function(e) {
        e.preventDefault();
        this.emit('submit');
    },

    getVal: function() {
        return this.domElem.serialize();
    }

}, {}));

});