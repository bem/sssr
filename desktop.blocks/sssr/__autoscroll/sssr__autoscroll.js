modules.define('sssr__autoscroll', ['i-bem__dom'], function(provide, BEMDOM) {

provide(BEMDOM.decl({ block: 'sssr', elem: 'autoscroll' }, {

    _onClick: function(e) {
        this.block().setMod('autoscroll', e.target.hasMod('checked'));
    }

}, {

    live: function() {
        this.liveInitOnBlockEvent('click', 'button', this.prototype._onClick);
    }

}))

});