var cmm044;
(function (cmm044) {
    var a;
    (function (a) {
        var viewmodel;
        (function (viewmodel) {
            var getText = nts.uk.resource.getText;
            var alert = nts.uk.ui.dialog.alert;
            var setShared = nts.uk.ui.windows.setShared;
            var getShared = nts.uk.ui.windows.getShared;
            var SystemType = kcp009.viewmodel.SystemType;
            var ScreenModel = /** @class */ (function () {
                function ScreenModel() {
                    this.listEmployee = ko.observableArray([]);
                    this.baseDate = ko.observable(new Date());
                    var self = this;
                    self.employeeInputList = ko.observableArray([]);
                    self.selectedItem = ko.observable(null);
                    self.currentItem = ko.observable(null);
                    self.tabs = ko.observableArray([
                        { id: 'tab-1', title: getText("CMM044_11"), content: '.tab-content-1', enable: ko.observable(true), visible: ko.observable(true) },
                        { id: 'tab-2', title: getText("CMM044_12"), content: '.tab-content-2', enable: ko.observable(true), visible: ko.observable(true) },
                        { id: 'tab-3', title: getText("CMM044_37"), content: '.tab-content-3', enable: ko.observable(true), visible: ko.observable(true) },
                        { id: 'tab-4', title: getText("CMM044_13"), content: '.tab-content-4', enable: ko.observable(true), visible: ko.observable(true) }
                    ]);
                    self.selectedTab = ko.observable('tab-1');
                    self.isEnableDelete = ko.observable(true);
                    self.isEnableAdd = ko.observable(true);
                    self.histItems = ko.observableArray([]);
                    self.histSelectedItem = ko.observable("");
                    self.selectedItem.subscribe(function (newValue) {
                        if (newValue) {
                            $.when(self.getAllAgen(newValue)).done(function () {
                                if (self.histItems().length > 0) {
                                    self.histSelectedItem(self.histItems()[0].requestId);
                                }
                                else {
                                    self.initAgent();
                                }
                            });
                        }
                    });
                    self.histSelectedItem.subscribe(function (requestId) {
                        if (requestId) {
                            $.when(self.getAgen(self.selectedItem(), requestId)).done(function () {
                                nts.uk.ui.errors.clearAll();
                                self.isEnableDelete(true);
                                self.isEnableAdd(true);
                                if (!nts.uk.text.isNullOrEmpty(self.currentItem().agentSid1())) {
                                    a.service.findEmployeeName(self.currentItem().agentSid1()).done(function (response) {
                                        self.currentItem().employeeCodeScreen1(response ? response.employeeCode : "");
                                        self.currentItem().employeeNameScreen1(response ? response.businessName : "");
                                    });
                                }
                                if (!nts.uk.text.isNullOrEmpty(self.currentItem().agentSid2())) {
                                    a.service.findEmployeeName(self.currentItem().agentSid2()).done(function (response) {
                                        self.currentItem().employeeCodeScreen2(response ? response.employeeCode : "");
                                        self.currentItem().employeeNameScreen2(response ? response.businessName : "");
                                    });
                                }
                                if (!nts.uk.text.isNullOrEmpty(self.currentItem().agentSid3())) {
                                    a.service.findEmployeeName(self.currentItem().agentSid3()).done(function (response) {
                                        self.currentItem().employeeCodeScreen3(response ? response.employeeCode : "");
                                        self.currentItem().employeeNameScreen3(response ? response.businessName : "");
                                    });
                                }
                                if (!nts.uk.text.isNullOrEmpty(self.currentItem().agentSid4())) {
                                    a.service.findEmployeeName(self.currentItem().agentSid4()).done(function (response) {
                                        self.currentItem().employeeCodeScreen4(response ? response.employeeCode : "");
                                        self.currentItem().employeeNameScreen4(response ? response.businessName : "");
                                    });
                                }
                            });
                        }
                    });
                    self.itemList = ko.observableArray([
                        new BoxModel(0, getText("CMM044_16")),
                        new BoxModel(1, getText("CMM044_17")),
                        new BoxModel(2, getText("CMM044_18"))
                    ]);
                }
                ScreenModel.prototype.searchEmployee = function (employees) {
                    var self = this;
                    self.employeeInputList.removeAll();
                    _.forEach(employees, function (item) {
                        var input = {
                            id: item.employeeId,
                            code: item.employeeCode,
                            businessName: item.employeeName
                        };
                        self.employeeInputList.push(input);
                    });
                    var containResult = _.find(self.employeeInputList(), function (item) { return item.id == self.selectedItem(); });
                    if (nts.uk.util.isNullOrUndefined(containResult)) {
                        if (!nts.uk.util.isNullOrEmpty(self.employeeInputList())) {
                            self.selectedItem(self.employeeInputList()[0].id);
                        }
                    }
                    self.initKCP009();
                };
                ScreenModel.prototype.initCCG001 = function () {
                    var self = this;
                    // Component option
                    var ccgcomponent = {
                        /** Common properties */
                        systemType: 2,
                        showEmployeeSelection: false,
                        showQuickSearchTab: true,
                        showAdvancedSearchTab: true,
                        showBaseDate: true,
                        showClosure: false,
                        showAllClosure: false,
                        showPeriod: false,
                        periodFormatYM: false,
                        /** Required parameter */
                        baseDate: self.baseDate().toISOString(),
                        inService: true,
                        leaveOfAbsence: true,
                        closed: true,
                        retirement: true,
                        /** Quick search tab options */
                        showAllReferableEmployee: true,
                        showOnlyMe: false,
                        showSameWorkplace: true,
                        showSameWorkplaceAndChild: true,
                        /** Advanced search properties */
                        showEmployment: false,
                        showWorkplace: true,
                        showDepartment: false,
                        showClassification: false,
                        showJobTitle: false,
                        showWorktype: false,
                        isMutipleCheck: true,
                        /** Return data */
                        returnDataFromCcg001: function (data) {
                            self.listEmployee(data.listEmployee);
                            self.searchEmployee(data.listEmployee);
                        }
                    };
                    // Start component
                    $('#ccgcomponent').ntsGroupComponent(ccgcomponent);
                };
                ScreenModel.prototype.initKCP009 = function () {
                    var self = this;
                    var listComponentOption = {
                        systemReference: SystemType.EMPLOYMENT,
                        isDisplayOrganizationName: false,
                        employeeInputList: self.employeeInputList,
                        targetBtnText: getText("KCP009_3"),
                        selectedItem: self.selectedItem,
                        tabIndex: 1
                    };
                    $('#emp-component').ntsLoadListComponent(listComponentOption);
                };
                ScreenModel.prototype.start = function () {
                    var self = this;
                    var dfd = $.Deferred();
                    self.currentItem(new AgentAppDto(null, "", "", "", "", null, "", null, "", null, "", null));
                    self.initCCG001();
                    if (self.employeeInputList().length == 0) {
                        self.isEnableDelete(false);
                        self.isEnableAdd(false);
                        a.service.searchEmployeeByLogin(self.baseDate()).done(function (data) {
                            if (data.length > 0) {
                                self.searchEmployee(data);
                                self.listEmployee(data);
                            }
                        }).fail(function (error) {
                            alert(error);
                        });
                    }
                    dfd.resolve();
                    return dfd.promise();
                };
                /**
                 * find agen by employee
                 */
                ScreenModel.prototype.getAllAgen = function (employeeId) {
                    var self = this;
                    var dfd = $.Deferred();
                    self.histItems.removeAll();
                    a.service.findAllAgent(employeeId).done(function (agent_arr) {
                        if (agent_arr && agent_arr.length) {
                            self.histItems.removeAll();
                            agent_arr.forEach(function (agent) {
                                self.histItems.push(new AgentDto(agent));
                            });
                        }
                        dfd.resolve();
                    }).fail(function (error) {
                        alert(error.message);
                        dfd.reject(error);
                    });
                    return dfd.promise();
                };
                /**
                 * find agent by requestId
                 */
                ScreenModel.prototype.getAgen = function (employeeId, requestId) {
                    var self = this;
                    var dfd = $.Deferred();
                    if (!requestId) {
                        return;
                    }
                    var param = {
                        employeeId: employeeId,
                        requestId: requestId
                    };
                    a.service.findAgent(param).done(function (agent) {
                        self.currentItem(new AgentAppDto(employeeId, requestId, agent.startDate, agent.endDate, agent.agentSid1, agent.agentAppType1, agent.agentSid2, agent.agentAppType2, agent.agentSid3, agent.agentAppType3, agent.agentSid4, agent.agentAppType4));
                        $("#daterangepicker").find(".ntsStartDatePicker").focus();
                        dfd.resolve();
                    }).fail(function (error) {
                        alert(error.message);
                        dfd.reject(error);
                    });
                    return dfd.promise();
                };
                /**
                 * Find agent
                 */
                ScreenModel.prototype.findInHistItem = function (employeeId, requestId) {
                    var self = this;
                    return _.find(self.histItems(), function (item) {
                        if (item.employeeId == employeeId && item.requestId == requestId) {
                            return item;
                        }
                    });
                };
                /**
                 * Add new agent and Update agent
                 */
                ScreenModel.prototype.addAgent = function () {
                    var self = this;
                    $(".nts-input").trigger("validate");
                    if (nts.uk.ui.errors.hasError()) {
                        return;
                    }
                    nts.uk.ui.block.invisible();
                    var agent = ko.toJSON(self.currentItem());
                    // agent["employeeId"] = self.selectedItem();
                    var existsItem = self.findInHistItem(self.currentItem().employeeId(), self.histSelectedItem());
                    if (existsItem) {
                        a.service.updateAgent(agent).done(function () {
                            self.getAllAgen(self.selectedItem());
                            nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(function () {
                                $("#daterangepicker").find(".ntsStartDatePicker").focus();
                            });
                        }).fail(function (error) {
                            alert(error);
                        }).always(function () {
                            nts.uk.ui.block.clear();
                        });
                    }
                    else {
                        a.service.addAgent(agent).done(function (res) {
                            var resObj = ko.toJS(res);
                            if (self.histSelectedItem) {
                                self.getAllAgen(self.selectedItem());
                                self.histSelectedItem(res);
                                nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(function () {
                                    $("#daterangepicker").find(".ntsStartDatePicker").focus();
                                });
                            }
                        }).fail(function (error) {
                            alert(error).then(function () {
                                if (error.messageId == "Msg_141") {
                                    $("#A3_007").focus();
                                }
                            });
                        }).always(function () {
                            nts.uk.ui.block.clear();
                        });
                    }
                };
                ScreenModel.prototype.deleteAgent = function () {
                    var self = this;
                    var index_of_itemDelete = _.findIndex(self.histItems(), ['requestId', self.histSelectedItem()]);
                    nts.uk.ui.dialog.confirm("データを削除します。\r\nよろしいですか？").ifYes(function () {
                        var agent = {
                            employeeId: self.selectedItem(),
                            requestId: self.currentItem().requestId()
                        };
                        a.service.deleteAgent(agent).done(function () {
                            $.when(self.getAllAgen(self.selectedItem())).done(function () {
                                var requestId = "";
                                if (self.histItems().length == 0) {
                                    self.initAgent();
                                }
                                else if (self.histItems().length == 1) {
                                    requestId = self.histItems()[0].requestId;
                                }
                                else if (index_of_itemDelete == self.histItems().length) {
                                    requestId = self.histItems()[index_of_itemDelete - 1].requestId;
                                }
                                else {
                                    requestId = self.histItems()[index_of_itemDelete].requestId;
                                }
                                nts.uk.ui.dialog.info({ messageId: "Msg_16" }).then(function () {
                                    nts.uk.ui.errors.clearAll();
                                    self.histSelectedItem(requestId);
                                    $("#daterangepicker").find(".ntsStartDatePicker").focus();
                                });
                            });
                        }).fail(function (error) {
                            alert(error);
                        });
                    }).ifNo(function () {
                    });
                };
                ScreenModel.prototype.initAgent = function () {
                    var self = this;
                    nts.uk.ui.errors.clearAll();
                    if (!nts.uk.util.isNullOrUndefined(self.selectedItem())) {
                        self.isEnableDelete(false);
                        self.isEnableAdd(true);
                        self.selectedTab('tab-1');
                        self.histSelectedItem("");
                        self.currentItem(new AgentAppDto(self.selectedItem(), "", "", "", "", null, "", null, "", null, "", null));
                        _.defer(function () {
                            $("#daterangepicker").find(".ntsStartDatePicker").focus();
                        });
                    }
                };
                ScreenModel.prototype.openCDialog = function () {
                    var self = this;
                    // nts.uk.ui.block.invisible();
                    nts.uk.ui.windows.setShared('cmm044_Email', {
                        startDate: self.currentItem().startDate(),
                        endDate: self.currentItem().endDate(),
                        targetId: self.selectedItem(),
                        targetCode: _.find(self.employeeInputList(), function (e) { return e.id == self.selectedItem(); }).code,
                        targetName: _.find(self.employeeInputList(), function (e) { return e.id == self.selectedItem(); }).businessName,
                        approverId: self.currentItem().agentSid1(),
                        approverCode: self.currentItem().employeeCodeScreen1(),
                        approverName: self.currentItem().employeeNameScreen1()
                    });
                    nts.uk.ui.windows.sub.modal('/view/cmm/044/c/index.xhtml').onClosed(function () {
                        nts.uk.ui.block.clear();
                        $("#daterangepicker").find(".ntsStartDatePicker").focus();
                    });
                };
                ScreenModel.prototype.openDDialog = function () {
                    var self = this;
                    nts.uk.ui.block.invisible();
                    nts.uk.ui.windows.setShared('CMM044_TABS', self.tabs());
                    nts.uk.ui.windows.sub.modal('/view/cmm/044/d/index.xhtml').onClosed(function () {
                        nts.uk.ui.block.clear();
                        $("#daterangepicker").find(".ntsStartDatePicker").focus();
                    });
                };
                ScreenModel.prototype.exportExcel = function () {
                    var self = this;
                    nts.uk.ui.block.invisible();
                    a.service.exportExcel(self.listEmployee()).done(function () {
                    }).fail(function (error) {
                        alert(error);
                    }).always(function () {
                        nts.uk.ui.block.clear();
                    });
                };
                return ScreenModel;
            }());
            viewmodel.ScreenModel = ScreenModel;
            var BoxModel = /** @class */ (function () {
                function BoxModel(id, name) {
                    var self = this;
                    self.id = id;
                    self.name = name;
                }
                return BoxModel;
            }());
            var AgentDto = /** @class */ (function () {
                function AgentDto(agent) {
                    this.employeeId = agent.employeeId;
                    this.requestId = agent.requestId;
                    this.startDate = agent.startDate;
                    this.endDate = agent.endDate;
                    this.text = agent.startDate + ' ～ ' + agent.endDate;
                }
                return AgentDto;
            }());
            var AgentAppDto = /** @class */ (function () {
                function AgentAppDto(employeeId, requestId, startDate, endDate, agentSid1, agentAppType1, agentSid2, agentAppType2, agentSid3, agentAppType3, agentSid4, agentAppType4) {
                    var _this = this;
                    this.employeeId = ko.observable(employeeId);
                    this.requestId = ko.observable(requestId);
                    this.startDate = ko.observable(startDate ? new Date(startDate).toISOString() : "");
                    this.endDate = ko.observable(endDate ? new Date(endDate).toISOString() : "");
                    this.dateValue = ko.observable({ startDate: startDate, endDate: endDate });
                    this.agentSid1 = ko.observable(agentSid1);
                    this.agentAppType1 = ko.observable(agentAppType1 || 0);
                    this.displayEmployeeInfo1 = ko.computed(function () { return _this.agentAppType1() == 0; }, this);
                    this.employeeCodeScreen1 = ko.observable("");
                    this.employeeNameScreen1 = ko.observable("");
                    this.agentSid2 = ko.observable(agentSid2);
                    this.agentAppType2 = ko.observable(agentAppType2 || 2);
                    this.displayEmployeeInfo2 = ko.computed(function () { return _this.agentAppType2() == 0; }, this);
                    this.employeeCodeScreen2 = ko.observable("");
                    this.employeeNameScreen2 = ko.observable("");
                    this.agentSid3 = ko.observable(agentSid3);
                    this.agentAppType3 = ko.observable(agentAppType3 || 2);
                    this.displayEmployeeInfo3 = ko.computed(function () { return _this.agentAppType3() == 0; }, this);
                    this.employeeCodeScreen3 = ko.observable("");
                    this.employeeNameScreen3 = ko.observable("");
                    this.agentSid4 = ko.observable(agentSid4);
                    this.agentAppType4 = ko.observable(agentAppType4 || 2);
                    this.displayEmployeeInfo4 = ko.computed(function () { return _this.agentAppType4() == 0; }, this);
                    this.employeeCodeScreen4 = ko.observable("");
                    this.employeeNameScreen4 = ko.observable("");
                    this.dateValue.subscribe(function (value) {
                        _this.startDate(value.startDate ? new Date(value.startDate).toISOString() : "");
                        _this.endDate(value.endDate ? new Date(value.endDate).toISOString() : "");
                    });
                }
                AgentAppDto.prototype.openCDL021 = function (tab) {
                    var self = this;
                    nts.uk.ui.block.invisible();
                    var selectedId = [];
                    switch (tab) {
                        case 1:
                            selectedId.push(self.agentSid1());
                            break;
                        case 2:
                            selectedId.push(self.agentSid2());
                            break;
                        case 3:
                            selectedId.push(self.agentSid3());
                            break;
                        case 4:
                            selectedId.push(self.agentSid4());
                            break;
                        default:
                            break;
                    }
                    // Set Param
                    setShared('CDL009Params', {
                        // isMultiSelect For Employee List Kcp005
                        isMultiSelect: false,
                        // For Workplace List Kcp004
                        selectedIds: selectedId,
                        // For Workplace List Kcp004
                        baseDate: new Date(),
                        // Workplace or Department
                        target: 1
                    }, true);
                    nts.uk.ui.windows.sub.modal('/view/cdl/009/a/index.xhtml').onClosed(function () {
                        var isCancel = getShared('CDL009Cancel');
                        var employeeId = getShared('CDL009Output');
                        if (isCancel) {
                            return;
                        }
                        if (employeeId) {
                            a.service.findEmployeeName(employeeId).done(function (response) {
                                switch (tab) {
                                    case 1:
                                        self.agentSid1(employeeId);
                                        self.employeeCodeScreen1(response ? response.employeeCode : "");
                                        self.employeeNameScreen1(response ? response.businessName : "");
                                        break;
                                    case 2:
                                        self.agentSid2(employeeId);
                                        self.employeeCodeScreen2(response ? response.employeeCode : "");
                                        self.employeeNameScreen2(response ? response.businessName : "");
                                        break;
                                    case 3:
                                        self.agentSid3(employeeId);
                                        self.employeeCodeScreen3(response ? response.employeeCode : "");
                                        self.employeeNameScreen3(response ? response.businessName : "");
                                        break;
                                    case 4:
                                        self.agentSid4(employeeId);
                                        self.employeeCodeScreen4(response ? response.employeeCode : "");
                                        self.employeeNameScreen4(response ? response.businessName : "");
                                        break;
                                    default:
                                        break;
                                }
                            });
                        }
                        nts.uk.ui.block.clear();
                    });
                };
                return AgentAppDto;
            }());
        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
    })(a = cmm044.a || (cmm044.a = {}));
})(cmm044 || (cmm044 = {}));
//# sourceMappingURL=cmm044.a.vm.js.map