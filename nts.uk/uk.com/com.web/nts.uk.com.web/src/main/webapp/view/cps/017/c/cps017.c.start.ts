module nts.uk.com.view.cps017.c {
    __viewContext.ready(function() {
        __viewContext["viewModel"] = new viewmodel.ScreenModel();
        __viewContext.bind(__viewContext["viewModel"]);
        $('#start-date-sel').focus();
    });
}