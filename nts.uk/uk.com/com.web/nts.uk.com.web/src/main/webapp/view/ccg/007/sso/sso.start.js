var view;
(function (view) {
    var ccg007;
    (function (ccg007) {
        var sso;
        (function (sso) {
            __viewContext.ready(function () {
                var errAcc = true;
                var errMsg = '';
                var value = __viewContext.transferred.value;
                if (value != null && value !== undefined) {
                    errAcc = value.errAcc;
                    errMsg = value.errMsg;
                }
                var screenModel = new sso.viewmodel.ScreenModel(errAcc, errMsg);
                __viewContext.bind(screenModel);
            });
        })(sso = ccg007.sso || (ccg007.sso = {}));
    })(ccg007 = view.ccg007 || (view.ccg007 = {}));
})(view || (view = {}));
//# sourceMappingURL=sso.start.js.map