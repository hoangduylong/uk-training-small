module nts.uk.com.view.cmm018.j {
    __viewContext.ready(function() {
        var screenModel = new nts.uk.com.view.cmm018.j.viewmodel.ScreenModel();
        __viewContext.bind(screenModel);
        nts.uk.util.value.reset($("#startDateInput"));
        if(screenModel.isUpdate()) {
            $('#startDateInput').focus();
        }
    });
}
