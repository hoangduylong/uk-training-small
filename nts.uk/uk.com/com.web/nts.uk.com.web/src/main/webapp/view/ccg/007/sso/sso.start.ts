module view.ccg007.sso {
    __viewContext.ready(function() {
        var errAcc: boolean = true;
        var errMsg: string = '';
        var value = __viewContext.transferred.value;
        if (value != null && value !== undefined) {
            errAcc = value.errAcc;
            errMsg = value.errMsg;
        }
        var screenModel = new viewmodel.ScreenModel(errAcc, errMsg);
        __viewContext.bind(screenModel);
    });
}