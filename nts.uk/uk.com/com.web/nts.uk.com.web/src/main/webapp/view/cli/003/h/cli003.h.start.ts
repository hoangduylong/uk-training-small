module nts.uk.com.view.cli003.h {
    __viewContext.ready(function() {
        let screenModel = new viewmodel.ScreenModel();
        __viewContext.bind(screenModel);
         $("#H2_1 tr").eq(1).find('td:first div').focus();
    });
}