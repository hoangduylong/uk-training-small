module nts.uk.at.view.cps013.e {
    __viewContext.ready(function() {
        let screenModel = new viewmodel.ScreenModel();
        __viewContext["viewmodel"] = screenModel;
        __viewContext.bind(screenModel);
        let dataFromA =   nts.uk.ui.windows.getShared("CPS013B_PARAMS");
        screenModel.start(dataFromA);
         $("#btn-f-close").focus();
    });
        }