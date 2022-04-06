var cmm042;
(function (cmm042) {
    var b;
    (function (b) {
        var viewmodel;
        (function (viewmodel) {
            var setShared = nts.uk.ui.windows.setShared;
            var getShared = nts.uk.ui.windows.getShared;
            var close = nts.uk.ui.windows.close;
            var __viewContext = window['__viewContext'] || {}, block = window["nts"]["uk"]["ui"]["block"]["grayout"], unblock = window["nts"]["uk"]["ui"]["block"]["clear"], invisible = window["nts"]["uk"]["ui"]["block"]["invisible"];
            var ViewModel = /** @class */ (function () {
                function ViewModel() {
                    this.userCode = ko.observable('');
                    var self = this;
                    var dto = getShared('CMM042B_PARAM');
                    self.userCode('');
                    self.start();
                }
                ViewModel.prototype.start = function () {
                    var self = this, dfd = $.Deferred();
                    $("#A_INP_USER_CODE").focus();
                    dfd.resolve();
                    return dfd.promise();
                };
                ViewModel.prototype.pushDataToAScreen = function () {
                    var self = this;
                    if (nts.uk.ui.errors.hasError()) {
                        return;
                    }
                    setShared('CMM042B_VALUE', { userCode: self.userCode() });
                    close();
                };
                ViewModel.prototype.close = function () {
                    close();
                };
                return ViewModel;
            }());
            viewmodel.ViewModel = ViewModel;
        })(viewmodel = b.viewmodel || (b.viewmodel = {}));
    })(b = cmm042.b || (cmm042.b = {}));
})(cmm042 || (cmm042 = {}));
//# sourceMappingURL=cmm042.b.vm.js.map