module nts.uk.com.view.cmf002.v2 {
    __viewContext.ready(function() {
        __viewContext['screenModel'] = new viewmodel.ScreenModel();
        __viewContext['screenModel'].start().done(function() {
            __viewContext.bind(__viewContext['screenModel']);
            _.defer(() => {
                $('#V2_2_container').focus();
            });
        });
    });
}