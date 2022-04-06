var view;
(function (view) {
    var ccg007;
    (function (ccg007) {
        var sso;
        (function (sso) {
            var viewmodel;
            (function (viewmodel) {
                var ScreenModel = /** @class */ (function () {
                    function ScreenModel(errAcc, errMsg) {
                        this.errAcc = ko.observable(false);
                        this.errMsg = ko.observable("");
                        var self = this;
                        self.errAcc(errAcc);
                        self.errMsg(errMsg);
                    }
                    ScreenModel.prototype.account = function () {
                        sso.service.account().done(function (data) {
                            alert('domain: ' + data.domain + '\n' + 'user name: ' + data.userName);
                        });
                    };
                    return ScreenModel;
                }());
                viewmodel.ScreenModel = ScreenModel;
            })(viewmodel = sso.viewmodel || (sso.viewmodel = {}));
        })(sso = ccg007.sso || (ccg007.sso = {}));
    })(ccg007 = view.ccg007 || (view.ccg007 = {}));
})(view || (view = {}));
//# sourceMappingURL=sso.vm.js.map