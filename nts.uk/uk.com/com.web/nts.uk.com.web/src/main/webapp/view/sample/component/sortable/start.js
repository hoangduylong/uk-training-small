var ViewModel = /** @class */ (function () {
    function ViewModel() {
        this.drop = ko.observable(false);
        this.items = ko.observableArray([]);
        var self = this;
        for (var i = 1; i < 5; i++) {
            self.items.push({ id: i, name: '000' + i, 'type': !!(i % 2) });
        }
    }
    ViewModel.prototype.removeItem = function (item) {
        var self = this;
        self.items.remove(function (x) { return x.id == item.id; });
    };
    ViewModel.prototype.addItem = function () {
        var self = this, items = self.items();
        self.items.push({ id: items.length + 1, name: '000' + items.length + 1, 'type': false });
    };
    ViewModel.prototype.toggleDrop = function () {
        var self = this, drop = !ko.toJS(self.drop);
        self.drop(drop);
    };
    ViewModel.prototype.preventStopSort = function (data, event, ui) {
        data.cancelDrop = __viewContext['viewModel'].drop();
    };
    return ViewModel;
}());
__viewContext.ready(function () {
    __viewContext['viewModel'] = new ViewModel();
    __viewContext.bind(__viewContext['viewModel']);
});
//# sourceMappingURL=start.js.map