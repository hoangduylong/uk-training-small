module cps002.j.vm {
    import setShared = nts.uk.ui.windows.setShared;
    import getShared = nts.uk.ui.windows.getShared;
    import close = nts.uk.ui.windows.close;
    import modal = nts.uk.ui.windows.sub.modal;
    import alert = nts.uk.ui.dialog.alert;
    import alertError = nts.uk.ui.dialog.alertError;

    export class ViewModel {
        cardNoMode: boolean = true;
        txtEmployeeCode: KnockoutObservable<string> = ko.observable("");
        txtCardNo: KnockoutObservable<string> = ko.observable("");
        generateEmCode: KnockoutObservable<string> = ko.observable("");
        displayGenerateEmCode: KnockoutObservable<string> = ko.observable("");
        stampCardEditing: KnockoutObservable<IStampCardEditing> = ko.observable({
            method: EDIT_METHOD.PreviousZero,
            digitsNumber: 20
        });
        
        constructor() {
            let self = this, textValue = "";
            self.cardNoMode = getShared("cardNoMode");


             if (self.cardNoMode) {
                $("#cardNumber").focus();
            } else {
                $("#employeeCode").focus();
            }
            if (textValue) {
                self.generateEmCode(textValue);
                let displayEmCode = _.map(textValue).map(function(i){ 
                    return i == ' '? "&nbsp" : i;
                });
                self.displayGenerateEmCode(displayEmCode.join("").toString());
            }
            
            self.start();
        }

        start() {
            let self = this;

            let dfd = $.Deferred();
            service.getStamCardEdit().done(data => {
                self.stampCardEditing(data);
                $("#cardNumber").focus();
                dfd.resolve(data);
            });

            return dfd.promise();
        }

        getCardNo() {
            let self = this;
            service.getCardNo(self.txtCardNo()).done(function(cardNo) {
                self.generateEmCode(cardNo);
                
                let ce = ko.toJS(self.stampCardEditing);
                let s ="";
                if (cardNo && cardNo.length == ce.digitsNumber) {
                    switch (ce.method) {
                        case EDIT_METHOD.PreviousZero: {
                            s = _.padStart(cardNo, ce.digitsNumber, '0');
                            break;
                        }
                        case EDIT_METHOD.AfterZero: {
                            s = _.padEnd(cardNo, ce.digitsNumber, '0');
                            break;
                        }
                        case EDIT_METHOD.PreviousSpace: {
                            s = _.padStart(cardNo, ce.digitsNumber, ' ');
                            break;
                        }
                        case EDIT_METHOD.AfterSpace: {
                            s = _.padEnd(cardNo, ce.digitsNumber, ' ');
                            break;
                        }
                    }
                }
                
                let displayCardNo = _.map(s).map(function(i){ 
                    return i == ' '? "&nbsp" : i;
                });
                self.displayGenerateEmCode(displayCardNo.join("").toString());

            }).fail(function() {
                alertError({ messageId: "Msg_505" });
            });
        }



        returnEmCode() {
            let self = this;
            setShared("CPS002_PARAM_MODE_CARDNO", self.generateEmCode());
            close();
        }

        close() {
            close();
        }
    }
    
    interface IStampCardEditing {
        method: EDIT_METHOD;
        digitsNumber: number;
    }

    enum EDIT_METHOD {
        PreviousZero = 1,
        AfterZero = 2,
        PreviousSpace = 3,
        AfterSpace = 4
    }
}