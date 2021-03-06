/// <reference path='../../../../lib/nittsu/viewcontext.d.ts' />
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
                var cmf002;
                (function (cmf002) {
                    var w;
                    (function (w) {
                        var getTextResource = nts.uk.resource.getText;
                        var CMF002WViewModel = /** @class */ (function (_super) {
                            __extends(CMF002WViewModel, _super);
                            function CMF002WViewModel() {
                                var _this = _super !== null && _super.apply(this, arguments) || this;
                                _this.isNew = true;
                                _this.conditionSetCode = null;
                                // W1
                                _this.listPeriodSetting = ko.observableArray([
                                    { code: 1, name: getTextResource("CMF002_275") },
                                    { code: 0, name: getTextResource("CMF002_276") },
                                ]);
                                _this.selectedPeriodSetting = ko.observable(null);
                                // W2
                                _this.listClosureDayAtr = ko.observableArray([]);
                                _this.selectedClosureDayAtr = ko.observable(null);
                                // W3
                                _this.listStartDateSegment = ko.observableArray([
                                    { code: StartDateClassificationCode.DEADLINE_START, name: getTextResource('CMF002_542') },
                                    { code: StartDateClassificationCode.DEADLINE_END, name: getTextResource('CMF002_543') },
                                    { code: StartDateClassificationCode.DEADLINE_PROCESSING, name: getTextResource('CMF002_544') },
                                    { code: StartDateClassificationCode.SYSTEM_DATE, name: getTextResource('CMF002_545') },
                                    { code: StartDateClassificationCode.DATE_SPECIFICATION, name: getTextResource('CMF002_546') },
                                ]);
                                _this.selectedStartDateSegment = ko.observable(null);
                                // W4
                                _this.isStartDateAdjustment = ko.observable(null);
                                _this.isStartDateMonthAdjustment = ko.observable(null);
                                _this.startDateAdjustment = ko.observable(null);
                                _this.startDateSpecified = ko.observable(null);
                                // W5
                                _this.listEndDateSegment = ko.observableArray([
                                    { code: EndDateClassificationCode.DEADLINE_START, name: getTextResource('CMF002_542') },
                                    { code: EndDateClassificationCode.DEADLINE_END, name: getTextResource('CMF002_543') },
                                    { code: EndDateClassificationCode.DEADLINE_PROCESSING, name: getTextResource('CMF002_544') },
                                    { code: EndDateClassificationCode.SYSTEM_DATE, name: getTextResource('CMF002_545') },
                                    { code: EndDateClassificationCode.DATE_SPECIFICATION, name: getTextResource('CMF002_546') },
                                ]);
                                _this.selectedEndDateSegment = ko.observable(null);
                                // W6
                                _this.isEndDateAdjustment = ko.observable(null);
                                _this.isEndDateMonthAdjustment = ko.observable(null);
                                _this.endDateAdjustment = ko.observable(null);
                                _this.endDateSpecified = ko.observable(null);
                                // W7
                                _this.listBaseDateSegment = ko.observableArray([
                                    { code: BaseDateClassificationCode.DEADLINE_START, name: getTextResource('CMF002_547') },
                                    { code: BaseDateClassificationCode.DEADLINE_END, name: getTextResource('CMF002_548') },
                                    { code: BaseDateClassificationCode.SYSTEM_DATE, name: getTextResource('CMF002_545') },
                                    { code: BaseDateClassificationCode.OUTPUT_PERIOD_START, name: getTextResource('CMF002_549') },
                                    { code: BaseDateClassificationCode.OUTPUT_PERIOD_END, name: getTextResource('CMF002_550') },
                                    { code: BaseDateClassificationCode.DATE_SPECIFICATION, name: getTextResource('CMF002_546') },
                                ]);
                                _this.selectedBaseDateSegment = ko.observable(null);
                                // W8
                                _this.baseDateSpecified = ko.observable(null);
                                _this.isBaseDateSpecifiedEnable = ko.observable(false);
                                return _this;
                            }
                            CMF002WViewModel.prototype.mounted = function () {
                                var vm = this;
                                var params = nts.uk.ui.windows.getShared('CMF002_W_PARAMS');
                                vm.conditionSetCode = params.conditionSetCode;
                                vm.selectedPeriodSetting(1);
                                // ???W3_2?????????????????????????????????????????????????????????05 ????????????????????????????????????????????????????????????????????????????????????
                                vm.selectedStartDateSegment.subscribe(function (value) {
                                    vm.startDateAdjustment(null);
                                    vm.startDateSpecified(null);
                                    vm.isStartDateAdjustment(value === StartDateClassificationCode.DATE_SPECIFICATION);
                                    vm.isStartDateMonthAdjustment(value === StartDateClassificationCode.DEADLINE_PROCESSING);
                                });
                                // ???W5_2?????????????????????????????????????????????????????????05 ????????????????????????????????????????????????????????????????????????????????????
                                vm.selectedEndDateSegment.subscribe(function (value) {
                                    vm.endDateAdjustment(null);
                                    vm.endDateSpecified(null);
                                    vm.isEndDateAdjustment(value === EndDateClassificationCode.DATE_SPECIFICATION);
                                    vm.isEndDateMonthAdjustment(value === EndDateClassificationCode.DEADLINE_PROCESSING);
                                });
                                // W7_2???06???????????????????????????
                                vm.selectedBaseDateSegment.subscribe(function (value) {
                                    vm.baseDateSpecified(null);
                                    vm.isBaseDateSpecifiedEnable(value === BaseDateClassificationCode.DATE_SPECIFICATION);
                                });
                                vm.$blockui('grayout');
                                // ?????????????????????????????????????????????????????????
                                w.service.findAllClosureHistory()
                                    // ???????????????????????????????????????J10_2??????????????????????????????????????????????????????????????????
                                    .then(function (response) { return vm.setListClosureHistory(response); })
                                    // ????????????????????????????????????????????????????????????
                                    .then(function () { return w.service.findOutputPeriodSetting(vm.conditionSetCode); })
                                    //?????????????????????????????????????????????????????????
                                    .then(function (response) { return vm.setOutputPeriodSetting(response); })
                                    .always(function () { return vm.$blockui('clear'); });
                            };
                            /**
                             * ???????????????????????????????????????J10_2??????????????????????????????????????????????????????????????????
                             * Set ClosureHistory
                             */
                            CMF002WViewModel.prototype.setListClosureHistory = function (response) {
                                var dfd = $.Deferred();
                                var vm = this;
                                vm.listClosureDayAtr(response);
                                return dfd.resolve();
                            };
                            /**
                             * ?????????????????????????????????????????????????????????
                             * Set OutputPeriodSetting
                             */
                            CMF002WViewModel.prototype.setOutputPeriodSetting = function (response) {
                                var dfd = $.Deferred();
                                var vm = this;
                                if (response) {
                                    vm.isNew = false;
                                    vm.selectedPeriodSetting(response.periodSetting);
                                    vm.selectedClosureDayAtr(response.closureDayAtr);
                                    vm.selectedBaseDateSegment(response.baseDateClassification);
                                    vm.baseDateSpecified(response.baseDateSpecify);
                                    vm.selectedEndDateSegment(response.endDateClassification);
                                    vm.endDateSpecified(response.endDateSpecify);
                                    vm.endDateAdjustment(response.endDateAdjustment);
                                    vm.selectedStartDateSegment(response.startDateClassification);
                                    vm.startDateSpecified(response.startDateSpecify);
                                    vm.startDateAdjustment(response.startDateAdjustment);
                                }
                                else {
                                    vm.isNew = true;
                                }
                                return dfd.resolve();
                            };
                            /**
                             * ?????????????????????????????????
                             * Save OutputPeriodSetting
                             */
                            CMF002WViewModel.prototype.save = function () {
                                var vm = this;
                                var command = new SaveOutputPeriodSetCommand({
                                    isNew: vm.isNew,
                                    periodSetting: vm.selectedPeriodSetting(),
                                    conditionSetCode: vm.conditionSetCode,
                                    closureDayAtr: vm.selectedClosureDayAtr(),
                                    baseDateClassification: vm.selectedBaseDateSegment(),
                                    baseDateSpecify: vm.baseDateSpecified() ? moment.utc(vm.baseDateSpecified(), 'YYYY/MM/DD').toISOString() : null,
                                    endDateClassification: vm.selectedEndDateSegment(),
                                    endDateSpecify: vm.endDateSpecified() ? moment.utc(vm.endDateSpecified(), 'YYYY/MM/DD').toISOString() : null,
                                    endDateAdjustment: vm.endDateAdjustment() ? parseInt(vm.endDateAdjustment()) : null,
                                    startDateClassification: vm.selectedStartDateSegment(),
                                    startDateSpecify: vm.startDateSpecified() ? moment.utc(vm.startDateSpecified(), 'YYYY/MM/DD').toISOString() : null,
                                    startDateAdjustment: vm.startDateAdjustment() ? parseInt(vm.startDateAdjustment()) : null,
                                });
                                vm.$blockui('grayout');
                                vm.$validate()
                                    .then(function (valid) {
                                    if (!valid) {
                                        return $.Deferred().reject();
                                    }
                                    //?????????????????????????????????????????????
                                    return w.service.saveOutputPeriodSetting(command);
                                })
                                    // ????????????????????????ID???Msg_15??????????????????
                                    .then(function (response) {
                                    vm.$blockui('clear');
                                    return vm.$dialog.info({ messageId: 'Msg_15' });
                                })
                                    // ??????????????????
                                    .then(function () {
                                    nts.uk.ui.windows.setShared('CMF002_B_PARAMS_FROM_W', command);
                                    vm.$window.close();
                                })
                                    .always(function () { return vm.$blockui('clear'); });
                            };
                            /**
                             * ???????????????????????????????????????
                             * Close dialog
                             */
                            CMF002WViewModel.prototype.closeDialog = function () {
                                var vm = this;
                                // ????????????????????????????????? => ???????????????????????????????????????
                                vm.$dialog.confirm({ messageId: "Msg_19" })
                                    .then(function (result) {
                                    if (result === 'no') {
                                        //????????????????????????????????????????????????????????????
                                        return;
                                    }
                                    else if (result === 'yes') {
                                        //???????????????????????????????????????????????????
                                        // ??????????????????
                                        vm.$window.close();
                                    }
                                });
                            };
                            CMF002WViewModel = __decorate([
                                bean()
                            ], CMF002WViewModel);
                            return CMF002WViewModel;
                        }(ko.ViewModel));
                        w.CMF002WViewModel = CMF002WViewModel;
                        // ???????????????
                        var StartDateClassificationCode = /** @class */ (function () {
                            function StartDateClassificationCode() {
                            }
                            StartDateClassificationCode.DEADLINE_START = 1;
                            StartDateClassificationCode.DEADLINE_END = 2;
                            StartDateClassificationCode.DEADLINE_PROCESSING = 3;
                            StartDateClassificationCode.SYSTEM_DATE = 4;
                            StartDateClassificationCode.DATE_SPECIFICATION = 5;
                            return StartDateClassificationCode;
                        }());
                        w.StartDateClassificationCode = StartDateClassificationCode;
                        // ???????????????
                        var EndDateClassificationCode = /** @class */ (function () {
                            function EndDateClassificationCode() {
                            }
                            EndDateClassificationCode.DEADLINE_START = 1;
                            EndDateClassificationCode.DEADLINE_END = 2;
                            EndDateClassificationCode.DEADLINE_PROCESSING = 3;
                            EndDateClassificationCode.SYSTEM_DATE = 4;
                            EndDateClassificationCode.DATE_SPECIFICATION = 5;
                            return EndDateClassificationCode;
                        }());
                        w.EndDateClassificationCode = EndDateClassificationCode;
                        // ???????????????
                        var BaseDateClassificationCode = /** @class */ (function () {
                            function BaseDateClassificationCode() {
                            }
                            BaseDateClassificationCode.DEADLINE_START = 1;
                            BaseDateClassificationCode.DEADLINE_END = 2;
                            BaseDateClassificationCode.SYSTEM_DATE = 3;
                            BaseDateClassificationCode.OUTPUT_PERIOD_START = 4;
                            BaseDateClassificationCode.OUTPUT_PERIOD_END = 5;
                            BaseDateClassificationCode.DATE_SPECIFICATION = 6;
                            return BaseDateClassificationCode;
                        }());
                        w.BaseDateClassificationCode = BaseDateClassificationCode;
                        var SaveOutputPeriodSetCommand = /** @class */ (function () {
                            function SaveOutputPeriodSetCommand(init) {
                                $.extend(this, init);
                            }
                            return SaveOutputPeriodSetCommand;
                        }());
                        w.SaveOutputPeriodSetCommand = SaveOutputPeriodSetCommand;
                    })(w = cmf002.w || (cmf002.w = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.w.vm.js.map