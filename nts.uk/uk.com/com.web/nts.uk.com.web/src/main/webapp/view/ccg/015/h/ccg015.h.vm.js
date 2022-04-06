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
/// <reference path='../../../../lib/nittsu/viewcontext.d.ts' />
var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var ccg015;
                (function (ccg015) {
                    var h;
                    (function (h) {
                        var ComponentModel = nts.uk.com.view.ccg025.a.component.viewmodel.ComponentModel;
                        var API = {
                            get: 'at/auth/workplace/initdisplayperiod/get',
                            getByCid: 'at/auth/workplace/initdisplayperiod/get-by-cid',
                            save: 'at/auth/workplace/initdisplayperiod/save',
                            delete: 'at/auth/workplace/initdisplayperiod/delete',
                        };
                        var ScreenModel = /** @class */ (function (_super) {
                            __extends(ScreenModel, _super);
                            function ScreenModel() {
                                var _this = _super !== null && _super.apply(this, arguments) || this;
                                _this.numberOfDays = ko.observableArray([]);
                                _this.selectedNumberOfDay = ko.observable(0);
                                _this.roleName = ko.observable('');
                                _this.isNewMode = ko.observable(true);
                                _this.alreadyRoles = [];
                                _this.component = ko.observable(new ComponentModel({
                                    roleType: 3,
                                    multiple: false,
                                    isAlreadySetting: true,
                                    rows: 10,
                                    tabindex: 4,
                                    onDialog: true,
                                }));
                                return _this;
                            }
                            ScreenModel.prototype.created = function () {
                                var vm = this;
                                for (var i = 0; i <= 31; i++) {
                                    if (i === 0) {
                                        vm.numberOfDays.push({ name: vm.$i18n('CCG015_103'), value: i });
                                        continue;
                                    }
                                    vm.numberOfDays.push({ name: vm.$i18n('CCG015_104', [i.toString()]), value: i });
                                }
                                vm.currentRoleId = ko.computed(function () {
                                    return vm.component().currentRoleId();
                                });
                            };
                            ScreenModel.prototype.mounted = function () {
                                var vm = this;
                                vm.currentRoleId.subscribe(function (value) {
                                    vm.getData();
                                    var role = _.find(vm.component().listRole(), function (role) { return role.roleId === value; });
                                    if (_.isNil(role)) {
                                        vm.roleName('');
                                        return;
                                    }
                                    vm.roleName("".concat(role.roleCode, " ").concat(role.roleName));
                                });
                                vm.getAlreadySetting(true);
                            };
                            ScreenModel.prototype.getAlreadySetting = function (isStart) {
                                var vm = this;
                                var roleAtr = ko.unwrap(vm.component().roleClassification);
                                var selectedRole = ko.unwrap(vm.component().currentRoleId);
                                vm.$ajax('at', API.getByCid)
                                    .then(function (result) {
                                    if (!result) {
                                        vm.alreadyRoles = [];
                                        return;
                                    }
                                    vm.alreadyRoles = _.map(result, function (x) { return x.roleID; });
                                })
                                    .then(function () {
                                    vm.component(new ComponentModel({
                                        roleType: 3,
                                        multiple: false,
                                        isAlreadySetting: true,
                                        rows: 10,
                                        tabindex: 4,
                                        onDialog: true,
                                        roleAtr: roleAtr,
                                        alreadySetList: vm.alreadyRoles,
                                    }));
                                    vm.component().displayRoleClassification(true);
                                    return vm.component().startPage(selectedRole);
                                })
                                    .then(function () { return $('#ccg015_h10 .multi-list_container').focus(); });
                            };
                            ScreenModel.prototype.getData = function () {
                                var vm = this;
                                vm
                                    .$blockui('grayout')
                                    .then(function () { return vm.$ajax('at', API.get, vm.currentRoleId()); })
                                    .then(function (response) {
                                    if (!response) {
                                        vm.selectedNumberOfDay(0);
                                        vm.isNewMode(true);
                                    }
                                    else {
                                        vm.isNewMode(false);
                                        vm.selectedNumberOfDay(response.day);
                                    }
                                })
                                    .always(function () { return vm.$blockui('clear'); });
                            };
                            ScreenModel.prototype.onSave = function () {
                                var vm = this;
                                var command = {
                                    companyId: __viewContext.user.companyId,
                                    roleId: vm.currentRoleId(),
                                    day: vm.selectedNumberOfDay(),
                                };
                                vm
                                    .$blockui('grayout')
                                    .then(function () { return vm.$ajax('at', API.save, command); })
                                    .then(function () { return vm.getAlreadySetting(); })
                                    .then(function () { return vm.$dialog.info({ messageId: 'Msg_15' }); })
                                    .then(function () { return vm.getData(); })
                                    .always(function () { return vm.$blockui('clear'); });
                            };
                            ScreenModel.prototype.onDelete = function () {
                                var vm = this;
                                var command = {
                                    companyId: __viewContext.user.companyId,
                                    roleId: vm.currentRoleId(),
                                };
                                vm
                                    .$blockui('grayout')
                                    .then(function () { return vm.$dialog.confirm({ messageId: 'Msg_18' }); })
                                    .then(function (response) {
                                    if (response === 'yes') {
                                        vm
                                            .$ajax('at', API.delete, command)
                                            .then(function () { return vm.getAlreadySetting(); })
                                            .then(function () { return vm.$dialog.info({ messageId: 'Msg_16' }); })
                                            .then(function () { return vm.getData(); });
                                    }
                                })
                                    .always(function () { return vm.$blockui('clear'); });
                            };
                            ScreenModel.prototype.close = function () {
                                var vm = this;
                                vm.$window.close();
                            };
                            ScreenModel = __decorate([
                                bean()
                            ], ScreenModel);
                            return ScreenModel;
                        }(ko.ViewModel));
                        h.ScreenModel = ScreenModel;
                    })(h = ccg015.h || (ccg015.h = {}));
                })(ccg015 = view.ccg015 || (view.ccg015 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg015.h.vm.js.map