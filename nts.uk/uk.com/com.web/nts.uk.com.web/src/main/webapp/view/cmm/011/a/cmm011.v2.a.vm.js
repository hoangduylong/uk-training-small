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
                        var a;
                        (function (a) {
                            var viewmodel;
                            (function (viewmodel) {
                                var block = nts.uk.ui.block;
                                var confirm = nts.uk.ui.dialog.confirm;
                                var alertError = nts.uk.ui.dialog.alertError;
                                var info = nts.uk.ui.dialog.info;
                                var modal = nts.uk.ui.windows.sub.modal;
                                var setShared = nts.uk.ui.windows.setShared;
                                var getShared = nts.uk.ui.windows.getShared;
                                var queryString = nts.uk.request.location.current.queryString;
                                var LENGTH_HIERARCHY_ORIGIN = 3;
                                var ScreenModel = /** @class */ (function () {
                                    function ScreenModel() {
                                        this.initMode = SCREEN_MODE.WORKPLACE;
                                        this.isUpdateMode = false;
                                        this.selectedCode = ko.observable(null);
                                        this.selectedName = ko.observable(null);
                                        this.selectedDispName = ko.observable(null);
                                        this.selectedGenericName = ko.observable(null);
                                        this.selectedHierarchyCode = ko.observable("");
                                        this.selectedExternalCode = ko.observable(null);
                                        this.isSynchronized = ko.observable(false);
                                        this.listHierarchyChange = [];
                                        this.needRegenerateHierarchyCode = false;
                                        this.backupCode = null;
                                        var self = this;
                                        if (!_.isEmpty(queryString.items)) {
                                            self.initMode = Number(queryString.items["initmode"]);
                                        }
                                        self.configuration = ko.observable(new WkpDepConfig(null, null, null));
                                        self.items = ko.observableArray([]);
                                        self.selectedId = ko.observable(null);
                                        self.selectedId.subscribe(function (value) {
                                            if (_.isEmpty(value)) {
                                                self.backupCode = null;
                                                self.selectedCode(null);
                                                self.selectedDispName(null);
                                                self.selectedGenericName(null);
                                                self.selectedHierarchyCode("");
                                                self.selectedExternalCode(null);
                                                self.selectedName(null);
                                                nts.uk.ui.errors.clearAll();
                                            }
                                            else {
                                                block.invisible();
                                                a.service.getWkpDepInforById(self.initMode, self.configuration().historyId(), value).done(function (res) {
                                                    self.backupCode = res.code;
                                                    self.selectedCode(res.code);
                                                    self.selectedDispName(res.dispName);
                                                    self.selectedGenericName(res.genericName);
                                                    self.selectedHierarchyCode(res.hierarchyCode);
                                                    self.selectedExternalCode(res.externalCode);
                                                    self.selectedName(res.name);
                                                    nts.uk.ui.errors.clearAll();
                                                    $("#A5_2").focus();
                                                }).fail(function (error) {
                                                    alertError(error);
                                                }).always(function () {
                                                    block.clear();
                                                });
                                            }
                                        });
                                        self.selectedName.subscribe(function (value) {
                                            if (_.isEmpty(value) || $("#A6_2").ntsError("hasError"))
                                                return;
                                            if (_.isEmpty(self.selectedDispName())) {
                                                self.selectedDispName(value);
                                            }
                                            if (_.isEmpty(self.selectedGenericName())) {
                                                self.selectedGenericName(self.getGenericName(value));
                                            }
                                            $(".nts-input").trigger("validate");
                                            $("#A5_2").trigger("keyup");
                                        });
                                        self.selectedCode.subscribe(function (value) {
                                            if (!_.isEmpty(self.configuration().historyId()) && value && value != self.backupCode && !$("#A5_2").ntsError("hasError")) {
                                                a.service.checkCode(self.initMode, self.configuration().historyId(), value).done(function (checkResult) {
                                                }).fail(function (error) {
                                                    alertError(error).then(function () {
                                                        if (error.messageId == "Msg_3") {
                                                            self.selectedCode(self.backupCode);
                                                        }
                                                    });
                                                });
                                            }
                                        });
                                        $(document).delegate("#A4_1", "igtreedragstop", function (evt, ui) {
                                            var newDataSource = $("#A4_1").igTree('option', 'dataSource')._rootds._data;
                                            self.items(_.map(newDataSource, function (i) { return new WkpDepNode(i); }));
                                            self.needRegenerateHierarchyCode = true;
                                        });
                                    }
                                    ScreenModel.prototype.startPage = function () {
                                        var self = this, dfd = $.Deferred();
                                        block.invisible();
                                        a.service.getOperationRule().done(function (res) {
                                            self.isSynchronized(res.synchWkpDep);
                                            a.service.getConfiguration(self.initMode).done(function (configuration) {
                                                if (configuration) {
                                                    self.configuration(new WkpDepConfig(configuration.historyId, configuration.startDate, configuration.endDate));
                                                    self.getAllWkpDepInfor().done(function () {
                                                        dfd.resolve();
                                                    }).fail(function (error) {
                                                        dfd.reject();
                                                    }).always(function () {
                                                        block.clear();
                                                    });
                                                }
                                                else {
                                                    dfd.resolve();
                                                    self.openConfigDialog();
                                                }
                                            }).fail(function (error) {
                                                dfd.reject();
                                                alertError(error);
                                                block.clear();
                                            });
                                        }).fail(function (error) {
                                            dfd.reject();
                                            alertError(error);
                                            block.clear();
                                        });
                                        return dfd.promise();
                                    };
                                    ScreenModel.prototype.getAllWkpDepInfor = function (idToSelect) {
                                        var self = this, dfd = $.Deferred();
                                        self.items([]);
                                        self.selectedId(null);
                                        a.service.getAllWkpDepInforTree(self.initMode, self.configuration().historyId()).done(function (data) {
                                            if (_.isEmpty(data)) {
                                                dfd.resolve();
                                                if (self.initMode == SCREEN_MODE.WORKPLACE) {
                                                    info({ messageId: "Msg_373" }).then(function () {
                                                        self.openWkpDepCreateDialog();
                                                    });
                                                }
                                                else {
                                                    info({ messageId: "Msg_1503" }).then(function () {
                                                        self.openWkpDepCreateDialog();
                                                    });
                                                }
                                            }
                                            else {
                                                var listNode = _.map(data, function (i) {
                                                    return new WkpDepNode(i);
                                                });
                                                self.items(listNode);
                                                if (idToSelect)
                                                    self.selectedId(idToSelect);
                                                else if (self.items().length > 0)
                                                    self.selectedId(self.items()[0].id);
                                                dfd.resolve();
                                            }
                                            self.listHierarchyChange = [];
                                            self.needRegenerateHierarchyCode = false;
                                        }).fail(function (error) {
                                            dfd.reject();
                                            alertError(error);
                                        }).always(function () {
                                            block.clear();
                                        });
                                        return dfd.promise();
                                    };
                                    ScreenModel.prototype.registerMaster = function () {
                                        var self = this;
                                        if (_.isEmpty(self.configuration().historyId()) || _.isEmpty(self.items()))
                                            return;
                                        $(".nts-input").trigger("validate");
                                        $("#A5_2").trigger("keyup");
                                        if (nts.uk.ui.errors.hasError())
                                            return;
                                        block.invisible();
                                        //            if (self.needRegenerateHierarchyCode) {
                                        self.generateHierarchyCode(self.items(), "");
                                        //            }
                                        var command = {
                                            initMode: self.initMode,
                                            historyId: self.configuration().historyId(),
                                            id: self.selectedId(),
                                            code: self.selectedCode(),
                                            name: self.selectedName(),
                                            dispName: self.selectedDispName(),
                                            genericName: self.selectedGenericName(),
                                            externalCode: self.selectedExternalCode(),
                                            hierarchyCode: self.selectedHierarchyCode(),
                                            listHierarchyChange: self.listHierarchyChange,
                                            updateMode: true
                                        };
                                        a.service.registerWkpDepInfor(command).done(function (id) {
                                            info({ messageId: "Msg_15" }).then(function () {
                                                self.getAllWkpDepInfor(id);
                                            });
                                        }).fail(function (error) {
                                            alertError(error);
                                        }).always(function () {
                                            block.clear();
                                        });
                                    };
                                    ScreenModel.prototype.deleteMaster = function () {
                                        var self = this;
                                        confirm({ messageId: self.initMode == SCREEN_MODE.WORKPLACE ? "Msg_1505" : "Msg_1506" }).ifYes(function () {
                                            block.invisible();
                                            if (self.needRegenerateHierarchyCode) {
                                                self.generateHierarchyCode(self.items(), "");
                                            }
                                            var currentHierarchyCode = self.selectedHierarchyCode();
                                            var level = currentHierarchyCode.length / 3;
                                            var parentCode = currentHierarchyCode.substring(0, (level - 1) * 3);
                                            var items = _.cloneDeep(self.items()), newItems = [];
                                            var _loop_1 = function (i) {
                                                var hCode = currentHierarchyCode.substring(0, 3 * i);
                                                var node = _.find(items, function (i) { return i.hierarchyCode == hCode; });
                                                items = node.children;
                                            };
                                            for (var i = 1; i < level; i++) {
                                                _loop_1(i);
                                            }
                                            var currIndex = _.findIndex(items, function (i) { return i.id == self.selectedId(); });
                                            items.forEach(function (item, index) {
                                                if (index != currIndex) {
                                                    newItems.push(item);
                                                }
                                            });
                                            self.generateHierarchyCode(newItems, parentCode);
                                            var data = {
                                                initMode: self.initMode,
                                                historyId: self.configuration().historyId(),
                                                selectedWkpDepId: self.selectedId(),
                                                listHierarchyChange: self.listHierarchyChange
                                            };
                                            a.service.deleteWkpDepInfor(data).done(function () {
                                                info({ messageId: "Msg_16" }).then(function () {
                                                    block.invisible();
                                                    self.getAllWkpDepInfor().done(function () {
                                                    }).always(function () {
                                                        block.clear();
                                                    });
                                                });
                                            }).fail(function (error) {
                                                alertError(error);
                                            }).always(function () {
                                                block.clear();
                                            });
                                        }).ifNo(function () {
                                        });
                                    };
                                    ScreenModel.prototype.openConfigDialog = function () {
                                        var self = this, params = {
                                            initMode: self.initMode,
                                            historyId: self.configuration() ? self.configuration().historyId() : null
                                        };
                                        setShared("CMM011AParams", params);
                                        modal("/view/cmm/011/b/index.xhtml").onClosed(function () {
                                            var params = getShared("CMM011BParams");
                                            if (params) {
                                                self.configuration().historyId(params.historyId);
                                                self.configuration().startDate(params.startDate);
                                                self.configuration().endDate(params.endDate);
                                                block.invisible();
                                                self.getAllWkpDepInfor().done(function () {
                                                }).always(function () {
                                                    block.clear();
                                                });
                                            }
                                        });
                                    };
                                    ScreenModel.prototype.openWkpDepCreateDialog = function () {
                                        var self = this;
                                        block.invisible();
                                        a.service.checkTotalWkpDepInfor(self.initMode, self.configuration().historyId()).done(function () {
                                            if (self.needRegenerateHierarchyCode) {
                                                self.generateHierarchyCode(self.items(), "");
                                            }
                                            var node = $("#A4_1").ntsTreeDrag("getSelected");
                                            var params = {
                                                initMode: self.initMode,
                                                selectedCode: node ? node.data.code : self.selectedCode(),
                                                selectedName: node ? node.data.name : self.selectedName(),
                                                selectedHierarchyCode: self.selectedHierarchyCode(),
                                                history: self.configuration().historyId(),
                                                items: self.items(),
                                                listHierarchyChange: self.listHierarchyChange
                                            };
                                            setShared("CMM011AParams", params);
                                            modal("/view/cmm/011/d/index.xhtml").onClosed(function () {
                                                var result = getShared("CreatedWorkplace");
                                                if (result) {
                                                    block.invisible();
                                                    self.getAllWkpDepInfor(result.idToSelect).always(function () {
                                                        block.clear();
                                                    });
                                                }
                                            });
                                        }).fail(function (error) {
                                            block.clear();
                                            alertError(error);
                                        });
                                    };
                                    ScreenModel.prototype.moveLeft = function () {
                                        var self = this;
                                        var node = $("#A4_1").ntsTreeDrag("getSelected");
                                        var target = $("#A4_1").ntsTreeDrag("getParent", node.data.id);
                                        if (target) {
                                            $("#A4_1").ntsTreeDrag("moveNext", target.data.id, node.data.id);
                                            self.needRegenerateHierarchyCode = true;
                                        }
                                    };
                                    ScreenModel.prototype.moveRight = function () {
                                        var self = this;
                                        var node = $("#A4_1").ntsTreeDrag("getSelected");
                                        var target = $("#A4_1").ntsTreeDrag("getPrevious", node.data.id);
                                        if (target) {
                                            $("#A4_1").ntsTreeDrag("moveInto", target.data.id, node.data.id);
                                            self.needRegenerateHierarchyCode = true;
                                        }
                                    };
                                    ScreenModel.prototype.moveUp = function () {
                                        var self = this;
                                        var node = $("#A4_1").ntsTreeDrag("getSelected");
                                        $("#A4_1").ntsTreeDrag("moveUp", node.id);
                                        self.needRegenerateHierarchyCode = true;
                                    };
                                    ScreenModel.prototype.moveDown = function () {
                                        var self = this;
                                        var node = $("#A4_1").ntsTreeDrag("getSelected");
                                        $("#A4_1").ntsTreeDrag("moveDown", node.id);
                                        self.needRegenerateHierarchyCode = true;
                                    };
                                    ScreenModel.prototype.getGenericName = function (value) {
                                        var self = this, result = "";
                                        var currentHierarchyCode = self.selectedHierarchyCode();
                                        if (currentHierarchyCode) {
                                            var level = Math.floor(currentHierarchyCode.length / 3);
                                            var items = self.items();
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
                                            if (node.id == self.selectedId()) {
                                                self.selectedHierarchyCode(newHierarchyCode);
                                            }
                                            self.generateHierarchyCode(node.children, node.hierarchyCode);
                                        });
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
                                var WkpDepNode = /** @class */ (function () {
                                    function WkpDepNode(param) {
                                        if (param) {
                                            this.id = param.id;
                                            this.code = param.code;
                                            this.name = param.name;
                                            this.nodeText = _.escape(param.code + ' ' + param.name);
                                            this.hierarchyCode = param.hierarchyCode;
                                            this.children = _.isEmpty(param.children) ? [] : _.map(param.children, function (i) { return new WkpDepNode(i); });
                                        }
                                    }
                                    return WkpDepNode;
                                }());
                                var WkpDepConfig = /** @class */ (function () {
                                    function WkpDepConfig(histId, startDate, endDate) {
                                        this.historyId = ko.observable(histId);
                                        this.startDate = ko.observable(startDate);
                                        this.endDate = ko.observable(endDate);
                                    }
                                    return WkpDepConfig;
                                }());
                                var WkpDepInformation = /** @class */ (function () {
                                    function WkpDepInformation(params) {
                                        this.id = ko.observable(null);
                                        this.code = ko.observable(null);
                                        this.name = ko.observable(null);
                                        this.dispName = ko.observable(null);
                                        this.genericName = ko.observable(null);
                                        this.hierarchyCode = ko.observable(null);
                                        this.externalCode = ko.observable(null);
                                        if (params) {
                                            this.id(params.id);
                                            this.code(params.code);
                                            this.name(params.name);
                                            this.dispName(params.dispName);
                                            this.genericName(params.genericName);
                                            this.hierarchyCode(params.hierarchyCode);
                                            this.externalCode(params.externalCode);
                                        }
                                    }
                                    return WkpDepInformation;
                                }());
                            })(viewmodel = a.viewmodel || (a.viewmodel = {}));
                        })(a = v2.a || (v2.a = {}));
                    })(v2 = cmm011.v2 || (cmm011.v2 = {}));
                })(cmm011 = view.cmm011 || (view.cmm011 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm011.v2.a.vm.js.map