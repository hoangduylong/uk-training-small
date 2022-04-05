module nts.uk.com.view.ccg013.i {
    __viewContext.ready(function() {
        var screenModel = new i.viewmodel.ScreenModel();
        screenModel.start().done(function() {
            __viewContext.bind(screenModel); 
            $('#menu-bar-name').focus();
        });
    }); 
}