module nts.uk.com.view.cmf002.j {
    import model = cmf002.share.model;
    __viewContext.ready(function() {
        nts.uk.ui.block.invisible();
        __viewContext['screenModel'] = new viewmodel.ScreenModel();
        __viewContext['screenModel'].start().done(function() {
            __viewContext.bind(__viewContext['screenModel']);
            __viewContext['screenModel'].characterDataFormatSetting().fixedValue() == model.NOT_USE_ATR.NOT_USE ? $('#J2_1').focus() : $('#J7_1').focus();
        }).always(() => {
            nts.uk.ui.block.clear();
        });
    });
}