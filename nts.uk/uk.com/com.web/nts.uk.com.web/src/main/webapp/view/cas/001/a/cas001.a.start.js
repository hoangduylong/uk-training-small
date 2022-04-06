var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cas001;
                (function (cas001) {
                    var a;
                    (function (a) {
                        var setShared = nts.uk.ui.windows.setShared;
                        __viewContext.ready(function () {
                            __viewContext.transferred.ifPresent(function (data) {
                                setShared("CAS001A_PARAMS", data);
                            });
                            __viewContext['screenModel'] = new a.viewmodel.ScreenModel();
                            __viewContext.bind(__viewContext['screenModel']);
                            $("#A2_008").on("iggridrendered", function (evt, ui) {
                                var helpButton = "<button id=\"A2_012\" tabindex= \"-1\" data-bind=\"ntsHelpButton: {image: \'A2_012.png\', position: \'right top\', enable: true }\">?</button>";
                                nts.uk.ui.ig.grid.header.getCell('A2_008', 'setting').append($(helpButton));
                                ko.applyBindings(__viewContext['screenModel'], nts.uk.ui.ig.grid.header.getCell('A2_008', 'setting')[0]);
                            });
                            $(document).ready(function () {
                                setTimeout(function () {
                                    $("#item_role_table_body_isChecked > span > div > label > span").attr("tabindex", 21);
                                    $("button.manual-button").attr("tabindex", -1);
                                }, 1000);
                            });
                        });
                    })(a = cas001.a || (cas001.a = {}));
                })(cas001 = view.cas001 || (view.cas001 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cas001.a.start.js.map