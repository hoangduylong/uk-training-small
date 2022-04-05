module nts.uk.com.view.cas004.a {
    __viewContext.ready(function() {
        let screenModel = new viewModel.ScreenModel();
        screenModel.startPage().done(function() {
            __viewContext.bind(screenModel);
            $(".input-lead").css({"width":"130"});
            $(".input-date").css({"width":"85"});
            $(".input-email").css({"width":"300"});
        });
    });
}