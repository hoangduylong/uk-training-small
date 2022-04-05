module nts.uk.com.view.cmf002.c {
    __viewContext.ready(function() {
        let screenModel = new viewmodel.ScreenModel();
        screenModel.startPage().done(function(self) {
            __viewContext.bind(screenModel);
            _.defer(() => { self.setFocus(); });
        });
    });
}