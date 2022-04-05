module nts.uk.com.view.cdl023.a {  
    __viewContext.ready(function() {
        let screenModel = new viewmodel.ScreenModel();
        screenModel.startPage().done(function() {
            __viewContext.bind(screenModel);
            
            // set focus
            $("#btn-config").focus();
        });
    });
}