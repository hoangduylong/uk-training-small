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
var ccg018;
(function (ccg018) {
    var a1;
    (function (a1) {
        var viewmodel;
        (function (viewmodel) {
            var blockUI = nts.uk.ui.block;
            var ScreenModel = /** @class */ (function (_super) {
                __extends(ScreenModel, _super);
                function ScreenModel(baseModel) {
                    var _this = _super.call(this, baseModel) || this;
                    _this.date = ko.observable(moment.utc().toISOString());
                    _this.isVisible = ko.observable(false);
                    _this.listJobTitle = ko.observableArray([]);
                    _this.isNotEmpty = ko.observable(false);
                    _this.referenceDate = nts.uk.resource.getText("CCG018_6");
                    _this.listSwitchDate = ko.observableArray([]);
                    _this.listRoleSet = ko.observableArray([]);
                    _this.lisTopPageRoleSet = ko.observableArray([]);
                    var vm = _this;
                    vm.screenTemplateUrl("../a1/index.xhtml");
                    vm.comboItemsAfterLogin(baseModel.comboItemsAfterLogin);
                    vm.comboItemsAsTopPage(baseModel.comboItemsAsTopPage);
                    vm.categorySet.subscribe(function (newValue) {
                        if (newValue == 0) {
                            $("#width-tbody").addClass("width-tbody");
                        }
                        else {
                            $("#width-tbody").removeClass("width-tbody");
                        }
                    });
                    vm.listSwitchDate(vm.getSwitchDateLists());
                    vm.listRoleSet.subscribe(function (value) { return vm.isNotEmpty(value.length !== 0); });
                    return _this;
                }
                ScreenModel.prototype.start = function () {
                    var vm = this;
                    vm.$grid = $("#grid2");
                    blockUI.grayout();
                    vm.findByCId();
                    a1.service.findAllRoleSet()
                        //ドメインモデル「ロールセット」を取得する
                        .then(function (data) {
                        vm.listRoleSet(data);
                        return a1.service.findAllTopPageRoleSet();
                    })
                        // ドメインモデル「権限別トップページ設定」を取得
                        .then(function (data) {
                        var dataMap = {};
                        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                            var item = data_1[_i];
                            dataMap[item.roleSetCode] = new TopPageRoleSet(item);
                        }
                        var arrayTemp = _.map(vm.listRoleSet(), function (x) {
                            var dataObj = dataMap[x.roleSetCd];
                            if (dataObj) {
                                return new TopPageRoleSet({
                                    roleSetCode: x.roleSetCd,
                                    name: x.roleSetName,
                                    loginMenuCode: dataObj.loginMenuCode,
                                    topMenuCode: dataObj.topMenuCode,
                                    switchingDate: dataObj.switchingDate,
                                    system: dataObj.system,
                                    menuClassification: dataObj.menuClassification
                                });
                            }
                            else {
                                return new TopPageRoleSet({
                                    roleSetCode: x.roleSetCd,
                                    name: x.roleSetName,
                                    loginMenuCode: '',
                                    topMenuCode: '',
                                    switchingDate: 0,
                                    system: 0,
                                    menuClassification: 0
                                });
                            }
                        });
                        vm.initGrid(arrayTemp);
                    })
                        .always(function () {
                        blockUI.clear();
                    });
                };
                ScreenModel.prototype.findByCId = function () {
                    var vm = this;
                    var dfd = $.Deferred();
                    a1.service.findByCId()
                        .then(function (data) {
                        if (!(!!data)) {
                            vm.isVisible(false);
                            vm.categorySet(null);
                        }
                        else {
                            vm.isVisible(true);
                            vm.categorySet(data.ctgSet);
                        }
                        dfd.resolve();
                    }).fail(function () { return dfd.reject(); });
                    return dfd.promise();
                };
                ScreenModel.prototype.initGrid = function (data) {
                    var vm = this;
                    vm.lisTopPageRoleSet(data);
                    var comboColumns1 = [
                        { prop: 'name', length: 10 },
                    ];
                    var comboColumns2 = [
                        { prop: 'text', length: 10 },
                    ];
                    if (vm.$grid.data("igGrid")) {
                        vm.$grid.ntsGrid("destroy");
                    }
                    vm.$grid.ntsGrid({
                        // width: '970px',
                        height: '400px',
                        dataSource: vm.lisTopPageRoleSet(),
                        primaryKey: 'roleSetCode',
                        rowVirtualization: true,
                        virtualization: true,
                        virtualizationMode: 'continuous',
                        columns: [
                            {
                                headerText: nts.uk.resource.getText('CCG018_8'),
                                key: 'roleSetCode',
                                dataType: 'string',
                                width: '60px'
                            },
                            {
                                headerText: nts.uk.resource.getText('CCG018_9'),
                                key: 'name',
                                dataType: 'string',
                                width: '195px'
                            },
                            {
                                headerText: nts.uk.resource.getText('CCG018_11'),
                                key: 'topMenuCode',
                                dataType: 'string',
                                width: '240px',
                                ntsControl: 'Combobox1',
                                tabIndex: 2,
                            },
                            {
                                headerText: nts.uk.resource.getText('CCG018_10'),
                                key: 'uniqueCode',
                                dataType: 'string',
                                width: '240px',
                                ntsControl: 'Combobox3',
                                tabIndex: 2,
                            },
                        ],
                        headerRendered: function (evt, ui) {
                            var buttonNote = $("<button>", { "id": 'A3_1', "text": "?" }).click(function () { return vm.showNote(); });
                            ui.table.find("#grid2_switchingDate").html("\n            <span class=\"ui-iggrid-headertext\" style=\"line-height: 30px;\">".concat(nts.uk.resource.getText('CCG018_51'), "</span>\n          "));
                            ui.table.find("#grid2_switchingDate").append(buttonNote);
                        },
                        features: [
                            {
                                name: 'Selection',
                                mode: 'row',
                                multipleSelection: false,
                                activation: false
                            },
                        ],
                        ntsControls: [
                            {
                                name: 'Combobox1',
                                options: vm.comboItemsAsTopPage(),
                                optionsValue: 'code',
                                optionsText: 'name',
                                columns: comboColumns1,
                                controlType: 'ComboBox',
                                visibleItemsCount: 5,
                                dropDownAttachedToBody: false,
                                enable: true,
                            },
                            {
                                name: 'Combobox3',
                                options: vm.comboItemsAfterLogin(),
                                optionsValue: 'uniqueCode',
                                optionsText: 'name',
                                columns: comboColumns1,
                                controlType: 'ComboBox',
                                visibleItemsCount: 5,
                                dropDownAttachedToBody: false,
                                enable: true,
                            }
                        ]
                    });
                    var $firstItem = $('.nts-grid-control-topMenuCode-01')
                        .find('.nts-combo-container')
                        .find('.ui-igcombo-field');
                    $firstItem.ready(function () {
                        $('.nts-grid-control-topMenuCode-01')
                            .find('.nts-combo-container')
                            .find('.ui-igcombo-field').focus();
                    });
                    if (_.isEmpty(vm.lisTopPageRoleSet())) {
                        $('#grid2-wrapper').focus();
                    }
                };
                ScreenModel.prototype.save = function () {
                    var vm = this;
                    if (vm.lisTopPageRoleSet().length === 0) {
                        return;
                    }
                    _.forEach(vm.lisTopPageRoleSet(), function (item) {
                        item.loginMenuCode = item.uniqueCode.length > 2 ? item.uniqueCode.slice(0, 4) : '';
                        item.system = (item.uniqueCode.slice(-2, -1));
                        item.menuClassification = (item.uniqueCode.slice(-1));
                    });
                    blockUI.grayout();
                    var command = ko.mapping.toJS(vm.lisTopPageRoleSet());
                    a1.service.update(command)
                        .done(function () {
                        blockUI.clear();
                        nts.uk.ui.dialog.info({ messageId: "Msg_15" });
                    }).fail(function (error) {
                        nts.uk.ui.dialog.alertError(error.message);
                    }).always(function () { return blockUI.clear(); });
                };
                ScreenModel.prototype.showNote = function () {
                    $('#popup-show-note').remove();
                    var $table1 = $('#A2-4');
                    $('<div/>')
                        .attr('id', 'popup-show-note')
                        .appendTo($table1);
                    var $popUpShowNote = $('#popup-show-note');
                    $popUpShowNote.ntsPopup({
                        showOnStart: false,
                        dismissible: true,
                        position: {
                            my: 'left top',
                            at: 'left bottom',
                            of: '#A3_1'
                        }
                    });
                    $('<div/>')
                        .text(nts.uk.resource.getText('CCG018_52'))
                        .appendTo($popUpShowNote);
                    $popUpShowNote.ntsPopup('show');
                };
                ScreenModel.prototype.getSwitchDateLists = function () {
                    var list = [];
                    list.push({ value: 0, text: nts.uk.resource.getText('CCG018_44') });
                    _.range(1, 32).forEach(function (current) {
                        list.push({ value: current, text: current });
                    });
                    return list;
                };
                return ScreenModel;
            }(ccg018.base.viewModel.ScreenModelBase));
            viewmodel.ScreenModel = ScreenModel;
            var RoleSet = /** @class */ (function () {
                function RoleSet(roleSetCd, roleSetName) {
                    this.roleSetCd = roleSetCd;
                    this.roleSetName = roleSetName;
                }
                return RoleSet;
            }());
            viewmodel.RoleSet = RoleSet;
            var ITopPageRoleSet = /** @class */ (function () {
                function ITopPageRoleSet() {
                    this.switchingDate = 0;
                }
                return ITopPageRoleSet;
            }());
            viewmodel.ITopPageRoleSet = ITopPageRoleSet;
            var TopPageRoleSet = /** @class */ (function () {
                //beacause there can exist same code, so create uniqueCode = loginMenuCd+ system+ menuClassification
                // uniqueCode: KnockoutObservable<string> = ko.observable('');
                function TopPageRoleSet(param) {
                    this.switchingDate = 0;
                    var vm = this;
                    vm.roleSetCode = param.roleSetCode;
                    vm.name = param.name;
                    vm.topMenuCode = param.topMenuCode;
                    vm.loginMenuCode = param.loginMenuCode;
                    vm.switchingDate = param.switchingDate;
                    vm.system = param.system;
                    vm.menuClassification = param.menuClassification;
                    vm.uniqueCode = nts.uk.text.format("{0}{1}{2}", param.loginMenuCode, param.system, param.menuClassification);
                }
                return TopPageRoleSet;
            }());
            var IStandardMenu = /** @class */ (function () {
                function IStandardMenu() {
                }
                return IStandardMenu;
            }());
            viewmodel.IStandardMenu = IStandardMenu;
            var StandardMenu = /** @class */ (function () {
                function StandardMenu(param) {
                    var vm = this;
                    vm.code = ko.observable(param.code);
                    vm.menuClassification = ko.observable(param.menuClassification);
                    vm.displayName = ko.observable(param.displayName);
                    vm.system = ko.observable(param.system);
                    vm.uniqueCode(nts.uk.text.format("{0}{1}{2}", param.code, param.system, param.menuClassification));
                    vm.uniqueCode.subscribe(function () {
                        //if uniqueCode = '00' return loginMenuCd = ''
                        vm.code(vm.uniqueCode().length > 2 ? vm.uniqueCode().slice(0, 4) : '');
                        vm.system(+(vm.uniqueCode().slice(-2, -1)));
                        vm.menuClassification(+(vm.uniqueCode().slice(-1)));
                    });
                }
                return StandardMenu;
            }());
        })(viewmodel = a1.viewmodel || (a1.viewmodel = {}));
    })(a1 = ccg018.a1 || (ccg018.a1 = {}));
})(ccg018 || (ccg018 = {}));
//# sourceMappingURL=ccg018.a1.vm.js.map