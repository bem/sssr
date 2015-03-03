modules.define('form', ['i-bem__dom'], function(provide, BEMDOM) {

provide(BEMDOM.decl(this.name, {

    onSetMod: {

        js: {
            inited: function() {
                this._input = this.findBlockInside('input');
                this._checkboxes = this.findBlocksInside('checkbox');
            }
        }

    },

        _onChange: function() {
            this.emit('change');
        },

        _onSubmit: function(e) {
            e.preventDefault();
            this.emit('submit');
        },

        getVal: function() {
            return this.domElem.serialize();
        },

    isEmpty: function() {
        return !this._input.getVal().trim() ||
            this._checkboxes.every(function(checkbox) {
                return !checkbox.hasMod('checked');
            });
    }

}, {

    live: function() {
        var ptp = this.prototype;

        this
            .liveBindTo('submit', ptp._onSubmit)
            .liveInitOnBlockInsideEvent('change', 'input', ptp._onChange)
            .liveInitOnBlockInsideEvent('change', 'checkbox', ptp._onChange);
    }

}));
});
