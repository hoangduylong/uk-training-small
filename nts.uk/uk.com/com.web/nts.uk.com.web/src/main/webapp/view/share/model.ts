module nts.uk.at.view.qmm011.share.model {
    import getText = nts.uk.resource.getText;

    export enum ExecuteMode {
        INSERT = 0,
        UPDATE = 1,
        DELETE = 2
    }

    export function getNumberOfDays(): Array<ItemModel> {
        return [
            new model.ItemModel(1.0, getText('KDM001_127')),
            new model.ItemModel(0.5, getText('KDM001_128'))
        ];
    }
    
    export function getNumberDays(): Array<ItemModel> {
        return [
            new model.ItemModel(1.0, getText('KDM001_127')),
            new model.ItemModel(0.5, getText('KDM001_128'))
        ];
    }
   
     export function getOccurredDays(): Array<ItemModel> {
        return [
            new model.ItemModel('1.0', getText('KDM001_127')),
            new model.ItemModel('0.5', getText('KDM001_128'))
        ];
    }
    
     export function getLawAtr(): Array<ItemModel> {
        return [
            new model.ItemModel('0', getText('KDM001_146')),
            new model.ItemModel('1', getText('KDM001_147')),
            new model.ItemModel('2', getText('KDM001_148'))
        ];
    }
    
    export function getRemainDaysItemList(): Array<ItemModel> {
        return [
            new model.ItemModel('1.0', getText('KDM001_127')),
            new model.ItemModel('0.5', getText('KDM001_128')),
            new model.ItemModel('0', getText('KDM001_129'))
        ];
    }

     export function getRequireDayList(): Array<ItemModel> {
        return [
            new model.ItemModel('1.0', getText('KDM001_127')),
            new model.ItemModel('0.5', getText('KDM001_128'))
        ];
    }
    export function getRequireDay(): Array<ItemModel> {
        return [
            new model.ItemModel(1.0, getText('KDM001_127')),
            new model.ItemModel(0.5, getText('KDM001_128'))
        ];
    }

    export function getTypeHoliday(): Array<ItemModel> {
        return [
            new model.ItemModel('0', getText('KDM001_146')),
            new model.ItemModel('1', getText('KDM001_147')),
            new model.ItemModel('2', getText('KDM001_148'))
        ];
    }
    
    export function getDaysNumber(): Array<ItemModel> {
        return [
            new model.ItemModel(1.0, getText('KDM001_127')),
            new model.ItemModel(0.5, getText('KDM001_128'))
        ];
    }

    export function getremainDay(): Array<ItemModel> {
        return [
            new model.ItemModel(1.0, getText('KDM001_127')),
            new model.ItemModel(0.5, getText('KDM001_128')),
            new model.ItemModel(0, getText('KDM001_129'))
        ];
    }

    export function formatterDay(value) {
        if (value) {
            return value == "0" ? value + getText('KDM001_27') : parseFloat(value).toFixed(1) + getText('KDM001_27');
        } else {
            return "0" + getText('KDM001_27');
        }
    }

    export class ItemModel {
        code: any;
        name: string;
        constructor(code: any, name: string) {
            this.code = code;
            this.name = name;
        }
    }
}