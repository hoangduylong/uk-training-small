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
                var ccg034;
                (function (ccg034) {
                    var a;
                    (function (a) {
                        // URL API backend
                        var API = {
                            getFlowMenuList: "sys/portal/createflowmenu/getFlowMenu",
                            getFlowMenu: "sys/portal/createflowmenu/getFlowMenu/{0}",
                            register: "sys/portal/createflowmenu/register",
                            update: "sys/portal/createflowmenu/update",
                            delete: "sys/portal/createflowmenu/delete",
                            copy: "sys/portal/createflowmenu/copy",
                        };
                        var ScreenModel = /** @class */ (function (_super) {
                            __extends(ScreenModel, _super);
                            function ScreenModel() {
                                var _this = _super !== null && _super.apply(this, arguments) || this;
                                _this.constraints = ko.observableArray(['TopPagePartCode', 'TopPagePartName']);
                                _this.toppagePartCode = ko.observable(null);
                                _this.toppagePartName = ko.observable(null);
                                _this.flowMenuList = ko.observableArray([]);
                                _this.flowMenuColumns = [];
                                _this.selectedFlowMenuId = ko.observable('');
                                _this.selectedFlowMenu = ko.observable(null);
                                _this.isNewMode = ko.observable(true).extend({
                                    notify: 'always'
                                });
                                _this.enablePreview = ko.computed(function () {
                                    var vm = _this;
                                    return !vm.isNewMode() && vm.selectedFlowMenu() && vm.selectedFlowMenu().fileId != null;
                                });
                                return _this;
                            }
                            ScreenModel.prototype.created = function () {
                                var vm = this;
                                vm.flowMenuColumns = [
                                    { headerText: vm.$i18n('CCG034_21'), key: 'flowMenuCode', width: '50px' },
                                    { headerText: vm.$i18n('CCG034_22'), key: 'flowMenuName', width: '250px' }
                                ];
                            };
                            ScreenModel.prototype.mounted = function () {
                                var vm = this;
                                vm.$blockui("grayout");
                                vm.selectedFlowMenuId.subscribe(function (value) {
                                    if (value) {
                                        vm.selectFlowMenu();
                                    }
                                });
                                vm.isNewMode.subscribe(function (value) {
                                    if (value) {
                                        $("input").filter("#A4_2").focus();
                                    }
                                    else {
                                        $("input").filter("#A4_3").focus();
                                    }
                                });
                                vm.isNewMode.valueHasMutated();
                                vm.getFlowMenuList()
                                    .then(function () {
                                    if (vm.flowMenuList().length > 0) {
                                        vm.selectedFlowMenuId(vm.flowMenuList()[0].flowMenuCode);
                                    }
                                })
                                    .always(function () { return vm.$blockui("clear"); });
                            };
                            ScreenModel.prototype.changeToNewMode = function () {
                                var vm = this;
                                vm.isNewMode(true);
                                vm.selectedFlowMenuId('');
                                vm.selectedFlowMenu(null);
                                vm.toppagePartCode('');
                                vm.toppagePartName('');
                            };
                            ScreenModel.prototype.selectFlowMenu = function () {
                                var vm = this;
                                vm.isNewMode(false);
                                vm.$blockui("grayout");
                                var path = nts.uk.text.format(API.getFlowMenu, vm.selectedFlowMenuId());
                                vm.$ajax(path)
                                    .then(function (res) {
                                    vm.toppagePartCode(res.flowMenuCode);
                                    vm.toppagePartName(res.flowMenuName);
                                    vm.selectedFlowMenu(res);
                                    vm.$validate();
                                })
                                    .always(function () { return vm.$blockui("clear"); });
                            };
                            ScreenModel.prototype.getFlowMenuList = function () {
                                var vm = this;
                                return vm.$ajax(API.getFlowMenuList)
                                    .then(function (res) {
                                    var arr = [];
                                    _.forEach(res, function (value, key) { return arr.push({ flowMenuCode: key, flowMenuName: value }); });
                                    vm.flowMenuList(_.orderBy(arr, 'flowMenuCode', 'asc'));
                                });
                            };
                            // Open Preview dialog
                            ScreenModel.prototype.openDialogB = function () {
                                var vm = this;
                                var params = {
                                    fileId: vm.selectedFlowMenu().fileId,
                                };
                                if (params.fileId) {
                                    vm.$window.modal('/view/ccg/034/b/index.xhtml', params, {
                                        width: Math.round(Number(window.innerWidth) * 80 / 100),
                                        height: Math.round(Number(window.innerHeight) * 80 / 100),
                                        resizable: true,
                                    });
                                }
                                else {
                                    vm.$dialog.error({ messageId: "Msg_1908" });
                                }
                            };
                            // Open duplicate dialog
                            ScreenModel.prototype.openDialogC = function () {
                                var vm = this;
                                vm.$window.modal("/view/ccg/034/c/index.xhtml", vm.selectedFlowMenu())
                                    .then(function (res) {
                                    if (res) {
                                        vm.getFlowMenuList().then(function () {
                                            vm.selectedFlowMenuId(res.flowMenuCode);
                                            vm.selectedFlowMenuId.valueHasMutated();
                                        });
                                    }
                                    else {
                                        vm.isNewMode.valueHasMutated();
                                    }
                                });
                            };
                            // Open Create flow menu dialog
                            ScreenModel.prototype.openDialogD = function () {
                                var vm = this;
                                var params = {
                                    flowMenuCode: vm.selectedFlowMenuId(),
                                    flowMenuData: vm.selectedFlowMenu(),
                                };
                                vm.$window.modal('/view/ccg/034/d/index.xhtml', params, {
                                    minWidth: 800,
                                    minHeight: 500,
                                    width: Math.round(Number(window.innerWidth) * 80 / 100),
                                    height: Math.round(Number(window.innerHeight) * 80 / 100),
                                    resizable: true,
                                })
                                    .then(function () { return vm.getFlowMenuList(); })
                                    .then(function () { return vm.selectFlowMenu(); });
                            };
                            ScreenModel.prototype.register = function () {
                                var vm = this;
                                vm.$validate()
                                    .then(function (valid) {
                                    if (valid) {
                                        vm.isNewMode() ? vm.performRegister() : vm.performUpdate();
                                    }
                                });
                            };
                            ScreenModel.prototype.performRegister = function () {
                                var vm = this;
                                vm.$blockui("grayout");
                                vm.$ajax(API.register, { flowMenuCode: vm.toppagePartCode(), flowMenuName: vm.toppagePartName() })
                                    // Show message + reload list
                                    .then(function () { return vm.saveSuccessHandler(); })
                                    // Select created item
                                    .then(function () { return vm.selectedFlowMenuId(vm.toppagePartCode()); })
                                    .fail(function (err) { return vm.$dialog.error({ messageId: err.messageId }); })
                                    .always(function () { return vm.$blockui("clear"); });
                            };
                            ScreenModel.prototype.performUpdate = function () {
                                var vm = this;
                                vm.$blockui("grayout");
                                vm.$ajax(API.update, { flowMenuCode: vm.toppagePartCode(), flowMenuName: vm.toppagePartName() })
                                    // Show message + reload list
                                    .then(function () { return vm.saveSuccessHandler(); })
                                    .fail(function (err) { return vm.$dialog.error({ messageId: err.messageId }); })
                                    .always(function () { return vm.$blockui("clear"); });
                            };
                            ScreenModel.prototype.saveSuccessHandler = function () {
                                var vm = this;
                                vm.$blockui("clear");
                                return vm.$dialog.info({ messageId: 'Msg_15' })
                                    .then(function () { return vm.getFlowMenuList(); });
                            };
                            ScreenModel.prototype.deleteFlowMenu = function () {
                                var vm = this;
                                if (!vm.selectedFlowMenuId()) {
                                    return;
                                }
                                var oldIndex = _.findIndex(vm.flowMenuList(), { flowMenuCode: vm.selectedFlowMenuId() });
                                vm.$dialog.confirm({ messageId: "Msg_18" })
                                    .then(function (result) {
                                    if (result === 'yes') {
                                        // CALL API
                                        vm.$blockui("grayout");
                                        vm.$ajax(API.delete, { flowMenuCode: vm.selectedFlowMenuId() })
                                            // Show message + reload list
                                            .then(function () {
                                            vm.$blockui("clear");
                                            return vm.$dialog.info({ messageId: "Msg_16" });
                                        })
                                            .then(function () { return vm.getFlowMenuList(); })
                                            .then(function () {
                                            if (vm.flowMenuList().length > 0) {
                                                vm.selectAfterDelete(oldIndex);
                                            }
                                            else {
                                                vm.changeToNewMode();
                                            }
                                        })
                                            .fail(function (err) { return vm.$dialog.error({ messageId: err.messageId }); })
                                            .always(function () { return vm.$blockui("clear"); });
                                    }
                                    else {
                                        vm.isNewMode.valueHasMutated();
                                    }
                                });
                            };
                            ScreenModel.prototype.selectAfterDelete = function (deletedIndex) {
                                var vm = this;
                                if (deletedIndex === vm.flowMenuList().length) {
                                    deletedIndex--;
                                }
                                vm.selectedFlowMenuId(vm.flowMenuList()[deletedIndex].flowMenuCode);
                            };
                            ScreenModel = __decorate([
                                bean()
                            ], ScreenModel);
                            return ScreenModel;
                        }(ko.ViewModel));
                        a.ScreenModel = ScreenModel;
                        var FlowMenuModel = /** @class */ (function () {
                            function FlowMenuModel() {
                            }
                            return FlowMenuModel;
                        }());
                        a.FlowMenuModel = FlowMenuModel;
                    })(a = ccg034.a || (ccg034.a = {}));
                })(ccg034 = view.ccg034 || (view.ccg034 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg034.a.vm.js.map