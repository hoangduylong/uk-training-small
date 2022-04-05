__viewContext.ready(function() {
    var screenModel = new nts.uk.com.view.cmm001.e.viewmodel.ScreenModel();
    screenModel.start().done(function(){
        __viewContext.bind(screenModel);
    });
});
