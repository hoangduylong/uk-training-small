var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cps005;
                (function (cps005) {
                    var b;
                    (function (b) {
                        var __viewContext = window["__viewContext"] || {};
                        __viewContext.ready(function () {
                            __viewContext['screenModelB'] = new b.viewmodel.ScreenModel();
                            __viewContext['screenModelB'].startPage().done(function () {
                                __viewContext.bind(__viewContext['screenModelB']);
                                $(document).on("keydown", 'input.ntsSearchBox.nts-editor.ntsSearchBox_Component', function (e) {
                                    if (e.keyCode == 13) {
                                        $("input.ntsSearchBox.nts-editor.ntsSearchBox_Component").focus();
                                    }
                                });
                                ko.computed(function () {
                                    __viewContext['screenModelB'].isEnableButtonProceed(nts.uk.ui._viewModel.errors.isEmpty() && __viewContext['screenModelB'].currentItemData().isEnableButtonProceed());
                                });
                            });
                        });
                    })(b = cps005.b || (cps005.b = {}));
                })(cps005 = view.cps005 || (view.cps005 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cps005.b.start.js.map