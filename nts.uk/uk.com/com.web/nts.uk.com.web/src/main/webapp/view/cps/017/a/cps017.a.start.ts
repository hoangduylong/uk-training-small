module nts.uk.com.view.cps017.a {
    __viewContext.ready(function() {
        __viewContext["viewModel"] = new viewmodel.ScreenModel();
        
        __viewContext["viewModel"].start().done(function(){
            __viewContext.bind(__viewContext["viewModel"]);
        });
        
        if ( window.top != window.self) {
              $("#header").css("display", "none")
        }
    });
}
