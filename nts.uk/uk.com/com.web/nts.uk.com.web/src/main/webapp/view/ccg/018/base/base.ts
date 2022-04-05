module ccg018.base {
    /**
     * Shared view model.
     */
    export module viewModel {
        /**
         * Base screen model.
         */
        export abstract class ScreenModelBase {
            // variable
            title: KnockoutObservable<string>;
            comboItemsAfterLogin: KnockoutObservableArray<result.ComboBox>;
            comboItemsAsTopPage: KnockoutObservableArray<result.ComboBox>;
            screenTemplateUrl: KnockoutObservable<string>;
            categorySet: KnockoutObservable<number>;
            
            // Abstract method definition.
            abstract save();
            abstract openDialogC(): void;
            
            constructor(baseModel: result.BaseResultModel) {
                var self = this;
                
                self.title = ko.observable(baseModel.title);
                self.comboItemsAfterLogin = ko.observableArray(baseModel.comboItemsAfterLogin);
                self.comboItemsAsTopPage = ko.observableArray(baseModel.comboItemsAsTopPage);
                self.screenTemplateUrl = ko.observable(baseModel.screenTemplateUrl);
                self.categorySet = ko.observable(baseModel.categorySet);
            }
            
            /**
             * Jump to screen CCG015
             */
            jumpToCcg015(): void {
                nts.uk.request.jump("/view/ccg/015/a/index.xhtml");
            }
        }
    }    
    
    /**
     * Contain base result model.
     */
    export module result {
        /**
         * Base result model.
         */
        export class BaseResultModel {
            title: string;
            comboItemsAfterLogin: Array<ComboBox>;
            comboItemsAsTopPage: Array<ComboBox>;
            screenTemplateUrl: string;
            categorySet: number;
        }
        
        interface IComboBox {
            code: string;
            name: string;
            system: number;
            menuCls: number;
            uniqueCode?: string;
        }
    
        export class ComboBox {
            code: string;
            name: string;
            system: number;
            menuCls: number;
            uniqueCode: string;
    
            constructor(param: IComboBox) {
                this.code = param.code;
                this.name = param.name;
                this.system = param.system;
                this.menuCls = param.menuCls;
                this.uniqueCode = nts.uk.text.format("{0}{1}{2}", param.code, param.system, param.menuCls);
            }
        }
    }
}