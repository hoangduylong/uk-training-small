var common;
(function (common) {
    var error;
    (function (error) {
        var system;
        (function (system) {
            __viewContext.ready(function () {
                var screenModel = new ScreenModel();
                __viewContext.bind(screenModel);
                var errorInfo = nts.uk.ui.windows.getShared("errorInfo");
                if (!nts.uk.util.isNullOrUndefined(errorInfo)) {
                    screenModel.details(errorInfo.errorMessage + "\r\n" + errorInfo.stackTrace);
                    screenModel.errorAtTime(moment.utc(errorInfo.atTime).format("YYYY/MM/DD HH:mm:ss"));
                }
                else {
                    screenModel.errorAtTime(moment().format("YYYY/MM/DD HH:mm:ss"));
                }
            });
            var ScreenModel = /** @class */ (function () {
                function ScreenModel() {
                    this.details = ko.observable("");
                    this.errorAtTime = ko.observable("");
                    if (__viewContext.program.isDebugMode == true) {
                        this.isDebugMode = ko.observable(true);
                    }
                    else {
                        this.isDebugMode = ko.observable(false);
                    }
                }
                ScreenModel.prototype.gotoLogin = function () {
                    nts.uk.characteristics.restore("loginMode").done(function (mode) {
                        var rgc = nts.uk.ui.windows.rgc();
                        if (mode) {
                            rgc.nts.uk.request.login.jumpToUsedSSOLoginPage();
                        }
                        else {
                            rgc.nts.uk.request.login.jumpToUsedLoginPage();
                        }
                    });
                };
                return ScreenModel;
            }());
        })(system = error.system || (error.system = {}));
    })(error = common.error || (common.error = {}));
})(common || (common = {}));
//# sourceMappingURL=common.error.start.js.map