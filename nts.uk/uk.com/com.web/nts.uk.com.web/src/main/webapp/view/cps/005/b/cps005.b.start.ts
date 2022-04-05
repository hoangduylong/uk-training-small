module nts.uk.com.view.cps005.b {
    let __viewContext: any = window["__viewContext"] || {};
    __viewContext.ready(function() {
        __viewContext['screenModelB'] = new viewmodel.ScreenModel();
        __viewContext['screenModelB'].startPage().done(function() {
            __viewContext.bind(__viewContext['screenModelB']);
            
            $(document).on("keydown", 'input.ntsSearchBox.nts-editor.ntsSearchBox_Component', function(e) {
                if (e.keyCode == 13) {
                        $("input.ntsSearchBox.nts-editor.ntsSearchBox_Component").focus(); 
                }
            });
            ko.computed(function() {
                __viewContext['screenModelB'].isEnableButtonProceed(nts.uk.ui._viewModel.errors.isEmpty() && __viewContext['screenModelB'].currentItemData().isEnableButtonProceed());
            });


        });
    });
}

