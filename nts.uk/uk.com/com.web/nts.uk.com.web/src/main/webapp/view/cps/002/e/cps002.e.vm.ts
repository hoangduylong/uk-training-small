module cps002.e.vm {
    import setShared = nts.uk.ui.windows.setShared;
    import getShared = nts.uk.ui.windows.getShared;
    import close = nts.uk.ui.windows.close;
    import modal = nts.uk.ui.windows.sub.modal;
    import alert = nts.uk.ui.dialog.alert;
    import alertError = nts.uk.ui.dialog.alertError;

    export class ViewModel {
        cardNoMode: boolean = false;
        txtEmployeeCode: KnockoutObservable<string> = ko.observable("");
        txtCardNo: KnockoutObservable<string> = ko.observable("");
        generateEmCode: KnockoutObservable<string> = ko.observable("");
        displayGenerateEmCode: KnockoutObservable<string> = ko.observable("");
        
        constructor() {
            let self = this, textValue = "";
            self.cardNoMode = getShared("empCodeMode");

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
        }
        start(): JQueryPromise<any>{
            let self = this,
                dfd = $.Deferred();
            delete __viewContext.primitiveValueConstraints.EmployeeCode.formatOption; 
            setTimeout(dfd.resolve(),100);
            setTimeout(function(c){
                $("#employeeCode").focus();    
            },100);
            return dfd.promise();
        }

        getCode() {
            let self = this;
            self.cardNoMode ? self.getCardNo() : self.getEmlCode();
        }

        getEmlCode() {
            let self = this;
            service.getEmlCode(self.txtEmployeeCode()).done(function(emCode) {
                self.generateEmCode(emCode);
                let displayEmCode = _.map(emCode).map(function(i){ 
                    return i == ' '? "&nbsp" : i;
                });
                self.displayGenerateEmCode(displayEmCode.join("").toString());

            }).fail(function() {
                alertError({ messageId: "Msg_505" });
            });
        }

        getCardNo() {
            let self = this;
            service.getCardNo(self.txtCardNo()).done(function(emCode) {
                self.generateEmCode(emCode);
            }).fail(function() {
                alertError({ messageId: "Msg_505" });
            });
        }

        returnEmCode() {
            let self = this;
            setShared("CPS002_PARAM_MODE_EMP_CODE", self.generateEmCode());
            close();
        }

        close() {
            close();
        }
    }
}