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
                var ccg008;
                (function (ccg008) {
                    var a;
                    (function (a) {
                        var screenModel;
                        (function (screenModel) {
                            var request = nts.uk.request;
                            var ntsFile = nts.uk.request.file;
                            var MINUTESTOMILISECONDS = 60000;
                            var D_FORMAT = 'YYYY/MM/DD';
                            var API = {
                                getCache: "screen/com/ccg008/get-cache",
                                getClosure: "screen/com/ccg008/get-closure",
                                getSetting: "screen/com/ccg008/get-setting",
                                getDisplayTopPage: "toppage/getTopPage",
                                extract: "sys/portal/createflowmenu/extractListFileId",
                                getLoginUser: "screen/com/ccg008/get-user"
                            };
                            var TOPPAGE_STORAGE_KEY = ['KTG001_INITIAL_DATA', 'KTG004_YM_PARAM'];
                            var getWidgetName = function (type) {
                                switch (type) {
                                    case 0:
                                        return "ktg-005-a";
                                    case 1:
                                        return "ktg-001-a";
                                    case 2:
                                        return "ktg-004-a";
                                    case 3:
                                        return "ktg-026-a";
                                    case 4:
                                        return "ktg-027-a";
                                    case 5:
                                        return "kdp-001-a";
                                    case 6:
                                        return "ktg031-component";
                                    case 7:
                                        return 'ccg005-component';
                                    default:
                                        return '';
                                }
                            };
                            var WidgetGroupBindingHandler = /** @class */ (function () {
                                function WidgetGroupBindingHandler() {
                                    this.init = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                                        element.removeAttribute('data-bind');
                                        if (element.tagName !== 'DIV') {
                                            element.innerHTML = 'Please use this binding for only [DIV] tag.';
                                            return;
                                        }
                                        var items = valueAccessor();
                                        element.classList.add('widget-group');
                                        element.innerHTML = '<div data-bind="widget: { name: wg.name, params: wg.params }"></div>';
                                        ko.applyBindingsToNode(element, { foreach: { data: items, as: 'wg' } }, bindingContext);
                                        return { controlsDescendantBindings: true };
                                    };
                                }
                                WidgetGroupBindingHandler = __decorate([
                                    handler({
                                        bindingName: 'widget-group',
                                        validatable: true,
                                        virtual: false
                                    })
                                ], WidgetGroupBindingHandler);
                                return WidgetGroupBindingHandler;
                            }());
                            screenModel.WidgetGroupBindingHandler = WidgetGroupBindingHandler;
                            var WidgetFrameBindingHandler = /** @class */ (function () {
                                function WidgetFrameBindingHandler() {
                                    this.init = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                                        element.removeAttribute('data-bind');
                                        if (element.tagName !== 'DIV') {
                                            element.innerHTML = 'Please use this binding for only [DIV] tag.';
                                            return;
                                        }
                                        var url = valueAccessor();
                                        element.classList.add('widget-frame');
                                        ko.computed({
                                            read: function () {
                                                var src = ko.unwrap(url);
                                                if (!src) {
                                                    element.innerHTML = '';
                                                }
                                                else {
                                                    if (_.isString(src)) {
                                                        element.innerHTML = "<iframe src=\"".concat(src, "\" />");
                                                    }
                                                    else {
                                                        var fileId = src.fileId, isFlowmenu = src.isFlowmenu;
                                                        if (!!fileId) {
                                                            if (isFlowmenu) {
                                                                viewModel
                                                                    .$ajax("com", "/sys/portal/createflowmenu/extract/".concat(fileId))
                                                                    .then(function (res) {
                                                                    var frame = document.createElement('iframe');
                                                                    $('.widget-center').append(frame);
                                                                    var doc = frame.contentDocument || frame.contentWindow.document;
                                                                    doc.body.innerHTML = res.htmlContent;
                                                                    doc.body.setAttribute('style', 'overflow: auto; position: relative;');
                                                                    nts.uk.com.view.ccg034.share.model.customload.loadLimitedLabelForIframe();
                                                                });
                                                            }
                                                            else {
                                                                element.innerHTML = "<iframe src=\"".concat(ntsFile.liveViewUrl(fileId, 'index.htm'), "\"></iframe>");
                                                            }
                                                        }
                                                    }
                                                }
                                            },
                                            disposeWhenNodeIsRemoved: element
                                        });
                                        return { controlsDescendantBindings: true };
                                    };
                                }
                                WidgetFrameBindingHandler = __decorate([
                                    handler({
                                        bindingName: 'widget-frame',
                                        validatable: true,
                                        virtual: false
                                    })
                                ], WidgetFrameBindingHandler);
                                return WidgetFrameBindingHandler;
                            }());
                            screenModel.WidgetFrameBindingHandler = WidgetFrameBindingHandler;
                            var ViewModel = /** @class */ (function (_super) {
                                __extends(ViewModel, _super);
                                function ViewModel() {
                                    var _this = _super.call(this) || this;
                                    _this.closureId = ko.observable(1);
                                    _this.lstClosure = ko.observableArray([]);
                                    _this.reloadInterval = ko.observable(0);
                                    _this.paramWidgetLayout2 = ko.observableArray([]);
                                    _this.paramWidgetLayout3 = ko.observableArray([]);
                                    _this.paramIframe1 = ko.observable();
                                    _this.dataToppage = ko.observable(null);
                                    _this.layoutDisplayType = ko.observable(null);
                                    _this.widgetLeft = ko.observableArray([]);
                                    _this.widgetCenter = ko.observable(null);
                                    _this.widgetRight = ko.observableArray([]);
                                    _this.startDateInClosure = ko.observable('');
                                    _this.startDate = ko.observable('');
                                    _this.endDate = ko.observable('');
                                    _this.itemLayoutA1_7 = ko.computed(function () {
                                        return _this.$i18n('CCG008_17', ["".concat(_this.startDate()), "".concat(_this.endDate())]);
                                    });
                                    _this.reload = null;
                                    var vm = _this;
                                    var fromScreen = __viewContext.transferred.value;
                                    if (fromScreen && fromScreen.screen && fromScreen.screen === 'login') {
                                        // Remove all cache of KTG001 AND KTG004 Widget
                                        _.forEach(TOPPAGE_STORAGE_KEY, function (key) { return vm.$window.storage(key, null); });
                                        // Clear fromScreen
                                        uk.sessionStorage.removeItem('nts.uk.request.STORAGE_KEY_TRANSFER_DATA');
                                    }
                                    vm.classLayoutName = ko.computed({
                                        read: function () {
                                            var ltpy = ko.unwrap(vm.layoutDisplayType);
                                            return "layout-type-".concat(ltpy);
                                        }
                                    });
                                    var refreshLayout = function () {
                                        var restoreKtg026 = vm.$window.storage('KTG026_INITIAL_DATA').then(function (rs) {
                                            if (rs) {
                                                rs.isRefresh = true;
                                                vm.$window.storage('KTG026_INITIAL_DATA', rs);
                                            }
                                        });
                                        var restoreKtg027 = vm.$window.storage('KTG027_INITIAL_DATA').then(function (rs) {
                                            if (rs) {
                                                rs.isRefresh = true;
                                                vm.$window.storage('KTG027_INITIAL_DATA', rs);
                                            }
                                        });
                                        -$.when(restoreKtg026, restoreKtg027).then(function () {
                                            vm.callApiTopPage();
                                        });
                                    };
                                    vm.reloadInterval
                                        .subscribe(function (data) {
                                        var minutes = vm.getMinutes(data);
                                        var miliSeconds = minutes * MINUTESTOMILISECONDS;
                                        clearInterval(vm.reload);
                                        if (data !== 0) {
                                            vm.reload = setInterval(function () {
                                                var widgetLeft = vm.widgetLeft();
                                                var widgetRight = vm.widgetRight();
                                                if (vm.widgetLeft().length > 0) {
                                                    vm.widgetLeft([]);
                                                    vm.widgetLeft(widgetLeft);
                                                }
                                                if (vm.widgetRight().length > 0) {
                                                    vm.widgetRight([]);
                                                    vm.widgetRight(widgetRight);
                                                }
                                            }, miliSeconds);
                                        }
                                    });
                                    return _this;
                                }
                                ViewModel.prototype.created = function () {
                                    var vm = this;
                                    var isEmployee = vm.$user.isEmployee;
                                    var GLOGIN = vm.$ajax("com", API.getLoginUser);
                                    var GCAHCE = isEmployee ? vm.$ajax("com", API.getCache) : $.Deferred().resolve(null);
                                    var GSETTING = isEmployee ? vm.$ajax("com", API.getSetting) : $.Deferred().resolve(null);
                                    var transferData = (__viewContext.transferred || { value: undefined }).value;
                                    var _a = transferData || { screen: 'other', topPageCode: '' }, screen = _a.screen, topPageCode = _a.topPageCode;
                                    vm.$blockui('grayout')
                                        .then(function () { return $.when(GLOGIN, GSETTING, GCAHCE); })
                                        .then(function (user, setting, cache) {
                                        if (setting) {
                                            if (setting.reloadInterval) {
                                                vm.reloadInterval(setting.reloadInterval);
                                            }
                                            vm.topPageSetting = setting;
                                        }
                                        //var fromScreen = "login"; 
                                        if (cache) {
                                            if (screen == 'login') {
                                                vm.$window
                                                    .storage("cache", cache)
                                                    .then(function () {
                                                    vm.$window
                                                        .storage('cache')
                                                        .then(function (obj) {
                                                        if (obj) {
                                                            vm.closureId(obj.closureId);
                                                            vm.$window.shared('cache', obj);
                                                        }
                                                        else {
                                                            vm.closureId(1);
                                                        }
                                                    });
                                                    vm.dataToppage(null);
                                                    vm.startDateInClosure(cache.processDate);
                                                    var params = {
                                                        closureId: cache.closureId,
                                                        processDate: parseInt(vm.startDateInClosure())
                                                    };
                                                    vm.$ajax("com", API.getClosure, params).then(function (data) {
                                                        vm.startDate(moment.utc(data.startDate).format('MM/DD'));
                                                        vm.endDate(moment.utc(data.endDate).format('MM/DD'));
                                                    });
                                                });
                                            }
                                            else {
                                                vm.$window.storage("cache").then(function (obj) {
                                                    console.log(obj);
                                                    vm.dataToppage(null);
                                                    vm.startDateInClosure(cache.processDate);
                                                    vm.closureId(obj.closureId);
                                                    var params = {
                                                        closureId: cache.closureId,
                                                        processDate: parseInt(vm.startDateInClosure())
                                                    };
                                                    vm.$ajax("com", API.getClosure, params).then(function (data) {
                                                        vm.startDate(moment.utc(data.startDate).format('MM/DD'));
                                                        vm.endDate(moment.utc(data.endDate).format('MM/DD'));
                                                    });
                                                });
                                            }
                                        }
                                    })
                                        .always(function () { return vm.$blockui("clear"); });
                                };
                                ViewModel.prototype.mounted = function () {
                                    var vm = this;
                                    vm.callApiTopPage();
                                    $(vm.$el)
                                        .removeAttr('data-bind')
                                        .find('[data-bind]')
                                        .removeAttr('data-bind');
                                };
                                ViewModel.prototype.callApiTopPage = function () {
                                    var vm = this;
                                    var qs = request.QueryString;
                                    var toppagecode = qs.parseUrl(location.href).items.toppagecode;
                                    var transferData = (__viewContext.transferred || { value: undefined }).value;
                                    var _a = transferData || { screen: 'other', topPageCode: '' }, screen = _a.screen, topPageCode = _a.topPageCode;
                                    // clear layout
                                    vm.layoutDisplayType(null);
                                    // clear widget data
                                    vm.widgetLeft([]);
                                    // vm.widgetCenter(null);
                                    vm.widgetRight([]);
                                    vm
                                        .$blockui('grayout')
                                        .then(function () { return vm.$ajax("com", API.getSetting); })
                                        .then(function (topPageSetting) {
                                        vm
                                            .$ajax("com", API.getDisplayTopPage, {
                                            topPageSetting: topPageSetting,
                                            fromScreen: screen || 'other',
                                            topPageCode: topPageCode || toppagecode || '',
                                        })
                                            .then(function (data) {
                                            // load widget data
                                            vm.getToppage(data, screen);
                                        });
                                    })
                                        .always(function () { return vm.$blockui("clear"); });
                                };
                                ViewModel.prototype.getToppage = function (data, screen) {
                                    if (screen === void 0) { screen = 'other'; }
                                    var vm = this;
                                    var topPageSetting = vm.topPageSetting, closureId = vm.closureId;
                                    var displayTopPage = data.displayTopPage, standardMenu = data.standardMenu;
                                    var loadWidget = function () {
                                        if (!displayTopPage) {
                                            return;
                                        }
                                        var layout1 = displayTopPage.layout1, layout2 = displayTopPage.layout2, layout3 = displayTopPage.layout3, urlLayout1 = displayTopPage.urlLayout1, layoutDisplayType = displayTopPage.layoutDisplayType;
                                        var layout2Widget = function (settings) {
                                            return _
                                                .chain(settings)
                                                .orderBy(['order', 'asc'])
                                                .map(function (_a) {
                                                var widgetType = _a.widgetType;
                                                return ({
                                                    name: getWidgetName(widgetType),
                                                    params: {
                                                        closureId: ko.unwrap(closureId),
                                                    }
                                                });
                                            })
                                                .value();
                                        };
                                        if (urlLayout1) {
                                            vm.widgetCenter(urlLayout1);
                                        }
                                        else {
                                            if (layout1) {
                                                var first = layout1[0];
                                                if (first) {
                                                    vm.widgetCenter(first);
                                                }
                                            }
                                        }
                                        switch (layoutDisplayType) {
                                            default:
                                            case 0:
                                                // clear widgets
                                                vm.widgetLeft([]);
                                                vm.widgetRight([]);
                                                break;
                                            case 1:
                                                // clear widget of left group
                                                vm.widgetLeft([]);
                                                var rightWidgets = layout2Widget(layout2);
                                                vm.widgetRight(rightWidgets);
                                                break;
                                            case 2:
                                                var leftWidgets = layout2Widget(layout2);
                                                vm.widgetLeft(leftWidgets);
                                                // clear widget of right group
                                                vm.widgetRight([]);
                                                break;
                                            case 3:
                                                var firstWidgets = layout2Widget(layout2);
                                                var thirstWidgets = layout2Widget(layout3);
                                                vm.widgetLeft(firstWidgets);
                                                vm.widgetRight(thirstWidgets);
                                                break;
                                        }
                                        var showSwitchLayout2 = [];
                                        var showSwitchLayout3 = [];
                                        if (layout2) {
                                            showSwitchLayout2 = _.filter(layout2, function (_a) {
                                                var widgetType = _a.widgetType;
                                                return [0, 1, 2, 3, 4].indexOf(widgetType) > -1;
                                            });
                                        }
                                        if (layout3) {
                                            showSwitchLayout3 = _.filter(layout3, function (_a) {
                                                var widgetType = _a.widgetType;
                                                return [0, 1, 2, 3, 4].indexOf(widgetType) > -1;
                                            });
                                            var showClosure = _.filter(layout3, function (_a) {
                                                var widgetType = _a.widgetType;
                                                return widgetType === 1;
                                            });
                                        }
                                        var setScrollTop = setInterval(function () {
                                            if ($('.widget-container').length === vm.widgetLeft().length + vm.widgetRight().length) {
                                                $('.widget-group').scrollTop(0);
                                                clearInterval(setScrollTop);
                                            }
                                        }, 100);
                                    };
                                    if (screen === 'login') {
                                        var menuClassification = topPageSetting.menuClassification, loginMenuCode = topPageSetting.loginMenuCode;
                                        if (menuClassification !== MenuClassification.TopPage && loginMenuCode !== '0000') {
                                            var url = standardMenu.url;
                                            if (url) {
                                                var _a = url.split('web/'), res = _a[1];
                                                if (!!res) {
                                                    // show standardmenu
                                                    var topPageUrl = "view/ccg/008/a/index.xhtml";
                                                    if (topPageUrl !== res.trim()) {
                                                        if (_.includes(url, ".at.")) {
                                                            if (!!standardMenu.queryString && standardMenu.queryString.length > 0) {
                                                                vm.$jump('at', "/".concat(res, "?").concat(standardMenu.queryString));
                                                            }
                                                            else {
                                                                vm.$jump('at', "/".concat(res));
                                                            }
                                                        }
                                                        else {
                                                            if (!!standardMenu.queryString && standardMenu.queryString.length > 0) {
                                                                vm.$jump('com', "/".concat(res, "?").concat(standardMenu.queryString));
                                                            }
                                                            else {
                                                                vm.$jump('com', "/".concat(res));
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        else {
                                            loadWidget();
                                        }
                                    }
                                    else {
                                        loadWidget();
                                    }
                                    if (displayTopPage) {
                                        var layout2 = displayTopPage.layout2, layoutDisplayType = displayTopPage.layoutDisplayType;
                                        vm.layoutDisplayType(layoutDisplayType);
                                    }
                                };
                                ViewModel.prototype.getMinutes = function (value) {
                                    return [0, 1, 5, 10, 20, 30, 40, 50, 60][value] || 0;
                                };
                                ViewModel = __decorate([
                                    bean()
                                ], ViewModel);
                                return ViewModel;
                            }(ko.ViewModel));
                            screenModel.ViewModel = ViewModel;
                            var ItemCbbModel = /** @class */ (function () {
                                function ItemCbbModel(closureId, closureName) {
                                    this.closureId = closureId;
                                    this.closureName = closureName;
                                }
                                return ItemCbbModel;
                            }());
                            screenModel.ItemCbbModel = ItemCbbModel;
                            var DataTopPage = /** @class */ (function () {
                                function DataTopPage(init) {
                                    $.extend(this, init);
                                }
                                return DataTopPage;
                            }());
                            screenModel.DataTopPage = DataTopPage;
                            var DisplayInTopPage = /** @class */ (function () {
                                function DisplayInTopPage(init) {
                                    $.extend(this, init);
                                }
                                return DisplayInTopPage;
                            }());
                            screenModel.DisplayInTopPage = DisplayInTopPage;
                            var WidgetSettingDto = /** @class */ (function () {
                                function WidgetSettingDto(init) {
                                    $.extend(this, init);
                                }
                                return WidgetSettingDto;
                            }());
                            screenModel.WidgetSettingDto = WidgetSettingDto;
                            var FlowMenuOutputCCG008 = /** @class */ (function () {
                                function FlowMenuOutputCCG008(init) {
                                    $.extend(this, init);
                                }
                                return FlowMenuOutputCCG008;
                            }());
                            screenModel.FlowMenuOutputCCG008 = FlowMenuOutputCCG008;
                            var StandardMenuDto = /** @class */ (function () {
                                function StandardMenuDto(init) {
                                    $.extend(this, init);
                                }
                                return StandardMenuDto;
                            }());
                            screenModel.StandardMenuDto = StandardMenuDto;
                            var LogSettingDisplayDto = /** @class */ (function () {
                                function LogSettingDisplayDto() {
                                }
                                return LogSettingDisplayDto;
                            }());
                            screenModel.LogSettingDisplayDto = LogSettingDisplayDto;
                            var ItemLayout = /** @class */ (function () {
                                function ItemLayout(init) {
                                    $.extend(this, init);
                                }
                                return ItemLayout;
                            }());
                            screenModel.ItemLayout = ItemLayout;
                            var MenuClassification;
                            (function (MenuClassification) {
                                /**0:標準 */
                                MenuClassification[MenuClassification["Standard"] = 0] = "Standard";
                                /**1:任意項目申請 */
                                MenuClassification[MenuClassification["OptionalItemApplication"] = 1] = "OptionalItemApplication";
                                /**2:携帯 */
                                MenuClassification[MenuClassification["MobilePhone"] = 2] = "MobilePhone";
                                /**3:タブレット */
                                MenuClassification[MenuClassification["Tablet"] = 3] = "Tablet";
                                /**4:コード名称 */
                                MenuClassification[MenuClassification["CodeName"] = 4] = "CodeName";
                                /**5:グループ会社メニュー */
                                MenuClassification[MenuClassification["GroupCompanyMenu"] = 5] = "GroupCompanyMenu";
                                /**6:カスタマイズ */
                                MenuClassification[MenuClassification["Customize"] = 6] = "Customize";
                                /**7:オフィスヘルパー稟議書*/
                                MenuClassification[MenuClassification["OfficeHelper"] = 7] = "OfficeHelper";
                                /**8:トップページ*/
                                MenuClassification[MenuClassification["TopPage"] = 8] = "TopPage";
                                /**9:スマートフォン*/
                                MenuClassification[MenuClassification["SmartPhone"] = 9] = "SmartPhone";
                            })(MenuClassification = screenModel.MenuClassification || (screenModel.MenuClassification = {}));
                        })(screenModel = a.screenModel || (a.screenModel = {}));
                    })(a = ccg008.a || (ccg008.a = {}));
                })(ccg008 = view.ccg008 || (view.ccg008 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg008.a.vm.js.map