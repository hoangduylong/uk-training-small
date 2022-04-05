module nts.uk.com.view.csa005.c {
    import getText = nts.uk.resource.getText;
    export module viewmodel {
        export class ScreenModel {
            listMenu : KnockoutObservableArray<model.Menu>; 
            constructor() {
                let self = this;
                self.listMenu = ko.observableArray([]);
            }

            /**
             * functiton start page
             */
            startPage(): JQueryPromise<any> {
                let self = this;
                let dfd = $.Deferred();
                service.getPerMissingMenu().done(function(res){    
                    $("#list_link").focus();                
                    self.listMenu(_.map(res,  x =>{return new model.Menu(x.code, x.displayName, x.screenId, x.programId, x.queryString)}));
                    
                });
                dfd.resolve();
                return dfd.promise();
            }//end start page
            
            public closeDialog(): any{
                let self = this;
                nts.uk.ui.windows.close() ;   
            }  
            
            
        }//end screenModel
    }//end viewmodel

    //module model
    export module model {
        
        /**
         * class Mnu
         */
        export class Menu {
            code: string;
            displayName: string;
            screenId: string;
            programId: string;
            queryString : string;
            url: string;
            
            constructor(code: string, displayName: string, screenId: string, 
                            programId: string, queryString: string) {
                this.code = code;
                this.displayName = displayName;
                this.screenId = screenId;
                this.programId = programId.toLowerCase();
                this.queryString = queryString;
                this.url = "/nts.uk.com.web/view/" + programId.substr(0,3).toLowerCase() + "/" +programId.substr(3,6).toLowerCase() + "/" + screenId.toLowerCase() + "/index.xhtml";
            }
       }//end class Role        

    }//end module model

}//end module