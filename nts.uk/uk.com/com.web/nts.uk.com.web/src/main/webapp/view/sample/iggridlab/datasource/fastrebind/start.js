__viewContext.ready(function () {
    var ScreenModel = /** @class */ (function () {
        function ScreenModel() {
            this.items = ko.observableArray();
            this.first = ko.observable({});
        }
        ScreenModel.prototype.rebind = function () {
            // dispose binding
            ko.cleanNode($("#grid")[0]);
            // update viewmodel datasource
            var newArray = testdata.createRandomHogeArray(100);
            this.first(newArray[0]);
            this.items.removeAll();
            this.items(newArray);
            // prepare igGrid options
            var gridOptions = {
                primaryKey: 'code',
                dataSource: this.items,
                autoCommit: true,
                width: '400px',
                height: '300px',
                autoGenerateColumns: false,
                features: [
                    {
                        name: 'Updating',
                        editMode: 'cell',
                        columnSettings: [
                            { columnKey: 'code', readOnly: true }
                        ]
                    }
                ],
                columns: [
                    { headerText: 'Code', key: 'code', dataType: 'string', width: 100 },
                    { headerText: 'Name', key: 'name', dataType: 'string', width: 200 },
                ]
            };
            // apply bindings
            ko.applyBindingsToNode($('#grid')[0], { igGrid: gridOptions }, this);
        };
        return ScreenModel;
    }());
    this.bind(new ScreenModel());
});
//# sourceMappingURL=start.js.map