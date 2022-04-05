module cas009.b.viewmodel {
    import service = cas009.b.service;
    export class ScreenModel {
        listMenu : KnockoutObservableArray<viewmodel.model.Menu>; 
        constructor() {
            var self = this;
            self.listMenu = ko.observableArray([]);
            
        }

        /** Start Page */
       public  startPage(): any {           
            let self = this;
            service.getPerMissingMenu().done(function(res){    
                $("#list_link").focus();                   
                self.listMenu(_.map(res,  x =>{return new model.Menu(x.code, x.displayName, x.screenId, x.programId, x.queryString)}));
            });
        }

        public closeDialog(): any{
            let self = this;
            nts.uk.ui.windows.close() ;   
        }  
    }


    export module model {
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
                this.programId = programId;
                this.queryString = queryString;
                this.url = "/nts.uk.com.web/view/" + programId.substr(0,3).toLowerCase() + "/" +programId.substr(3,6).toLowerCase() + "/" + screenId.toLowerCase() + "/index.xhtml";
            }
       }
    }
}