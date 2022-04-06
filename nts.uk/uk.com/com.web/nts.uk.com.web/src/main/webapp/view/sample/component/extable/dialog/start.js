__viewContext.ready(function () {
    var ScreenModel = /** @class */ (function () {
        function ScreenModel() {
            var self = this;
        }
        return ScreenModel;
    }());
    this.bind(new ScreenModel());
    var leftmostColumns2 = [{ key: "workTimeCode", headerText: "コード", width: "60px", handlerType: "input", dataType: "text",
            ajaxValidate: {
                request: function (text) {
                    var dfd = $.Deferred();
                    setTimeout(function () {
                        if (/^\d{2}[A-Z]{2}$/.test(text)) {
                            dfd.resolve({ code: text, name: (text + "  Test") });
                        }
                        else {
                            dfd.reject({});
                        }
                    }, 1000);
                    return dfd.promise();
                },
                onValid: function (ui, res) {
                    $("#extable2").exTable("cellValueByIndex", "leftmost", ui.rowIndex, "workTimeName", res.name);
                },
                onFailed: function (ui, res) {
                }
            }
        },
        { key: "workTimeName", headerText: "就業時間", width: "100px", handlerType: "roundTrip",
            supplier: function (data, rowIndex, columnKey) {
                nts.uk.ui.windows.sub.modal("/view/sample/component/extable/dialog/sample.xhtml").onClosed(function () {
                    var id = nts.uk.util.randomId().substr(0, 6);
                    $("#extable2").exTable("roundGet", id + "  休憩");
                    $("#extable2").exTable("rowId", rowIndex, id);
                });
            } }];
    var leftmostHeader2 = {
        columns: [{ key: "workTimeName", headerText: "就業時間", width: "160px" }],
        rowHeight: "45px",
        width: "160px"
    };
    var leftmostDs2 = [{ workTimeCode: "000", workTimeName: "000  通常" },
        { workTimeCode: "001", workTimeName: "001  日働 " },
        { workTimeCode: "002", workTimeName: "002  休出" },
        { workTimeCode: "003", workTimeName: "003  フレックス" }];
    for (var i = 4; i < 100; i++) {
        var tmp = {};
        tmp.workTimeCode = "00" + i;
        if (i % 2) {
            tmp.workTimeName = "00" + i + "  通常";
        }
        else {
            tmp.workTimeName = "00" + i + "  休出";
        }
        leftmostDs2.push(tmp);
    }
    var leftmostContent2 = {
        columns: leftmostColumns2,
        dataSource: leftmostDs2,
        primaryKey: "workTimeCode"
    };
    var detailColumns2 = [{
            key: "workTimeCode", width: "50px", headerText: "ABC", visible: false
        }, {
            key: "_1", width: "100px", handlerType: "Input", dataType: "number", min: "1", max: "19", required: false
        }, {
            key: "_2", width: "100px", handlerType: "Input", dataType: "number", required: true
        }, {
            key: "_3", width: "100px", handlerType: "Input", dataType: "number"
        }, {
            key: "_4", width: "100px", handlerType: "input", dataType: "number"
        }, {
            key: "_5", width: "100px", handlerType: "input", dataType: "number"
        }, {
            key: "_6", width: "100px", handlerType: "input", dataType: "number"
        }, {
            key: "_7", width: "100px", handlerType: "input", dataType: "number"
        }, {
            key: "_8", width: "100px", handlerType: "input", dataType: "number"
        }, {
            key: "_9", width: "100px", handlerType: "input", dataType: "number"
        }, {
            key: "_10", width: "100px", handlerType: "input", dataType: "number"
        }, {
            key: "_11", width: "100px", handlerType: "input", dataType: "number"
        }, {
            key: "_12", width: "100px", handlerType: "input", dataType: "number"
        }, {
            key: "_13", width: "100px", handlerType: "input", dataType: "number"
        }, {
            key: "_14", width: "100px", handlerType: "input", dataType: "number"
        }, {
            key: "_15", width: "100px", handlerType: "input", dataType: "number"
        }, {
            key: "_16", width: "100px", handlerType: "input", dataType: "number"
        }, {
            key: "_17", width: "100px", handlerType: "input", dataType: "number"
        }, {
            key: "_18", width: "100px", handlerType: "input", dataType: "number"
        }, {
            key: "_19", width: "100px", handlerType: "input", dataType: "number"
        }, {
            key: "_20", width: "100px", handlerType: "input", dataType: "number"
        }, {
            key: "_21", width: "100px", handlerType: "input", dataType: "number"
        }, {
            key: "_22", width: "100px", handlerType: "input", dataType: "number"
        }, {
            key: "_23", width: "100px", handlerType: "input", dataType: "number"
        }, {
            key: "_24", width: "100px", handlerType: "input", dataType: "number"
        }, {
            key: "_25", width: "100px", handlerType: "input", dataType: "number"
        }, {
            key: "_26", width: "100px", handlerType: "input", dataType: "number"
        }, {
            key: "_27", width: "100px", handlerType: "input", dataType: "number"
        }, {
            key: "_28", width: "100px", handlerType: "input", dataType: "number"
        }, {
            key: "_29", width: "100px", handlerType: "input", dataType: "number"
        }, {
            key: "_30", width: "100px", handlerType: "input", dataType: "number"
        }, {
            key: "_31", width: "100px", handlerType: "input", dataType: "number"
        }];
    var ExItem2 = /** @class */ (function () {
        function ExItem2(workTimeCode, manual) {
            this.workTimeCode = workTimeCode;
            if (manual) {
                var days = ["日", "月", "火", "水", "木", "金", "土"];
                for (var i = -6; i <= 31; i++) {
                    if (i <= 0) {
                        var d = 31 + i;
                        this["__" + d] = d + "<br/>" + days[7 + i === 7 ? 0 : 7 + i];
                    }
                    else {
                        this["_" + i] = "4/" + i + "<br/>" + days[i % 7];
                    }
                }
                return;
            }
            for (var i = -6; i <= 31; i++) {
                if (i <= 0) {
                    var d = 31 + i;
                    this["__" + d] = 0;
                }
                else if (i === 1)
                    this["_" + i] = i;
                else if (i === 2)
                    this["_" + i] = i;
                else if (i === 3)
                    this["_" + i] = i;
                else if (i === 4)
                    this["_" + i] = i;
                else
                    this["_" + i] = i;
            }
        }
        return ExItem2;
    }());
    var detailHeader2 = {
        columns: detailColumns2,
        dataSource: [new ExItem2(undefined, true)],
        rowHeight: "45px",
        width: "700px"
    };
    var detailContentDs2 = [];
    for (var i = 0; i < 100; i++) {
        detailContentDs2.push(new ExItem2("00" + i));
    }
    var detailContent2 = {
        columns: detailColumns2,
        dataSource: detailContentDs2,
        primaryKey: "workTimeCode"
    };
    new nts.uk.ui.exTable.ExTable($("#extable2"), {
        headerHeight: "45px", bodyRowHeight: "31px", bodyHeight: "100px", horizontalSumBodyRowHeight: "10px",
        bodyHeightMode: "dynamic",
        windowXOccupation: 100,
        windowYOccupation: 360,
        updateMode: "edit",
        pasteOverWrite: true,
        secondaryTable: $("#extable3"),
        features: [{
                name: "Updating"
            }]
    })
        .LeftmostHeader(leftmostHeader2).LeftmostContent(leftmostContent2)
        .DetailHeader(detailHeader2).DetailContent(detailContent2).create();
    var leftmostHeader2_2 = {
        columns: [{ key: "workTimeName", headerText: "就業時間", width: "200px" }],
        rowHeight: "45px",
        width: "200px"
    };
    var leftmostContent2_2 = {
        columns: [{ key: "workTimeCode", headerText: "コード", width: "60px" },
            { key: "workTimeName", headerText: "就業時間", width: "140px" }],
        dataSource: leftmostDs2,
        primaryKey: "workTimeCode"
    };
    var detailColumns2_2 = [{
            key: "workTimeCode", width: "50px", headerText: "ABC", visible: false
        }, {
            key: "_1", width: "100px"
        }, {
            key: "_2", width: "100px"
        }, {
            key: "_3", width: "100px"
        }, {
            key: "_4", width: "100px"
        }, {
            key: "_5", width: "100px"
        }, {
            key: "_6", width: "100px"
        }, {
            key: "_7", width: "100px"
        }, {
            key: "_8", width: "100px"
        }, {
            key: "_9", width: "100px"
        }, {
            key: "_10", width: "100px"
        }, {
            key: "_11", width: "100px"
        }, {
            key: "_12", width: "100px"
        }, {
            key: "_13", width: "100px"
        }, {
            key: "_14", width: "100px"
        }, {
            key: "_15", width: "100px"
        }, {
            key: "_16", width: "100px"
        }, {
            key: "_17", width: "100px"
        }, {
            key: "_18", width: "100px"
        }, {
            key: "_19", width: "100px"
        }, {
            key: "_20", width: "100px"
        }, {
            key: "_21", width: "100px"
        }, {
            key: "_22", width: "100px"
        }, {
            key: "_23", width: "100px"
        }, {
            key: "_24", width: "100px"
        }, {
            key: "_25", width: "100px"
        }, {
            key: "_26", width: "100px"
        }, {
            key: "_27", width: "100px"
        }, {
            key: "_28", width: "100px"
        }, {
            key: "_29", width: "100px"
        }, {
            key: "_30", width: "100px"
        }, {
            key: "_31", width: "100px"
        }];
    var detailContent2_2 = {
        columns: detailColumns2_2,
        dataSource: detailContentDs2,
        primaryKey: "workTimeCode"
    };
    new nts.uk.ui.exTable.ExTable($("#extable3"), {
        headerHeight: "45px", bodyRowHeight: "31px", bodyHeight: "100px", horizontalSumBodyRowHeight: "10px",
        bodyHeightMode: "dynamic",
        windowXOccupation: 100,
        windowYOccupation: 360,
        updateMode: "edit",
        pasteOverWrite: true,
        primaryTable: $("#extable2")
    })
        .LeftmostHeader(leftmostHeader2_2).LeftmostContent(leftmostContent2_2)
        .DetailHeader(detailHeader2).DetailContent(detailContent2_2).create();
    //    $("#extable2").exTable("linkTables", $("#extable3"));
});
//# sourceMappingURL=start.js.map