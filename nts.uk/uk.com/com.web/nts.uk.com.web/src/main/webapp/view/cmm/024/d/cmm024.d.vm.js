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
                    var d;
                    (function (d) {
                        var common = nts.uk.com.view.cmm024.a.common;
                        var HistoryUpdate = common.HistoryUpdate;
                        var ViewModel = /** @class */ (function (_super) {
                            __extends(ViewModel, _super);
                            function ViewModel(params) {
                                var _this = 
                                // start point of object
                                _super.call(this) || this;
                                _this.registrationHistory = ko.observableArray([]);
                                _this.registrationHistoryType = ko.observable(0);
                                _this.allowStartDate = ko.observable(moment(new Date()).toDate());
                                _this.newStartDate = ko.observable(moment(new Date()).toDate());
                                _this.newEndDate = ko.observable(moment(new Date()).toDate());
                                //set & get Share
                                _this.newScheduleHistory = ko.observable(null);
                                _this.enableDatePicker = ko.observable(true);
                                _this.scheduleHistoryModel = ko.observable(null);
                                var vm = _this;
                                vm.registrationHistory.push({ id: HistoryUpdate.HISTORY_DELETE, name: vm.$i18n('CMM024_33') });
                                vm.registrationHistory.push({ id: HistoryUpdate.HISTORY_EDIT, name: vm.$i18n('CMM024_34') });
                                return _this;
                            }
                            ViewModel.prototype.created = function (params) {
                                // start point of object
                                var vm = this;
                            };
                            ViewModel.prototype.mounted = function () {
                                // raise event when view initial success full
                                var vm = this;
                                //get value from parent form
                                vm.newEndDate(moment(common.END_DATE, 'YYYY/MM/DD').toDate());
                                vm.registrationHistoryType(HistoryUpdate.HISTORY_EDIT);
                                $('.ntsDatepicker').focus();
                                vm.registrationHistoryType.subscribe(function (value) {
                                    vm.enableDatePicker(value !== 0);
                                });
                                vm.$window.storage('CMM024_D_INPUT').then(function (data) {
                                    if (data) {
                                        vm.scheduleHistoryModel(data); //getShared
                                        vm.newStartDate(moment(data.scheduleHistoryUpdate.startDate).toDate());
                                        var allowStartDate = null;
                                        allowStartDate = moment(vm.scheduleHistoryModel().allowStartDate).toDate();
                                        //there is one item in the history period list
                                        if (_.isNil(vm.scheduleHistoryModel().allowStartDate)) {
                                            allowStartDate = moment(data.scheduleHistoryUpdate.startDate).toDate();
                                        }
                                        vm.allowStartDate(allowStartDate);
                                    }
                                });
                            };
                            /**
                             * Process
                             * */
                            ViewModel.prototype.proceed = function () {
                                var vm = this;
                                if (!nts.uk.ui.errors.hasError()) {
                                    var stDate = vm.newStartDate(), //開始年月日テキストボックス -> A2_6, B2_6
                                    endDate = vm.newEndDate(), allowDate = vm.allowStartDate();
                                    var dataModel = vm.scheduleHistoryModel();
                                    var isBefore = moment(stDate).format('YYYYMMDD') <= moment(allowDate).format('YYYYMMDD');
                                    if (isBefore && vm.registrationHistoryType() === common.HistoryUpdate.HISTORY_EDIT) {
                                        var oldDate = moment(allowDate, 'YYYY/MM/DD').format('YYYY/MM/DD');
                                        vm.$dialog.error({ messageId: "Msg_156", messageParams: [oldDate] }).then(function () {
                                            $('.ntsDatepicker').focus();
                                        });
                                        return;
                                    }
                                    var status_1 = false, params_1 = {
                                        companyId: dataModel.workPlaceCompanyId,
                                        workPlaceId: dataModel.workPlaceCompanyId,
                                        startDate: moment.utc(dataModel.scheduleHistoryUpdate.startDate, 'YYYY-MM-DD'),
                                        endDate: moment.utc(dataModel.scheduleHistoryUpdate.endDate, 'YYYY-MM-DD'),
                                        startDateBeforeChange: null,
                                        screen: dataModel.screen
                                    };
                                    if (vm.registrationHistoryType() == common.HistoryUpdate.HISTORY_DELETE) {
                                        vm.$dialog.confirm({ messageId: 'Msg_18' }).then(function (result) {
                                            if (result === 'yes') {
                                                vm.deleteScheduleHistory(params_1);
                                                vm.$window.storage("CMM024_D_RESULT", {
                                                    newScheduleHistory: null,
                                                    RegistrationHistoryType: vm.registrationHistoryType(),
                                                    status: true
                                                });
                                            }
                                        });
                                    }
                                    else {
                                        params_1.startDate = moment.utc(vm.newStartDate(), 'YYYY-MM-DD');
                                        params_1.endDate = moment.utc(vm.newEndDate(), 'YYYY-MM-DD');
                                        params_1.startDateBeforeChange = moment.utc(dataModel.scheduleHistoryUpdate.startDate, 'YYYY-MM-DD');
                                        status_1 = vm.updateScheduleHistory(params_1);
                                        vm.$window.storage("CMM024_D_RESULT", {
                                            newScheduleHistory: {
                                                startDate: moment(vm.newStartDate()).format("YYYY/MM/DD"),
                                                newEndDate: moment(vm.newStartDate()).subtract(1, "days").format("YYYY/MM/DD")
                                            },
                                            RegistrationHistoryType: vm.registrationHistoryType(),
                                            status: status_1
                                        });
                                    }
                                    return false;
                                }
                            };
                            /**
                             * Cancel and close window
                             * */
                            ViewModel.prototype.cancel = function () {
                                var vm = this;
                                vm.$window.storage("CMM024_D_RESULT", null);
                                vm.$window.close();
                                return false;
                            };
                            ViewModel.prototype.initScheduleHistory = function () {
                                var vm = this;
                            };
                            /**
                             *  Delete a schedule history of company / workplace
                             * params {
                             * @companyId / @workplaceId string : 会社ID / 職場ID
                             * @startDate date : 期間
                             * @endDate date : 期間
                             * }
                             */
                            ViewModel.prototype.deleteScheduleHistory = function (params) {
                                var vm = this;
                                switch (params.screen) {
                                    case 'A':
                                        vm.$blockui('show');
                                        vm.$ajax('at', common.CMM024_API.screenD_DeleteScheduleHistoryByCompany, params)
                                            .done(function (response) {
                                            vm.$dialog.info({ messageId: 'Msg_16' }).then(function () {
                                                vm.$window.close();
                                                vm.$blockui('hide');
                                            });
                                        })
                                            .fail(function (error) {
                                            vm.$dialog.info({ messageId: error.messageId }).then(function () {
                                                vm.$blockui('hide');
                                            });
                                        })
                                            .always(function () { return vm.$blockui('hide'); });
                                        break;
                                    case 'B':
                                        vm.$blockui('show');
                                        vm.$ajax('at', common.CMM024_API.screenD_DeleteScheduleHistoryByWorkplace, params)
                                            .done(function (response) {
                                            vm.$dialog.info({ messageId: 'Msg_16' }).then(function () {
                                                vm.$window.close();
                                                vm.$blockui('hide');
                                            });
                                        })
                                            .fail(function (error) {
                                            vm.$dialog.info({ messageId: error.messageId }).then(function () {
                                                vm.$blockui('hide');
                                            });
                                        })
                                            .always(function () { return vm.$blockui('hide'); });
                                        break;
                                }
                            };
                            /**
                             * update a schedule history
                             * params {
                             * @companyId / @workplaceId string : 会社ID / 職場ID
                             * @startDate date : 期間
                             * @endDate date : 期間
                             * @startDateBeforeChange : 期間
                             * }
                             */
                            ViewModel.prototype.updateScheduleHistory = function (params) {
                                var vm = this, status = false;
                                vm.$blockui('show');
                                switch (params.screen) {
                                    case 'A':
                                        vm.$ajax('at', common.CMM024_API.screenD_UpdateScheduleHistoryByCompany, params)
                                            .done(function (response) {
                                            vm.$dialog.info({ messageId: 'Msg_15' }).then(function () {
                                                status = true;
                                                vm.$blockui('hide');
                                                vm.$window.close();
                                            });
                                        })
                                            .fail(function () { return vm.$blockui('hide'); })
                                            .always(function () { return vm.$blockui('hide'); });
                                        break;
                                    case 'B':
                                        vm.$ajax('at', common.CMM024_API.screenD_UpdateScheduleHistoryByWorkplace, params)
                                            .done(function (response) {
                                            vm.$dialog.info({ messageId: 'Msg_15' }).then(function () {
                                                status = true;
                                                vm.$blockui('hide');
                                                vm.$window.close();
                                            });
                                        })
                                            .fail(function () { return vm.$blockui('hide'); })
                                            .always(function () { return vm.$blockui('hide'); });
                                        break;
                                }
                                return status;
                            };
                            ViewModel = __decorate([
                                bean()
                            ], ViewModel);
                            return ViewModel;
                        }(ko.ViewModel));
                    })(d = cmm024.d || (cmm024.d = {}));
                })(cmm024 = view.cmm024 || (view.cmm024 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm024.d.vm.js.map