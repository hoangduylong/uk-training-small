module nts.uk.com.view.cmm023.a {
    import getText = nts.uk.resource.getText;

    __viewContext.ready(function() {
        __viewContext['screenModel'] = new viewmodel.ScreenModel();

        __viewContext['screenModel'].startPage().done(function() {

           

            __viewContext.bind(__viewContext['screenModel']);
        });

    });
}

