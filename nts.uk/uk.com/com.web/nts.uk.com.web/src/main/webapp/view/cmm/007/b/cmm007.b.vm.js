var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm007;
                (function (cmm007) {
                    var b;
                    (function (b) {
                        var SystemResourceDto = b.model.SystemResourceDto;
                        var SystemResourceCommand = b.model.SystemResourceSaveCommand;
                        var blockUI = nts.uk.ui.block;
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var _self = this;
                                    _self.tabs = ko.observableArray([
                                        { id: 'tab-1', title: nts.uk.resource.getText("CMM007_7"), content: '.tab-content-1', enable: ko.observable(true), visible: ko.observable(true) },
                                        { id: 'tab-2', title: nts.uk.resource.getText("CMM007_8"), content: '.tab-content-2', enable: ko.observable(true), visible: ko.observable(true) },
                                        { id: 'tab-3', title: nts.uk.resource.getText("CMM007_9"), content: '.tab-content-3', enable: ko.observable(true), visible: ko.observable(true) }
                                    ]);
                                    _self.selectedTab = ko.observable('tab-1');
                                    _self.com_person = ko.observable("");
                                    _self.com_employment = ko.observable("");
                                    _self.com_class = ko.observable("");
                                    _self.com_jobtitle = ko.observable("");
                                    _self.com_department = ko.observable("");
                                    _self.com_workplace = ko.observable("");
                                    _self.com_equipmentClass = ko.observable("");
                                    _self.com_equipmentItem = ko.observable("");
                                    _self.com_office = ko.observable("");
                                    _self.com_company = ko.observable("");
                                    _self.com_contract = ko.observable("");
                                    _self.com_user = ko.observable("");
                                    _self.com_project = ko.observable("");
                                    _self.com_adHocWork = ko.observable("");
                                    _self.com_bindingTime = ko.observable("");
                                    _self.com_attendanceDays = ko.observable("");
                                    _self.com_absenceDays = ko.observable("");
                                    _self.com_paidHoliday = ko.observable("");
                                    _self.com_fundedPaidHoliday = ko.observable("");
                                    _self.com_substituteWork = ko.observable("");
                                    _self.com_substituteHoliday = ko.observable("");
                                    _self.com_compensationHoliday = ko.observable("");
                                    _self.com_exsessHoliday = ko.observable("");
                                    _self.com_planedPaidHoliday = ko.observable("");
                                    _self.workplace_Group = ko.observable("");
                                }
                                /**
                                 * init default data when start page
                                 */
                                ScreenModel.prototype.start_page = function () {
                                    var dfd = $.Deferred();
                                    var _self = this;
                                    b.service.findListSystemResource().done(function (data) {
                                        data.forEach(function (e) {
                                            switch (e.resourceId) {
                                                case SystemResourceId.Com_Person:
                                                    _self.com_person(e.resourceContent);
                                                    break;
                                                case SystemResourceId.Com_Employment:
                                                    _self.com_employment(e.resourceContent);
                                                    break;
                                                case SystemResourceId.Com_Class:
                                                    _self.com_class(e.resourceContent);
                                                    break;
                                                case SystemResourceId.Com_Jobtitle:
                                                    _self.com_jobtitle(e.resourceContent);
                                                    break;
                                                case SystemResourceId.Com_Department:
                                                    _self.com_department(e.resourceContent);
                                                    break;
                                                case SystemResourceId.Com_Workplace:
                                                    _self.com_workplace(e.resourceContent);
                                                    break;
                                                case SystemResourceId.Com_EquipmentClass:
                                                    _self.com_equipmentClass(e.resourceContent);
                                                    break;
                                                case SystemResourceId.Com_EquipmentItem:
                                                    _self.com_equipmentItem(e.resourceContent);
                                                    break;
                                                case SystemResourceId.Com_Office:
                                                    _self.com_office(e.resourceContent);
                                                    break;
                                                case SystemResourceId.Com_Company:
                                                    _self.com_company(e.resourceContent);
                                                    break;
                                                case SystemResourceId.Com_Contract:
                                                    _self.com_contract(e.resourceContent);
                                                    break;
                                                case SystemResourceId.Com_User:
                                                    _self.com_user(e.resourceContent);
                                                    break;
                                                case SystemResourceId.Com_Project:
                                                    _self.com_project(e.resourceContent);
                                                    break;
                                                case SystemResourceId.Com_AdHocWork:
                                                    _self.com_adHocWork(e.resourceContent);
                                                    break;
                                                case SystemResourceId.Com_BindingTime:
                                                    _self.com_bindingTime(e.resourceContent);
                                                    break;
                                                case SystemResourceId.Com_AttendanceDays:
                                                    _self.com_attendanceDays(e.resourceContent);
                                                    break;
                                                case SystemResourceId.Com_AbsenceDays:
                                                    _self.com_absenceDays(e.resourceContent);
                                                    break;
                                                case SystemResourceId.Com_PaidHoliday:
                                                    _self.com_paidHoliday(e.resourceContent);
                                                    break;
                                                case SystemResourceId.Com_FundedPaidHoliday:
                                                    _self.com_fundedPaidHoliday(e.resourceContent);
                                                    break;
                                                case SystemResourceId.Com_SubstituteWork:
                                                    _self.com_substituteWork(e.resourceContent);
                                                    break;
                                                case SystemResourceId.Com_SubstituteHoliday:
                                                    _self.com_substituteHoliday(e.resourceContent);
                                                    break;
                                                case SystemResourceId.Com_CompensationHoliday:
                                                    _self.com_compensationHoliday(e.resourceContent);
                                                    break;
                                                case SystemResourceId.Com_ExsessHoliday:
                                                    _self.com_exsessHoliday(e.resourceContent);
                                                    break;
                                                case SystemResourceId.Com_PlanedPaidHoliday:
                                                    _self.com_planedPaidHoliday(e.resourceContent);
                                                    break;
                                                case SystemResourceId.Workplace_Group:
                                                    _self.workplace_Group(e.resourceContent);
                                                    break;
                                            }
                                        });
                                        dfd.resolve();
                                    });
                                    return dfd.promise();
                                };
                                /**
                                 * Save System Resource setting
                                 */
                                ScreenModel.prototype.saveSysResourceSetting = function () {
                                    var _self = this;
                                    // Validate
                                    if (_self.hasError()) {
                                        return;
                                    }
                                    blockUI.invisible();
                                    var dfd = $.Deferred();
                                    var params = new SystemResourceCommand(_self.prepareDataToSave());
                                    nts.uk.ui.block.grayout();
                                    b.service.saveSysResourceSetting(params).done(function () {
                                        nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(function () {
                                            dfd.resolve();
                                            blockUI.clear();
                                            $('#com_company').focus();
                                        });
                                    }).always(function () {
                                        nts.uk.ui.block.clear();
                                    });
                                    return dfd.promise();
                                };
                                /**
                                 * Prepare data for saving.
                                 */
                                ScreenModel.prototype.prepareDataToSave = function () {
                                    var _self = this;
                                    var data = [new SystemResourceDto(SystemResourceId.Com_Person, _self.com_person()),
                                        new SystemResourceDto(SystemResourceId.Com_Employment, _self.com_employment()),
                                        new SystemResourceDto(SystemResourceId.Com_Class, _self.com_class()),
                                        new SystemResourceDto(SystemResourceId.Com_Jobtitle, _self.com_jobtitle()),
                                        new SystemResourceDto(SystemResourceId.Com_Department, _self.com_department()),
                                        new SystemResourceDto(SystemResourceId.Com_Workplace, _self.com_workplace()),
                                        new SystemResourceDto(SystemResourceId.Com_EquipmentClass, _self.com_equipmentClass()),
                                        new SystemResourceDto(SystemResourceId.Com_EquipmentItem, _self.com_equipmentItem()),
                                        new SystemResourceDto(SystemResourceId.Com_Office, _self.com_office()),
                                        new SystemResourceDto(SystemResourceId.Com_Company, _self.com_company()),
                                        new SystemResourceDto(SystemResourceId.Com_Contract, _self.com_contract()),
                                        new SystemResourceDto(SystemResourceId.Com_User, _self.com_user()),
                                        new SystemResourceDto(SystemResourceId.Com_Project, _self.com_project()),
                                        new SystemResourceDto(SystemResourceId.Com_AdHocWork, _self.com_adHocWork()),
                                        new SystemResourceDto(SystemResourceId.Com_BindingTime, _self.com_bindingTime()),
                                        new SystemResourceDto(SystemResourceId.Com_AttendanceDays, _self.com_attendanceDays()),
                                        new SystemResourceDto(SystemResourceId.Com_AbsenceDays, _self.com_absenceDays()),
                                        new SystemResourceDto(SystemResourceId.Com_PaidHoliday, _self.com_paidHoliday()),
                                        new SystemResourceDto(SystemResourceId.Com_FundedPaidHoliday, _self.com_fundedPaidHoliday()),
                                        new SystemResourceDto(SystemResourceId.Com_SubstituteWork, _self.com_substituteWork()),
                                        new SystemResourceDto(SystemResourceId.Com_SubstituteHoliday, _self.com_substituteHoliday()),
                                        new SystemResourceDto(SystemResourceId.Com_CompensationHoliday, _self.com_compensationHoliday()),
                                        new SystemResourceDto(SystemResourceId.Com_ExsessHoliday, _self.com_exsessHoliday()),
                                        new SystemResourceDto(SystemResourceId.Com_PlanedPaidHoliday, _self.com_planedPaidHoliday()),
                                        new SystemResourceDto(SystemResourceId.Workplace_Group, _self.workplace_Group())];
                                    return data;
                                };
                                /**
                                 * Check Errors all input.
                                 */
                                ScreenModel.prototype.hasError = function () {
                                    var _self = this;
                                    _self.clearErrors();
                                    $('#com_person').ntsEditor("validate");
                                    $('#com_employment').ntsEditor("validate");
                                    $('#com_class').ntsEditor("validate");
                                    $('#com_jobtitle').ntsEditor("validate");
                                    $('#com_department').ntsEditor("validate");
                                    $('#com_workplace').ntsEditor("validate");
                                    $('#com_equipmentClass').ntsEditor("validate");
                                    $('#com_equipmentItem').ntsEditor("validate");
                                    $('#com_office').ntsEditor("validate");
                                    $('#com_company').ntsEditor("validate");
                                    $('#com_contract').ntsEditor("validate");
                                    $('#com_user').ntsEditor("validate");
                                    $('#com_project').ntsEditor("validate");
                                    $('#com_adHocWork').ntsEditor("validate");
                                    $('#com_bindingTime').ntsEditor("validate");
                                    $('#com_attendanceDays').ntsEditor("validate");
                                    $('#com_absenceDays').ntsEditor("validate");
                                    $('#com_paidHoliday').ntsEditor("validate");
                                    $('#com_fundedPaidHoliday').ntsEditor("validate");
                                    $('#com_substituteWork').ntsEditor("validate");
                                    $('#com_substituteHoliday').ntsEditor("validate");
                                    $('#com_compensationHoliday').ntsEditor("validate");
                                    $('#com_exsessHoliday').ntsEditor("validate");
                                    $('#com_planedPaidHoliday').ntsEditor("validate");
                                    $('#workplace_Group').ntsEditor("validate");
                                    if ($('.nts-input').ntsError('hasError')) {
                                        return true;
                                    }
                                    return false;
                                };
                                /**
                                 * Clear Errors
                                 */
                                ScreenModel.prototype.clearErrors = function () {
                                    // Clear errors
                                    $('#com_person').ntsEditor("clear");
                                    $('#com_employment').ntsEditor("clear");
                                    $('#com_class').ntsEditor("clear");
                                    $('#com_jobtitle').ntsEditor("clear");
                                    $('#com_department').ntsEditor("clear");
                                    $('#com_workplace').ntsEditor("clear");
                                    $('#com_equipmentClass').ntsEditor("clear");
                                    $('#com_equipmentItem').ntsEditor("clear");
                                    $('#com_office').ntsEditor("clear");
                                    $('#com_company').ntsEditor("clear");
                                    $('#com_contract').ntsEditor("clear");
                                    $('#com_user').ntsEditor("clear");
                                    $('#com_project').ntsEditor("clear");
                                    $('#com_adHocWork').ntsEditor("clear");
                                    $('#com_bindingTime').ntsEditor("clear");
                                    $('#com_attendanceDays').ntsEditor("clear");
                                    $('#com_absenceDays').ntsEditor("clear");
                                    $('#com_paidHoliday').ntsEditor("clear");
                                    $('#com_fundedPaidHoliday').ntsEditor("clear");
                                    $('#com_substituteWork').ntsEditor("clear");
                                    $('#com_substituteHoliday').ntsEditor("clear");
                                    $('#com_compensationHoliday').ntsEditor("clear");
                                    $('#com_exsessHoliday').ntsEditor("clear");
                                    $('#com_planedPaidHoliday').ntsEditor("clear");
                                    $('#com_workplaceGroup').ntsEditor("clear");
                                    // Clear error inputs
                                    $('.nts-input').ntsError('clear');
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = b.viewmodel || (b.viewmodel = {}));
                        var SystemResourceId;
                        (function (SystemResourceId) {
                            SystemResourceId.Com_Person = "Com_Person";
                            SystemResourceId.Com_Employment = "Com_Employment";
                            SystemResourceId.Com_Class = "Com_Class";
                            SystemResourceId.Com_Jobtitle = "Com_Jobtitle";
                            SystemResourceId.Com_Department = "Com_Department";
                            SystemResourceId.Com_Workplace = "Com_Workplace";
                            SystemResourceId.Com_EquipmentClass = "Com_EquipmentClass";
                            SystemResourceId.Com_EquipmentItem = "Com_EquipmentItem";
                            SystemResourceId.Com_Office = "Com_Office";
                            SystemResourceId.Com_Company = "Com_Company";
                            SystemResourceId.Com_Contract = "Com_Contract";
                            SystemResourceId.Com_User = "Com_User";
                            SystemResourceId.Com_Project = "Com_Project";
                            SystemResourceId.Com_AdHocWork = "Com_AdHocWork";
                            SystemResourceId.Com_BindingTime = "Com_BindingTime";
                            SystemResourceId.Com_AttendanceDays = "Com_AttendanceDays";
                            SystemResourceId.Com_AbsenceDays = "Com_AbsenceDays";
                            SystemResourceId.Com_PaidHoliday = "Com_PaidHoliday";
                            SystemResourceId.Com_FundedPaidHoliday = "Com_FundedPaidHoliday";
                            SystemResourceId.Com_SubstituteWork = "Com_SubstituteWork";
                            SystemResourceId.Com_SubstituteHoliday = "Com_SubstituteHoliday";
                            SystemResourceId.Com_CompensationHoliday = "Com_CompensationHoliday";
                            SystemResourceId.Com_ExsessHoliday = "Com_ExsessHoliday";
                            SystemResourceId.Com_PlanedPaidHoliday = "Com_PlanedPaidHoliday";
                            SystemResourceId.Workplace_Group = "Workplace_Group";
                        })(SystemResourceId || (SystemResourceId = {}));
                    })(b = cmm007.b || (cmm007.b = {}));
                })(cmm007 = view.cmm007 || (view.cmm007 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm007.b.vm.js.map