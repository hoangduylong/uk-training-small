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
                var ccg015;
                (function (ccg015) {
                    var b;
                    (function (b) {
                        // URL API backend
                        var API = {
                            findAllTopPageItem: "/toppage/findAll",
                            getTopPageItemDetail: "/toppage/topPageDetail",
                            registerTopPage: "/toppage/create",
                            updateTopPage: "/toppage/update",
                            removeTopPage: "/toppage/remove"
                        };
                        var ScreenModel = /** @class */ (function (_super) {
                            __extends(ScreenModel, _super);
                            function ScreenModel() {
                                var _this = _super !== null && _super.apply(this, arguments) || this;
                                _this.listTopPage = ko.observableArray([]);
                                _this.toppageSelectedCode = ko.observable(null);
                                _this.topPageModel = ko.observable(new TopPageViewModel());
                                _this.topPageModelParam = ko.observable(new TopPageModelParams());
                                _this.columns = ko.observableArray([]);
                                _this.isNewMode = ko.observable(true);
                                _this.isDisableButton = ko.observable(true);
                                _this.selectedId = ko.observable(null);
                                _this.isVisiableButton1 = ko.observable(true);
                                _this.isVisiableButton2 = ko.observable(false);
                                _this.isVisiableButton3 = ko.observable(false);
                                _this.text1 = ko.observable('');
                                _this.text2 = ko.observable('');
                                _this.text3 = ko.observable('');
                                _this.button1Text = ko.observable('');
                                _this.button2Text = ko.observable('');
                                _this.isDisableNewBtn = ko.observable(false);
                                _this.breakNewMode = false;
                                _this.itemList = ko.observableArray([
                                    new ItemModel(0, ''),
                                    new ItemModel(1, ''),
                                    new ItemModel(2, ''),
                                    new ItemModel(3, '')
                                ]);
                                return _this;
                            }
                            ScreenModel.prototype.created = function () {
                                // トップページを選択する
                                var vm = this;
                                vm.columns = ko.observableArray([
                                    { headerText: vm.$i18n("CCG015_11"), width: "50px", key: 'code', dataType: "string", hidden: false },
                                    { headerText: vm.$i18n("CCG015_12"), width: "260px", key: 'nodeText', dataType: "string", formatter: _.escape }
                                ]);
                                var text470px = vm.$i18n("CCG015_62").toString();
                                vm.selectedId.subscribe(function (value) {
                                    var isLayout2or3 = (value === LayoutType.LAYOUT_TYPE_2 || value === LayoutType.LAYOUT_TYPE_3);
                                    vm.button1Text(isLayout2or3 ? vm.$i18n("CCG015_60") : vm.$i18n("CCG015_59"));
                                    vm.button2Text(isLayout2or3 ? vm.$i18n("CCG015_59") : vm.$i18n("CCG015_60"));
                                    // Render layout
                                    if (value === LayoutType.LAYOUT_TYPE_0) {
                                        vm.isVisiableButton1(true);
                                        vm.isVisiableButton2(false);
                                        vm.isVisiableButton3(false);
                                        vm.text1('');
                                        vm.text2('');
                                        vm.text3('');
                                    }
                                    else if (value === LayoutType.LAYOUT_TYPE_1 || value === LayoutType.LAYOUT_TYPE_2) {
                                        vm.isVisiableButton1(true);
                                        vm.isVisiableButton2(true);
                                        vm.isVisiableButton3(false);
                                    }
                                    else {
                                        vm.isVisiableButton1(true);
                                        vm.isVisiableButton2(true);
                                        vm.isVisiableButton3(true);
                                        vm.text1(text470px);
                                        vm.text2('');
                                        vm.text3(text470px);
                                    }
                                    if (value === LayoutType.LAYOUT_TYPE_1) {
                                        vm.text1('');
                                        vm.text2(text470px);
                                        vm.text3('');
                                    }
                                    if (value === LayoutType.LAYOUT_TYPE_2) {
                                        vm.text1(text470px);
                                        vm.text2('');
                                        vm.text3('');
                                    }
                                });
                                vm.loadTopPageList();
                            };
                            ScreenModel.prototype.mounted = function () {
                                var vm = this;
                                vm.selectedId(0);
                                vm.toppageSelectedCode.subscribe(function (selectedTopPageCode) {
                                    if (selectedTopPageCode) {
                                        vm.isNewMode(false);
                                        vm.breakNewMode = false;
                                        vm.$blockui("grayout");
                                        vm.$ajax("".concat(API.getTopPageItemDetail, "/").concat(selectedTopPageCode))
                                            .then(function (data) {
                                            vm.loadTopPageItemDetail(data);
                                            $('.save-error').ntsError('clear');
                                        })
                                            .always(function () { return vm.$blockui("clear"); });
                                        if (selectedTopPageCode !== "") {
                                            $("#inp_name").focus();
                                        }
                                    }
                                    else {
                                        // 新規のトップページを作成する
                                        vm.isNewMode(true);
                                        vm.breakNewMode = true;
                                        vm.topPageModel(new TopPageViewModel());
                                        if (nts.uk.ui.errors.hasError()) {
                                            nts.uk.ui.errors.clearAll();
                                        }
                                    }
                                });
                                vm.isNewMode.subscribe(function (x) {
                                    if (x) {
                                        vm.isDisableButton(true);
                                    }
                                    else {
                                        vm.isDisableButton(false);
                                    }
                                });
                            };
                            ScreenModel.prototype.loadTopPageList = function (selectedCode) {
                                var vm = this;
                                var dfd = $.Deferred();
                                vm.$blockui("grayout");
                                vm.$ajax(API.findAllTopPageItem)
                                    .then(function (data) {
                                    // if data # empty
                                    if (data.length > 0) {
                                        var listTopPage = _.map(data, function (item) { return new Node(item.topPageCode, item.topPageName, null); });
                                        var lstSort = _.orderBy(listTopPage, ["code"], ["asc"]);
                                        vm.listTopPage(lstSort);
                                        var selectToppage = _.find(vm.listTopPage(), function (item) { return item.code === selectedCode; });
                                        vm.isDisableNewBtn(false);
                                        vm.toppageSelectedCode(selectedCode || lstSort[0].code);
                                        vm.topPageModel().topPageName(selectToppage.name);
                                        $("#inp_name").focus();
                                    }
                                    else {
                                        vm.listTopPage([]);
                                        vm.topPageModel(new TopPageViewModel());
                                        vm.isDisableNewBtn(true);
                                        vm.isNewMode(true);
                                        $("#inp_code").focus();
                                    }
                                    dfd.resolve();
                                })
                                    .fail(function (err) { return dfd.fail(err); })
                                    .always(function () { return vm.$blockui("clear"); });
                                return dfd.promise();
                            };
                            //load top page Item
                            ScreenModel.prototype.loadTopPageItemDetail = function (data) {
                                var vm = this;
                                vm.topPageModel().topPageCode(data.topPageCode);
                                vm.topPageModel().topPageName(data.topPageName);
                                vm.topPageModel().layoutDisp(data.layoutDisp);
                                vm.selectedId(data.layoutDisp);
                            };
                            ScreenModel.prototype.collectData = function () {
                                var vm = this;
                                return new TopPageModelParams({
                                    topPageCode: vm.topPageModel().topPageCode(),
                                    topPageName: vm.topPageModel().topPageName(),
                                    layoutDisp: vm.selectedId(),
                                });
                            };
                            ScreenModel.prototype.newTopPage = function () {
                                var vm = this;
                                vm.topPageModel(new TopPageViewModel());
                                vm.isNewMode(true);
                                vm.selectedId(0);
                                this.$nextTick(function () { return $("#inp_code").focus(); });
                                vm.breakNewMode = true;
                                vm.toppageSelectedCode("");
                                if (nts.uk.ui.errors.hasError()) {
                                    nts.uk.ui.errors.clearAll();
                                }
                            };
                            ScreenModel.prototype.saveTopPage = function () {
                                var vm = this;
                                vm.$validate()
                                    .then(function (valid) {
                                    if (valid) {
                                        //check update or create
                                        if (vm.listTopPage().length === 0) {
                                            vm.isNewMode(true);
                                        }
                                        var param_1 = vm.collectData();
                                        if (vm.isNewMode()) {
                                            vm.$blockui('grayout');
                                            vm.$ajax(API.registerTopPage, param_1)
                                                .then(function () {
                                                vm.$blockui("clear");
                                                vm.$dialog.info({ messageId: "Msg_15" });
                                                $("#inp_name").focus();
                                                vm.loadTopPageList(param_1.topPageCode);
                                            })
                                                .fail(function (err) {
                                                vm.$blockui("clear");
                                                vm.$dialog.alert({ messageId: err.messageId, messageParams: err.parameterIds });
                                            });
                                        }
                                        else {
                                            vm.$blockui('grayout');
                                            vm.$ajax(API.updateTopPage, param_1)
                                                .then(function () {
                                                vm.$blockui("clear");
                                                vm.$dialog.info({ messageId: "Msg_15" });
                                                vm.loadTopPageList(param_1.topPageCode);
                                                $("#inp_name").focus();
                                            })
                                                .fail(function (err) {
                                                vm.$blockui("clear");
                                                vm.$dialog.alert({ messageId: err.messageId, messageParams: err.parameterIds });
                                            });
                                        }
                                    }
                                });
                            };
                            ScreenModel.prototype.copyTopPage = function () {
                                var vm = this;
                                var dataCopy = {
                                    topPageCode: vm.topPageModel().topPageCode(),
                                    topPageName: vm.topPageModel().topPageName(),
                                    layoutDisp: vm.topPageModel().layoutDisp()
                                };
                                vm.$window.modal("/view/ccg/015/c/index.xhtml", dataCopy)
                                    .then(function (codeOfNewTopPage) {
                                    if (codeOfNewTopPage) {
                                        vm.loadTopPageList(codeOfNewTopPage);
                                    }
                                });
                            };
                            ScreenModel.prototype.removeTopPage = function () {
                                var vm = this;
                                vm.$dialog.confirm({ messageId: 'Msg_18' })
                                    .then(function (result) {
                                    if (result === 'yes') {
                                        var removeCode = vm.toppageSelectedCode();
                                        var removeIndex_1 = vm.getIndexOfRemoveItem(removeCode);
                                        vm.$blockui("grayout");
                                        vm.$ajax(API.removeTopPage, { topPageCode: vm.toppageSelectedCode() })
                                            .then(function () {
                                            // delete success
                                            vm.$blockui("clear");
                                            vm.$dialog.info({ messageId: "Msg_16" })
                                                .then(function () {
                                                //remove follow
                                                var lst = vm.listTopPage();
                                                if (lst.length > 0) {
                                                    if (removeIndex_1 === 0) {
                                                        vm.toppageSelectedCode(lst[removeIndex_1 + 1].code);
                                                    }
                                                    else {
                                                        vm.toppageSelectedCode(lst[removeIndex_1 - 1].code);
                                                    }
                                                    vm.loadTopPageList(vm.toppageSelectedCode());
                                                }
                                            });
                                        })
                                            .always(function () { return vm.$blockui("clear"); });
                                    }
                                });
                            };
                            ScreenModel.prototype.getIndexOfRemoveItem = function (code) {
                                var vm = this;
                                var itemIndex;
                                _.forEach(vm.listTopPage(), function (item) {
                                    if (item.code === code) {
                                        itemIndex = item;
                                    }
                                });
                                return vm.listTopPage().indexOf(itemIndex);
                            };
                            // レイアウト設定を起動する
                            ScreenModel.prototype.openDialogButton1 = function () {
                                var vm = this;
                                var frame = (vm.selectedId() === LayoutType.LAYOUT_TYPE_0 || vm.selectedId() === LayoutType.LAYOUT_TYPE_1) ? 1 : 2;
                                var topPageModel = vm.topPageModelParam();
                                topPageModel.topPageCode = vm.topPageModel().topPageCode();
                                topPageModel.topPageName = vm.topPageModel().topPageName();
                                topPageModel.layoutDisp = vm.topPageModel().layoutDisp();
                                vm.topPageModelParam(topPageModel);
                                var dataScreen = {
                                    topPageModel: vm.topPageModelParam(),
                                    frame: frame
                                };
                                if (vm.selectedId() === LayoutType.LAYOUT_TYPE_0 || vm.selectedId() === LayoutType.LAYOUT_TYPE_1) {
                                    vm.$window.modal('/view/ccg/015/d/index.xhtml', dataScreen);
                                }
                                else {
                                    vm.$window.modal('/view/ccg/015/e/index.xhtml', dataScreen);
                                }
                            };
                            // レイアウト設定を起動する
                            ScreenModel.prototype.openDialogButton2 = function () {
                                var vm = this;
                                var frame = (vm.selectedId() === LayoutType.LAYOUT_TYPE_2 || vm.selectedId() === LayoutType.LAYOUT_TYPE_3) ? 1 : 2;
                                var topPageModel = vm.topPageModelParam();
                                topPageModel.topPageCode = vm.topPageModel().topPageCode();
                                topPageModel.topPageName = vm.topPageModel().topPageName();
                                vm.topPageModelParam(topPageModel);
                                var dataScreen = {
                                    topPageModel: vm.topPageModelParam(),
                                    frame: frame
                                };
                                if (vm.selectedId() === LayoutType.LAYOUT_TYPE_2 || vm.selectedId() === LayoutType.LAYOUT_TYPE_3) {
                                    vm.$window.modal('/view/ccg/015/d/index.xhtml', dataScreen);
                                }
                                else {
                                    vm.$window.modal('/view/ccg/015/e/index.xhtml', dataScreen);
                                }
                            };
                            // レイアウト設定を起動する
                            ScreenModel.prototype.openDialogButton3 = function () {
                                var vm = this;
                                var topPageModel = vm.topPageModelParam();
                                topPageModel.topPageCode = vm.topPageModel().topPageCode();
                                topPageModel.topPageName = vm.topPageModel().topPageName();
                                vm.topPageModelParam(topPageModel);
                                var dataScreen = {
                                    topPageModel: vm.topPageModelParam(),
                                    frame: 3
                                };
                                vm.$window.modal('/view/ccg/015/e/index.xhtml', dataScreen);
                            };
                            // プレビューを表示する
                            ScreenModel.prototype.openDialogCCG015F = function () {
                                var vm = this;
                                var topPageModel = vm.topPageModelParam();
                                topPageModel.topPageCode = vm.toppageSelectedCode();
                                topPageModel.topPageName = vm.topPageModel().topPageName();
                                vm.topPageModelParam(topPageModel);
                                var data = {
                                    topPageModel: vm.topPageModelParam(),
                                    selectedId: vm.selectedId(),
                                };
                                var size = {
                                    width: Math.round(Number(window.innerWidth) * 80 / 100),
                                    height: Math.round(Number(window.innerHeight) * 80 / 100),
                                    resizable: false,
                                };
                                vm.$window.modal('/view/ccg/015/f/index.xhtml', data, size);
                            };
                            ScreenModel = __decorate([
                                bean()
                            ], ScreenModel);
                            return ScreenModel;
                        }(ko.ViewModel));
                        b.ScreenModel = ScreenModel;
                        var Node = /** @class */ (function () {
                            function Node(code, name, childs) {
                                var vm = this;
                                vm.code = code;
                                vm.name = name;
                                vm.nodeText = name;
                                vm.childs = childs;
                                vm.custom = 'Random' + new Date().getTime();
                            }
                            return Node;
                        }());
                        b.Node = Node;
                        var TopPageViewModel = /** @class */ (function () {
                            function TopPageViewModel() {
                                this.topPageCode = ko.observable('');
                                this.topPageName = ko.observable('');
                                this.layoutDisp = ko.observable(0);
                            }
                            return TopPageViewModel;
                        }());
                        b.TopPageViewModel = TopPageViewModel;
                        var TopPageModelParams = /** @class */ (function () {
                            function TopPageModelParams(init) {
                                $.extend(this, init);
                            }
                            return TopPageModelParams;
                        }());
                        b.TopPageModelParams = TopPageModelParams;
                        var ItemModel = /** @class */ (function () {
                            function ItemModel(code, name) {
                                this.code = code;
                                this.name = name;
                            }
                            return ItemModel;
                        }());
                        var LayoutType;
                        (function (LayoutType) {
                            LayoutType[LayoutType["LAYOUT_TYPE_0"] = 0] = "LAYOUT_TYPE_0";
                            LayoutType[LayoutType["LAYOUT_TYPE_1"] = 1] = "LAYOUT_TYPE_1";
                            LayoutType[LayoutType["LAYOUT_TYPE_2"] = 2] = "LAYOUT_TYPE_2";
                            LayoutType[LayoutType["LAYOUT_TYPE_3"] = 3] = "LAYOUT_TYPE_3";
                        })(LayoutType || (LayoutType = {}));
                    })(b = ccg015.b || (ccg015.b = {}));
                })(ccg015 = view.ccg015 || (view.ccg015 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg015.b.vm.js.map