var model = nts.uk.at.view.cdl024.viewmodel;
var service = nts.uk.at.view.cdl024.service;
__viewContext.ready(function () {
    var ScreenModel = /** @class */ (function () {
        function ScreenModel() {
            var _this = this;
            var self = this;
            this.items = ko.observableArray([]);
            service.getAll().done(function (data) {
                data = _.sortBy(data, ["code"]);
                _this.items(data);
            });
            this.selectedItems = ko.observableArray([]);
        }
        ScreenModel.prototype.openDialog = function () {
            var _this = this;
            var param = {
                codeList: this.selectedItems()
            };
            nts.uk.ui.windows.setShared("CDL024", param);
            nts.uk.ui.windows.sub.modal("/view/cdl/024/index.xhtml").onClosed(function () {
                _this.selectedItems(nts.uk.ui.windows.getShared("currentCodeList"));
            });
        };
        return ScreenModel;
    }());
    var ItemModel = /** @class */ (function () {
        function ItemModel(code) {
            this.code = code;
        }
        return ItemModel;
    }());
    this.bind(new ScreenModel());
});
//# sourceMappingURL=test.js.map