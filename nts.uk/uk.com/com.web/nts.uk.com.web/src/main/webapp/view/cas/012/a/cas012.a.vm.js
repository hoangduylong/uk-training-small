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
                var cas012;
                (function (cas012) {
                    var a;
                    (function (a) {
                        var block = nts.uk.ui.block;
                        var dialog = nts.uk.ui.dialog;
                        var isNullOrUndefined = nts.uk.util.isNullOrUndefined;
                        var isNullOrEmpty = nts.uk.util.isNullOrEmpty;
                        var format = nts.uk.text.format;
                        var API = {
                            getCompanyIdOfLoginUser: "ctx/sys/auth/roleset/companyidofloginuser",
                            getDataInit: "screen/com/cas012/a/get-data-init",
                            getListEmployee: "screen/com/cas012/a/get-employee",
                            getEmployeeInfo: "screen/com/cas012/a/get-employee-info",
                            delete: "ctx/sys/auth/grant/cas012/a/delete",
                            update: "ctx/sys/auth/grant/cas012/a/update",
                            addNew: "ctx/sys/auth/grant/cas012/a/add",
                            deleteCompanySys: "ctx/sys/auth/grant/cas012/a/sys/company/delete",
                            updateCompanySys: "ctx/sys/auth/grant/cas012/a/sys/company/update",
                            addNewCompanySys: "ctx/sys/auth/grant/cas012/a/sys/company/add",
                        };
                        var ViewModel = /** @class */ (function (_super) {
                            __extends(ViewModel, _super);
                            function ViewModel(params) {
                                var _this = _super.call(this) || this;
                                //A51
                                _this.langId = ko.observable('ja');
                                // Metadata
                                _this.isCreateMode = ko.observable(false);
                                _this.isSelectedUser = ko.observable(false);
                                _this.isDelete = ko.observable(false);
                                //
                                _this.listCompany = ko.observableArray([]);
                                _this.enableListCompany = ko.observable(false);
                                _this.selectedCid = ko.observable('');
                                _this.selectedRoleType = ko.observable(0);
                                _this.employeeList = ko.observableArray([]);
                                var vm = _this;
                                var dfd = $.Deferred();
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
                                vm.selectedUserID = ko.observable('');
                                vm.listRoleIndividual = ko.observableArray([]);
                                vm.multiSelectedCode = ko.observable();
                                vm.alreadySettingPersonal = ko.observableArray([]);
                                vm.columns = ko.observableArray([
                                    { headerText: '', key: 'id', hidden: true },
                                    { headerText: nts.uk.resource.getText("CAS012_11"), key: 'employeeCodeAndName', width: 252 },
                                    { headerText: nts.uk.resource.getText("CAS012_12"), key: 'period', width: 203 },
                                    { headerText: nts.uk.resource.getText("CAS012_13"), key: 'companyCode', width: 90 }
                                ]);
                                //A41
                                vm.loginID = ko.observable('');
                                vm.userName = ko.observable('');
                                vm.dateValue = ko.observable({});
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
                                return _this;
                            }
                            ViewModel.prototype.created = function (params) {
                                var vm = this;
                            };
                            ViewModel.prototype.mounted = function () {
                                var vm = this;
                                vm.selectedRoleType.subscribe(function (roleType) {
                                    if (roleType == ListType.SYSTEM_MANAGER) {
                                        vm.enableListCompany(false);
                                        vm.selectCid('', roleType, "");
                                    }
                                    else if (roleType == ListType.COMPANY_MANAGER) {
                                        vm.enableListCompany(true);
                                        vm.selectedCid.valueHasMutated();
                                    }
                                    vm.isCreateMode(false);
                                    vm.isSelectedUser(false);
                                    vm.isDelete(false);
                                });
                                vm.selectedCid.subscribe(function (cid) {
                                    if (!isNullOrUndefined(cid) && vm.selectedRoleType() == ListType.COMPANY_MANAGER) {
                                        var roleType = vm.selectedRoleType();
                                        vm.selectCid(cid, roleType, "");
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
                            ViewModel.prototype.validate = function () {
                                $("#combo-box").trigger("validate");
                            };
                            ViewModel.prototype.initialScreen = function (deferred, roleSetCd) {
                                var vm = this;
                                var dfd = $.Deferred();
                                block.invisible();
                                var roleTypes = [];
                                vm.$ajax('com', API.getDataInit).done(function (data) {
                                    if (!isNullOrUndefined(data)) {
                                        var enumRoleType = data.enumRoleType;
                                        for (var i = 0; i < enumRoleType.length; i++) {
                                            roleTypes.push(new RollType(enumRoleType[i].value, enumRoleType[i].localizedName));
                                        }
                                        vm.listRoleType(roleTypes);
                                        vm.listCompany(data.listCompany);
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
                                    if (vm.listRoleType().length > 0) {
                                        $("#daterangepicker").find(".ntsStartDatePicker").focus();
                                    }
                                }
                            };
                            ViewModel.prototype.selectCid = function (cid, roleType, id) {
                                var vm = this;
                                var employeeSearchs = [];
                                var index = _.findIndex(vm.employeeList(), function (e) {
                                    return e.id == id;
                                });
                                block.invisible();
                                var params = {
                                    cid: cid,
                                    roleType: roleType
                                };
                                vm.$ajax('com', API.getListEmployee, params).done(function (data) {
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
                                            return e.id == id;
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
                                        vm.new();
                                    }
                                }).always(function () {
                                    block.clear();
                                }).fail(function (res) {
                                    block.clear();
                                    vm.showMessageError(res);
                                });
                            };
                            ViewModel.prototype.selectRoleEmployee = function (id) {
                                var vm = this;
                                var userEmployee = _.find(vm.employeeList(), function (i) { return i.id == id.toString(); });
                                var number = vm.checkFirt();
                                if (!isNullOrEmpty(userEmployee)) {
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
                                        sid: userEmployee.employeeId
                                    };
                                    $.when(vm.$ajax('com', API.getEmployeeInfo, wpl))
                                        .done(function (data) {
                                        if (!isNullOrUndefined(data)) {
                                            vm.jobTitleCode(data.jobTitleCode);
                                            vm.jobTitleName(data.jobTitleName);
                                            vm.workplaceCode(data.workplaceCode);
                                            vm.workplaceName(data.workplaceName);
                                        }
                                        else {
                                            vm.jobTitleCode('');
                                            vm.jobTitleName('');
                                            vm.workplaceCode('');
                                            vm.workplaceName('');
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
                            };
                            ViewModel.prototype.new = function () {
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
                                vm.new();
                                vm.openBModal();
                            };
                            ViewModel.prototype.openBModal = function () {
                                var vm = this;
                                nts.uk.ui.windows.setShared("cid_from_a", {
                                    listCompany: vm.listCompany(),
                                    cid: vm.companyId()
                                });
                                nts.uk.ui.errors.clearAll();
                                nts.uk.ui.windows.sub.modal('/view/cas/012/b/index.xhtml').onClosed(function () {
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
                                        vm.update();
                                    }
                                }
                                else if (nts.uk.util.isNullOrUndefined(vm.employyeName()) || vm.employyeName() == '') {
                                    nts.uk.ui.dialog.alertError({
                                        messageId: "Msg_218",
                                        messageParams: [nts.uk.resource.getText("CAS013_10")]
                                    });
                                }
                            };
                            ViewModel.prototype.showMessageError = function (res) {
                                if (res.businessException) {
                                    nts.uk.ui.dialog.alertError({ messageId: res.messageId, messageParams: res.parameterIds });
                                }
                            };
                            ViewModel.prototype.insert = function () {
                                var vm = this;
                                var roleType = vm.selectedRoleType();
                                var userId = vm.selectedUserID();
                                var start = nts.uk.time.parseMoment(vm.dateValue().startDate).format();
                                var end = nts.uk.time.parseMoment(vm.dateValue().endDate).format();
                                var cid = vm.selectedCid();
                                block.invisible();
                                if (roleType == ListType.SYSTEM_MANAGER) {
                                    var roleGrant = {
                                        uId: userId,
                                        startDate: start,
                                        endDate: end
                                    };
                                    block.invisible();
                                    vm.$ajax('com', API.addNew, roleGrant).done(function () {
                                        vm.selectedUserID(userId);
                                        vm.selectCid("", roleType, userId);
                                        vm.isCreateMode(false);
                                        nts.uk.ui.dialog.info({ messageId: "Msg_15" });
                                    }).always(function () {
                                    }).fail(function (res) {
                                        block.clear();
                                        vm.showMessageError(res);
                                    });
                                }
                                else if (roleType == ListType.COMPANY_MANAGER) {
                                    var roleGrant = {
                                        cId: cid,
                                        uId: userId,
                                        startDate: start,
                                        endDate: end,
                                        roleType: roleType
                                    };
                                    block.invisible();
                                    vm.$ajax('com', API.addNewCompanySys, roleGrant).done(function () {
                                        vm.selectCid(cid, roleType, userId);
                                        vm.selectedUserID(userId);
                                        nts.uk.ui.dialog.info({ messageId: "Msg_15" });
                                        vm.isCreateMode(false);
                                    }).always(function () {
                                    }).fail(function (res) {
                                        block.clear();
                                        vm.showMessageError(res);
                                    });
                                }
                            };
                            ViewModel.prototype.update = function () {
                                var vm = this, userId = vm.selectedUserID(), roleType = vm.selectedRoleType(), cid = vm.selectedCid();
                                var start = nts.uk.time.parseMoment(vm.dateValue().startDate).format();
                                var end = nts.uk.time.parseMoment(vm.dateValue().endDate).format();
                                if (roleType == ListType.SYSTEM_MANAGER) {
                                    var roleGrant = {
                                        uId: userId,
                                        startDate: start,
                                        endDate: end,
                                    };
                                    block.invisible();
                                    vm.$ajax('com', API.update, roleGrant).done(function () {
                                        vm.selectCid("", roleType, userId);
                                        vm.selectedUserID(userId);
                                        vm.isCreateMode(false);
                                        nts.uk.ui.dialog.info({ messageId: "Msg_15" });
                                    }).always(function () {
                                    }).fail(function (res) {
                                        block.clear();
                                        vm.showMessageError(res);
                                    });
                                }
                                else if (roleType == ListType.COMPANY_MANAGER) {
                                    var roleGrant = {
                                        cId: cid,
                                        uId: userId,
                                        startDate: start,
                                        endDate: end,
                                        roleType: roleType
                                    };
                                    block.invisible();
                                    vm.$ajax('com', API.updateCompanySys, roleGrant).done(function () {
                                        vm.selectCid(cid, roleType, userId);
                                        vm.selectedUserID(userId);
                                        vm.isCreateMode(false);
                                        nts.uk.ui.dialog.info({ messageId: "Msg_15" });
                                    }).always(function () {
                                    }).fail(function (res) {
                                        block.clear();
                                        vm.showMessageError(res);
                                    });
                                }
                            };
                            ViewModel.prototype.remove = function () {
                                var _this = this;
                                var vm = this, roleType = vm.selectedRoleType();
                                if (!nts.uk.ui.errors.hasError()) {
                                    nts.uk.ui.dialog.confirm({ messageId: "Msg_18" }).ifYes(function () {
                                        var vm = _this;
                                        var userId = vm.selectedUserID();
                                        block.invisible();
                                        var cid = vm.selectedCid();
                                        if (roleType == ListType.SYSTEM_MANAGER) {
                                            var roleGrant = {
                                                userId: userId
                                            };
                                            vm.$ajax('com', API.delete, roleGrant).done(function () {
                                                nts.uk.ui.dialog.info({ messageId: "Msg_16" });
                                                vm.selectCid("", roleType, userId);
                                                vm.selectedUserID(userId);
                                            }).always(function () {
                                            }).fail(function (res) {
                                                block.clear();
                                                vm.showMessageError(res);
                                            });
                                        }
                                        else if (roleType == ListType.COMPANY_MANAGER) {
                                            var roleGrant = {
                                                cId: cid,
                                                uId: userId,
                                                roleType: roleType
                                            };
                                            vm.$ajax('com', API.deleteCompanySys, roleGrant).done(function () {
                                                nts.uk.ui.dialog.info({ messageId: "Msg_16" });
                                                vm.selectCid(cid, roleType, userId);
                                                vm.selectedUserID(userId);
                                            }).always(function () {
                                            }).fail(function (res) {
                                                block.clear();
                                                vm.showMessageError(res);
                                            });
                                        }
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
                            function CompanyInfo(cid, companyCode, companyName, isAbolition) {
                                this.companyCode = companyCode;
                                this.companyName = companyName;
                                this.companyId = this.companyId;
                                this.isAbolition = isAbolition;
                            }
                            return CompanyInfo;
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
                            ListType.SYSTEM_MANAGER = 0;
                            ListType.COMPANY_MANAGER = 1;
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
                    })(a = cas012.a || (cas012.a = {}));
                })(cas012 = view.cas012 || (view.cas012 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cas012.a.vm.js.map