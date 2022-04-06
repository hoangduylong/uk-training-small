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
        var pr;
        (function (pr) {
            var view;
            (function (view) {
                var ccg015;
                (function (ccg015) {
                    var c;
                    (function (c) {
                        // URL API backend
                        var API = {
                            copyPath: "toppage/copyTopPage",
                            copyLayout: "toppage/copyLayout"
                        };
                        var ScreenModel = /** @class */ (function (_super) {
                            __extends(ScreenModel, _super);
                            function ScreenModel() {
                                var _this = _super !== null && _super.apply(this, arguments) || this;
                                _this.parentTopPageCode = ko.observable(null);
                                _this.parentTopPageName = ko.observable(null);
                                _this.parentLayoutId = ko.observable(0);
                                _this.newTopPageCode = ko.observable("");
                                _this.newTopPageName = ko.observable("");
                                _this.isDuplicateCode = ko.observable(false);
                                _this.check = ko.observable(false);
                                return _this;
                            }
                            ScreenModel.prototype.created = function (params) {
                                var vm = this;
                                if (params && params.topPageCode) {
                                    vm.parentTopPageCode = ko.observable(params.topPageCode);
                                }
                                if (params && params.topPageName) {
                                    vm.parentTopPageName = ko.observable(params.topPageName);
                                }
                                if (params && params.layoutDisp) {
                                    vm.parentLayoutId(params.layoutDisp);
                                }
                            };
                            ScreenModel.prototype.mounted = function () {
                                $("#inp-code").focus();
                            };
                            ScreenModel.prototype.closeDialog = function () {
                                var vm = this;
                                vm.$window.close();
                            };
                            ScreenModel.prototype.copyTopPage = function () {
                                var vm = this;
                                var data = new TopPageModel({
                                    topPageCode: vm.newTopPageCode(),
                                    topPageName: vm.newTopPageName(),
                                    layoutDisp: vm.parentLayoutId(),
                                    isCheckOverwrite: vm.check(),
                                    copyCode: vm.parentTopPageCode(),
                                });
                                vm.$blockui("grayout");
                                vm.$ajax(API.copyPath, data)
                                    .then(function () {
                                    vm.$blockui("clear");
                                    vm.$dialog.info({ messageId: "Msg_20" })
                                        .then(function () { return vm.$window.close(vm.newTopPageCode()); });
                                })
                                    .fail(function (res) {
                                    vm.$blockui("clear");
                                    vm.$dialog.alert({ messageId: res.messageId, messageParams: res.parameterIds })
                                        .then(function () { return $("#inp-code").focus(); });
                                });
                            };
                            ScreenModel = __decorate([
                                bean()
                            ], ScreenModel);
                            return ScreenModel;
                        }(ko.ViewModel));
                        c.ScreenModel = ScreenModel;
                        var TopPageModel = /** @class */ (function () {
                            function TopPageModel(init) {
                                $.extend(this, init);
                            }
                            return TopPageModel;
                        }());
                        c.TopPageModel = TopPageModel;
                    })(c = ccg015.c || (ccg015.c = {}));
                })(ccg015 = view.ccg015 || (view.ccg015 = {}));
            })(view = pr.view || (pr.view = {}));
        })(pr = uk.pr || (uk.pr = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg015.c.vm.js.map