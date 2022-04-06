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
        var at;
        (function (at) {
            var view;
            (function (view) {
                var cmf006;
                (function (cmf006) {
                    var a;
                    (function (a) {
                        var setShared = nts.uk.ui.windows.setShared;
                        var util = nts.uk.util;
                        var ccg025 = nts.uk.com.view.ccg025.a;
                        var ccg026 = nts.uk.com.view.ccg026;
                        var ROLE_TYPE = ccg026.component.ROLE_TYPE;
                        var getShared = nts.uk.ui.windows.getShared;
                        var fetch = {
                            permissionInfos: "exio/exo/condset/getExOutCategory/",
                            availabilityPermission: "exio/exo/condset/exOutCtgAuthSet/",
                            register: "exio/exo/condset/exOutCtgAuthSet/register",
                            copy: "exio/exo/condset/exOutCtgAuthSet/copy"
                        };
                        var ViewModel = /** @class */ (function (_super) {
                            __extends(ViewModel, _super);
                            function ViewModel(params) {
                                var _this = _super.call(this) || this;
                                _this.listRole = ko.observableArray([]);
                                _this.roleId = ko.observable(null);
                                _this.roleCode = ko.observable(null);
                                _this.roleName = ko.observable(null);
                                //ccg026
                                _this.roleType = ko.observable(ROLE_TYPE.EMPLOYMENT);
                                _this.permissionList = ko.observableArray([]);
                                _this.isUpdateMode = ko.observable(false);
                                _this.enableSave = ko.observable(true);
                                _this.enableCopy = ko.observable(false);
                                var vm = _this;
                                vm.$blockui("grayout");
                                vm.listRole = ko.observableArray([]);
                                vm.componentCcg025 = new ccg025.component.viewmodel.ComponentModel({
                                    roleType: vm.roleType(),
                                    multiple: false,
                                    isResize: false,
                                    rows: 10,
                                    tabindex: 3,
                                    onDialog: true
                                });
                                vm.fetchPermissionSettingList();
                                vm.fetchRoleList();
                                return _this;
                            }
                            ViewModel.prototype.created = function (params) {
                                var vm = this;
                                vm.roleId.subscribe(function (newValue) {
                                    if (!_.isEmpty(newValue)) {
                                        vm.fetchAvailabilityPermission(newValue);
                                    }
                                    else {
                                        vm.resetPermission();
                                        vm.enableCopy(false);
                                        vm.enableSave(false);
                                    }
                                });
                                vm.componentCcg025.currentRoleId.subscribe(function (roleId) {
                                    if (vm.listRole().length <= 0)
                                        vm.listRole(vm.componentCcg025.listRole());
                                    vm.roleId(roleId);
                                    vm.findRoleById(roleId);
                                });
                                vm.isUpdateMode.subscribe(function (newValue) {
                                    if (newValue) {
                                        vm.enableSave(true);
                                        vm.enableCopy(true);
                                    }
                                });
                                vm.listRole.subscribe(function (newValue) {
                                    if (_.isEmpty(newValue)) {
                                        vm.enableSave(false);
                                        vm.enableCopy(false);
                                    }
                                });
                            };
                            ViewModel.prototype.mounted = function () {
                                var vm = this;
                                $("#multi-list_container").focus();
                            };
                            /**
                             * CCG025
                             * @returns {JQueryPromise<any>}
                             */
                            ViewModel.prototype.fetchRoleList = function () {
                                var vm = this;
                                var dfd = $.Deferred();
                                vm.componentCcg025.startPage().done(function () {
                                    vm.listRole(vm.componentCcg025.listRole());
                                });
                                dfd.resolve();
                                return dfd.promise();
                            };
                            /**
                             * CCG026
                             */
                            ViewModel.prototype.fetchPermissionSettingList = function () {
                                var vm = this;
                                vm.$blockui("show");
                                vm.$ajax(fetch.permissionInfos + vm.roleType()).done(function (data) {
                                    if (data) {
                                        vm.mappingPermissionList(data);
                                    }
                                }).fail(function (error) {
                                    vm.$dialog.error(error);
                                }).always(function () {
                                    vm.$blockui("hide");
                                });
                            };
                            /**
                             * Find ExOutCtgAuthSet
                             * @param {string} roleId
                             */
                            ViewModel.prototype.fetchAvailabilityPermission = function (roleId) {
                                var vm = this;
                                vm.$blockui("show");
                                vm.$ajax(fetch.availabilityPermission + roleId).done(function (data) {
                                    if (!_.isEmpty(data)) {
                                        vm.mappingAvailabilityPermission(data);
                                        vm.enableCopy(true);
                                        vm.enableSave(true);
                                    }
                                    else {
                                        vm.resetPermission();
                                        vm.enableCopy(false);
                                        vm.enableSave(true);
                                    }
                                }).fail(function (error) {
                                    vm.$dialog.error(error);
                                }).always(function () {
                                    vm.$blockui("hide");
                                });
                            };
                            ViewModel.prototype.findRoleById = function (roleId) {
                                var vm = this;
                                var role = _.find(vm.listRole(), function (x) {
                                    return x.roleId === roleId;
                                });
                                if (role) {
                                    vm.roleCode(role.roleCode);
                                    vm.roleName(role.roleName);
                                }
                            };
                            ViewModel.prototype.mappingPermissionList = function (data) {
                                var vm = this;
                                vm.permissionList(data.map(function (i) { return ({
                                    available: false,
                                    description: i.explanation,
                                    functionName: i.functionName,
                                    functionNo: i.functionNo,
                                    orderNumber: i.displayOrder
                                }); }));
                            };
                            ViewModel.prototype.mappingAvailabilityPermission = function (authSet) {
                                var vm = this;
                                var availableAuths = authSet.filter(function (i) { return i.available; }).map(function (i) { return i.functionNo; });
                                vm.permissionList(vm.permissionList().map(function (i) { return ({
                                    available: availableAuths.indexOf(i.functionNo) >= 0,
                                    description: i.description,
                                    functionName: i.functionName,
                                    functionNo: i.functionNo,
                                    orderNumber: i.orderNumber
                                }); }));
                            };
                            ViewModel.prototype.resetPermission = function () {
                                var vm = this;
                                vm.permissionList(vm.permissionList().map(function (i) { return ({
                                    available: false,
                                    description: i.description,
                                    functionName: i.functionName,
                                    functionNo: i.functionNo,
                                    orderNumber: i.orderNumber
                                }); }));
                            };
                            ViewModel.prototype.save = function () {
                                var vm = this;
                                vm.$blockui("invisible");
                                if (util.isNullOrEmpty(vm.roleId())) {
                                    vm.$dialog.error({ messageId: 'Msg_865' });
                                    vm.$blockui("clear");
                                    return;
                                }
                                var command = {
                                    roleId: vm.roleId(),
                                    functionAuthSettings: ko.toJS(vm.permissionList()).map(function (i) { return ({
                                        functionNo: i.functionNo,
                                        available: i.available
                                    }); })
                                };
                                vm.$ajax(fetch.register, command).then(function (data) {
                                    vm.isUpdateMode(true);
                                    vm.$dialog.info({ messageId: 'Msg_15' });
                                    vm.enableCopy(true);
                                    vm.enableSave(true);
                                }).fail(function (error) {
                                    vm.$dialog.error(error);
                                }).always(function () {
                                    vm.$blockui("clear");
                                });
                            };
                            ViewModel.prototype.openScreenB = function () {
                                var vm = this;
                                var param = {
                                    roleType: vm.roleType(),
                                    sourceRoleId: vm.roleId(),
                                    sourceRoleCode: vm.roleCode(),
                                    sourceRolName: vm.roleName()
                                };
                                setShared('dataShareCMF006B', param);
                                vm.$window.modal('com', '/view/cmf/006/b/index.xhtml').then(function (data) {
                                    var result = getShared('dataShareCMF006A');
                                    if (!_.isNil(result)) {
                                        vm.componentCcg025.currentRoleId(result.copyDestinationRoleId);
                                    }
                                    $("#multi-list_container").focus();
                                });
                            };
                            ViewModel = __decorate([
                                bean()
                            ], ViewModel);
                            return ViewModel;
                        }(ko.ViewModel));
                        var Role = /** @class */ (function (_super) {
                            __extends(Role, _super);
                            function Role() {
                                return _super !== null && _super.apply(this, arguments) || this;
                            }
                            return Role;
                        }(ccg025.component.model.Role));
                        a.Role = Role;
                    })(a = cmf006.a || (cmf006.a = {}));
                })(cmf006 = view.cmf006 || (view.cmf006 = {}));
            })(view = at.view || (at.view = {}));
        })(at = uk.at || (uk.at = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf006.a.vm.js.map