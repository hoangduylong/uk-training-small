__viewContext.ready(function () {
    var ScreenModel = /** @class */ (function () {
        function ScreenModel() {
            this.items = ko.observableArray(testdata.createHogeArray(100));
            this.first = this.items()[0];
        }
        return ScreenModel;
    }());
    var sm = new ScreenModel();
    this.bind(sm);
    $('#grid').igGrid({
        dataSource: ko.mapping.toJS(sm.items),
        primaryKey: 'code',
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
    });
});
//# sourceMappingURL=start.js.map