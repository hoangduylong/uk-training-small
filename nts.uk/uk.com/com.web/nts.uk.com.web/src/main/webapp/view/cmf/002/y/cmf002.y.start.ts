module nts.uk.com.view.cmf002.y {
    __viewContext.ready(function() {
        var screenModel = new viewmodel.ScreenModel();
        screenModel.start().done(function(){
           __viewContext.bind(screenModel);
            _.defer(() => {
                    $('#listlog_container').removeAttr('tabindex');
                    $('#Y20_1').focus();
                });
        });
    });
}