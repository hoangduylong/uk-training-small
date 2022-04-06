var text = nts.uk.resource.getText;
var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cas001;
                (function (cas001) {
                    var d;
                    (function (d) {
                        var __viewContext = window["__viewContext"] || {};
                        __viewContext.ready(function () {
                            var screenModel = new d.viewmodel.ScreenModel();
                            __viewContext["viewModel"] = screenModel;
                            __viewContext["viewModel"].start().done(function (data) {
                                initGrid();
                                __viewContext.bind(__viewContext['viewModel']);
                                $('#search > div:nth-child(1) > span > input').focus();
                            });
                        });
                    })(d = cas001.d || (cas001.d = {}));
                })(cas001 = view.cas001 || (view.cas001 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
function initGrid() {
    $("#grid").ntsGrid({
        width: '440px',
        height: '338px',
        dataSource: __viewContext["viewModel"].categoryList() || [],
        primaryKey: 'categoryId',
        rowVirtualization: true,
        virtualization: true,
        virtualizationMode: 'continuous',
        enter: 'below',
        columns: [
            { headerText: '', key: 'categoryId', dataType: "string", width: "50px", height: "40px", hidden: true },
            { headerText: text('CAS001_30'), key: "otherAuth", dataType: "boolean", width: "38px", height: "40px", ntsControl: 'Checkbox', showHeaderCheckbox: true },
            { headerText: text('CAS001_31'), key: "selfAuth", dataType: "boolean", width: "38px", height: "40px", ntsControl: 'Checkbox1', showHeaderCheckbox: true },
            { headerText: text('CAS001_21'), key: "categoryName", dataType: "string", width: "300px", height: "40px" }
        ],
        ntsControls: [{ name: 'Checkbox', options: { value: 1, text: '' }, optionsValue: 'value', optionsText: 'text', controlType: 'CheckBox', enable: true },
            { name: 'Checkbox1', options: { value: 1, text: '' }, optionsValue: 'value', optionsText: 'text', controlType: 'CheckBox', enable: true }],
        features: [
            {
                name: 'Selection',
                mode: 'row',
                multipleSelection: true,
                rowSelectionChanged: selectionChanged.bind(this)
            }, {
                name: "Tooltips",
                columnSettings: [
                    { columnKey: "categoryName", allowTooltips: true }
                ],
                visibility: "overflow"
            }
        ]
    });
    $("#grid").closest('.ui-iggrid').addClass('nts-gridlist');
    $("#grid").setupSearchScroll("igGrid", true);
    $(document).on("click", "#grid_selfAuth > span > div > label > input", function (evt, ui) {
        var _this = $(this), grid = $("#grid"), checked = $("#grid_selfAuth > span > div > label > input:checked").val() == "on" ? true : false, categoryIdlst = _.map(grid.igGrid("option", "dataSource"), function (c) { return c.categoryId; });
        _.each(categoryIdlst, function (c) {
            setTimeout(function () {
                grid.ntsGrid("updateRow", c, { selfAuth: checked });
            }, 1);
        });
    });
    $(document).on("click", "#grid_otherAuth > span > div > label > input", function (evt, ui) {
        var _this = $(this), grid = $("#grid"), checked = $("#grid_otherAuth > span > div > label > input:checked").val() == "on" ? true : false, categoryIdlst = _.map(grid.igGrid("option", "dataSource"), function (c) { return c.categoryId; });
        _.each(categoryIdlst, function (c) {
            setTimeout(function () {
                grid.ntsGrid("updateRow", c, { otherAuth: checked });
            }, 1);
        });
    });
}
function selectionChanged(evt, ui) {
    //console.log(evt.type);
    var selectedRows = ui.selectedRows;
    var arr = [];
    for (var i = 0; i < selectedRows.length; i++) {
        arr.push("" + selectedRows[i].id);
    }
    __viewContext.selectedList(arr);
}
;
//# sourceMappingURL=cas001.d.start.js.map