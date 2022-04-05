module cps002.h.vm {
    import setShared = nts.uk.ui.windows.setShared;
    import getShared = nts.uk.ui.windows.getShared;
    import close = nts.uk.ui.windows.close;
    import modal = nts.uk.ui.windows.sub.modal;
    import alert = nts.uk.ui.dialog.alert;
    import alertError = nts.uk.ui.dialog.alertError;

    export class ViewModel {

        constructor() {
            
        }

        continueReg() {

            setShared('isContinue', true);
            close();

        }

        moveToViewScreen() {

            setShared('isContinue', false);
            close();

        }


    }
}