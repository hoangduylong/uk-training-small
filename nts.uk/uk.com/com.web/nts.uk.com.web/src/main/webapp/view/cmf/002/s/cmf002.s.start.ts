module nts.uk.com.view.cmf002.s {
    __viewContext.ready(function() {
        var screenModel = new viewmodel.ScreenModel();
        screenModel.start().done(function(){
           __viewContext.bind(screenModel);
             $('#S10_1').focus();
        });
    });
}