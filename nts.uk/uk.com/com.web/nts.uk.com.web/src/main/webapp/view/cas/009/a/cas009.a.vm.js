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
                var cas009;
                (function (cas009) {
                    var a;
                    (function (a) {
                        var viewmodel;
                        (function (viewmodel) {
                            var ComponentModelCCG025 = nts.uk.com.view.ccg025.a.component.viewmodel.ComponentModel;
                            var isNullOrUndefined = nts.uk.util.isNullOrUndefined;
                            var API = {
                                savePermission: 'ctx/com/screen/person/role/register',
                                removePermission: 'ctx/com/screen/person/role/delete',
                                permissionPersonInfo: 'ctx/pereg/functions/auth/find-with-role',
                                checkPermission: 'ctx/com/screen/person/role/check'
                            };
                            var Cas009AViewModel = /** @class */ (function (_super) {
                                __extends(Cas009AViewModel, _super);
                                function Cas009AViewModel() {
                                    var _this = _super !== null && _super.apply(this, arguments) || this;
                                    _this.component025 = new ComponentModelCCG025({
                                        roleType: 8,
                                        multiple: false,
                                        rows: 15,
                                        tabindex: 0,
                                        onDialog: true
                                    });
                                    // remove selected role
                                    _this.remove = function () {
                                        var vm = _this, roles = ko.toJS(vm.listRole), role = ko.toJS(vm.selectedRole), index = _.findIndex(roles, ["roleId", role.roleId]);
                                        index = _.min([_.size(roles) - 2, index]);
                                        if (!_.isNil(role.roleId)) {
                                            vm.$blockui("show");
                                            vm.$ajax("com", API.checkPermission, role.roleId).done(function () {
                                                vm.$blockui("hide");
                                                vm.$dialog.confirm({ messageId: "Msg_18" }).then(function (value) {
                                                    if (value == "yes") {
                                                        vm.$blockui("show");
                                                        vm.$ajax("com", API.removePermission, _.pick(role, ["roleId", "assignAtr"])).done(function () {
                                                            vm.$dialog.info({ messageId: "Msg_16" }).then(function () {
                                                                var roles = ko.toJS(vm.listRole), selected = roles[index];
                                                                if (isNullOrUndefined(selected)) {
                                                                    vm.getListRole();
                                                                }
                                                                else {
                                                                    vm.getListRole(selected.roleId).done(function () {
                                                                    }).always(function () {
                                                                        vm.$blockui("hide");
                                                                        nts.uk.ui.errors.clearAll();
                                                                    });
                                                                }
                                                            });
                                                        }).fail(function (error) {
                                                            vm.$dialog.error(error);
                                                            vm.$blockui("hide");
                                                            nts.uk.ui.errors.clearAll();
                                                        });
                                                    }
                                                });
                                            }).fail(function (error) {
                                                vm.$dialog.error(error);
                                                vm.$blockui("hide");
                                                nts.uk.ui.errors.clearAll();
                                            });
                                        }
                                    };
                                    return _this;
                                }
                                Cas009AViewModel.prototype.created = function () {
                                    var vm = this;
                                    vm.selectedRole = new Role();
                                    vm.listRole = ko.observableArray([]);
                                    vm.enumRange = ko.observableArray([
                                        { value: 1, localizedName: vm.$i18n("CAS009_11") },
                                        { value: 2, localizedName: vm.$i18n("CAS009_12") },
                                        { value: 3, localizedName: vm.$i18n("CAS009_13") }
                                    ]);
                                    _.extend(vm, {
                                        listRole: vm.component025.listRole
                                    });
                                    _.extend(vm.selectedRole, {
                                        roleId: vm.component025.currentRoleId,
                                        assignAtr: vm.component025.roleClassification
                                    });
                                    // subscribe and change data
                                    vm.selectedRole.roleId.subscribe(function (rid) {
                                        var roles = ko.toJS(vm.listRole), exist = _.find(roles, function (r) { return _.isEqual(r.roleId, rid); });
                                        if (exist) {
                                            vm.$blockui("show");
                                            vm.selectedRole.roleName(exist.name);
                                            vm.selectedRole.roleCode(exist.roleCode);
                                            vm.selectedRole.employeeReferenceRange(exist.employeeReferenceRange || 0);
                                            vm.$ajax("com", API.permissionPersonInfo, rid).done(function (data) {
                                                vm.selectedRole.permisions(data);
                                                vm.selectedRole.permisions.valueHasMutated();
                                            }).fail(function (error) {
                                                vm.$dialog.error(error);
                                            }).always(function () {
                                                vm.$blockui("hide");
                                            });
                                        }
                                        else {
                                            vm.$blockui("show");
                                            vm.selectedRole.roleName('');
                                            vm.selectedRole.roleCode('');
                                            vm.selectedRole.employeeReferenceRange(_.isEqual(vm.selectedRole.assignAtr(), 0) ? 0 : 1);
                                            vm.$ajax("com", API.permissionPersonInfo, undefined).done(function (data) {
                                                vm.selectedRole.permisions(data);
                                                if (_.isEqual(vm.selectedRole.assignAtr(), 0)) {
                                                    _.each(vm.selectedRole.permisions(), function (p) {
                                                        if (_.isEqual(p.functionNo, 11)) {
                                                            p.available = false;
                                                        }
                                                        else {
                                                            p.available = true;
                                                        }
                                                    });
                                                }
                                                vm.selectedRole.permisions.valueHasMutated();
                                            }).fail(function (error) {
                                                vm.$dialog.error(error);
                                            }).always(function () {
                                                vm.$blockui("hide");
                                            });
                                        }
                                        // subscribe for focus and clear errors
                                        _.defer(function () {
                                            if (_.isEmpty(rid)) {
                                                vm.selectedRole.roleCodeFocus(true);
                                            }
                                            else {
                                                vm.selectedRole.roleNameFocus(true);
                                            }
                                            // clear all error
                                            nts.uk.ui.errors.clearAll();
                                        });
                                    });
                                    // call reload data
                                    vm.start();
                                };
                                /** Start Page */
                                Cas009AViewModel.prototype.start = function () {
                                    var vm = this, role = vm.selectedRole;
                                    vm.$blockui("show");
                                    // get list role
                                    vm.getListRole().done(function () {
                                        var roles = ko.toJS(vm.listRole);
                                        if (!_.size(roles)) {
                                            vm.createNew();
                                        }
                                    }).fail(function (error) {
                                        vm.$dialog.error(error);
                                    }).always(function () {
                                        vm.$blockui("hide");
                                        nts.uk.ui.errors.clearAll();
                                    });
                                };
                                ;
                                Cas009AViewModel.prototype.getListRole = function (roleId, roleCode) {
                                    var vm = this, dfd = $.Deferred();
                                    vm.component025.startPage(roleId, roleCode).done(function () {
                                        var roles = ko.toJS(vm.listRole), roleIds = _.map(roles, function (x) { return x.roleId; });
                                        if (!_.size(roleIds)) {
                                            vm.createNew();
                                        }
                                        dfd.resolve();
                                    });
                                    return dfd.promise();
                                };
                                // create new mode
                                Cas009AViewModel.prototype.createNew = function () {
                                    var vm = this;
                                    if (vm.selectedRole.roleId() != undefined)
                                        vm.selectedRole.roleId(undefined);
                                    else
                                        vm.selectedRole.roleId.valueHasMutated();
                                };
                                // save change of role
                                Cas009AViewModel.prototype.save = function () {
                                    var vm = this, role = vm.selectedRole, command = ko.toJS(role);
                                    $(".nts-input").trigger("validate");
                                    if ($(".nts-input").ntsError("hasError")) {
                                        return;
                                    }
                                    vm.$blockui("show");
                                    // fix name
                                    _.extend(command, {
                                        name: command.roleName,
                                        createMode: _.isEmpty(command.roleId),
                                        // referFutureDate: command.referFutureDate || false,
                                        functionAuthList: _.map(command.permisions, function (m) { return _.pick(m, ['functionNo', 'available']); })
                                    });
                                    vm.$ajax("com", API.savePermission, command).done(function () {
                                        vm.$dialog.info({ messageId: "Msg_15" }).then(function () {
                                            vm.getListRole(command.roleId, command.roleCode).done(function () {
                                            }).always(function () {
                                                vm.$blockui("hide");
                                                nts.uk.ui.errors.clearAll();
                                            });
                                        });
                                    }).fail(function (error) {
                                        vm.$dialog.error(error);
                                        vm.$blockui("hide");
                                        nts.uk.ui.errors.clearAll();
                                    });
                                };
                                Cas009AViewModel = __decorate([
                                    bean()
                                ], Cas009AViewModel);
                                return Cas009AViewModel;
                            }(ko.ViewModel));
                            var Role = /** @class */ (function () {
                                function Role() {
                                    this.roleId = ko.observable('');
                                    this.roleCode = ko.observable('');
                                    this.roleName = ko.observable('');
                                    this.assignAtr = ko.observable(1);
                                    this.employeeReferenceRange = ko.observable(1);
                                    this.roleCodeFocus = ko.observable(true);
                                    this.roleNameFocus = ko.observable(false);
                                    this.permisions = ko.observableArray([]);
                                    var self = this;
                                }
                                return Role;
                            }());
                        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
                    })(a = cas009.a || (cas009.a = {}));
                })(cas009 = view.cas009 || (view.cas009 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cas009.a.vm.js.map