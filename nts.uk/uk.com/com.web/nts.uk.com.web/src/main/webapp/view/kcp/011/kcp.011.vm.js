var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var kcp011;
                (function (kcp011) {
                    var share;
                    (function (share) {
                        var GET_WORKPLACE_URL = "bs/schedule/employeeinfo/workplacegroup/getAll";
                        var SELECTED_MODE = {
                            NONE: 0,
                            FIRST: 1,
                            ALL: 2,
                            SELECT_ID: 3
                        };
                        var NASHI_CODE = '     ';
                        var WorkplaceGroupComponent = /** @class */ (function () {
                            function WorkplaceGroupComponent(params) {
                                this.workplaceGroups = ko.observableArray([]);
                                this.columns = ko.observableArray([]);
                                this.setting = ko.observable({});
                                var self = this;
                                self.setting(params.options);
                                if (self.setting().showPanel === undefined) {
                                    self.setting().showPanel = true;
                                }
                                var widthCal = self.calculateWidth();
                                self.columns([
                                    { headerText: '', prop: 'id', width: 100, hidden: true },
                                    { headerText: nts.uk.resource.getText("KCP011_2"), prop: 'code', width: widthCal.codeWidth },
                                    { headerText: nts.uk.resource.getText("KCP011_3"), prop: 'name', width: widthCal.nameWidth, formatter: _.escape },
                                    {
                                        headerText: nts.uk.resource.getText("KCP011_4"), prop: 'configured', width: widthCal.alreadySettingWidth, hidden: !self.setting().isAlreadySetting,
                                        template: '{{if ${configured} == 1 }}<div class="cssDiv"><i  class="icon icon icon-78 cssI"></i></div>{{/if}}'
                                    }
                                ]);
                                var setting = self.setting();
                                setting.currentIds.subscribe(function (ids) {
                                    if (self.setting().currentCodes) {
                                        if (self.setting().multiple) {
                                            var selecteds = _.filter(self.workplaceGroups(), function (wkp) {
                                                var exist = _.filter(ids, function (id) { return id === wkp.id; });
                                                return exist && exist.length > 0;
                                            });
                                            if (setting.currentCodes) {
                                                setting.currentCodes(_.map(selecteds, function (wkp) { return wkp.code; }));
                                            }
                                            if (setting.currentNames) {
                                                setting.currentNames(_.map(selecteds, function (wkp) { return wkp.name; }));
                                            }
                                        }
                                        else {
                                            var selected = _.find(self.workplaceGroups(), function (wkp) {
                                                return ids === wkp.id;
                                            });
                                            if (setting.currentCodes && selected) {
                                                setting.currentCodes(selected.code);
                                            }
                                            if (setting.currentNames && selected) {
                                                setting.currentNames(selected.name);
                                            }
                                        }
                                    }
                                });
                                if (setting.reloadData) {
                                    setting.reloadData.subscribe(function () {
                                        self.loadData();
                                    });
                                }
                                if (setting.isAlreadySetting && setting.alreadySettingList) {
                                    setting.alreadySettingList.subscribe(function (values) {
                                        var workplaceGs = self.workplaceGroups();
                                        workplaceGs.forEach(function (workplace) {
                                            var isSetting = _.find(values, function (settingId) { return settingId == workplace.id; });
                                            workplace.configured = isSetting ? 1 : null;
                                        });
                                        self.workplaceGroups(workplaceGs);
                                    });
                                }
                                self.loadData().done(function () {
                                    var selectedMode = setting.selectedMode;
                                    if (selectedMode == SELECTED_MODE.NONE) {
                                        setting.currentIds([]);
                                    }
                                    else if (selectedMode == SELECTED_MODE.FIRST) {
                                        // show empty item will not select the empty one
                                        var idx = setting.showEmptyItem ? 1 : 0;
                                        if (setting.multiple) {
                                            setting.currentIds(self.workplaceGroups()[idx] ? [self.workplaceGroups()[idx].id] : []);
                                        }
                                        else {
                                            setting.currentIds(self.workplaceGroups()[idx] ? self.workplaceGroups()[idx].id : null);
                                        }
                                    }
                                    else if (selectedMode == SELECTED_MODE.ALL) {
                                        var notNashi = _.filter(self.workplaceGroups(), function (val) { return val.code != NASHI_CODE; });
                                        setting.currentIds(_.map(notNashi, function (wkp) { return wkp.id; }));
                                    }
                                    else if (selectedMode == SELECTED_MODE.SELECT_ID) {
                                        if (self.setting().alreadySettingList) {
                                            var wpl = _.filter(self.workplaceGroups(), function (val) { return val.id == setting.alreadySettingList()[0]; });
                                            setting.currentIds(_.map(wpl, function (wkp) { return wkp.id; }));
                                        }
                                    }
                                });
                            }
                            WorkplaceGroupComponent.prototype.loadData = function () {
                                var self = this;
                                var dfd = $.Deferred();
                                nts.uk.ui.block.grayout();
                                nts.uk.request.ajax("com", GET_WORKPLACE_URL).done(function (res) {
                                    var workplaces = _.orderBy(res.workplaces, ['code'], ['asc']);
                                    if (self.setting().showEmptyItem) {
                                        workplaces.unshift({ id: Math.random(), code: NASHI_CODE, name: nts.uk.resource.getText("KCP011_5"), configured: null });
                                    }
                                    if (self.setting().isAlreadySetting && self.setting().alreadySettingList) {
                                        workplaces.forEach(function (workplace) {
                                            var isSetting = _.find(self.setting().alreadySettingList(), function (settingId) { return settingId == workplace.id; });
                                            workplace.configured = isSetting ? 1 : null;
                                        });
                                    }
                                    self.workplaceGroups(workplaces);
                                    if (self.setting().itemList) {
                                        self.setting().itemList(workplaces);
                                    }
                                    dfd.resolve();
                                }).always(function () {
                                    nts.uk.ui.block.clear();
                                });
                                return dfd.promise();
                            };
                            WorkplaceGroupComponent.prototype.calculateWidth = function () {
                                var self = this;
                                var setting = self.setting();
                                var codeWidth = setting.multiple ? 95 : 115;
                                var nameWidth = setting.isAlreadySetting ? 165 : 245;
                                var alreadySettingWidth = setting.isAlreadySetting ? 70 : 10;
                                return { codeWidth: codeWidth, nameWidth: nameWidth, alreadySettingWidth: alreadySettingWidth };
                            };
                            WorkplaceGroupComponent.prototype.calculatePanelHeight = function () {
                                var self = this;
                                var height = self.setting().height ? (self.setting().height + 50) : 470;
                                return height + 'px';
                            };
                            return WorkplaceGroupComponent;
                        }());
                        share.WorkplaceGroupComponent = WorkplaceGroupComponent;
                    })(share = kcp011.share || (kcp011.share = {}));
                })(kcp011 = view.kcp011 || (view.kcp011 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
ko.components.register('workplace-group', {
    viewModel: nts.uk.com.view.kcp011.share.WorkplaceGroupComponent, template: "\n    <div data-bind=\"if:setting().showPanel \">\n        <div id=\"workplace-group-pannel\" class=\"caret-right caret-background\" data-bind=\"ntsPanel: {width: '380px', height: calculatePanelHeight(), direction: '', showIcon: true, visible: setting().showPanel}\">\n            <div  data-bind=\"ntsSearchBox: {searchMode: 'filter',targetKey: 'id', comId: 'multi-list', \n                    items: workplaceGroups, selectedKey: 'id', \n                    fields: ['code', 'name'], \n                    selected: setting().currentIds,\n                    mode: 'igGrid'}\" />\n                <table id=\"multi-list\"\n                    data-bind=\" \n                    ntsGridList: {\n                            height: setting().height ? setting().height: 420,\n                            dataSource: workplaceGroups,\n                            primaryKey: 'id',\n                            columns: columns,\n                            multiple: setting().multiple,\n                            value: setting().currentIds,\n                            rows: setting().rows,\n                            columnResize: setting().isResize\n                        }\">\n                </table>\n        </div>\n    </div>\n    <div data-bind=\"if:!setting().showPanel \">\n        <div id=\"workplace-group-pannel\" class=\"\" style=\"width: 380px\" data-bind=\"if: !setting().showPanel\">\n            <div  data-bind=\"ntsSearchBox: {searchMode: 'filter',targetKey: 'id', comId: 'multi-list-nopanel', \n                    items: workplaceGroups, selectedKey: 'id', \n                    fields: ['code', 'name'], \n                    selected: setting().currentIds,\n                    mode: 'igGrid'}\" />\n                <table id=\"multi-list-nopanel\"\n                    data-bind=\"ntsGridList: {\n                            height: setting().height ? setting().height: 420,\n                            dataSource: workplaceGroups,\n                            primaryKey: 'id',\n                            columns: columns,\n                            multiple: setting().multiple,\n                            value: setting().currentIds,\n                            rows: setting().rows,\n                            columnResize: setting().isResize\n                        }\">\n                </table>\n        </div>\n    </div>\n"
});
//# sourceMappingURL=kcp.011.vm.js.map