module nts.uk.com.view.ccg008.d {
    __viewContext.ready(function() {
        var screenModel = new d.viewmodel.ScreenModel();
        screenModel.start().done(function() {
            __viewContext.bind(screenModel); 
        });
    }); 
}