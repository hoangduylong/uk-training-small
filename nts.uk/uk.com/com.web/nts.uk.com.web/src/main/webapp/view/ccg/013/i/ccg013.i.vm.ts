 module nts.uk.com.view.ccg013.i.viewmodel {  
    export class ScreenModel {    
        nameMenuBar: KnockoutObservable<string>;
        menuBarId: any;
        textOption:KnockoutObservable<nts.uk.ui.option.TextEditorOption>;
        
        constructor() {
            var self = this;
            
            self.nameMenuBar = ko.observable('');
            self.textOption = ko.mapping.fromJS(new nts.uk.ui.option.TextEditorOption({
                width: "160px"
            })); 
            
            //Get data and fill to popup
            var menuBar = nts.uk.ui.windows.getShared("CCG013I_MENU_BAR1");           
            if(menuBar != undefined){
                self.nameMenuBar(menuBar.menuBarName);
                self.menuBarId = menuBar.menuBarId;
            }
        }
        
        start(): JQueryPromise<any> {
            var self = this;
            var dfd = $.Deferred();
            dfd.resolve();   
            return dfd.promise();
        }
        
        /**
         * Pass data to main screen
         * Close the popup
         */
        submit() {
            var self = this;
            $(".ntsColorPicker_Container").trigger("validate");
            
            validateNameInput($("#menu-bar-name"),'#[CCG013_87]', self.nameMenuBar().trim(), 'MenuBarName');
            
            var hasError = nts.uk.ui.errors.hasError();
            if (hasError) {
                return;
            }
            
            //Set data
            var menuBar = {
                menuBarName: self.nameMenuBar()
            }
            
            nts.uk.ui.windows.setShared("CCG013I_MENU_BAR", menuBar);            
            self.closeDialog();
        }

        removeMenuBar() {
            var self = this;
            var menuBarId = self.menuBarId;
            nts.uk.ui.windows.setShared("CCG013I_MENU_BAR_ID", menuBarId);
            self.closeDialog();
        }
        
        /**
         * Click on button i1_9
         * Close the popup
         */
        closeDialog() {
            nts.uk.ui.windows.close();
        }
    }
 }