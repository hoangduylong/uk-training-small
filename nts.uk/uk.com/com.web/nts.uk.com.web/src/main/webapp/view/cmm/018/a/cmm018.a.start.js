var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm018;
                (function (cmm018_1) {
                    var a;
                    (function (a) {
                        var start;
                        (function (start) {
                            var cmm018 = nts.uk.com.view.cmm018;
                            var transferData = { screen: 'Menu' };
                            var __viewContext = window["__viewContext"] || {};
                            __viewContext.ready(function () {
                                if (__viewContext.transferred.value != null) {
                                    transferData = __viewContext.transferred.value;
                                }
                                __viewContext.viewModel = {
                                    viewmodelA: new cmm018.a.viewmodelA.ScreenModel(),
                                    viewmodelSubB: new cmm018.a.sub.viewmodelSubB.ScreenModel(),
                                    viewmodelSubA: new cmm018.a.sub.viewmodelSubA.ScreenModel()
                                };
                                __viewContext.viewModel.viewmodelA.preStart(transferData).done(function () {
                                    __viewContext.bind(__viewContext.viewModel);
                                });
                            });
                        })(start = a.start || (a.start = {}));
                    })(a = cmm018_1.a || (cmm018_1.a = {}));
                })(cmm018 = view.cmm018 || (view.cmm018 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm018.a.start.js.map