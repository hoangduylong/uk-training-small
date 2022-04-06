var common;
(function (common) {
    var error;
    (function (error) {
        var system;
        (function (system) {
            __viewContext.ready(function () {
                var screenModel = new ScreenModel();
                screenModel.getMessage().then(function () {
                    __viewContext.bind(screenModel);
                });
            });
            var ScreenModel = /** @class */ (function () {
                function ScreenModel() {
                    this.message = ko.observable("empty!");
                }
                ScreenModel.prototype.getMessage = function () {
                    var self = this;
                    var dfd = $.Deferred();
                    nts.uk.request.ajax("com", "operation/stop/message").done(function (data) {
                        self.message(data.message);
                    }).always(function () {
                        dfd.resolve();
                    });
                    return dfd.promise();
                };
                ScreenModel.prototype.gotoLogin = function () {
                    nts.uk.ui.windows.rgc().nts.uk.request.login.jumpToUsedLoginPage();
                };
                return ScreenModel;
            }());
        })(system = error.system || (error.system = {}));
    })(error = common.error || (common.error = {}));
})(common || (common = {}));
//# sourceMappingURL=stopuse.start.js.map