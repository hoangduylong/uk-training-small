module nts.uk.com.view.cmm007.a {
    import blockUI = nts.uk.ui.block;
    
    __viewContext.ready(function() {
        let mainTab = new viewmodel.ScreenModel();

        blockUI.grayout();
        
        mainTab.start_page().done(function(screenModel){
            __viewContext.bind(screenModel);
            screenModel.onSelectTabB();
            blockUI.clear(); 
        });
    });
}
