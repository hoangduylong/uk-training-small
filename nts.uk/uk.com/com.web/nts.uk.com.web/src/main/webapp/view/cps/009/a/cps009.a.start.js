var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cps009;
                (function (cps009) {
                    var a;
                    (function (a) {
                        var setShared = nts.uk.ui.windows.setShared;
                        var __viewContext = window["__viewContext"] || {};
                        __viewContext.ready(function () {
                            __viewContext.transferred.ifPresent(function (data) {
                                setShared("CPS009A_PARAMS", data);
                            });
                            __viewContext["viewModel"] = new a.viewmodel.ViewModel();
                            __viewContext.bind(__viewContext["viewModel"]);
                            if (window.top != window.self) {
                                $("#header").css("display", "none");
                                $(".goout").css("display", "none");
                                $("#closeBtn").css("visibility", "visible");
                            }
                            $(document).on("keydown", 'input.ntsSearchBox.nts-editor.ntsSearchBox_Component', function (e) {
                                if (e.keyCode == 13) {
                                    $("input.ntsSearchBox.nts-editor.ntsSearchBox_Component").focus();
                                }
                            });
                            $(".ntsControl .nts-input").focusout(function () {
                                $(".ntsControl .nts-input").css("padding-top", "5px !important");
                                $(".ntsControl .nts-input").css("padding-bottom", "5px !important");
                            });
                        });
                    })(a = cps009.a || (cps009.a = {}));
                })(cps009 = view.cps009 || (view.cps009 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cps009.a.start.js.map