module nts.uk.com.view.csa005.b {  
    __viewContext.ready(function() {
        let screenModel = new viewmodel.ScreenModel();
        screenModel.startPage().done(function() {
            __viewContext.bind(screenModel);
            $("#newRoleCode").focus();
        });        
    });
}