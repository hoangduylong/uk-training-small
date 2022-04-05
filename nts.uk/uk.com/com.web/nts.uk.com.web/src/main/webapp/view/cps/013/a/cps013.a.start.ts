module nts.uk.com.view.cps013.a {  
    __viewContext.ready(function() {
        let screenModel = new viewmodel.ScreenModel();
        nts.uk.ui.block.invisible();
        screenModel.startPage().done(function() {
            __viewContext.bind(screenModel);
            setTimeout(() => {
                $('span.box').attr("tabindex", "7");
            }, 1000);
        }).always(() => {
            nts.uk.ui.block.clear();
        });
    });
}