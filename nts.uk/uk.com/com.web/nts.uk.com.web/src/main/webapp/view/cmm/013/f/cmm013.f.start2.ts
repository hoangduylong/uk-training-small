module nts.uk.com.view.cmm013.f {
    __viewContext.ready(function() {
        var screenModel = new viewmodel.ScreenModel2();
        screenModel.startPage().done(function() {
            __viewContext.bind(screenModel);
            
			
        });
    });
}