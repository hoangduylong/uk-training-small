module nts.uk.com.view.cli003.a.viewmodel {
    __viewContext.ready(function() {
        let screenModel = new viewmodel.ScreenModel();
            __viewContext.bind(screenModel);
            $('#buttonToScreen-b').focus();      
    });
}
