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
                    var c;
                    (function (c) {
                        // URL API backend
                        var API = {
                            getFlowMenu: "sys/portal/createflowmenu/getFlowMenu/{0}",
                            duplicate: "sys/portal/createflowmenu/copy",
                            copyFile: "sys/portal/createflowmenu/copyFile",
                            generateHtml: "sys/portal/createflowmenu/generateHtml",
                        };
                        var ScreenModel = /** @class */ (function (_super) {
                            __extends(ScreenModel, _super);
                            function ScreenModel() {
                                var _this = _super !== null && _super.apply(this, arguments) || this;
                                _this.flowMenuInfo = ko.observable('');
                                _this.flowMenuCode = ko.observable('');
                                _this.flowMenuName = ko.observable('');
                                _this.isChecked = ko.observable(false);
                                return _this;
                            }
                            ScreenModel.prototype.created = function (params) {
                                var vm = this;
                                vm.flowMenu = params;
                                vm.flowMenuInfo("".concat(vm.flowMenu.flowMenuCode, " ").concat(vm.flowMenu.flowMenuName));
                            };
                            ScreenModel.prototype.mounted = function () {
                                $("#C3_3").focus();
                            };
                            ScreenModel.prototype.duplicate = function () {
                                var vm = this;
                                vm.$validate().then(function (valid) {
                                    if (!valid) {
                                        return;
                                    }
                                    if (vm.isChecked()) {
                                        vm.$dialog.confirm({ messageId: 'Msg_64' }).then(function (result) {
                                            if (result === 'yes') {
                                                vm.$blockui("grayout");
                                                vm.performDuplicate()
                                                    .always(function () {
                                                    vm.$blockui("clear");
                                                });
                                            }
                                        });
                                    }
                                    else {
                                        vm.$blockui("grayout");
                                        vm.performFindFlowMenu()
                                            .then(function (res) {
                                            if (res) {
                                                vm.$dialog.error({ messageId: "Msg_3" })
                                                    .then(function () {
                                                    vm.$blockui("clear");
                                                });
                                            }
                                            else {
                                                vm.performDuplicate();
                                            }
                                        })
                                            .always(function () {
                                            vm.$blockui("clear");
                                        });
                                    }
                                });
                            };
                            ScreenModel.prototype.closeDialog = function (data) {
                                if (data === void 0) { data = null; }
                                var vm = this;
                                vm.$window.close(data);
                            };
                            ScreenModel.prototype.performDuplicate = function () {
                                var vm = this;
                                var newFlowMenu = null;
                                // Try copy all the uploaded files and update the layout file
                                return vm.$ajax(API.copyFile, { flowMenuCode: vm.flowMenu.flowMenuCode, newFlowMenuCode: vm.flowMenuCode(), flowMenuName: vm.flowMenuName() })
                                    .then(function (result) {
                                    if (result) {
                                        vm.deleteUnknownData(result.createFlowMenuDto);
                                        newFlowMenu = result.createFlowMenuDto;
                                        return vm.$ajax(API.generateHtml, { flowMenuCode: vm.flowMenuCode(), htmlContent: result.htmlContent })
                                            // 4. Input内容のファイルIDを別のファイルIDで作成する
                                            .then(function (res) { return nts.uk.deferred.repeat(function (conf) { return conf
                                            .task(function () { return nts.uk.request.asyncTask.getInfo(res.taskId)
                                            .done(function (taskResult) {
                                            if (taskResult.succeeded) {
                                                newFlowMenu.fileId = res.taskId;
                                                return vm.$ajax(API.duplicate, { flowMenuCode: vm.flowMenuCode(), createFlowMenu: newFlowMenu });
                                            }
                                        }); })
                                            .while(function (infor) { return infor.pending || infor.running; })
                                            .pause(1000); }); });
                                    }
                                    else {
                                        return vm.$ajax(API.duplicate, { flowMenuCode: vm.flowMenuCode(), createFlowMenu: {
                                                flowMenuCode: vm.flowMenuCode(),
                                                flowMenuName: vm.flowMenuName(),
                                                cid: __viewContext.user.companyId
                                            } });
                                    }
                                })
                                    // Perform save the copied flow menu
                                    .then(function () { return vm.$dialog.info({ messageId: "Msg_15" }); })
                                    .then(function () { return vm.closeDialog(newFlowMenu); })
                                    .fail(function (err) { return vm.$dialog.error({ messageId: err.messageId }); });
                            };
                            ScreenModel.prototype.performFindFlowMenu = function () {
                                var vm = this;
                                return vm.$ajax(nts.uk.text.format(API.getFlowMenu, vm.flowMenuCode()));
                            };
                            /**
                             * Delete duplicate data due to Jackson
                             * @param flowMenu
                             */
                            ScreenModel.prototype.deleteUnknownData = function (flowMenu) {
                                delete flowMenu.arrowSettings;
                                delete flowMenu.fileAttachmentSettings;
                                delete flowMenu.imageSettings;
                                delete flowMenu.labelSettings;
                                delete flowMenu.linkSettings;
                                delete flowMenu.menuSettings;
                            };
                            ScreenModel = __decorate([
                                bean()
                            ], ScreenModel);
                            return ScreenModel;
                        }(ko.ViewModel));
                        c.ScreenModel = ScreenModel;
                        var FlowMenuModel = /** @class */ (function () {
                            function FlowMenuModel() {
                            }
                            return FlowMenuModel;
                        }());
                        c.FlowMenuModel = FlowMenuModel;
                    })(c = ccg034.c || (ccg034.c = {}));
                })(ccg034 = view.ccg034 || (view.ccg034 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg034.c.vm.js.map