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
/// <reference path="../../../../lib/nittsu/viewcontext.d.ts" />
var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cas013;
                (function (cas013) {
                    var a;
                    (function (a) {
                        var block = nts.uk.ui.block;
                        var dialog = nts.uk.ui.dialog;
                        var isNullOrUndefined = nts.uk.util.isNullOrUndefined;
                        var isNullOrEmpty = nts.uk.util.isNullOrEmpty;
                        var format = nts.uk.text.format;
                        var API = {
                            getCompanyIdOfLoginUser: "ctx/sys/auth/roleset/companyidofloginuser",
                            getRoleType: "ctx/sys/auth/grant/roleindividual/getRoleType",
                            getRole: "ctx/sys/auth/grant/roleindividual/getRoles/incharge/{0}",
                            getRoleGrants: "ctx/sys/auth/grant/roleindividual/getRoleGrants",
                            getRoleGrant: "ctx/sys/auth/grant/roleindividual/getRoleGrant",
                            insertRoleGrant: "ctx/sys/auth/grant/roleindividual/insertRoleGrant",
                            upDateRoleGrant: "ctx/sys/auth/grant/roleindividual/upDateRoleGrant",
                            deleteRoleGrant: "ctx/sys/auth/grant/roleindividual/deleteRoleGrant",
                            getCompanyInfo: "ctx/sys/auth/grant/roleindividual/getCompanyInfo",
                            getWorkPlaceInfo: "ctx/sys/auth/grant/roleindividual/getWorkPlaceInfo",
                            getJobTitle: "ctx/sys/auth/grant/roleindividual/getJobTitle"
                        };
                        var ViewModel = /** @class */ (function (_super) {
                            __extends(ViewModel, _super);
                            function ViewModel(params) {
                                var _this = _super.call(this) || this;
                                //A51
                                _this.selectRoleCheckbox = ko.observable('');
                                _this.langId = ko.observable('ja');
                                // Metadata
                                _this.isCreateMode = ko.observable(false);
                                _this.isSelectedUser = ko.observable(false);
                                _this.isDelete = ko.observable(false);
                                _this.selectedRoleType = ko.observable('');
                                //list Roll
                                _this.listRole = ko.observableArray([]);
                                _this.selectedRole = ko.observable('');
                                _this.employeeList = ko.observableArray([]);
                                _this.optionalColumnDatasource = ko.observableArray([]);
                                var vm = _this;
                                var dfd = $.Deferred();
                                //A51
                                vm.employyeCode = ko.observable('');
                                vm.employyeName = ko.observable('');
                                vm.workplaceCode = ko.observable('');
                                vm.workplaceName = ko.observable('');
                                vm.checkFirt = ko.observable(0);
                                vm.companyId = ko.observable('');
                                vm.companyCode = ko.observable('');
                                vm.companyName = ko.observable('');
                                vm.jobTitleCode = ko.observable('');
                                vm.jobTitleName = ko.observable('');
                                vm.EmployeeIDList = ko.observableArray([]);
                                vm.listRoleType = ko.observableArray([]);
                                vm.listRole = ko.observableArray([]);
                                vm.selectedUserID = ko.observable('');
                                vm.listRoleIndividual = ko.observableArray([]);
                                vm.multiSelectedCode = ko.observable();
                                vm.alreadySettingPersonal = ko.observableArray([]);
                                vm.columns = ko.observableArray([
                                    { headerText: '', key: 'id', hidden: true },
                                    { headerText: nts.uk.resource.getText("CAS013_35"), key: 'employeeCodeAndName', width: 252 },
                                    { headerText: nts.uk.resource.getText("CAS013_32"), key: 'period', width: 203 },
                                    { headerText: nts.uk.resource.getText("CAS013_36"), key: 'companyCode', width: 90 }
                                ]);
                                vm.columnsIndividual = ko.observableArray([
                                    { headerText: '', key: 'userId', hidden: true },
                                    { headerText: nts.uk.resource.getText("CAS013_15"), key: 'loginId', width: 120 },
                                    { headerText: nts.uk.resource.getText("CAS013_16"), key: 'name', width: 120 },
                                    { headerText: nts.uk.resource.getText("CAS013_17"), key: 'datePeriod', width: 210 },
                                ]);
                                //A41
                                vm.loginID = ko.observable('');
                                vm.userName = ko.observable('');
                                vm.dateValue = ko.observable({});
                                //tab
                                vm.tabs = ko.observableArray([
                                    {
                                        id: 'tab-1',
                                        title: nts.uk.resource.getText("CAS013_13"),
                                        content: '.tab-content-1',
                                        enable: ko.observable(true),
                                        visible: ko.observable(true)
                                    },
                                    {
                                        id: 'tab-2',
                                        title: nts.uk.resource.getText("CAS013_14"),
                                        content: '.tab-content-2',
                                        enable: ko.observable(true),
                                        visible: ko.observable(true)
                                    },
                                    {
                                        id: 'tab-3',
                                        title: nts.uk.resource.getText("CAS013_15"),
                                        content: '.tab-content-3',
                                        enable: ko.observable(true),
                                        visible: ko.observable(true)
                                    },
                                ]);
                                vm.selectedTab = ko.observable('tab-1');
                                block.invisible();
                                vm.$ajax('com', API.getCompanyIdOfLoginUser).done(function (companyId) {
                                    if (!companyId) {
                                        vm.backToTopPage();
                                        dfd.resolve();
                                    }
                                    else {
                                        // initial screen
                                        vm.initialScreen(dfd, '');
                                    }
                                    dfd.resolve();
                                }).fail(function () {
                                    vm.backToTopPage();
                                    dfd.reject();
                                }).always(function () {
                                });
                                vm.selectedRole.subscribe(function (roleId) {
                                    vm.selectRole(roleId.toString(), '');
                                    vm.isSelectedUser(false);
                                    vm.isDelete(false);
                                });
                                return _this;
                            }
                            ViewModel.prototype.created = function (params) {
                                var vm = this;
                            };
                            ViewModel.prototype.mounted = function () {
                                var vm = this;
                                vm.selectedRoleType.subscribe(function (roleType) {
                                    vm.getRoles(roleType);
                                    vm.isCreateMode(false);
                                    vm.isSelectedUser(false);
                                    vm.isDelete(false);
                                });
                                vm.selectRoleCheckbox.subscribe(function (e) {
                                    var itemRole = _.find(vm.listRole(), function (i) {
                                        return i.roleCode == e;
                                    });
                                    if (!isNullOrUndefined(itemRole)) {
                                        vm.selectedRole(itemRole.roleId);
                                    }
                                });
                                vm.multiSelectedCode.subscribe(function (e) {
                                    if (!isNullOrUndefined(e)) {
                                        vm.selectRoleEmployee(e);
                                    }
                                });
                                $('#combo-box').focus();
                            };
                            //A51
                            ViewModel.prototype.setDefault = function () {
                                var vm = this;
                                nts.uk.util.value.reset($("#combo-box, #A_SEL_001"), vm.defaultValue() !== '' ? vm.defaultValue() : undefined);
                            };
                            //A51
                            ViewModel.prototype.validate = function () {
                                $("#combo-box").trigger("validate");
                            };
                            ViewModel.prototype.initialScreen = function (deferred, roleSetCd) {
                                var vm = this;
                                var dfd = $.Deferred();
                                block.invisible();
                                vm.$ajax('com', API.getRoleType).done(function (data) {
                                    if (!isNullOrEmpty(data)) {
                                        vm.listRoleType(data);
                                    }
                                    else {
                                        vm.backToTopPage();
                                    }
                                    dfd.resolve();
                                }).fail(function (error) {
                                    dialog.alertError({ messageId: error.messageId }).then(function () {
                                        vm.backToTopPage();
                                    });
                                    dfd.reject();
                                }).always(function () {
                                });
                                return dfd.promise();
                            };
                            ViewModel.prototype.backToTopPage = function () {
                                nts.uk.request.jump("/view/ccg/008/a/index.xhtml");
                            };
                            ViewModel.prototype.setFocus = function () {
                                var vm = this;
                                if (vm.isCreateMode() || vm.checkFirt() == 1) {
                                    $('#combo-box').focus();
                                }
                                else {
                                    if (vm.listRole().length > 0) {
                                        $("#daterangepicker").find(".ntsStartDatePicker").focus();
                                    }
                                }
                            };
                            ViewModel.prototype.getRoles = function (roleType) {
                                var vm = this;
                                var dfd = $.Deferred();
                                if (roleType != '') {
                                    var _path = format(API.getRole, roleType);
                                    block.invisible();
                                    vm.$ajax('com', _path).done(function (data) {
                                        if (data != null && data.length > 0) {
                                            vm.listRole(data);
                                            vm.selectedRole(data[0].roleId);
                                            vm.selectRoleCheckbox(data[0].roleId);
                                        }
                                        else {
                                            vm.listRole([]);
                                            vm.selectedRole('');
                                            vm.selectRoleCheckbox('');
                                            block.clear();
                                        }
                                        dfd.resolve();
                                    }).always(function () {
                                    }).fail(function () {
                                        dfd.reject();
                                    });
                                }
                                else {
                                    vm.listRole([]);
                                    vm.selectedRole('');
                                    vm.selectRoleCheckbox('');
                                    block.clear();
                                }
                            };
                            ViewModel.prototype.selectRole = function (roleId, userIdSelected) {
                                var vm = this;
                                var employeeSearchs = [];
                                var index = _.findIndex(vm.employeeList(), function (e) {
                                    return e.id == userIdSelected;
                                });
                                if (roleId != '') {
                                    block.invisible();
                                    vm.$ajax('com', API.getRoleGrants, roleId).done(function (data) {
                                        if (!isNullOrEmpty(data)) {
                                            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                                                var entry = data_1[_i];
                                                employeeSearchs.push(new UnitModel(entry));
                                            }
                                            if (isNullOrEmpty(employeeSearchs)) {
                                                vm.multiSelectedCode();
                                                vm.dateValue({});
                                                vm.companyId('');
                                                vm.companyName('');
                                                vm.companyCode('');
                                                vm.workplaceCode('');
                                                vm.workplaceName('');
                                                vm.jobTitleCode('');
                                                vm.jobTitleName('');
                                                vm.employyeCode('');
                                                vm.employyeName('');
                                            }
                                            vm.employeeList(employeeSearchs);
                                            var indexNew = _.findIndex(vm.employeeList(), function (e) {
                                                return e.id == userIdSelected;
                                            });
                                            if (index >= 0 && index < vm.employeeList().length && indexNew < 0) {
                                                vm.multiSelectedCode(vm.employeeList()[index].id);
                                            }
                                            if ((index) == vm.employeeList().length && indexNew < 0) {
                                                vm.multiSelectedCode(vm.employeeList()[index - 1].id);
                                            }
                                            if (index < 0 && indexNew >= 0) {
                                                vm.multiSelectedCode(vm.employeeList()[indexNew].id);
                                                // vm.multiSelectedCode.valueHasMutated();
                                            }
                                            if (index == indexNew && index < 0) {
                                                vm.multiSelectedCode(vm.employeeList()[0].id);
                                                // vm.multiSelectedCode.valueHasMutated();
                                            }
                                            if (index == indexNew && index > 0) {
                                                vm.multiSelectedCode(vm.employeeList()[index].id);
                                                // vm.multiSelectedCode.valueHasMutated();
                                            }
                                        }
                                        else {
                                            vm.employeeList([]); //KCP005
                                            vm.listRoleIndividual([]);
                                            vm.loginID('');
                                            vm.userName('');
                                            vm.dateValue({});
                                            vm.New();
                                        }
                                    }).always(function () {
                                        block.clear();
                                    }).fail(function () {
                                    });
                                }
                                else {
                                    vm.employeeList([]); //KCP005
                                    vm.listRoleIndividual([]);
                                    vm.loginID('');
                                    vm.userName('');
                                    vm.dateValue({});
                                    vm.companyId('');
                                    vm.companyName('');
                                    vm.companyCode('');
                                    vm.workplaceCode('');
                                    vm.workplaceName('');
                                    vm.jobTitleCode('');
                                    vm.jobTitleName('');
                                    vm.employyeCode('');
                                    vm.employyeName('');
                                    block.clear();
                                }
                            };
                            ViewModel.prototype.selectRoleEmployee = function (id) {
                                var vm = this;
                                var roleId = vm.selectedRole();
                                if (roleId != '') {
                                    var userEmployee = _.find(vm.employeeList(), function (i) { return i.id == id.toString(); });
                                    var number = vm.checkFirt();
                                    if (!nts.uk.text.isNullOrEmpty(userEmployee)) {
                                        number += 1;
                                        vm.checkFirt(number);
                                        vm.employyeCode(userEmployee.employeeCode);
                                        vm.employyeName(userEmployee.employeeName);
                                        vm.companyId(userEmployee.companyID);
                                        vm.companyName(userEmployee.companyName);
                                        vm.companyCode(userEmployee.companyCode);
                                        vm.selectedUserID(userEmployee.userID);
                                        vm.dateValue(new datePeriod(userEmployee.startValidPeriod, userEmployee.endValidPeriod));
                                        block.invisible();
                                        var wpl = {
                                            cid: userEmployee.companyID,
                                            employeeID: userEmployee.employeeId
                                        };
                                        $.when(vm.$ajax('com', API.getWorkPlaceInfo, wpl), vm.$ajax('com', API.getJobTitle, userEmployee.employeeId))
                                            .done(function (workPlace, job) {
                                            if (workPlace != null) {
                                                vm.workplaceCode(workPlace.workPlaceCode);
                                                vm.workplaceName(workPlace.workPlaceName);
                                            }
                                            else {
                                                vm.workplaceCode('');
                                                vm.workplaceName('');
                                            }
                                            if (job != null) {
                                                vm.jobTitleCode(job.jobTitleCode);
                                                vm.jobTitleName(job.jobTitleName);
                                            }
                                            else {
                                                vm.jobTitleCode('');
                                                vm.jobTitleName('');
                                            }
                                            vm.setFocus();
                                        }).always(function () {
                                            block.clear();
                                        });
                                        vm.isCreateMode(false);
                                        vm.isSelectedUser(false);
                                        vm.isDelete(true);
                                    }
                                    else {
                                        vm.isCreateMode(true);
                                        vm.jobTitleCode('');
                                        vm.jobTitleName('');
                                        vm.workplaceCode('');
                                        vm.workplaceName('');
                                        vm.companyId('');
                                        vm.companyName('');
                                        vm.companyCode('');
                                        vm.setFocus();
                                    }
                                }
                                else {
                                    vm.isDelete(false);
                                }
                            };
                            ViewModel.prototype.New = function () {
                                var vm = this;
                                vm.isCreateMode(true);
                                vm.isDelete(false);
                                vm.isSelectedUser(true);
                                vm.loginID('');
                                vm.userName('');
                                vm.dateValue({});
                                vm.companyId('');
                                vm.companyName('');
                                vm.companyCode('');
                                vm.workplaceCode('');
                                vm.workplaceName('');
                                vm.jobTitleCode('');
                                vm.jobTitleName('');
                                vm.employyeCode('');
                                vm.employyeName('');
                                vm.multiSelectedCode("");
                                $('#combo-box').focus();
                                nts.uk.ui.errors.clearAll();
                            };
                            ViewModel.prototype.createNew = function () {
                                var vm = this;
                                vm.New();
                                vm.openBModal();
                            };
                            ViewModel.prototype.openBModal = function () {
                                var vm = this;
                                nts.uk.ui.windows.setShared("cid_from_a", vm.companyId());
                                nts.uk.ui.errors.clearAll();
                                nts.uk.ui.windows.sub.modal('/view/cas/013/b/index.xhtml').onClosed(function () {
                                    var employeeInf = nts.uk.ui.windows.getShared("employeeInf");
                                    var cidSelected = nts.uk.ui.windows.getShared("cid");
                                    if (!isNullOrUndefined(employeeInf)) {
                                        vm.employyeCode(employeeInf.employeeCode);
                                        vm.employyeName(employeeInf.businessName);
                                        vm.jobTitleCode(employeeInf.jobTitleCode);
                                        vm.jobTitleName(employeeInf.jobTitleName);
                                        vm.workplaceCode(employeeInf.workplaceCode);
                                        vm.workplaceName(employeeInf.workplaceName);
                                        vm.selectedUserID(employeeInf.userId);
                                        $("#daterangepicker").find(".ntsStartDatePicker").focus();
                                    }
                                    if (!isNullOrUndefined(cidSelected)) {
                                        vm.companyName(cidSelected.name);
                                        vm.companyCode(cidSelected.code);
                                        vm.companyId(cidSelected.id);
                                    }
                                });
                            };
                            ViewModel.prototype.save = function () {
                                var vm = this;
                                $("#daterangepicker").find(".ntsStartDatePicker").trigger("validate");
                                $("#daterangepicker").find(".ntsEndDatePicker").trigger("validate");
                                if (!nts.uk.util.isNullOrUndefined(vm.employyeCode())
                                    && !nts.uk.util.isNullOrUndefined(vm.employyeName())
                                    && !nts.uk.util.isNullOrUndefined(vm.companyCode())
                                    && !nts.uk.util.isNullOrUndefined(vm.dateValue().startDate)
                                    && !nts.uk.util.isNullOrUndefined(vm.dateValue().endDate)
                                    && vm.employyeName() != ''
                                    && !nts.uk.ui.errors.hasError()) {
                                    if (vm.isSelectedUser() && vm.isCreateMode()) {
                                        vm.insert();
                                    }
                                    else {
                                        vm.upDate();
                                    }
                                }
                                else if (nts.uk.util.isNullOrUndefined(vm.employyeName()) || vm.employyeName() == '') {
                                    nts.uk.ui.dialog.alertError({
                                        messageId: "Msg_218",
                                        messageParams: [nts.uk.resource.getText("CAS013_10")]
                                    });
                                }
                            };
                            ViewModel.prototype.insert = function () {
                                var vm = this;
                                var roleType = vm.selectedRoleType();
                                var roleId = vm.selectedRole();
                                var userId = vm.selectedUserID();
                                var start = nts.uk.time.parseMoment(vm.dateValue().startDate).format();
                                var end = nts.uk.time.parseMoment(vm.dateValue().endDate).format();
                                var cid = __viewContext.user.companyId;
                                block.invisible();
                                var roleGrant = {
                                    userID: userId,
                                    roleID: roleId,
                                    roleType: roleType,
                                    startValidPeriod: start,
                                    endValidPeriod: end,
                                    companyID: cid
                                };
                                vm.$ajax('com', API.insertRoleGrant, roleGrant).done(function (data) {
                                    if (!nts.uk.util.isNullOrUndefined(data)) {
                                        vm.selectedUserID("");
                                        vm.selectRole(roleId, data);
                                        nts.uk.ui.dialog.info({ messageId: "Msg_15" });
                                        vm.isCreateMode(false);
                                    }
                                    else {
                                        nts.uk.ui.dialog.alertError({
                                            messageId: "Msg_61",
                                            messageParams: [nts.uk.resource.getText("CAS013_11")]
                                        });
                                    }
                                }).always(function () {
                                    block.clear();
                                });
                            };
                            ViewModel.prototype.upDate = function () {
                                var vm = this;
                                var roleTpye = vm.selectedRoleType();
                                var roleId = vm.selectedRole();
                                var userId = vm.selectedUserID();
                                var start = nts.uk.time.parseMoment(vm.dateValue().startDate).format();
                                var end = nts.uk.time.parseMoment(vm.dateValue().endDate).format();
                                var cid = __viewContext.user.companyId;
                                var roleGrant = {
                                    userID: userId,
                                    roleID: roleId,
                                    roleType: roleTpye,
                                    startValidPeriod: start,
                                    endValidPeriod: end,
                                    companyID: cid
                                };
                                vm.$ajax('com', API.upDateRoleGrant, roleGrant).done(function (data) {
                                    if (!nts.uk.util.isNullOrUndefined(data)) {
                                        vm.selectRole(roleId, data);
                                        nts.uk.ui.dialog.info({ messageId: "Msg_15" });
                                    }
                                    else {
                                        nts.uk.ui.dialog.alertError({
                                            messageId: "Msg_61",
                                            messageParams: [nts.uk.resource.getText("CAS013_11")]
                                        });
                                    }
                                    vm.isCreateMode(false);
                                }).always(function () {
                                    block.clear();
                                });
                            };
                            ViewModel.prototype.Delete = function () {
                                var _this = this;
                                var vm = this;
                                if (!nts.uk.ui.errors.hasError()) {
                                    nts.uk.ui.dialog.confirm({ messageId: "Msg_18" }).ifYes(function () {
                                        block.invisible();
                                        var vm = _this;
                                        var roleTpye = vm.selectedRoleType();
                                        var userId = vm.selectedUserID();
                                        var cid = __viewContext.user.companyId;
                                        var roleGrant = {
                                            userID: userId,
                                            roleType: roleTpye,
                                            companyID: cid
                                        };
                                        var id = cid + "_" + userId + "_" + roleTpye;
                                        vm.$ajax('com', API.deleteRoleGrant, roleGrant).done(function () {
                                            nts.uk.ui.dialog.info({ messageId: "Msg_16" });
                                        }).always(function () {
                                            block.clear();
                                        });
                                        vm.selectRole(vm.selectedRole(), id);
                                    });
                                }
                                vm.setFocus();
                            };
                            ViewModel = __decorate([
                                bean()
                            ], ViewModel);
                            return ViewModel;
                        }(ko.ViewModel));
                        var RollType = /** @class */ (function () {
                            function RollType(value, description) {
                                this.value = value;
                                this.description = description;
                            }
                            return RollType;
                        }());
                        var CompanyInfo = /** @class */ (function () {
                            function CompanyInfo(compCode, compName) {
                                this.compCode = compCode;
                                this.compName = compName;
                            }
                            return CompanyInfo;
                        }());
                        var WorkPlaceInfo = /** @class */ (function () {
                            function WorkPlaceInfo(workplaceCode, workplacepName) {
                                this.workplaceCode = workplaceCode;
                                this.workplacepName = workplacepName;
                            }
                            return WorkPlaceInfo;
                        }());
                        var Role = /** @class */ (function () {
                            function Role(roleId, roleCode, name, assignAtr, companyId) {
                                this.roleId = roleId;
                                this.roleCode = roleCode;
                                this.name = name;
                                this.assignAtr = assignAtr;
                                this.companyId = this.companyId;
                            }
                            return Role;
                        }());
                        var JobTitle = /** @class */ (function () {
                            function JobTitle(jobTitleCode, jobTitleName) {
                                this.jobTitleCode = jobTitleCode;
                                this.jobTitleName = jobTitleName;
                            }
                            return JobTitle;
                        }());
                        var RoleIndividual = /** @class */ (function () {
                            function RoleIndividual(userId, loginId, name, start, end, employeeId, employeeCode, businessName, cid) {
                                this.userId = userId;
                                this.loginId = loginId;
                                this.name = name;
                                this.start = start;
                                this.end = end;
                                this.datePeriod = start + ' ~ ' + end;
                                this.employeeId = employeeId;
                                this.employeeCode = employeeCode;
                                this.businessName = businessName;
                                this.cid = cid;
                            }
                            return RoleIndividual;
                        }());
                        var datePeriod = /** @class */ (function () {
                            function datePeriod(startDate, endDate) {
                                this.startDate = startDate;
                                this.endDate = endDate;
                            }
                            return datePeriod;
                        }());
                        var ListType = /** @class */ (function () {
                            function ListType() {
                            }
                            ListType.EMPLOYMENT = 1;
                            ListType.Classification = 2;
                            ListType.JOB_TITLE = 3;
                            ListType.EMPLOYEE = 4;
                            return ListType;
                        }());
                        a.ListType = ListType;
                        var UnitModel = /** @class */ (function () {
                            function UnitModel(data) {
                                this.id = data.id;
                                this.companyID = data.companyID;
                                this.companyCode = data.companyCode;
                                this.companyName = data.companyName;
                                this.userID = data.userID;
                                this.employeeId = data.employeeId;
                                this.employeeCode = data.employeeCode;
                                this.employeeName = data.employeeName;
                                this.period = data.startValidPeriod + " ~ " + data.endValidPeriod;
                                this.startValidPeriod = data.startValidPeriod;
                                this.endValidPeriod = data.endValidPeriod;
                                this.employeeCodeAndName = data.employeeCode + " " + data.employeeName;
                            }
                            return UnitModel;
                        }());
                        a.UnitModel = UnitModel;
                        var SelectType = /** @class */ (function () {
                            function SelectType() {
                            }
                            SelectType.SELECT_BY_SELECTED_CODE = 1;
                            SelectType.SELECT_ALL = 2;
                            SelectType.SELECT_FIRST_ITEM = 3;
                            SelectType.NO_SELECT = 4;
                            return SelectType;
                        }());
                        a.SelectType = SelectType;
                    })(a = cas013.a || (cas013.a = {}));
                })(cas013 = view.cas013 || (view.cas013 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cas013.a.vm.js.map