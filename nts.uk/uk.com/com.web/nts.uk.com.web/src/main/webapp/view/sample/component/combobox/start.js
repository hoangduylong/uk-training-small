__viewContext.ready(function () {
    var ScreenModel = /** @class */ (function () {
        /**
         * Constructor.
         */
        function ScreenModel() {
            var self = this;
            self.itemList = ko.observableArray([
                new ItemModel('1', '基本給'),
                new ItemModel('2', '役職手当'),
                new ItemModel('3', '基本給ながい文字列ながい文字列ながい文字列')
            ]);
            self.selectedCode = ko.observable('1');
            self.selectedCode2 = ko.observable('2');
            self.isEnable = ko.observable(true);
            self.isEditable = ko.observable(true);
            self.isRequired = ko.observable(true);
            self.selectFirstIfNull = ko.observable(true);
        }
        ScreenModel.prototype.setDefault = function () {
            var self = this;
            nts.uk.util.value.reset($("#combo-box, #A_SEL_001"), self.defaultValue() !== '' ? self.defaultValue() : undefined);
        };
        ScreenModel.prototype.validate = function () {
            $("#combo-box").trigger("validate");
        };
        ScreenModel.prototype.setInvalidValue = function () {
            this.selectedCode('aaa');
        };
        return ScreenModel;
    }());
    ;
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