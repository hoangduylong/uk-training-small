var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm011;
                (function (cmm011) {
                    var v2;
                    (function (v2) {
                        var d;
                        (function (d) {
                            var viewmodel;
                            (function (viewmodel) {
                                var getText = nts.uk.resource.getText;
                                var modal = nts.uk.ui.windows.sub.modal;
                                var info = nts.uk.ui.dialog.info;
                                var block = nts.uk.ui.block;
                                var alertError = nts.uk.ui.dialog.alertError;
                                var setShared = nts.uk.ui.windows.setShared;
                                var getShared = nts.uk.ui.windows.getShared;
                                var ScreenModel = /** @class */ (function () {
                                    function ScreenModel() {
                                        this.id = ko.observable(null);
                                        this.code = ko.observable(null);
                                        this.name = ko.observable(null);
                                        this.displayName = ko.observable(null);
                                        this.genericName = ko.observable(null);
                                        this.externalCode = ko.observable(null);
                                        this.hierarchyCode = ko.observable(null);
                                        this.selectedCode = ko.observable(null);
                                        this.selectedName = ko.observable(null);
                                        this.selectedHierarchyCode = ko.observable(null);
                                        this.itemsCount = ko.observable(0);
                                        this.hierarchySiblings = 999;
                                        this.hierarchyLevel = 10;
                                        this.items = [];
                                        this.listHierarchyChange = [];
                                        this.listHierarchyChangeBak = [];
                                        this.updateMode = false;
                                        block.invisible();
                                        var self = this, params = nts.uk.ui.windows.getShared("CMM011AParams");
                                        var currentScreen = nts.uk.ui.windows.getSelf();
                                        if (params) {
                                            self.screenMode = params.initMode;
                                            self.selectedCode(params.selectedCode);
                                            self.selectedName(params.selectedName);
                                            self.selectedHierarchyCode(params.selectedHierarchyCode);
                                            self.items = params.items;
                                            self.itemsCount(self.items.length);
                                            self.hierarchyLevel = params.selectedHierarchyCode.length / 3;
                                            self.hierarchySiblings = self.getSiblings(params.items, params.selectedHierarchyCode, self.hierarchyLevel).length;
                                            self.selectedHistoryId = params.history;
                                            self.listHierarchyChangeBak = params.listHierarchyChange;
                                        }
                                        if (self.itemsCount() == 0) {
                                            currentScreen.setHeight(400);
                                        }
                                        if (self.screenMode == SCREEN_MODE.DEPARTMENT) {
                                            currentScreen.setTitle(getText("CMM011_303"));
                                        }
                                        self.itemList = ko.observableArray([
                                            new BoxModel(CreationType.CREATE_ON_TOP, self.screenMode == SCREEN_MODE.WORKPLACE ? getText('CMM011_211') : getText('CMM011_311'), self.hierarchySiblings < 999),
                                            new BoxModel(CreationType.CREATE_BELOW, self.screenMode == SCREEN_MODE.WORKPLACE ? getText('CMM011_212') : getText('CMM011_312'), self.hierarchySiblings < 999),
                                            new BoxModel(CreationType.CREATE_TO_CHILD, self.screenMode == SCREEN_MODE.WORKPLACE ? getText('CMM011_213') : getText('CMM011_313'), self.hierarchyLevel < 10)
                                        ]);
                                        self.createMethod = ko.observable(self.hierarchySiblings < 999 ? CreationType.CREATE_BELOW : CreationType.CREATE_TO_CHILD);
                                        self.code.subscribe(function (value) {
                                            self.id(null);
                                            if (value && !_.isEmpty(self.selectedHistoryId) && !$("#A5_2").ntsError("hasError"))
                                                self.checkInputCode(value);
                                        });
                                        self.name.subscribe(function (value) {
                                            if (_.isEmpty(value) || $("#A6_2").ntsError("hasError"))
                                                return;
                                            if (_.isEmpty(self.displayName())) {
                                                self.displayName(value);
                                            }
                                            if (_.isEmpty(self.genericName())) {
                                                self.genericName(self.getGenericName(value));
                                            }
                                            $(".nts-input").trigger("validate");
                                            $("#A5_2").trigger("keyup");
                                        });
                                        self.createMethod.subscribe(function (value) {
                                            var items = _.cloneDeep(self.items);
                                            self.listHierarchyChange = [];
                                            if (items.length == 0) {
                                                self.hierarchyCode("001");
                                            }
                                            else {
                                                var currentHierarchyCode_1 = self.selectedHierarchyCode();
                                                if (self.createMethod() == CreationType.CREATE_TO_CHILD) {
                                                    items = self.getSiblings(items, currentHierarchyCode_1, self.hierarchyLevel);
                                                    var currNode = _.find(items, function (i) { return i.hierarchyCode == currentHierarchyCode_1; });
                                                    var newHCode = currentHierarchyCode_1;
                                                    if (_.isEmpty(currNode.children))
                                                        newHCode = newHCode + "001";
                                                    else {
                                                        var childLevel = currNode.children[0].hierarchyCode.length / 3;
                                                        var lastChildNumber = Number(currNode.children[currNode.children.length - 1].hierarchyCode.substring(3 * (childLevel - 1)));
                                                        var newChildNumber = (lastChildNumber + 1) + "";
                                                        if (newChildNumber.length == 1)
                                                            newChildNumber = "00" + newChildNumber;
                                                        if (newChildNumber.length == 2)
                                                            newChildNumber = "0" + newChildNumber;
                                                        newHCode = newHCode + newChildNumber;
                                                    }
                                                    self.hierarchyCode(newHCode);
                                                }
                                                else {
                                                    var parentCode = currentHierarchyCode_1.substring(0, (self.hierarchyLevel - 1) * 3);
                                                    var newItems_1 = [];
                                                    items = self.getSiblings(items, currentHierarchyCode_1, self.hierarchyLevel);
                                                    var currIndex_1 = _.findIndex(items, function (i) { return i.hierarchyCode == currentHierarchyCode_1; });
                                                    switch (self.createMethod()) {
                                                        case CreationType.CREATE_ON_TOP:
                                                            items.forEach(function (item, index) {
                                                                if (index == currIndex_1) {
                                                                    newItems_1.push({ hierarchyCode: item.hierarchyCode, children: [] });
                                                                }
                                                                newItems_1.push(item);
                                                            });
                                                            break;
                                                        case CreationType.CREATE_BELOW:
                                                            currIndex_1 += 1;
                                                            if (currIndex_1 == items.length) {
                                                                newItems_1 = items;
                                                                newItems_1.push({ hierarchyCode: "", children: [] });
                                                            }
                                                            else {
                                                                items.forEach(function (item, index) {
                                                                    if (index == currIndex_1) {
                                                                        newItems_1.push({ hierarchyCode: item.hierarchyCode, children: [] });
                                                                    }
                                                                    newItems_1.push(item);
                                                                });
                                                            }
                                                            break;
                                                        default:
                                                            break;
                                                    }
                                                    self.generateHierarchyCode(newItems_1, parentCode);
                                                    self.hierarchyCode(newItems_1[currIndex_1].hierarchyCode);
                                                }
                                            }
                                        });
                                        self.createMethod.valueHasMutated();
                                        block.clear();
                                    }
                                    ScreenModel.prototype.getSiblings = function (items, currentHierarchyCode, hierarchyLevel) {
                                        var _loop_1 = function (i) {
                                            var hCode = currentHierarchyCode.substring(0, 3 * i);
                                            var node = _.find(items, function (i) { return i.hierarchyCode == hCode; });
                                            items = node.children;
                                        };
                                        for (var i = 1; i < hierarchyLevel; i++) {
                                            _loop_1(i);
                                        }
                                        return items;
                                    };
                                    ScreenModel.prototype.checkInputCode = function (inputCode) {
                                        var self = this;
                                        block.invisible();
                                        d.service.checkCode(self.screenMode, self.selectedHistoryId, inputCode).done(function (checkResult) {
                                            if (checkResult.usedInThePast) {
                                                var params = {
                                                    initMode: self.screenMode,
                                                    listDuplicate: checkResult.listDuplicatePast
                                                };
                                                setShared("CMM011DParams", params);
                                                modal("/view/cmm/011/c/index.xhtml").onClosed(function () {
                                                    var result = getShared("CMM011CParams");
                                                    if (result) {
                                                        if (result.targetId && result.historyId) {
                                                            self.id(result.targetId);
                                                            self.updateMode = true;
                                                            block.invisible();
                                                            d.service.getWkpDepInforById(self.screenMode, result.historyId, result.targetId).done(function (res) {
                                                                self.displayName(res.dispName);
                                                                self.genericName(res.genericName);
                                                                self.externalCode(res.externalCode);
                                                                self.name(res.name);
                                                                nts.uk.ui.errors.clearAll();
                                                            }).fail(function (error) {
                                                                alertError(error);
                                                            }).always(function () {
                                                                block.clear();
                                                            });
                                                        }
                                                        else {
                                                            self.updateMode = false;
                                                        }
                                                    }
                                                    else {
                                                        self.code(null);
                                                        self.updateMode = false;
                                                    }
                                                });
                                            }
                                            else {
                                                self.updateMode = false;
                                            }
                                            block.clear();
                                        }).fail(function (error) {
                                            block.clear();
                                            alertError(error).then(function () {
                                                if (error.messageId == "Msg_3") {
                                                    self.code(null);
                                                }
                                            });
                                        });
                                    };
                                    ScreenModel.prototype.register = function () {
                                        var self = this;
                                        $(".nts-input").trigger("validate");
                                        $("#A5_2").trigger("keyup");
                                        if (nts.uk.ui.errors.hasError())
                                            return;
                                        block.invisible();
                                        self.listHierarchyChange.forEach(function (i) {
                                            self.listHierarchyChangeBak = self.listHierarchyChangeBak.filter(function (b) { return b.id != i.id; });
                                            self.listHierarchyChangeBak.push(i);
                                        });
                                        var command = {
                                            initMode: self.screenMode,
                                            historyId: self.selectedHistoryId,
                                            id: self.id(),
                                            code: self.code(),
                                            name: self.name(),
                                            dispName: self.displayName(),
                                            genericName: self.genericName(),
                                            externalCode: self.externalCode(),
                                            hierarchyCode: self.hierarchyCode(),
                                            listHierarchyChange: self.listHierarchyChangeBak,
                                            updateMode: self.updateMode
                                        };
                                        d.service.registerWkpDepInfor(command).done(function (id) {
                                            info({ messageId: "Msg_15" }).then(function () {
                                                setShared("CreatedWorkplace", { idToSelect: id });
                                                nts.uk.ui.windows.close();
                                            });
                                        }).fail(function (error) {
                                            alertError(error);
                                        }).always(function () {
                                            block.clear();
                                        });
                                    };
                                    ScreenModel.prototype.cancel = function () {
                                        nts.uk.ui.windows.close();
                                    };
                                    ScreenModel.prototype.generateHierarchyCode = function (items, parentHierarchyCode) {
                                        var self = this;
                                        items.forEach(function (node, index) {
                                            var hCode = ++index + "";
                                            if (hCode.length == 1)
                                                hCode = "00" + hCode;
                                            if (hCode.length == 2)
                                                hCode = "0" + hCode;
                                            var newHierarchyCode = parentHierarchyCode + hCode;
                                            if (node.hierarchyCode != newHierarchyCode) {
                                                node.hierarchyCode = newHierarchyCode;
                                                self.listHierarchyChange = self.listHierarchyChange.filter(function (i) { return i.id != node.id; });
                                                self.listHierarchyChange.push({ id: node.id, hierarchyCode: node.hierarchyCode });
                                            }
                                            self.generateHierarchyCode(node.children, node.hierarchyCode);
                                        });
                                    };
                                    ScreenModel.prototype.getGenericName = function (value) {
                                        var self = this, result = "";
                                        var currentHierarchyCode = self.hierarchyCode();
                                        if (currentHierarchyCode) {
                                            var level = Math.floor(currentHierarchyCode.length / 3);
                                            var items = _.cloneDeep(self.items);
                                            var _loop_2 = function (i) {
                                                var hCode = currentHierarchyCode.substring(0, 3 * i);
                                                var node = _.find(items, function (i) { return i.hierarchyCode == hCode; });
                                                result = result + node.name + " ";
                                                items = node.children;
                                            };
                                            for (var i = 1; i < level; i++) {
                                                _loop_2(i);
                                            }
                                        }
                                        return result + value;
                                    };
                                    return ScreenModel;
                                }());
                                viewmodel.ScreenModel = ScreenModel;
                                var SCREEN_MODE;
                                (function (SCREEN_MODE) {
                                    SCREEN_MODE[SCREEN_MODE["WORKPLACE"] = 0] = "WORKPLACE";
                                    SCREEN_MODE[SCREEN_MODE["DEPARTMENT"] = 1] = "DEPARTMENT";
                                })(SCREEN_MODE || (SCREEN_MODE = {}));
                                var CreationType;
                                (function (CreationType) {
                                    CreationType[CreationType["CREATE_ON_TOP"] = 1] = "CREATE_ON_TOP";
                                    CreationType[CreationType["CREATE_BELOW"] = 2] = "CREATE_BELOW";
                                    CreationType[CreationType["CREATE_TO_CHILD"] = 3] = "CREATE_TO_CHILD";
                                })(CreationType || (CreationType = {}));
                                var BoxModel = /** @class */ (function () {
                                    function BoxModel(id, name, enable) {
                                        var self = this;
                                        self.id = id;
                                        self.name = name;
                                        self.enable = ko.observable(enable);
                                    }
                                    return BoxModel;
                                }());
                                var RegisterInfor = /** @class */ (function () {
                                    function RegisterInfor(id, code, name, displayName, genericName, externalCode, hierarchyCode) {
                                        this.id = id;
                                        this.code = code;
                                        this.name = name;
                                        this.displayName = displayName;
                                        this.genericName = genericName;
                                        this.externalCode = externalCode;
                                        this.hierarchyCode = hierarchyCode;
                                    }
                                    return RegisterInfor;
                                }());
                            })(viewmodel = d.viewmodel || (d.viewmodel = {}));
                        })(d = v2.d || (v2.d = {}));
                    })(v2 = cmm011.v2 || (cmm011.v2 = {}));
                })(cmm011 = view.cmm011 || (view.cmm011 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm011.v2.d.vm.js.map