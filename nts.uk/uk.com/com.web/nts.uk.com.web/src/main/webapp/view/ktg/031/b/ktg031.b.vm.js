/// <reference path="../../../../lib/nittsu/viewcontext.d.ts" />
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
var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var ktg031;
                (function (ktg031) {
                    var b;
                    (function (b) {
                        // URL API backend
                        var API = {
                            findProcessExecution: "at/function/processexec/getProcExecList",
                            findAlarmSetting: "at/function/alarm/pattern/setting",
                        };
                        var ScreenModel = /** @class */ (function (_super) {
                            __extends(ScreenModel, _super);
                            function ScreenModel() {
                                var _this = _super !== null && _super.apply(this, arguments) || this;
                                _this.columns = ko.observableArray([]);
                                _this.listSetting = ko.observableArray([]);
                                _this.currentRow = ko.observable(null);
                                _this.mapAlarmCodeName = {};
                                return _this;
                            }
                            ScreenModel.prototype.created = function (params) {
                                var vm = this;
                                vm.columns([
                                    { key: 'rowNumber', hidden: true },
                                    { headerText: vm.$i18n('KTG031_21'), key: 'classification', width: 150 },
                                    { headerText: vm.$i18n('KTG031_22'), key: 'alarmProcessing', width: 280 },
                                    { headerText: vm.$i18n('KTG031_23'), key: 'isDisplay', width: 120 },
                                ]);
                                vm.getProcessExecution();
                            };
                            ScreenModel.prototype.mounted = function () {
                                $('#closebtn').focus();
                            };
                            ScreenModel.prototype.getProcessExecution = function () {
                                var vm = this;
                                vm.$blockui('grayout');
                                vm.$ajax("at", API.findAlarmSetting)
                                    .then(function (res) {
                                    for (var _i = 0, res_1 = res; _i < res_1.length; _i++) {
                                        var alarm = res_1[_i];
                                        vm.mapAlarmCodeName[alarm.alarmPatternCD] = alarm.alarmPatternName;
                                    }
                                    return vm.$ajax("at", API.findProcessExecution);
                                })
                                    .then(function (res) {
                                    var listAlarmSetting = _.map(res, function (item, index) {
                                        // トップページに表示（本人） and トップページに表示（管理者）
                                        var isDisplayMessage = '';
                                        var mailPrincipal = item.execSetting.alarmExtraction.displayOnTopPagePrincipal;
                                        var mailAdministrator = item.execSetting.alarmExtraction.displayOnTopPageAdministrator;
                                        var alarmCode = item.execSetting.alarmExtraction.alarmCode;
                                        if (mailPrincipal && mailAdministrator) {
                                            isDisplayMessage = vm.$i18n('KTG031_29');
                                        }
                                        else if (mailPrincipal) {
                                            isDisplayMessage = vm.$i18n('KTG031_30');
                                        }
                                        else if (mailAdministrator) {
                                            isDisplayMessage = vm.$i18n('KTG031_31');
                                        }
                                        else {
                                            isDisplayMessage = vm.$i18n('KTG031_32');
                                        }
                                        return new AlarmDisplaySettingDto({
                                            rowNumber: index,
                                            classification: vm.$i18n('KTG031_25'),
                                            alarmProcessing: "".concat(item.execItemName, "\uFF08").concat(vm.mapAlarmCodeName[alarmCode], "\uFF09"),
                                            isDisplay: isDisplayMessage,
                                        });
                                    });
                                    var lastIndex = listAlarmSetting.length;
                                    listAlarmSetting.push(new AlarmDisplaySettingDto({
                                        rowNumber: lastIndex + 1,
                                        classification: vm.$i18n('KTG031_26'),
                                        alarmProcessing: vm.$i18n('KTG031_33'),
                                        isDisplay: vm.$i18n('KTG031_28'),
                                    }));
                                    listAlarmSetting.push(new AlarmDisplaySettingDto({
                                        rowNumber: lastIndex + 2,
                                        classification: vm.$i18n('KTG031_26'),
                                        alarmProcessing: vm.$i18n('KTG031_34'),
                                        isDisplay: vm.$i18n('KTG031_28'),
                                    }));
                                    listAlarmSetting.push(new AlarmDisplaySettingDto({
                                        rowNumber: lastIndex + 3,
                                        classification: vm.$i18n('KTG031_27'),
                                        alarmProcessing: vm.$i18n('KTG031_35'),
                                        isDisplay: vm.$i18n('KTG031_32'),
                                    }));
                                    console.log(listAlarmSetting);
                                    vm.listSetting(listAlarmSetting);
                                })
                                    .always(function () { return vm.$blockui('clear'); });
                            };
                            ScreenModel.prototype.closeDialog = function () {
                                var vm = this;
                                vm.$window.close();
                            };
                            ScreenModel = __decorate([
                                bean()
                            ], ScreenModel);
                            return ScreenModel;
                        }(ko.ViewModel));
                        b.ScreenModel = ScreenModel;
                        var AlarmDisplaySettingDto = /** @class */ (function () {
                            function AlarmDisplaySettingDto(init) {
                                $.extend(this, init);
                            }
                            return AlarmDisplaySettingDto;
                        }());
                    })(b = ktg031.b || (ktg031.b = {}));
                })(ktg031 = view.ktg031 || (view.ktg031 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ktg031.b.vm.js.map