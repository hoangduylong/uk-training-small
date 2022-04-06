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
                    var a;
                    (function (a) {
                        var common;
                        (function (common) {
                            common.CMM024_API = {
                                //Sceen A
                                screenA_GetScheduleHistoryList: 'approve/company/initial',
                                screenA_RegisterScheduleHistory: 'approve/company/screen/a/register',
                                screenA_UpdateScheduleHistory: 'approve/company/screen/a/update',
                                //Screen B
                                screenB_GetScheduleHistoryList: 'approve/byworkplace/initial',
                                screenB_RegisterScheduleHistory: 'approve/byworkplace/screen/b/register',
                                screenB_UpdateScheduleHistory: 'approve/byworkplace/screen/b/update',
                                //Screen D
                                screenD_UpdateScheduleHistoryByCompany: 'approve/company/screen/d/update',
                                screenD_DeleteScheduleHistoryByCompany: 'approve/company/screen/d/delete',
                                screenD_UpdateScheduleHistoryByWorkplace: 'approve/byworkplace/screen/d/update',
                                screenD_DeleteScheduleHistoryByWorkplace: 'approve/byworkplace/screen/d/delete',
                                //Screen F
                                screenF_GetEmployeesList: 'show/inswap/employees',
                                //Workplace Setting
                                getAgreementUnitSetting: "screen/at/kmk008/i/getInitDisplay" // "at/record/agreementUnitSetting/getAgreementUnitSetting" 
                            };
                            common.END_DATE = '9999/12/31';
                            var ScheduleHistoryDto = /** @class */ (function () {
                                function ScheduleHistoryDto(stDate, endDate, personalInfoApprove, personalInfoConfirm) {
                                    if (personalInfoApprove === void 0) { personalInfoApprove = []; }
                                    if (personalInfoConfirm === void 0) { personalInfoConfirm = []; }
                                    this.personalInfoApprove = [];
                                    this.personalInfoConfirm = [];
                                    this.code = moment(stDate, 'YYYY/MM/DD').format('YYYYMMDD');
                                    this.startDate = stDate;
                                    this.endDate = endDate;
                                    this.display = this.startDate + ' ～ ' + this.endDate;
                                    this.personalInfoApprove = personalInfoApprove;
                                    this.personalInfoConfirm = personalInfoConfirm;
                                }
                                return ScheduleHistoryDto;
                            }());
                            common.ScheduleHistoryDto = ScheduleHistoryDto;
                            var EmployeeDto = /** @class */ (function () {
                                function EmployeeDto(code, name, personId, employeeId) {
                                    var addChar = (!_.isEmpty(code) && !_.isNull(code)) ? '0' : ' ';
                                    this.employeeCode = code;
                                    this.employeeName = name;
                                    this.personId = personId;
                                    this.employeeId = employeeId;
                                    this.displayName = !nts.uk.util.isNullOrEmpty(_.trim(this.employeeCode)) ? _.trim(name) : '';
                                }
                                return EmployeeDto;
                            }());
                            common.EmployeeDto = EmployeeDto;
                            var HistoryRes;
                            (function (HistoryRes) {
                                HistoryRes[HistoryRes["HISTORY_TRANSFER"] = 0] = "HISTORY_TRANSFER";
                                HistoryRes[HistoryRes["HISTORY_NEW"] = 1] = "HISTORY_NEW";
                            })(HistoryRes = common.HistoryRes || (common.HistoryRes = {}));
                            var HistoryUpdate;
                            (function (HistoryUpdate) {
                                HistoryUpdate[HistoryUpdate["HISTORY_DELETE"] = 0] = "HISTORY_DELETE";
                                HistoryUpdate[HistoryUpdate["HISTORY_EDIT"] = 1] = "HISTORY_EDIT";
                            })(HistoryUpdate = common.HistoryUpdate || (common.HistoryUpdate = {}));
                            var ScreenModel;
                            (function (ScreenModel) {
                                ScreenModel[ScreenModel["NORMAL"] = -1] = "NORMAL";
                                ScreenModel[ScreenModel["ADDNEW"] = 0] = "ADDNEW";
                                ScreenModel[ScreenModel["EDIT"] = 1] = "EDIT";
                                ScreenModel[ScreenModel["DELETE"] = 2] = "DELETE";
                            })(ScreenModel = common.ScreenModel || (common.ScreenModel = {}));
                            var Model = /** @class */ (function () {
                                function Model(workPlaceCompanyId, startDate, endDate, approverPanel, empRepresentative) {
                                    this.workPlaceCompanyId = null;
                                    this.startDate = ko.observable(moment(new Date()).toDate());
                                    this.endDate = ko.observable(moment(new Date()).toDate());
                                    //36承認者一覧リンクラベル - A3_5, A3_7
                                    this.approverPanel = ko.observableArray([]);
                                    //従業員代表指定リンクラベル - A3_8, A3_10
                                    this.employeesRepresentative = ko.observableArray([]);
                                    this.workPlaceCompanyId = workPlaceCompanyId;
                                    if (startDate)
                                        this.startDate(startDate);
                                    if (endDate)
                                        this.endDate(endDate);
                                    if (approverPanel)
                                        this.approverPanel(approverPanel);
                                    if (empRepresentative)
                                        this.employeesRepresentative(empRepresentative);
                                }
                                return Model;
                            }());
                            common.Model = Model;
                        })(common = a.common || (a.common = {}));
                    })(a = cmm024.a || (cmm024.a = {}));
                })(cmm024 = view.cmm024 || (view.cmm024 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm024.a.common.js.map