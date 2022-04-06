/// <reference path='../../../../lib/nittsu/viewcontext.d.ts' />
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
                var cmm007;
                (function (cmm007) {
                    var i;
                    (function (i) {
                        var ViewModel = /** @class */ (function (_super) {
                            __extends(ViewModel, _super);
                            function ViewModel() {
                                var _this = _super !== null && _super.apply(this, arguments) || this;
                                _this.com_work_Name = ko.observable(null);
                                _this.com_work_Name1 = ko.observable(null);
                                _this.com_work_Name2 = ko.observable(null);
                                _this.com_work_Name3 = ko.observable(null);
                                _this.com_work_Name4 = ko.observable(null);
                                _this.com_work_Name5 = ko.observable(null);
                                return _this;
                            }
                            /**
                            * リソーステキストを取得する
                            */
                            ViewModel.prototype.mounted = function () {
                                var vm = this;
                                vm.$blockui("grayout");
                                i.service.findList()
                                    .then(function (response) {
                                    response.forEach(function (e) {
                                        switch (e.resourceId) {
                                            case SystemResourceId.Com_work_Name:
                                                vm.com_work_Name(e.resourceContent);
                                                break;
                                            case SystemResourceId.Com_work_Name1:
                                                vm.com_work_Name1(e.resourceContent);
                                                break;
                                            case SystemResourceId.Com_work_Name2:
                                                vm.com_work_Name2(e.resourceContent);
                                                break;
                                            case SystemResourceId.Com_work_Name3:
                                                vm.com_work_Name3(e.resourceContent);
                                                break;
                                            case SystemResourceId.Com_work_Name4:
                                                vm.com_work_Name4(e.resourceContent);
                                                break;
                                            case SystemResourceId.Com_work_Name5:
                                                vm.com_work_Name5(e.resourceContent);
                                                break;
                                        }
                                    });
                                })
                                    .always(function () { return vm.$blockui("clear"); });
                            };
                            /**
                            * table [CISMT_I18N_RESOURCE_CUS] に追加する
                            */
                            ViewModel.prototype.save = function () {
                                var vm = this;
                                var listData = [
                                    new SystemResourceDto({
                                        resourceId: 'Work_Name',
                                        resourceContent: vm.com_work_Name(),
                                    }),
                                    new SystemResourceDto({
                                        resourceId: 'Work_Name1',
                                        resourceContent: vm.com_work_Name1(),
                                    }),
                                    new SystemResourceDto({
                                        resourceId: 'Work_Name2',
                                        resourceContent: vm.com_work_Name2(),
                                    }),
                                    new SystemResourceDto({
                                        resourceId: 'Work_Name3',
                                        resourceContent: vm.com_work_Name3(),
                                    }),
                                    new SystemResourceDto({
                                        resourceId: 'Work_Name4',
                                        resourceContent: vm.com_work_Name4(),
                                    }),
                                    new SystemResourceDto({
                                        resourceId: 'Work_Name5',
                                        resourceContent: vm.com_work_Name5(),
                                    })
                                ];
                                var command = new SystemResourceSaveCommand(listData);
                                vm.$blockui("grayout");
                                // Clear error
                                vm.$errors("clear")
                                    // Validate
                                    .then(function () { return vm.$validate(); })
                                    .then(function (valid) {
                                    if (!valid) {
                                        return $.Deferred().reject();
                                    }
                                    // Save
                                    return i.service.save(command);
                                })
                                    .then(function (response) {
                                    vm.$blockui("clear");
                                    vm.$dialog.info({ messageId: "Msg_15" });
                                })
                                    .always(function () { return vm.$blockui("clear"); });
                            };
                            ViewModel = __decorate([
                                bean()
                            ], ViewModel);
                            return ViewModel;
                        }(ko.ViewModel));
                        i.ViewModel = ViewModel;
                        var SystemResourceDto = /** @class */ (function () {
                            function SystemResourceDto(init) {
                                $.extend(this, init);
                            }
                            return SystemResourceDto;
                        }());
                        i.SystemResourceDto = SystemResourceDto;
                        var SystemResourceSaveCommand = /** @class */ (function () {
                            function SystemResourceSaveCommand(data) {
                                this.listData = data;
                            }
                            return SystemResourceSaveCommand;
                        }());
                        i.SystemResourceSaveCommand = SystemResourceSaveCommand;
                        var SystemResourceId;
                        (function (SystemResourceId) {
                            SystemResourceId.Com_work_Name = "Work_Name";
                            SystemResourceId.Com_work_Name1 = "Work_Name1";
                            SystemResourceId.Com_work_Name2 = "Work_Name2";
                            SystemResourceId.Com_work_Name3 = "Work_Name3";
                            SystemResourceId.Com_work_Name4 = "Work_Name4";
                            SystemResourceId.Com_work_Name5 = "Work_Name5";
                        })(SystemResourceId || (SystemResourceId = {}));
                    })(i = cmm007.i || (cmm007.i = {}));
                })(cmm007 = view.cmm007 || (view.cmm007 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm007.i.vm.js.map