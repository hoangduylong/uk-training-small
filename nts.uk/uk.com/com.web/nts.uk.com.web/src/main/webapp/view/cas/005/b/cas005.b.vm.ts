module nts.uk.com.view.csa005.b {
    import getText = nts.uk.resource.getText;
    import cas005aViewModel = nts.uk.com.view.cas005.a.model;
    import block = nts.uk.ui.block;
    export module viewmodel {
        export class ScreenModel {
            newRoleCode : any;
            newRoleName : any;
            //checked
            checked: KnockoutObservable<boolean>;
            enable: KnockoutObservable<boolean>;
            //
            roleCode : KnockoutObservable<string>;
            roleName : KnockoutObservable<string>;
            objCommandScreenB : KnockoutObservable<cas005aViewModel.RoleCas005Command>;
            copyRoleCas005Command : KnockoutObservable<model.CopyRoleCas005Command>;
            constructor() {
                let self = this;
                self.newRoleCode = ko.observable("");
                self.newRoleName = ko.observable("");
                //checker
                self.checked = ko.observable(false);
                self.enable = ko.observable(true)
                self.roleCode = ko.observable("");
                self.roleName = ko.observable("");
                //
                self.objCommandScreenB = ko.observable(null);
                self.copyRoleCas005Command = ko.observable(null);
                let param = nts.uk.ui.windows.getShared("openB");
                if (param != null) {
                    self.objCommandScreenB(param);
                    self.roleCode(self.objCommandScreenB().roleCode);
                    self.roleName(self.objCommandScreenB().name);    
                }
                
                
            }

            /**
             * functiton start page
             */
            startPage(): JQueryPromise<any> {
                let self = this;
                let dfd = $.Deferred();
                dfd.resolve();
                return dfd.promise();
            }//end start page
            
            closeDialog(): void {
                nts.uk.ui.windows.close();
            }
            
            //btn copy role cas005
            buttonCopy(){
                let self = this;
                $("#newRoleName").trigger("validate");
                if (!$(".nts-input").ntsError("hasError")){
                    if(self.newRoleCode()){
                        self.objCommandScreenB().roleCode = self.newRoleCode();
                        self.objCommandScreenB().name = self.newRoleName();
                        self.copyRoleCas005Command(new model.CopyRoleCas005Command(self.objCommandScreenB(),self.checked()));
                        self.copyRoleCas005(self.copyRoleCas005Command());    
                    }else{
                        $("#newRoleCode").focus();  
                    }
                }
                
            }
            
            // 
            copyRoleCas005(copyRoleCas005Command : model.CopyRoleCas005Command){
                let self = this;
                let dfd = $.Deferred();
                block.invisible();
                service.copyRoleCas005(copyRoleCas005Command).done(function(data){
                    nts.uk.ui.dialog.info({ messageId: "Msg_20" }).then(function(){
                        nts.uk.ui.windows.setShared("closeB", self.newRoleCode()); 
                        nts.uk.ui.windows.close();   
                    });
                    dfd.resolve(data);  
                }).fail(function(res: any) {
                    dfd.reject();
                    nts.uk.ui.dialog.alertError(res.message).then(function() { nts.uk.ui.block.clear(); });
                }).always(()=>{
                    block.clear();    
                });
                dfd.resolve(); 
                
            }

            
            
        }//end screenModel
    }//end viewmodel

    //module model
    export module model {
        
        /**
         * class Role
         */
        export class CopyRoleCas005Command {
            roleCas005Command : cas005aViewModel.RoleCas005Command;
            checkUpdate : boolean;
            
            constructor(roleCas005Command : cas005aViewModel.RoleCas005Command,
            checkUpdate : boolean) {
                this.roleCas005Command = roleCas005Command;
                this.checkUpdate = checkUpdate;   
            }
        }//end class Role
        

    }//end module model

}//end module