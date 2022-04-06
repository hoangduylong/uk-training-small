__viewContext.ready(function () {
    var ScreenModel = /** @class */ (function () {
        function ScreenModel() {
            var self = this;
            self.active = ko.observable(false);
            self.enable = ko.observable(true);
            self.items = ko.observableArray([]);
            for (var i = 1; i < 5; i++) {
                self.items.push(new ItemModel('00' + i, '基本給', "description " + i, i % 3 === 0, "2010/1/1"));
            }
            self.columns = ko.observableArray([
                { headerText: 'コード', key: 'code', width: 125 },
                { headerText: '名称', key: 'name', width: 125 },
                { headerText: '説明', key: 'description', width: 125 },
                { headerText: '説明1', key: 'other1', width: 125 },
                { headerText: '説明2', key: 'other2', width: 125, isDateColumn: true, format: 'YYYY/MM/DD' }
            ]);
            self.currentCode = ko.observable("001");
            self.currentCodeList = ko.observableArray([]);
            $("#grid").igGrid({
                dataSource: self.items(),
                primaryKey: 'code',
                width: undefined,
                height: '350px',
                columns: self.columns(),
                virtualization: true,
                virtualizationMode: 'continuous',
                features: [
                    { name: 'Selection', multipleSelection: true },
                    { name: 'RowSelectors', enableCheckBoxes: true, enableRowNumbering: false }
                ]
            });
        }
        return ScreenModel;
    }());
    var ItemModel = /** @class */ (function () {
        function ItemModel(code, name, description, deletable, other1, other2) {
            this.code = code;
            this.name = name;
            this.description = description;
            this.other1 = other1;
            this.other2 = other2 || other1;
            this.deletable = deletable;
        }
        return ItemModel;
    }());
    this.bind(new ScreenModel());
});
//# sourceMappingURL=start.js.map