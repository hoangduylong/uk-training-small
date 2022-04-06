var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var ccg025;
                (function (ccg025) {
                    var a;
                    (function (a) {
                        var component;
                        (function (component) {
                            var getText = nts.uk.resource.getText;
                            var isNullOrUndefined = nts.uk.util.isNullOrUndefined;
                            var viewmodel;
                            (function (viewmodel) {
                                var ComponentModel = /** @class */ (function () {
                                    function ComponentModel(option) {
                                        this.defaultOption = {
                                            multiple: true,
                                            showEmptyItem: false,
                                            isResize: false,
                                            rows: 15,
                                            selectType: 3
                                        };
                                        this.switchFocus = ko.observable(false);
                                        this.listFocus = ko.observable(false);
                                        this.init = true;
                                        var self = this;
                                        self.setting = $.extend({}, self.defaultOption, option);
                                        if (isNullOrUndefined(option.selectType) && !isNullOrUndefined(self.setting.selectedId))
                                            self.setting.selectType = 1;
                                        if (self.setting.roleAtr != 0 && self.setting.roleAtr != 1)
                                            self.setting.roleAtr = undefined;
                                        self.displayRoleClassification = ko.observable(self.setting.roleAtr != 0 && self.setting.roleAtr != 1);
                                        if (self.setting.hasFocus) {
                                            if (self.displayRoleClassification())
                                                self.switchFocus(true);
                                            else
                                                self.listFocus(true);
                                        }
                                        self.roleClassification = ko.observable(self.setting.roleAtr || 0);
                                        self.listRole = ko.observableArray([]);
                                        self.isAlreadySetting = ko.observable(self.setting.isAlreadySetting);
                                        if (!_.isEmpty(self.setting.alreadySetList)) {
                                            if (ko.isObservable(self.setting.alreadySetList))
                                                self.listAlreadySet = self.setting.alreadySetList;
                                            else
                                                self.listAlreadySet = ko.observableArray(self.setting.alreadySetList);
                                        }
                                        else {
                                            self.listAlreadySet = ko.observableArray([]);
                                        }
                                        if (self.setting.multiple) {
                                            self.currentRoleId = ko.observableArray([]);
                                            self.columns = ko.observableArray([
                                                { headerText: '', prop: 'roleId', width: 100, hidden: true },
                                                { headerText: getText("CCG025_6"), prop: 'roleCode', width: 100 },
                                                { headerText: getText("CCG025_7"), prop: 'roleName', width: 180, formatter: _.escape },
                                                {
                                                    headerText: getText("CCG025_8"), prop: 'configured', width: 80, hidden: !self.isAlreadySetting(),
                                                    template: '{{if ${configured} == 1 }}<div class="cssDiv"><i  class="icon icon icon-78 cssI"></i></div>{{/if}}'
                                                }
                                            ]);
                                        }
                                        else {
                                            self.currentRoleId = ko.observable("");
                                            self.columns = ko.observableArray([
                                                { headerText: '', prop: 'roleId', width: 100, hidden: true },
                                                { headerText: getText("CCG025_6"), prop: 'roleCode', width: 60 },
                                                { headerText: getText("CCG025_7"), prop: 'roleName', width: 233, formatter: _.escape },
                                                {
                                                    headerText: getText("CCG025_8"), prop: 'configured', width: 80, hidden: !self.isAlreadySetting(),
                                                    template: '{{if ${configured} == 1 }}<div class="cssDiv"><i  class="icon icon icon-78 cssI"></i></div>{{/if}}'
                                                }
                                            ]);
                                        }
                                        self.roleClassification.subscribe(function (value) {
                                            nts.uk.ui.block.invisible();
                                            self.getListRoleByRoleType(self.setting.roleType, value).always(function () {
                                                nts.uk.ui.block.clear();
                                            });
                                        });
                                    }
                                    /**
                                    functiton start page */
                                    /**
                                     * truyen them 2 param tu man KSP001 sang
                                     */
                                    ComponentModel.prototype.startPage = function (selectedRoleId, selectedRoleCode) {
                                        var self = this;
                                        return self.getListRoleByRoleType(self.setting.roleType, self.roleClassification(), selectedRoleId, selectedRoleCode);
                                    };
                                    /** Get list Role by Type */
                                    ComponentModel.prototype.getListRoleByRoleType = function (roleType, roleAtr, selectedRoleId, selectedRoleCode) {
                                        var self = this;
                                        var dfd = $.Deferred();
                                        component.service.getListRoleByRoleType(roleType, roleAtr).done(function (data) {
                                            data = _.orderBy(data, ['assignAtr', 'roleCode'], ['asc', 'asc']);
                                            self.listRole(_.map(data, function (x) {
                                                return new model.Role(x.roleId, x.roleCode, x.roleType, x.employeeReferenceRange, x.name, x.contractCode, x.assignAtr, x.companyId, _.includes(self.listAlreadySet(), x.roleId) ? 1 : 0);
                                            }));
                                            self.addEmptyItem();
                                            if (!!selectedRoleId) {
                                                self.setting.multiple ? self.currentRoleId([selectedRoleId]) : self.currentRoleId(selectedRoleId);
                                            }
                                            else if (!!selectedRoleCode) {
                                                var role = _.find(self.listRole(), function (r) { return _.isEqual(r.roleCode, selectedRoleCode); });
                                                self.setting.multiple ? self.currentRoleId(role ? [role.roleId] : []) : self.currentRoleId(role ? role.roleId : undefined);
                                            }
                                            else {
                                                switch (self.setting.selectType) {
                                                    case 1: // selected list
                                                        if (self.setting.multiple) {
                                                            if (self.listRole().filter(function (r) { return (self.setting.selectedId || []).indexOf(r.roleId) >= 0; }).length > 0) {
                                                                self.currentRoleId(self.setting.selectedId || []);
                                                            }
                                                            else {
                                                                self.selectFirstItem();
                                                            }
                                                        }
                                                        else {
                                                            if (self.listRole().filter(function (r) { return self.setting.selectedId == r.roleId; }).length > 0) {
                                                                self.currentRoleId(self.setting.selectedId);
                                                            }
                                                            else {
                                                                self.selectFirstItem();
                                                            }
                                                        }
                                                        break;
                                                    case 2: // select all
                                                        if (self.setting.multiple) {
                                                            self.currentRoleId(self.listRole().map(function (r) { return r.roleId; }));
                                                        }
                                                        break;
                                                    case 3: // select first
                                                        self.selectFirstItem();
                                                        break;
                                                    case 4: // select none
                                                        self.setting.multiple ? self.currentRoleId([]) : self.currentRoleId(undefined);
                                                        break;
                                                    default:
                                                        break;
                                                }
                                            }
                                            if (self.init) {
                                                if (self.listFocus())
                                                    $("#ccg025-list_container").focus();
                                                self.init = false;
                                            }
                                            dfd.resolve(data);
                                        }).fail(function (res) {
                                            dfd.reject();
                                            nts.uk.ui.dialog.alertError(res.message).then(function () {
                                                nts.uk.ui.block.clear();
                                            });
                                        });
                                        return dfd.promise();
                                    };
                                    ComponentModel.prototype.addEmptyItem = function () {
                                        var self = this;
                                        if (self.setting.showEmptyItem && !self.setting.multiple) {
                                            self.listRole.unshift(new model.Role("", "", 0, 0, "選択なし", "", 0, "", 0));
                                        }
                                    };
                                    /** Select first item */
                                    ComponentModel.prototype.selectFirstItem = function () {
                                        var self = this;
                                        if (self.listRole().length > 0) {
                                            self.setting.multiple
                                                ? self.currentRoleId([self.listRole()[0].roleId])
                                                : self.currentRoleId(self.listRole()[0].roleId);
                                        }
                                        else {
                                            self.setting.multiple
                                                ? self.currentRoleId([])
                                                : self.currentRoleId(undefined);
                                        }
                                    };
                                    return ComponentModel;
                                }()); //end screenModel
                                viewmodel.ComponentModel = ComponentModel;
                            })(viewmodel = component.viewmodel || (component.viewmodel = {})); //end viewmodel
                            //module model
                            var model;
                            (function (model) {
                                /** class Role */
                                var Role = /** @class */ (function () {
                                    function Role(roleId, roleCode, roleType, employeeReferenceRange, roleName, contractCode, assignAtr, companyId, configured) {
                                        this.roleId = roleId;
                                        this.roleCode = roleCode;
                                        this.roleType = roleType;
                                        this.employeeReferenceRange = employeeReferenceRange;
                                        this.name = roleName;
                                        this.roleName = roleName;
                                        this.contractCode = contractCode;
                                        this.assignAtr = assignAtr;
                                        this.companyId = companyId;
                                        this.configured = configured;
                                    }
                                    return Role;
                                }()); //end class Role
                                model.Role = Role;
                            })(model = component.model || (component.model = {})); //end module model
                        })(component = a.component || (a.component = {}));
                    })(a = ccg025.a || (ccg025.a = {}));
                })(ccg025 = view.ccg025 || (view.ccg025 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {})); //end module
//# sourceMappingURL=component.vm.js.map