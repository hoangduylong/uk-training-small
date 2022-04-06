__viewContext.ready(function () {
    var ScreenModel = /** @class */ (function () {
        function ScreenModel() {
            this.index = ko.observable(0);
            var self = this;
            var temp = [];
            for (var i = 0; i < 100; i++) {
                temp.push(new ItemModel((i + 1), '基本給', "description " + (i + 1)));
            }
            self.itemList = ko.observableArray(temp);
            self.itemName = ko.observable('');
            self.currentCode = ko.observable(3);
            self.selectedCode = ko.observable(temp[2].code);
            self.selectedCode.subscribe(function (value) {
                console.log(value);
            });
            self.selectedCodes = ko.observableArray([]);
            self.selectedCodes.subscribe(function (value) {
                console.log(value);
            });
            self.isEnable = ko.observable(true);
            self.isMulti = ko.observable(true);
            self.isMulti2 = ko.observable(true);
            self.isValidate = ko.observable(true);
        }
        ScreenModel.prototype.addOptions = function () {
            var self = this;
            var newCode = self.currentCode() + 1;
            var itemCode = newCode;
            self.itemList.push(new ItemModel(itemCode, self.itemName(), ""));
            self.currentCode(newCode);
        };
        ScreenModel.prototype.deselectAll = function () {
            $('#list-box').ntsListBox('deselectAll');
        };
        ScreenModel.prototype.selectAll = function () {
            $('#list-box').ntsListBox('selectAll');
        };
        /**
         * Clear options.
         */
        ScreenModel.prototype.clearOptions = function () {
            var self = this;
            self.itemList([]);
        };
        /**
         * Remove item by code;
         */
        ScreenModel.prototype.remove = function () {
            var self = this;
            // Remove by code.
            var selected = self.itemList().filter(function (item) { return item.code === self.selectedCode().code; })[0];
            self.itemList.remove(selected);
            // Remove by codes
            var selecteds = self.itemList().filter(function (item) { return self.selectedCodes().indexOf(item) != -1; });
            self.itemList.removeAll(selecteds);
        };
        ScreenModel.prototype.prev = function () {
            var self = this;
            if (self.index() > 0) {
                self.index(self.index() - 1);
                self.selectedCode(self.itemList()[self.index()]);
            }
        };
        ScreenModel.prototype.next = function () {
            var self = this;
            if (self.index() < self.itemList().length - 1) {
                self.index(self.index() + 1);
                self.selectedCode(self.itemList()[self.index()]);
            }
        };
        ScreenModel.prototype.jump = function () {
            var self = this;
            self.index(50);
            self.selectedCode(self.itemList()[self.index()]);
        };
        return ScreenModel;
    }());
    var ItemModel = /** @class */ (function () {
        function ItemModel(code, name, description) {
            this.code = code;
            this.name = name;
            this.description = description;
        }
        return ItemModel;
    }());
    this.bind(new ScreenModel());
});
//# sourceMappingURL=start.js.map