__viewContext.noHeader = true;
var ruler;
__viewContext.ready(function() {
    
    class ScreenModel {
        constructor() { 
            this.itemList = ko.observableArray([ 5, 10, 15, 30 ].map(c => ({ code: c, name: c })));
            this.selectedCode = ko.observable(15);
            this.selectedCode.subscribe(c => {
                this.ruler.setSnatchInterval(c / 5);
            });
            
            this.modes = ko.observableArray([ "normal", "paste", "pasteFlex" ].map(c => ({ code: c, name: c })));
            this.selectedMode = ko.observable("normal");
            this.selectedMode.subscribe(s => {
                if (s !== "normal") {
                    this.otType.hide(true);
                    this.coreTimeType.hide(true);
                    this.c1Type.hide(false);
                    this.c2Type.hide(false);
                    this.fixedType.color("#fff");
                    this.changableType.color("#fff");
                    this.flexType.color("#fff");
                    this.breakTimeType.zIndex(3000);
                } else {
                    this.otType.hide(false);
                    this.coreTimeType.hide(false);
                    this.c1Type.hide(true);
                    this.c2Type.hide(true);
                    this.fixedType.color("#ccccff");
                    this.changableType.color("#ffc000");
                    this.flexType.color("#ccccff");
                    this.breakTimeType.zIndex(1000);
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
            
            let leftmostColumns = [
                { key: "empId", headerText: "社員ID", width: "50px" },
                { key: "empName", headerText: "社員名", width: "160px", css: { whiteSpace: "pre" }},
                { key: "button", headerText: "Button", width: "60px", control: "button", handler: function() { alert("Button!"); }}
            ];
            let leftmostHeader = {
                columns: leftmostColumns,
                rowHeight: "33px",
                width: "270px"
            };
            
            let leftmostDs = [], middleDs = [];
            for (let i = 0; i < 300; i++) {
                let eName = nts.uk.text.padRight("名前" + i, " ", 10) + "AAAAAAAAAAAAAAAAAA";
                leftmostDs.push({　empId: i.toString(), empName: eName, button: "ボタン" });
                if (i % 5 === 1) {
                    middleDs.push({ empId: i.toString(), code: i + "", startTime1: "1:00", endTime1: "5:00",
                        startTime2: "8:30", endTime2: "17:30" });
                } else if (i % 5 === 2) {
                    middleDs.push({ empId: i.toString(), code: i + "", startTime1: "1:00", endTime1: "5:00",
                        startTime2: "8:30", endTime2: "17:30" });
                } else if (i % 5 === 3) {
                    middleDs.push({ empId: i.toString(), code: i + "", startTime1: "8:30", endTime1: "17:30",
                        startTime2: null, endTime2: null });
                } else {
                    middleDs.push({ empId: i.toString(), code: i + "", startTime1: null, endTime1: null,
                        startTime2: null, endTime2: null });
                }
            }
            
            let leftmostContent = {
                columns: leftmostColumns,
                dataSource: leftmostDs,
                primaryKey: "empId"
            };
            
            let middleColumns = [
                { headerText: "コード", key: "code", width: "50px", handlerType: "input", dataType: "text", primitiveValue: "WorkTypeCode", textFormat: { length: 3, padSide: "left", padChar: '0' } /*, control: "link", handler: (o) => { alert(o); }*/ },
                { headerText: "開始1", key: "startTime1", width: "60px", handlerType: "input", dataType: "duration", primitiveValue: "TimeWithDayAttr" },
                { headerText: "終了1", key: "endTime1", width: "60px", handlerType: "input", dataType: "time" },
                { headerText: "開始2", key: "startTime2", width: "60px", handlerType: "input", dataType: "time" },
                { headerText: "終了2", key: "endTime2", width: "60px", handlerType: "input", dataType: "time" }
            ];
            
            let middleHeader = {
                columns: middleColumns,
                width: "200px",
                rowHeight: "33px"
            };
            
            let middleDeco = [];
            middleDeco.push(new CellColor("3", "startTime1", "xseal"));
            middleDeco.push(new CellColor("6", "startTime2", "xseal"));
            let middleContent = {
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
            
            let width = "48px";
            let detailColumns = [{
               key: "empId", width: "0px", headerText: "ABC", visible: false
            }, {
                key: "_0", width: width
            },{
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
            
            let detailHeaderDs = [{ empId: "", _0: "0", _1: "1", _2: "2", _3: "3", _4: "4", _5: "5", _6: "6", _7: "7", _8: "8", _9: "9", _10: "10", _11: "11", _12: "12", _13: "13", _14: "14", _15: "15", _16: "16", _17: "17", _18: "18", _19: "19", _20: "20", _21: "21", _22: "22", _23: "23" }];
            let detailHeader = {
                columns: detailColumns,
                dataSource: detailHeaderDs,
                rowHeight: "33px",
                width: "700px"
            };
            
            let detailContentDs = [];
            for (let i = 0; i < 300; i++) {
                detailContentDs.push({ empId: i.toString(), _0: "", _1: "", _2: "", _3: "", _4: "", _5: "", _6: "", _7: "", _8: "", _9: "", _10: "", _11: "", _12: "", _13: "", _14: "", _15: "", _16: "", _17: "", _18: "", _19: "", _20: "", _21: "", _22: "", _23: "" });
            }
            
            let detailDeco = [];
            detailDeco.push(new CellColor("3", "_6", "xseal"));
            detailDeco.push(new CellColor("6", "_6", "xseal"));
            let detailContent = {
                columns: detailColumns,
                dataSource: detailContentDs,
                primaryKey: "empId",
                features: [
                    {
                        name: "BodyCellStyle",
                        decorator: detailDeco
                    }, {
                        name: "RightClick",
                        chartFilter: function() {
                            return true;
                        },
                        handler: function(ui) {
                            let items = [
                                { id: "終日に拡大", text: "終日に拡大", selectHandler: function(id) { } },
                                { id: "削除", text: "削除", selectHandler: function(id) { ruler.removeBy({ no: ui.rowIndex, id: ui.id }); } }
                            ];
                            
                            ui.contextMenu(items);
                            ui.contextMenu("show");
                        }
                    }
                ]
            };
            
            let extable = new nts.uk.ui.exTable.ExTable($("#extable"), {
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
            
            let recharge = function(detail) {
                if (detail.rowIndex % 5 === 1) {
                    let time = nts.uk.time.minutesBased.duration.parseString(detail.value).toValue();
                    if (detail.columnKey === "startTime2") {
                        ruler.extend(detail.rowIndex, `rgc${detail.rowIndex}`, Math.round(time / 5));
                    } else if (detail.columnKey === "endTime2") {
                        ruler.extend(detail.rowIndex, `rgc${detail.rowIndex}`, null, Math.round(time / 5));
                    }   
                } else if (detail.rowIndex % 5 === 2) {
                    let time = nts.uk.time.minutesBased.duration.parseString(detail.value).toValue();
                    if (detail.columnKey === "startTime1") {
                        ruler.extend(detail.rowIndex, `lgc${detail.rowIndex}`, Math.round(time / 5));
                    } else if (detail.columnKey === "endTime1") {
                        ruler.extend(detail.rowIndex, `lgc${detail.rowIndex}`, null, Math.round(time / 5));
                    }
                }
            }; 
            
            $("#extable").on("extablecellupdated", e => {
                recharge(e.detail);
            });
            
            $("#extable").on("extablecellretained", e => {
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
                pastingResizeFinished: (line, type, start, end) => {
                    console.log(`${line}-${type}-${start}-${end}`);
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
                pastingResizeFinished: (line, type, start, end) => {
                    console.log(`${line}-${type}-${start}-${end}`);
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
            
            for (let i = 0; i < 300; i++) {
                let start = Math.round(((i % 60) + i / 60) / 2);
                
                if (i % 5 === 1) {
                    // 固定勤務時間
                    let lgc = this.ruler.addChartWithType("Fixed", {
                        id: `lgc${i}`,
                        start: 12,
                        end: 60,
                        lineNo: i,
                        limitStartMax: 60,
                        limitEndMax: 72
                    });
                    
                    this.ruler.addChartWithType("BreakTime", {
                        id: `lgc${i}_0`,
                        parent: `lgc${i}`,
                        lineNo: i,
                        start: 24,
                        end: 25,
                        limitStartMin: 12,
                        limitStartMax: 60,
                        limitEndMax: 60
                    });
                    
                    this.ruler.addChartWithType("OT", {
                        id: `lgc${i}_1`,
                        parent: `lgc${i}`,
                        lineNo: i,
                        start: 0,
                        end: 12
                    });
                    
                    this.ruler.addChartWithType("OT", {
                        id: `lgc${i}_2`,
                        parent: `lgc${i}`,
                        lineNo: i,
                        start: 60,
                        end: 72
                    });
                    
                    let gc = this.ruler.addChartWithType("Fixed", {
                        id: `rgc${i}`,
                        start: 102,
                        end: 210,
                        lineNo: i,
                        limitStartMin: 84,
                        limitStartMax: 264,
                        limitEndMax: 264,
                        title: "固定勤務"
                    });
                    
                    $(gc).on("gcresize", (e) => {
                        let param = e.detail;
                        let minutes;
                        if (param[2]) {
                            minutes = nts.uk.time.minutesBased.duration.create(param[0] * 5).text;
                            $("#extable").exTable("cellValue", "middle", i + "", "startTime2", minutes);
                        } else {
                            minutes = nts.uk.time.minutesBased.duration.create(param[1] * 5).text;
                            $("#extable").exTable("cellValue", "middle", i + "", "endTime2", minutes);
                        }
                    });
                    
                    this.ruler.addChartWithType("BreakTime", {
                        id: `rgc${i}_0`,
                        parent: `rgc${i}`,
                        lineNo: i,
                        start: 144,
                        end: 156,
                        limitStartMin: 102,
                        limitStartMax: 210,
                        limitEndMax: 210
                    });
                    
                    this.ruler.addChartWithType("OT", {
                        id: `rgc${i}_1`,
                        parent: `rgc${i}`,
                        lineNo: i,
                        start: 84,
                        end: 102
                    });
                    
                    this.ruler.addChartWithType("OT", {
                        id: `rgc${i}_2`,
                        parent: `rgc${i}`,
                        lineNo: i,
                        start: 210,
                        end: 264
                    });
                }
                
                if (i % 5 === 2) {
                    //　流動勤務時間
                    let cgc = this.ruler.addChartWithType("Changeable", {
                        id: `lgc${i}`,
                        start: 8,
                        end: 65,
                        lineNo: i,
                        limitStartMax: 264,
                        limitEndMax: 264,
                        resizeFinished: (b, e, p) => {
                            let minutes;
                            if (p) {
                                minutes = nts.uk.time.minutesBased.duration.create(b * 5).text;
                                $("#extable").exTable("cellValue", "middle", i + "", "startTime1", minutes);
                            } else {
                                minutes = nts.uk.time.minutesBased.duration.create(e * 5).text;
                                $("#extable").exTable("cellValue", "middle", i + "", "endTime1", minutes);
                            }
                        },
                        dropFinished: (b, e) => {
                            
                        }   
                    });
                    
                    $(cgc).on("gcdrop", e => {
                        let param = e.detail;
                        let minutes = nts.uk.time.minutesBased.duration.create(param[0] * 5).text;
                        $("#extable").exTable("cellValue", "middle", i + "", "startTime1", minutes);
                        minutes = nts.uk.time.minutesBased.duration.create(param[1] * 5).text;
                        $("#extable").exTable("cellValue", "middle", i + "", "endTime1", minutes);
                    });
                    
                    this.ruler.addChartWithType("BreakTime", {
                        id: `lgc${i}_0`,
                        parent: `lgc${i}`,
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
                    
                    this.ruler.addChartWithType("OT", {
                        id: `lgc${i}_1`,
                        parent: `lgc${i}`,
                        lineNo: i,
                        start: 0,
                        end: 12
                    });
                    
                    this.ruler.addChartWithType("OT", {
                        id: `lgc${i}_2`,
                        parent: `lgc${i}`,
                        lineNo: i,
                        start: 60,
                        end: 72
                    });
                    
                    this.ruler.addChartWithType("Changeable", {
                        id: `rgc${i}`,
                        start: 86,//102,
                        end: 224,//210,
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
                    
                    this.ruler.addChartWithType("OT", {
                        id: `rgc${i}_1`,
                        parent: `rgc${i}`,
                        lineNo: i,
                        start: 84,
                        end: 102
                    });
                    
                    this.ruler.addChartWithType("OT", {
                        id: `rgc${i}_2`,
                        parent: `rgc${i}`,
                        lineNo: i,
                        start: 210,
                        end: 264
                    });
                    
                    this.ruler.addChartWithType("BreakTime", {
                        id: `rgc${i}_0`,
                        parent: `rgc${i}`,
                        lineNo: i,
                        start: 90,//215,
                        end: 96,//222,
                        limitStartMin: 84,
                        limitStartMax: 264,
                        limitEndMax: 264
                    });
                }
                
                // フレックス
                if (i % 5 === 3) {
                    let flexChart = this.ruler.addChartWithType("Flex", {
                        id: `rgc${i}`,
                        start: 102,
                        end: 210,
                        lineNo: i,
//                        limitStartMin: 84,
//                        limitStartMax: 144,
//                        limitEndMin: 168,
//                        limitEndMax: 264,
                        title: "フレックス勤務"
                    });
                    
                    $(flexChart).on("gcdrop", e => {
                        let param = e.detail;
                        let minutes = nts.uk.time.minutesBased.duration.create(param[0] * 5).text;
                        $("#extable").exTable("cellValue", "middle", i + "", "startTime1", minutes);
                        minutes = nts.uk.time.minutesBased.duration.create(param[1] * 5).text;
                        $("#extable").exTable("cellValue", "middle", i + "", "endTime1", minutes);
                    });
                    
                    $(flexChart).on("gcresize", (e) => {
                        let param = e.detail;
                        let minutes;
                        if (param[2]) {
                            minutes = nts.uk.time.minutesBased.duration.create(param[0] * 5).text;
                            $("#extable").exTable("cellValue", "middle", i + "", "startTime1", minutes);
                        } else {
                            minutes = nts.uk.time.minutesBased.duration.create(param[1] * 5).text;
                            $("#extable").exTable("cellValue", "middle", i + "", "endTime1", minutes);
                        }
                    });
                    
                    this.ruler.addChartWithType("CoreTime", {
                        id: `rgc${i}_3`,
                        parent: `rgc${i}`,
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
                    
                    this.ruler.addChartWithType("OT", {
                        id: `rgc${i}_1`,
                        parent: `rgc${i}`,
                        lineNo: i,
                        start: 84,
                        end: 102
                    });
                    
                    this.ruler.addChartWithType("OT", {
                        id: `rgc${i}_2`,
                        parent: `rgc${i}`,
                        lineNo: i,
                        start: 210,
                        end: 264
                    });
                    
                }
            }
            
            this.ruler.setLock([0, 1, 2, 3], true);
        }
        
        replace() {
            this.ruler.replaceAt(7, [
            { 
                type: "Flex", 
                options: {
                    id: `lgc7`,
                    start: 12,
                    end: 60,
                    lineNo: 7,
                    limitStartMax: 60,
                    limitEndMax: 72
                }
            }, {
                type: "BreakTime",
                options: {
                    id: `lgc7_0`,
                    parent: `lgc7`,
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
                    id: `lgc7_1`,
                    parent: `lgc7`,
                    lineNo: 7,
                    start: 0,
                    end: 12
                }
            }, {
                type: "OT",
                options: {
                    id: `lgc7_2`,
                    parent: `lgc7`,
                    lineNo: 7,
                    start: 60,
                    end: 72
                }
            }]);
        }
        
        chart1() {
            ruler.pasteChart({ typeName: "C1", zIndex: 2002 });
        }
        
        chart2() {
            ruler.pasteChart({ typeName: "C2", zIndex: 2002 });
        }
    }
    
    class CellColor {
        columnKey: any;
        rowId: any;
        clazz: any;
        constructor(rowId: any, columnKey: any, clazz: any) {
            this.columnKey = columnKey;
            this.rowId = rowId;
            this.clazz = clazz;
        }
    }
    
    let screenModel = new ScreenModel();
    this.bind(screenModel);
});