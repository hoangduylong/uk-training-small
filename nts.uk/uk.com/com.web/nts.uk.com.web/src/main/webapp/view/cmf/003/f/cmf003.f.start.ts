module nts.uk.com.view.cmf003.f {
    __viewContext.ready(function() {
        var screenModel = new viewmodel.ScreenModel();
        screenModel.start().done(function(){
           __viewContext.bind(screenModel);
        });
        $('#F3_1').focus();
    });
}