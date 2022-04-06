var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cps006;
                (function (cps006) {
                    var b;
                    (function (b) {
                        __viewContext.ready(function () {
                            __viewContext['screenModel'] = new b.viewmodel.ScreenModel();
                            __viewContext['screenModel'].start().done(function () {
                                __viewContext.bind(__viewContext['screenModel']);
                                $("#itemName").focus();
                            });
                        });
                    })(b = cps006.b || (cps006.b = {}));
                })(cps006 = view.cps006 || (view.cps006 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//$(function() {
//    $(document).on('click', '.search-btn', function(evt) {
//        let dataSoureFilter: Array<any> = $("#B1_3").igGrid("option", "dataSource");
//        if(dataSoureFilter.length > 0){
//            __viewContext['screenModel'].currentSelectId(dataSoureFilter[0].id);
//        }
//    });
//
//    $(document).on('click', '.clear-btn', function(evt) {
//
//
//    });
//})
//# sourceMappingURL=cps006.b.start.js.map