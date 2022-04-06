var kcp010;
(function (kcp010) {
    var viewmodel;
    (function (viewmodel) {
        var getShared = nts.uk.ui.windows.getShared;
        var setShared = nts.uk.ui.windows.setShared;
        var modal = nts.uk.ui.windows.sub.modal;
        var block = nts.uk.ui.block;
        var ScreenModel = /** @class */ (function () {
            function ScreenModel() {
                this.flag = true;
                var self = this;
                self.systemDate = ko.observable(null);
                self.wkpList = ko.observableArray([]);
                self.targetBtnText = nts.uk.resource.getText("KCP010_3");
                self.workplaceId = ko.observable(null);
                self.workplaceCode = ko.observable(null);
                self.workplaceName = ko.observable(null);
                self.selectedItem = ko.observable("");
                self.keySearch = ko.observable("");
                self.isDisplay = ko.observable(true);
                self.systemDate = ko.observable(null);
                // SelectedItem Subscribe
                self.selectedItem.subscribe(function (value) {
                    self.bindWorkplace(value);
                });
            }
            // Initialize Component
            ScreenModel.prototype.init = function ($input, data) {
                var dfd = $.Deferred();
                $(document).undelegate('#list-box_grid', 'iggriddatarendered');
                ko.cleanNode($input[0]);
                var self = this;
                if (self.systemDate() == null) {
                    self.systemDate(moment(new Date()).toDate());
                }
                service.findWorkplaceTree(self.systemDate()).done(function (dataList) {
                    if (dataList && dataList.length > 0) {
                        self.wkpList(self.convertTreeToArray(dataList));
                        if (self.flag) {
                            self.flag = false;
                            self.getWorkplaceBySid();
                        }
                        self.tabIndex = data.tabIndex;
                        if (self.wkpList().length > 1) {
                            self.wkpList().sort(function (left, right) {
                                return left.code == right.code ?
                                    0 : (left.code < right.code ? -1 : 1);
                            });
                        }
                        self.targetBtnText = data.targetBtnText;
                        // Selected OrdinalNumber
                        self.selectedOrdinalNumber = ko.computed(function () {
                            self.wkpList(_.sortBy(self.wkpList(), [function (o) { return o.hierarchyCode; }]));
                            var currentItem = self.wkpList().filter(function (item) {
                                return item.id == self.selectedItem();
                            })[0];
                            return self.wkpList().indexOf(currentItem) + 1;
                        });
                        self.isActivePreviousBtn = ko.computed(function () {
                            return (self.wkpList().length > 0) && self.selectedOrdinalNumber() > 1;
                        }, self);
                        self.isActiveNextBtn = ko.computed(function () {
                            return (self.wkpList().length > 0) && self.selectedOrdinalNumber() < self.wkpList().length;
                        }, self);
                        self.selectedNumberOfWorkplace = ko.computed(function () {
                            return self.selectedOrdinalNumber().toString() + "/" + self.wkpList().length.toString();
                        });
                        // End of Initialize variables
                        var webserviceLocator = nts.uk.request.location.siteRoot
                            .mergeRelativePath(nts.uk.request.WEB_APP_NAME["com"] + '/')
                            .mergeRelativePath('/view/kcp/010/kcp010.xhtml').serialize();
                        $input.load(webserviceLocator, function () {
                            //$input.find('#list-box').empty();
                            ko.applyBindings(self, $input[0]);
                            // Icon for Previous Button
                            var prevIconLink = nts.uk.request.location.siteRoot
                                .mergeRelativePath(nts.uk.request.WEB_APP_NAME["com"] + '/')
                                .mergeRelativePath('/view/kcp/share/icon/9.png').serialize();
                            $('#prev-btn').attr('style', "background-color: white; width: 30px; height: 30px; background-size: 30px 30px;");
                            // Icon for Next Button
                            var nextIconLink = nts.uk.request.location.siteRoot
                                .mergeRelativePath(nts.uk.request.WEB_APP_NAME["com"] + '/')
                                .mergeRelativePath('/view/kcp/share/icon/10.png').serialize();
                            $('#next-btn').attr('style', "background-color: white; width: 30px; height: 30px; background-size: 30px 30px;");
                            // Enter keypress
                            $('#search-input').on('keypress', function (e) {
                                if (e.which == 13) {
                                    self.keySearch($('#search-input').val());
                                    if (self.keySearch()) {
                                        self.searchWkp();
                                    }
                                }
                            });
                            dfd.resolve();
                        });
                    }
                    else {
                        // message 184
                        nts.uk.ui.dialog.info({ messageId: "Msg_184" });
                    }
                }).fail(function (res) {
                    nts.uk.ui.dialog.alert({ messageId: "Msg_7" });
                });
                return dfd.promise();
            };
            ScreenModel.prototype.getWorkplaceBySid = function () {
                var self = this;
                service.getWorkplaceBySid().done(function (workplace) {
                    if (workplace && workplace != null) {
                        self.selectedItem(workplace.workplaceId);
                    }
                    else {
                        self.selectedItem(self.wkpList()[0].id);
                    }
                }).fail(function (res) {
                    nts.uk.ui.dialog.alert({ messageId: "Msg_7" });
                });
            };
            /**
             * open dialog CDL008
             * chose work place
             * @param baseDate, isMultiple, workplaceId
             * @return workplaceId
             */
            ScreenModel.prototype.openDialogCDL008 = function () {
                var self = this;
                block.grayout();
                if (self.systemDate() == null) {
                    self.systemDate(moment(new Date()).toDate());
                }
                setShared('inputCDL008', { selectedCodes: self.workplaceId(),
                    baseDate: self.systemDate(),
                    isMultiple: false,
                    selectedSystemType: 2,
                    isrestrictionOfReferenceRange: true,
                    showNoSelection: false,
                    isShowBaseDate: true });
                modal("/view/cdl/008/a/index.xhtml").onClosed(function () {
                    block.clear();
                    var data = getShared('outputCDL008');
                    var baseDate = getShared('baseDateCDL008');
                    if (data == null || data === undefined) {
                        return;
                    }
                    if (baseDate != null && baseDate != undefined) {
                        self.systemDate(moment(new Date(baseDate)).toDate());
                    }
                    var param = {
                        targetBtnText: nts.uk.resource.getText("KCP010_3"),
                        tabIndex: 1
                    };
                    self.init($("#wkp-component"), param).done(function () {
                        //$('#wkp-component').ntsLoadListComponent(param);
                        self.workplaceId(data);
                        self.selectedItem(data);
                    });
                });
            };
            // bindWorkplace
            ScreenModel.prototype.bindWorkplace = function (id) {
                var self = this;
                if (id) {
                    var currentItem = self.wkpList().filter(function (item) {
                        return item.id == id;
                    })[0];
                    if (currentItem) {
                        self.workplaceId(currentItem.id);
                        self.workplaceCode(currentItem.code);
                        self.workplaceName(currentItem.name);
                        self.keySearch(currentItem.code);
                    }
                }
                else {
                    self.workplaceId("");
                    self.workplaceCode("");
                    self.workplaceName("");
                }
            };
            // Search workplace
            ScreenModel.prototype.searchWkp = function () {
                var self = this;
                var param = {
                    baseDate: self.systemDate(),
                    workplaceCode: self.keySearch()
                };
                // Search
                service.searchWorkplace(param).done(function (workplace) {
                    // find Exist workplace in List
                    var existItem = self.wkpList().filter(function (item) {
                        return item.code == workplace.code;
                    })[0];
                    if (existItem) {
                        // Set Selected Item
                        self.selectedItem(existItem.id);
                        self.workplaceId(existItem.id);
                        self.workplaceCode(existItem.code);
                        self.workplaceName(existItem.name);
                    }
                    else {
                        var newWkpList = [];
                        newWkpList.push({ workplaceId: workplace.id, code: workplace.code, name: workplace.name });
                        self.wkpList(newWkpList);
                        // Set Selected Item
                        self.selectedItem(workplace.id);
                        self.workplaceId(workplace.id);
                        self.workplaceCode(workplace.code);
                        self.workplaceName(workplace.name);
                    }
                }).fail(function (res) {
                    nts.uk.ui.dialog.alert({ messageId: "Msg_7" });
                });
            };
            // Previous workplace
            ScreenModel.prototype.previousWkp = function () {
                var self = this;
                try {
                    var currentItem = self.wkpList().filter(function (item) {
                        return item.id == self.selectedItem();
                    })[0];
                    var nextId = self.wkpList()[self.wkpList().indexOf(currentItem) - 1].id;
                    self.selectedItem(nextId);
                }
                catch (e) {
                    nts.uk.ui.dialog.alert({ messageId: "Msg_7" });
                }
            };
            // Next workplace
            ScreenModel.prototype.nextWkp = function () {
                var self = this;
                try {
                    var currentItem = self.wkpList().filter(function (item) {
                        return item.id == self.selectedItem();
                    })[0];
                    var prevId = self.wkpList()[self.wkpList().indexOf(currentItem) + 1].id;
                    self.selectedItem(prevId);
                }
                catch (e) {
                    nts.uk.ui.dialog.alert({ messageId: "Msg_7" });
                }
            };
            /**
             * Convert tree data to array.
             */
            ScreenModel.prototype.convertTreeToArray = function (dataList) {
                var self = this;
                var res = [];
                _.forEach(dataList, function (item) {
                    if (item.children && item.children.length > 0) {
                        res = res.concat(self.convertTreeToArray(item.children));
                    }
                    res.push(item);
                });
                return res;
            };
            return ScreenModel;
        }());
        viewmodel.ScreenModel = ScreenModel;
        /**
         * Module Service
         */
        var service;
        (function (service) {
            var paths = {
                findWorkplaceTree: "bs/employee/wkpdep/get-wkpdepinfo-kcp004",
                searchWorkplace: 'screen/com/kcp010/search/',
                getWorkplaceBySid: 'screen/com/kcp010/getLoginWkp',
            };
            function findWorkplaceTree(baseDate) {
                return nts.uk.request.ajax('com', paths.findWorkplaceTree, {
                    startMode: 0,
                    baseDate: baseDate,
                    systemType: 2,
                    restrictionOfReferenceRange: true
                });
            }
            service.findWorkplaceTree = findWorkplaceTree;
            function searchWorkplace(input) {
                return nts.uk.request.ajax('com', paths.searchWorkplace, input);
            }
            service.searchWorkplace = searchWorkplace;
            function getWorkplaceBySid() {
                return nts.uk.request.ajax('com', paths.getWorkplaceBySid);
            }
            service.getWorkplaceBySid = getWorkplaceBySid;
            /**
             * Module Model
             */
            var model;
            (function (model) {
                var WorkplaceSearchData = /** @class */ (function () {
                    function WorkplaceSearchData() {
                    }
                    return WorkplaceSearchData;
                }());
                model.WorkplaceSearchData = WorkplaceSearchData;
            })(model = service.model || (service.model = {}));
        })(service = viewmodel.service || (viewmodel.service = {}));
    })(viewmodel = kcp010.viewmodel || (kcp010.viewmodel = {}));
})(kcp010 || (kcp010 = {}));
(function ($) {
    $.fn.ntsLoadListComponent = function (option) {
        var modelkcp010 = new kcp010.viewmodel.ScreenModel();
        modelkcp010.init(this, option);
        // Return.
        return modelkcp010;
    };
}(jQuery));
//# sourceMappingURL=kcp010.js.map