var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cdl003;
                (function (cdl003) {
                    var a;
                    (function (a) {
                        __viewContext.ready(function () {
                            var screenModel = new a.viewmodel.ScreenModel();
                            __viewContext.bind(screenModel);
                            $('#classification').ntsListComponent(screenModel.classifications).done(function () {
                                $('#classification').focusComponent();
                            });
                        });
                    })(a = cdl003.a || (cdl003.a = {}));
                })(cdl003 = view.cdl003 || (view.cdl003 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cdl003.a.start.js.map