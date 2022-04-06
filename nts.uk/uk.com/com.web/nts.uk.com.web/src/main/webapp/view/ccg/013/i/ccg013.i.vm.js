var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var ccg013;
                (function (ccg013) {
                    var i;
                    (function (i) {
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var self = this;
                                    self.nameMenuBar = ko.observable('');
                                    self.textOption = ko.mapping.fromJS(new nts.uk.ui.option.TextEditorOption({
                                        width: "160px"
                                    }));
                                    //Get data and fill to popup
                                    var menuBar = nts.uk.ui.windows.getShared("CCG013I_MENU_BAR1");
                                    if (menuBar != undefined) {
                                        self.nameMenuBar(menuBar.menuBarName);
                                        self.menuBarId = menuBar.menuBarId;
                                    }
                                }
                                ScreenModel.prototype.start = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    dfd.resolve();
                                    return dfd.promise();
                                };
                                /**
                                 * Pass data to main screen
                                 * Close the popup
                                 */
                                ScreenModel.prototype.submit = function () {
                                    var self = this;
                                    $(".ntsColorPicker_Container").trigger("validate");
                                    validateNameInput($("#menu-bar-name"), '#[CCG013_87]', self.nameMenuBar().trim(), 'MenuBarName');
                                    var hasError = nts.uk.ui.errors.hasError();
                                    if (hasError) {
                                        return;
                                    }
                                    //Set data
                                    var menuBar = {
                                        menuBarName: self.nameMenuBar()
                                    };
                                    nts.uk.ui.windows.setShared("CCG013I_MENU_BAR", menuBar);
                                    self.closeDialog();
                                };
                                ScreenModel.prototype.removeMenuBar = function () {
                                    var self = this;
                                    var menuBarId = self.menuBarId;
                                    nts.uk.ui.windows.setShared("CCG013I_MENU_BAR_ID", menuBarId);
                                    self.closeDialog();
                                };
                                /**
                                 * Click on button i1_9
                                 * Close the popup
                                 */
                                ScreenModel.prototype.closeDialog = function () {
                                    nts.uk.ui.windows.close();
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = i.viewmodel || (i.viewmodel = {}));
                    })(i = ccg013.i || (ccg013.i = {}));
                })(ccg013 = view.ccg013 || (view.ccg013 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg013.i.vm.js.map