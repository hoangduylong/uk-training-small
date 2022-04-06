var cas009;
(function (cas009) {
    var b;
    (function (b) {
        var viewmodel;
        (function (viewmodel) {
            var service = cas009.b.service;
            var ScreenModel = /** @class */ (function () {
                function ScreenModel() {
                    var self = this;
                    self.listMenu = ko.observableArray([]);
                }
                /** Start Page */
                ScreenModel.prototype.startPage = function () {
                    var self = this;
                    service.getPerMissingMenu().done(function (res) {
                        $("#list_link").focus();
                        self.listMenu(_.map(res, function (x) { return new model.Menu(x.code, x.displayName, x.screenId, x.programId, x.queryString); }));
                    });
                };
                ScreenModel.prototype.closeDialog = function () {
                    var self = this;
                    nts.uk.ui.windows.close();
                };
                return ScreenModel;
            }());
            viewmodel.ScreenModel = ScreenModel;
            var model;
            (function (model) {
                var Menu = /** @class */ (function () {
                    function Menu(code, displayName, screenId, programId, queryString) {
                        this.code = code;
                        this.displayName = displayName;
                        this.screenId = screenId;
                        this.programId = programId;
                        this.queryString = queryString;
                        this.url = "/nts.uk.com.web/view/" + programId.substr(0, 3).toLowerCase() + "/" + programId.substr(3, 6).toLowerCase() + "/" + screenId.toLowerCase() + "/index.xhtml";
                    }
                    return Menu;
                }());
                model.Menu = Menu;
            })(model = viewmodel.model || (viewmodel.model = {}));
        })(viewmodel = b.viewmodel || (b.viewmodel = {}));
    })(b = cas009.b || (cas009.b = {}));
})(cas009 || (cas009 = {}));
//# sourceMappingURL=cas009.b.vm.js.map