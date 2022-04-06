__viewContext.ready(function () {
    var options = [{ value: '1', text: 'Option 1' }, { value: '2', text: 'Option 2' }, { value: '3', text: 'Option 3' }];
    var ScreenModel = /** @class */ (function () {
        function ScreenModel() {
            var array = [];
            for (var i = 0; i < 100; i++) {
                array.push({ code: i, name: "text" + i, combo: "1" });
            }
            this.items = ko.observableArray(array);
            this.first = this.items()[0];
        }
        return ScreenModel;
    }());
    function formatCombo(val) {
        for (var i = 0; i < options.length; i++) {
            if (options[i].value == val) {
                val = options[i].text;
            }
        }
        return val;
    }
    var sm = new ScreenModel();
    this.bind(sm);
    $('#grid').igGrid({
        dataSource: ko.mapping.toJS(sm.items),
        primaryKey: 'code',
        autoCommit: true,
        width: '520px',
        height: '400px',
        autoGenerateColumns: false,
        features: [
            {
                name: 'Updating',
                editMode: 'cell',
                enableDeleteRow: false,
                enableAddRow: false,
                editCellStarting: function (evt, ui) {
                    if (ui.columnKey === "name") {
                        var comboSelected = $("#grid").igGrid("getCellValue", ui.rowID, "combo");
                        if (comboSelected === options[1].value) {
                            return false;
                        }
                    }
                    return true;
                },
                columnSettings: [
                    { columnKey: 'code', readOnly: true },
                    { columnKey: 'combo', editorType: 'combo', editorOptions: {
                            mode: "dropdown",
                            dataSource: options,
                            textKey: "text",
                            valueKey: "value"
                        } }
                ]
            }
        ],
        columns: [
            { headerText: 'Code', key: 'code', dataType: 'string', width: 100 },
            { headerText: 'Combo', key: 'combo', dataType: 'string', width: 200, formatter: formatCombo },
            { headerText: 'Name', key: 'name', dataType: 'string', width: 200 }
        ]
    });
});
//# sourceMappingURL=start.js.map