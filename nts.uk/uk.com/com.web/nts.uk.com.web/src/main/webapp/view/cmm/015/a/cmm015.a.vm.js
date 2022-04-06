var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/// <reference path='../../../../lib/nittsu/viewcontext.d.ts' />
var cmm015;
(function (cmm015) {
    var a;
    (function (a) {
        var viewmodel;
        (function (viewmodel) {
            var getText = nts.uk.resource.getText;
            var API = {
                getEmpInWkp: 'com/screen/cmm015/getEmployeesInWorkplace',
                getTransferOfDay: 'com/screen/cmm015/getTransferOfDay',
                regisJTC: 'com/screen/cmm015/regisJTC',
                createTransferList: 'com/screen/cmm015/createTransferList',
                addAWH: 'com/screen/cmm015/addAWH',
                transOnApproved: 'com/screen/cmm015/transOnApproved',
                cancelExecuteTransfer: 'com/screen/cmm015/cancelExecuteTransfer'
            };
            var MAX_DATE = '9999/12/31';
            var ERRORSCODE = '#FF0000';
            var COMMA = '、';
            var ScreenModel = /** @class */ (function (_super) {
                __extends(ScreenModel, _super);
                function ScreenModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.transferDate = ko.observable('');
                    _this.selectedIdLeft = ko.observable('');
                    _this.selectedIdLeftClone = '';
                    _this.baseDateLeft = ko.observable((new Date(moment.utc().subtract(1, 'd').toString())));
                    _this.listDataLeft = ko.observableArray([]);
                    _this.selectedIdRight = ko.observable('');
                    _this.selectedIdRightClone = '';
                    _this.baseDateRight = ko.observable(new Date(moment.utc().toString()));
                    _this.listDataRight = ko.observableArray([]);
                    _this.incumbentLeft = ko.observable(true);
                    _this.closedLeft = ko.observable(false);
                    _this.leaveLeft = ko.observable(false);
                    _this.retireeLeft = ko.observable(false);
                    _this.incumbentRight = ko.observable(true);
                    _this.closedRight = ko.observable(false);
                    _this.leaveRight = ko.observable(false);
                    _this.retireeRight = ko.observable(false);
                    _this.tableDatasSource = ko.observableArray([]);
                    _this.currentCodeListSource = ko.observableArray([]);
                    _this.tableDatasDest = ko.observableArray([]);
                    _this.currentCodeListDest = ko.observable('');
                    _this.tableDatasHistory = ko.observableArray([]);
                    _this.currentCodeListHistory = ko.observableArray([]);
                    _this.dateValue = ko.observable({
                        startDate: moment.utc().format('YYYY/MM/DD'),
                        endDate: MAX_DATE
                    });
                    _this.startDateString = ko.observable('');
                    _this.endDateString = ko.observable('');
                    _this.isEnableA3 = ko.observable(true);
                    _this.isEnableA6 = ko.observable(true);
                    _this.isEnableA11 = ko.observable(true);
                    _this.enableTransferDate = ko.observable(false);
                    _this.transfereeOnApproved = ko.observable({});
                    _this.isReloadKcp = false;
                    return _this;
                }
                ScreenModel.prototype.created = function () {
                    var vm = this;
                    vm.treeGridLeft = {
                        isShowAlreadySet: false,
                        isMultipleUse: true,
                        isMultiSelect: false,
                        startMode: 0,
                        selectedId: vm.selectedIdLeft,
                        baseDate: vm.baseDateLeft,
                        selectType: 4,
                        isShowSelectButton: false,
                        isDialog: false,
                        maxRows: 10,
                        tabindex: 3,
                        systemType: 2,
                        listDataDisplay: vm.listDataLeft,
                        hasPadding: false
                    };
                    vm.treeGridRight = {
                        isShowAlreadySet: false,
                        isMultipleUse: true,
                        isMultiSelect: false,
                        startMode: 0,
                        selectedId: vm.selectedIdRight,
                        baseDate: vm.baseDateRight,
                        selectType: 4,
                        isShowSelectButton: false,
                        isDialog: false,
                        maxRows: 10,
                        tabindex: 5,
                        systemType: 2,
                        listDataDisplay: vm.listDataRight,
                        hasPadding: false
                    };
                    vm.columnsSource = ko.observableArray([
                        { headerText: '', key: 'id', hidden: true },
                        { headerText: '', key: 'cssWKP', hidden: true },
                        {
                            headerText: vm.$i18n('CMM015_21'), key: 'code', width: 115, headerCssClass: 'text-left',
                            template: '<div style="color: ${cssWKP}">${code}</div>'
                        },
                        {
                            headerText: vm.$i18n('CMM015_22'), key: 'name', width: 140, headerCssClass: 'text-left',
                            template: '<div style="color: ${cssWKP}">${name}</div>'
                        },
                        { headerText: vm.$i18n('CMM015_23'), key: 'jt', width: 80, headerCssClass: 'text-left' }
                    ]);
                    vm.columnsDest = ko.observableArray([
                        { headerText: '', key: 'id', hidden: true },
                        { headerText: '', key: 'jtID', hidden: true },
                        { headerText: '', key: 'cssWKP', hidden: true },
                        { headerText: '', key: 'cssJT', hidden: true },
                        {
                            headerText: vm.$i18n('CMM015_21'), key: 'code', width: 115, headerCssClass: 'text-left',
                            template: '<div style="color: ${cssWKP}">${code}</div>'
                        },
                        {
                            headerText: vm.$i18n('CMM015_22'), key: 'name', width: 140, headerCssClass: 'text-left',
                            template: '<div style="color: ${cssWKP}">${name}</div>'
                        },
                        {
                            headerText: vm.$i18n('CMM015_23'), key: 'jt', width: 140, headerCssClass: 'text-left',
                            template: '<div style="color: ${cssJT}">${jt}</div>'
                        },
                        {
                            headerText: vm.$i18n('CMM015_34'), key: 'jtc', width: 100, headerCssClass: 'text-left',
                            template: '<a class="custom-link" jtid="${jtID}" emp="${id}" style="color: ${cssJT}">${jtc}</a>'
                        }
                    ]);
                    vm.columnsHistory = ko.observableArray([
                        { headerText: '', key: 'key', hidden: true },
                        { headerText: '', key: 'bgPostWkp', hidden: true },
                        { headerText: '', key: 'css', hidden: true },
                        {
                            headerText: vm.$i18n('CMM015_45'), key: 'startDate', width: 100, headerCssClass: 'text-left',
                            template: '<div style="color: ${css};">${startDate}</div>'
                        },
                        {
                            headerText: vm.$i18n('CMM015_46'), key: 'sCD', width: 130, headerCssClass: 'text-left',
                            template: '<div style="color: ${css};">${sCD}</div>'
                        },
                        {
                            headerText: vm.$i18n('CMM015_47'), key: 'sName', width: 140, headerCssClass: 'text-left',
                            template: '<div style="color: ${css};">${sName}</div>'
                        },
                        { headerText: vm.$i18n('CMM015_48'), key: 'prevWkpName', width: 220, headerCssClass: 'text-left' },
                        { headerText: vm.$i18n('CMM015_49'), key: 'prevPositionName', width: 135, headerCssClass: 'text-left' },
                        {
                            headerText: vm.$i18n('CMM015_50'), key: 'postWkpName', width: 220, headerCssClass: 'text-left dest-wkp',
                            template: '<div style="background: ${bgPostWkp}; color: ${css};">${postWkpName}</div>'
                        },
                        {
                            headerText: vm.$i18n('CMM015_51'), key: 'postPositionName', width: 140, headerCssClass: 'text-left dest-wkp',
                            template: '<div style="color: ${css};">${postPositionName}</div>'
                        }
                    ]);
                    vm.baseDateLeftText = ko.computed(function () {
                        var date = moment.utc(vm.baseDateLeft()).format('YYYY/MM/DD');
                        return nts.uk.time.applyFormat('Long_YMD', [date]);
                    });
                    vm.baseDateRightText = ko.computed(function () {
                        var date = moment.utc(vm.baseDateRight()).format('YYYY/MM/DD');
                        return nts.uk.time.applyFormat('Long_YMD', [date]);
                    });
                };
                ScreenModel.prototype.mounted = function () {
                    var vm = this;
                    vm.startDateString.subscribe(function (value) {
                        vm.dateValue().startDate = value;
                        vm.dateValue.valueHasMutated();
                    });
                    vm.endDateString.subscribe(function (value) {
                        vm.dateValue().endDate = value;
                        vm.dateValue.valueHasMutated();
                    });
                    vm.selectedIdLeft.subscribe(function (value) {
                        vm.selectedIdLeftClone = value;
                        if (!value) {
                            return;
                        }
                        if (vm.isReloadKcp) {
                            return;
                        }
                        vm.loadDataWkp(Table.LEFT);
                    });
                    vm.selectedIdRight.subscribe(function (value) {
                        vm.selectedIdRightClone = value;
                        if (!value) {
                            return;
                        }
                        if (vm.isReloadKcp) {
                            vm.isReloadKcp = false;
                            return;
                        }
                        vm
                            .loadDataWkp(Table.RIGHT)
                            .then(function () {
                            if (!_.isEmpty(vm.tableDatasDest())) {
                                vm.getTransferOfDay(vm.baseDateRight());
                            }
                        });
                    });
                    vm.transferDate.subscribe(function () {
                        vm
                            .$validate('#A1_2')
                            .then(function (valid) {
                            if (!valid) {
                                vm.enableTransferDate(false);
                            }
                        });
                    });
                    $('#A13').click(function (v) {
                        if (!v.target.classList.contains('custom-link')) {
                            return;
                        }
                        var employeeID = v.target.getAttribute('emp');
                        nts.uk.ui.windows.setShared('inputCDL004', {
                            isMultiple: false,
                            isShowNoSelectRow: true,
                            selectedCodes: v.target.getAttribute('jtID'),
                            isShowBaseDate: false,
                            baseDate: moment(vm.baseDateRight()).utc().toISOString()
                        });
                        nts.uk.ui.windows.sub
                            .modal('com', '/view/cdl/004/a/index.xhtml')
                            .onClosed(function () {
                            var output = nts.uk.ui.windows.getShared('outputCDL004');
                            if (output) {
                                var index = _.findIndex(vm.tableDatasDest(), function (item) { return item.id === employeeID; });
                                var data = vm.tableDatasDest()[index];
                                if (vm.isDuplicateId(data.jtID, output))
                                    return;
                                vm.$blockui('grayout');
                                // 職位異動の登録をする
                                vm
                                    .$ajax('com', API.regisJTC, {
                                    sid: data.id,
                                    jobTitleId: output,
                                    startDate: moment.utc(vm.baseDateRight()).toISOString(),
                                    endDate: moment.utc(new Date(MAX_DATE)).toISOString()
                                })
                                    .then(function () {
                                    vm
                                        .loadDataWkp(Table.RIGHT)
                                        .then(function () { return vm.getTransferOfDay(vm.baseDateRight()); });
                                    // UI処理[6]
                                    vm.currentCodeListDest('');
                                    vm.createTransferList();
                                    vm.$dialog.info({ messageId: 'Msg_15' });
                                })
                                    .fail(function (_a) {
                                    var messageId = _a.messageId;
                                    return vm.$dialog.error({ messageId: messageId });
                                });
                                vm.$blockui('clear');
                            }
                        });
                    });
                    vm.startPage();
                    $('#A1_2').focus();
                };
                ScreenModel.prototype.startPage = function () {
                    var vm = this;
                    vm.$blockui('grayout');
                    $.when($('#tree-grid-left').ntsTreeComponent(vm.treeGridLeft), $('#tree-grid-right').ntsTreeComponent(vm.treeGridRight))
                        .then(function () {
                        var idLeft = $($('#tree-grid-left [data-id]')[0]).attr('data-id');
                        var idRight = $($('#tree-grid-right [data-id]')[0]).attr('data-id');
                        if (idLeft) {
                            vm.selectedIdLeft(idLeft);
                        }
                        if (idRight) {
                            vm.selectedIdRight(idRight);
                        }
                    });
                    vm.createTransferList();
                    vm.$blockui('clear');
                };
                ScreenModel.prototype.clickMeans = function () {
                    var vm = this;
                    vm.$blockui('grayout');
                    if (_.isEmpty(vm.transferDate())) {
                        vm.$dialog.error({ messageId: 'Msg_2105' }).then(function () { return vm.$blockui('clear'); });
                        return;
                    }
                    vm.$validate('#A1_2').then(function (valid) {
                        if (!valid) {
                            nts.uk.ui.errors.show();
                            vm.enableTransferDate(false);
                            vm.$blockui('clear');
                            return;
                        }
                        var date = ko.unwrap(vm.transferDate);
                        vm.baseDateRight(new Date(vm.transferDate()));
                        vm.baseDateLeft(new Date(moment.utc(date).subtract(1, 'd').toString()));
                        vm.enableTransferDate(true);
                        vm
                            .reloadKcp()
                            .then(function () { return vm.loadDataWkp(Table.RIGHT); })
                            .then(function () { return vm.getTransferOfDay(new Date(vm.transferDate())); });
                    });
                    vm.$blockui('clear');
                };
                ScreenModel.prototype.reloadKcp = function () {
                    var vm = this, dfd = $.Deferred();
                    var $selectedLeft = $("#tree-grid-left [data-id=\"".concat(vm.selectedIdLeft(), "\"]"));
                    var $selectedRight = $("#tree-grid-right [data-id=\"".concat(vm.selectedIdRight(), "\"]"));
                    // get selected index
                    var indexLeft = $selectedLeft.parent().children().index($selectedLeft);
                    var indexRight = $selectedRight.parent().children().index($selectedRight);
                    vm.isReloadKcp = true;
                    $
                        .when($('#tree-grid-left').ntsTreeComponent(vm.treeGridLeft), $('#tree-grid-right').ntsTreeComponent(vm.treeGridRight))
                        .then(function () {
                        vm.setSelectedDataKcp(indexLeft, indexRight);
                        vm.loadDataWkp(Table.LEFT);
                        vm.loadDataWkp(Table.RIGHT);
                        $('#tree-grid-left [data-id]').click(function () {
                            if (_.isEmpty(vm.selectedIdLeftClone)) {
                                vm.selectedIdLeft.valueHasMutated();
                            }
                            vm.selectedIdLeftClone = '';
                        });
                        $('#tree-grid-right [data-id]').click(function () {
                            if (_.isEmpty(vm.selectedIdRightClone)) {
                                vm.selectedIdRight.valueHasMutated();
                            }
                            vm.selectedIdRightClone = '';
                        });
                        dfd.resolve();
                    })
                        .fail(function (err) {
                        vm.$dialog.error(err);
                        dfd.reject();
                    });
                    return dfd.promise();
                };
                ScreenModel.prototype.setSelectedDataKcp = function (indexLeft, indexRight) {
                    var vm = this;
                    var dataLengthLeft = $("#tree-grid-left [data-id]").length || 0;
                    var dataLengthRight = $("#tree-grid-right [data-id]").length || 0;
                    vm.selectedIdLeft('');
                    vm.selectedIdRight('');
                    if (indexLeft >= dataLengthLeft) {
                        indexLeft = dataLengthLeft - 1;
                    }
                    else if (dataLengthLeft > 0 && indexLeft < 0) {
                        indexLeft = 0;
                    }
                    if (indexLeft >= 0) {
                        var selectedId = $($("#tree-grid-left [data-id]")[indexLeft]).attr('data-id');
                        vm.selectedIdLeft(selectedId);
                    }
                    if (indexRight >= dataLengthRight) {
                        indexRight = dataLengthLeft - 1;
                    }
                    else if (dataLengthRight > 0 && indexRight < 0) {
                        indexRight = 0;
                    }
                    if (indexRight >= 0) {
                        var selectedId = $($("#tree-grid-right [data-id]")[indexRight]).attr('data-id');
                        vm.selectedIdRight(selectedId);
                    }
                };
                ScreenModel.prototype.onClickTransfer = function () {
                    var _this = this;
                    var vm = this;
                    vm
                        .$blockui('grayout')
                        .then(function () { return vm.createTransferList(); })
                        .always(function () { return _this.$blockui('clear'); });
                };
                /**
                 * 「異動登録ボタン」を押下する
                 */
                ScreenModel.prototype.onClickRegister = function () {
                    var vm = this;
                    if (vm.isEmptySelectedSource()) {
                        return;
                    }
                    // UI処理[18]
                    _.map(vm.tableDatasSource(), function (i) { return i.cssWKP = ''; });
                    vm.tableDatasSource.valueHasMutated();
                    var selectedSidsource = [];
                    var param = _.map(vm.currentCodeListSource(), function (sid) {
                        selectedSidsource.push(sid);
                        return {
                            employeeId: sid,
                            workplaceId: vm.selectedIdRight(),
                            startDate: moment.utc(new Date(vm.transferDate())).toISOString(),
                            endDate: moment.utc(new Date(MAX_DATE)).toISOString()
                        };
                    });
                    vm.$blockui('grayout');
                    vm
                        .$ajax('com', API.addAWH, param)
                        .then(function (res) {
                        // If has erros
                        var ifErrors = function () {
                            var errorList = _.map(res, function (i) { return i.errorLst[0]; });
                            vm.$dialog
                                .error({ messageId: 'Msg_102' })
                                .then(function () { return ifNotErrors(); });
                            vm.changeColorWhenError(errorList);
                        };
                        // If not has errors
                        var ifNotErrors = function () {
                            if (res.length >= vm.currentCodeListSource().length)
                                return;
                            vm
                                .loadDataWkp(Table.RIGHT)
                                .then(function () {
                                // UI処理[6]
                                vm.currentCodeListDest('');
                                // 当日の異動を取得する
                                return vm.getTransferOfDay(new Date(vm.transferDate()));
                            })
                                .then(function () { return vm.createTransferList(); })
                                .then(function () {
                                //UI処理[16]
                                vm.currentCodeListSource.removeAll();
                                // UI処理[15]
                                vm.$dialog
                                    .info({ messageId: 'Msg_15' })
                                    .then(function () { return vm.transOnApproved(selectedSidsource); });
                            });
                        };
                        if (_.isEmpty(res)) {
                            ifNotErrors();
                        }
                        else {
                            ifErrors();
                        }
                    })
                        .fail(function (err) { return vm.$dialog.error({ messageId: err.messageId }); });
                    vm.$blockui('clear');
                };
                /**
                 * 職場の所属社員一覧を取得する
                 * @param table LEFT OR RIGHT
                 */
                ScreenModel.prototype.loadDataWkp = function (table) {
                    var vm = this, dfd = $.Deferred();
                    var paramLeft = {
                        wkpIds: [vm.selectedIdLeft()],
                        referDate: moment.utc(vm.baseDateLeft()),
                        incumbent: vm.incumbentLeft(),
                        closed: vm.closedLeft(),
                        leave: vm.leaveLeft(),
                        retiree: vm.retireeLeft()
                    };
                    var paramRight = {
                        wkpIds: [vm.selectedIdRight()],
                        referDate: moment.utc(vm.baseDateRight()),
                        incumbent: vm.incumbentRight(),
                        closed: vm.closedRight(),
                        leave: vm.leaveRight(),
                        retiree: vm.retireeRight()
                    };
                    var isLeft = table === Table.LEFT;
                    var param = isLeft ? paramLeft : paramRight;
                    vm
                        .$ajax('com', API.getEmpInWkp, param)
                        .then(function (res) {
                        var tableDatas = _
                            .map(res, function (item) { return new DataTable(item, isLeft ? '' : vm.$i18n('CMM015_35')); })
                            .sort(function (first, second) {
                            var firstOrder = first.od;
                            var secondOrder = second.od;
                            if (_.isNil(firstOrder)) {
                                // if order is null, set data to the end of list
                                firstOrder = Number.MAX_VALUE;
                            }
                            if (_.isNil(secondOrder)) {
                                // if order is null, set data to the end of list
                                secondOrder = Number.MAX_VALUE;
                            }
                            return firstOrder - secondOrder || first.code.localeCompare(second.code);
                        });
                        if (isLeft) {
                            vm.currentCodeListSource.removeAll();
                            vm.tableDatasSource(tableDatas);
                            vm.tableDatasSource.valueHasMutated();
                        }
                        else {
                            vm.currentCodeListDest('');
                            vm.tableDatasDest(tableDatas);
                            vm.tableDatasDest.valueHasMutated();
                        }
                        dfd.resolve();
                    })
                        .fail(function (err) {
                        vm.$dialog.error(err);
                        dfd.reject();
                    });
                    return dfd.promise();
                };
                ScreenModel.prototype.showMessageApprove = function () {
                    var vm = this;
                    //List<承認ルート状況>
                    var approvalRoutes = vm.transfereeOnApproved().approvalRoutes;
                    //List<社員情報>
                    var empInfors = vm.transfereeOnApproved().empInfors;
                    //List<職場情報一覧>
                    var wkpListInfo = vm.transfereeOnApproved().wkpListInfo;
                    var msg2110 = '';
                    var msg2111 = '';
                    var msg2112 = '';
                    _.map(approvalRoutes, function (i) {
                        var employeeName = _.find(empInfors, function (ii) { return ii.employeeId === i.sid; }).businessName;
                        //承認職場リスト
                        if (!_.isEmpty(i.workplaceList)) {
                            var aprWkpName = _
                                .map(i.workplaceList, function (ii) { return _.find(wkpListInfo, function (iii) { return ii === iii.workplaceId; }).workplaceName; })
                                .join(COMMA);
                            msg2110 += "".concat(vm.$i18n.message('Msg_2110', [employeeName, aprWkpName]), "<br/>");
                        }
                        //承認対象社員リスト
                        if (!_.isEmpty(i.approveEmpList)) {
                            var aprEmpName = _.
                                map(i.approveEmpList, function (ii) { return _.find(empInfors, function (iii) { return ii === iii.employeeId; }).businessName; })
                                .join(COMMA);
                            msg2111 += "".concat(vm.$i18n.message('Msg_2111', [employeeName, aprEmpName]), "<br/>");
                        }
                        //指定者の承認者リスト
                        if (!_.isEmpty(i.approverList)) {
                            var aprListName = _
                                .map(i.approverList, function (ii) { return _.find(empInfors, function (iii) { return ii === iii.employeeId; }).businessName; })
                                .join(COMMA);
                            msg2112 += "".concat(vm.$i18n.message('Msg_2112', [employeeName, aprListName]), "<br/>");
                        }
                    });
                    var msg = "".concat(msg2110).concat(msg2111).concat(msg2112);
                    if (!_.isEmpty(msg)) {
                        vm.$dialog.info(msg);
                    }
                };
                ScreenModel.prototype.isEmptySelectedSource = function () {
                    var vm = this;
                    if (_.isEmpty(vm.currentCodeListSource())) {
                        vm.$dialog.error({ messageId: 'Msg_2107' });
                        return true;
                    }
                    return false;
                };
                ScreenModel.prototype.changeColorWhenError = function (errorList) {
                    var vm = this;
                    _.map(vm.tableDatasSource(), function (j) {
                        if (_.includes(errorList, j.id)) {
                            j.cssWKP = "".concat(ERRORSCODE, " !important");
                        }
                    });
                    vm.tableDatasSource.valueHasMutated();
                };
                ScreenModel.prototype.isDuplicateId = function (jtID, newID) {
                    var vm = this;
                    if (jtID === newID) {
                        vm.$dialog.error({ messageId: 'Msg_2120' });
                        return true;
                    }
                    return false;
                };
                //当日の異動を取得する
                ScreenModel.prototype.getTransferOfDay = function (date) {
                    var vm = this, dfd = $.Deferred();
                    if (_.isEmpty(vm.tableDatasDest())) {
                        dfd.resolve();
                        return dfd.promise();
                    }
                    var dataTableDest = ko.unwrap(vm.tableDatasDest);
                    var sids = _.map(dataTableDest, function (e) { return e.id; });
                    var baseDate = moment.utc(moment(date).format('YYYY-MM-DD')).toISOString();
                    vm
                        .$ajax('com', API.getTransferOfDay, { sids: sids, baseDate: baseDate })
                        .then(function (_a) {
                        var wkpEmployees = _a.wkpEmployees, jtEmployees = _a.jtEmployees;
                        var data = _.map(vm.tableDatasDest(), function (i) {
                            if (_.includes(wkpEmployees, i.id)) {
                                i.cssWKP = "".concat(ERRORSCODE, " !important");
                            }
                            if (_.includes(jtEmployees, i.id)) {
                                i.cssJT = "".concat(ERRORSCODE, " !important");
                            }
                            return i;
                        });
                        vm.tableDatasDest(data);
                        dfd.resolve();
                    })
                        .fail(function (err) {
                        vm.$dialog.error(err);
                        dfd.reject();
                    });
                    return dfd.promise();
                };
                //異動一覧を作成する
                ScreenModel.prototype.createTransferList = function () {
                    var vm = this, dfd = $.Deferred();
                    var startDate = moment.utc(new Date(vm.dateValue().startDate)).toISOString();
                    var endDate = moment.utc(new Date(vm.dateValue().endDate)).toISOString();
                    vm
                        .$ajax('com', API.createTransferList, { startDate: startDate, endDate: endDate })
                        .then(function (_a) {
                        var awhItems = _a.awhItems, ajthItems = _a.ajthItems, empInfors = _a.empInfors, wkpListInfo = _a.wkpListInfo, jtInfor = _a.jtInfor;
                        // 職場履歴リスト
                        vm.awhItems = awhItems;
                        // 職位履歴リスト
                        vm.ajthItems = ajthItems;
                        // List<社員一覧情報>
                        vm.empInfors = empInfors;
                        // List<職場一覧情報>
                        vm.wkpListInfo = wkpListInfo;
                        // List<職位一覧情報>
                        vm.jtInfor = jtInfor;
                        vm.uiProcess25();
                        dfd.resolve();
                    })
                        .fail(function (err) {
                        vm.tableDatasHistory.removeAll();
                        vm.$dialog.error(err);
                        dfd.reject();
                        vm.$blockui('clear');
                    });
                    return dfd.promise();
                };
                //異動者が承認ルートにいるか確認する
                ScreenModel.prototype.transOnApproved = function (sids) {
                    var vm = this, dfd = $.Deferred();
                    var baseDate = moment.utc(new Date(vm.transferDate())).toISOString();
                    vm
                        .$ajax('com', API.transOnApproved, { sids: sids, baseDate: baseDate })
                        .then(function (res) {
                        vm.transfereeOnApproved(res);
                        vm.showMessageApprove();
                        dfd.resolve();
                    })
                        .fail(function (err) {
                        vm.$dialog.error({ messageId: err.messageId });
                        dfd.reject();
                    });
                    return dfd.promise();
                };
                ScreenModel.prototype.uiProcess25 = function () {
                    var vm = this;
                    var condition = function (date) {
                        var startDate = moment.utc(new Date(vm.dateValue().startDate));
                        var endDate = moment.utc(new Date(vm.dateValue().endDate));
                        return moment.utc(new Date(date)).isSameOrAfter(startDate)
                            && moment.utc(new Date(date)).isSameOrBefore(endDate);
                    };
                    var compare = function (firstDate, secondDate) {
                        return moment(new Date(firstDate)).isSameOrAfter(moment(new Date(secondDate))) ? 1 : -1;
                    };
                    vm.awhItems.sort(function (first, second) { return compare(first.startDate, second.startDate); });
                    vm.ajthItems.sort(function (first, second) { return compare(first.startDate, second.startDate); });
                    // Remove start date outside display period
                    var awhItems = _.filter(vm.awhItems, function (i) { return condition(i.startDate); })
                        .map(function (i) {
                        i.wkpHID = i.historyId;
                        i.historyId = '';
                        return i;
                    });
                    var ajthItems = _.filter(vm.ajthItems, function (i) { return condition(i.startDate); })
                        .map(function (i) {
                        i.jtHID = i.historyId;
                        i.historyId = '';
                        return i;
                    });
                    // summarize in 1 table
                    var arr = __spreadArray(__spreadArray([], awhItems, true), ajthItems, true);
                    // Sort by date
                    arr.sort(function (first, second) { return compare(first.startDate, second.startDate); });
                    // Summarize the same employees and the same start date
                    var summarizeArr = [];
                    _.forEach(arr, function (i, index) {
                        var item = i;
                        var summarize = _.find(arr, function (j, jindex) {
                            return i.employeeId === j.employeeId && index !== jindex &&
                                moment.utc(new Date(i.startDate)).isSame(moment.utc(new Date(j.startDate)));
                        });
                        if (summarize) {
                            if (moment(new Date(item.endDate)).isBefore(moment(new Date(summarize.endDate)))) {
                                summarize.endDate = item.endDate;
                            }
                            else {
                                item.endDate = summarize.endDate;
                            }
                            item = $.extend(item, summarize);
                        }
                        summarizeArr.push(item);
                    });
                    // Remove duplicate item
                    summarizeArr = _.uniqBy(summarizeArr, function (i) { return "".concat(i.employeeId, " ").concat(i.startDate); });
                    var displayData = _.map(summarizeArr, function (i) {
                        var post = i;
                        var compareDate = moment.utc(new Date(i.startDate)).subtract(1, 'd');
                        // Find previous item
                        var prevAWH = _.findLast(vm.awhItems, function (j) {
                            return moment.utc(new Date(j.startDate)).isSameOrBefore(compareDate)
                                && j.employeeId === i.employeeId;
                        });
                        var prevJTH = _.findLast(vm.ajthItems, function (j) {
                            return moment.utc(new Date(j.startDate)).isSameOrBefore(compareDate)
                                && j.employeeId === i.employeeId;
                        });
                        return new DataTableHistory(prevAWH, prevJTH, post, vm.empInfors, vm.wkpListInfo, vm.jtInfor);
                    });
                    displayData.sort(function (first, second) {
                        return moment(new Date(first.startDate)).diff(moment(new Date(second.startDate)))
                            || first.postPositionOrder - second.postPositionOrder
                            || first.sCD.localeCompare(second.sCD);
                    });
                    vm.tableDatasHistory(displayData);
                };
                ScreenModel.prototype.cancelExecuteTransfer = function () {
                    var vm = this;
                    vm.$blockui('grayout');
                    // Clear red color in table history
                    _.map(vm.tableDatasHistory(), function (i) { return i.css = ''; });
                    vm.tableDatasHistory.valueHasMutated();
                    if (_.isEmpty(vm.currentCodeListHistory())) {
                        vm.$dialog.error({ messageId: 'Msg_2115' });
                        vm.$blockui('clear');
                        return;
                    }
                    var affWorkplaces = [];
                    var affJobTitles = [];
                    var errList = [];
                    _.forEach(vm.currentCodeListHistory(), function (i) {
                        var selectedData = _.find(vm.tableDatasHistory(), function (item) { return item.key === i; });
                        if (!selectedData) {
                            return;
                        }
                        if (selectedData.endDate !== MAX_DATE) {
                            errList.push(selectedData.key);
                            return;
                        }
                        if (selectedData.wkpHID) {
                            affWorkplaces.push(new DeleteAffWorkplaceHistoryCommand({
                                employeeId: selectedData.sID,
                                historyId: selectedData.wkpHID
                            }));
                        }
                        if (selectedData.postPositionHID) {
                            affJobTitles.push(new DeleteAffJobTitleMainCommand({
                                employeeId: selectedData.sID,
                                histId: selectedData.postPositionHID
                            }));
                        }
                    });
                    var errFnc = function (callback) {
                        if (!_.isEmpty(errList)) {
                            vm.$dialog
                                .error({ messageId: 'Msg_2203' })
                                .then(function () {
                                _.map(vm.tableDatasHistory(), function (i) {
                                    if (_.includes(errList, i.key)) {
                                        i.css = "".concat(ERRORSCODE, " !important");
                                    }
                                });
                                if (callback) {
                                    callback();
                                }
                                vm.tableDatasHistory.valueHasMutated();
                            });
                        }
                        else if (callback) {
                            callback();
                            vm.tableDatasHistory.valueHasMutated();
                        }
                    };
                    if (errList.length === vm.currentCodeListHistory().length) {
                        errFnc();
                        vm.$blockui('clear');
                        return;
                    }
                    var param = { affWorkplaces: affWorkplaces, affJobTitles: affJobTitles };
                    var affWorkplaceErr = [];
                    var affJobTitleErr = [];
                    vm
                        .$ajax('com', API.cancelExecuteTransfer, param)
                        .then(function (res) {
                        affWorkplaceErr = res.affWorkplaceErr;
                        affJobTitleErr = res.affJobTitleErr;
                        vm.createTransferList();
                        vm.loadDataWkp(Table.LEFT);
                        return vm.loadDataWkp(Table.RIGHT);
                    })
                        .then(function () { return vm.getTransferOfDay(vm.baseDateRight()); })
                        .then(function () {
                        // Merge 2 list error
                        var mergeErr = __spreadArray(__spreadArray([], affWorkplaceErr, true), affJobTitleErr, true);
                        // Get list error id
                        var errIds = _.map(mergeErr, function (i) { return i.errorLst[0]; });
                        var mergeErrMsg = _.uniq(_.map(mergeErr, function (i) { return "".concat(vm.$i18n.message(i.messageId), "<br/>"); }));
                        var success = function () {
                            _.map(vm.tableDatasHistory(), function (i) {
                                // If id data equals error id => change color to red
                                if (_.includes(errIds, "".concat(i.sID, " ").concat(i.wkpHID)) || _.includes(errIds, "".concat(i.sID, " ").concat(i.postPositionHID))) {
                                    i.css = "".concat(ERRORSCODE, " !important");
                                }
                            });
                            if (mergeErr.length === affWorkplaces.length + affJobTitles.length) {
                                vm.tableDatasHistory.valueHasMutated();
                                vm.$blockui('clear');
                                return;
                            }
                            vm.$dialog.info({ messageId: 'Msg_16' });
                        };
                        if (!_.isEmpty(mergeErr)) {
                            errFnc(function () { return vm.$dialog
                                .error(mergeErrMsg.join(''))
                                .then(function () { return success(); }); });
                        }
                        else {
                            errFnc(function () { return success(); });
                        }
                    });
                    vm.$blockui('clear');
                };
                ScreenModel = __decorate([
                    bean()
                ], ScreenModel);
                return ScreenModel;
            }(ko.ViewModel));
            viewmodel.ScreenModel = ScreenModel;
            var Table;
            (function (Table) {
                Table[Table["LEFT"] = 0] = "LEFT";
                Table[Table["RIGHT"] = 1] = "RIGHT";
            })(Table || (Table = {}));
            var DeleteAffWorkplaceHistoryCommand = /** @class */ (function () {
                function DeleteAffWorkplaceHistoryCommand(init) {
                    this.employeeId = '';
                    this.historyId = '';
                    $.extend(this, init);
                }
                return DeleteAffWorkplaceHistoryCommand;
            }());
            var DeleteAffJobTitleMainCommand = /** @class */ (function () {
                function DeleteAffJobTitleMainCommand(init) {
                    this.histId = '';
                    this.employeeId = '';
                    $.extend(this, init);
                }
                return DeleteAffJobTitleMainCommand;
            }());
            var DataTable = /** @class */ (function () {
                function DataTable(data, jtc) {
                    var vm = this;
                    vm.id = data.employeeID;
                    vm.code = data.employeeCD;
                    vm.name = data.employeeName;
                    vm.jt = data.jobtitle;
                    vm.jtID = data.jobtitleID;
                    vm.od = data.order;
                    vm.jtc = jtc;
                }
                return DataTable;
            }());
            var DataTableHistory = /** @class */ (function () {
                function DataTableHistory(prevAWH, prevAJH, post, empInfors, wkpListInfo, jtInfor) {
                    this.key = '';
                    this.dayBefore = ''; //前日
                    this.startDate = ''; //開始日
                    this.endDate = ''; //終了日
                    this.sID = ''; //社員ID
                    this.sCD = ''; //社員CD
                    this.sName = ''; //社員名称
                    this.prevWkpID = ''; //前職場ID
                    this.prevWkpName = ''; //前職場名称
                    this.prevWkpHID = ''; //前職場履歴ID
                    this.postWkpID = ''; //後職場ID
                    this.postWkpName = ''; //後職場名称
                    this.wkpHID = ''; //後職場履歴ID
                    this.prevPositionID = ''; //前職位ID
                    this.prevPositionName = ''; //前職位名称
                    this.prevPositionOrder = 999; //前職位並び順
                    this.prevPositionHID = ''; //前職位履歴ID
                    this.positionId = ''; //後職位ID
                    this.postPositionName = ''; //後職位名称
                    this.postPositionOrder = 999; //後職位並び順
                    this.postPositionHID = ''; //後職位履歴ID
                    this.bgPostWkp = '';
                    this.css = '';
                    var self = this;
                    self.endDate = MAX_DATE;
                    if (prevAWH) {
                        self.prevWkpID = prevAWH.workplaceId;
                        self.prevWkpName = _.isNil(prevAWH.workplaceId) || _.isEmpty(prevAWH.workplaceId)
                            ? ''
                            : _.find(wkpListInfo, function (i) { return i.workplaceId === prevAWH.workplaceId; }).workplaceName;
                        self.prevWkpHID = prevAWH.wkpHID;
                    }
                    if (prevAJH) {
                        self.prevPositionID = prevAJH.jobTitleId;
                        var prevPosition = _.find(jtInfor, function (i) { return i.jobTitleId === prevAJH.jobTitleId; });
                        self.prevPositionName = prevPosition.jobTitleName;
                        self.prevPositionOrder = prevPosition.order;
                        self.prevPositionHID = prevAJH.jtHID;
                    }
                    if (post) {
                        self.dayBefore = moment.utc(new Date(post.startDate)).subtract(1, 'd').toString();
                        self.startDate = post.startDate;
                        self.sID = post.employeeId;
                        var _a = _.find(empInfors, function (i) { return i.employeeId === post.employeeId; }), employeeCode = _a.employeeCode, businessName = _a.businessName;
                        self.sCD = employeeCode;
                        self.sName = businessName;
                        self.postWkpID = post.workplaceId;
                        if (_.isNil(post.workplaceId) || _.isEmpty(post.workplaceId)) {
                            self.postWkpName = getText('CMM015_52');
                            self.bgPostWkp = '#FFFFCC';
                        }
                        else {
                            self.postWkpName = _.find(wkpListInfo, function (i) { return i.workplaceId === post.workplaceId; }).workplaceName;
                        }
                        self.wkpHID = post.wkpHID;
                        self.positionId = post.jobTitleId;
                        var postPosition = _.find(jtInfor, function (i) { return i.jobTitleId === post.jobTitleId; });
                        if (postPosition) {
                            self.postPositionName = postPosition.jobTitleName;
                            self.postPositionOrder = postPosition.order;
                        }
                        if (_.isEmpty(self.postPositionName) && _.isEmpty(self.postPositionOrder)) {
                            self.postPositionName = self.prevPositionName;
                            self.postPositionOrder = self.prevPositionOrder;
                        }
                        self.postPositionHID = post.jtHID;
                        self.endDate = post.endDate;
                    }
                    self.key = "".concat(self.sID, " ").concat(self.startDate);
                }
                return DataTableHistory;
            }());
            var HistoryItem = /** @class */ (function () {
                function HistoryItem(init) {
                    $.extend(this, init);
                }
                return HistoryItem;
            }());
        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
    })(a = cmm015.a || (cmm015.a = {}));
})(cmm015 || (cmm015 = {}));
//# sourceMappingURL=cmm015.a.vm.js.map