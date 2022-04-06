var cps002;
(function (cps002) {
    var i;
    (function (i) {
        var __viewContext = window['__viewContext'] || {};
        __viewContext.ready(function () {
            __viewContext['viewModel'] = new i.vm.ViewModel();
            __viewContext.bind(__viewContext['viewModel']);
            $("#multiList_headers th:first-child").append(nts.uk.resource.getText("CPS002_74"));
            $(".ntsCheckBox-label input:checkbox").change(function () {
                if (!$(".ntsCheckBox-label input:checkbox").is(":checked")) {
                    $("#test").ntsImageEditor("clear");
                    $("#test .crop-description").hide();
                }
                else {
                    $("#test .crop-description").show();
                }
            });
            __viewContext['viewModel'].start();
            $(".checkbox-holder").hide();
        });
    })(i = cps002.i || (cps002.i = {}));
})(cps002 || (cps002 = {}));
//# sourceMappingURL=cps002.i.start.js.map