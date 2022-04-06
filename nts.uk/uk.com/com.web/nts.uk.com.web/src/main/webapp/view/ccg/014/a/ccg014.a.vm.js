var ccg014;
(function (ccg014) {
    var a;
    (function (a) {
        var viewmodel;
        (function (viewmodel) {
            var windows = nts.uk.ui.windows;
            var errors = nts.uk.ui.errors;
            var resource = nts.uk.resource;
            var util = nts.uk.util;
            var block = nts.uk.ui.block;
            var ScreenModel = /** @class */ (function () {
                function ScreenModel() {
                    var self = this;
                    // TitleMenu List
                    self.listTitleMenu = ko.observableArray([]);
                    self.selectedTitleMenuCD = ko.observable(null);
                    self.selectedTitleMenuCD.subscribe(function (value) {
                        self.findSelectedTitleMenu(value);
                        self.changePreviewIframe(self.selectedTitleMenu().layoutID());
                    });
                    self.columns = ko.observableArray([
                        { headerText: resource.getText('CCG014_11'), key: 'titleMenuCD', width: 45 },
                        { headerText: resource.getText('CCG014_12'), key: 'name', width: 260, formatter: _.escape }
                    ]);
                    // TitleMenu Details
                    self.selectedTitleMenu = ko.observable(null);
                    self.isCreate = ko.observable(null);
                    // Enable Copy
                    self.enableCopy = ko.computed(function () {
                        return (!self.isCreate() && !util.isNullOrEmpty(self.selectedTitleMenuCD()));
                    });
                    $("#preview-iframe").on("load", function () {
                        if (self.isCreate() == true)
                            $("#titleMenuCD").focus();
                        else
                            $("#titleMenuName").focus();
                        errors.clearAll();
                    });
                    window.onresize = function (event) {
                        $("#preview-iframe").attr('style', 'height:' + (window.innerHeight - 350) + 'px; ' +
                            'width:' + (window.innerWidth - 500) + 'px; ');
                        $(".preview-container").width($("#preview-iframe").width() + 10);
                    };
                }
                /** Start Page */
                ScreenModel.prototype.startPage = function () {
                    var _this = this;
                    var dfd = this.reloadData();
                    var self = this;
                    block.invisible();
                    dfd.done(function () {
                        block.clear();
                        _this.selectTitleMenuByIndex(0);
                        _this.setHeight();
                    });
                    return dfd;
                };
                /** Create Button Click */
                ScreenModel.prototype.createButtonClick = function () {
                    var self = this;
                    self.isCreate(true);
                    self.selectedTitleMenuCD(null);
                    self.selectedTitleMenu(new model.TitleMenu("", "", ""));
                    errors.clearAll();
                    $("#preview-iframe").trigger("load");
                };
                /** Registry Button Click */
                ScreenModel.prototype.registryButtonClick = function () {
                    var self = this;
                    $(".nts-input").trigger("validate");
                    if (!$(".nts-input").ntsError("hasError")) {
                        self.selectedTitleMenu().titleMenuCD(nts.uk.text.padLeft(self.selectedTitleMenu().titleMenuCD(), '0', 4));
                        var titleMenu = ko.mapping.toJS(self.selectedTitleMenu);
                        var titleMenuCD = titleMenu.titleMenuCD;
                        block.invisible();
                        if (self.isCreate() === true) {
                            a.service.createTitleMenu(titleMenu).done(function (data) {
                                nts.uk.ui.dialog.info({ messageId: "Msg_15" });
                                self.reloadData().done(function () {
                                    self.selectedTitleMenuCD(titleMenuCD);
                                });
                            }).fail(function (res) {
                                nts.uk.ui.dialog.alert({ messageId: res.messageId });
                            }).always(function () {
                                block.clear();
                            });
                        }
                        else {
                            a.service.updateTitleMenu(titleMenu).done(function (data) {
                                nts.uk.ui.dialog.info({ messageId: "Msg_15" });
                                console.log(data);
                                self.reloadData();
                            }).always(function () {
                                block.clear();
                            });
                        }
                    }
                };
                /**Delete Button Click */
                ScreenModel.prototype.removeTitleMenu = function () {
                    var self = this;
                    if (self.selectedTitleMenuCD() !== null) {
                        nts.uk.ui.dialog.confirm({ messageId: "Msg_18" }).ifYes(function () {
                            block.invisible();
                            a.service.deleteTitleMenu(self.selectedTitleMenuCD()).done(function () {
                                var index = _.findIndex(self.listTitleMenu(), ['titleMenuCD', self.selectedTitleMenu().titleMenuCD()]);
                                index = _.min([self.listTitleMenu().length - 2, index]);
                                self.reloadData().done(function () {
                                    self.selectTitleMenuByIndex(index);
                                    nts.uk.ui.dialog.info({ messageId: "Msg_16" });
                                });
                            }).fail(function (res) {
                                nts.uk.ui.dialog.alertError({ messageId: res.messageId });
                            }).always(function () {
                                block.clear();
                            });
                        });
                    }
                };
                /** Open Copy TitleMenu (CCG 014B Dialog) */
                ScreenModel.prototype.openBDialog = function () {
                    block.invisible();
                    var self = this;
                    var selectTitleMenu = _.find(self.listTitleMenu(), ['titleMenuCD', self.selectedTitleMenu().titleMenuCD()]);
                    windows.setShared("copyData", selectTitleMenu);
                    windows.sub.modal("/view/ccg/014/b/index.xhtml", { title: nts.uk.resource.getText("CCG014_16"), dialogClass: "no-close" }).onClosed(function () {
                        var copiedTitleMenuCD = windows.getShared("copyTitleMenuCD");
                        if (copiedTitleMenuCD) {
                            self.reloadData().done(function () {
                                self.selectedTitleMenuCD(copiedTitleMenuCD);
                            });
                        }
                        block.clear();
                    });
                };
                /** Open  Layout Setting(CCG 031_1) Dialog */
                ScreenModel.prototype.open031_1Dialog = function () {
                    var self = this;
                    var layoutInfo = {
                        parentCode: self.selectedTitleMenuCD(),
                        layoutID: self.selectedTitleMenu().layoutID(),
                        pgType: 1
                    };
                    windows.setShared("layout", layoutInfo, false);
                    windows.sub.modal("/view/ccg/031/a/index.xhtml", { title: nts.uk.resource.getText("CCG031_1"), dialogClass: "no-close" }).onClosed(function () {
                        var returnInfo = windows.getShared("layout");
                        self.selectedTitleMenu().layoutID(returnInfo.layoutID);
                        _.find(self.listTitleMenu(), ["titleMenuCD", returnInfo.parentCode]).layoutID = returnInfo.layoutID;
                        self.changePreviewIframe(returnInfo.layoutID);
                    });
                };
                /** Open FlowMenu Setting(030A Dialog) */
                ScreenModel.prototype.open030A_Dialog = function () {
                    block.invisible();
                    windows.sub.modal("/view/ccg/030/a/index.xhtml").onClosed(function () {
                        block.clear();
                    });
                };
                /** Get Selected TitleMenu */
                ScreenModel.prototype.findSelectedTitleMenu = function (titleMenuCD) {
                    var self = this;
                    var selectedTitleMenu = _.find(self.listTitleMenu(), ['titleMenuCD', titleMenuCD]);
                    if (selectedTitleMenu !== undefined) {
                        self.isCreate(false);
                        self.selectedTitleMenu(new model.TitleMenu(selectedTitleMenu.titleMenuCD, selectedTitleMenu.name, selectedTitleMenu.layoutID));
                    }
                    else {
                        self.isCreate(true);
                        self.selectedTitleMenu(new model.TitleMenu("", "", ""));
                    }
                    errors.clearAll();
                };
                /** Reload data from server */
                ScreenModel.prototype.reloadData = function () {
                    var self = this;
                    var dfd = $.Deferred();
                    /** Get list TitleMenu*/
                    a.service.getAllTitleMenu().done(function (listTitleMenu) {
                        self.listTitleMenu(listTitleMenu);
                        if (listTitleMenu.length > 0) {
                            self.isCreate(false);
                        }
                        else {
                            self.findSelectedTitleMenu(null);
                            self.changePreviewIframe(null);
                            self.isCreate(true);
                        }
                        dfd.resolve();
                    }).fail(function (error) {
                        dfd.fail();
                        nts.uk.ui.dialog.alertError(error.message);
                    });
                    return dfd.promise();
                };
                /** Select TitleMenu by Index: Start & Delete case */
                ScreenModel.prototype.selectTitleMenuByIndex = function (index) {
                    var self = this;
                    var selectTitleMenuByIndex = _.nth(self.listTitleMenu(), index);
                    if (selectTitleMenuByIndex !== undefined)
                        self.selectedTitleMenuCD(selectTitleMenuByIndex.titleMenuCD);
                    else
                        self.selectedTitleMenuCD(null);
                };
                ScreenModel.prototype.changePreviewIframe = function (layoutID) {
                    $("#preview-iframe").attr("src", "/nts.uk.com.web/view/ccg/common/previewWidget/index.xhtml?layoutid=" + layoutID);
                };
                ScreenModel.prototype.setHeight = function () {
                    $("#preview-iframe").attr('style', 'height:' + (window.innerHeight - 350) + 'px; ' +
                        'width:' + (window.innerWidth - 500) + 'px; ');
                    $(".preview-container").width($("#preview-iframe").width() + 10);
                };
                return ScreenModel;
            }());
            viewmodel.ScreenModel = ScreenModel;
            var model;
            (function (model) {
                var TitleMenu = /** @class */ (function () {
                    function TitleMenu(titleMenuCD, name, layoutID) {
                        this.titleMenuCD = ko.observable(titleMenuCD);
                        this.name = ko.observable(name);
                        this.layoutID = ko.observable(layoutID);
                    }
                    return TitleMenu;
                }());
                model.TitleMenu = TitleMenu;
            })(model = viewmodel.model || (viewmodel.model = {}));
        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
    })(a = ccg014.a || (ccg014.a = {}));
})(ccg014 || (ccg014 = {}));
//# sourceMappingURL=ccg014.a.vm.js.map