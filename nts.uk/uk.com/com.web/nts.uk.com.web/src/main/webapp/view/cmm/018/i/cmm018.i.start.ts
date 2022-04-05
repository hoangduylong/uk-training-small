module nts.uk.com.view.cmm018.i {
    __viewContext.ready(function() {
        var screenModel = new nts.uk.com.view.cmm018.i.viewmodel.ScreenModel();
        __viewContext.bind(screenModel);
        $('#startDateInput').focus();
        $("* input").attr('tabindex', -1);
        $("#startDateInput").attr('tabindex', 1);
        $("#radioBox").attr('tabindex', 2);
        $("#functions-area-bottom > button:NTH-CHILD(1)").attr('tabindex', 3);
        $("#functions-area-bottom > button:NTH-CHILD(2)").attr('tabindex', 4);
    });
}
