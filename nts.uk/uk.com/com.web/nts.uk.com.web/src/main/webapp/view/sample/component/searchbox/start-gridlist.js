__viewContext.ready(function () {
    var ScreenModel = /** @class */ (function () {
        function ScreenModel() {
            this.indexUpdate = 0;
            this.indexAdd = 51;
            this.items = ko.observableArray([]);
            var str = ['a0', 'b0', 'c0', 'd0'];
            for (var j = 0; j < 4; j++) {
                for (var i = 1; i < this.indexAdd; i++) {
                    var code = i < 10 ? str[j] + '0' + i : str[j] + i;
                    this.items.push(new ItemModel(code, code, code, code));
                }
            }
            this.columns = ko.observableArray([
                { headerText: 'コード', prop: 'code', width: 100 },
                { headerText: '名称', prop: 'name', width: 230 },
                { headerText: '説明', prop: 'description', width: 150 },
                { headerText: '説明1', prop: 'other1', width: 150 },
                { headerText: '説明2', prop: 'other2', width: 150 }
            ]);
            this.currentCode = ko.observable();
            this.currentCodeList = ko.observableArray([]);
            this.currentCodeList.subscribe(function (newValue) {
                //                alert(newValue);    
            });
        }
        ScreenModel.prototype.addItem = function () {
            this.items.push(new ItemModel('a0' + this.indexAdd, '基本給', "description 1", "other1"));
            this.indexAdd++;
        };
        ScreenModel.prototype.updateItem = function () {
            this.items()[this.indexUpdate].name = "tests";
            this.items.valueHasMutated();
            this.indexUpdate++;
            //            this.currentCodeList([]);
        };
        ScreenModel.prototype.removeItem = function () {
            this.items.shift();
        };
        return ScreenModel;
    }());
    var ItemModel = /** @class */ (function () {
        function ItemModel(code, name, description, other1, other2) {
            this.code = code;
            this.name = name;
            this.description = description;
            this.other1 = other1;
            this.other2 = other2 || other1;
        }
        return ItemModel;
    }());
    this.bind(new ScreenModel());
});
//# sourceMappingURL=start-gridlist.js.map