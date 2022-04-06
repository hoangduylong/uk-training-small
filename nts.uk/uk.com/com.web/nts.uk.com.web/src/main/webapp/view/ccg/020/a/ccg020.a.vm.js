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
                var ccg020;
                (function (ccg020) {
                    var a;
                    (function (a) {
                        var ukText = nts.uk.text;
                        var API = {
                            get10LastResults: "sys/portal/generalsearch/history/get-10-last-result",
                            getByContent: "sys/portal/generalsearch/history/get-by-content",
                            saveHistorySearch: 'sys/portal/generalsearch/history/save',
                            removeHistorySearch: 'sys/portal/generalsearch/history/remove',
                            getAvatar: 'ctx/bs/person/avatar/get',
                            isDisplayWarning: 'ctx/sys/gateway/system/is-display-warning',
                            isDisplayNewNotice: 'sys/portal/notice/is-new-notice',
                            checkSearchManual: 'sys/portal/generalsearch/check-search-manual'
                        };
                        var CCG020Screen = /** @class */ (function (_super) {
                            __extends(CCG020Screen, _super);
                            function CCG020Screen() {
                                var _this = _super !== null && _super.apply(this, arguments) || this;
                                _this.treeMenu = ko.observableArray([]);
                                _this.treeMenuResult = ko.observableArray([]);
                                _this.dataDisplay = ko.observableArray([]);
                                _this.generalSearchHistory = ko.observable(null);
                                _this.valueSearch = ko.observable('');
                                _this.searchPlaceholder = ko.observable();
                                _this.searchCategory = ko.observable(0);
                                _this.searchCategoryList = ko.observableArray([]);
                                _this.isDisplayWarningMsg = ko.observable(false);
                                _this.isDisplayNewNotice = ko.observable(false);
                                _this.isEmployee = ko.computed(function () { return __viewContext.user.isEmployee; });
                                _this.warningMsg = ko.observable('');
                                return _this;
                            }
                            CCG020Screen.prototype.created = function () {
                                var vm = this;
                                vm.checkCanSearchManual();
                                vm.searchPlaceholder(vm.$i18n('CCG002_6'));
                            };
                            CCG020Screen.prototype.mounted = function () {
                                var vm = this;
                                vm.addSearchBar();
                                vm.getListMenu();
                                $('#radio-search-category').on('click', function () {
                                    $("#popup-search-category").ntsPopup("hide");
                                });
                                vm.searchCategory.subscribe(function (value) {
                                    vm.searchPlaceholder(value === 0 ? vm.$i18n('CCG002_6') : vm.$i18n('CCG002_7'));
                                });
                                $("#search-icon").on('click', function () {
                                    $("#popup-search-category").ntsPopup("toggle");
                                });
                                $("#ccg002-arrow-icon").on('click', function () {
                                    $("#popup-search-category").ntsPopup("toggle");
                                });
                                $(window).on('wd.setAvatar', function () { return vm.getAvatar(); });
                            };
                            CCG020Screen.prototype.getAvatar = function () {
                                var vm = this;
                                var setAvatarByName = function () {
                                    return vm.$ajax('com', '/sys/portal/webmenu/username')
                                        .then(function (username) {
                                        $('<div/>')
                                            .attr('id', 'avatar_id_ccg020')
                                            .text(username.replace(/\s/g, '').substring(0, 2))
                                            .appendTo($('#notice-msg'));
                                    });
                                };
                                if (!__viewContext.user.isEmployee) {
                                    setAvatarByName();
                                    return;
                                }
                                vm.$ajax('com', API.getAvatar)
                                    .then(function (data) {
                                    if (data && data.fileId !== null) {
                                        $('<img/>')
                                            .attr('id', 'img-avatar')
                                            .attr('src', nts.uk.request.liveView(data.fileId))
                                            .appendTo($('#notice-msg'));
                                        $('#search-bar').attr('style', 'position: relative;');
                                    }
                                    else {
                                        setAvatarByName();
                                    }
                                    $(window).trigger('wd.resize');
                                });
                            };
                            CCG020Screen.prototype.initWarningMsg = function () {
                                $('.ccg020-warning').ntsPopup({
                                    showOnStart: false,
                                    dismissible: true,
                                    position: { of: $('#master-wrapper') }
                                });
                            };
                            CCG020Screen.prototype.addEventClickWarningBtn = function () {
                                var vm = this;
                                vm.$ajax('com', 'ctx/sys/gateway/system/is-display-warning').then(function (response) {
                                    if (!response || !response.display) {
                                        $('.ccg020-warning').ntsPopup('hide');
                                        return;
                                    }
                                    vm.warningMsg(response.message);
                                    $('.ccg020-warning').ntsPopup('toggle');
                                });
                            };
                            /* Screen CCG002 */
                            CCG020Screen.prototype.addSearchBar = function () {
                                $('#popup-result').ntsPopup({
                                    showOnStart: false,
                                    dismissible: true,
                                    position: {
                                        my: 'right top',
                                        at: 'right bottom',
                                        of: '#ccg002-panel'
                                    }
                                });
                                $('#popup-search').ntsPopup({
                                    showOnStart: false,
                                    dismissible: true,
                                    position: {
                                        my: 'left top',
                                        at: 'left bottom',
                                        of: '#search-input'
                                    }
                                });
                                $('#popup-search-category').ntsPopup({
                                    showOnStart: false,
                                    dismissible: false,
                                    position: {
                                        my: 'right top',
                                        at: 'right bottom',
                                        of: '#ccg002-arrow-icon'
                                    }
                                });
                                $('#popup-result #list-box').on('selectionChanging', function (event) {
                                    window.location.href = event.detail.url;
                                });
                            };
                            CCG020Screen.prototype.getListMenu = function () {
                                var vm = this;
                                var menuSet = JSON.parse(uk.sessionStorage.getItem('nts.uk.session.MENU_SET').value);
                                var treeMenu = _.flatMap(menuSet, function (i) { return _.flatMap(i.menuBar, function (ii) { return _.flatMap(ii.titleMenu, function (iii) { return iii.treeMenu; }); }); });
                                // Ver1: queryStringがNotEmptyの場合：URL　＝　url　+　’?’　+　queryString
                                _.forEach(treeMenu, function (item) { return item.url = !_.isEmpty(item.queryString) ? "".concat(item.url, "?").concat(item.queryString) : item.url; });
                                treeMenu = _.uniqBy(treeMenu, 'url');
                                _.forEach(treeMenu, function (item) {
                                    item.name = item.displayName === item.defaultName
                                        ? item.displayName
                                        : "".concat(item.displayName, " (").concat(item.defaultName, ")");
                                });
                                vm.treeMenu(treeMenu);
                            };
                            CCG020Screen.prototype.eventClickSearch = function () {
                                var vm = this;
                                vm.get10LastResults();
                                $('#popup-search').ntsPopup('show');
                                $("#popup-search-category").ntsPopup("hide");
                            };
                            CCG020Screen.prototype.submit = function () {
                                var vm = this;
                                $('#list-box').remove();
                                $('#popup-search').ntsPopup('hide');
                                if (_.isEmpty(vm.treeMenu())) {
                                    vm.getListMenu();
                                }
                                vm.treeMenuResult([]);
                                vm.$validate('#search-input')
                                    .then(function (valid) {
                                    if (!valid) {
                                        return;
                                    }
                                    if (vm.valueSearch() !== '') {
                                        var valueSearch = vm.valueSearch();
                                        if (ukText.countHalf(valueSearch) > 50) {
                                            vm.valueSearch(vm.subString(valueSearch, 50));
                                        }
                                        vm.treeMenuResult(vm.filterItems(vm.valueSearch(), vm.treeMenu()));
                                        var $tableResult_1 = $('<div/>').attr('id', 'list-box');
                                        var list = vm.treeMenuResult();
                                        if (list.length > 0) {
                                            vm.addHistoryResult();
                                            $tableResult_1.append($('<p/>')
                                                .addClass('result-search custom-limited-label')
                                                .text(nts.uk.text.format(nts.uk.resource.getText('CCG002_8'), vm.valueSearch())));
                                            _.forEach(list, function (item) {
                                                var $ul = $('<a/>')
                                                    .addClass('result-search custom-limited-label blue-link-ccg020')
                                                    .attr('href', item.url)
                                                    .text(item.name);
                                                $tableResult_1.append($ul);
                                            });
                                        }
                                        else {
                                            $tableResult_1.text(nts.uk.resource.getText('CCG002_9'));
                                        }
                                        $('#popup-result')
                                            .append($tableResult_1)
                                            .ntsPopup('show');
                                    }
                                });
                            };
                            CCG020Screen.prototype.subString = function (value, length) {
                                var maxCountHalfSizeCharacter = length;
                                var valueTemp = "";
                                var valueSplip = value.split("");
                                valueSplip.forEach(function (character) {
                                    maxCountHalfSizeCharacter -= ukText.countHalf(character);
                                    if (maxCountHalfSizeCharacter >= 0) {
                                        valueTemp += character;
                                    }
                                });
                                return valueTemp;
                            };
                            CCG020Screen.prototype.addHistoryResult = function () {
                                var vm = this;
                                var command = new GeneralSearchHistoryCommand({
                                    searchCategory: vm.searchCategory(),
                                    contents: vm.valueSearch()
                                });
                                vm.$ajax('com', API.saveHistorySearch, command)
                                    .then(function () { return vm.get10LastResults(); });
                            };
                            CCG020Screen.prototype.removeHistoryResult = function (command) {
                                var vm = this;
                                vm.$ajax('com', API.removeHistorySearch, command)
                                    .then(function () { return vm.get10LastResults(); });
                            };
                            CCG020Screen.prototype.get10LastResults = function () {
                                var vm = this;
                                $('#list-box-search').remove();
                                vm.$ajax('com', "".concat(API.get10LastResults, "/").concat(vm.searchCategory()))
                                    .then(function (response) {
                                    vm.dataDisplay(response);
                                    vm.displayResultSearchHistory();
                                });
                            };
                            CCG020Screen.prototype.displayResultSearchHistory = function () {
                                var vm = this;
                                var $tableSearch = $('<ul/>').attr('id', 'list-box-search');
                                var list = vm.dataDisplay();
                                if (list.length > 0) {
                                    _.forEach(list, function (item) {
                                        var $iconClose = $('<i/>')
                                            .attr('id', item.contents)
                                            .addClass('icon icon-close hide-class')
                                            .attr('style', 'float: right;');
                                        var $textLi = $('<span/>')
                                            .addClass('text-li custom-limited-label')
                                            .text(item.contents);
                                        var $li = $('<li/>')
                                            .addClass('result-search-history')
                                            .append($textLi)
                                            .append($iconClose)
                                            .on('click', function (event) { return vm.selectItemSearch(item); })
                                            .appendTo($tableSearch)
                                            .hover(function () {
                                            $("#".concat(item.contents)).removeClass('hide-class');
                                        }, function () {
                                            $("#".concat(item.contents)).addClass('hide-class');
                                        });
                                        $iconClose.hover(function () {
                                            $iconClose.on('click', function (event) { return vm.removeHistoryResult(item); });
                                            $li.off('click');
                                        }, function () {
                                            $iconClose.off('click');
                                            $li.on('click', function (event) { return vm.selectItemSearch(item); });
                                        });
                                    });
                                }
                                else {
                                    $tableSearch.text(nts.uk.resource.getText('CCG002_5'));
                                }
                                var $popup = $('#popup-search');
                                $popup.append($tableSearch);
                            };
                            CCG020Screen.prototype.selectItemSearch = function (data) {
                                var vm = this;
                                vm.valueSearch(data.contents);
                                $('#popup-search').ntsPopup('hide');
                                vm.submit();
                            };
                            CCG020Screen.prototype.filterItems = function (query, list) {
                                return _.filter(list, function (el) { return _.includes(_.lowerCase(el.name), _.lowerCase(query)); });
                            };
                            CCG020Screen.prototype.isDisplayWarning = function () {
                                var vm = this;
                                vm.$ajax('com', API.isDisplayWarning)
                                    .then(function (response) {
                                    if (!response || !response.display) {
                                        var ccg020w = $('#ccg020').width();
                                        $('#ccg020').width(ccg020w - 50);
                                    }
                                    vm.isDisplayWarningMsg(response.display);
                                });
                            };
                            CCG020Screen.prototype.checkCanSearchManual = function () {
                                var vm = this;
                                if (!__viewContext.user.companyId) {
                                    return;
                                }
                                vm.$ajax('com', API.checkSearchManual)
                                    .then(function (response) {
                                    if (response) {
                                        vm.searchCategoryList([
                                            { id: 0, name: vm.$i18n('CCG002_2') },
                                            { id: 1, name: vm.$i18n('CCG002_3') }
                                        ]);
                                    }
                                    else {
                                        vm.searchCategoryList([{ id: 0, name: vm.$i18n('CCG002_2') }]);
                                    }
                                });
                            };
                            CCG020Screen = __decorate([
                                component({
                                    name: 'ccg020-component',
                                    template: "<div id=\"ccg020\"><div id=\"search-bar\" class=\"cf\">\n    <ccg003-component></ccg003-component>\n    <div id=\"ccg002-panel\" class=\"panel ccg002-panel\">\n      <i id=\"search-icon\" data-bind=\"ntsIcon: { no: 1, width: 28, height: 25 }\" class=\"img-icon\"></i>\n      <!-- <i id=\"ccg002-arrow-icon\" data-bind=\"ntsIcon: { no: 135, width: 10, height: 23 }\"></i> -->\n    </div>\n    <!-- This input is CCG002 -->\n    <input id=\"search-input\" autocomplete=\"off\" data-bind=\"ntsTextEditor: {\n      value: valueSearch,\n      enterkey: submit,\n      option: ko.mapping.fromJS(new nts.uk.ui.option.TextEditorOption({\n        textmode: 'text',\n        width: '162px',\n        placeholder: searchPlaceholder\n      }))\n    },\n    click: eventClickSearch\" />\n    <div id=\"popup-search-category\">\n      <div id=\"radio-search-category\" data-bind=\"ntsRadioBoxGroup: {\n        options: searchCategoryList,\n        optionsValue: 'id',\n        optionsText: 'name',\n        value: searchCategory,\n        enable: true\n        }\" class=\"ntsControl radio-wrapper reset-element\" tabindex=\"0\">\n      </div>\n    </div>\n    <div id=\"popup-result\"></div>\n    <div id=\"popup-search\"></div>\n  </div>\n  "
                                })
                            ], CCG020Screen);
                            return CCG020Screen;
                        }(ko.ViewModel));
                        a.CCG020Screen = CCG020Screen;
                        var MenuSet = /** @class */ (function () {
                            function MenuSet(init) {
                                $.extend(this, init);
                            }
                            return MenuSet;
                        }());
                        a.MenuSet = MenuSet;
                        var MenuBar = /** @class */ (function () {
                            function MenuBar(init) {
                                $.extend(this, init);
                            }
                            return MenuBar;
                        }());
                        a.MenuBar = MenuBar;
                        var TitleMenu = /** @class */ (function () {
                            function TitleMenu(init) {
                                $.extend(this, init);
                            }
                            return TitleMenu;
                        }());
                        a.TitleMenu = TitleMenu;
                        var TreeMenu = /** @class */ (function () {
                            function TreeMenu(init) {
                                $.extend(this, init);
                            }
                            return TreeMenu;
                        }());
                        a.TreeMenu = TreeMenu;
                        var GeneralSearchHistoryCommand = /** @class */ (function () {
                            function GeneralSearchHistoryCommand(init) {
                                $.extend(this, init);
                            }
                            return GeneralSearchHistoryCommand;
                        }());
                        a.GeneralSearchHistoryCommand = GeneralSearchHistoryCommand;
                        var AvatarDto = /** @class */ (function () {
                            function AvatarDto(init) {
                                $.extend(this, init);
                            }
                            return AvatarDto;
                        }());
                        a.AvatarDto = AvatarDto;
                    })(a = ccg020.a || (ccg020.a = {}));
                })(ccg020 = view.ccg020 || (view.ccg020 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg020.a.vm.js.map