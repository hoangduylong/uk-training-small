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
                    var b;
                    (function (b) {
                        var setShared = nts.uk.ui.windows.setShared;
                        var getText = nts.uk.resource.getText;
                        var ccg025 = nts.uk.com.view.ccg025.a;
                        var util = nts.uk.util;
                        var fetch = {
                            copy: "exio/exo/condset/exOutCtgAuthSet/copy"
                        };
                        var ViewModel = /** @class */ (function (_super) {
                            __extends(ViewModel, _super);
                            function ViewModel(params) {
                                var _this = _super.call(this) || this;
                                _this.listRole = ko.observableArray([]);
                                _this.roleType = ko.observable(3);
                                _this.sourceRoleId = ko.observable(null);
                                _this.sourceRoleCode = ko.observable(null);
                                _this.sourceRoleName = ko.observable(null);
                                _this.destinationRoleId = ko.observable(null);
                                _this.overwrite = ko.observable(false);
                                var vm = _this;
                                vm.$window.shared("dataShareCMF006B").done(function (data) {
                                    if (data) {
                                        vm.roleType(data.roleType);
                                        vm.sourceRoleId(data.sourceRoleId);
                                        vm.sourceRoleCode(data.sourceRoleCode);
                                        vm.sourceRoleName(data.sourceRolName);
                                    }
                                });
                                vm.listRole = ko.observableArray([]);
                                vm.componentCcg025 = new ccg025.component.viewmodel.ComponentModel({
                                    roleType: vm.roleType(),
                                    multiple: false,
                                    isResize: true,
                                    rows: 5,
                                    tabindex: 1,
                                    onDialog: true
                                });
                                vm.$blockui("grayout");
                                vm.componentCcg025.columns([
                                    { headerText: getText("CCG025_3"), prop: 'roleId', width: 50, hidden: true },
                                    { headerText: getText("CCG025_3"), prop: 'roleCode', width: 50 },
                                    { headerText: getText("CCG025_4"), prop: 'name', width: 205 }
                                ]);
                                vm.fetchRoleList();
                                return _this;
                            }
                            ViewModel.prototype.created = function (params) {
                                var vm = this;
                                vm.componentCcg025.currentRoleId.subscribe(function (roleId) {
                                    if (vm.listRole().length <= 0)
                                        vm.listRole(vm.componentCcg025.listRole());
                                    vm.destinationRoleId(roleId);
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
                            ViewModel.prototype.copy = function () {
                                var vm = this;
                                vm.$blockui("invisible");
                                if (_.isEqual(vm.sourceRoleId(), vm.destinationRoleId())) {
                                    vm.$dialog.error({ messageId: 'Msg_828' });
                                    vm.$blockui("clear");
                                    return;
                                }
                                if (util.isNullOrEmpty(vm.destinationRoleId())) {
                                    vm.$dialog.error({ messageId: 'Msg_865' });
                                    vm.$blockui("clear");
                                    return;
                                }
                                var command = {
                                    sourceRoleId: vm.sourceRoleId(),
                                    destinationRoleId: vm.destinationRoleId(),
                                    overWrite: vm.overwrite()
                                };
                                vm.$ajax(fetch.copy, command).then(function (data) {
                                    if (data.success) {
                                        var result = {
                                            copyDestinationRoleId: data.copyDestinationRoleId,
                                            overwrite: data.overwrite,
                                            success: data.success
                                        };
                                        setShared('dataShareCMF006A', result);
                                        vm.$dialog.info({ messageId: 'Msg_15' }).then(function () {
                                            vm.cancel();
                                        });
                                    }
                                }).fail(function (error) {
                                    vm.$dialog.error(error);
                                }).always(function () {
                                    vm.$blockui("clear");
                                });
                            };
                            ViewModel.prototype.cancel = function () {
                                var vm = this;
                                vm.$window.close();
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
                        b.Role = Role;
                    })(b = cmf006.b || (cmf006.b = {}));
                })(cmf006 = view.cmf006 || (view.cmf006 = {}));
            })(view = at.view || (at.view = {}));
        })(at = uk.at || (uk.at = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf006.b.vm.js.map