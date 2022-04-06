var cps003;
(function (cps003) {
    var setShared = nts.uk.ui.windows.setShared;
    var getShared = nts.uk.ui.windows.getShared;
    var modal = nts.uk.ui.windows.sub.modal;
    var ajax = nts.uk.request.ajax;
    var writeConstraint = nts.uk.ui.validation.writeConstraint;
    var parseTime = nts.uk.time.parseTime;
    var parseTimeWithDay = nts.uk.time.minutesBased.clock.dayattr.create;
    var ITEM_SINGLE_TYPE = (cps003.a || cps003.c).vm.ITEM_SINGLE_TYPE;
    var ITEM_STRING_TYPE = (cps003.a || cps003.c).vm.ITEM_STRING_TYPE;
    var ITEM_SELECT_TYPE = (cps003.a || cps003.c).vm.ITEM_SELECT_TYPE;
    var ITEM_STRING_DTYPE = (cps003.a || cps003.c).vm.ITEM_STRING_DTYPE;
    var control;
    (function (control) {
        var editedHistories = {};
        control.selectGroups = [
            {
                ctgCode: 'CS00017',
                workplace: 'IS00084',
                startDate: 'IS00082'
            },
            {
                ctgCode: 'CS00017',
                workplace: 'IS00085',
                startDate: 'IS00082'
            },
            {
                ctgCode: 'CS00019',
                firstTimes: {
                    start: 'IS00106',
                    end: 'IS00107'
                },
                secondTimes: {
                    start: 'IS00109',
                    end: 'IS00110'
                }
            },
            {
                ctgCode: 'CS00020',
                workType: 'IS00128'
            },
            {
                ctgCode: 'CS00020',
                workType: 'IS00130',
                workTime: 'IS00131',
                firstTimes: {
                    start: 'IS00133',
                    end: 'IS00134'
                },
                secondTimes: {
                    start: 'IS00136',
                    end: 'IS00137'
                }
            },
            {
                ctgCode: 'CS00020',
                workType: 'IS00139',
                workTime: 'IS00140',
                firstTimes: {
                    start: 'IS00142',
                    end: 'IS00143'
                },
                secondTimes: {
                    start: 'IS00145',
                    end: 'IS00146'
                }
            },
            {
                ctgCode: 'CS00020',
                workType: 'IS00148',
                workTime: 'IS00149',
                firstTimes: {
                    start: 'IS00151',
                    end: 'IS00152'
                },
                secondTimes: {
                    start: 'IS00154',
                    end: 'IS00155'
                }
            },
            {
                ctgCode: 'CS00020',
                workType: 'IS00157',
                workTime: 'IS00158',
                firstTimes: {
                    start: 'IS00160',
                    end: 'IS00161'
                },
                secondTimes: {
                    start: 'IS00163',
                    end: 'IS00164'
                }
            },
            {
                ctgCode: 'CS00020',
                workType: 'IS00166',
                workTime: 'IS00167',
                firstTimes: {
                    start: 'IS00169',
                    end: 'IS00170'
                },
                secondTimes: {
                    start: 'IS00172',
                    end: 'IS00173'
                }
            },
            {
                ctgCode: 'CS00020',
                workType: 'IS00175',
                workTime: 'IS00176',
                firstTimes: {
                    start: 'IS00178',
                    end: 'IS00179'
                },
                secondTimes: {
                    start: 'IS00181',
                    end: 'IS00182'
                }
            },
            {
                ctgCode: 'CS00070',
                workType: 'IS00193',
                workTime: 'IS00194',
                firstTimes: {
                    start: 'IS00196',
                    end: 'IS00197'
                },
                secondTimes: {
                    start: 'IS00199',
                    end: 'IS00200'
                }
            },
            {
                ctgCode: 'CS00070',
                workType: 'IS00202',
                workTime: 'IS00203',
                firstTimes: {
                    start: 'IS00205',
                    end: 'IS00206'
                },
                secondTimes: {
                    start: 'IS00208',
                    end: 'IS00209'
                }
            },
            {
                ctgCode: 'CS00070',
                workType: 'IS00211',
                workTime: 'IS00212',
                firstTimes: {
                    start: 'IS00214',
                    end: 'IS00215'
                },
                secondTimes: {
                    start: 'IS00217',
                    end: 'IS00218'
                }
            },
            {
                ctgCode: 'CS00070',
                workType: 'IS00220',
                workTime: 'IS00221',
                firstTimes: {
                    start: 'IS00223',
                    end: 'IS00224'
                },
                secondTimes: {
                    start: 'IS00226',
                    end: 'IS00227'
                }
            },
            {
                ctgCode: 'CS00070',
                workType: 'IS00229',
                workTime: 'IS00230',
                firstTimes: {
                    start: 'IS00232',
                    end: 'IS00233'
                },
                secondTimes: {
                    start: 'IS00235',
                    end: 'IS00236'
                }
            },
            {
                ctgCode: 'CS00070',
                workType: 'IS00238',
                workTime: 'IS00239',
                firstTimes: {
                    start: 'IS00241',
                    end: 'IS00242'
                },
                secondTimes: {
                    start: 'IS00244',
                    end: 'IS00245'
                }
            },
            {
                ctgCode: 'CS00070',
                workType: 'IS00184',
                workTime: 'IS00185',
                firstTimes: {
                    start: 'IS00187',
                    end: 'IS00188'
                },
                secondTimes: {
                    start: 'IS00190',
                    end: 'IS00191'
                }
            }
        ];
        var relateButtonGroups = [{
                ctgCode: 'CS00024',
                btnCode: 'IS00276',
                lblCode: 'IS00277',
                dialogId: 'g'
            }, {
                ctgCode: 'CS00024',
                btnCode: 'IS00294',
                dialogId: 'h'
            }, {
                ctgCode: 'CS00025',
                btnCode: 'IS00301',
                dialogId: 'i',
                specialCd: 1
            }, {
                ctgCode: 'CS00026',
                btnCode: 'IS00308',
                dialogId: 'i',
                specialCd: 2
            }, {
                ctgCode: 'CS00027',
                btnCode: 'IS00315',
                dialogId: 'i',
                specialCd: 3
            }, {
                ctgCode: 'CS00028',
                btnCode: 'IS00322',
                dialogId: 'i',
                specialCd: 4
            }, {
                ctgCode: 'CS00029',
                btnCode: 'IS00329',
                dialogId: 'i',
                specialCd: 5
            }, {
                ctgCode: 'CS00030',
                btnCode: 'IS00336',
                dialogId: 'i',
                specialCd: 6
            }, {
                ctgCode: 'CS00031',
                btnCode: 'IS00343',
                dialogId: 'i',
                specialCd: 7
            }, {
                ctgCode: 'CS00032',
                btnCode: 'IS00350',
                dialogId: 'i',
                specialCd: 8
            }, {
                ctgCode: 'CS00033',
                btnCode: 'IS00357',
                dialogId: 'i',
                specialCd: 9
            }, {
                ctgCode: 'CS00034',
                btnCode: 'IS00364',
                dialogId: 'i',
                specialCd: 10
            }, {
                ctgCode: 'CS00049',
                btnCode: 'IS00565',
                dialogId: 'i',
                specialCd: 11
            }, {
                ctgCode: 'CS00050',
                btnCode: 'IS00572',
                dialogId: 'i',
                specialCd: 12
            }, {
                ctgCode: 'CS00051',
                btnCode: 'IS00579',
                dialogId: 'i',
                specialCd: 13
            }, {
                ctgCode: 'CS00052',
                btnCode: 'IS00586',
                dialogId: 'i',
                specialCd: 14
            }, {
                ctgCode: 'CS00053',
                btnCode: 'IS00593',
                dialogId: 'i',
                specialCd: 15
            }, {
                ctgCode: 'CS00054',
                btnCode: 'IS00600',
                dialogId: 'i',
                specialCd: 16
            }, {
                ctgCode: 'CS00055',
                btnCode: 'IS00607',
                dialogId: 'i',
                specialCd: 17
            }, {
                ctgCode: 'CS00056',
                btnCode: 'IS00614',
                dialogId: 'i',
                specialCd: 18
            }, {
                ctgCode: 'CS00057',
                btnCode: 'IS00621',
                dialogId: 'i',
                specialCd: 19
            }, {
                ctgCode: 'CS00058',
                btnCode: 'IS00628',
                dialogId: 'i',
                specialCd: 20
            }];
        control.fetch = {
            get_stc_setting: function () { return ajax('at', "record/stamp/stampcardedit/find"); },
            get_annLeaNumber: function (sid) { return ajax('at', "at/record/remainnumber/annlea/getAnnLeaNumber/".concat(sid)); },
            get_resvLeaNumber: function (sid) { return ajax('com', "ctx/pereg/layout/getResvLeaNumber/".concat(sid)); },
            get_calDayTime: function (sid, specialCd) { return ajax('com', "ctx/pereg/layout/calDayTime/".concat(sid, "/").concat(specialCd)); },
            checkFunctionNo: function () { return ajax("ctx/pereg/functions/auth/find-with-role-person-info"); },
            check_mt_se: function (param) { return ajax("ctx/pereg/person/common/checkStartEndMultiTime", param); },
            check_start_end: function (param) { return ajax("ctx/pereg/person/common/checkStartEnd", param); },
            check_multi_time: function (param) { return ajax("ctx/pereg/person/common/checkMultiTime", param); },
            get_cb_data: function (param) { return ajax("ctx/pereg/person/common/getFlexComboBox", param); },
            get_ro_data: function (param) { return ajax('com', "at/record/remainnumber/annlea/event/nextTime", param); },
            get_sphd_nextGrantDate: function (param) { return ajax('com', "ctx/pereg/layout/getSPHolidayGrantDate", param); },
            check_remain_days: function (sid) { return ajax('com', "ctx/pereg/person/common/checkEnableRemainDays/".concat(sid)); },
            check_remain_left: function (sid) { return ajax('com', "ctx/pereg/person/common/checkEnableRemainLeft/".concat(sid)); },
            // getHealInsStandCompMonth -  等級から健康保険標準報酬月額を取得する - IS01020
            getHealInsStandCompMonth: function (param) { return ajax('pr', "ctx/core/socialinsurance/healthinsurance/getHealInsStandCompMonth", param); },
            // getHealthInsuranceStandardGradePerMonth - 報酬月額から健康保険標準報酬月額と健康保険等級を取得する - IS01021
            getHealthInsuranceStandardGradePerMonth: function (param) { return ajax('pr', "ctx/core/socialinsurance/healthinsurance/getHealthInsuranceStandardGradePerMonth", param); },
            // getMonthlyPensionInsStandardRemuneration - 等級から厚生年金標準報酬月額を取得する - IS01022
            getMonthlyPensionInsStandardRemuneration: function (param) { return ajax('pr', "ctx/core/socialinsurance/healthinsurance/getMonthlyPensionInsStandardRemuneration", param); },
            // getWelfarePensionStandardGradePerMonth - 報酬月額から厚生年金保険標準報酬月額と厚生年金保険等級を取得する - IS01023
            getWelfarePensionStandardGradePerMonth: function (param) { return ajax('pr', "ctx/core/socialinsurance/healthinsurance/getWelfarePensionStandardGradePerMonth", param); },
        };
        control.SELECT_BUTTON = {}, control.RELATE_BUTTON = {}, control.WORK_TIME = {}, control.DATE_RANGE = {}, control.TIME_RANGE = {}, control.TIME_RANGE_GROUP = {}, control.HALF_INT = {
            CS00035_IS00366: true,
            CS00035_IS00368: true,
            CS00035_IS00369: true,
            CS00036_IS00377: true,
            CS00036_IS00378: true,
            CS00036_IS00379: true,
            CS00036_IS00382: true,
            CS00036_IS00383: true,
            CS00036_IS00384: true
        }, control.NUMBER_Lan = {
            CS00092_IS01020: function (id, itemCode, v, obj) {
                var dfd = $.Deferred();
                getHealInsStandCompMonth(v, obj, "IS01016", "IS01020", "IS01021", "IS01022", "IS01023", "IS01021");
                dfd.resolve();
                return dfd.promise();
            },
            CS00092_IS01021: function (id, itemCode, v, obj) {
                var dfd = $.Deferred();
                getHealthInsuranceStandardGradePerMonth(v, obj, "IS01016", "IS01020", "IS01021", "IS01022", "IS01023", "IS01020");
                dfd.resolve();
                return dfd.promise();
            },
            CS00092_IS01022: function (id, itemCode, v, obj) {
                var dfd = $.Deferred();
                getMonthlyPensionInsStandardRemuneration(v, obj, "IS01016", "IS01020", "IS01021", "IS01022", "IS01023", "IS01023");
                dfd.resolve();
                return dfd.promise();
            },
            CS00092_IS01023: function (id, itemCode, v, obj) {
                var dfd = $.Deferred();
                getWelfarePensionStandardGradePerMonth(v, obj, "IS01016", "IS01020", "IS01021", "IS01022", "IS01023", "IS01022");
                dfd.resolve();
                return dfd.promise();
            }
        }, control.COMBOBOX = {
            CS00020_IS00123: function (v, id) {
                var $grid = $("#grid");
                switch (v) {
                    case "0":
                        $grid.mGrid("disableNtsControlAt", id, "IS00127");
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: "IS00127" }]);
                    case "1":
                        $grid.mGrid("disableNtsControlAt", id, "IS00127");
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: "IS00127" }]);
                    case "2":
                        $grid.mGrid("enableNtsControlAt", id, "IS00124");
                        $grid.mGrid("enableNtsControlAt", id, "IS00125");
                        $grid.mGrid("enableNtsControlAt", id, "IS00126");
                        $grid.mGrid("disableNtsControlAt", id, "IS00127");
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: "IS00127" }]);
                        break;
                    case "3":
                        $grid.mGrid("disableNtsControlAt", id, "IS00124");
                        $grid.mGrid("disableNtsControlAt", id, "IS00125");
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: "IS00124" }, { id: id, columnKey: "IS00125" }]);
                        $grid.mGrid("enableNtsControlAt", id, "IS00126");
                        $grid.mGrid("enableNtsControlAt", id, "IS00127");
                        break;
                    case "4":
                        $grid.mGrid("disableNtsControlAt", id, "IS00124");
                        $grid.mGrid("disableNtsControlAt", id, "IS00125");
                        $grid.mGrid("disableNtsControlAt", id, "IS00126");
                        $grid.mGrid("disableNtsControlAt", id, "IS00127");
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: "IS00124" }, { id: id, columnKey: "IS00125" },
                            { id: id, columnKey: "IS00126" }, { id: id, columnKey: "IS00127" }]);
                        break;
                }
            },
            CS00020_IS00248: function (v, id) {
                var $grid = $("#grid");
                $grid.mGrid(v === "1" ? "enableNtsControlAt" : "disableNtsControlAt", id, "IS00249");
                $grid.mGrid(v === "1" ? "enableNtsControlAt" : "disableNtsControlAt", id, "IS00250");
                $grid.mGrid(v === "1" ? "enableNtsControlAt" : "disableNtsControlAt", id, "IS00251");
                if (v !== "1") {
                    $grid.mGrid("clearErrors", [{ id: id, columnKey: "IS00249" }, { id: id, columnKey: "IS00250" },
                        { id: id, columnKey: "IS00251" }]);
                }
            },
            CS00020_IS00121: function (v, id, o) {
                var $grid = $("#grid");
                if (v === "0") {
                    $grid.mGrid("disableNtsControlAt", id, "IS00123");
                    $grid.mGrid("disableNtsControlAt", id, "IS00124");
                    $grid.mGrid("disableNtsControlAt", id, "IS00125");
                    $grid.mGrid("disableNtsControlAt", id, "IS00126");
                    $grid.mGrid("disableNtsControlAt", id, "IS00127");
                    $grid.mGrid("clearErrors", [{ id: id, columnKey: "IS00123" }, { id: id, columnKey: "IS00124" },
                        { id: id, columnKey: "IS00125" }, { id: id, columnKey: "IS00126" }, { id: id, columnKey: "IS00127" }]);
                }
                else if (o.IS00123 === "0" || o.IS00123 === "1" || o.IS00123 === "2") {
                    $grid.mGrid("enableNtsControlAt", id, "IS00123");
                    $grid.mGrid("enableNtsControlAt", id, "IS00124");
                    $grid.mGrid("enableNtsControlAt", id, "IS00125");
                    $grid.mGrid("enableNtsControlAt", id, "IS00126");
                    $grid.mGrid("disableNtsControlAt", id, "IS00127");
                    $grid.mGrid("clearErrors", [{ id: id, columnKey: "IS00127" }]);
                }
                else if (o.IS00123 === "3") {
                    $grid.mGrid("enableNtsControlAt", id, "IS00123");
                    $grid.mGrid("disableNtsControlAt", id, "IS00124");
                    $grid.mGrid("disableNtsControlAt", id, "IS00125");
                    $grid.mGrid("enableNtsControlAt", id, "IS00126");
                    $grid.mGrid("enableNtsControlAt", id, "IS00127");
                    $grid.mGrid("clearErrors", [{ id: id, columnKey: "IS00124" }, { id: id, columnKey: "IS00125" }]);
                }
                else if (o.IS00123 === "4") {
                    $grid.mGrid("enableNtsControlAt", id, "IS00123");
                    $grid.mGrid("disableNtsControlAt", id, "IS00124");
                    $grid.mGrid("disableNtsControlAt", id, "IS00125");
                    $grid.mGrid("disableNtsControlAt", id, "IS00126");
                    $grid.mGrid("disableNtsControlAt", id, "IS00127");
                    $grid.mGrid("clearErrors", [{ id: id, columnKey: "IS00124" },
                        { id: id, columnKey: "IS00125" }, { id: id, columnKey: "IS00126" }, { id: id, columnKey: "IS00127" }]);
                }
            },
            CS00025_IS00296: function (v, id, o) {
                var $grid = $("#grid");
                if (v === "1" && o.IS00297 === "0") {
                    $grid.mGrid("enableNtsControlAt", id, "IS00297");
                    _.forEach(['IS00298', 'IS00299' /*, 'IS00300'*/, 'IS00301'], function (code) {
                        $grid.mGrid("disableNtsControlAt", id, code);
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                    });
                }
                else {
                    _.forEach(['IS00297', 'IS00298', 'IS00299' /*, 'IS00300'*/, 'IS00301'], function (code) {
                        $grid.mGrid(v === "1" ? "enableNtsControlAt" : "disableNtsControlAt", id, code);
                        if (v !== "1") {
                            $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                        }
                    });
                }
            },
            CS00025_IS00297: function (v, id, o) {
                var $grid = $("#grid");
                _.forEach(['IS00298', 'IS00299' /*, 'IS00300'*/, 'IS00301'], function (code) {
                    $grid.mGrid(v === "1" ? "enableNtsControlAt" : "disableNtsControlAt", id, code);
                    if (v !== "1") {
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                    }
                });
                specialOffGrantSetting(v, o, "IS00295", "IS00298", "IS00296", "IS00299", "IS00300", 1);
            },
            CS00025_IS00299: function (v, id, o) {
                specialOffGrantTbl(v, o, "IS00295", "IS00297", "IS00298", "IS00296", "IS00300", 1);
            },
            CS00026_IS00303: function (v, id, o) {
                var $grid = $("#grid");
                if (v === "1" && o.IS00304 === "0") {
                    $grid.mGrid("enableNtsControlAt", id, "IS00304");
                    _.forEach(['IS00305', 'IS00306' /*, 'IS00307'*/, 'IS00308'], function (code) {
                        $grid.mGrid("disableNtsControlAt", id, code);
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                    });
                }
                else {
                    _.forEach(['IS00304', 'IS00305', 'IS00306' /*, 'IS00307'*/, 'IS00308'], function (code) {
                        $grid.mGrid(v === "1" ? "enableNtsControlAt" : "disableNtsControlAt", id, code);
                        if (v !== "1") {
                            $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                        }
                    });
                }
            },
            CS00026_IS00304: function (v, id, o) {
                var $grid = $("#grid");
                _.forEach(['IS00305', 'IS00306' /*, 'IS00307'*/, 'IS00308'], function (code) {
                    $grid.mGrid(v === "1" ? "enableNtsControlAt" : "disableNtsControlAt", id, code);
                    if (v !== "1") {
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                    }
                });
                specialOffGrantSetting(v, o, "IS00302", "IS00305", "IS00303", "IS00306", "IS00307", 2);
            },
            CS00026_IS00306: function (v, id, o) {
                specialOffGrantTbl(v, o, "IS00302", "IS00304", "IS00305", "IS00303", "IS00307", 2);
            },
            CS00027_IS00310: function (v, id, o) {
                var $grid = $("#grid");
                if (v === "1" && o.IS00311 === "0") {
                    $grid.mGrid("enableNtsControlAt", id, "IS00311");
                    _.forEach(['IS00312', 'IS00313' /*, 'IS00314'*/, 'IS00315'], function (code) {
                        $grid.mGrid("disableNtsControlAt", id, code);
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                    });
                }
                else {
                    _.forEach(['IS00311', 'IS00312', 'IS00313' /*, 'IS00314'*/, 'IS00315'], function (code) {
                        $grid.mGrid(v === "1" ? "enableNtsControlAt" : "disableNtsControlAt", id, code);
                        if (v !== "1") {
                            $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                        }
                    });
                }
            },
            CS00027_IS00311: function (v, id, o) {
                var $grid = $("#grid");
                _.forEach(['IS00312', 'IS00313' /*, 'IS00314'*/, 'IS00315'], function (code) {
                    $grid.mGrid(v === "1" ? "enableNtsControlAt" : "disableNtsControlAt", id, code);
                    if (v !== "1") {
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                    }
                });
                specialOffGrantSetting(v, o, "IS00309", "IS00312", "IS00310", "IS00313", "IS00314", 3);
            },
            CS00027_IS00313: function (v, id, o) {
                specialOffGrantTbl(v, o, "IS00309", "IS00311", "IS00312", "IS00310", "IS00314", 3);
            },
            CS00028_IS00317: function (v, id, o) {
                var $grid = $("#grid");
                if (v === "1" && o.IS00318 === "0") {
                    $grid.mGrid("enableNtsControlAt", id, "IS00318");
                    _.forEach(['IS00319', 'IS00320' /*, 'IS00321'*/, 'IS00322'], function (code) {
                        $grid.mGrid("disableNtsControlAt", id, code);
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                    });
                }
                else {
                    _.forEach(['IS00318', 'IS00319', 'IS00320' /*, 'IS00321'*/, 'IS00322'], function (code) {
                        $grid.mGrid(v === "1" ? "enableNtsControlAt" : "disableNtsControlAt", id, code);
                        if (v !== "1") {
                            $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                        }
                    });
                }
            },
            CS00028_IS00318: function (v, id, o) {
                var $grid = $("#grid");
                _.forEach(['IS00319', 'IS00320' /*, 'IS00321'*/, 'IS00322'], function (code) {
                    $grid.mGrid(v === "1" ? "enableNtsControlAt" : "disableNtsControlAt", id, code);
                    if (v !== "1") {
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                    }
                });
                specialOffGrantSetting(v, o, "IS00316", "IS00319", "IS00317", "IS00320", "IS00321", 4);
            },
            CS00028_IS00320: function (v, id, o) {
                specialOffGrantTbl(v, o, "IS00316", "IS00318", "IS00319", "IS00317", "IS00321", 4);
            },
            CS00029_IS00324: function (v, id, o) {
                var $grid = $("#grid");
                if (v === "1" && o.IS00325 === "0") {
                    $grid.mGrid("enableNtsControlAt", id, "IS00325");
                    _.forEach(['IS00326', 'IS00327' /*, 'IS00328'*/, 'IS00329'], function (code) {
                        $grid.mGrid("disableNtsControlAt", id, code);
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                    });
                }
                else {
                    _.forEach(['IS00325', 'IS00326', 'IS00327' /*, 'IS00328'*/, 'IS00329'], function (code) {
                        $grid.mGrid(v === "1" ? "enableNtsControlAt" : "disableNtsControlAt", id, code);
                        if (v !== "1") {
                            $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                        }
                    });
                }
            },
            CS00029_IS00325: function (v, id, o) {
                var $grid = $("#grid");
                _.forEach(['IS00326', 'IS00327' /*, 'IS00328'*/, 'IS00329'], function (code) {
                    $grid.mGrid(v === "1" ? "enableNtsControlAt" : "disableNtsControlAt", id, code);
                    if (v !== "1") {
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                    }
                });
                specialOffGrantSetting(v, o, "IS00323", "IS00326", "IS00324", "IS00327", "IS00328", 5);
            },
            CS00029_IS00327: function (v, id, o) {
                specialOffGrantTbl(v, o, "IS00323", "IS00325", "IS00326", "IS00324", "IS00328", 5);
            },
            CS00030_IS00331: function (v, id, o) {
                var $grid = $("#grid");
                if (v === "1" && o.IS00332 === "0") {
                    $grid.mGrid("enableNtsControlAt", id, "IS00332");
                    _.forEach(['IS00333', 'IS00334' /*, 'IS00335'*/, 'IS00336'], function (code) {
                        $grid.mGrid("disableNtsControlAt", id, code);
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                    });
                }
                else {
                    _.forEach(['IS00332', 'IS00333', 'IS00334' /*, 'IS00335'*/, 'IS00336'], function (code) {
                        $grid.mGrid(v === "1" ? "enableNtsControlAt" : "disableNtsControlAt", id, code);
                        if (v !== "1") {
                            $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                        }
                    });
                }
            },
            CS00030_IS00332: function (v, id, o) {
                var $grid = $("#grid");
                _.forEach(['IS00333', 'IS00334' /*, 'IS00335'*/, 'IS00336'], function (code) {
                    $grid.mGrid(v === "1" ? "enableNtsControlAt" : "disableNtsControlAt", id, code);
                    if (v !== "1") {
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                    }
                });
                specialOffGrantSetting(v, o, "IS00330", "IS00333", "IS00331", "IS00334", "IS00335", 6);
            },
            CS00030_IS00334: function (v, id, o) {
                specialOffGrantTbl(v, o, "IS00330", "IS00332", "IS00333", "IS00331", "IS00335", 6);
            },
            CS00031_IS00338: function (v, id, o) {
                var $grid = $("#grid");
                if (v === "1" && o.IS00339 === "0") {
                    $grid.mGrid("enableNtsControlAt", id, "IS00339");
                    _.forEach(['IS00340', 'IS00341' /*, 'IS00342'*/, 'IS00343'], function (code) {
                        $grid.mGrid("disableNtsControlAt", id, code);
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                    });
                }
                else {
                    _.forEach(['IS00339', 'IS00340', 'IS00341' /*, 'IS00342'*/, 'IS00343'], function (code) {
                        $grid.mGrid(v === "1" ? "enableNtsControlAt" : "disableNtsControlAt", id, code);
                        if (v !== "1") {
                            $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                        }
                    });
                }
            },
            CS00031_IS00339: function (v, id, o) {
                var $grid = $("#grid");
                _.forEach(['IS00340', 'IS00341' /*, 'IS00342'*/, 'IS00343'], function (code) {
                    $grid.mGrid(v === "1" ? "enableNtsControlAt" : "disableNtsControlAt", id, code);
                    if (v !== "1") {
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                    }
                });
                specialOffGrantSetting(v, o, "IS00337", "IS00340", "IS00338", "IS00341", "IS00342", 7);
            },
            CS00031_IS00341: function (v, id, o) {
                specialOffGrantTbl(v, o, "IS00337", "IS00339", "IS00340", "IS00338", "IS00342", 7);
            },
            CS00032_IS00345: function (v, id, o) {
                var $grid = $("#grid");
                if (v === "1" && o.IS00346 === "0") {
                    $grid.mGrid("enableNtsControlAt", id, "IS00346");
                    _.forEach(['IS00347', 'IS00348' /*, 'IS00349'*/, 'IS00350'], function (code) {
                        $grid.mGrid("disableNtsControlAt", id, code);
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                    });
                }
                else {
                    _.forEach(['IS00346', 'IS00347', 'IS00348' /*, 'IS00349'*/, 'IS00350'], function (code) {
                        $grid.mGrid(v === "1" ? "enableNtsControlAt" : "disableNtsControlAt", id, code);
                        if (v !== "1") {
                            $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                        }
                    });
                }
            },
            CS00032_IS00346: function (v, id, o) {
                var $grid = $("#grid");
                _.forEach(['IS00347', 'IS00348' /*, 'IS00349'*/, 'IS00350'], function (code) {
                    $grid.mGrid(v === "1" ? "enableNtsControlAt" : "disableNtsControlAt", id, code);
                    if (v !== "1") {
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                    }
                });
                specialOffGrantSetting(v, o, "IS00344", "IS00347", "IS00345", "IS00348", "IS00349", 8);
            },
            CS00032_IS00348: function (v, id, o) {
                specialOffGrantTbl(v, o, "IS00344", "IS00346", "IS00347", "IS00345", "IS00349", 8);
            },
            CS00033_IS00352: function (v, id, o) {
                var $grid = $("#grid");
                if (v === "1" && o.IS00353 === "0") {
                    $grid.mGrid("enableNtsControlAt", id, "IS00353");
                    _.forEach(['IS00354', 'IS00355' /*, 'IS00356'*/, 'IS00357'], function (code) {
                        $grid.mGrid("disableNtsControlAt", id, code);
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                    });
                }
                else {
                    _.forEach(['IS00353', 'IS00354', 'IS00355' /*, 'IS00356'*/, 'IS00357'], function (code) {
                        $grid.mGrid(v === "1" ? "enableNtsControlAt" : "disableNtsControlAt", id, code);
                        if (v !== "1") {
                            $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                        }
                    });
                }
            },
            CS00033_IS00353: function (v, id, o) {
                var $grid = $("#grid");
                _.forEach(['IS00354', 'IS00355' /*, 'IS00356'*/, 'IS00357'], function (code) {
                    $grid.mGrid(v === "1" ? "enableNtsControlAt" : "disableNtsControlAt", id, code);
                    if (v !== "1") {
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                    }
                });
                specialOffGrantSetting(v, o, "IS00351", "IS00354", "IS00352", "IS00355", "IS00356", 9);
            },
            CS00033_IS00355: function (v, id, o) {
                specialOffGrantTbl(v, o, "IS00351", "IS00353", "IS00354", "IS00352", "IS00356", 9);
            },
            CS00034_IS00359: function (v, id, o) {
                var $grid = $("#grid");
                if (v === "1" && o.IS00360 === "0") {
                    $grid.mGrid("enableNtsControlAt", id, "IS00360");
                    _.forEach(['IS00361', 'IS00362' /*, 'IS00363'*/, 'IS00364'], function (code) {
                        $grid.mGrid("disableNtsControlAt", id, code);
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                    });
                }
                else {
                    _.forEach(['IS00360', 'IS00361', 'IS00362' /*, 'IS00363'*/, 'IS00364'], function (code) {
                        $grid.mGrid(v === "1" ? "enableNtsControlAt" : "disableNtsControlAt", id, code);
                        if (v !== "1") {
                            $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                        }
                    });
                }
            },
            CS00034_IS00360: function (v, id, o) {
                var $grid = $("#grid");
                _.forEach(['IS00361', 'IS00362' /*, 'IS00363'*/, 'IS00364'], function (code) {
                    $grid.mGrid(v === "1" ? "enableNtsControlAt" : "disableNtsControlAt", id, code);
                    if (v !== "1") {
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                    }
                });
                specialOffGrantSetting(v, o, "IS00358", "IS00361", "IS00359", "IS00362", "IS00363", 10);
            },
            CS00034_IS00362: function (v, id, o) {
                specialOffGrantTbl(v, o, "IS00358", "IS00360", "IS00361", "IS00359", "IS00363", 10);
            },
            CS00035_IS00370: function (v, id) {
                var $grid = $("#grid");
                _.forEach(['IS00371', 'IS00372', 'IS00374'], function (code) {
                    $grid.mGrid(v === "1" ? "enableNtsControlAt" : "disableNtsControlAt", id, code);
                    if (v !== "1") {
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                    }
                });
            },
            CS00036_IS00375: function (v, id) {
                var $grid = $("#grid");
                _.forEach(['IS00376', 'IS00377', 'IS00378', 'IS00379', 'IS01101'], function (code) {
                    $grid.mGrid(v === "1" ? "enableNtsControlAt" : "disableNtsControlAt", id, code);
                    if (v !== "1") {
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                    }
                });
            },
            CS00036_IS00380: function (v, id) {
                var $grid = $("#grid");
                _.forEach(['IS00381', 'IS00382', 'IS00383', 'IS00384', 'IS01102'], function (code) {
                    $grid.mGrid(v === "1" ? "enableNtsControlAt" : "disableNtsControlAt", id, code);
                    if (v !== "1") {
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                    }
                });
            },
            CS00049_IS00560: function (v, id, o) {
                var $grid = $("#grid");
                if (v === "1" && o.IS00561 === "0") {
                    $grid.mGrid("enableNtsControlAt", id, "IS00561");
                    _.forEach(['IS00562', 'IS00563' /*, 'IS00564'*/, 'IS00565'], function (code) {
                        $grid.mGrid("disableNtsControlAt", id, code);
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                    });
                }
                else {
                    _.forEach(['IS00561', 'IS00562', 'IS00563' /*, 'IS00564'*/, 'IS00565'], function (code) {
                        $grid.mGrid(v === "1" ? "enableNtsControlAt" : "disableNtsControlAt", id, code);
                        if (v !== "1") {
                            $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                        }
                    });
                }
            },
            CS00049_IS00561: function (v, id, o) {
                var $grid = $("#grid");
                _.forEach(['IS00562', 'IS00563' /*, 'IS00564'*/, 'IS00565'], function (code) {
                    $grid.mGrid(v === "1" ? "enableNtsControlAt" : "disableNtsControlAt", id, code);
                    if (v !== "1") {
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                    }
                });
                specialOffGrantSetting(v, o, "IS00559", "IS00562", "IS00560", "IS00563", "IS00564", 11);
            },
            CS00049_IS00563: function (v, id, o) {
                specialOffGrantTbl(v, o, "IS00559", "IS00561", "IS00562", "IS00560", "IS00564", 11);
            },
            CS00050_IS00567: function (v, id, o) {
                var $grid = $("#grid");
                if (v === "1" && o.IS00568 === "0") {
                    $grid.mGrid("enableNtsControlAt", id, "IS00568");
                    _.forEach(['IS00569', 'IS00570' /*, 'IS00571'*/, 'IS00572'], function (code) {
                        $grid.mGrid("disableNtsControlAt", id, code);
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                    });
                }
                else {
                    _.forEach(['IS00568', 'IS00569', 'IS00570' /*, 'IS00571'*/, 'IS00572'], function (code) {
                        $grid.mGrid(v === "1" ? "enableNtsControlAt" : "disableNtsControlAt", id, code);
                        if (v !== "1") {
                            $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                        }
                    });
                }
            },
            CS00050_IS00568: function (v, id, o) {
                var $grid = $("#grid");
                _.forEach(['IS00569', 'IS00570' /*, 'IS00571'*/, 'IS00572'], function (code) {
                    $grid.mGrid(v === "1" ? "enableNtsControlAt" : "disableNtsControlAt", id, code);
                    if (v !== "1") {
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                    }
                });
                specialOffGrantSetting(v, o, "IS00566", "IS00569", "IS00567", "IS00570", "IS00571", 12);
            },
            CS00050_IS00570: function (v, id, o) {
                specialOffGrantTbl(v, o, "IS00566", "IS00568", "IS00569", "IS00567", "IS00571", 12);
            },
            CS00051_IS00574: function (v, id, o) {
                var $grid = $("#grid");
                if (v === "1" && o.IS00575 === "0") {
                    $grid.mGrid("enableNtsControlAt", id, "IS00575");
                    _.forEach(['IS00576', 'IS00577' /*, 'IS00578'*/, 'IS00579'], function (code) {
                        $grid.mGrid("disableNtsControlAt", id, code);
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                    });
                }
                else {
                    _.forEach(['IS00575', 'IS00576', 'IS00577' /*, 'IS00578'*/, 'IS00579'], function (code) {
                        $grid.mGrid(v === "1" ? "enableNtsControlAt" : "disableNtsControlAt", id, code);
                        if (v !== "1") {
                            $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                        }
                    });
                }
            },
            CS00051_IS00575: function (v, id, o) {
                var $grid = $("#grid");
                _.forEach(['IS00576', 'IS00577' /*, 'IS00578'*/, 'IS00579'], function (code) {
                    $grid.mGrid(v === "1" ? "enableNtsControlAt" : "disableNtsControlAt", id, code);
                    if (v !== "1") {
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                    }
                });
                specialOffGrantSetting(v, o, "IS00573", "IS00576", "IS00574", "IS00577", "IS00578", 13);
            },
            CS00051_IS00577: function (v, id, o) {
                specialOffGrantTbl(v, o, "IS00573", "IS00575", "IS00576", "IS00574", "IS00578", 13);
            },
            CS00052_IS00581: function (v, id, o) {
                var $grid = $("#grid");
                if (v === "1" && o.IS00582 === "0") {
                    $grid.mGrid("enableNtsControlAt", id, "IS00582");
                    _.forEach(['IS00583', 'IS00584' /*, 'IS00585'*/, 'IS00586'], function (code) {
                        $grid.mGrid("disableNtsControlAt", id, code);
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                    });
                }
                else {
                    _.forEach(['IS00582', 'IS00583', 'IS00584' /*, 'IS00585'*/, 'IS00586'], function (code) {
                        $grid.mGrid(v === "1" ? "enableNtsControlAt" : "disableNtsControlAt", id, code);
                        if (v !== "1") {
                            $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                        }
                    });
                }
            },
            CS00052_IS00582: function (v, id, o) {
                var $grid = $("#grid");
                _.forEach(['IS00583', 'IS00584' /*, 'IS00585'*/, 'IS00586'], function (code) {
                    $grid.mGrid(v === "1" ? "enableNtsControlAt" : "disableNtsControlAt", id, code);
                    if (v !== "1") {
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                    }
                });
                specialOffGrantSetting(v, o, "IS00580", "IS00583", "IS00581", "IS00584", "IS00585", 14);
            },
            CS00052_IS00584: function (v, id, o) {
                specialOffGrantTbl(v, o, "IS00580", "IS00582", "IS00583", "IS00581", "IS00585", 14);
            },
            CS00053_IS00588: function (v, id, o) {
                var $grid = $("#grid");
                if (v === "1" && o.IS00589 === "0") {
                    $grid.mGrid("enableNtsControlAt", id, "IS00589");
                    _.forEach(['IS00590', 'IS00591' /*, 'IS00592'*/, 'IS00593'], function (code) {
                        $grid.mGrid("disableNtsControlAt", id, code);
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                    });
                }
                else {
                    _.forEach(['IS00589', 'IS00590', 'IS00591' /*, 'IS00592'*/, 'IS00593'], function (code) {
                        $grid.mGrid(v === "1" ? "enableNtsControlAt" : "disableNtsControlAt", id, code);
                        if (v !== "1") {
                            $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                        }
                    });
                }
            },
            CS00053_IS00589: function (v, id, o) {
                var $grid = $("#grid");
                _.forEach(['IS00590', 'IS00591' /*, 'IS00592'*/, 'IS00593'], function (code) {
                    $grid.mGrid(v === "1" ? "enableNtsControlAt" : "disableNtsControlAt", id, code);
                    if (v !== "1") {
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                    }
                });
                specialOffGrantSetting(v, o, "IS00587", "IS00590", "IS00588", "IS00591", "IS00592", 15);
            },
            CS00053_IS00591: function (v, id, o) {
                specialOffGrantTbl(v, o, "IS00587", "IS00589", "IS00590", "IS00588", "IS00592", 15);
            },
            CS00054_IS00595: function (v, id, o) {
                var $grid = $("#grid");
                if (v === "1" && o.IS00596 === "0") {
                    $grid.mGrid("enableNtsControlAt", id, "IS00596");
                    _.forEach(['IS00597', 'IS00598' /*, 'IS00599'*/, 'IS00600'], function (code) {
                        $grid.mGrid("disableNtsControlAt", id, code);
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                    });
                }
                else {
                    _.forEach(['IS00596', 'IS00597', 'IS00598' /*, 'IS00599'*/, 'IS00600'], function (code) {
                        $grid.mGrid(v === "1" ? "enableNtsControlAt" : "disableNtsControlAt", id, code);
                        if (v !== "1") {
                            $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                        }
                    });
                }
            },
            CS00054_IS00596: function (v, id, o) {
                var $grid = $("#grid");
                _.forEach(['IS00597', 'IS00598' /*, 'IS00599'*/, 'IS00600'], function (code) {
                    $grid.mGrid(v === "1" ? "enableNtsControlAt" : "disableNtsControlAt", id, code);
                    if (v !== "1") {
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                    }
                });
                specialOffGrantSetting(v, o, "IS00594", "IS00597", "IS00595", "IS00598", "IS00599", 16);
            },
            CS00054_IS00598: function (v, id, o) {
                specialOffGrantTbl(v, o, "IS00594", "IS00596", "IS00597", "IS00595", "IS00599", 16);
            },
            CS00055_IS00602: function (v, id, o) {
                var $grid = $("#grid");
                if (v === "1" && o.IS00603 === "0") {
                    $grid.mGrid("enableNtsControlAt", id, "IS00603");
                    _.forEach(['IS00604', 'IS00605' /*, 'IS00606'*/, 'IS00607'], function (code) {
                        $grid.mGrid("disableNtsControlAt", id, code);
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                    });
                }
                else {
                    _.forEach(['IS00603', 'IS00604', 'IS00605' /*, 'IS00606'*/, 'IS00607'], function (code) {
                        $grid.mGrid(v === "1" ? "enableNtsControlAt" : "disableNtsControlAt", id, code);
                        if (v !== "1") {
                            $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                        }
                    });
                }
            },
            CS00055_IS00603: function (v, id, o) {
                var $grid = $("#grid");
                _.forEach(['IS00604', 'IS00605' /*, 'IS00606'*/, 'IS00607'], function (code) {
                    $grid.mGrid(v === "1" ? "enableNtsControlAt" : "disableNtsControlAt", id, code);
                    if (v !== "1") {
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                    }
                });
                specialOffGrantSetting(v, o, "IS00601", "IS00604", "IS00602", "IS00605", "IS00606", 17);
            },
            CS00055_IS00605: function (v, id, o) {
                specialOffGrantTbl(v, o, "IS00601", "IS00603", "IS00604", "IS00602", "IS00606", 17);
            },
            CS00056_IS00609: function (v, id, o) {
                var $grid = $("#grid");
                if (v === "1" && o.IS00610 === "0") {
                    $grid.mGrid("enableNtsControlAt", id, "IS00610");
                    _.forEach(['IS00611', 'IS00612' /*, 'IS00613'*/, 'IS00614'], function (code) {
                        $grid.mGrid("disableNtsControlAt", id, code);
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                    });
                }
                else {
                    _.forEach(['IS00610', 'IS00611', 'IS00612' /*, 'IS00613'*/, 'IS00614'], function (code) {
                        $grid.mGrid(v === "1" ? "enableNtsControlAt" : "disableNtsControlAt", id, code);
                        if (v !== "1") {
                            $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                        }
                    });
                }
            },
            CS00056_IS00610: function (v, id, o) {
                var $grid = $("#grid");
                _.forEach(['IS00611', 'IS00612' /*, 'IS00613'*/, 'IS00614'], function (code) {
                    $grid.mGrid(v === "1" ? "enableNtsControlAt" : "disableNtsControlAt", id, code);
                    if (v !== "1") {
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                    }
                });
                specialOffGrantSetting(v, o, "IS00607", "IS00611", "IS00609", "IS00612", "IS00613", 18);
            },
            CS00056_IS00612: function (v, id, o) {
                specialOffGrantTbl(v, o, "IS00607", "IS00610", "IS00611", "IS00609", "IS00613", 18);
            },
            CS00057_IS00616: function (v, id, o) {
                var $grid = $("#grid");
                if (v === "1" && o.IS00617 === "0") {
                    $grid.mGrid("enableNtsControlAt", id, "IS00617");
                    _.forEach(['IS00618', 'IS00619' /*, 'IS00620'*/, 'IS00621'], function (code) {
                        $grid.mGrid("disableNtsControlAt", id, code);
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                    });
                }
                else {
                    _.forEach(['IS00617', 'IS00618', 'IS00619' /*, 'IS00620'*/, 'IS00621'], function (code) {
                        $grid.mGrid(v === "1" ? "enableNtsControlAt" : "disableNtsControlAt", id, code);
                        if (v !== "1") {
                            $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                        }
                    });
                }
            },
            CS00057_IS00617: function (v, id, o) {
                var $grid = $("#grid");
                _.forEach(['IS00618', 'IS00619' /*, 'IS00620'*/, 'IS00621'], function (code) {
                    $grid.mGrid(v === "1" ? "enableNtsControlAt" : "disableNtsControlAt", id, code);
                    if (v !== "1") {
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                    }
                });
                specialOffGrantSetting(v, o, "IS00614", "IS00618", "IS00616", "IS00619", "IS00620", 19);
            },
            CS00057_IS00619: function (v, id, o) {
                specialOffGrantTbl(v, o, "IS00614", "IS00617", "IS00618", "IS00616", "IS00620", 19);
            },
            CS00058_IS00623: function (v, id, o) {
                var $grid = $("#grid");
                if (v === "1" && o.IS00624 === "0") {
                    $grid.mGrid("enableNtsControlAt", id, "IS00624");
                    _.forEach(['IS00625', 'IS00626' /*, 'IS00627'*/, 'IS00628'], function (code) {
                        $grid.mGrid("disableNtsControlAt", id, code);
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                    });
                }
                else {
                    _.forEach(['IS00624', 'IS00625', 'IS00626' /*, 'IS00627'*/, 'IS00628'], function (code) {
                        $grid.mGrid(v === "1" ? "enableNtsControlAt" : "disableNtsControlAt", id, code);
                        if (v !== "1") {
                            $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                        }
                    });
                }
            },
            CS00058_IS00624: function (v, id, o) {
                var $grid = $("#grid");
                _.forEach(['IS00625', 'IS00626' /*, 'IS00627'*/, 'IS00628'], function (code) {
                    $grid.mGrid(v === "1" ? "enableNtsControlAt" : "disableNtsControlAt", id, code);
                    if (v !== "1") {
                        $grid.mGrid("clearErrors", [{ id: id, columnKey: code }]);
                    }
                });
                specialOffGrantSetting(v, o, "IS00620", "IS00625", "IS00623", "IS00626", "IS00627", 20);
            },
            CS00058_IS00626: function (v, id, o) {
                specialOffGrantTbl(v, o, "IS00620", "IS00624", "IS00625", "IS00623", "IS00627", 20);
            }
        }, control.DATE_TIME = {
            CS00016_IS00077: function (v, o) {
                dateSubscribeCombo("IS00079", v, o);
            },
            CS00017_IS00082: function (v, o) {
                // Replace new item list but not passed when opening dialog
                dateSubscribeCombo("IS00084", v, o);
                dateSubscribeCombo("IS00085", v, o);
            },
            CS00020_IS00119: function (v, o) {
                if (_.isNil(v) || v === "" || _.isNil(o.employeeId))
                    return;
                _.forEach([
                    { workType: "IS00130", workTime: "IS00131" },
                    { workType: "IS00139", workTime: "IS00140" },
                    { workType: "IS00157", workTime: "IS00158" },
                    { workType: "IS00166", workTime: "IS00167" },
                    { workType: "IS00175", workTime: "IS00176" },
                    { workType: "IS00148", workTime: "IS00149" }
                ], function (cate) {
                    var types = ((__viewContext || {}).viewModel || {}).dataTypes || {}, comboData = types[cate.workType], catId = (((__viewContext || {}).viewModel || {}).category || {}).catId;
                    if (comboData) {
                        control.fetch.get_cb_data({
                            comboBoxType: comboData.cls.referenceType,
                            categoryId: catId(),
                            required: comboData.cls.required,
                            standardDate: moment.utc(v, "YYYY/MM/DD").toDate(),
                            typeCode: undefined,
                            masterType: comboData.cls.masterType,
                            employeeId: o.employeeId,
                            cps002: false,
                            workplaceId: undefined,
                            baseDate: undefined
                        }).done(function (data) {
                            $("#grid").mGrid("updateCell", o.id, cate.workType, data, null, null, true);
                        });
                    }
                    comboData = types[cate.workTime];
                    if (comboData) {
                        control.fetch.get_cb_data({
                            comboBoxType: comboData.cls.referenceType,
                            categoryId: catId(),
                            required: comboData.cls.required,
                            standardDate: moment.utc(v, "YYYY/MM/DD").toDate(),
                            typeCode: undefined,
                            masterType: comboData.cls.masterType,
                            employeeId: o.employeeId,
                            cps002: false,
                            workplaceId: undefined,
                            baseDate: undefined
                        }).done(function (data) {
                            $("#grid").mGrid("updateCell", o.id, cate.workTime, data, null, null, true);
                        });
                    }
                });
            },
            CS00070_IS00781: function (v, o) {
                if (_.isNil(v) || v === "" || _.isNil(o.employeeId))
                    return;
                _.forEach([
                    { workType: "IS00193", workTime: "IS00194" },
                    { workType: "IS00202", workTime: "IS00203" },
                    { workType: "IS00211", workTime: "IS00212" },
                    { workType: "IS00220", workTime: "IS00221" },
                    { workType: "IS00229", workTime: "IS00230" },
                    { workType: "IS00238", workTime: "IS00239" },
                    { workType: "IS00184", workTime: "IS00185" }
                ], function (cate) {
                    var types = ((__viewContext || {}).viewModel || {}).dataTypes || {}, comboData = types[cate.workType], catId = (((__viewContext || {}).viewModel || {}).category || {}).catId;
                    if (comboData) {
                        control.fetch.get_cb_data({
                            comboBoxType: comboData.cls.referenceType,
                            categoryId: catId(),
                            required: comboData.cls.required,
                            standardDate: moment.utc(v, "YYYY/MM/DD").toDate(),
                            typeCode: undefined,
                            masterType: comboData.cls.masterType,
                            employeeId: o.employeeId,
                            cps002: false,
                            workplaceId: undefined,
                            baseDate: undefined
                        }).done(function (data) {
                            $("#grid").mGrid("updateCell", o.id, cate.workType, data, null, null, true);
                        });
                    }
                    comboData = types[cate.workTime];
                    if (comboData) {
                        control.fetch.get_cb_data({
                            comboBoxType: comboData.cls.referenceType,
                            categoryId: catId(),
                            required: comboData.cls.required,
                            standardDate: moment.utc(v, "YYYY/MM/DD").toDate(),
                            typeCode: undefined,
                            masterType: comboData.cls.masterType,
                            employeeId: o.employeeId,
                            cps002: false,
                            workplaceId: undefined,
                            baseDate: undefined
                        }).done(function (data) {
                            $("#grid").mGrid("updateCell", o.id, cate.workTime, data, null, null, true);
                        });
                    }
                });
            },
            CS00024_IS00279: function (v, o) {
                if (!o)
                    return;
                var empId = o.employeeId, standardDate = moment(v), grantTable = o.IS00280, hireDate, startWork, endWork, conTime, $grid = $("#grid");
                if (!v || !standardDate.isValid() || !grantTable) {
                    $grid.mGrid("updateCell", o.id, "IS00281", "");
                    $grid.mGrid("updateCell", o.id, "IS00282", "");
                    $grid.mGrid("updateCell", o.id, "IS00283", "");
                    return;
                }
                control.fetch.get_ro_data({
                    employeeId: empId,
                    standardDate: standardDate.format('YYYY/MM/DD'),
                    grantTable: grantTable,
                    entryDate: hireDate,
                    startWorkCond: startWork,
                    endWorkCond: endWork,
                    contactTime: conTime
                }).done(function (result) {
                    $grid.mGrid("updateCell", o.id, "IS00281", _.isNil(result.nextTimeGrantDate) ? "" : result.nextTimeGrantDate);
                    $grid.mGrid("updateCell", o.id, "IS00282", _.isNil(result.nextTimeGrantDays) ? "" : result.nextTimeGrantDays);
                    $grid.mGrid("updateCell", o.id, "IS00283", _.isNil(result.nextTimeMaxTime) ? "" : result.nextTimeMaxTime);
                });
            },
            CS00025_IS00295: function (v, o) {
                specialOff(v, o, "IS00297", "IS00298", "IS00296", "IS00299", "IS00300", 1);
            },
            CS00026_IS00302: function (v, o) {
                specialOff(v, o, "IS00304", "IS00305", "IS00303", "IS00306", "IS00307", 2);
            },
            CS00027_IS00309: function (v, o) {
                specialOff(v, o, "IS00311", "IS00312", "IS00310", "IS00313", "IS00314", 3);
            },
            CS00028_IS00316: function (v, o) {
                specialOff(v, o, "IS00318", "IS00319", "IS00317", "IS00320", "IS00321", 4);
            },
            CS00029_IS00323: function (v, o) {
                specialOff(v, o, "IS00325", "IS00326", "IS00324", "IS00327", "IS00328", 5);
            },
            CS00030_IS00330: function (v, o) {
                specialOff(v, o, "IS00332", "IS00333", "IS00331", "IS00334", "IS00335", 6);
            },
            CS00031_IS00337: function (v, o) {
                specialOff(v, o, "IS00339", "IS00340", "IS00338", "IS00341", "IS00342", 7);
            },
            CS00032_IS00344: function (v, o) {
                specialOff(v, o, "IS00346", "IS00347", "IS00345", "IS00348", "IS00349", 8);
            },
            CS00033_IS00351: function (v, o) {
                specialOff(v, o, "IS00353", "IS00354", "IS00352", "IS00355", "IS00356", 9);
            },
            CS00034_IS00358: function (v, o) {
                specialOff(v, o, "IS00360", "IS00361", "IS00359", "IS00362", "IS00363", 10);
            },
            CS00049_IS00559: function (v, o) {
                specialOff(v, o, "IS00561", "IS00562", "IS00560", "IS00563", "IS00564", 11);
            },
            CS00050_IS00566: function (v, o) {
                specialOff(v, o, "IS00568", "IS00569", "IS00567", "IS00570", "IS00571", 12);
            },
            CS00051_IS00573: function (v, o) {
                specialOff(v, o, "IS00575", "IS00576", "IS00574", "IS00577", "IS00578", 13);
            },
            CS00052_IS00580: function (v, o) {
                specialOff(v, o, "IS00582", "IS00583", "IS00581", "IS00584", "IS00585", 14);
            },
            CS00053_IS00587: function (v, o) {
                specialOff(v, o, "IS00589", "IS00590", "IS00588", "IS00591", "IS00592", 15);
            },
            CS00054_IS00594: function (v, o) {
                specialOff(v, o, "IS00596", "IS00597", "IS00595", "IS00598", "IS00599", 16);
            },
            CS00055_IS00601: function (v, o) {
                specialOff(v, o, "IS00603", "IS00604", "IS00602", "IS00605", "IS00606", 17);
            },
            CS00056_IS00608: function (v, o) {
                specialOff(v, o, "IS00610", "IS00611", "IS00609", "IS00612", "IS00613", 18);
            },
            CS00057_IS00615: function (v, o) {
                specialOff(v, o, "IS00617", "IS00618", "IS00616", "IS00619", "IS00620", 19);
            },
            CS00058_IS00622: function (v, o) {
                specialOff(v, o, "IS00624", "IS00625", "IS00623", "IS00626", "IS00627", 20);
            }
        }, control.NUMBER = {
            CS00024_IS00287: function (i, k, v, o) {
                var dfd = $.Deferred(), result = timeNumber(i, k, v, o, "IS00287", "IS00288", "IS00289");
                dfd.resolve(result);
                return dfd.promise();
            },
            CS00024_IS00288: function (i, k, v, o) {
                var dfd = $.Deferred(), result = timeNumber(i, k, v, o, "IS00287", "IS00288", "IS00289");
                dfd.resolve(result);
                return dfd.promise();
            },
            CS00024_IS00291: function (i, k, v, o) {
                var dfd = $.Deferred(), result = timeNumber(i, k, v, o, "IS00291", "IS00292", "IS00293");
                dfd.resolve(result);
                return dfd.promise();
            },
            CS00024_IS00292: function (i, k, v, o) {
                var dfd = $.Deferred(), result = timeNumber(i, k, v, o, "IS00291", "IS00292", "IS00293");
                dfd.resolve(result);
                return dfd.promise();
            },
            CS00025_IS00298: function (i, k, v, o) {
                var dfd = $.Deferred();
                specialOffGrantDay(v, o, "IS00295", "IS00297", "IS00298", "IS00296", "IS00299", "IS00300", 1);
                dfd.resolve();
                return dfd.promise();
            },
            CS00026_IS00305: function (i, k, v, o) {
                var dfd = $.Deferred();
                specialOffGrantDay(v, o, "IS00302", "IS00304", "IS00305", "IS00303", "IS00306", "IS00307", 2);
                dfd.resolve();
                return dfd.promise();
            },
            CS00027_IS00312: function (i, k, v, o) {
                var dfd = $.Deferred();
                specialOffGrantDay(v, o, "IS00309", "IS00311", "IS00312", "IS00310", "IS00313", "IS00314", 3);
                dfd.resolve();
                return dfd.promise();
            },
            CS00028_IS00319: function (i, k, v, o) {
                var dfd = $.Deferred();
                specialOffGrantDay(v, o, "IS00316", "IS00318", "IS00319", "IS00317", "IS00320", "IS00321", 4);
                dfd.resolve();
                return dfd.promise();
            },
            CS00029_IS00326: function (i, k, v, o) {
                var dfd = $.Deferred();
                specialOffGrantDay(v, o, "IS00323", "IS00325", "IS00326", "IS00324", "IS00327", "IS00328", 5);
                dfd.resolve();
                return dfd.promise();
            },
            CS00030_IS00333: function (i, k, v, o) {
                var dfd = $.Deferred();
                specialOffGrantDay(v, o, "IS00330", "IS00332", "IS00333", "IS00331", "IS00334", "IS00335", 6);
                dfd.resolve();
                return dfd.promise();
            },
            CS00031_IS00340: function (i, k, v, o) {
                var dfd = $.Deferred();
                specialOffGrantDay(v, o, "IS00337", "IS00339", "IS00340", "IS00338", "IS00341", "IS00342", 7);
                dfd.resolve();
                return dfd.promise();
            },
            CS00032_IS00347: function (i, k, v, o) {
                var dfd = $.Deferred();
                specialOffGrantDay(v, o, "IS00344", "IS00346", "IS00347", "IS00345", "IS00348", "IS00349", 8);
                dfd.resolve();
                return dfd.promise();
            },
            CS00033_IS00354: function (i, k, v, o) {
                var dfd = $.Deferred();
                specialOffGrantDay(v, o, "IS00351", "IS00353", "IS00354", "IS00352", "IS00355", "IS00356", 9);
                dfd.resolve();
                return dfd.promise();
            },
            CS00034_IS00361: function (i, k, v, o) {
                var dfd = $.Deferred();
                specialOffGrantDay(v, o, "IS00358", "IS00360", "IS00361", "IS00359", "IS00362", "IS00363", 10);
                dfd.resolve();
                return dfd.promise();
            },
            CS00049_IS00562: function (i, k, v, o) {
                var dfd = $.Deferred();
                specialOffGrantDay(v, o, "IS00559", "IS00561", "IS00562", "IS00560", "IS00563", "IS00564", 11);
                dfd.resolve();
                return dfd.promise();
            },
            CS00050_IS00569: function (i, k, v, o) {
                var dfd = $.Deferred();
                specialOffGrantDay(v, o, "IS00566", "IS00568", "IS00569", "IS00567", "IS00570", "IS00571", 12);
                dfd.resolve();
                return dfd.promise();
            },
            CS00051_IS00576: function (i, k, v, o) {
                var dfd = $.Deferred();
                specialOffGrantDay(v, o, "IS00573", "IS00575", "IS00576", "IS00574", "IS00577", "IS00578", 13);
                dfd.resolve();
                return dfd.promise();
            },
            CS00052_IS00583: function (i, k, v, o) {
                var dfd = $.Deferred();
                specialOffGrantDay(v, o, "IS00580", "IS00582", "IS00583", "IS00581", "IS00584", "IS00585", 14);
                dfd.resolve();
                return dfd.promise();
            },
            CS00053_IS00590: function (i, k, v, o) {
                var dfd = $.Deferred();
                specialOffGrantDay(v, o, "IS00587", "IS00589", "IS00590", "IS00588", "IS00591", "IS00592", 15);
                dfd.resolve();
                return dfd.promise();
            },
            CS00054_IS00597: function (i, k, v, o) {
                var dfd = $.Deferred();
                specialOffGrantDay(v, o, "IS00594", "IS00596", "IS00597", "IS00595", "IS00598", "IS00599", 16);
                dfd.resolve();
                return dfd.promise();
            },
            CS00055_IS00604: function (i, k, v, o) {
                var dfd = $.Deferred();
                specialOffGrantDay(v, o, "IS00601", "IS00603", "IS00604", "IS00602", "IS00605", "IS00606", 17);
                dfd.resolve();
                return dfd.promise();
            },
            CS00056_IS00611: function (i, k, v, o) {
                var dfd = $.Deferred();
                specialOffGrantDay(v, o, "IS00608", "IS00610", "IS00611", "IS00609", "IS00612", "IS00613", 18);
                dfd.resolve();
                return dfd.promise();
            },
            CS00057_IS00618: function (i, k, v, o) {
                var dfd = $.Deferred();
                specialOffGrantDay(v, o, "IS00615", "IS00617", "IS00618", "IS00616", "IS00619", "IS00620", 19);
                dfd.resolve();
                return dfd.promise();
            },
            CS00058_IS00625: function (i, k, v, o) {
                var dfd = $.Deferred();
                specialOffGrantDay(v, o, "IS00622", "IS00624", "IS00625", "IS00623", "IS00626", "IS00627", 20);
                dfd.resolve();
                return dfd.promise();
            }
        }, control.STRING = {
            CS00002_IS00003: function (required, i, k, v, o) {
                var dfd = $.Deferred();
                if (!required && (v === "" || _.isNil(v))) {
                    dfd.resolve();
                }
                else {
                    dfd.resolve(spaceCheck(i, k, v, o));
                }
                return dfd.promise();
            },
            CS00002_IS00004: function (required, i, k, v, o) {
                var dfd = $.Deferred();
                if (!required && (v === "" || _.isNil(v))) {
                    dfd.resolve();
                }
                else {
                    dfd.resolve(spaceCheck(i, k, v, o));
                }
                return dfd.promise();
            },
            CS00002_IS00015: function (required, i, k, v, o) {
                var dfd = $.Deferred();
                if (!required && (v === "" || _.isNil(v))) {
                    dfd.resolve();
                }
                else {
                    dfd.resolve(spaceCheck(i, k, v, o));
                }
                return dfd.promise();
            },
            CS00002_IS00016: function (required, i, k, v, o) {
                var dfd = $.Deferred();
                if (!required && (v === "" || _.isNil(v))) {
                    dfd.resolve();
                }
                else {
                    dfd.resolve(spaceCheck(i, k, v, o));
                }
                return dfd.promise();
            }
        }, control.dateRange = [
            {
                ctgCode: "CS00003",
                start: "IS00020",
                end: "IS00021"
            }, {
                ctgCode: "CS00004",
                start: "IS00026",
                end: "IS00027"
            }, {
                ctgCode: "CS00005",
                start: "IS00030",
                end: "IS00031"
            }, {
                ctgCode: "CS00006",
                start: "IS00034",
                end: "IS00035"
            }, {
                ctgCode: "CS00007",
                start: "IS00038",
                end: "IS00039"
            }, {
                ctgCode: "CS00008",
                start: "IS00042",
                end: "IS00043"
            }, {
                ctgCode: "CS00009",
                start: "IS00046",
                end: "IS00047"
            }, {
                ctgCode: "CS00010",
                start: "IS00050",
                end: "IS00051"
            }, {
                ctgCode: "CS00011",
                start: "IS00054",
                end: "IS00055"
            }, {
                ctgCode: "CS00012",
                start: "IS00058",
                end: "IS00059"
            }, {
                ctgCode: "CS00013",
                start: "IS00062",
                end: "IS00063"
            }, {
                ctgCode: "CS00014",
                start: "IS00066",
                end: "IS00067"
            }, {
                ctgCode: "CS00016",
                start: "IS00077",
                end: "IS00078"
            }, {
                ctgCode: "CS00017",
                start: "IS00082",
                end: "IS00083"
            }, {
                ctgCode: "CS00018",
                start: "IS00087",
                end: "IS00088"
            }, {
                ctgCode: "CS00019",
                start: "IS00102",
                end: "IS00103"
            }, {
                ctgCode: "CS00020",
                start: "IS00119",
                end: "IS00120"
            }, {
                ctgCode: "CS00070",
                start: "IS00781",
                end: "IS00782"
            }, {
                ctgCode: "CS00021",
                start: "IS00255",
                end: "IS00256"
            }, {
                ctgCode: "CS00092",
                start: "IS01016",
                end: "IS01017"
            }, {
                ctgCode: "CS00082",
                start: "IS00841",
                end: "IS00842"
            }, {
                ctgCode: "CS00075",
                start: "IS00841",
                end: "IS00842"
            }
        ], control.timeRange = [
            {
                ctgCode: "CS00019",
                start: "IS00106",
                end: "IS00107"
            }, {
                ctgCode: "CS00019",
                start: "IS00109",
                end: "IS00110"
            }, {
                ctgCode: "CS00020",
                start: "IS00133",
                end: "IS00134"
            }, {
                ctgCode: "CS00020",
                start: "IS00136",
                end: "IS00137"
            }, {
                ctgCode: "CS00020",
                start: "IS00142",
                end: "IS00143"
            }, {
                ctgCode: "CS00020",
                start: "IS00145",
                end: "IS00146"
            }, {
                ctgCode: "CS00020",
                start: "IS00151",
                end: "IS00152"
            }, {
                ctgCode: "CS00020",
                start: "IS00154",
                end: "IS00155"
            }, {
                ctgCode: "CS00020",
                start: "IS00160",
                end: "IS00161"
            }, {
                ctgCode: "CS00020",
                start: "IS00163",
                end: "IS00164"
            }, {
                ctgCode: "CS00020",
                start: "IS00169",
                end: "IS00170"
            }, {
                ctgCode: "CS00020",
                start: "IS00172",
                end: "IS00173"
            }, {
                ctgCode: "CS00020",
                start: "IS00178",
                end: "IS00179"
            }, {
                ctgCode: "CS00020",
                start: "IS00181",
                end: "IS00182"
            }, {
                ctgCode: "CS00070",
                start: "IS00196",
                end: "IS00197"
            }, {
                ctgCode: "CS00070",
                start: "IS00199",
                end: "IS00200"
            }, {
                ctgCode: "CS00070",
                start: "IS00205",
                end: "IS00206"
            }, {
                ctgCode: "CS00070",
                start: "IS00208",
                end: "IS00209"
            }, {
                ctgCode: "CS00070",
                start: "IS00214",
                end: "IS00215"
            }, {
                ctgCode: "CS00070",
                start: "IS00217",
                end: "IS00218"
            }, {
                ctgCode: "CS00070",
                start: "IS00223",
                end: "IS00224"
            }, {
                ctgCode: "CS00070",
                start: "IS00226",
                end: "IS00227"
            }, {
                ctgCode: "CS00070",
                start: "IS00232",
                end: "IS00233"
            }, {
                ctgCode: "CS00070",
                start: "IS00235",
                end: "IS00236"
            }, {
                ctgCode: "CS00070",
                start: "IS00241",
                end: "IS00242"
            }, {
                ctgCode: "CS00070",
                start: "IS00244",
                end: "IS00245"
            }, {
                ctgCode: "CS00070",
                start: "IS00187",
                end: "IS00188"
            }, {
                ctgCode: "CS00070",
                start: "IS00190",
                end: "IS00191"
            }
        ];
        function spaceCheck(i, k, v, o) {
            if (_.isNil(v) || v === "")
                return;
            var $grid = $("#grid"), index = _.findIndex($grid.mGrid("dataSource", true), function (d) { return d.id === o.id; }), message = nts.uk.resource.getMessage("Msg_924"), sIndex = _.indexOf(v, "　");
            if (!_.isNil(v) && (sIndex === -1 || sIndex === _.size(v) - 1)) {
                $grid.mGrid("setErrors", [{ id: i, index: index, columnKey: k, message: message }]);
            }
            else {
                $grid.mGrid("clearErrors", [{ id: i, columnKey: k }]);
            }
        }
        function timeNumber(i, k, v, o, firstCode, secondCode, resultCode) {
            var dt = __viewContext.viewModel.dataTypes[firstCode], result = [];
            if (!dt) {
                return;
            }
            var first = o[firstCode], second = o[secondCode];
            if ((_.isNil(first) || first === "") && (_.isNil(second) || second === "")) {
                result.push({ id: i, item: resultCode, value: "" });
                return result;
            }
            if (dt.cls.dataTypeValue === ITEM_SINGLE_TYPE.TIME) {
                first = nts.uk.time.parseTime(first);
                second = nts.uk.time.parseTime(second);
                if (first.success && second.success) {
                    result.push({ id: i, item: resultCode, value: nts.uk.time.parseTime(first.toValue() - second.toValue(), true).format() });
                }
                else if (first.success && !second.success) {
                    result.push({ id: i, item: resultCode, value: nts.uk.time.parseTime(first.toValue(), true).format() });
                }
                else if (!first.success && second.success) {
                    result.push({ id: i, item: resultCode, value: nts.uk.time.parseTime(-1 * second.toValue(), true).format() });
                }
                else {
                    result.push({ id: i, item: resultCode, value: "" });
                }
            }
            else if (dt.cls.dataTypeValue === ITEM_SINGLE_TYPE.TIMEPOINT) {
                first = nts.uk.time.parseTime(first);
                second = nts.uk.time.parseTime(second);
                if (first.success && second.success) {
                    result.push({ id: i, item: resultCode, value: nts.uk.time.minutesBased.clock.dayattr.create(first.toValue() - second.toValue()).shortText });
                }
                else if (first.success && !second.success) {
                    result.push({ id: i, item: resultCode, value: nts.uk.time.minutesBased.clock.dayattr.create(first.toValue()).shortText });
                }
                else if (!first.success && second.success) {
                    result.push({ id: i, item: resultCode, value: nts.uk.time.minutesBased.clock.dayattr.create(-1 * second.toValue()).shortText });
                }
                else {
                    result.push({ id: i, item: resultCode, value: "" });
                }
            }
            else if (dt.cls.dataTypeValue === ITEM_SINGLE_TYPE.NUMERIC) {
                result.push({ id: i, item: resultCode, value: Number(first) - Number(second) });
            }
            else {
                result.push({ id: i, item: resultCode, value: "" });
            }
            return result;
        }
        function specialOff(v, o, cbxCode, grantDayCode, manageCode, grantTblCode, resultCode, specialCd) {
            if (_.isNil(cbxCode))
                return;
            var sid = o.employeeId, hireDate, retireDate, yearRefDate, cbx = o[cbxCode], grantDay = o[grantDayCode], manage = o[manageCode], grantTbl = o[grantTblCode], result = o[resultCode], $grid = $("#grid");
            if (!v || !cbx || !manage || manage === "0") {
                $grid.mGrid("updateCell", o.id, resultCode, "");
                return;
            }
            var consGrantDays;
            if (grantDayCode) {
                var grantDaysConstr = _.find(__viewContext.viewModel.gridOptions.columns, function (c) {
                    return c.key === grantDayCode;
                });
                if (grantDaysConstr) {
                    consGrantDays = __viewContext.primitiveValueConstraints[grantDaysConstr.itemId.replace(/[-_]/g, "")];
                }
            }
            var inputDate = moment.utc(v);
            if (!inputDate.isValid() || inputDate.diff(moment.utc("1900/01/01"), "days", true) < 0
                || inputDate.diff(moment.utc("9999/12/31"), "days", true) > 0
                || _.isNaN(grantDay) || (consGrantDays && !_.isNaN(grantDay) && (grantDay < consGrantDays.min || grantDay > consGrantDays.max))) {
                return;
            }
            control.fetch.get_sphd_nextGrantDate({
                sid: sid,
                grantDate: moment.utc(v).toDate(),
                spLeaveCD: specialCd,
                appSet: cbx,
                grantDays: grantDay,
                grantTable: grantTbl,
                entryDate: null,
                yearRefDate: null //moment.utc(yearRefDate).toDate()
            }).done(function (res) {
                if (!resultCode)
                    return;
                var x;
                if (res && (x = moment.utc(ko.toJS(res))) && x.isValid()) {
                    $grid.mGrid("updateCell", o.id, resultCode, x.format('YYYY/MM/DD'));
                }
                else {
                    $grid.mGrid("updateCell", o.id, resultCode, "");
                }
            });
        }
        function specialOffGrantSetting(v, o, baseDateCode, grantDayCode, manageCode, grantTblCode, resultCode, specialCd) {
            var sid = o.employeeId, hireDate, retireDate, yearRefDate, baseDate = o[baseDateCode], cbx = v, grantDay = o[grantDayCode], manage = o[manageCode], grantTbl = o[grantTblCode], result = o[resultCode], $grid = $("#grid");
            if (!baseDate || !cbx || !manage || manage === "0") {
                $grid.mGrid("updateCell", o.id, resultCode, "");
                return;
            }
            var consGrantDays;
            if (grantDayCode) {
                var grantDaysConstr = _.find(__viewContext.viewModel.gridOptions.columns, function (c) {
                    return c.key === grantDayCode;
                });
                if (grantDaysConstr) {
                    consGrantDays = __viewContext.primitiveValueConstraints[grantDaysConstr.itemId.replace(/[-_]/g, "")];
                }
            }
            var inputDate = moment.utc(baseDate);
            if (!inputDate.isValid() || inputDate.diff(moment.utc("1900/01/01"), "days", true) < 0
                || inputDate.diff(moment.utc("9999/12/31"), "days", true) > 0
                || _.isNaN(grantDay) || (consGrantDays && !_.isNaN(grantDay) && (grantDay < consGrantDays.min || grantDay > consGrantDays.max))) {
                return;
            }
            control.fetch.get_sphd_nextGrantDate({
                sid: sid,
                grantDate: moment.utc(baseDate).toDate(),
                spLeaveCD: specialCd,
                appSet: cbx,
                grantDays: grantDay,
                grantTable: grantTbl,
                entryDate: null,
                yearRefDate: null //moment.utc(yearRefDate).toDate()
            }).done(function (res) {
                if (!resultCode)
                    return;
                var x;
                if (res && (x = moment.utc(ko.toJS(res))) && x.isValid()) {
                    $grid.mGrid("updateCell", o.id, resultCode, x.format('YYYY/MM/DD'));
                }
                else {
                    $grid.mGrid("updateCell", o.id, resultCode, "");
                }
            });
        }
        function specialOffGrantDay(v, o, baseDateCode, cbxCode, grantDayCode, manageCode, grantTblCode, resultCode, specialCd) {
            if (_.isNil(cbxCode))
                return;
            var sid = o.employeeId, hireDate, retireDate, yearRefDate, baseDate = o[baseDateCode], cbx = o[cbxCode], grantDay = Number(v), manage = o[manageCode], grantTbl = o[grantTblCode], result = o[resultCode], $grid = $("#grid");
            if (!baseDate || !cbx || !manage || manage === "0") {
                $grid.mGrid("updateCell", o.id, resultCode, "");
                return;
            }
            var consGrantDays;
            if (grantDayCode) {
                var grantDaysConstr = _.find(__viewContext.viewModel.gridOptions.columns, function (c) {
                    return c.key === grantDayCode;
                });
                if (grantDaysConstr) {
                    consGrantDays = __viewContext.primitiveValueConstraints[grantDaysConstr.itemId.replace(/[-_]/g, "")];
                }
            }
            var inputDate = moment.utc(baseDate);
            if (!inputDate.isValid() || inputDate.diff(moment.utc("1900/01/01"), "days", true) < 0
                || inputDate.diff(moment.utc("9999/12/31"), "days", true) > 0
                || _.isNaN(grantDay) || (consGrantDays && !_.isNaN(grantDay) && (grantDay < consGrantDays.min || grantDay > consGrantDays.max))) {
                return;
            }
            control.fetch.get_sphd_nextGrantDate({
                sid: sid,
                grantDate: moment.utc(baseDate).toDate(),
                spLeaveCD: specialCd,
                appSet: cbx,
                grantDays: grantDay,
                grantTable: grantTbl,
                entryDate: null,
                yearRefDate: null //moment.utc(yearRefDate).toDate()
            }).done(function (res) {
                if (!resultCode)
                    return;
                var x;
                if (res && (x = moment.utc(ko.toJS(res))) && x.isValid()) {
                    $grid.mGrid("updateCell", o.id, resultCode, x.format('YYYY/MM/DD'));
                }
                else {
                    $grid.mGrid("updateCell", o.id, resultCode, "");
                }
            });
        }
        function specialOffGrantTbl(v, o, baseDateCode, cbxCode, grantDayCode, manageCode, resultCode, specialCd) {
            if (_.isNil(cbxCode))
                return;
            var sid = o.employeeId, hireDate, retireDate, yearRefDate, baseDate = o[baseDateCode], cbx = o[cbxCode], grantDay = o[grantDayCode], manage = o[manageCode], grantTbl = v, result = o[resultCode], $grid = $("#grid");
            if (!baseDate || !cbx || !manage || manage === "0") {
                $grid.mGrid("updateCell", o.id, resultCode, "");
                return;
            }
            var consGrantDays;
            if (grantDayCode) {
                var grantDaysConstr = _.find(__viewContext.viewModel.gridOptions.columns, function (c) {
                    return c.key === grantDayCode;
                });
                if (grantDaysConstr) {
                    consGrantDays = __viewContext.primitiveValueConstraints[grantDaysConstr.itemId.replace(/[-_]/g, "")];
                }
            }
            var inputDate = moment.utc(baseDate);
            if (!inputDate.isValid() || inputDate.diff(moment.utc("1900/01/01"), "days", true) < 0
                || inputDate.diff(moment.utc("9999/12/31"), "days", true) > 0
                || _.isNaN(grantDay) || (consGrantDays && !_.isNaN(grantDay) && (grantDay < consGrantDays.min || grantDay > consGrantDays.max))) {
                return;
            }
            control.fetch.get_sphd_nextGrantDate({
                sid: sid,
                grantDate: moment.utc(baseDate).toDate(),
                spLeaveCD: specialCd,
                appSet: cbx,
                grantDays: grantDay,
                grantTable: grantTbl,
                entryDate: null,
                yearRefDate: null //moment.utc(yearRefDate).toDate()
            }).done(function (res) {
                if (!resultCode)
                    return;
                var x;
                if (res && (x = moment.utc(ko.toJS(res))) && x.isValid()) {
                    $grid.mGrid("updateCell", o.id, resultCode, x.format('YYYY/MM/DD'));
                }
                else {
                    $grid.mGrid("updateCell", o.id, resultCode, "");
                }
            });
        }
        // getWelfarePensionStandardGradePerMonth
        function getWelfarePensionStandardGradePerMonth(v, o, startYMCode, healInsGradeCode, healInsStandMonthlyRemuneCode, pensionInsGradeCode, pensionInsStandCompenMonthlyCode, resultCode) {
            if (_.isNil(v))
                return;
            var sid = o.employeeId, 
            //IS01016
            startYMParam = o[startYMCode], 
            //IS01020
            healInsGradeParam = o[healInsGradeCode], 
            //IS01021
            healInsStandMonthlyRemuneParam = o[healInsStandMonthlyRemuneCode], 
            //IS01022
            pensionInsGradeParam = o[pensionInsGradeCode], 
            //IS01023
            pensionInsStandCompenMonthlyParam = o[pensionInsStandCompenMonthlyCode], result = o[resultCode], $grid = $("#grid");
            var inputDate = moment.utc(startYMParam);
            if (!inputDate.isValid() || inputDate.diff(moment.utc("1900/01/01"), "days", true) < 0
                || inputDate.diff(moment.utc("9999/12/31"), "days", true) > 0
                || _.isNaN(healInsGradeParam))
                return;
            control.fetch.getWelfarePensionStandardGradePerMonth({
                sid: sid,
                startYM: moment.utc(startYMParam, "YYYYMMDD").toDate(),
                healInsGrade: healInsGradeParam,
                healInsStandMonthlyRemune: healInsStandMonthlyRemuneParam,
                pensionInsGrade: pensionInsGradeParam,
                pensionInsStandCompenMonthly: pensionInsStandCompenMonthlyParam
            }).done(function (res) {
                if (!resultCode)
                    return;
                if (res) {
                    $grid.mGrid("updateCell", o.id, pensionInsGradeCode, res.welfarePensionGrade);
                    $grid.mGrid("updateCell", o.id, pensionInsStandCompenMonthlyCode, res.standardMonthlyFee);
                }
                else {
                    $grid.mGrid("updateCell", o.id, pensionInsGradeCode, "");
                    $grid.mGrid("updateCell", o.id, pensionInsStandCompenMonthlyCode, "");
                }
            });
        }
        // getMonthlyPensionInsStandardRemuneration
        function getMonthlyPensionInsStandardRemuneration(v, o, startYMCode, healInsGradeCode, healInsStandMonthlyRemuneCode, pensionInsGradeCode, pensionInsStandCompenMonthlyCode, resultCode) {
            if (_.isNil(v))
                return;
            var rowHist = editedHistories[o.id];
            if (!_.isNil(rowHist)) {
                var itemHist = rowHist[pensionInsGradeCode];
                if (v === itemHist) {
                    return;
                }
                rowHist[pensionInsGradeCode] = v;
            }
            else {
                var rowHistObj = {};
                rowHistObj[pensionInsGradeCode] = v;
                editedHistories[o.id] = rowHistObj;
            }
            var sid = o.employeeId, 
            //IS01016
            startYMParam = o[startYMCode], 
            //IS01020
            healInsGradeParam = o[healInsGradeCode], 
            //IS01021
            healInsStandMonthlyRemuneParam = o[healInsStandMonthlyRemuneCode], 
            //IS01022
            pensionInsGradeParam = o[pensionInsGradeCode], 
            //IS01023
            pensionInsStandCompenMonthlyParam = o[pensionInsStandCompenMonthlyCode], result = o[resultCode], $grid = $("#grid");
            var inputDate = moment.utc(startYMParam);
            if (!inputDate.isValid() || inputDate.diff(moment.utc("1900/01/01"), "days", true) < 0
                || inputDate.diff(moment.utc("9999/12/31"), "days", true) > 0
                || _.isNaN(healInsGradeParam))
                return;
            control.fetch.getMonthlyPensionInsStandardRemuneration({
                sid: sid,
                startYM: moment.utc(startYMParam, "YYYYMMDD").toDate(),
                healInsGrade: healInsGradeParam,
                healInsStandMonthlyRemune: healInsStandMonthlyRemuneParam,
                pensionInsGrade: pensionInsGradeParam,
                pensionInsStandCompenMonthly: pensionInsStandCompenMonthlyParam
            }).done(function (res) {
                if (!resultCode)
                    return;
                if (res) {
                    if (res != result) {
                        $grid.mGrid("updateCell", o.id, resultCode, res);
                    }
                }
                else {
                    $grid.mGrid("updateCell", o.id, resultCode, "");
                }
            });
        }
        // getHealthInsuranceStandardGradePerMonth
        function getHealthInsuranceStandardGradePerMonth(v, o, startYMCode, healInsGradeCode, healInsStandMonthlyRemuneCode, pensionInsGradeCode, pensionInsStandCompenMonthlyCode, resultCode) {
            if (_.isNil(v))
                return;
            var sid = o.employeeId, 
            //IS01016
            startYMParam = o[startYMCode], 
            //IS01020
            healInsGradeParam = o[healInsGradeCode], 
            //IS01021
            healInsStandMonthlyRemuneParam = o[healInsStandMonthlyRemuneCode], 
            //IS01022
            pensionInsGradeParam = o[pensionInsGradeCode], 
            //IS01023
            pensionInsStandCompenMonthlyParam = o[pensionInsStandCompenMonthlyCode], result = o[resultCode], $grid = $("#grid");
            var inputDate = moment.utc(startYMParam);
            if (!inputDate.isValid() || inputDate.diff(moment.utc("1900/01/01"), "days", true) < 0
                || inputDate.diff(moment.utc("9999/12/31"), "days", true) > 0
                || _.isNaN(healInsGradeParam))
                return;
            control.fetch.getHealthInsuranceStandardGradePerMonth({
                sid: sid,
                startYM: moment.utc(startYMParam, "YYYYMMDD").toDate(),
                healInsGrade: healInsGradeParam,
                healInsStandMonthlyRemune: healInsStandMonthlyRemuneParam,
                pensionInsGrade: pensionInsGradeParam,
                pensionInsStandCompenMonthly: pensionInsStandCompenMonthlyParam
            }).done(function (res) {
                if (!resultCode)
                    return;
                if (res) {
                    if (res.healthInsuranceGrade != healInsGradeParam) {
                        $grid.mGrid("updateCell", o.id, healInsGradeCode, res.healthInsuranceGrade);
                    }
                    if (res.standardMonthlyFee != healInsStandMonthlyRemuneParam) {
                        $grid.mGrid("updateCell", o.id, healInsStandMonthlyRemuneCode, res.standardMonthlyFee);
                    }
                }
                else {
                    $grid.mGrid("updateCell", o.id, healInsGradeCode, "");
                    $grid.mGrid("updateCell", o.id, healInsStandMonthlyRemuneCode, "");
                }
            });
        }
        function getHealInsStandCompMonth(v, o, startYMCode, healInsGradeCode, healInsStandMonthlyRemuneCode, pensionInsGradeCode, pensionInsStandCompenMonthlyCode, resultCode) {
            if (_.isNil(v))
                return;
            var rowHist = editedHistories[o.id];
            if (!_.isNil(rowHist)) {
                var itemHist = rowHist[healInsGradeCode];
                if (v === itemHist) {
                    return;
                }
                rowHist[healInsGradeCode] = v;
            }
            else {
                var rowHistObj = {};
                rowHistObj[healInsGradeCode] = v;
                editedHistories[o.id] = rowHistObj;
            }
            var sid = o.employeeId, 
            //IS01016
            startYMParam = o[startYMCode], 
            //IS01020
            healInsGradeParam = v, 
            //IS01021
            healInsStandMonthlyRemuneParam = o[healInsStandMonthlyRemuneCode], 
            //IS01022
            pensionInsGradeParam = o[pensionInsGradeCode], 
            //IS01023
            pensionInsStandCompenMonthlyParam = o[pensionInsStandCompenMonthlyCode], result = o[resultCode], $grid = $("#grid");
            var inputDate = moment.utc(startYMParam);
            if (!inputDate.isValid() || inputDate.diff(moment.utc("1900/01/01"), "days", true) < 0
                || inputDate.diff(moment.utc("9999/12/31"), "days", true) > 0
                || _.isNaN(healInsGradeParam))
                return;
            control.fetch.getHealInsStandCompMonth({
                sid: sid,
                startYM: moment.utc(startYMParam, "YYYYMMDD").toDate(),
                healInsGrade: healInsGradeParam,
                healInsStandMonthlyRemune: healInsStandMonthlyRemuneParam,
                pensionInsGrade: pensionInsGradeParam,
                pensionInsStandCompenMonthly: pensionInsStandCompenMonthlyParam
            }).done(function (res) {
                if (!resultCode)
                    return;
                if (res) {
                    $grid.mGrid("updateCell", o.id, resultCode, res);
                }
                else {
                    $grid.mGrid("updateCell", o.id, resultCode, "");
                }
            });
        }
        function dateSubscribeCombo(code, v, o) {
            var empId = o.employeeId, comboData = (((__viewContext || {}).viewModel || {}).dataTypes || {})[code], date = moment.utc(v, "YYYY/MM/DD"), catId = (((__viewContext || {}).viewModel || {}).category || {}).catId;
            if (_.isNil(empId) || empId === "" || _.isNil(comboData) || _.isNil(catId())
                || date.diff(moment.utc("1900/01/01", "YYYY/MM/DD"), "days", true) < 0
                || date.diff(moment.utc("9999/12/31", "YYYY/MM/DD"), "days", true) > 0) {
                return;
            }
            //            block();
            control.fetch.get_cb_data({
                comboBoxType: comboData.cls.referenceType,
                categoryId: catId(),
                required: comboData.cls.required,
                standardDate: date.toDate(),
                typeCode: comboData.cls.typeCode,
                masterType: comboData.cls.masterType,
                employeeId: empId,
                cps002: false,
                workplaceId: undefined,
                baseDate: undefined
            }).done(function (cbx) {
                //                if (code === "IS00079") {
                var $grid = $("#grid");
                $grid.mGrid("updateCell", o.id, code, cbx, null, null, true);
                $grid.mGrid("clearErrors", [{ id: o.id, columnKey: code }]);
                //                }
                //                unblock();
            }).fail(function () {
                //                unblock();
            });
        }
        function selectButton() {
            _.forEach(control.selectGroups, function (g) {
                if (g.firstTimes && g.secondTimes) {
                    control.TIME_RANGE_GROUP[g.ctgCode + "_" + g.firstTimes.end] = function (id, key, val, data) {
                        var scs = data[g.secondTimes.start];
                        if (_.isNil(scs) || scs === "")
                            return;
                        var firstEnd = nts.uk.time.minutesBased.clock.dayattr.parseString(val || ""), secondStart = nts.uk.time.minutesBased.clock.dayattr.parseString(data[g.secondTimes.start] || "");
                        if (firstEnd.success && secondStart.success) {
                            var $grid = $("#grid");
                            if (firstEnd.asMinutes > secondStart.asMinutes) {
                                var index = _.findIndex($grid.mGrid("dataSource", true), function (d) { return d.id === data.id; }), message = nts.uk.resource.getMessage("Msg_859");
                                $grid.mGrid("setErrors", [{ id: id, index: index, columnKey: g.firstTimes.end, message: message }]);
                            }
                            else {
                                $grid.mGrid("clearErrors", [{ id: id, columnKey: g.firstTimes.end }]);
                                var secondEnd = nts.uk.time.minutesBased.clock.dayattr.parseString(data[g.secondTimes.end] || "");
                                if (secondEnd.success && secondStart.asMinutes < secondEnd.asMinutes) {
                                    $grid.mGrid("clearErrors", [{ id: id, columnKey: g.secondTimes.start }]);
                                }
                            }
                        }
                    };
                    control.TIME_RANGE_GROUP[g.ctgCode + "_" + g.secondTimes.start] = function (id, key, val, data) {
                        if (_.isNil(val) || val === "")
                            return;
                        var firstEnd = nts.uk.time.minutesBased.clock.dayattr.parseString(data[g.firstTimes.end] || ""), secondStart = nts.uk.time.minutesBased.clock.dayattr.parseString(val || "");
                        if (firstEnd.success && secondStart.success) {
                            var $grid = $("#grid");
                            if (firstEnd.asMinutes > secondStart.asMinutes) {
                                var index = _.findIndex($grid.mGrid("dataSource", true), function (d) { return d.id === data.id; }), message = nts.uk.resource.getMessage("Msg_859");
                                $grid.mGrid("setErrors", [{ id: id, index: index, columnKey: g.secondTimes.start, message: message }]);
                            }
                            else {
                                $grid.mGrid("clearErrors", [{ id: id, columnKey: g.secondTimes.start }]);
                                var firstStart = nts.uk.time.minutesBased.clock.dayattr.parseString(data[g.firstTimes.start] || "");
                                if (firstStart.success && firstStart.asMinutes < firstEnd.asMinutes) {
                                    $grid.mGrid("clearErrors", [{ id: id, columnKey: g.firstTimes.end }]);
                                }
                            }
                        }
                    };
                }
                if (!g.workType) {
                    if (g.workplace) {
                        control.SELECT_BUTTON[g.ctgCode + "_" + g.workplace] = function (required, data) {
                            var startDate = data.rowValue[g.startDate];
                            if (startDate && moment(startDate).isValid()) {
                                control.fetch.checkFunctionNo().done(function (role) {
                                    setShared('inputCDL008', {
                                        selectedCodes: [data.value],
                                        baseDate: startDate,
                                        isMultiple: false,
                                        selectedSystemType: 1,
                                        isrestrictionOfReferenceRange: role.available,
                                        showNoSelection: !required,
                                        isShowBaseDate: false
                                    }, true);
                                    modal('com', '/view/cdl/008/a/index.xhtml').onClosed(function () {
                                        if (getShared('CDL008Cancel')) {
                                            return;
                                        }
                                        var output = getShared('outputCDL008');
                                        if (!_.isNil(output)) {
                                            var $grid = $("#grid");
                                            $grid.mGrid("updateCell", data.rowId, g.workplace, output);
                                            $grid.mGrid("clearErrors", [{ id: data.rowId, columnKey: g.workplace }]);
                                        }
                                    });
                                });
                            }
                        };
                    }
                    return;
                }
                if (!g.workTime) {
                    control.SELECT_BUTTON[g.ctgCode + "_" + g.workType] = function (required, data) {
                        setShared("KDL002_isShowNoSelectRow", !required);
                        setShared("KDL002_Multiple", false, true);
                        setShared('kdl002isSelection', false, true);
                        setShared("KDL002_SelectedItemId", _.isNil(data.value) ? [] : [data.value], true);
                        // lstComboBoxValue
                        setShared("KDL002_AllItemObj", _.map(data.itemList, function (x) { return x.optionValue; }), true);
                        modal('at', '/view/kdl/002/a/index.xhtml').onClosed(function () {
                            var childData = getShared('KDL002_SelectedNewItem');
                            if (childData[0]) {
                                var $grid = $("#grid");
                                $grid.mGrid("updateCell", data.rowId, g.workType, childData[0].code);
                                $grid.mGrid("clearErrors", [{ id: data.rowId, columnKey: g.workType }]);
                            }
                        });
                    };
                }
                else {
                    control.WORK_TIME[g.workTime] = { firstTimes: g.firstTimes, secondTimes: g.secondTimes };
                    control.SELECT_BUTTON[g.ctgCode + "_" + g.workType] = function (required, data) {
                        if (['IS00130', 'IS00139'].indexOf(g.workType) > -1) {
                            setShared('parentCodes', {
                                workTypeCodes: g.workType && _.map(data.itemList, function (x) { return x.optionValue; }),
                                selectedWorkTypeCode: g.workType && data.value,
                                // getRelatedItemList: getItemList of column
                                workTimeCodes: g.workTime && _.map(data.relatedItemList(g.workTime), function (x) { return x.optionValue; }),
                                selectedWorkTimeCode: g.workTime && data.rowValue[g.workTime],
                                showNone: false
                            }, true);
                            modal('at', '/view/kdl/003/a/index.xhtml').onClosed(function () {
                                var childData = getShared('childData'), $grid = $("#grid");
                                if (childData) {
                                    $grid.mGrid("updateCell", data.rowId, g.workType, childData.selectedWorkTypeCode);
                                    $grid.mGrid("updateCell", data.rowId, g.workTime, childData.selectedWorkTimeCode);
                                    $grid.mGrid("clearErrors", [{ id: data.rowId, columnKey: g.workType }]);
                                    $grid.mGrid("clearErrors", [{ id: data.rowId, columnKey: g.workTime }]);
                                    if (g.firstTimes) {
                                        updateTime($grid, data.rowId, g.firstTimes.start, childData.first && childData.first.start);
                                        updateTime($grid, data.rowId, g.firstTimes.end, childData.first && childData.first.end);
                                    }
                                    if (g.secondTimes) {
                                        updateTime($grid, data.rowId, g.secondTimes.start, childData.second && childData.second.start);
                                        updateTime($grid, data.rowId, g.secondTimes.end, childData.second && childData.second.end);
                                    }
                                    setEnable(childData.selectedWorkTimeCode, data, g);
                                }
                            });
                        }
                        else {
                            setShared("KDL002_isShowNoSelectRow", !required);
                            setShared("KDL002_Multiple", false, true);
                            setShared('kdl002isSelection', true, true);
                            setShared("KDL002_SelectedItemId", _.isNil(data.value) ? [] : [data.value], true);
                            setShared("KDL002_AllItemObj", _.map(data.itemList, function (x) { return x.optionValue; }), true);
                            modal('at', '/view/kdl/002/a/index.xhtml').onClosed(function () {
                                var childData = getShared('KDL002_SelectedNewItem');
                                if (childData.length > 0) {
                                    var $grid = $("#grid");
                                    $grid.mGrid("updateCell", data.rowId, g.workType, childData[0].code);
                                    $grid.mGrid("clearErrors", [{ id: data.rowId, columnKey: g.workType }]);
                                }
                            });
                        }
                    };
                    control.SELECT_BUTTON[g.ctgCode + "_" + g.workTime] = function (required, data) {
                        if (['IS00131', 'IS00140'].indexOf(g.workTime) > -1) {
                            setShared('parentCodes', {
                                workTypeCodes: g.workType && _.map(data.relatedItemList(g.workType), function (x) { return x.optionValue; }),
                                selectedWorkTypeCode: g.workType && data.rowValue[g.workType],
                                workTimeCodes: g.workTime && _.map(data.itemList, function (x) { return x.optionValue; }),
                                selectedWorkTimeCode: g.workTime && data.value,
                                showNone: false
                            }, true);
                            modal('at', '/view/kdl/003/a/index.xhtml').onClosed(function () {
                                var childData = getShared('childData'), $grid = $("#grid");
                                if (childData) {
                                    $grid.mGrid("updateCell", data.rowId, g.workType, childData.selectedWorkTypeCode);
                                    $grid.mGrid("updateCell", data.rowId, g.workTime, childData.selectedWorkTimeCode);
                                    $grid.mGrid("clearErrors", [{ id: data.rowId, columnKey: g.workType }]);
                                    $grid.mGrid("clearErrors", [{ id: data.rowId, columnKey: g.workTime }]);
                                    if (g.firstTimes) {
                                        updateTime($grid, data.rowId, g.firstTimes.start, childData.first && childData.first.start);
                                        updateTime($grid, data.rowId, g.firstTimes.end, childData.first && childData.first.end);
                                    }
                                    if (g.secondTimes) {
                                        updateTime($grid, data.rowId, g.secondTimes.start, childData.second && childData.second.start);
                                        updateTime($grid, data.rowId, g.secondTimes.end, childData.second && childData.second.end);
                                    }
                                    setEnable(childData.selectedWorkTimeCode, data, g);
                                }
                            });
                        }
                        else {
                            setShared("kdl00showNoSelectionRow", !required);
                            setShared("kml001multiSelectMode", false);
                            setShared("kml001selectedCodeList", _.isNil(data.value) ? [] : [data.value]);
                            setShared("kml001isSelection", true);
                            setShared("kml001selectAbleCodeList", _.map(data.itemList, function (x) { return x.optionValue; }), true);
                            modal('at', '/view/kdl/001/a/index.xhtml').onClosed(function () {
                                var childData = getShared('kml001selectedTimes'), $grid = $("#grid");
                                if (childData) {
                                    if (childData.length > 0) {
                                        var oData = childData[0];
                                        $grid.mGrid("updateCell", data.rowId, g.workTime, oData.selectedWorkTimeCode);
                                        $grid.mGrid("clearErrors", [{ id: data.rowId, columnKey: g.workTime }]);
                                        if (g.firstTimes) {
                                            updateTime($grid, data.rowId, g.firstTimes.start, oData.first && oData.first.start);
                                            updateTime($grid, data.rowId, g.firstTimes.end, oData.first && oData.first.end);
                                        }
                                        if (g.secondTimes) {
                                            updateTime($grid, data.rowId, g.secondTimes.start, oData.second && oData.second.start);
                                            updateTime($grid, data.rowId, g.secondTimes.end, oData.second && oData.second.end);
                                        }
                                        setEnable(oData.selectedWorkTimeCode, data, g);
                                    }
                                }
                            });
                        }
                    };
                }
                ;
            });
        }
        control.selectButton = selectButton;
        function updateTime($grid, id, time, value) {
            if (!_.isNil(value)) {
                value = nts.uk.time.minutesBased.clock.dayattr.create(value).shortText;
            }
            $grid.mGrid("updateCell", id, time, value, null, true);
        }
        function setEnable(workTimeCode, data, group) {
            var $grid = $("#grid");
            if (workTimeCode) {
                var command_1 = { workTimeCode: workTimeCode };
                control.fetch.check_start_end(command_1).done(function (first) {
                    if (group.firstTimes) {
                        if (!first) {
                            $grid.mGrid("disableNtsControlAt", data.rowId, group.firstTimes.start);
                            $grid.mGrid("disableNtsControlAt", data.rowId, group.firstTimes.end);
                        }
                        else {
                            $grid.mGrid("enableNtsControlAt", data.rowId, group.firstTimes.start);
                            $grid.mGrid("enableNtsControlAt", data.rowId, group.firstTimes.end);
                        }
                    }
                    if (group.secondTimes) {
                        control.fetch.check_multi_time(command_1).done(function (second) {
                            if (first && second) {
                                $grid.mGrid("enableNtsControlAt", data.rowId, group.secondTimes.start);
                                $grid.mGrid("enableNtsControlAt", data.rowId, group.secondTimes.end);
                            }
                            else {
                                $grid.mGrid("disableNtsControlAt", data.rowId, group.secondTimes.start);
                                $grid.mGrid("disableNtsControlAt", data.rowId, group.secondTimes.end);
                            }
                        });
                    }
                });
            }
            else {
                if (group.firstTimes) {
                    $grid.mGrid("disableNtsControlAt", data.rowId, group.firstTimes.start);
                    $grid.mGrid("disableNtsControlAt", data.rowId, group.firstTimes.end);
                }
                if (group.secondTimes) {
                    $grid.mGrid("disableNtsControlAt", data.rowId, group.secondTimes.start);
                    $grid.mGrid("disableNtsControlAt", data.rowId, group.secondTimes.end);
                }
            }
        }
        control.setEnable = setEnable;
        function relateButton() {
            _.forEach(relateButtonGroups, function (g) {
                control.RELATE_BUTTON[g.ctgCode + "_" + g.btnCode] = function (v) {
                    var sid = v.rowValue.employeeId;
                    setShared('CPS001GHI_VALUES', {
                        ctgCode: g.ctgCode,
                        sid: sid
                    });
                    modal('com', "/view/cps/001/".concat(g.dialogId, "/index.xhtml")).onClosed(function () {
                        if (!sid) {
                            return;
                        }
                        var $grid = $("#grid");
                        switch (g.dialogId) {
                            case "g":
                                control.fetch.get_annLeaNumber(sid).done(function (data) {
                                    $grid.mGrid("updateCell", v.rowId, g.btnCode, data.annualLeaveNumber);
                                    if (g.lblCode) {
                                        $grid.mGrid("updateCell", v.rowId, g.lblCode, data.lastGrantDate);
                                    }
                                });
                                break;
                            case "h":
                                control.fetch.get_resvLeaNumber(sid).done(function (data) {
                                    $grid.mGrid("updateCell", v.rowId, g.btnCode, data);
                                });
                                break;
                            case "i":
                                control.fetch.get_calDayTime(sid, g.specialCd).done(function (data) {
                                    $grid.mGrid("updateCell", v.rowId, g.btnCode, data);
                                });
                        }
                    });
                };
            });
        }
        control.relateButton = relateButton;
        function validateDateRange() {
            _.forEach(control.dateRange, function (range) {
                control.DATE_RANGE[range.ctgCode + "_" + range.start] = function (required, format, start, data) {
                    var formatStr;
                    if (format === "ymd") {
                        formatStr = "YYYY/MM/DD";
                    }
                    else if (format === "ym") {
                        formatStr = "YYYY/MM";
                    }
                    else {
                        formatStr = "YYYY";
                    }
                    var end = moment.utc(data[range.end], formatStr, true), $grid = $("#grid");
                    if (!(start instanceof moment)) {
                        start = moment.utc(start, formatStr, true);
                    }
                    //                    if (!start.isValid() || !end.isValid()) return;
                    if (end.isBefore(start)) {
                        var index = _.findIndex($grid.mGrid("dataSource", true), function (d) { return d.id === data.id; }), message = nts.uk.resource.getMessage("MsgB_21", ["期間"]);
                        $grid.mGrid("setErrors", [{ id: data.id, index: index, columnKey: range.start, message: message }]);
                    }
                    else {
                        if ((!required && (_.isNil(end._i) || end._i === ""))
                            || (!_.isNil(end._i) && end._i !== "" && end.isValid())) {
                            $grid.mGrid("clearErrors", [{ id: data.id, columnKey: range.end }]);
                        }
                        if ((!required && (_.isNil(start._i) || start._i === ""))
                            || (!_.isNil(start._i) && start._i !== "" && start.isValid())) {
                            $grid.mGrid("clearErrors", [{ id: data.id, columnKey: range.start }]);
                        }
                    }
                };
                control.DATE_RANGE[range.ctgCode + "_" + range.end] = function (required, format, end, data) {
                    var formatStr;
                    if (format === "ymd") {
                        formatStr = "YYYY/MM/DD";
                    }
                    else if (format === "ym") {
                        formatStr = "YYYY/MM";
                    }
                    else {
                        formatStr = "YYYY";
                    }
                    var start = moment.utc(data[range.start], formatStr, true), $grid = $("#grid");
                    if (!(end instanceof moment)) {
                        end = moment.utc(end, formatStr, true);
                    }
                    if (end.isBefore(start)) {
                        var index = _.findIndex($grid.mGrid("dataSource", true), function (d) { return d.id === data.id; }), message = nts.uk.resource.getMessage("MsgB_21", ["期間"]);
                        $grid.mGrid("setErrors", [{ id: data.id, index: index, columnKey: range.end, message: message }]);
                    }
                    else {
                        if (!_.isNil(start._i) && start._i !== "" && start.isValid()) {
                            $grid.mGrid("clearErrors", [{ id: data.id, columnKey: range.start }]);
                        }
                        if ((!required && (_.isNil(end._i) || end._i === ""))
                            || (!_.isNil(end._i) && end._i !== "" && end.isValid())) {
                            $grid.mGrid("clearErrors", [{ id: data.id, columnKey: range.end }]);
                        }
                    }
                };
            });
        }
        control.validateDateRange = validateDateRange;
        function extendTimeRange() {
            _.forEach(control.timeRange, function (range) {
                control.TIME_RANGE[range.ctgCode + "_" + range.start] = function (required, itemId, name, id, key, val, data) {
                    var dfd = $.Deferred(), hasError;
                    if (_.isNil(itemId)) {
                        dfd.reject();
                        return dfd.promise();
                    }
                    var endId = itemId.substring(0, itemId.length - 5) + nts.uk.text.padLeft(String(Number(itemId.slice(-5)) + 1), '0', 5), pv = __viewContext.primitiveValueConstraints[itemId];
                    //                    if (pv) {
                    //                        let minTime = nts.uk.time.minutesBased.clock.dayattr.parseString(arguments[4][range.start]).asMinutes,
                    //                            formatter = new nts.uk.text.TimeWithDayFormatter({});
                    //                        try {
                    //                            pv.min = formatter.format(minTime + 1);
                    //                        } catch (e) {}
                    //                    }
                    var max = nts.uk.time.minutesBased.clock.dayattr.parseString(data[range.end] || ""), value = nts.uk.time.minutesBased.clock.dayattr.parseString(val || ""), $grid = $("#grid");
                    if (max.success && value.success) {
                        var endDate = data[range.end];
                        if (max.asMinutes < value.asMinutes && (!_.isNil(endDate) && endDate !== "") && (!_.isNil(val) && val !== "")) {
                            var index = _.findIndex($grid.mGrid("dataSource", true), function (d) { return d.id === data.id; }), maxVal = nts.uk.time.minutesBased.clock.dayattr.create(max.asMinutes - 1), minVal = nts.uk.time.minutesBased.clock.dayattr.create(nts.uk.time.minutesBased.clock.dayattr.parseString(pv.min).asMinutes), message = nts.uk.resource.getMessage("MsgB_16", [name, minVal.fullText, maxVal.fullText]);
                            $grid.mGrid("setErrors", [{ id: id, index: index, columnKey: range.start, message: message }]);
                            hasError = true;
                        }
                        else {
                            $grid.mGrid("clearErrors", [{ id: id, columnKey: range.start }]);
                            if (!_.isNil(data[range.end]) && data[range.end] !== "") {
                                $grid.mGrid("clearErrors", [{ id: id, columnKey: range.end }]);
                            }
                            hasError = false;
                        }
                    }
                    dfd.reject(hasError);
                    return dfd.promise();
                };
                control.TIME_RANGE[range.ctgCode + "_" + range.end] = function (required, itemId, name, id, key, val, data) {
                    var dfd = $.Deferred(), hasError;
                    if (_.isNil(itemId)) {
                        dfd.reject();
                        return dfd.promise();
                    }
                    var startId = itemId.substring(0, itemId.length - 5) + nts.uk.text.padLeft(String(Number(itemId.slice(-5)) - 1), '0', 5), pv = __viewContext.primitiveValueConstraints[itemId];
                    //                    if (pv) {
                    //                        let maxTime = nts.uk.time.minutesBased.clock.dayattr.parseString(arguments[4][range.end]).asMinutes,
                    //                            formatter = new nts.uk.text.TimeWithDayFormatter({});
                    //                        try {
                    //                            pv.max = formatter.format(maxTime - 1);
                    //                        } catch (e) {}   
                    //                    }
                    var min = nts.uk.time.minutesBased.clock.dayattr.parseString(data[range.start] || ""), value = nts.uk.time.minutesBased.clock.dayattr.parseString(val || ""), $grid = $("#grid");
                    if (min.success) {
                        var startDate = data[range.start];
                        if (min.asMinutes > value.asMinutes && (!_.isNil(startDate) && startDate !== "") && (!_.isNil(val) && val !== "")) {
                            var index = _.findIndex($grid.mGrid("dataSource", true), function (d) { return d.id === data.id; }), minVal = nts.uk.time.minutesBased.clock.dayattr.create(min.asMinutes + 1), maxVal = nts.uk.time.minutesBased.clock.dayattr.create(nts.uk.time.minutesBased.clock.dayattr.parseString(pv.max).asMinutes), message = nts.uk.resource.getMessage("MsgB_16", [name, minVal.fullText, maxVal.fullText]);
                            $grid.mGrid("setErrors", [{ id: id, index: index, columnKey: range.end, message: message }]);
                            hasError = true;
                        }
                        else {
                            $grid.mGrid("clearErrors", [{ id: id, columnKey: range.end }]);
                            if (!_.isNil(data[range.start]) && data[range.start] !== "") {
                                $grid.mGrid("clearErrors", [{ id: id, columnKey: range.start }]);
                            }
                            hasError = false;
                        }
                    }
                    dfd.reject(hasError);
                    return dfd.promise();
                };
            });
        }
        control.extendTimeRange = extendTimeRange;
        function primitiveConst(x) {
            var dts = x.itemTypeState.dataTypeState, constraint = {
                itemName: x.itemName,
                itemCode: x.itemId.replace(/[-_]/g, ""),
                required: x.required
            };
            if (dts) {
                switch (dts.dataTypeValue) {
                    default:
                    case ITEM_SINGLE_TYPE.STRING:
                        constraint.valueType = "String";
                        constraint.maxLength = dts.stringItemLength || dts.maxLength;
                        constraint.stringExpression = /(?:)/;
                        switch (dts.stringItemType) {
                            default:
                            case ITEM_STRING_TYPE.ANY:
                                constraint.charType = 'Any';
                                break;
                            case ITEM_STRING_TYPE.CARDNO:
                                constraint.itemCode = 'StampNumber';
                                constraint.charType = 'AnyHalfWidth';
                                constraint.stringExpression = /^[a-zA-Z0-9\s"#$%&(~|{}\[\]@:`*+?;\\/_\-><)]{1,20}$/;
                                break;
                            case ITEM_STRING_TYPE.EMPLOYEE_CODE:
                                constraint.itemCode = 'EmployeeCode';
                                constraint.charType = 'AnyHalfWidth';
                                break;
                            case ITEM_STRING_TYPE.ANYHALFWIDTH:
                                constraint.charType = 'AnyHalfWidth';
                                break;
                            case ITEM_STRING_TYPE.ALPHANUMERIC:
                                constraint.charType = 'AlphaNumeric';
                                break;
                            case ITEM_STRING_TYPE.NUMERIC:
                                constraint.charType = 'Numeric';
                                break;
                            case ITEM_STRING_TYPE.KANA:
                                constraint.charType = 'Kana';
                                break;
                        }
                        break;
                    case ITEM_SINGLE_TYPE.NUMERIC:
                    case ITEM_SINGLE_TYPE.NUMBERIC_BUTTON:
                        constraint.charType = 'Numeric';
                        if (dts.decimalPart == 0) {
                            constraint.valueType = "Integer";
                        }
                        else {
                            if (dts.numericItemAmount === 1) {
                                constraint.valueType = "Currency";
                            }
                            else {
                                constraint.valueType = "Decimal";
                            }
                            constraint.mantissaMaxLength = dts.decimalPart;
                        }
                        var max = (Math.pow(10, dts.integerPart) - Math.pow(10, -(dts.decimalPart || 0)));
                        constraint.min = dts.numericItemMin || 0;
                        constraint.max = dts.numericItemMax || max;
                        break;
                    case ITEM_SINGLE_TYPE.DATE:
                        constraint.valueType = "Date";
                        constraint.max = parseTime(dts.max, true).format() || '';
                        constraint.min = parseTime(dts.min, true).format() || '';
                        break;
                    case ITEM_SINGLE_TYPE.TIME:
                        constraint.valueType = "Time";
                        constraint.max = parseTime(dts.max, true).format();
                        constraint.min = parseTime(dts.min, true).format();
                        break;
                    case ITEM_SINGLE_TYPE.TIMEPOINT:
                        constraint.valueType = "TimeWithDay";
                        constraint.max = parseTimeWithDay(dts.timePointItemMax).shortText;
                        constraint.min = parseTimeWithDay(dts.timePointItemMin).shortText;
                        break;
                    case ITEM_SINGLE_TYPE.SELECTION:
                        constraint.valueType = "Selection";
                        break;
                    case ITEM_SINGLE_TYPE.SEL_RADIO:
                        constraint.valueType = "Radio";
                        break;
                    case ITEM_SINGLE_TYPE.SEL_BUTTON:
                        constraint.valueType = "Button";
                        break;
                    case ITEM_SINGLE_TYPE.READONLY:
                        constraint.valueType = "READONLY";
                        break;
                    case ITEM_SINGLE_TYPE.RELATE_CATEGORY:
                        constraint.valueType = "RELATE_CATEGORY";
                        break;
                    case ITEM_SINGLE_TYPE.READONLY_BUTTON:
                        constraint.valueType = "READONLY_BUTTON";
                        break;
                }
                var cateCode = __viewContext.viewModel.category.catCode();
                if (control.HALF_INT[cateCode + "_" + x.itemCode]) {
                    constraint.valueType = "HalfInt";
                }
            }
            return constraint;
        }
        control.primitiveConst = primitiveConst;
        function writePrimitiveConstraint(data) {
            var constraint = primitiveConst(data);
            if (constraint) {
                writeConstraint(constraint.itemCode, constraint);
            }
        }
        control.writePrimitiveConstraint = writePrimitiveConstraint;
    })(control = cps003.control || (cps003.control = {}));
})(cps003 || (cps003 = {}));
//# sourceMappingURL=control.js.map