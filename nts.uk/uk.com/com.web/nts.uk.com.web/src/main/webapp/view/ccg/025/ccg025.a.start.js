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
                        var ComponentModel = a.component.viewmodel.ComponentModel;
                        __viewContext.ready(function () {
                            var vm = new ViewModel();
                            __viewContext.bind(vm);
                            vm.reloadData();
                        });
                        var ViewModel = /** @class */ (function () {
                            function ViewModel() {
                                var self = this;
                                self.roleType = ko.observable(0);
                                self.roleAtr = ko.observable(null);
                                self.multiple = ko.observable(false);
                                self.onDialog = ko.observable(false);
                                self.isAlreadySetting = ko.observable(false);
                                self.showEmptyItem = ko.observable(false);
                                self.selectType = ko.observable(3);
                                self.rows = ko.observable(15);
                                self.selectedId = ko.observable(null);
                                self.selectedSetId = ko.observable(null);
                                self.listRole = ko.observableArray([]);
                                self.componentViewmodel = ko.observable(new ComponentModel({
                                    roleType: self.roleType(),
                                    roleAtr: self.roleAtr(),
                                    multiple: self.multiple(),
                                    isAlreadySetting: self.isAlreadySetting(),
                                    rows: self.rows(),
                                    tabindex: 0,
                                    showEmptyItem: self.showEmptyItem(),
                                    selectType: self.selectType(),
                                    hasFocus: true,
                                    selectedId: self.multiple() ? [self.selectedId()].filter(function (i) { return !!i; }) : self.selectedId()
                                }));
                                self.selectTypes = ko.observableArray([
                                    { value: 1, name: "Selected List" },
                                    { value: 2, name: "Select All", enable: self.multiple },
                                    { value: 3, name: "Select First" },
                                    { value: 4, name: "Select None" }
                                ]);
                                self.roleType.subscribe(function (value) {
                                    self.componentViewmodel(new ComponentModel({
                                        roleType: value,
                                        roleAtr: self.roleAtr(),
                                        multiple: self.multiple(),
                                        isAlreadySetting: self.isAlreadySetting(),
                                        rows: self.rows(),
                                        tabindex: 0,
                                        showEmptyItem: self.showEmptyItem(),
                                        selectType: self.selectType(),
                                        onDialog: self.onDialog(),
                                        hasFocus: true,
                                        selectedId: self.multiple() ? [self.selectedId()].filter(function (i) { return !!i; }) : self.selectedId(),
                                        alreadySetList: [self.selectedSetId()]
                                    }));
                                    self.reloadData();
                                });
                                self.roleAtr.subscribe(function (value) {
                                    self.componentViewmodel(new ComponentModel({
                                        roleType: self.roleType(),
                                        roleAtr: value,
                                        multiple: self.multiple(),
                                        isAlreadySetting: self.isAlreadySetting(),
                                        rows: self.rows(),
                                        tabindex: 0,
                                        showEmptyItem: self.showEmptyItem(),
                                        selectType: self.selectType(),
                                        onDialog: self.onDialog(),
                                        hasFocus: true,
                                        selectedId: self.multiple() ? [self.selectedId()].filter(function (i) { return !!i; }) : self.selectedId(),
                                        alreadySetList: [self.selectedSetId()]
                                    }));
                                    self.reloadData();
                                });
                                self.multiple.subscribe(function (value) {
                                    if (self.selectType() == 2 && !value) {
                                        self.selectType(3);
                                    }
                                    else {
                                        self.componentViewmodel(new ComponentModel({
                                            roleType: self.roleType(),
                                            roleAtr: self.roleAtr(),
                                            multiple: value,
                                            isAlreadySetting: self.isAlreadySetting(),
                                            rows: self.rows(),
                                            tabindex: 0,
                                            showEmptyItem: self.showEmptyItem(),
                                            selectType: self.selectType(),
                                            onDialog: self.onDialog(),
                                            hasFocus: true,
                                            selectedId: value ? [self.selectedId()].filter(function (i) { return !!i; }) : self.selectedId(),
                                            alreadySetList: [self.selectedSetId()]
                                        }));
                                        self.reloadData();
                                    }
                                });
                                self.isAlreadySetting.subscribe(function (value) {
                                    self.selectedSetId(null);
                                    self.componentViewmodel(new ComponentModel({
                                        roleType: self.roleType(),
                                        roleAtr: self.roleAtr(),
                                        multiple: self.multiple(),
                                        isAlreadySetting: value,
                                        rows: self.rows(),
                                        tabindex: 0,
                                        showEmptyItem: self.showEmptyItem(),
                                        selectType: self.selectType(),
                                        onDialog: self.onDialog(),
                                        hasFocus: true,
                                        selectedId: self.multiple() ? [self.selectedId()].filter(function (i) { return !!i; }) : self.selectedId(),
                                        alreadySetList: [self.selectedSetId()]
                                    }));
                                    self.reloadData();
                                });
                                self.rows.subscribe(function (value) {
                                    self.componentViewmodel(new ComponentModel({
                                        roleType: self.roleType(),
                                        roleAtr: self.roleAtr(),
                                        multiple: self.multiple(),
                                        isAlreadySetting: self.isAlreadySetting(),
                                        rows: value,
                                        tabindex: 0,
                                        showEmptyItem: self.showEmptyItem(),
                                        selectType: self.selectType(),
                                        onDialog: self.onDialog(),
                                        hasFocus: true,
                                        selectedId: self.multiple() ? [self.selectedId()].filter(function (i) { return !!i; }) : self.selectedId(),
                                        alreadySetList: [self.selectedSetId()]
                                    }));
                                    self.reloadData();
                                });
                                self.showEmptyItem.subscribe(function (value) {
                                    self.componentViewmodel(new ComponentModel({
                                        roleType: self.roleType(),
                                        roleAtr: self.roleAtr(),
                                        multiple: self.multiple(),
                                        isAlreadySetting: self.isAlreadySetting(),
                                        rows: self.rows(),
                                        tabindex: 0,
                                        showEmptyItem: value,
                                        selectType: self.selectType(),
                                        onDialog: self.onDialog(),
                                        hasFocus: true,
                                        selectedId: self.multiple() ? [self.selectedId()].filter(function (i) { return !!i; }) : self.selectedId(),
                                        alreadySetList: [self.selectedSetId()]
                                    }));
                                    self.reloadData();
                                });
                                self.selectType.subscribe(function (value) {
                                    self.componentViewmodel(new ComponentModel({
                                        roleType: self.roleType(),
                                        roleAtr: self.roleAtr(),
                                        multiple: self.multiple(),
                                        isAlreadySetting: self.isAlreadySetting(),
                                        rows: self.rows(),
                                        tabindex: 0,
                                        showEmptyItem: self.showEmptyItem(),
                                        selectType: value,
                                        onDialog: self.onDialog(),
                                        hasFocus: true,
                                        selectedId: self.multiple() ? [self.selectedId()].filter(function (i) { return !!i; }) : self.selectedId(),
                                        alreadySetList: [self.selectedSetId()]
                                    }));
                                    self.reloadData();
                                });
                                self.onDialog.subscribe(function (value) {
                                    self.componentViewmodel(new ComponentModel({
                                        roleType: self.roleType(),
                                        roleAtr: self.roleAtr(),
                                        multiple: self.multiple(),
                                        isAlreadySetting: self.isAlreadySetting(),
                                        rows: self.rows(),
                                        tabindex: 0,
                                        showEmptyItem: self.showEmptyItem(),
                                        selectType: self.selectType(),
                                        onDialog: value,
                                        hasFocus: true,
                                        selectedId: self.multiple() ? [self.selectedId()].filter(function (i) { return !!i; }) : self.selectedId(),
                                        alreadySetList: [self.selectedSetId()]
                                    }));
                                    self.reloadData();
                                });
                                self.selectedId.subscribe(function (value) {
                                    self.componentViewmodel(new ComponentModel({
                                        roleType: self.roleType(),
                                        roleAtr: self.roleAtr(),
                                        multiple: self.multiple(),
                                        isAlreadySetting: self.isAlreadySetting(),
                                        rows: self.rows(),
                                        tabindex: 0,
                                        showEmptyItem: self.showEmptyItem(),
                                        selectType: self.selectType(),
                                        onDialog: self.onDialog(),
                                        hasFocus: true,
                                        selectedId: self.multiple() ? [value].filter(function (i) { return !!i; }) : value,
                                        alreadySetList: [self.selectedSetId()]
                                    }));
                                    self.reloadData();
                                });
                                self.selectedSetId.subscribe(function (value) {
                                    self.componentViewmodel(new ComponentModel({
                                        roleType: self.roleType(),
                                        roleAtr: self.roleAtr(),
                                        multiple: self.multiple(),
                                        isAlreadySetting: self.isAlreadySetting(),
                                        rows: self.rows(),
                                        tabindex: 0,
                                        showEmptyItem: self.showEmptyItem(),
                                        selectType: self.selectType(),
                                        onDialog: self.onDialog(),
                                        hasFocus: true,
                                        selectedId: self.multiple() ? [self.selectedId()].filter(function (i) { return !!i; }) : self.selectedId(),
                                        alreadySetList: [value]
                                    }));
                                    self.reloadData();
                                });
                                self.displaySelected = ko.computed(function () {
                                    if (!_.isEmpty(self.componentViewmodel().currentRoleId())) {
                                        var roles = _.filter(self.componentViewmodel().listRole(), function (r) { return self.componentViewmodel().currentRoleId().indexOf(r.roleId) >= 0; });
                                        return ko.toJSON(roles.map(function (r) { return ({ roleId: r.roleId, roleCode: r.roleCode, name: r.name }); }));
                                    }
                                    return "";
                                });
                            }
                            ViewModel.prototype.reloadData = function () {
                                var self = this;
                                self.componentViewmodel().startPage().done(function () {
                                    self.listRole(self.componentViewmodel().listRole());
                                });
                            };
                            ViewModel.prototype.setConfigured = function () {
                                var self = this;
                                if (!_.isEmpty(self.componentViewmodel().currentRoleId())) {
                                    if (self.multiple()) {
                                        self.componentViewmodel().listRole().forEach(function (role) {
                                            if (self.componentViewmodel().currentRoleId().indexOf(role.roleId) >= 0) {
                                                role.configured = 1;
                                            }
                                        });
                                        self.componentViewmodel().listRole.valueHasMutated();
                                    }
                                    else {
                                        self.componentViewmodel().listRole().forEach(function (role) {
                                            if (self.componentViewmodel().currentRoleId() == role.roleId) {
                                                role.configured = 1;
                                            }
                                        });
                                        self.componentViewmodel().listRole.valueHasMutated();
                                    }
                                }
                            };
                            ViewModel.prototype.unSetConfigured = function () {
                                var self = this;
                                if (!_.isEmpty(self.componentViewmodel().currentRoleId())) {
                                    if (self.multiple()) {
                                        self.componentViewmodel().listRole().forEach(function (role) {
                                            if (self.componentViewmodel().currentRoleId().indexOf(role.roleId) >= 0) {
                                                role.configured = 0;
                                            }
                                        });
                                        self.componentViewmodel().listRole.valueHasMutated();
                                    }
                                    else {
                                        self.componentViewmodel().listRole().forEach(function (role) {
                                            if (self.componentViewmodel().currentRoleId() == role.roleId) {
                                                role.configured = 0;
                                            }
                                        });
                                        self.componentViewmodel().listRole.valueHasMutated();
                                    }
                                }
                            };
                            return ViewModel;
                        }());
                    })(a = ccg025.a || (ccg025.a = {}));
                })(ccg025 = view.ccg025 || (view.ccg025 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg025.a.start.js.map