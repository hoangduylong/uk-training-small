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
                var cmm024;
                (function (cmm024) {
                    var c;
                    (function (c) {
                        var common = nts.uk.com.view.cmm024.a.common;
                        var ScheduleHistoryDto = common.ScheduleHistoryDto;
                        var HistoryRes = common.HistoryRes;
                        var ViewModel = /** @class */ (function (_super) {
                            __extends(ViewModel, _super);
                            function ViewModel(params) {
                                var _this = 
                                // start point of object
                                _super.call(this) || this;
                                _this.registrationHistory = ko.observableArray([]);
                                _this.registrationHistoryType = ko.observable(0);
                                _this.newStartDate = ko.observable(null);
                                _this.beginStartDate = ko.observable(null);
                                //set & get Share
                                _this.scheduleHistorySelected = ko.observable(null);
                                var vm = _this;
                                vm.registrationHistory.push({ id: HistoryRes.HISTORY_TRANSFER, name: vm.$i18n('CMM024_26') });
                                vm.registrationHistory.push({ id: HistoryRes.HISTORY_NEW, name: vm.$i18n('CMM024_27') });
                                var dataSource = nts.uk.ui.windows.getShared('scheduleHistorySelected');
                                if (!_.isNil(dataSource)) {
                                    vm.beginStartDate(moment(dataSource.startDate).add(1, 'days').format("YYYY/MM/DD"));
                                    vm.scheduleHistorySelected(dataSource);
                                }
                                else {
                                    vm.beginStartDate(moment().format("YYYY/MM/DD"));
                                }
                                return _this;
                            }
                            ViewModel.prototype.created = function (params) {
                                // start point of object
                                var vm = this;
                            };
                            ViewModel.prototype.mounted = function () {
                                // raise event when view initial success full
                                var vm = this;
                                $('.ntsDatepicker').focus();
                            };
                            /**
                             * Process
                             * */
                            ViewModel.prototype.proceed = function () {
                                var vm = this, isAfter = true, currentDateHistory = vm.scheduleHistorySelected();
                                var newStartDate = vm.newStartDate(), //開始年月日テキストボックス -> A2_6, B2_6
                                newEndDate = moment(common.END_DATE).toDate(), cStartDate = moment(common.END_DATE).toDate();
                                if (!nts.uk.util.isNullOrEmpty(currentDateHistory)) {
                                    cStartDate = moment(currentDateHistory.startDate).toDate();
                                    isAfter = moment(newStartDate).format('YYYYMMDD') > moment(cStartDate).format('YYYYMMDD');
                                }
                                if (!isAfter) {
                                    vm.$dialog.error({ messageId: "Msg_156", messageParams: [moment(cStartDate).format('YYYY/MM/DD')] }).then(function () {
                                        $('.ntsDatepicker').focus();
                                    });
                                    return;
                                }
                                else {
                                    var startDate = moment(newStartDate).format('YYYY/MM/DD');
                                    var newScheduleHistoryDto = void 0, personalInfoApprove = [], personalInfoConfirm = [];
                                    newScheduleHistoryDto = new ScheduleHistoryDto(startDate, common.END_DATE);
                                    //履歴から引き継ぐ履歴から引き継ぐ
                                    if (vm.registrationHistoryType() === HistoryRes.HISTORY_TRANSFER) {
                                        if (!nts.uk.util.isNullOrUndefined(currentDateHistory)) {
                                            personalInfoApprove = currentDateHistory.personalInfoApprove;
                                            personalInfoConfirm = currentDateHistory.personalInfoConfirm;
                                        }
                                        else
                                            vm.registrationHistoryType(HistoryRes.HISTORY_NEW); //list is empty
                                        newScheduleHistoryDto = new ScheduleHistoryDto(startDate, common.END_DATE, //endDate
                                        personalInfoApprove, personalInfoConfirm);
                                    }
                                    vm.$window.storage("newScheduleHistory", {
                                        scheduleHistoryItem: newScheduleHistoryDto,
                                        registrationHistoryType: vm.registrationHistoryType()
                                    }).then(function () {
                                        vm.$window.close();
                                        return false;
                                    });
                                }
                            };
                            /**
                             * Cancel and close window
                             * */
                            ViewModel.prototype.cancel = function () {
                                var vm = this;
                                vm.$window.storage("newScheduleHistory", {}).then(function () {
                                    vm.$window.close();
                                    return false;
                                });
                            };
                            ViewModel = __decorate([
                                bean()
                            ], ViewModel);
                            return ViewModel;
                        }(ko.ViewModel));
                    })(c = cmm024.c || (cmm024.c = {}));
                })(cmm024 = view.cmm024 || (view.cmm024 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm024.c.vm.js.map