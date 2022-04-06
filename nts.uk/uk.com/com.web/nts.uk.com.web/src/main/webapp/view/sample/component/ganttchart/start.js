__viewContext.noHeader = true;
var ruler;
__viewContext.ready(function () {
    var ScreenModel = /** @class */ (function () {
        function ScreenModel() {
            var _this = this;
            this.itemList = ko.observableArray([5, 10, 15, 30].map(function (c) { return ({ code: c, name: c }); }));
            this.selectedCode = ko.observable(15);
            this.selectedCode.subscribe(function (c) {
                _this.ruler.setSnatchInterval(c / 5);
            });
            this.modes = ko.observableArray(["normal", "paste", "pasteFlex"].map(function (c) { return ({ code: c, name: c }); }));
            this.selectedMode = ko.observable("normal");
            this.selectedMode.subscribe(function (s) {
                if (s !== "normal") {
                    _this.otType.hide(true);
                    _this.coreTimeType.hide(true);
                    _this.c1Type.hide(false);
                    _this.c2Type.hide(false);
                    _this.fixedType.color("#fff");
                    _this.changableType.color("#fff");
                    _this.flexType.color("#fff");
                    _this.breakTimeType.zIndex(3000);
                }
                else {
                    _this.otType.hide(false);
                    _this.coreTimeType.hide(false);
                    _this.c1Type.hide(true);
                    _this.c2Type.hide(true);
                    _this.fixedType.color("#ccccff");
                    _this.changableType.color("#ffc000");
                    _this.flexType.color("#ccccff");
                    _this.breakTimeType.zIndex(1000);
                }
                ruler.setMode(s);
            });
            //            let ruler = new nts.uk.ui.chart.Ruler($("#gc")[0]);
            //            ruler.addType({
            //                name: "Type1",
            //                lineNo: 2,
            //                chartWidth: 30,
            //                lineWidth: 40,
            //                canSlide: true
            //            });
            //            
            //            ruler.addChart({
            //                id: "rgc1",
            //                start: 5,
            //                end: 60,
            //                limitEnd: 100,
            //                lineNo: 0,
            //                fixed: "Start",
            //                canSlide: true,
            //                color: "#F00"
            //            });
            //            
            //            ruler.addChart({
            //                id: "rgc1_1",
            //                start: 10,
            //                end: 20,
            //                lineNo: 0,
            //                followParent: true,
            //                color: "#0F0",
            //                canSlide: true,
            //                parent: "rgc1"
            //            });
            //            
            //            ruler.addChart({
            //                id: "rgc2",
            //                start: 8,
            //                end: 40,
            //                lineNo: 1,
            //                locked: true,
            //                color: "#00F"
            //            });
            //            
            //            ruler.addChartWithType("Type1", {
            //                id: "rgc3",
            //                start: 3,
            //                end: 30,
            //                color: "#ff0",
            //            });
            //            
            //            ruler.addChartWithType("Type1", {
            //                id: "rgc3_1",
            //                parent: "rgc3",
            //                start: 5,
            //                end: 19,
            //                followParent: true,
            //                color: "#0ff"
            //            });
            var leftmostColumns = [
                { key: "empId", headerText: "社員ID", width: "50px" },
                { key: "empName", headerText: "社員名", width: "160px", css: { whiteSpace: "pre" } },
                { key: "button", headerText: "Button", width: "60px", control: "button", handler: function () { alert("Button!"); } }
            ];
            var leftmostHeader = {
                columns: leftmostColumns,
                rowHeight: "33px",
                width: "270px"
            };
            var leftmostDs = [], middleDs = [];
            for (var i = 0; i < 300; i++) {
                var eName = nts.uk.text.padRight("名前" + i, " ", 10) + "AAAAAAAAAAAAAAAAAA";
                leftmostDs.push({ empId: i.toString(), empName: eName, button: "ボタン" });
                if (i % 5 === 1) {
                    middleDs.push({ empId: i.toString(), code: i + "", startTime1: "1:00", endTime1: "5:00",
                        startTime2: "8:30", endTime2: "17:30" });
                }
                else if (i % 5 === 2) {
                    middleDs.push({ empId: i.toString(), code: i + "", startTime1: "1:00", endTime1: "5:00",
                        startTime2: "8:30", endTime2: "17:30" });
                }
                else if (i % 5 === 3) {
                    middleDs.push({ empId: i.toString(), code: i + "", startTime1: "8:30", endTime1: "17:30",
                        startTime2: null, endTime2: null });
                }
                else {
                    middleDs.push({ empId: i.toString(), code: i + "", startTime1: null, endTime1: null,
                        startTime2: null, endTime2: null });
                }
            }
            var leftmostContent = {
                columns: leftmostColumns,
                dataSource: leftmostDs,
                primaryKey: "empId"
            };
            var middleColumns = [
                { headerText: "コード", key: "code", width: "50px", handlerType: "input", dataType: "text", primitiveValue: "WorkTypeCode", textFormat: { length: 3, padSide: "left", padChar: '0' } /*, control: "link", handler: (o) => { alert(o); }*/ },
                { headerText: "開始1", key: "startTime1", width: "60px", handlerType: "input", dataType: "duration", primitiveValue: "TimeWithDayAttr" },
                { headerText: "終了1", key: "endTime1", width: "60px", handlerType: "input", dataType: "time" },
                { headerText: "開始2", key: "startTime2", width: "60px", handlerType: "input", dataType: "time" },
                { headerText: "終了2", key: "endTime2", width: "60px", handlerType: "input", dataType: "time" }
            ];
            var middleHeader = {
                columns: middleColumns,
                width: "200px",
                rowHeight: "33px"
            };
            var middleDeco = [];
            middleDeco.push(new CellColor("3", "startTime1", "xseal"));
            middleDeco.push(new CellColor("6", "startTime2", "xseal"));
            var middleContent = {
                columns: middleColumns,
                dataSource: middleDs,
                primaryKey: "empId",
                features: [
                    {
                        name: "BodyCellStyle",
                        decorator: middleDeco
                    }
                ]
            };
            var width = "48px";
            var detailColumns = [{
                    key: "empId", width: "0px", headerText: "ABC", visible: false
                }, {
                    key: "_0", width: width
                }, {
                    key: "_1", width: width
                }, {
                    key: "_2", width: width
                }, {
                    key: "_3", width: width
                }, {
                    key: "_4", width: width
                }, {
                    key: "_5", width: width
                }, {
                    key: "_6", width: width
                }, {
                    key: "_7", width: width
                }, {
                    key: "_8", width: width
                }, {
                    key: "_9", width: width
                }, {
                    key: "_10", width: width
                }, {
                    key: "_11", width: width
                }, {
                    key: "_12", width: width
                }, {
                    key: "_13", width: width
                }, {
                    key: "_14", width: width
                }, {
                    key: "_15", width: width
                }, {
                    key: "_16", width: width
                }, {
                    key: "_17", width: width
                }, {
                    key: "_18", width: width
                }, {
                    key: "_19", width: width
                }, {
                    key: "_20", width: width
                }, {
                    key: "_21", width: width
                }, {
                    key: "_22", width: width
                }, {
                    key: "_23", width: width
                }];
            var detailHeaderDs = [{ empId: "", _0: "0", _1: "1", _2: "2", _3: "3", _4: "4", _5: "5", _6: "6", _7: "7", _8: "8", _9: "9", _10: "10", _11: "11", _12: "12", _13: "13", _14: "14", _15: "15", _16: "16", _17: "17", _18: "18", _19: "19", _20: "20", _21: "21", _22: "22", _23: "23" }];
            var detailHeader = {
                columns: detailColumns,
                dataSource: detailHeaderDs,
                rowHeight: "33px",
                width: "700px"
            };
            var detailContentDs = [];
            for (var i = 0; i < 300; i++) {
                detailContentDs.push({ empId: i.toString(), _0: "", _1: "", _2: "", _3: "", _4: "", _5: "", _6: "", _7: "", _8: "", _9: "", _10: "", _11: "", _12: "", _13: "", _14: "", _15: "", _16: "", _17: "", _18: "", _19: "", _20: "", _21: "", _22: "", _23: "" });
            }
            var detailDeco = [];
            detailDeco.push(new CellColor("3", "_6", "xseal"));
            detailDeco.push(new CellColor("6", "_6", "xseal"));
            var detailContent = {
                columns: detailColumns,
                dataSource: detailContentDs,
                primaryKey: "empId",
                features: [
                    {
                        name: "BodyCellStyle",
                        decorator: detailDeco
                    }, {
                        name: "RightClick",
                        chartFilter: function () {
                            return true;
                        },
                        handler: function (ui) {
                            var items = [
                                { id: "終日に拡大", text: "終日に拡大", selectHandler: function (id) { } },
                                { id: "削除", text: "削除", selectHandler: function (id) { ruler.removeBy({ no: ui.rowIndex, id: ui.id }); } }
                            ];
                            ui.contextMenu(items);
                            ui.contextMenu("show");
                        }
                    }
                ]
            };
            var extable = new nts.uk.ui.exTable.ExTable($("#extable"), {
                headerHeight: "33px",
                bodyRowHeight: "30px",
                bodyHeight: "400px",
                horizontalSumHeaderHeight: "75px", horizontalSumBodyHeight: "140px",
                horizontalSumBodyRowHeight: "20px",
                areaResize: true,
                columnVirtualization: true,
                errorMessagePopup: true,
                showTooltipIfOverflow: true,
                manipulatorId: "6",
                manipulatorKey: "empId",
                bodyHeightMode: "dynamic",
                windowXOccupation: 40,
                windowYOccupation: 200
            }).LeftmostHeader(leftmostHeader).LeftmostContent(leftmostContent)
                .MiddleHeader(middleHeader).MiddleContent(middleContent)
                .DetailHeader(detailHeader).DetailContent(detailContent);
            extable.create();
            var recharge = function (detail) {
                if (detail.rowIndex % 5 === 1) {
                    var time = nts.uk.time.minutesBased.duration.parseString(detail.value).toValue();
                    if (detail.columnKey === "startTime2") {
                        ruler.extend(detail.rowIndex, "rgc".concat(detail.rowIndex), Math.round(time / 5));
                    }
                    else if (detail.columnKey === "endTime2") {
                        ruler.extend(detail.rowIndex, "rgc".concat(detail.rowIndex), null, Math.round(time / 5));
                    }
                }
                else if (detail.rowIndex % 5 === 2) {
                    var time = nts.uk.time.minutesBased.duration.parseString(detail.value).toValue();
                    if (detail.columnKey === "startTime1") {
                        ruler.extend(detail.rowIndex, "lgc".concat(detail.rowIndex), Math.round(time / 5));
                    }
                    else if (detail.columnKey === "endTime1") {
                        ruler.extend(detail.rowIndex, "lgc".concat(detail.rowIndex), null, Math.round(time / 5));
                    }
                }
            };
            $("#extable").on("extablecellupdated", function (e) {
                recharge(e.detail);
            });
            $("#extable").on("extablecellretained", function (e) {
                recharge(e.detail);
            });
            this.ruler = extable.getChartRuler();
            ruler = this.ruler;
            //            ruler.setMode("paste");
            ruler.setSnatchInterval(3);
            this.c1Type = {
                name: "C1",
                color: "#F00",
                lineWidth: 30,
                canSlide: false,
                unitToPx: 4,
                hide: ruler.loggable(false),
                canPaste: true,
                canPasteResize: true,
                pastingResizeFinished: function (line, type, start, end) {
                    console.log("".concat(line, "-").concat(type, "-").concat(start, "-").concat(end));
                }
            };
            ruler.addType(this.c1Type);
            this.c2Type = {
                name: "C2",
                color: "#0F0",
                lineWidth: 30,
                canSlide: false,
                unitToPx: 4,
                hide: ruler.loggable(false),
                canPaste: true,
                canPasteResize: true,
                pastingResizeFinished: function (line, type, start, end) {
                    console.log("".concat(line, "-").concat(type, "-").concat(start, "-").concat(end));
                }
            };
            ruler.addType(this.c2Type);
            this.fixedType = {
                name: "Fixed",
                color: ruler.loggable("#ccccff"),
                lineWidth: 30,
                canSlide: false,
                unitToPx: 4,
                canPaste: true
            };
            this.ruler.addType(this.fixedType);
            this.changableType = {
                name: "Changeable",
                color: ruler.loggable("#ffc000"),
                lineWidth: 30,
                canSlide: true,
                unitToPx: 4,
                bePassedThrough: false,
                canPaste: true
            };
            this.ruler.addType(this.changableType);
            this.flexType = {
                name: "Flex",
                color: ruler.loggable("#ccccff"),
                lineWidth: 30,
                canSlide: true,
                unitToPx: 4,
                canPaste: true
            };
            this.ruler.addType(this.flexType);
            this.breakTimeType = {
                name: "BreakTime",
                followParent: true,
                color: "#ff9999",
                lineWidth: 30,
                canSlide: true,
                unitToPx: 4,
                pin: true,
                rollup: true,
                roundEdge: true,
                fixed: "Both",
                bePassedThrough: false,
                zIndex: ruler.loggable(1000)
            };
            this.ruler.addType(this.breakTimeType);
            this.otType = {
                name: "OT",
                followParent: true,
                color: "#ffff00",
                lineWidth: 30,
                canSlide: false,
                unitToPx: 4,
                pin: true,
                rollup: true,
                fixed: "Both",
                canPaste: true,
                hide: ruler.loggable(false)
            };
            this.ruler.addType(this.otType);
            this.coreTimeType = {
                name: "CoreTime",
                color: "#00ffcc",
                lineWidth: 30,
                unitToPx: 4,
                fixed: "Both",
                canPaste: true,
                hide: ruler.loggable(false)
            };
            this.ruler.addType(this.coreTimeType);
            var _loop_1 = function (i) {
                var start = Math.round(((i % 60) + i / 60) / 2);
                if (i % 5 === 1) {
                    // 固定勤務時間
                    var lgc = this_1.ruler.addChartWithType("Fixed", {
                        id: "lgc".concat(i),
                        start: 12,
                        end: 60,
                        lineNo: i,
                        limitStartMax: 60,
                        limitEndMax: 72
                    });
                    this_1.ruler.addChartWithType("BreakTime", {
                        id: "lgc".concat(i, "_0"),
                        parent: "lgc".concat(i),
                        lineNo: i,
                        start: 24,
                        end: 25,
                        limitStartMin: 12,
                        limitStartMax: 60,
                        limitEndMax: 60
                    });
                    this_1.ruler.addChartWithType("OT", {
                        id: "lgc".concat(i, "_1"),
                        parent: "lgc".concat(i),
                        lineNo: i,
                        start: 0,
                        end: 12
                    });
                    this_1.ruler.addChartWithType("OT", {
                        id: "lgc".concat(i, "_2"),
                        parent: "lgc".concat(i),
                        lineNo: i,
                        start: 60,
                        end: 72
                    });
                    var gc = this_1.ruler.addChartWithType("Fixed", {
                        id: "rgc".concat(i),
                        start: 102,
                        end: 210,
                        lineNo: i,
                        limitStartMin: 84,
                        limitStartMax: 264,
                        limitEndMax: 264,
                        title: "固定勤務"
                    });
                    $(gc).on("gcresize", function (e) {
                        var param = e.detail;
                        var minutes;
                        if (param[2]) {
                            minutes = nts.uk.time.minutesBased.duration.create(param[0] * 5).text;
                            $("#extable").exTable("cellValue", "middle", i + "", "startTime2", minutes);
                        }
                        else {
                            minutes = nts.uk.time.minutesBased.duration.create(param[1] * 5).text;
                            $("#extable").exTable("cellValue", "middle", i + "", "endTime2", minutes);
                        }
                    });
                    this_1.ruler.addChartWithType("BreakTime", {
                        id: "rgc".concat(i, "_0"),
                        parent: "rgc".concat(i),
                        lineNo: i,
                        start: 144,
                        end: 156,
                        limitStartMin: 102,
                        limitStartMax: 210,
                        limitEndMax: 210
                    });
                    this_1.ruler.addChartWithType("OT", {
                        id: "rgc".concat(i, "_1"),
                        parent: "rgc".concat(i),
                        lineNo: i,
                        start: 84,
                        end: 102
                    });
                    this_1.ruler.addChartWithType("OT", {
                        id: "rgc".concat(i, "_2"),
                        parent: "rgc".concat(i),
                        lineNo: i,
                        start: 210,
                        end: 264
                    });
                }
                if (i % 5 === 2) {
                    //　流動勤務時間
                    var cgc = this_1.ruler.addChartWithType("Changeable", {
                        id: "lgc".concat(i),
                        start: 8,
                        end: 65,
                        lineNo: i,
                        limitStartMax: 264,
                        limitEndMax: 264,
                        resizeFinished: function (b, e, p) {
                            var minutes;
                            if (p) {
                                minutes = nts.uk.time.minutesBased.duration.create(b * 5).text;
                                $("#extable").exTable("cellValue", "middle", i + "", "startTime1", minutes);
                            }
                            else {
                                minutes = nts.uk.time.minutesBased.duration.create(e * 5).text;
                                $("#extable").exTable("cellValue", "middle", i + "", "endTime1", minutes);
                            }
                        },
                        dropFinished: function (b, e) {
                        }
                    });
                    $(cgc).on("gcdrop", function (e) {
                        var param = e.detail;
                        var minutes = nts.uk.time.minutesBased.duration.create(param[0] * 5).text;
                        $("#extable").exTable("cellValue", "middle", i + "", "startTime1", minutes);
                        minutes = nts.uk.time.minutesBased.duration.create(param[1] * 5).text;
                        $("#extable").exTable("cellValue", "middle", i + "", "endTime1", minutes);
                    });
                    this_1.ruler.addChartWithType("BreakTime", {
                        id: "lgc".concat(i, "_0"),
                        parent: "lgc".concat(i),
                        followParent: false,
                        pruneOnSlide: true,
                        zIndex: 1001,
                        lineNo: i,
                        start: 24,
                        end: 36,
                        limitStartMin: 12,
                        limitStartMax: 60,
                        limitEndMax: 60
                    });
                    this_1.ruler.addChartWithType("OT", {
                        id: "lgc".concat(i, "_1"),
                        parent: "lgc".concat(i),
                        lineNo: i,
                        start: 0,
                        end: 12
                    });
                    this_1.ruler.addChartWithType("OT", {
                        id: "lgc".concat(i, "_2"),
                        parent: "lgc".concat(i),
                        lineNo: i,
                        start: 60,
                        end: 72
                    });
                    this_1.ruler.addChartWithType("Changeable", {
                        id: "rgc".concat(i),
                        start: 86,
                        end: 224,
                        lineNo: i,
                        limitStartMin: 84,
                        limitStartMax: 264,
                        limitEndMax: 264,
                        title: "流動勤務"
                    });
                    //                    this.ruler.addChartWithType("BreakTime", {
                    //                        id: `rgc${i}_0`,
                    //                        parent: `rgc${i}`,
                    //                        lineNo: i,
                    //                        start: 144,
                    //                        end: 156,
                    //                        limitStartMin: 102,
                    //                        limitStartMax: 210,
                    //                        limitEndMax: 210
                    //                    });
                    this_1.ruler.addChartWithType("OT", {
                        id: "rgc".concat(i, "_1"),
                        parent: "rgc".concat(i),
                        lineNo: i,
                        start: 84,
                        end: 102
                    });
                    this_1.ruler.addChartWithType("OT", {
                        id: "rgc".concat(i, "_2"),
                        parent: "rgc".concat(i),
                        lineNo: i,
                        start: 210,
                        end: 264
                    });
                    this_1.ruler.addChartWithType("BreakTime", {
                        id: "rgc".concat(i, "_0"),
                        parent: "rgc".concat(i),
                        lineNo: i,
                        start: 90,
                        end: 96,
                        limitStartMin: 84,
                        limitStartMax: 264,
                        limitEndMax: 264
                    });
                }
                // フレックス
                if (i % 5 === 3) {
                    var flexChart = this_1.ruler.addChartWithType("Flex", {
                        id: "rgc".concat(i),
                        start: 102,
                        end: 210,
                        lineNo: i,
                        //                        limitStartMin: 84,
                        //                        limitStartMax: 144,
                        //                        limitEndMin: 168,
                        //                        limitEndMax: 264,
                        title: "フレックス勤務"
                    });
                    $(flexChart).on("gcdrop", function (e) {
                        var param = e.detail;
                        var minutes = nts.uk.time.minutesBased.duration.create(param[0] * 5).text;
                        $("#extable").exTable("cellValue", "middle", i + "", "startTime1", minutes);
                        minutes = nts.uk.time.minutesBased.duration.create(param[1] * 5).text;
                        $("#extable").exTable("cellValue", "middle", i + "", "endTime1", minutes);
                    });
                    $(flexChart).on("gcresize", function (e) {
                        var param = e.detail;
                        var minutes;
                        if (param[2]) {
                            minutes = nts.uk.time.minutesBased.duration.create(param[0] * 5).text;
                            $("#extable").exTable("cellValue", "middle", i + "", "startTime1", minutes);
                        }
                        else {
                            minutes = nts.uk.time.minutesBased.duration.create(param[1] * 5).text;
                            $("#extable").exTable("cellValue", "middle", i + "", "endTime1", minutes);
                        }
                    });
                    this_1.ruler.addChartWithType("CoreTime", {
                        id: "rgc".concat(i, "_3"),
                        parent: "rgc".concat(i),
                        lineNo: i,
                        start: 144,
                        end: 168,
                        pin: true
                    });
                    //                    this.ruler.addChartWithType("BreakTime", {
                    //                        id: `rgc${i}_0`,
                    //                        parent: `rgc${i}`,
                    //                        lineNo: i,
                    //                        start: 144,
                    //                        end: 156,
                    //                        limitStartMin: 102,
                    //                        limitStartMax: 210,
                    //                        limitEndMax: 210
                    //                    });
                    //                    
                    //                    this.ruler.addChartWithType("BreakTime", {
                    //                        id: `rgc${i}_4`,
                    //                        parent: `rgc${i}`,
                    //                        lineNo: i,
                    //                        start: 168,
                    //                        end: 180,
                    //                        limitStartMin: 102,
                    //                        limitStartMax: 210,
                    //                        limitEndMax: 210
                    //                    });
                    this_1.ruler.addChartWithType("OT", {
                        id: "rgc".concat(i, "_1"),
                        parent: "rgc".concat(i),
                        lineNo: i,
                        start: 84,
                        end: 102
                    });
                    this_1.ruler.addChartWithType("OT", {
                        id: "rgc".concat(i, "_2"),
                        parent: "rgc".concat(i),
                        lineNo: i,
                        start: 210,
                        end: 264
                    });
                }
            };
            var this_1 = this;
            for (var i = 0; i < 300; i++) {
                _loop_1(i);
            }
            this.ruler.setLock([0, 1, 2, 3], true);
        }
        ScreenModel.prototype.replace = function () {
            this.ruler.replaceAt(7, [
                {
                    type: "Flex",
                    options: {
                        id: "lgc7",
                        start: 12,
                        end: 60,
                        lineNo: 7,
                        limitStartMax: 60,
                        limitEndMax: 72
                    }
                }, {
                    type: "BreakTime",
                    options: {
                        id: "lgc7_0",
                        parent: "lgc7",
                        lineNo: 7,
                        start: 24,
                        end: 36,
                        limitStartMin: 12,
                        limitStartMax: 60,
                        limitEndMax: 60
                    }
                }, {
                    type: "OT",
                    options: {
                        id: "lgc7_1",
                        parent: "lgc7",
                        lineNo: 7,
                        start: 0,
                        end: 12
                    }
                }, {
                    type: "OT",
                    options: {
                        id: "lgc7_2",
                        parent: "lgc7",
                        lineNo: 7,
                        start: 60,
                        end: 72
                    }
                }
            ]);
        };
        ScreenModel.prototype.chart1 = function () {
            ruler.pasteChart({ typeName: "C1", zIndex: 2002 });
        };
        ScreenModel.prototype.chart2 = function () {
            ruler.pasteChart({ typeName: "C2", zIndex: 2002 });
        };
        return ScreenModel;
    }());
    var CellColor = /** @class */ (function () {
        function CellColor(rowId, columnKey, clazz) {
            this.columnKey = columnKey;
            this.rowId = rowId;
            this.clazz = clazz;
        }
        return CellColor;
    }());
    var screenModel = new ScreenModel();
    this.bind(screenModel);
});
//# sourceMappingURL=start.js.map