module nts.uk.com.view.cmf005.f {
    __viewContext.ready(function() {
        let screenModel = new viewmodel.ScreenModel();
       screenModel.start().done(function(){
           __viewContext.bind(screenModel);
        });
        $("#F10_1").focus();
    });
}