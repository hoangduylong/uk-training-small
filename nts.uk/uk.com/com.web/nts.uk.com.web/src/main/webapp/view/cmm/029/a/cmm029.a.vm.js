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
                var cmm029;
                (function (cmm029) {
                    var a;
                    (function (a) {
                        var API = {
                            initDisplay: "com/screen/cmm029/initDisplay",
                            register: "com/screen/cmm029/register",
                        };
                        var ScreenModel = /** @class */ (function (_super) {
                            __extends(ScreenModel, _super);
                            function ScreenModel() {
                                var _this = _super.call(this) || this;
                                _this.selectedTab = ko.observable("tab-1");
                                _this.displayDatas = ko.observableArray([]);
                                var vm = _this;
                                vm.tabs = ko.observableArray([
                                    { id: 'tab-1', title: vm.$i18n("CMM029_3"), content: '.tab-content-1' },
                                    { id: 'tab-2', title: vm.$i18n("CMM029_4"), content: '.tab-content-2' },
                                    { id: 'tab-3', title: vm.$i18n("CMM029_5"), content: '.tab-content-3' },
                                    { id: 'tab-4', title: vm.$i18n("CMM029_6"), content: '.tab-content-4' },
                                ]);
                                vm.useAtrValuesA1 = ko.observableArray([
                                    { value: true, name: vm.$i18n("CMM029_69") },
                                    { value: false, name: vm.$i18n("CMM029_70") },
                                ]);
                                vm.taskOperationMethods = ko.observableArray([
                                    { value: '2', name: vm.$i18n("CMM029_66") },
                                    { value: '0', name: vm.$i18n("CMM029_67") },
                                    { value: '1', name: vm.$i18n("CMM029_68") },
                                ]);
                                vm.enableRegister = ko.computed(function () { return _.includes(["tab-1", "tab-4"], vm.selectedTab()); });
                                return _this;
                            }
                            ScreenModel.prototype.mounted = function () {
                                var vm = this;
                                vm.initDisplay();
                            };
                            // 表示初期データを取得する
                            ScreenModel.prototype.initDisplay = function () {
                                var vm = this;
                                vm.$blockui("grayout");
                                return vm.$ajax(API.initDisplay).then(function (data) { return vm.displayDatas(_.map(data, function (d) { return new DisplayData(d); })); })
                                    .then(function () { return vm.$nextTick(function () { return vm.displayDataOf("CMM029_42").taskOperationMethod.valueHasMutated(); }); })
                                    .always(function () { return vm.$blockui("clear"); });
                            };
                            // 設定機能を登録する
                            ScreenModel.prototype.performRegister = function () {
                                var vm = this;
                                vm.$blockui("grayout");
                                var param = {
                                    datas: ko.toJS(vm.displayDatas())
                                };
                                vm.$ajax(API.register, param).then(function () { return vm.$dialog.info({ messageId: "Msg_15" }); })
                                    .then(function () { return vm.initDisplay(); })
                                    .always(function () { return vm.$blockui("clear"); });
                            };
                            ScreenModel.prototype.performHyperlink = function (element) {
                                var vm = this;
                                var programId = $(element).data("program");
                                var id = $(element).attr("id");
                                var displayData = _.find(vm.displayDatas(), { programId: programId, system: 1 });
                                if (id === "A4_214") {
                                    var temp = _.find(vm.displayDatas(), { programId: "CMM029_42", system: 1 });
                                    if (Number(temp.taskOperationMethod()) !== 1)
                                        return;
                                }
                                if (_.isNil(displayData))
                                    return;
                                if (!nts.uk.text.isNullOrEmpty(displayData.errorMessage)) {
                                    vm.$dialog.error({ messageId: displayData.errorMessage });
                                }
                                else if (!nts.uk.text.isNullOrEmpty(displayData.url)) {
                                    var webApp, url;
                                    // Check if target is in com.web
                                    if (displayData.url.indexOf("/nts.uk.com.web") > -1) {
                                        webApp = "com";
                                        url = displayData.url.replace("/nts.uk.com.web", "");
                                    }
                                    // Check if target is in at.web
                                    else if (displayData.url.indexOf("/nts.uk.at.web") > -1) {
                                        webApp = "at";
                                        url = displayData.url.replace("/nts.uk.at.web", "");
                                    }
                                    vm.$jump(webApp, url);
                                }
                            };
                            ScreenModel.prototype.displayDataOf = function (programId) {
                                var vm = this;
                                return _.find(vm.displayDatas(), { programId: programId });
                            };
                            ScreenModel = __decorate([
                                bean()
                            ], ScreenModel);
                            return ScreenModel;
                        }(ko.ViewModel));
                        a.ScreenModel = ScreenModel;
                        var DisplayData = /** @class */ (function () {
                            function DisplayData(data) {
                                this.system = data.system;
                                this.programId = data.programId;
                                this.url = data.url;
                                this.errorMessage = data.errorMessage;
                                this.taskOperationMethod = ko.observable(String(data.taskOperationMethod));
                                this.useAtr = ko.observable(data.useAtr);
                                this.taskOperationMethod.subscribe(function (value) {
                                    if (Number(value) === 1) {
                                        $("#A4_214").css("cursor", "pointer");
                                    }
                                    else {
                                        $("#A4_214").css("cursor", "auto");
                                    }
                                });
                            }
                            // Return useAtr text for tab 3 and 4
                            DisplayData.prototype.getUseValue = function (element) {
                                var className = $(element).attr("class");
                                if (className.indexOf("manage-remain-number") > -1) {
                                    return this.useAtr() ? "CMM029_71" : "CMM029_72";
                                }
                                else {
                                    return this.useAtr() ? "CMM029_69" : "CMM029_70";
                                }
                            };
                            return DisplayData;
                        }());
                        a.DisplayData = DisplayData;
                    })(a = cmm029.a || (cmm029.a = {}));
                })(cmm029 = view.cmm029 || (view.cmm029 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm029.a.vm.js.map