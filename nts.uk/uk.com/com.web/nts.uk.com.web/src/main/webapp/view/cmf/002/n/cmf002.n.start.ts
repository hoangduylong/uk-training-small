module nts.uk.com.view.cmf002.n {
    import model = cmf002.share.model;
    __viewContext.ready(function() {
        nts.uk.ui.block.invisible();
        __viewContext['screenModel'] = new viewmodel.ScreenModel();
        __viewContext['screenModel'].start().done(function() {
            __viewContext.bind(__viewContext['screenModel']);
            __viewContext['screenModel'].atWorkDataOutputItem().fixedValue() == model.NOT_USE_ATR.NOT_USE ? $('#N2_1_2').focus() : $('#N3_1').focus();
        }).always(() => {
            nts.uk.ui.block.clear();
        });
    });
}
