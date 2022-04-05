module nts.uk.com.view.cmf004.k {
    __viewContext.ready(function() {
        var screenModel = new viewmodel.ScreenModel();
        screenModel.start().done(function(){
           __viewContext.bind(screenModel);
        });
        $('#K3_1').focus();
    });
}