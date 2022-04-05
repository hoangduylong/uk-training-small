module nts.uk.com.view.cmm018.m {  
    __viewContext.ready(function() {
        let screenModel = new cmm018.m.viewmodel.ScreenModel();
            __viewContext.bind(screenModel);
        $('#basedate').focus();
    });
}