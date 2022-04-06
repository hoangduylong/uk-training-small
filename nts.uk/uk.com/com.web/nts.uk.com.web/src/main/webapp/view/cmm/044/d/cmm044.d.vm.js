var cmm044;
(function (cmm044) {
    var d;
    (function (d) {
        var viewmodel;
        (function (viewmodel) {
            var ScreenModel = /** @class */ (function () {
                function ScreenModel() {
                    var self = this;
                    self.date = ko.observable('20000101');
                    self.yearMonth = ko.observable(200001);
                    self.dateValue = ko.observable({ startDate: '', endDate: '' });
                    self.histItems = ko.observableArray([]);
                    self.personList = ko.observableArray([]);
                    self.dataPerson = ko.observableArray([]);
                    self.tabs = ko.observableArray(nts.uk.ui.windows.getShared("CMM044_TABS"));
                    $("#fixed-table").ntsFixedTable({ height: 356, width: 1050 });
                }
                ScreenModel.prototype.start = function () {
                    var self = this, dfd = $.Deferred();
                    self.personList.removeAll();
                    dfd.resolve();
                    return dfd.promise();
                };
                ScreenModel.prototype.closeDialog = function () {
                    nts.uk.ui.windows.close();
                };
                ScreenModel.prototype.printData = function () {
                    var self = this;
                    if (self.personList().length == 0) {
                        nts.uk.ui.dialog.alertError({ messageId: "Msg_7" });
                        return;
                    }
                    nts.uk.ui.block.invisible();
                    nts.uk.request.exportFile("/workflow/agent/report/generate", ko.toJS(self.personList)).done(function () {
                        // Process results after generating report.
                    }).fail(function (error) {
                        nts.uk.ui.dialog.alertError(error);
                    }).always(function () {
                        nts.uk.ui.block.clear();
                    });
                };
                ScreenModel.prototype.findEmployee = function (employeeIds) {
                    var self = this, dfd = $.Deferred();
                    var option = {
                        baseDate: moment().toDate(),
                        employeeIds: employeeIds
                    };
                    d.service.findEmployees(option).done(function (res) {
                        self.dataPerson(res);
                        dfd.resolve();
                    }).fail(function (error) {
                        dfd.reject(error);
                    });
                    return dfd.promise();
                };
                ScreenModel.prototype.findAgentByDate = function () {
                    var self = this, employeeIds = [];
                    var dfd = $.Deferred();
                    self.personList.removeAll();
                    nts.uk.ui.block.invisible();
                    d.service.findAgentByDate(self.dateValue().startDate, self.dateValue().endDate).done(function (agent_arr) {
                        if (agent_arr.length == 0) {
                            nts.uk.ui.dialog.alertError({ messageId: "Msg_7" }).then(function () {
                                self.dateValue({ startDate: '', endDate: '' });
                            });
                            return;
                        }
                        _.each(agent_arr, function (x) {
                            employeeIds.push(x.employeeId);
                            if (!nts.uk.util.isNullOrEmpty(x.agentSid1)) {
                                employeeIds.push(x.agentSid1);
                            }
                            if (!nts.uk.util.isNullOrEmpty(x.agentSid2)) {
                                employeeIds.push(x.agentSid2);
                            }
                            if (!nts.uk.util.isNullOrEmpty(x.agentSid3)) {
                                employeeIds.push(x.agentSid3);
                            }
                            if (!nts.uk.util.isNullOrEmpty(x.agentSid4)) {
                                employeeIds.push(x.agentSid4);
                            }
                        });
                        var employeUniqIds = _.uniq(employeeIds);
                        nts.uk.ui.block.invisible();
                        self.findEmployee(employeUniqIds).done(function () {
                            _.forEach(agent_arr, function (agent) {
                                var employee = _.find(self.dataPerson(), function (e) {
                                    return e.employeeId == agent.employeeId;
                                });
                                if (employee) {
                                    self.personList.push(new AgentData(employee.employeeCode, employee.employeeName, employee.workplaceCode, employee.workplaceName, employee.jobTitleName, agent.startDate, agent.endDate, self.tabs()[0].title, self.getAgentCode(agent.agentAppType1, agent.agentSid1), self.getAgentName(agent.agentAppType1, agent.agentSid1), self.getAgentWorkplaceCode(agent.agentAppType1, agent.agentSid1), self.getAgentWorkplaceName(agent.agentAppType1, agent.agentSid1), self.getAgentJobTitleName(agent.agentAppType1, agent.agentSid1), self.getColSpanAgentAppType(agent.agentAppType1)));
                                    // self.personList.push(new AgentData("", "", "", "", "", "", "", self.tabs()[1].title, self.getAgentCode(agent.agentAppType2, agent.agentSid2), self.getAgentName(agent.agentAppType2, agent.agentSid2), self.getColSpanAgentAppType(agent.agentAppType2)));
                                    // self.personList.push(new AgentData("", "", "", "", "", "", "", self.tabs()[2].title, self.getAgentCode(agent.agentAppType3, agent.agentSid3), self.getAgentName(agent.agentAppType3, agent.agentSid3), self.getColSpanAgentAppType(agent.agentAppType3)));
                                    // self.personList.push(new AgentData("", "", "", "", "", "", "", self.tabs()[3].title, self.getAgentCode(agent.agentAppType4, agent.agentSid4), self.getAgentName(agent.agentAppType4, agent.agentSid4), self.getColSpanAgentAppType(agent.agentAppType4)));
                                }
                            });
                            self.personList(_.sortBy(self.personList(), [function (o) { return o.employeeCode(); }, function (o) { return new Date(o.startDate()); }]));
                            var targetCode = "";
                            self.personList().forEach(function (data) {
                                if (targetCode != data.employeeCode()) {
                                    targetCode = data.employeeCode();
                                }
                                else {
                                    data.employeeCode("");
                                    data.employeeName("");
                                    data.workPlaceCode("");
                                    data.workPlaceName("");
                                    data.position("");
                                }
                            });
                        }).fail(function (error) {
                            nts.uk.ui.dialog.alertError(error);
                            dfd.reject(error);
                        }).always(function () {
                            nts.uk.ui.block.clear();
                        });
                        dfd.resolve();
                    }).fail(function (error) {
                        nts.uk.ui.dialog.alertError(error);
                        dfd.reject(error);
                    }).always(function () {
                        nts.uk.ui.block.clear();
                    });
                    return dfd.promise();
                };
                ScreenModel.prototype.getAgentCode = function (agentAppType, agentSID) {
                    var self = this;
                    var result = "";
                    switch (agentAppType) {
                        case model.AgentAppType.SUBSTITUTE_DESIGNATION:
                            var employee = _.find(self.dataPerson(), function (e) {
                                return e.employeeId == agentSID;
                            });
                            result = employee.employeeCode; //convert to employeeCode
                            break;
                        case model.AgentAppType.PATH:
                            result = nts.uk.resource.getText("CMM044_17");
                            break;
                        case model.AgentAppType.NO_SETTINGS:
                            result = nts.uk.resource.getText("CMM044_18");
                            break;
                    }
                    return result;
                };
                ScreenModel.prototype.getAgentName = function (agentAppType, agentSID) {
                    var self = this;
                    var result = "";
                    switch (agentAppType) {
                        case model.AgentAppType.SUBSTITUTE_DESIGNATION:
                            var employee = _.find(self.dataPerson(), function (e) {
                                return e.employeeId == agentSID;
                            });
                            result = employee.employeeName;
                            break;
                        case model.AgentAppType.PATH:
                            result = "";
                            break;
                        case model.AgentAppType.NO_SETTINGS:
                            result = "";
                            break;
                    }
                    return result;
                };
                ScreenModel.prototype.getAgentWorkplaceCode = function (agentAppType, agentSID) {
                    var self = this;
                    var result = "";
                    switch (agentAppType) {
                        case model.AgentAppType.SUBSTITUTE_DESIGNATION:
                            var employee = _.find(self.dataPerson(), function (e) {
                                return e.employeeId == agentSID;
                            });
                            result = employee.workplaceCode;
                            break;
                        case model.AgentAppType.PATH:
                            result = "";
                            break;
                        case model.AgentAppType.NO_SETTINGS:
                            result = "";
                            break;
                    }
                    return result;
                };
                ScreenModel.prototype.getAgentWorkplaceName = function (agentAppType, agentSID) {
                    var self = this;
                    var result = "";
                    switch (agentAppType) {
                        case model.AgentAppType.SUBSTITUTE_DESIGNATION:
                            var employee = _.find(self.dataPerson(), function (e) {
                                return e.employeeId == agentSID;
                            });
                            result = employee.workplaceName;
                            break;
                        case model.AgentAppType.PATH:
                            result = "";
                            break;
                        case model.AgentAppType.NO_SETTINGS:
                            result = "";
                            break;
                    }
                    return result;
                };
                ScreenModel.prototype.getAgentJobTitleName = function (agentAppType, agentSID) {
                    var self = this;
                    var result = "";
                    switch (agentAppType) {
                        case model.AgentAppType.SUBSTITUTE_DESIGNATION:
                            var employee = _.find(self.dataPerson(), function (e) {
                                return e.employeeId == agentSID;
                            });
                            result = employee.jobTitleName;
                            break;
                        case model.AgentAppType.PATH:
                            result = "";
                            break;
                        case model.AgentAppType.NO_SETTINGS:
                            result = "";
                            break;
                    }
                    return result;
                };
                ScreenModel.prototype.getColSpanAgentAppType = function (agentAppType) {
                    var result = false;
                    switch (agentAppType) {
                        case model.AgentAppType.SUBSTITUTE_DESIGNATION:
                            result = false;
                            break;
                        case model.AgentAppType.PATH:
                            result = false;
                            break;
                        case model.AgentAppType.NO_SETTINGS:
                            result = true;
                            break;
                    }
                    return result;
                };
                return ScreenModel;
            }());
            viewmodel.ScreenModel = ScreenModel;
            var model;
            (function (model) {
                var AgentDto = /** @class */ (function () {
                    function AgentDto(companyId, employeeId, requestId, startDate, endDate) {
                        this.companyId = companyId;
                        this.employeeId = employeeId;
                        this.requestId = requestId;
                        this.startDate = startDate;
                        this.endDate = endDate;
                    }
                    return AgentDto;
                }());
                model.AgentDto = AgentDto;
                var AgentAppType;
                (function (AgentAppType) {
                    AgentAppType[AgentAppType["SUBSTITUTE_DESIGNATION"] = 0] = "SUBSTITUTE_DESIGNATION";
                    AgentAppType[AgentAppType["PATH"] = 1] = "PATH";
                    AgentAppType[AgentAppType["NO_SETTINGS"] = 2] = "NO_SETTINGS";
                })(AgentAppType = model.AgentAppType || (model.AgentAppType = {}));
            })(model = viewmodel.model || (viewmodel.model = {}));
            var AgentData = /** @class */ (function () {
                function AgentData(employeeCode, employeeName, workPlaceCode, workPlaceName, position, startDate, endDate, agentTarget, agentCode, agentName, agentWorkPlaceCode, agentWorkPlaceName, agentPosition, hasColSpan) {
                    this.employeeCode = ko.observable(employeeCode);
                    this.employeeName = ko.observable(employeeName);
                    this.workPlaceCode = ko.observable(workPlaceCode);
                    this.workPlaceName = ko.observable(workPlaceName);
                    this.position = ko.observable(position);
                    this.startDate = ko.observable(startDate);
                    this.endDate = ko.observable(endDate);
                    this.agentTarget = ko.observable(agentTarget);
                    this.agentCode = ko.observable(agentCode);
                    this.agentName = ko.observable(agentName);
                    this.agentWorkPlaceCode = ko.observable(agentWorkPlaceCode);
                    this.agentWorkPlaceName = ko.observable(agentWorkPlaceName);
                    this.agentPosition = ko.observable(agentPosition);
                    this.hasColSpan = ko.observable(hasColSpan);
                }
                return AgentData;
            }());
            viewmodel.AgentData = AgentData;
        })(viewmodel = d.viewmodel || (d.viewmodel = {}));
    })(d = cmm044.d || (cmm044.d = {}));
})(cmm044 || (cmm044 = {}));
//# sourceMappingURL=cmm044.d.vm.js.map