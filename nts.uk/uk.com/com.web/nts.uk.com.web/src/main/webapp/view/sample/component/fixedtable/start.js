__viewContext.ready(function () {
    var ScreenModel = /** @class */ (function () {
        function ScreenModel() {
            var self = this;
            self.itemList = ko.observableArray([]);
            $("#fixed-table").ntsFixedTable({ height: 300, width: 600 });
        }
        ScreenModel.prototype.addItem = function () {
            var self = this;
            self.itemList.push(new ScreenItem());
        };
        ScreenModel.prototype.removeItem = function () {
            var self = this;
            self.itemList.pop();
        };
        return ScreenModel;
    }());
    var ScreenItem = /** @class */ (function () {
        function ScreenItem() {
            var self = this;
            self.text = ko.observable("abc");
            self.enable = ko.observable(true);
            self.itemList = ko.observableArray([
                new ItemModel('1', '基本給'),
                new ItemModel('2', '役職手当'),
                new ItemModel('3', '基本給')
            ]);
            self.selectedCode = ko.observable('1');
        }
        return ScreenItem;
    }());
    var ItemModel = /** @class */ (function () {
        function ItemModel(code, name) {
            this.code = code;
            this.name = name;
        }
        return ItemModel;
    }());
    this.bind(new ScreenModel());
});
//# sourceMappingURL=start.js.map