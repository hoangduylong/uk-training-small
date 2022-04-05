module nts.uk.hr.view.ccg029.a.viewmodel {
    export class ScreenModel {
        input: any;
        constructor() {
            var self = this;
            //param
            self.input = { systemType: 3, //システム区分（0：共通、1：就業、2：給与、3：人事）
                includePreEmployee: true, //入社前社員を含める
                includeRetirement: true, //退職者を含める
                includeAbsence: true, //休職者を含める 
                includeClosed: true, //休業者を含める
                includeTransferEmployee: true, //出向社員を含める
                includeAcceptanceTransferEmployee: true, //受入出向社員を含める
                getPosition: true, //職位を取得する
                getEmployment: true, //雇用を取得する
                getPersonalFileManagement: true //個人ファイル管理を取得する
            }
        }
        startPage(): JQueryPromise<any> {
            var self = this;
            var dfd = $.Deferred();
            dfd.resolve();
            return dfd.promise();
        }
        public seletedEmployee(data): void{
            console.log(data);
        }
    }
 
}
