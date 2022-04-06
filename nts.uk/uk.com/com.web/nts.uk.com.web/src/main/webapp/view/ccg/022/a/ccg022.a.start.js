var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var ccg022;
                (function (ccg022) {
                    var a;
                    (function (a) {
                        var start;
                        (function (start) {
                            __viewContext.ready(function () {
                                var vm = __viewContext['viewModel'] = new a.screenModel.ViewModel();
                                $("#sidebar").ntsSideBar("init", {
                                    activate: function (event, info) {
                                    }
                                });
                                vm.startPage().done(function (x) {
                                    __viewContext.bind(vm);
                                });
                            });
                        })(start = a.start || (a.start = {}));
                    })(a = ccg022.a || (ccg022.a = {}));
                })(ccg022 = view.ccg022 || (view.ccg022 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg022.a.start.js.map