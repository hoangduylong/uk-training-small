var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmf004;
                (function (cmf004) {
                    var b;
                    (function (b) {
                        __viewContext.ready(function () {
                            __viewContext['screenModel'] = new b.viewmodel.ScreenModel();
                            var vm = __viewContext['screenModel'];
                            vm.start().done(function () {
                                __viewContext.bind(vm);
                                $('#B5_1_horizontalScrollContainer').remove();
                                $('#kcp005component').ntsListComponent(vm.kcp005ComponentOptionScreenG);
                                $('#kcp005component1').ntsListComponent(vm.kcp005ComponentOptionScreenH);
                            });
                            $('#B3_1').focus();
                        });
                    })(b = cmf004.b || (cmf004.b = {}));
                })(cmf004 = view.cmf004 || (view.cmf004 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf004.b.start.js.map