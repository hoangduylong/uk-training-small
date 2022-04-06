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
                var cmm018;
                (function (cmm018) {
                    var q;
                    (function (q) {
                        var viewmodel;
                        (function (viewmodel) {
                            var Cmm018QViewModel = /** @class */ (function (_super) {
                                __extends(Cmm018QViewModel, _super);
                                function Cmm018QViewModel() {
                                    var _this = _super !== null && _super.apply(this, arguments) || this;
                                    _this.param = new PARAM();
                                    _this.model = new CheckBoxModel();
                                    return _this;
                                }
                                Cmm018QViewModel.prototype.created = function (params) {
                                    // data transfer from parent view call modal
                                    var self = this;
                                    self.param = params;
                                    self.dataFetch();
                                };
                                Cmm018QViewModel.prototype.mounted = function () {
                                    var self = this;
                                    $('#q2_1').focus();
                                };
                                Cmm018QViewModel.prototype.closeModal = function () {
                                    var self = this;
                                    self.$window.close({
                                    // data return to parent
                                    });
                                };
                                Cmm018QViewModel.prototype.register = function () {
                                    console.log('register');
                                    var self = this;
                                    self.$blockui("show");
                                    var companyId = self.$user.companyId;
                                    ;
                                    var checkCommand = {};
                                    checkCommand.companyUnit = ko.toJS(self.model.companyUnit);
                                    checkCommand.workplaceUnit = ko.toJS(self.model.workPlaceUnit);
                                    checkCommand.employeeUnit = ko.toJS(self.model.personUnit);
                                    checkCommand.companyId = companyId;
                                    self.$ajax(API.checkRegister, checkCommand)
                                        .then(function (res) {
                                        var registerCommand = self.dataSource;
                                        if (self.param.systemAtr == SystemAtr.EMPLOYMENT) {
                                            var approverSet = self.dataSource.approvalSetting.approverSet;
                                            var approvalSetting = registerCommand.approvalSetting;
                                            approvalSetting.companyId = companyId;
                                            if (registerCommand.mode) {
                                                approvalSetting.prinFlg = 0;
                                            }
                                            approverSet.companyId = companyId;
                                            approverSet.companyUnit = ko.toJS(self.model.companyUnit) ? 1 : 0;
                                            approverSet.workplaceUnit = ko.toJS(self.model.workPlaceUnit) ? 1 : 0;
                                            approverSet.employeeUnit = ko.toJS(self.model.personUnit) ? 1 : 0;
                                        }
                                        else {
                                            var hrApprovalRouteSetting = self.dataSource.hrApprovalRouteSetting;
                                            hrApprovalRouteSetting.cid = companyId;
                                            hrApprovalRouteSetting.comMode = ko.toJS(self.model.companyUnit);
                                            hrApprovalRouteSetting.devMode = ko.toJS(self.model.workPlaceUnit);
                                            hrApprovalRouteSetting.empMode = ko.toJS(self.model.personUnit);
                                        }
                                        return self.$ajax(API.register, registerCommand);
                                    }).done(function (res) {
                                        self.$dialog.info({ messageId: "Msg_15" }).then(function () {
                                            self.closeModal();
                                        });
                                    }).fail(function (res) {
                                        self.showError(res);
                                    }).always(function () {
                                        self.$blockui("hide");
                                    });
                                };
                                Cmm018QViewModel.prototype.dataFetch = function () {
                                    var self = this;
                                    self.$blockui("show");
                                    var startQCommand = {};
                                    startQCommand.companyId = self.$user.companyId;
                                    startQCommand.systemAtr = self.param.systemAtr;
                                    self.$ajax(API.getSetting, startQCommand)
                                        .done(function (res) {
                                        self.dataSource = res;
                                        if (self.param.systemAtr == SystemAtr.EMPLOYMENT) {
                                            if (!self.dataSource.mode) {
                                                var approverSet = self.dataSource.approvalSetting.approverSet;
                                                self.model.changeValue(approverSet.companyUnit == 1, approverSet.workplaceUnit == 1, approverSet.employeeUnit == 1);
                                            }
                                            else {
                                                self.dataSource.approvalSetting = {};
                                                self.dataSource.approvalSetting.approverSet = {};
                                            }
                                        }
                                        else {
                                            // HUMAN_RESOURCE
                                            if (!self.dataSource.mode) {
                                                var hrApprovalRouteSetting = self.dataSource.hrApprovalRouteSetting;
                                                self.model.changeValue(hrApprovalRouteSetting.comMode, hrApprovalRouteSetting.devMode, hrApprovalRouteSetting.empMode);
                                            }
                                            else {
                                                self.dataSource.hrApprovalRouteSetting = {};
                                            }
                                        }
                                    }).fail(function (res) {
                                        self.showError(res);
                                    }).always(function () {
                                        self.$blockui("hide");
                                    });
                                };
                                Cmm018QViewModel.prototype.showError = function (res) {
                                    var self = this;
                                    if (res) {
                                        var param = {
                                            messageId: res.messageId,
                                            messageParams: res.parameterIds
                                        };
                                        self.$dialog.error(param);
                                    }
                                };
                                Cmm018QViewModel = __decorate([
                                    bean()
                                ], Cmm018QViewModel);
                                return Cmm018QViewModel;
                            }(ko.ViewModel));
                            viewmodel.Cmm018QViewModel = Cmm018QViewModel;
                            var PARAM = /** @class */ (function () {
                                function PARAM() {
                                    this.systemAtr = 0;
                                }
                                return PARAM;
                            }());
                            var SettingUseUnitDto = /** @class */ (function () {
                                function SettingUseUnitDto() {
                                }
                                return SettingUseUnitDto;
                            }());
                            var ApprovalSettingDto = /** @class */ (function () {
                                function ApprovalSettingDto() {
                                }
                                return ApprovalSettingDto;
                            }());
                            var ApproverRegisterSetDto = /** @class */ (function () {
                                function ApproverRegisterSetDto() {
                                }
                                return ApproverRegisterSetDto;
                            }());
                            var HrApprovalRouteSettingWFDto = /** @class */ (function () {
                                function HrApprovalRouteSettingWFDto() {
                                }
                                return HrApprovalRouteSettingWFDto;
                            }());
                            var RegisterCommand = /** @class */ (function () {
                                function RegisterCommand() {
                                }
                                return RegisterCommand;
                            }());
                            var StartQCommand = /** @class */ (function () {
                                function StartQCommand() {
                                }
                                return StartQCommand;
                            }());
                            var CheckBoxModel = /** @class */ (function () {
                                function CheckBoxModel() {
                                    this.companyUnit = ko.observable(true);
                                    this.workPlaceUnit = ko.observable(false);
                                    this.personUnit = ko.observable(false);
                                }
                                CheckBoxModel.prototype.changeValue = function (companyUnit, workPlaceUnit, personUnit) {
                                    this.companyUnit(companyUnit);
                                    this.workPlaceUnit(workPlaceUnit);
                                    this.personUnit(personUnit);
                                };
                                return CheckBoxModel;
                            }());
                            var SystemAtr = {
                                EMPLOYMENT: 0,
                                HUMAN_RESOURSE: 1
                            };
                            var API = {
                                getSetting: 'workflow/approvermanagement/workroot/appSetQ',
                                checkRegister: 'workflow/approvermanagement/workroot/checkRegisterQ',
                                register: 'workflow/approvermanagement/workroot/registerQ'
                            };
                        })(viewmodel = q.viewmodel || (q.viewmodel = {}));
                    })(q = cmm018.q || (cmm018.q = {}));
                })(cmm018 = view.cmm018 || (view.cmm018 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm018.q.vm.js.map