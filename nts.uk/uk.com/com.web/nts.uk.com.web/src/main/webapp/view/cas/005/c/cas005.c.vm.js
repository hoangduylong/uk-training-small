var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var csa005;
                (function (csa005) {
                    var c;
                    (function (c) {
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var self = this;
                                    self.listMenu = ko.observableArray([]);
                                }
                                /**
                                 * functiton start page
                                 */
                                ScreenModel.prototype.startPage = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    c.service.getPerMissingMenu().done(function (res) {
                                        $("#list_link").focus();
                                        self.listMenu(_.map(res, function (x) { return new model.Menu(x.code, x.displayName, x.screenId, x.programId, x.queryString); }));
                                    });
                                    dfd.resolve();
                                    return dfd.promise();
                                }; //end start page
                                ScreenModel.prototype.closeDialog = function () {
                                    var self = this;
                                    nts.uk.ui.windows.close();
                                };
                                return ScreenModel;
                            }()); //end screenModel
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = c.viewmodel || (c.viewmodel = {})); //end viewmodel
                        //module model
                        var model;
                        (function (model) {
                            /**
                             * class Mnu
                             */
                            var Menu = /** @class */ (function () {
                                function Menu(code, displayName, screenId, programId, queryString) {
                                    this.code = code;
                                    this.displayName = displayName;
                                    this.screenId = screenId;
                                    this.programId = programId.toLowerCase();
                                    this.queryString = queryString;
                                    this.url = "/nts.uk.com.web/view/" + programId.substr(0, 3).toLowerCase() + "/" + programId.substr(3, 6).toLowerCase() + "/" + screenId.toLowerCase() + "/index.xhtml";
                                }
                                return Menu;
                            }()); //end class Role        
                            model.Menu = Menu;
                        })(model = c.model || (c.model = {})); //end module model
                    })(c = csa005.c || (csa005.c = {}));
                })(csa005 = view.csa005 || (view.csa005 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {})); //end module
//# sourceMappingURL=cas005.c.vm.js.map