var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var ui;
        (function (ui) {
            var gridlist;
            (function (gridlist) {
                __viewContext.ready(function () {
                    var ScreenModel = /** @class */ (function () {
                        function ScreenModel() {
                            this.items = (function () {
                                var list = [];
                                for (var i = 0; i < 320; i++) {
                                    list.push(new GridItem(i));
                                }
                                return list;
                            })();
                        }
                        return ScreenModel;
                    }());
                    var GridItem = /** @class */ (function () {
                        function GridItem(index) {
                            this.id = index;
                            this.flexImage = index % 3 == 0 ? "1" : null;
                            this.flag = index % 2 == 0;
                            this.ruleCode = index;
                            this.time = "13:36";
                            this.addressCode1 = "001";
                            this.addressCode2 = "002";
                            this.address1 = "HN";
                            this.address2 = "愛知県日本";
                            this.comboCode1 = String(index % 3 + 1);
                            this.combo = String(index % 3 + 1);
                            this.header0 = "Out";
                            this.comboCode2 = String(index % 3 + 4);
                            this.header01 = String(index % 3 + 4);
                            this.header02 = String(index % 3 + 1);
                            this.header1 = "001";
                            this.header2 = "内容１２";
                            this.header3 = index % 9;
                            this.header4 = "内容４";
                            this.header5 = "002";
                            this.header6 = "内容５６";
                            this.alert = "Act";
                        }
                        return GridItem;
                    }());
                    var model = new ScreenModel();
                    var ItemModel = /** @class */ (function () {
                        function ItemModel(code, name) {
                            this.code = code;
                            this.name = name;
                        }
                        return ItemModel;
                    }());
                    var comboItems = [new ItemModel('1', '基本給'),
                        new ItemModel('2', '役職手当'),
                        new ItemModel('3', '基本給2')];
                    var comboColumns = [{ prop: 'code', length: 1 },
                        { prop: 'name', length: 4 }];
                    var comboItems2 = [new ItemModel('4', '基本給'),
                        new ItemModel('5', '役職手当'),
                        new ItemModel('6', '基本給2')];
                    var comboItems3 = [new ItemModel('1', 'Text1'),
                        new ItemModel('2', 'Text2'),
                        new ItemModel('3', 'Text3')];
                    var CellState = /** @class */ (function () {
                        function CellState(rowId, columnKey, state) {
                            this.rowId = rowId;
                            this.columnKey = columnKey;
                            this.state = state;
                        }
                        return CellState;
                    }());
                    var statesTable = [];
                    statesTable.push(new CellState(0, "address1", [nts.uk.ui.mgrid.color.Error, nts.uk.ui.mgrid.color.Alarm]));
                    statesTable.push(new CellState(0, "time", [nts.uk.ui.mgrid.color.ManualEditTarget, nts.uk.ui.mgrid.color.ManualEditOther]));
                    statesTable.push(new CellState(1, "time", [nts.uk.ui.mgrid.color.Reflect, nts.uk.ui.mgrid.color.Calculation]));
                    statesTable.push(new CellState(5, "time", [nts.uk.ui.mgrid.color.Disable]));
                    statesTable.push(new CellState(6, "header0", [nts.uk.ui.mgrid.color.Disable]));
                    for (var i = 1; i < 200; i++) {
                        if (i % 2 === 0) {
                            statesTable.push(new CellState(i, "address1", [nts.uk.ui.mgrid.color.Alarm, nts.uk.ui.mgrid.color.Reflect]));
                            statesTable.push(new CellState(i, "comboCode1", [nts.uk.ui.mgrid.color.Disable]));
                            statesTable.push(new CellState(i, "combo", [nts.uk.ui.mgrid.color.Disable]));
                        }
                        if (i === 3) {
                            statesTable.push(new CellState(i, "alert", [nts.uk.ui.mgrid.color.Disable]));
                            statesTable.push(new CellState(i, "flag", [nts.uk.ui.mgrid.color.Disable]));
                        }
                        statesTable.push(new CellState(i, "addressCode1", [nts.uk.ui.mgrid.color.Disable]));
                        statesTable.push(new CellState(i, "time", [nts.uk.ui.mgrid.color.Disable]));
                        statesTable.push(new CellState(i, "address1", [nts.uk.ui.mgrid.color.Disable]));
                        statesTable.push(new CellState(i, "address2", [nts.uk.ui.mgrid.color.Disable]));
                        statesTable.push(new CellState(i, "header4", ["text-color1", "bold-text"]));
                        statesTable.push(new CellState(i, "header5", ["#B3AEF1", "italic-text"]));
                    }
                    var TextColor = /** @class */ (function () {
                        function TextColor(rowId, columnKey, color) {
                            this.rowId = rowId;
                            this.columnKey = columnKey;
                            this.color = color;
                        }
                        return TextColor;
                    }());
                    var colorsTable = [];
                    for (var i = 0; i < 400; i++) {
                        if (i % 7 === 0) {
                            colorsTable.push(new TextColor(i, "id", "text-color1"));
                        }
                        else if (i % 3 === 0) {
                            colorsTable.push(new TextColor(i, "id", "#B3AEF1"));
                        }
                    }
                    var TextStyle = /** @class */ (function () {
                        function TextStyle(rowId, columnKey, style) {
                            this.rowId = rowId;
                            this.columnKey = columnKey;
                            this.style = style;
                        }
                        return TextStyle;
                    }());
                    var textStyles = [];
                    for (var i = 0; i < 10; i++) {
                        if (i % 3 === 0) {
                            textStyles.push(new TextStyle(i, "header0", "italic-text"));
                        }
                        else {
                            textStyles.push(new TextStyle(i, "header0", "bold-text"));
                        }
                    }
                    var RowState = /** @class */ (function () {
                        function RowState(rowId, disable) {
                            this.rowId = rowId;
                            this.disable = disable;
                        }
                        return RowState;
                    }());
                    var rowStates = [];
                    for (var i = 9; i < 10; i++) {
                        rowStates.push(new RowState(i, true));
                    }
                    var keys = [];
                    for (var i = 0; i < 300; i++) {
                        keys.push(i);
                    }
                    //        $("#grid").mGrid({ 
                    new nts.uk.ui.mgrid.MGrid($("#grid")[0], {
                        width: '1500px',
                        height: '800px',
                        headerHeight: '80px',
                        dataSource: model.items,
                        dataSourceAdapter: function (ds) {
                            return ds;
                        },
                        primaryKey: 'id',
                        primaryKeyDataType: 'number',
                        rowVirtualization: true,
                        virtualization: true,
                        virtualizationMode: 'continuous',
                        enter: 'right',
                        autoFitWindow: true,
                        preventEditInError: false,
                        userId: "4",
                        getUserId: function (k) { return String(k); },
                        errorColumns: ["ruleCode"],
                        errorsOnPage: true,
                        //                            recordKeys: keys, 
                        //                            avgRowHeight: 36,
                        //                            autoAdjustHeight: false,
                        //                            adjustVirtualHeights: false,
                        columns: [
                            { headerText: 'ID', key: 'id', dataType: 'number', width: '60px', ntsControl: 'Label', hidden: true },
                            { headerText: 'Image', key: 'flexImage', dataType: 'string', width: '60px', ntsControl: 'FlexImage' },
                            //                                { headerText: 'Picture', key: "picture", dataType: "string", width: '60px', ntsControl: 'Image' },
                            //                                 headerText: 'Common1',
                            //                                    group: [
                            { headerText: 'FLAG', key: 'flag', dataType: 'boolean', width: '60px', ntsControl: 'Checkbox' },
                            { headerText: 'RULECODE', key: 'ruleCode', dataType: 'number', width: '100px',
                                constraint: {
                                    primitiveValue: 'ProcessingNo',
                                    required: true
                                }
                            },
                            //                                    ],
                            { headerText: 'Inbound time', key: 'time', width: '140px', columnCssClass: "halign-right", headerCssClass: "center-align",
                                constraint: {
                                    //                                                                primitiveValue: 'SampleTimeClock',
                                    cDisplayType: "TimeWithDay",
                                    min: "-48:00", max: "30:00",
                                    required: true
                                }
                            },
                            { headerText: 'Address',
                                group: [
                                    { headerText: 'Address<br/>Code1', key: 'addressCode1', dataType: 'string', width: '150px', columnCssClass: 'currency-symbol',
                                        constraint: {
                                            cDisplayType: "Currency",
                                            min: 3, max: 9,
                                            required: true
                                        } },
                                    { headerText: 'Address1', key: 'address1', dataType: 'string', width: '150px' }
                                ]
                            },
                            { headerText: 'Combo1',
                                group: [
                                    { headerText: 'ComboCode1', key: 'comboCode1', dataType: 'number', width: '60px', ntsType: 'comboCode_combo',
                                        constraint: {
                                            cDisplayType: "Integer",
                                            min: 1, max: 3,
                                            required: true
                                        } },
                                    { headerText: 'Combo', key: 'combo', dataType: 'string', width: '230px', ntsControl: 'Combobox' }
                                ]
                            },
                            { headerText: 'Header0', key: 'header0', dataType: 'string', width: '150px', ntsControl: 'Label',
                                click: function (id, key) {
                                    console.log(id + " - " + key);
                                }
                            },
                            { headerText: 'Combo2',
                                group: [
                                    { headerText: 'ComboCode2', key: 'comboCode2', dataType: 'number', width: '60px', ntsType: 'comboCode_header01' },
                                    { headerText: 'Header01', key: 'header01', dataType: 'string', width: '500px', ntsControl: 'Combobox2' }
                                ]
                            },
                            { headerText: 'Header02', key: 'header02', dataType: 'string', width: '500px', ntsControl: 'Combobox3' },
                            { headerText: '住所',
                                group: [
                                    { headerText: 'Address<br/>Code2', key: 'addressCode2', dataType: 'string', width: '150px' },
                                    { headerText: 'Address2', key: 'address2', dataType: 'string', width: '150px' }
                                ] },
                            { headerText: 'Header12',
                                group: [
                                    { headerText: 'Header<br/>1', key: 'header1', dataType: 'string', width: '150px', ntsType: 'code_header2', onChange: search },
                                    { headerText: 'Header2', key: 'header2', dataType: 'string', width: '150px', ntsControl: 'Link1' }
                                ] },
                            { headerText: 'Header3', key: 'header3', dataType: 'number', width: '150px' /*, ntsControl: 'TextEditor'*/ },
                            { headerText: 'Header4', key: 'header4', dataType: 'string', width: '150px' },
                            { headerText: 'Header56',
                                group: [
                                    { headerText: 'Header<br/>5', key: 'header5', dataType: 'string', width: '150px', ntsType: 'code_header6', onChange: search },
                                    { headerText: 'Header6', key: 'header6', dataType: 'string', width: '150px', ntsControl: 'Link2' }
                                ] },
                            //                                { headerText: 'Delete', key: 'delete', dataType: 'string', width: '90px', unbound: true, ntsControl: 'DeleteButton' }
                            { headerText: 'Button', key: 'alert', dataType: 'string', width: '90px', ntsControl: 'Button' }
                        ],
                        features: [
                            //                                { name: 'Sorting', type: 'local' },
                            { name: 'Resizing',
                                columnSettings: [{
                                        columnKey: 'id', allowResizing: false, minimumWidth: 0
                                    }]
                            },
                            {
                                name: 'Paging',
                                pageSize: 100,
                                currentPageIndex: 0
                            },
                            {
                                name: 'CellStyles',
                                states: statesTable
                            },
                            {
                                name: 'HeaderStyles',
                                columns: [
                                    { key: 'ruleCode', colors: ['header1'] },
                                    { key: 'addressCode1', colors: ['header1'] },
                                    { key: 'address1', colors: ['header1'] },
                                    { key: 'comboCode1', colors: ['header2'] },
                                    { key: 'combo', colors: ['header2'] },
                                    { key: 'header3', colors: ['header2'] },
                                    { key: 'header0', colors: ['header1'] },
                                    { key: 'time', colors: ['#E9AEF1'] }
                                ]
                            },
                            { name: "Sheet",
                                initialDisplay: "sheet1",
                                sheets: [
                                    { name: "sheet1", text: "Sheet 1", columns: ["time", "addressCode1", "address1", "comboCode1", "combo", "addressCode2", "address2", "header0", "comboCode2", "header01", "header02"] },
                                    { name: "sheet2", text: "Sheet 2", columns: ["addressCode1", "address1", "time", "header1", "header2", "header3", "header4", "header5", "header6", "alert"] }
                                ]
                            },
                            { name: 'ColumnFixing', fixingDirection: 'left',
                                //                                            syncRowHeights: true,
                                showFixButtons: false,
                                columnSettings: [
                                    { columnKey: 'id', isFixed: true },
                                    { columnKey: 'flexImage', isFixed: true },
                                    { columnKey: 'picture', isFixed: true },
                                    { columnKey: 'flag', isFixed: true },
                                    { columnKey: 'ruleCode', isFixed: true }
                                ] },
                            { name: 'Summaries',
                                columnSettings: [
                                    { columnKey: 'flexImage', summaryCalculator: "合計" },
                                    { columnKey: 'time', summaryCalculator: "Time" },
                                    { columnKey: 'ruleCode', summaryCalculator: "Number" },
                                    { columnKey: 'header3', summaryCalculator: "Number" },
                                ]
                            }
                        ],
                        ntsFeatures: [{ name: 'CopyPaste' },
                            { name: 'CellEdit' },
                            //                                            { name: 'Storage',
                            //                                                type: 'Remote',
                            //                                                loadPath: 'sample/store/load',
                            //                                                savePath: 'sample/store/save'
                            //                                            },
                            { name: 'CellColor', columns: [
                                    {
                                        key: 'ruleCode',
                                        parse: function (value) {
                                            return value;
                                        },
                                        map: function (result) {
                                            if (result <= 1)
                                                return "#00b050";
                                            else if (result === 2)
                                                return "pink";
                                            else
                                                return "#0ff";
                                        }
                                    }
                                ]
                            },
                            {
                                name: 'RowState',
                                rows: rowStates
                            },
                            {
                                name: "LoadOnDemand",
                                allKeysPath: "/sample/lazyload/keys",
                                pageRecordsPath: "/sample/lazyload/data",
                            }
                        ],
                        ntsControls: [{ name: 'Checkbox', options: { value: 1, text: '' }, optionsValue: 'value', optionsText: 'text', controlType: 'CheckBox', enable: true },
                            { name: 'Combobox', options: comboItems, optionsValue: 'code', optionsText: 'name', columns: comboColumns, editable: false, displayMode: 'codeName', controlType: 'ComboBox', enable: true, spaceSize: 'small' },
                            { name: 'DeleteButton', text: 'Delete', controlType: 'DeleteButton', enable: true },
                            { name: 'Button', controlType: 'Button', text: 'Warn me', enable: true, click: function () { alert("Oops!!"); } },
                            { name: 'Combobox2', options: comboItems2, optionsValue: 'code', optionsText: 'name', columns: comboColumns, editable: false, displayMode: 'name', controlType: 'ComboBox', enable: true },
                            { name: 'Combobox3', options: comboItems3, optionsValue: 'code', optionsText: 'name', columns: comboColumns, editable: false, displayMode: 'name', controlType: 'ComboBox', enable: true },
                            { name: 'Link1', click: function () { alert('Do something.'); }, controlType: 'LinkLabel' },
                            { name: 'Link2', click: function () { alert('Do something.'); }, controlType: 'LinkLabel' },
                            { name: 'FlexImage', source: 'ui-icon ui-icon-info', click: function () { alert('Show!'); }, controlType: 'FlexImage' },
                            { name: 'Image', source: 'ui-icon ui-icon-locked', controlType: 'Image' },
                            { name: 'TextEditor', controlType: 'TextEditor', constraint: { valueType: 'Integer', required: true, format: "Number_Separated" } }]
                        //                                            { name: 'TextEditor', controlType: 'TextEditor', constraint: { valueType: 'Time', required: true, format: "Time_Short_HM" } }]
                    })
                        .create();
                    $("#run").on("click", function () {
                        var source = $("#grid2").igGrid("option", "dataSource");
                        alert(source[1].flag);
                    });
                    $("#update-row").on("click", function () {
                        $("#grid2").ntsGrid("updateRow", 0, { flag: false, ruleCode: '6', combo: '3' });
                    });
                    $("#enable-ctrl").on("click", function () {
                        $("#grid2").ntsGrid("enableNtsControlAt", 1, "combo", "ComboBox");
                    });
                    $("#disable-ctrl").on("click", function () {
                        $("#grid2").ntsGrid("disableNtsControlAt", 1, "combo", "ComboBox");
                    });
                    $("#enable-ctrls").on("click", function () {
                        $("#grid2").ntsGrid("enableNtsControls", "header01", "ComboBox");
                    });
                    $("#disable-ctrls").on("click", function () {
                        var data = { name: 'Combobox', width: '100px', options: comboItems, optionsValue: 'code', optionsText: 'name', columns: comboColumns, editable: false, displayMode: 'codeName', controlType: 'ComboBox', enable: true };
                        var start = performance.now();
                        var $combo = nts.uk.ui.mgrid.ntsControls.comboBox({ initValue: 1, controlDef: data });
                        console.log(performance.now() - start);
                        document.getElementById("combo").appendChild($combo);
                    });
                    function totalNumber(data) {
                        var total = 0;
                        var currentPageIndex = $("#grid2").igGridPaging("option", "currentPageIndex");
                        var pageSize = $("#grid2").igGridPaging("option", "pageSize");
                        var startIndex = currentPageIndex * pageSize;
                        var endIndex = startIndex + pageSize;
                        _.forEach(data, function (d, i) {
                            if (i < startIndex || i >= endIndex)
                                return;
                            var n = parseInt(d);
                            if (!isNaN(n))
                                total += n;
                        });
                        return total;
                    }
                    function totalTime(data) {
                        var currentPageIndex = $("#grid2").igGridPaging("option", "currentPageIndex");
                        var pageSize = $("#grid2").igGridPaging("option", "pageSize");
                        var startIndex = currentPageIndex * pageSize;
                        var endIndex = startIndex + pageSize;
                        var total = moment.duration("0");
                        _.forEach(data, function (d, i) {
                            if (i < startIndex || i >= endIndex)
                                return;
                            total.add(moment.duration(d));
                        });
                        var time = total.asHours();
                        var hour = Math.floor(time);
                        var minute = (time - hour) * 60;
                        var roundMin = Math.round(minute);
                        var minuteStr = roundMin < 10 ? ("0" + roundMin) : String(roundMin);
                        return hour + ":" + minuteStr;
                    }
                    function search(a, b, val) {
                        var dfd = $.Deferred();
                        var i = 0;
                        var result = "Not found";
                        while (i < 500) {
                            i++;
                        }
                        if (val === "001") {
                            result = "結果01";
                        }
                        else if (val === "002") {
                            result = "結果02";
                        }
                        dfd.resolve(result);
                        return dfd.promise();
                    }
                    // Grid cell errors
                    var dialogOptions = {
                        forGrid: true,
                        headers: [
                            new nts.uk.ui.errors.ErrorHeader("rowId", "Row ID", "auto", true),
                            new nts.uk.ui.errors.ErrorHeader("columnKey", "Column Key", "auto", true),
                            new nts.uk.ui.errors.ErrorHeader("message", "Message", "auto", true),
                            new nts.uk.ui.errors.ErrorHeader("ruleCode", "Rule code", "auto", true)
                        ]
                    };
                    this.bind(model, dialogOptions);
                    //        this.bind(model);
                });
            })(gridlist = ui.gridlist || (ui.gridlist = {}));
        })(ui = uk.ui || (uk.ui = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=start.js.map