var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm013;
                (function (cmm013) {
                    var h;
                    (function (h) {
                        var viewmodel;
                        (function (viewmodel) {
                            var service = nts.uk.com.view.cmm013.h.service;
                            var text = nts.uk.resource.getText;
                            var dialog = nts.uk.ui.dialog;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.approverJobLst = ko.observableArray([]);
                                    this.approverGroupLst = ko.observableArray([]);
                                    this.currentApproverGroup = ko.observable(new ApproverGroup({ approverGroupCD: "", approverGroupName: "", approverJobList: [] }));
                                    this.currentApproverGroupCD = ko.observable("");
                                    this.currentApproverJobCD = ko.observable("");
                                    this.baseDate = moment.utc();
                                    this.listTitleInfo = [];
                                    this.isInsertNew = ko.observable(true);
                                    var self = this;
                                    self.currentApproverGroupCD.subscribe(function (value) {
                                        nts.uk.ui.errors.clearAll();
                                        if (_.isEmpty(value)) {
                                            self.isInsertNew(true);
                                            self.currentApproverGroup().approverGroupCD("");
                                            self.currentApproverGroup().approverGroupName("");
                                            self.currentApproverGroup().approverJobList = [];
                                            self.approverJobLst([]);
                                        }
                                        else {
                                            self.getCurrentApproverGroup(value);
                                            self.approverJobLst(self.getApproverJobLst(self.listTitleInfo, _.map(_.sortBy(self.currentApproverGroup().approverJobList, function (a) { return a.order; }), function (o) { return o.jobID; })));
                                            self.currentApproverJobCD(self.getCurrentApproverJobCD());
                                            self.isInsertNew(false);
                                        }
                                    });
                                }
                                ScreenModel.prototype.startPage = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    nts.uk.ui.block.invisible();
                                    var dfdTitleInfo = service.findAllJobTitle({ baseDate: self.baseDate });
                                    var dfdApproverGroup = service.findAll();
                                    $.when(dfdTitleInfo, dfdApproverGroup).done(function (dataTitleInfo, dataApproverGroup) {
                                        self.listTitleInfo = dataTitleInfo;
                                        self.initData(dataApproverGroup);
                                        nts.uk.ui.block.clear();
                                        dfd.resolve();
                                    }).fail(function (res1, res2) {
                                        dialog.alertError({ messageId: res1.messageId })
                                            .then(function () {
                                            nts.uk.ui.block.clear();
                                        });
                                        dialog.alertError({ messageId: res2.messageId })
                                            .then(function () {
                                            nts.uk.ui.block.clear();
                                        });
                                        dfd.reject();
                                    });
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.reload = function (index) {
                                    var self = this;
                                    nts.uk.ui.block.invisible();
                                    service.findAll()
                                        .done(function (data) {
                                        self.initData(data, index);
                                        nts.uk.ui.block.clear();
                                    }).fail(function (res) {
                                        dialog.alertError({ messageId: res.messageId })
                                            .then(function () {
                                            nts.uk.ui.block.clear();
                                        });
                                    });
                                };
                                ScreenModel.prototype.initData = function (data, index) {
                                    var self = this;
                                    self.approverGroupLst(_.sortBy(data, function (o) { return o.approverGroupCD; }));
                                    if (_.isEmpty(self.approverGroupLst())) {
                                        self.createNew();
                                        return;
                                    }
                                    self.isInsertNew(false);
                                    if (_.isEmpty(self.currentApproverGroup().approverGroupCD())) {
                                        self.currentApproverGroupCD(_.first(self.approverGroupLst()).approverGroupCD);
                                        return;
                                    }
                                    var containCD = _.includes(_.map(self.approverGroupLst(), function (o) { return o.approverGroupCD; }), self.currentApproverGroup().approverGroupCD());
                                    if (containCD) {
                                        self.currentApproverGroupCD(self.currentApproverGroup().approverGroupCD());
                                        self.getCurrentApproverGroup(self.currentApproverGroupCD());
                                        self.approverJobLst(self.getApproverJobLst(self.listTitleInfo, _.map(_.sortBy(self.currentApproverGroup().approverJobList, function (a) { return a.order; }), function (o) { return o.jobID; })));
                                        self.currentApproverJobCD(self.getCurrentApproverJobCD());
                                        return;
                                    }
                                    if (index == _.size(self.approverGroupLst())) {
                                        self.currentApproverGroupCD(self.approverGroupLst()[index - 1].approverGroupCD);
                                    }
                                    else {
                                        self.currentApproverGroupCD(self.approverGroupLst()[index].approverGroupCD);
                                    }
                                };
                                ScreenModel.prototype.getCurrentApproverGroup = function (value) {
                                    var self = this, approverGroup = _.find(self.approverGroupLst(), function (o) { return o.approverGroupCD == value; });
                                    self.currentApproverGroup().approverGroupCD(approverGroup.approverGroupCD);
                                    self.currentApproverGroup().approverGroupName(approverGroup.approverGroupName);
                                    self.currentApproverGroup().approverJobList = approverGroup.approverJobList;
                                };
                                ScreenModel.prototype.getCurrentApproverJob = function (currentCode) {
                                    var self = this;
                                    return _.first(_.find(self.approverGroupLst(), function (o) { return o.approverGroupCD == currentCode; }).approverJobList).jobCD;
                                };
                                ScreenModel.prototype.getApproverJobLst = function (listTitleInfo, codeLst) {
                                    var self = this, sortByOrderLst = _.chain(self.currentApproverGroup().approverJobList)
                                        .filter(function (o) { return _.includes(codeLst, o.jobID); })
                                        .sortBy(function (o) { return o.order; })
                                        .map(function (o) {
                                        var info = _.find(listTitleInfo, function (a) { return a.id == o.jobID; });
                                        if (info) {
                                            return _.assign({
                                                jobID: info.id,
                                                jobCD: info.code,
                                                jobName: info.name
                                            });
                                        }
                                        else {
                                            return null;
                                        }
                                    })
                                        .filter(function (o) { return !_.isNull(o); })
                                        .value(), sortByCodeLst = _.chain(codeLst).difference(_.map(sortByOrderLst, function (o) { return o.jobID; }))
                                        .map(function (o) {
                                        var info = _.find(listTitleInfo, function (a) { return a.id == o; });
                                        if (info) {
                                            return _.assign({
                                                jobID: info.id,
                                                jobCD: info.code,
                                                jobName: info.name
                                            });
                                        }
                                        else {
                                            return null;
                                        }
                                    })
                                        .filter(function (o) { return !_.isNull(o); })
                                        .sortBy(function (o) { return o.jobCD; })
                                        .value();
                                    return _.union(sortByOrderLst, sortByCodeLst);
                                };
                                ScreenModel.prototype.getCurrentApproverJobCD = function () {
                                    var self = this;
                                    if (_.isEmpty(self.approverJobLst())) {
                                        return "";
                                    }
                                    return _.first(self.approverJobLst()).jobCD;
                                };
                                ScreenModel.prototype.getCommand = function () {
                                    var self = this;
                                    return {
                                        approverGroupCD: self.currentApproverGroup().approverGroupCD(),
                                        approverGroupName: self.currentApproverGroup().approverGroupName(),
                                        approverJobList: _.map(self.approverJobLst(), function (o, index) { return _.assign({
                                            jobID: o.jobID,
                                            order: index + 1,
                                        }); })
                                    };
                                };
                                ScreenModel.prototype.createNew = function () {
                                    var self = this;
                                    self.currentApproverGroupCD("");
                                };
                                ScreenModel.prototype.register = function () {
                                    var self = this;
                                    $('#approverGroupCD-input').trigger('validate');
                                    $('#approverGroupName-input').trigger('validate');
                                    if (nts.uk.ui.errors.hasError()) {
                                        return;
                                    }
                                    if (self.isInsertNew()) {
                                        nts.uk.ui.block.invisible();
                                        service.register(self.getCommand()).done(function (data) {
                                            dialog.info({ messageId: "Msg_15" }).then(function () {
                                                self.reload();
                                                nts.uk.ui.block.clear();
                                            });
                                        }).fail(function (res) {
                                            dialog.alertError({ messageId: res.messageId })
                                                .then(function () {
                                                nts.uk.ui.block.clear();
                                            });
                                        });
                                    }
                                    else {
                                        nts.uk.ui.block.invisible();
                                        service.update(self.getCommand()).done(function (data) {
                                            dialog.info({ messageId: "Msg_15" }).then(function () {
                                                self.reload();
                                                nts.uk.ui.block.clear();
                                            });
                                        }).fail(function (res) {
                                            dialog.alertError({ messageId: res.messageId })
                                                .then(function () {
                                                nts.uk.ui.block.clear();
                                            });
                                        });
                                    }
                                };
                                ScreenModel.prototype.multiInsert = function () {
                                    var self = this, commandLst = [], approverGroupLstCD = _.map(self.approverGroupLst(), function (o) { return o.approverGroupCD; });
                                    _.forEach(self.listTitleInfo, function (o) {
                                        if (!_.includes(approverGroupLstCD, o.code)) {
                                            commandLst.push({
                                                approverGroupCD: o.code,
                                                approverGroupName: o.name + text("CMM013_73"),
                                                approverJobList: [{
                                                        jobID: o.id,
                                                        order: 1,
                                                    }]
                                            });
                                        }
                                    });
                                    nts.uk.ui.block.invisible();
                                    dialog.confirm({ messageId: "Msg_1637" }).ifYes(function () {
                                        service.multiInsert(commandLst).done(function (data) {
                                            dialog.info({ messageId: "Msg_1638" }).then(function () {
                                                self.reload();
                                                nts.uk.ui.block.clear();
                                            });
                                        }).fail(function (res) {
                                            dialog.alertError({ messageId: res.messageId })
                                                .then(function () {
                                                nts.uk.ui.block.clear();
                                            });
                                        });
                                    }).ifNo(function () {
                                        nts.uk.ui.block.clear();
                                    });
                                };
                                ScreenModel.prototype.close = function () {
                                    nts.uk.ui.windows.close();
                                };
                                ScreenModel.prototype.remove = function () {
                                    var self = this, index = _.findIndex(self.approverGroupLst(), function (o) { return o.approverGroupCD == self.currentApproverGroup().approverGroupCD(); });
                                    command = ko.toJS(self.currentApproverGroup());
                                    nts.uk.ui.block.invisible();
                                    dialog.confirm({ messageId: "Msg_18" }).ifYes(function () {
                                        service.remove(command).done(function (data) {
                                            dialog.info({ messageId: "Msg_16" }).then(function () {
                                                self.reload(index);
                                                nts.uk.ui.block.clear();
                                            });
                                        }).fail(function (res) {
                                            dialog.alertError({ messageId: res.messageId })
                                                .then(function () {
                                                nts.uk.ui.block.clear();
                                            });
                                        });
                                    }).ifNo(function () {
                                        nts.uk.ui.block.clear();
                                    });
                                };
                                ScreenModel.prototype.openKDL004 = function () {
                                    var self = this;
                                    nts.uk.ui.windows.setShared('inputCDL004', {
                                        baseDate: self.baseDate,
                                        selectedCodes: _.map(self.approverJobLst(), function (o) { return o.jobID; }),
                                        showNoSelection: true,
                                        isMultiple: true,
                                        isShowBaseDate: false
                                    }, true);
                                    nts.uk.ui.windows.sub.modal("com", "/view/cdl/004/a/index.xhtml").onClosed(function () {
                                        var isCancel = nts.uk.ui.windows.getShared('CDL004Cancel');
                                        if (isCancel) {
                                            return;
                                        }
                                        var output = nts.uk.ui.windows.getShared('outputCDL004');
                                        self.approverJobLst(self.getApproverJobLst(self.listTitleInfo, output));
                                        self.currentApproverJobCD(self.getCurrentApproverJobCD());
                                    });
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            var IApproverGroup = /** @class */ (function () {
                                function IApproverGroup() {
                                }
                                return IApproverGroup;
                            }());
                            viewmodel.IApproverGroup = IApproverGroup;
                            var IApproverJob = /** @class */ (function () {
                                function IApproverJob() {
                                }
                                return IApproverJob;
                            }());
                            viewmodel.IApproverJob = IApproverJob;
                            var ApproverGroup = /** @class */ (function () {
                                function ApproverGroup(approverGroup) {
                                    this.approverGroupCD = ko.observable(approverGroup.approverGroupCD);
                                    this.approverGroupName = ko.observable(approverGroup.approverGroupName);
                                    this.approverJobList = approverGroup.approverJobList;
                                }
                                return ApproverGroup;
                            }());
                            viewmodel.ApproverGroup = ApproverGroup;
                        })(viewmodel = h.viewmodel || (h.viewmodel = {}));
                    })(h = cmm013.h || (cmm013.h = {}));
                })(cmm013 = view.cmm013 || (view.cmm013 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm013.h.vm.js.map