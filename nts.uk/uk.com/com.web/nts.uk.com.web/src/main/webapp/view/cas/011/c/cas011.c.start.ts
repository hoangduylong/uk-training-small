module nts.uk.com.view.cas011.c {
    __viewContext.ready(function() {
        __viewContext["viewModel"] = new viewmodel.ScreenModel();
        __viewContext["viewModel"].start().done(function(){
            __viewContext.bind(__viewContext["viewModel"]);
        });
    });
}
