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
                    var c;
                    (function (c) {
                        __viewContext.ready(function () {
                            __viewContext["viewModel"] = new c.viewmodel.ViewModel();
                            __viewContext.bind(__viewContext["viewModel"]);
                            $("#codeInput").focus();
                            $(document).ready(function () {
                                var beforeIndex = 1;
                                $(window).keyup(function (e) {
                                    if (e.which === 9) {
                                        var tabindex = e.target.attributes.tabindex ? e.target.attributes.getNamedItem("tabindex").value : e.target.attributes.getNamedItem("tab-index").value;
                                        if (beforeIndex == 5) {
                                            $("#codeInput").focus();
                                        }
                                        beforeIndex = parseInt(tabindex);
                                    }
                                });
                                $("#copyCheck").on('click', function (evt) {
                                    $("#copyCheck").focus();
                                });
                            });
                        });
                    })(c = cps009.c || (cps009.c = {}));
                })(cps009 = view.cps009 || (view.cps009 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cps009.c.start.js.map