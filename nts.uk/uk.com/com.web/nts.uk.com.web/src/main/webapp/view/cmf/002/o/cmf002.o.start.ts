module nts.uk.com.view.cmf002.o {

    __viewContext.ready(function() {
        __viewContext.transferred.ifPresent(data => {
                if (!data.roleAuthority) {
                    nts.uk.request.jump("/view/cmf/002/a/index.xhtml");
                } else {
                    nts.uk.ui.windows.setShared("CMF002O_PARAMS", data.roleAuthority);
                }
            });
        var screenModel = new viewmodel.ScreenModel();
            __viewContext.bind(screenModel);
        // ver62: remove O screen => go to P screen
        screenModel.selectStandardMode();
    });
}