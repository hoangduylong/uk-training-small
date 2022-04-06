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
/// <reference path='../../../../lib/nittsu/viewcontext.d.ts' />
var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var ccg003;
                (function (ccg003) {
                    var c;
                    (function (c) {
                        var setShared = nts.uk.ui.windows.setShared;
                        var getShared = nts.uk.ui.windows.getShared;
                        var modal = nts.uk.ui.windows.sub.modal;
                        var API = {
                            // <<ScreenQuery>> 社員が作成するお知らせ登録の画面を表示する
                            notificationCreatedByEmp: 'sys/portal/notice/notificationCreatedByEmp',
                            // <<ScreenQuery>> お知らせ宛先の職場の名称を取得する
                            getNameOfDestinationWkp: 'sys/portal/notice/getNameOfDestinationWkp',
                            // <<ScreenQuery>> お知らせ宛先の社員の名称を取得する
                            acquireNameOfDestinationEmployee: 'sys/portal/notice/acquireNameOfDestinationEmployee',
                            // <<Command>> お知らせを登録する
                            registerMessageNotice: 'sys/portal/notice/registerMessageNotice',
                            // <<Command>> お知らせを削除する
                            deleteMessageNotice: 'sys/portal/notice/deleteMessageNotice',
                            // <<Command>> お知らせを更新する
                            updateMessageNotice: 'sys/portal/notice/updateMessageNotice'
                        };
                        var COMMA = '、';
                        var ViewModel = /** @class */ (function (_super) {
                            __extends(ViewModel, _super);
                            function ViewModel() {
                                var _this = _super !== null && _super.apply(this, arguments) || this;
                                _this.messageText = ko.observable('');
                                _this.destination = ko.observable(1);
                                _this.dateValue = ko.observable(new DatePeriod({
                                    startDate: '',
                                    endDate: ''
                                }));
                                _this.updateDate = ko.observable('');
                                _this.isNewMode = ko.observable(false);
                                _this.isActiveDelete = ko.computed(function () { return !_this.isNewMode(); });
                                _this.assignAtr = ko.observable(0);
                                _this.employeeReferenceRange = ko.observable(0);
                                // ※C6
                                _this.isVisibleDestination = ko.computed(function () {
                                    return _this.isNewMode()
                                        || moment.utc(moment.utc(_this.dateValue().startDate, 'YYYY/MM/DD').format('YYYY/MM/DD'))
                                            .isAfter(moment.utc(moment.utc().format('YYYY/MM/DD')));
                                });
                                // ※C1
                                _this.isVisibleAllEmployees = ko.computed(function () { return _this.assignAtr() === 0; });
                                // ※C2
                                _this.isActiveWorkplaceBtn = ko.computed(function () { return _this.isVisibleDestination() && _this.destination() === DestinationClassification.WORKPLACE; });
                                // ※C3
                                _this.isActiveEmployeeBtn = ko.computed(function () { return _this.isVisibleDestination() && _this.destination() === DestinationClassification.DEPARTMENT; });
                                // ※C4, !※C5
                                _this.isVisibleWorkplaceList = ko.computed(function () { return _this.employeeReferenceRange() !== EmployeeReferenceRange.DEPARTMENT_ONLY; });
                                _this.parentParam = new ParentParam();
                                _this.isStartUpdateMode = false;
                                _this.workPlaceIdList = ko.observableArray([]);
                                _this.workPlaceName = ko.observableArray([]);
                                _this.notificationCreated = ko.observable(null);
                                _this.workPlaceText = ko.computed(function () {
                                    return _this.workPlaceName().join(COMMA);
                                });
                                _this.workPlaceTxtRefer = ko.observable('');
                                _this.employeeInfoId = ko.observableArray([]);
                                _this.employeeName = ko.observableArray([]);
                                _this.employeeText = ko.computed(function () {
                                    return _this.employeeName().join(COMMA);
                                });
                                _this.startDateOfMsgUpdate = '';
                                return _this;
                            }
                            ViewModel.prototype.created = function (parentParam) {
                                var vm = this;
                                vm.parentParam = parentParam;
                                vm.isNewMode(vm.parentParam.isNewMode);
                                vm.isStartUpdateMode = !vm.parentParam.isNewMode;
                                vm.employeeReferenceRange(parentParam.role.employeeReferenceRange);
                                vm.assignAtr(parentParam.role.assignAtr);
                                if (vm.isVisibleAllEmployees()) {
                                    vm.itemList = ko.observableArray([
                                        new BoxModel(0, vm.$i18n('CCG003_22')),
                                        new BoxModel(1, vm.$i18n('CCG003_23')),
                                        new BoxModel(2, vm.$i18n('CCG003_24'))
                                    ]);
                                }
                                else {
                                    vm.itemList = ko.observableArray([
                                        new BoxModel(1, vm.$i18n('CCG003_23')),
                                        new BoxModel(2, vm.$i18n('CCG003_24'))
                                    ]);
                                }
                                vm.onStartScreen();
                            };
                            ViewModel.prototype.mounted = function () {
                                var _this = this;
                                var vm = this;
                                $('#C1_2').focus();
                                vm.destination.subscribe(function () {
                                    if (vm.employeeReferenceRange() === EmployeeReferenceRange.DEPARTMENT_ONLY) {
                                        if (!_.isNull(vm.notificationCreated().workplaceInfo)) {
                                            var workplaceInfo = _this.notificationCreated().workplaceInfo;
                                            vm.workPlaceIdList([workplaceInfo.workplaceId]);
                                            vm.workPlaceTxtRefer("".concat(workplaceInfo.workplaceCode, " ").concat(workplaceInfo.workplaceName));
                                        }
                                    }
                                });
                            };
                            /**
                             * 起動する
                             */
                            ViewModel.prototype.onStartScreen = function () {
                                var vm = this;
                                var param = vm.parentParam.messageNotice;
                                var msg = vm.isNewMode()
                                    ? null
                                    : new MessageNotice({
                                        creatorID: param.creatorID,
                                        employeeIdSeen: param.employeeIdSeen,
                                        endDate: moment.utc(param.endDate).toISOString(),
                                        startDate: moment.utc(param.startDate).toISOString(),
                                        inputDate: param.inputDate,
                                        modifiedDate: param.modifiedDate,
                                        notificationMessage: param.notificationMessage,
                                        targetInformation: param.targetInformation
                                    });
                                if (!vm.isNewMode() && msg !== null) {
                                    // C1_2
                                    vm.messageText(msg.notificationMessage);
                                    // C2_2
                                    vm.destination(msg.targetInformation.destination);
                                    // C3_2
                                    var period = new DatePeriod({
                                        startDate: msg.startDate,
                                        endDate: msg.endDate
                                    });
                                    vm.dateValue(period);
                                    // C4
                                    var updateDate = moment.utc(msg.modifiedDate).format('YYYY/M/D HH:mm');
                                    vm.updateDate(vm.$i18n('CCG003_27', [updateDate]));
                                    vm.startDateOfMsgUpdate = msg.startDate;
                                }
                                if (vm.isNewMode()) {
                                    vm.updateDate(vm.$i18n('CCG003_27', ['']));
                                }
                                var params = new NotificationParams({
                                    refeRange: vm.employeeReferenceRange(),
                                    msg: msg
                                });
                                vm.$blockui('show');
                                this.$ajax('com', API.notificationCreatedByEmp, params)
                                    .then(function (response) {
                                    if (!response) {
                                        return;
                                    }
                                    vm.noticeCreated(response);
                                })
                                    .fail(function (error) { return vm.$dialog.error(error); })
                                    .always(function () { return vm.$blockui('hide'); });
                            };
                            ViewModel.prototype.noticeCreated = function (data) {
                                var vm = this;
                                vm.notificationCreated(data);
                                if (this.employeeReferenceRange() === EmployeeReferenceRange.DEPARTMENT_ONLY) {
                                    // ※新規モード又は更新モード(宛先区分≠職場選択)
                                    if (!_.isNull(data.workplaceInfo) && this.destination() !== DestinationClassification.WORKPLACE) {
                                        vm.workPlaceIdList([data.workplaceInfo.workplaceId]);
                                        vm.workPlaceName([data.workplaceInfo.workplaceName]);
                                    }
                                }
                                if (vm.isStartUpdateMode) {
                                    vm.isStartUpdateMode = false;
                                    var wkpList = vm.notificationCreated().targetWkps;
                                    vm.workPlaceTxtRefer(_.map(wkpList, function (wkp) { return wkp.workplaceName; }).join(COMMA));
                                    vm.workPlaceIdList(_.map(wkpList, function (wkp) { return wkp.workplaceId; }));
                                }
                                if (_.isEmpty(vm.workPlaceTxtRefer()) && !_.isNil(this.notificationCreated().workplaceInfo)) {
                                    var workplaceInfo = this.notificationCreated().workplaceInfo;
                                    vm.workPlaceIdList([workplaceInfo.workplaceId]);
                                    vm.workPlaceTxtRefer("".concat(workplaceInfo.workplaceCode, " ").concat(workplaceInfo.workplaceName));
                                }
                                // ※　ロール.参照範囲＝全社員　OR　部門・職場(配下含む）の場合
                                if (vm.employeeReferenceRange() === EmployeeReferenceRange.ALL_EMPLOYEE || vm.employeeReferenceRange() === EmployeeReferenceRange.DEPARTMENT_AND_CHILD) {
                                    var targetWkps = data.targetWkps;
                                    var workPlaceIdList = _.map(targetWkps, function (wkp) { return wkp.workplaceId; });
                                    var workPlaceName = _.map(targetWkps, function (wkp) { return wkp.workplaceName; });
                                    vm.workPlaceIdList(workPlaceIdList);
                                    vm.workPlaceName(workPlaceName);
                                }
                                var targetEmps = data.targetEmps;
                                var employeeInfoId = _.map(targetEmps, function (emp) { return emp.sid; });
                                var employeeName = _.map(targetEmps, function (emp) { return emp.bussinessName; });
                                vm.employeeName(employeeName);
                                vm.employeeInfoId(employeeInfoId);
                            };
                            /**
                             * C2_3_2：職場選択クリック時
                             */
                            ViewModel.prototype.openCDL008Dialog = function () {
                                var vm = this;
                                var inputCDL008 = {
                                    startMode: StartMode.WORKPLACE,
                                    isMultiple: true,
                                    showNoSelection: false,
                                    selectedCodes: vm.workPlaceIdList(),
                                    isShowBaseDate: true,
                                    baseDate: moment.utc().toISOString(),
                                    selectedSystemType: SystemType.EMPLOYMENT,
                                    isrestrictionOfReferenceRange: true
                                };
                                setShared('inputCDL008', inputCDL008);
                                modal('/view/cdl/008/a/index.xhtml').onClosed(function () {
                                    var isCancel = getShared('CDL008Cancel');
                                    if (isCancel) {
                                        return;
                                    }
                                    vm.workPlaceIdList(getShared('outputCDL008'));
                                    vm.$ajax('com', API.getNameOfDestinationWkp, vm.workPlaceIdList()).then(function (response) {
                                        if (response) {
                                            var workPlaceIdList = _.map(response, function (x) { return x.workplaceId; });
                                            var workPlaceName = _.map(response, function (x) { return x.workplaceName; });
                                            vm.workPlaceIdList(workPlaceIdList);
                                            vm.workPlaceName(workPlaceName);
                                        }
                                    });
                                });
                            };
                            /**
                             * C2_3_3：社員選択クリック時
                             */
                            ViewModel.prototype.openCDL009Dialog = function () {
                                var vm = this;
                                var cdl009Params = {
                                    isMultiple: true,
                                    baseDate: moment.utc().toISOString(),
                                    target: DestinationClassification.WORKPLACE
                                };
                                setShared('CDL009Params', cdl009Params);
                                modal("/view/cdl/009/a/index.xhtml").onClosed(function () {
                                    var isCancel = getShared('CDL009Cancel');
                                    if (isCancel) {
                                        return;
                                    }
                                    vm.employeeInfoId(getShared('CDL009Output'));
                                    vm.$blockui('show');
                                    vm.$ajax('com', API.acquireNameOfDestinationEmployee, vm.employeeInfoId())
                                        .then(function (response) {
                                        if (response) {
                                            var employeeInfoId = _.map(response, function (x) { return x.sid; });
                                            var employeeName = _.map(response, function (x) { return x.bussinessName; });
                                            vm.employeeInfoId(employeeInfoId);
                                            vm.employeeName(employeeName);
                                        }
                                    })
                                        .always(function () { return vm.$blockui('hide'); });
                                });
                            };
                            /**
                             * C20_1：登録をクリックする
                             */
                            ViewModel.prototype.onClickRegister = function () {
                                var vm = this;
                                var error = vm.checkBeforeRegister();
                                if (!_.isEmpty(error)) {
                                    vm.$dialog.error({ messageId: error });
                                    return;
                                }
                                vm.$validate().then(function (valid) {
                                    if (valid) {
                                        if (vm.isNewMode()) {
                                            vm.registerOnNewMode();
                                        }
                                        else {
                                            vm.registerOnUpdateMode();
                                        }
                                    }
                                });
                            };
                            /**
                             * 登録前のチェックについて
                             */
                            ViewModel.prototype.checkBeforeRegister = function () {
                                var vm = this;
                                if (vm.destination() === DestinationClassification.WORKPLACE && _.isEmpty(vm.workPlaceIdList())) {
                                    return 'Msg_1813';
                                }
                                if (vm.destination() === DestinationClassification.DEPARTMENT && _.isEmpty(vm.employeeInfoId())) {
                                    return 'Msg_1814';
                                }
                                if (moment.utc(vm.dateValue().startDate).isBefore(moment.utc().format('YYYY/MM/DD'))) {
                                    if (vm.isNewMode()) {
                                        return 'Msg_1834';
                                    }
                                    else if (!moment.utc(vm.startDateOfMsgUpdate, 'YYYY/MM/DD').isSame(moment.utc(vm.dateValue().startDate, 'YYYY/MM/DD'))) {
                                        return 'Msg_1834';
                                    }
                                }
                            };
                            /**
                             * ※新規モードの場合
                             */
                            ViewModel.prototype.registerOnNewMode = function () {
                                var _this = this;
                                var vm = this;
                                var message = new MessageNotice({
                                    creatorID: __viewContext.user.employeeId,
                                    inputDate: moment.utc().toISOString(),
                                    modifiedDate: moment.utc().toISOString(),
                                    notificationMessage: vm.messageText(),
                                    targetInformation: new TargetInformation({
                                        destination: vm.destination(),
                                        targetWpids: this.destination() === DestinationClassification.WORKPLACE ? vm.workPlaceIdList() : [],
                                        targetSIDs: this.destination() === DestinationClassification.DEPARTMENT ? vm.employeeInfoId() : []
                                    }),
                                    startDate: moment.utc(vm.dateValue().startDate).toISOString(),
                                    endDate: moment.utc(vm.dateValue().endDate).toISOString(),
                                    employeeIdSeen: null
                                });
                                var command = {
                                    creatorID: __viewContext.user.employeeId,
                                    messageNotice: message
                                };
                                vm.$blockui('show');
                                vm.$ajax('com', API.registerMessageNotice, command)
                                    .then(function () {
                                    vm.$dialog.info({ messageId: 'Msg_15' })
                                        .then(function () { return _this.$window.close({ isClose: false }); });
                                })
                                    .fail(function (error) { return vm.$dialog.error(error); })
                                    .always(function () { return vm.$blockui('hide'); });
                            };
                            /**
                             * ※更新モードの場合
                             */
                            ViewModel.prototype.registerOnUpdateMode = function () {
                                var _this = this;
                                var vm = this;
                                var oldMsg = vm.parentParam.messageNotice;
                                var message = new MessageNotice({
                                    creatorID: oldMsg.creatorID,
                                    inputDate: oldMsg.inputDate,
                                    modifiedDate: moment.utc().toISOString(),
                                    notificationMessage: vm.messageText(),
                                    targetInformation: new TargetInformation({
                                        destination: vm.destination(),
                                        targetWpids: this.destination() === DestinationClassification.WORKPLACE ? vm.workPlaceIdList() : [],
                                        targetSIDs: this.destination() === DestinationClassification.DEPARTMENT ? vm.employeeInfoId() : []
                                    }),
                                    startDate: moment.utc(vm.dateValue().startDate).toISOString(),
                                    endDate: moment.utc(vm.dateValue().endDate).toISOString(),
                                });
                                var command = {
                                    sid: oldMsg.creatorID,
                                    inputDate: oldMsg.inputDate,
                                    messageNotice: message
                                };
                                vm.$blockui('show');
                                vm.$ajax('com', API.updateMessageNotice, command)
                                    .then(function () {
                                    vm.$dialog.info({ messageId: 'Msg_15' })
                                        .then(function () { return _this.$window.close({ isClose: true }); });
                                })
                                    .fail(function (error) { return vm.$dialog.error(error); })
                                    .always(function () { return vm.$blockui('hide'); });
                            };
                            /**
                             * C20_2：削除をクリックする
                             */
                            ViewModel.prototype.onClickDelete = function () {
                                var _this = this;
                                var vm = this;
                                vm.$dialog.confirm({ messageId: 'Msg_18' }).then(function (result) {
                                    if (result !== 'yes') {
                                        return;
                                    }
                                    var messageNotice = vm.parentParam.messageNotice;
                                    var command = {
                                        creatorID: messageNotice.creatorID,
                                        inputDate: messageNotice.inputDate
                                    };
                                    vm.$blockui('show');
                                    vm.$ajax('com', API.deleteMessageNotice, command)
                                        .then(function () {
                                        vm.$dialog.info({ messageId: 'Msg_16' })
                                            .then(function () { return _this.$window.close({ isClose: false }); });
                                    })
                                        .always(function () { return vm.$blockui('hide'); });
                                });
                            };
                            /**
                             * Close dialog
                             */
                            ViewModel.prototype.closeWindow = function () {
                                this.$window.close({ isClose: true });
                            };
                            ViewModel = __decorate([
                                bean()
                            ], ViewModel);
                            return ViewModel;
                        }(ko.ViewModel));
                        c.ViewModel = ViewModel;
                        var DestinationClassification;
                        (function (DestinationClassification) {
                            DestinationClassification[DestinationClassification["ALL"] = 0] = "ALL";
                            DestinationClassification[DestinationClassification["WORKPLACE"] = 1] = "WORKPLACE";
                            DestinationClassification[DestinationClassification["DEPARTMENT"] = 2] = "DEPARTMENT";
                        })(DestinationClassification || (DestinationClassification = {}));
                        var StartMode;
                        (function (StartMode) {
                            StartMode[StartMode["WORKPLACE"] = 0] = "WORKPLACE";
                            StartMode[StartMode["DEPARTMENT"] = 1] = "DEPARTMENT";
                        })(StartMode || (StartMode = {}));
                        var SystemType;
                        (function (SystemType) {
                            SystemType[SystemType["PERSONAL_INFORMATION"] = 1] = "PERSONAL_INFORMATION";
                            SystemType[SystemType["EMPLOYMENT"] = 2] = "EMPLOYMENT";
                            SystemType[SystemType["SALARY"] = 3] = "SALARY";
                            SystemType[SystemType["HUMAN_RESOURCES"] = 4] = "HUMAN_RESOURCES";
                            SystemType[SystemType["ADMINISTRATOR"] = 5] = "ADMINISTRATOR";
                        })(SystemType || (SystemType = {}));
                        var EmployeeReferenceRange;
                        (function (EmployeeReferenceRange) {
                            EmployeeReferenceRange[EmployeeReferenceRange["ALL_EMPLOYEE"] = 0] = "ALL_EMPLOYEE";
                            EmployeeReferenceRange[EmployeeReferenceRange["DEPARTMENT_AND_CHILD"] = 1] = "DEPARTMENT_AND_CHILD";
                            EmployeeReferenceRange[EmployeeReferenceRange["DEPARTMENT_ONLY"] = 2] = "DEPARTMENT_ONLY";
                            EmployeeReferenceRange[EmployeeReferenceRange["ONLY_MYSELF"] = 3] = "ONLY_MYSELF";
                        })(EmployeeReferenceRange || (EmployeeReferenceRange = {}));
                        var ParentParam = /** @class */ (function () {
                            function ParentParam() {
                            }
                            return ParentParam;
                        }());
                        var DatePeriod = /** @class */ (function () {
                            function DatePeriod(init) {
                                $.extend(this, init);
                            }
                            return DatePeriod;
                        }());
                        var Role = /** @class */ (function () {
                            function Role() {
                            }
                            return Role;
                        }());
                        var NotificationParams = /** @class */ (function () {
                            function NotificationParams(init) {
                                $.extend(this, init);
                            }
                            return NotificationParams;
                        }());
                        var MessageNotice = /** @class */ (function () {
                            function MessageNotice(init) {
                                $.extend(this, init);
                            }
                            return MessageNotice;
                        }());
                        var WorkplaceInfo = /** @class */ (function () {
                            function WorkplaceInfo() {
                            }
                            return WorkplaceInfo;
                        }());
                        var EmployeeInfo = /** @class */ (function () {
                            function EmployeeInfo() {
                            }
                            return EmployeeInfo;
                        }());
                        var TargetInformation = /** @class */ (function () {
                            function TargetInformation(init) {
                                $.extend(this, init);
                            }
                            return TargetInformation;
                        }());
                        var BoxModel = /** @class */ (function () {
                            function BoxModel(id, name) {
                                var self = this;
                                self.id = id;
                                self.name = name;
                            }
                            return BoxModel;
                        }());
                    })(c = ccg003.c || (ccg003.c = {}));
                })(ccg003 = view.ccg003 || (view.ccg003 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg003.c.vm.js.map