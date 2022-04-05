module ccg029.component {
    var block = nts.uk.ui.block;
    var getText = nts.uk.resource.getText;
    __viewContext.primitiveValueConstraints.String_Any_40 = {
        valueType: 'String',
        maxLength: 40,
    };
    window.onload = function() {
        setTimeout(function(){
            $('#key-word').focus();      
        }, 100);
    };
    ko.components.register('search-employee-modal', {
         viewModel: {
                createViewModel: function(param, componentInfo) {
                    var cvm = new Model(param.input, param.callback);
                    return cvm;
                }
            },
            template: '<div id="component-search-employee">'
                + '   <div class="row">'
                + '       <div class ="inline lable mr5"><span data-bind="text: nts.uk.resource.getText(\'CCG029_A1_1\')"></span></div>'
                + '       <div tabindex="1" id="base-date-search" class ="inline" data-bind="ntsDatePicker: {value: processingDate, name: nts.uk.resource.getText(\'CCG029_A1_2\'), dateFormat: \'YYYY/MM/DD\', required: true }"></div>'
                + '   </div>'
                + '   <div class="row">'
                + '       <div class ="inline mr10">'
                + '           <form id="form" action="#" autocomplete="off">'
                + '               <input tabindex="2" id="key-word" data-bind="ntsTextEditor: {'
                + '                   name: nts.uk.resource.getText(\'CCG029_A1_3\'),'
                + '                   constraint: \'String_Any_40\','
                + '                   value: keySearch,'
                + '                   option: {width: \'258px\', placeholder: nts.uk.resource.getText(\'CCG029_A1_3\')}}" />'
                + '           </form>'
                + '       </div>'
                + '       <button tabindex="3" id="findBtn" class="inline" data-bind="click: search, text:nts.uk.resource.getText(\'CCG029_A1_4\'), enable: $root.errors.isEmpty"></button>'
                + '   </div>'
                + '   <div class="row">'
                + '       <button tabindex="5" id="searchTipsBtn" class="inline mr10" data-bind="text: nts.uk.resource.getText(\'CCG029_A1_5\')"></button>'
                + '       <button tabindex="6" id="" class="inline" data-bind="click: expandDipslay, text:nts.uk.resource.getText(\'CCG029_A1_21\')"></button>'
                + '   </div>'
                + '   <div class="searchTips-area" style="visibility: hidden;">'
                + '       <h2 data-bind="text:nts.uk.resource.getText(\'CCG029_A1_7\')"></h2>'
                + '       <br />'
                + '       <h2 data-bind="text:nts.uk.resource.getText(\'CCG029_A1_8\')"></h2>'
                + '       <h2 data-bind="visible:input.includePreEmployee, text: nts.uk.resource.getText(\'CCG029_A1_9\')"></h2>'
                + '       <h2 data-bind="visible:!input.includePreEmployee, text: nts.uk.resource.getText(\'CCG029_A1_10\')"></h2>'
                + '       <h2 data-bind="visible:input.includeRetirement, text: nts.uk.resource.getText(\'CCG029_A1_11\')"></h2>'
                + '       <h2 data-bind="visible:!input.includeRetirement, text: nts.uk.resource.getText(\'CCG029_A1_12\')"></h2>'
                + '       <h2 data-bind="visible:input.includeAbsence, text: nts.uk.resource.getText(\'CCG029_A1_13\')"></h2>'
                + '       <h2 data-bind="visible:!input.includeAbsence, text: nts.uk.resource.getText(\'CCG029_A1_14\')"></h2>'
                + '       <h2 data-bind="visible:input.includeClosed, text: nts.uk.resource.getText(\'CCG029_A1_15\')"></h2>'
                + '       <h2 data-bind="visible:!input.includeClosed, text: nts.uk.resource.getText(\'CCG029_A1_16\')"></h2>'
                + '       <h2 data-bind="visible:input.includeTransferEmployee, text: nts.uk.resource.getText(\'CCG029_A1_17\')"></h2>'
                + '       <h2 data-bind="visible:!input.includeTransferEmployee, text: nts.uk.resource.getText(\'CCG029_A1_18\')"></h2>'
                + '       <h2 data-bind="visible:input.includeAcceptanceTransferEmployee, text: nts.uk.resource.getText(\'CCG029_A1_19\')"></h2>'
                + '       <h2 data-bind="visible:!input.includeAcceptanceTransferEmployee, text: nts.uk.resource.getText(\'CCG029_A1_21\')"></h2>'
                + '   </div>'
                + '   <div class="row">'
                + '       <div id="gridListEmployeesContent">'
                + '           <table id="gridListEmployees" tabindex="7"></table>'
                + '       </div>'
                + '   </div>'
                + '</div>'
    });
    
    class Model {
        processingDate: KnockoutObservable<string>;
        keySearch: KnockoutObservable<string>;
        employeeList: [];
        isShowfull : KnockoutObservable<boolean>;
        input: Input;
        constructor(param, callback) {
            var self = this;
            //param
            self.input = new Input(param);
            //control 
            self.processingDate = ko.observable(moment(new Date()).format("YYYY/MM/DD"));
            self.keySearch = ko.observable("");
            self.employeeList = [];
            self.isShowfull = ko.observable(false);
            $(".searchTips-area").ntsPopup({
                position: {
                    my: "left top",
                    at: "left bottom",
                    of: "#searchTipsBtn"
                },
                showOnStart: false,
                dismissible: false
            });
            $("#searchTipsBtn").click(function() {
                $(".searchTips-area").ntsPopup("toggle");
            });
            $('#form').on('submit', function (e) {
                e.preventDefault();
                self.search();
            });
            //row click
            $(document).delegate("#gridListEmployees", "iggridcellclick", function (evt, ui) {
                var value = _.find(self.employeeList, ['employeeCode', ui.rowKey]);
//                console.log(value);
                if(callback){
                    callback(value);
                }
            });
            self.bindData();
        }
        public search(): void{
            var self = this;
            let param = self.input;
            param.keyword = self.keySearch();
            param.baseDate = moment(self.processingDate()).format("YYYY/MM/DD");
            self.findEmployee(param);
        }
        public findEmployee(param: any): void {
            var self = this;
            if(self.keySearch() == ''){
                nts.uk.ui.dialog.info({ messageId: "Msg_1571" });
                return;
            }
            block.grayout();
            nts.uk.request.ajax("com", "query/ccg029employee/find", param).done(function(data){
                if(data.length == 0){
                    nts.uk.ui.dialog.info({ messageId: "Msg_1572" });
                }
                self.employeeList = data;
                $("#gridListEmployees").igGrid("dataSourceObject", self.employeeList).igGrid("dataBind");
            }).fail((error) => {
                nts.uk.ui.dialog.info(error);
            }).always(() => {
                block.clear();
            });
        }
        public expandDipslay(): void {
            var self = this;
            if(self.isShowfull()){
                $("#gridListEmployees").igGridHiding("hideColumn", "businessNameKana");
                $("#gridListEmployees").igGridHiding("hideColumn", self.input.systemType == 1 ? "workplaceCode": "departmentCode");
                $( "#gridListEmployeesContent" ).removeClass( "showFullColumn" );
                self.isShowfull(false);
            }else{
                $("#gridListEmployees").igGridHiding("showColumn", "businessNameKana");
                $("#gridListEmployees").igGridHiding("showColumn", self.input.systemType == 1 ? "workplaceCode": "departmentCode");
                $( "#gridListEmployeesContent" ).addClass( "showFullColumn" );
                self.isShowfull(true);
            }
        }
        public bindData(): void {
            var self = this;
            $("#gridListEmployees").igGrid({
                autoGenerateColumns: false,
                primaryKey: 'employeeCode',
                columns: [
                    {   
                        headerText: 'employeeCode', key: 'employeeCode', hidden: true
                    },
                    {
                        headerText: getText('CCG029_A1_24'), key: 'employeeCode', dataType: 'string', width: '100px'
                    },
                    {
                        headerText: getText('CCG029_A1_25'), key: 'businessName', dataType: 'string', width: '100px'
                    },
                    {
                        headerText: getText('CCG029_A1_26'), key: 'businessNameKana', dataType: 'string',  width: '100px'
                    },
                    {
                        headerText: self.input.systemType == 1 ? getText('CCG029_1') : getText('CCG029_2'), key: self.input.systemType == 1 ? 'workplaceCode': 'departmentCode', dataType: 'string',  width: '100px' 
                    },
                    {
                        headerText: self.input.systemType == 1 ? getText('Com_Workplace') : getText('Com_Department'), key: self.input.systemType == 1 ? 'workplaceName': 'departmentName', dataType: 'string', width: '140px'
                    }
                ],
                dataSource: self.employeeList,
                dataSourceType: 'json',
                responseDataKey: 'results',
                height: document.getElementById("component-search-employee").clientHeight - 160,
                width: '100%',
                tabIndex: 7,
                features: [
                    {
                        name: "Selection",
                        mode: "row",
                        multipleSelection: false,
                    },
                    {
                        name: 'Filtering', 
                        type: 'local',
                        mode: 'simple'
                    },
                    {
                        name: 'Sorting', 
                        type: 'local'
                    },
                    {
                        name: 'Resizing' 
                    },
                    {
                        name: "Hiding",
                        columnSettings: [
                            { columnKey: "employeeCode", allowHiding: false},
                            { columnKey: "businessName", allowHiding: false},
                            { columnKey: "businessNameKana", allowHiding: false, hidden: self.isShowfull()? '' : true },
                            { columnKey: self.input.systemType == 1 ? "workplaceCode": "departmentCode", allowHiding: false, hidden: self.isShowfull()? '' : true },
                            { columnKey: self.input.systemType == 1 ? "workplaceName": "departmentName", allowHiding: false}
                        ]
                    },
                    {
                        name: "Tooltips"
                    }
                ]
            });
        }
    }
    class Input {
        systemType: number; //システム区分（0：共通、1：就業、2：給与、3：人事）
        includePreEmployee: boolean; //入社前社員を含める
        includeRetirement: boolean; //退職者を含める
        includeAbsence: boolean; //休職者を含める 
        includeClosed: boolean; //休業者を含める
        includeTransferEmployee: boolean; //出向社員を含める
        includeAcceptanceTransferEmployee: boolean; //受入出向社員を含める
        getPosition: boolean; //職位を取得する
        getEmployment: boolean; //雇用を取得する
        getPersonalFileManagement: boolean; //個人ファイル管理を取得する
        
        constructor(input: any) {
            this.systemType = input ? input.systemType || 1 : 1;
            this.includePreEmployee = input ? input.includePreEmployee ? input.includePreEmployee: true: true;
            this.includeRetirement = input ? input.includeRetirement ? input.includeRetirement: true: true;
            this.includeAbsence = input ? input.includeAbsence ? input.includeAbsence: true: true;
            this.includeClosed = input ? input.includeClosed ? input.includeClosed: true: true;
            this.includeTransferEmployee = input ? input.includeTransferEmployee? input.includeTransferEmployee: true: true;
            this.includeAcceptanceTransferEmployee = input ? input.includeAcceptanceTransferEmployee? input.includeAcceptanceTransferEmployee: true: true;
            this.getPosition = input ? input.getPosition || false: false;
            this.getEmployment = input ? input.getEmployment || false: false;
            this.getPersonalFileManagement = input ? input.getPersonalFileManagement || false: false;
        }
    }

}