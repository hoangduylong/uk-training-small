var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmf002;
                (function (cmf002) {
                    var h;
                    (function (h) {
                        var viewmodel;
                        (function (viewmodel) {
                            var alertError = nts.uk.ui.dialog.alertError;
                            var setShared = nts.uk.ui.windows.setShared;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var self = this;
                                    self.itemList = ko.observableArray([
                                        new ItemModel(0, '')
                                    ]);
                                    self.itemName = ko.observable('');
                                    self.currentCode = ko.observable(7);
                                    self.selectedCode = ko.observable("0");
                                    self.isEnable = ko.observable(true);
                                    self.mode = ko.observable(1);
                                    self.initComponent();
                                    $('#list-box').on('selectionChanging', function (event) {
                                        console.log('Selecting value:' + event.originalEvent.detail);
                                    });
                                    $('#list-box').on('selectionChanged', function (event) {
                                        console.log('Selected value:' + event.originalEvent.detail);
                                    });
                                }
                                ScreenModel.prototype.deselectAll = function () {
                                    $('#list-box').ntsListBox('deselectAll');
                                };
                                ScreenModel.prototype.selectAll = function () {
                                    $('#list-box').ntsListBox('selectAll');
                                };
                                ScreenModel.prototype.initComponent = function () {
                                    var self = this;
                                    h.service.getIdtSetting().done(function (data) {
                                        if (data && data.length) {
                                            var _rsList = _.map(data, function (rs) {
                                                return new ItemModel(rs.value, rs.localizedName);
                                            });
                                            self.itemList(_rsList);
                                        }
                                    }).fail(function (error) {
                                        alertError({ messageId: "Msg" });
                                    });
                                };
                                /**
                        * Close dialog.
                        */
                                ScreenModel.prototype.cancelSetting = function () {
                                    nts.uk.ui.windows.close();
                                };
                                //設定
                                ScreenModel.prototype.saveData = function () {
                                    var self = this;
                                    switch (self.selectedCode()) {
                                        case "0":
                                            setShared('CMF002_I_PARAMS', { screenMode: self.mode() });
                                            nts.uk.ui.windows.sub.modal("/view/cmf/002/i/index.xhtml").onClosed(function () {
                                                self.initComponent();
                                            });
                                            break;
                                        case "1":
                                            setShared('CMF002_J_PARAMS', { screenMode: self.mode() });
                                            nts.uk.ui.windows.sub.modal("/view/cmf/002/j/index.xhtml").onClosed(function () {
                                                self.initComponent();
                                            });
                                            break;
                                        case "2":
                                            setShared('CMF002_K_PARAMS', { screenMode: self.mode() });
                                            nts.uk.ui.windows.sub.modal("/view/cmf/002/k/index.xhtml").onClosed(function () {
                                                self.initComponent();
                                            });
                                            break;
                                        case "3":
                                            setShared('CMF002_L_PARAMS', { screenMode: self.mode() });
                                            nts.uk.ui.windows.sub.modal("/view/cmf/002/l/index.xhtml").onClosed(function () {
                                                self.initComponent();
                                            });
                                            break;
                                        case "4":
                                            setShared('CMF002_M_PARAMS', { screenMode: self.mode() });
                                            nts.uk.ui.windows.sub.modal("/view/cmf/002/m/index.xhtml").onClosed(function () {
                                                self.initComponent();
                                            });
                                            break;
                                        case "7":
                                            setShared('CMF002_N_PARAMS', { screenMode: self.mode() });
                                            nts.uk.ui.windows.sub.modal("/view/cmf/002/n/index.xhtml").onClosed(function () {
                                                self.initComponent();
                                            });
                                            break;
                                    }
                                };
                                ScreenModel.prototype.gotoScreenH = function () {
                                    nts.uk.ui.windows.sub.modal("/view/cmf/002/h/index.xhtml");
                                };
                                ScreenModel.prototype.gotoScreenF = function () {
                                    nts.uk.ui.windows.sub.modal("/view/cmf/002/f/index.xhtml");
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            var ItemModel = /** @class */ (function () {
                                function ItemModel(code, name) {
                                    this.code = code;
                                    this.name = name;
                                }
                                return ItemModel;
                            }());
                        })(viewmodel = h.viewmodel || (h.viewmodel = {}));
                    })(h = cmf002.h || (cmf002.h = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.h.vm.js.map