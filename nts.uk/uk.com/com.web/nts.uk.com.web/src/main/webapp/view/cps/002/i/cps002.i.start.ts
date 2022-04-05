
module cps002.i {
    let __viewContext: any = window['__viewContext'] || {};
    __viewContext.ready(() => {
        __viewContext['viewModel'] = new vm.ViewModel();
        __viewContext.bind(__viewContext['viewModel']);
        $("#multiList_headers th:first-child").append(nts.uk.resource.getText("CPS002_74"));
        $(".ntsCheckBox-label input:checkbox").change(function() {
            if (!$(".ntsCheckBox-label input:checkbox").is(":checked")) {
                $("#test").ntsImageEditor("clear");
                $("#test .crop-description").hide();
            } else {
                $("#test .crop-description").show();
            }
        });
        __viewContext['viewModel'].start();
        $(".checkbox-holder").hide();


    });
}