module nts.uk.com.view.cmm018.k.viewmodel{
    import setShared = nts.uk.ui.windows.setShared;
    import getShared = nts.uk.ui.windows.getShared;
    import windows = nts.uk.ui.windows;
    import resource = nts.uk.resource;
    import vmbase = cmm018.shr.vmbase;
    import service = cmm018.k.service;
    import block = nts.uk.ui.block;
    import error = nts.uk.ui.dialog.alertError;
    import getText = nts.uk.resource.getText;
    export class ScreenModel{
        //==========
        lstJob: KnockoutObservableArray<any> = ko.observableArray([]);
        k2_1: KnockoutObservable<string> = ko.observable('');
        k2_2: KnockoutObservable<string> = ko.observable('');
        //承認形態
        formSetting: KnockoutObservableArray<ButtonSelect> = ko.observableArray([
                new ButtonSelect(1, resource.getText('CMM018_63')),//全員承認
                new ButtonSelect(2, resource.getText('CMM018_66'))//誰か一人
                ]);
        //CA NHAN
        columns: KnockoutObservableArray<any> = ko.observableArray([
                    { headerText: 'id', prop: 'id', width: '0px', hidden: true },
                    { headerText: resource.getText('CMM018_69'), prop: 'code', width: '120px' },
                    { headerText: resource.getText('CMM018_70'), prop: 'name', width: '150px' }
                ]);
        selectFormSet: KnockoutObservable<number> = ko.observable(1);
        //GROUP
        columns2: KnockoutObservableArray<any> = ko.observableArray([
                    { headerText: resource.getText('CMM018_69'), prop: 'code', width: '120px' },
                    { headerText: resource.getText('CMM018_70'), prop: 'name', width: '300px' }
                ]);
        selectFormSetG: KnockoutObservable<number> = ko.observable(1);
        lstJobG: KnockoutObservableArray<any> = ko.observableArray([]);
        lstGroup: KnockoutObservableArray<any> = ko.observableArray([]);
        lstGroup1: KnockoutObservableArray<any> = ko.observableArray([]);
        lstGroup2: KnockoutObservableArray<any> = ko.observableArray([]);
        selectG: KnockoutObservable<string> = ko.observable("");
        selectG1: KnockoutObservable<string> = ko.observable("");
        selectG2: KnockoutObservable<string> = ko.observable("");
        //CHI DINH
        columns3: KnockoutObservableArray<any> = ko.observableArray([
                    { headerText: resource.getText('CMM018_69'), prop: 'code', width: '120px' },
                    { headerText: resource.getText('CMM018_70'), prop: 'name', width: '170px' }
                ]);
        selectFormSetS: KnockoutObservable<number> = ko.observable(1);
        lstJobGS: KnockoutObservableArray<any> = ko.observableArray([]);
        lstSpec1: KnockoutObservableArray<any> = ko.observableArray([]);
        lstSpec2: KnockoutObservableArray<any> = ko.observableArray([]);
        selectSpec1: KnockoutObservable<string> = ko.observable("");
        selectSpec2: KnockoutObservable<string> = ko.observable("");
        systemAtr: number = 0;
        //==========
        
        
        //enable list workplace
        enableListWp: KnockoutObservable<boolean> = ko.observable(true);
        appType: KnockoutObservable<String> = ko.observable('');
        standardDate: KnockoutObservable<Date> = ko.observable(moment(new Date()).toDate());
        //承認者指定種類
        typeSetting: KnockoutObservableArray<ButtonSelect> = ko.observableArray([]);
        selectTypeSet: KnockoutObservable<number> = ko.observable(null);

        
        employeeList: KnockoutObservableArray<vmbase.ApproverDtoK> = ko.observableArray([]);
       
        approverList : KnockoutObservableArray<vmbase.ApproverDtoK> = ko.observableArray([]);
        currentApproveCodeLst: KnockoutObservableArray<any> = ko.observableArray([]);
        currentEmployeeCodeLst: KnockoutObservableArray<any> = ko.observableArray([]);
        items: KnockoutObservableArray<any> = ko.observableArray([]);
        //確定者の選択
        itemListCbb:KnockoutObservableArray<any> = ko.observableArray([]);
        cbbEnable: KnockoutObservable<boolean> = ko.observable(false);
        selectedCbbCode : KnockoutObservable<string> = ko.observable("");
        //↓ & ↑
        currentCodeListSwap: KnockoutObservableArray<any> = ko.observableArray([]);
        //→ & ←
        itemsSwapLR:  KnockoutObservableArray<any> = ko.observableArray([]);
        currentCodeListSwapLR:  KnockoutObservableArray<any> = ko.observableArray([]);
        confirm: string = '';
        //職場リスト
        treeGrid: ITreeGrid = null;
        //選択可能な職位一覧
        //承認者の登録(個人別)
        personTab : number = 2;
        //設定種類
        personSetting: number = 0; //個人設定
        
        lstTmp: KnockoutObservableArray<any> = ko.observableArray([]);
        constructor(){
            let self = this;
            self.itemListCbb.push(new vmbase.ApproverDtoK('','','指定しない',0,0));
            //設定対象: get param from main: approverInfor(id & approvalAtr)
            let data: any = nts.uk.ui.windows.getShared('CMM018K_PARAM');
            self.systemAtr = data.systemAtr || 0;
            self.treeGrid = {
                treeType: 1,
                selectType: data.typeSetting == 2 ? 1 : 3, 
                isDialog: true,
                isMultiSelect: false,
                isShowAlreadySet: false,
                isShowSelectButton: true,
                baseDate: ko.observable(this.standardDate()),
                selectedId: data.typeSetting == 2 ? ko.observableArray([data.specWkpId]) : ko.observableArray([]),
                alreadySettingList: ko.observableArray([]),
                systemType : self.systemAtr == 1 ? 4 : 2,
                width: 310,
                startMode: data.systemAtr
            };
            //確定者(K2_21)の選択肢を承認者一覧(K2_15)と合わせる(update item cua control 確定者(K2_21)  theo 承認者一覧(K2_15))
            self.approverList.subscribe(function(){
                self.setDataForCbb();
            });
            self.getData();
            //Subscribe PERSON - CHI DINH - GROUP
            self.selectTypeSet.subscribe(function(newValue){
                if(self.checkEmpty(newValue)) return;
                self.bindData(newValue);
                
                ko.tasks.schedule(() => { 
//                    console.log($('div#prev-next-button').is(':visible')); 
                    if (newValue !=1) return;
                    let msie = window.navigator.userAgent.indexOf("MSIE ");

                    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // If Internet Explorer
                    {
                       
                    }
                    else  // If another browser, return 0
                    {
                        $('div#prev-next-button').css('margin-left','20px');
                        $('div#prev-next-button').css('position','');
                        $('div#selected-approver').css('margin-left','25px')

                    }
                   
                });
            });
            let specLabel = self.systemAtr == 0 ? resource.getText('CMM018_100') : resource.getText('CMM018_101'); 
            //承認者指定種類
            //０：会社、１：職場、２：個人
            if(data.tab == 2){
                self.typeSetting([new ButtonSelect(0, resource.getText('CMM018_56'))]);
            }else{
                self.typeSetting([new ButtonSelect(1, resource.getText('CMM018_57')),
                                new ButtonSelect(2, specLabel),
                                new ButtonSelect(0, resource.getText('CMM018_56'))]);
            }
            
            self.selectTypeSet(data.typeSetting);
            self.confirm = data.confirmedPerson;
            //change 承認形態
            self.selectFormSet.subscribe(function(newValues){
                //承認形態が誰か一人を選択する場合
                if(newValues === vmbase.ApprovalForm.SINGLE_APPROVED){
                    self.cbbEnable(true);
                }else{
                    //承認形態が全員承認を選択する場合
                    self.cbbEnable(false);    
                }
            });

            if(data !== undefined){
                //設定する対象申請名
                self.appType(data.appTypeName);
                //承認形態
                if(data.typeSetting == TypeSet.PERSON){
                    if(data.formSetting == 2){
                       self.selectedCbbCode(data.confirmedPerson);
                       self.setDataForCbb();
                    }
                    self.selectFormSet(data.formSetting);
                }else if(data.typeSetting == TypeSet.GROUP){
                    self.selectFormSetG(data.formSetting);
                }else{
                    self.selectFormSetS(data.formSetting);
                }
                
                //承認者の登録(個人別): 非表示
                if(data.tab === self.personTab){
                    $('#typeSetting').hide();
                }else{
                    $('#typeSetting').show();
                }
            }
            //基準日
            this.standardDate(moment(new Date()).toDate());
            
            //職場リスト            
            self.treeGrid.selectedId.subscribe(function(newValues){
                if(self.checkEmpty(newValues)) return;
                if(self.selectTypeSet() == TypeSet.PERSON){
                    block.invisible();
                    self.getDataWpl().done(function(lstA){
                        block.clear();
                        lstA = _.orderBy(lstA, ['code'],['asc']); // Use Lodash to sort array by 'code'
                        self.employeeList(lstA);
                    }).fail(()=>{
                        block.clear();
                    });
                }
            })
            
            // fix break layout on IE
//            window.onresize = function(event) {
//            	if ((navigator.userAgent.match(/msie/i) != null || navigator.userAgent.match(/trident/i) != null) && $("#prev-next-button").width() < 75) {
//            		$("#selected-approver").css("margin-left", 100 - $("#prev-next-button").width() + "px");
//            	}
//            }
            
        }// end constructor
        
        checkEmpty(value: any){
            if(nts.uk.util.isNullOrUndefined(value) || nts.uk.util.isNullOrEmpty(value)) return true;
            return false;
        }
        setDataForCbb(){
            var self = this;
            //add item in  dropdownlist
            self.itemListCbb.removeAll();
            self.itemListCbb.push(new vmbase.ApproverDtoK('','','指定しない',0,0));
            if(self.approverList().length > 0){
                _.forEach(self.approverList(),function(item: vmbase.ApproverDtoK){
                    self.itemListCbb.push(item);    
                })
                self.selectedCbbCode(self.confirm); 
            }
        }
        getData(){
            let self = this;
            let data: any = nts.uk.ui.windows.getShared('CMM018K_PARAM');
            if(data.approverInfor.length <= 0) return;
            if(data.typeSetting == TypeSet.PERSON){
                _.forEach(data.approverInfor, function(item){
                    self.approverList.push({id: item.id, code: item.code, name: item.name, dispOrder: item.dispOrder});
                });
                self.approverList(_.orderBy(self.approverList(),["dispOrder"], ["asc"]));
            }else if(data.typeSetting == TypeSet.GROUP){
                _.each(data.approverInfor, function(appr){
                    if(appr.dispOrder == 1){
                        self.lstGroup1.push({code: appr.code, name: appr.name, dispOrder: appr.dispOrder});
                    }else{
                        self.lstGroup2.push({code: appr.code, name: appr.name, dispOrder: appr.dispOrder});
                    }    
                });
                self.lstGroup2(_.orderBy(self.lstGroup2(),["dispOrder"], ["asc"]));
            }else{//CHI DINH
                _.each(data.approverInfor, function(appr){
                    self.lstSpec2.push({code: appr.code, name: appr.name, dispOrder: appr.dispOrder});
                });
                self.lstSpec2(_.orderBy(self.lstSpec2(),["dispOrder"], ["asc"]));
                if(data.approverInfor.length > 0 ){
                    self.treeGrid.selectedId(data.specWkpId);
                }
            } 
        }
        
        //bind data
        bindData(selectTypeSet: number){
            var self = this;
            if(selectTypeSet == TypeSet.PERSON){//PERSON
                self.k2_1(getText('CMM018_61'));
                self.k2_2(getText('CMM018_62'));
                self.enableListWp(true);
                $('#tree-grid').ntsTreeComponent(self.treeGrid);
            }else if(selectTypeSet == TypeSet.SPEC_WKP){//CHI DINH
                self.k2_1(getText('CMM018_110'));
                self.k2_2(getText('CMM018_111'));
                self.enableListWp(true);
                $('#tree-grid').ntsTreeComponent(self.treeGrid);
                if(self.lstJobGS().length > 0) return; //データがある 
                if(self.lstJob().length > 0){
                    let lst = _.clone(self.lstJob());
                    self.lstJobGS(lst);
                    _.each(lst, function(i){
                        if(self.checkExLstR(self.lstSpec2(), i) === undefined){
                            self.lstSpec1.push(i);
                        }
                    });
                }else{
                    block.invisible();
                    service.jobGroup().done(function(data: any){
                        let lst = _.clone(data);
                        self.lstJob(lst);
                        self.lstJobGS(lst);
                         _.each(lst, function(i){
                            if(self.checkExLstR(self.lstSpec2(), i) === undefined){
                                self.lstSpec1.push(i);
                            }
                        });
                        block.clear(); 
                    }).fail(function(res: any){
                        block.clear();
                    });
                }
                
            }else{//GROUP
                self.k2_1(getText('CMM018_110'));
                self.k2_2(getText('CMM018_111'));
                self.enableListWp(false);       
                if(self.lstJobG().length > 0) return;//データがある     
                if(self.lstJob().length > 0){
                    let lst = _.clone(self.lstJob());
                    self.lstJobG(lst);
                    _.each(lst, function(i){
                        if((self.checkExLstR(self.lstGroup1(), i) === undefined) && (self.checkExLstR(self.lstGroup2(), i) === undefined)){
                            self.lstGroup.push(i);
                        }
                    });
                }else{
                    block.invisible();
                    service.jobGroup().done(function(data: any){
                        let lst = _.clone(data);
                        self.lstJob(lst);
                        self.lstJobG(lst);
                        _.each(lst, function(i){
                            if((self.checkExLstR(self.lstGroup1(), i) === undefined) && (self.checkExLstR(self.lstGroup2(), i) === undefined)){
                                self.lstGroup.push(i);
                            }
                        });
                        block.clear(); 
                    }).fail(function(res: any){
                        block.clear();
                    });
                }
            }
        }
        checkExLstR(lst, i){
            return _.find(lst, function(a){
               return a.code == i.code; 
            });
        } 
        getDataWpl(): JQueryPromise<any>{
            let self = this;
            let dfd = $.Deferred();
            var employeeSearch = new service.model.EmployeeSearchInDto();
            employeeSearch.baseDate = self.standardDate();
            employeeSearch.sysAtr = self.systemAtr;
            let lstWkp1 = [self.treeGrid.selectedId()];
            let lstA = [];
            let UNIT = 100;
            for(let i = 0; i < lstWkp1.length; i += UNIT){
                if(i + UNIT > lstWkp1.length){
                    employeeSearch.workplaceIds = lstWkp1.slice(i, lstWkp1.length);
                }else{
                    employeeSearch.workplaceIds = lstWkp1.slice(i, i + UNIT);
                }
                service.searchModeEmployee(employeeSearch).done(function(data: any){
                    let lstTmp = self.toUnitModelList(data);
                    _.each(lstTmp, function(item){
                        lstA.push(new vmbase.ApproverDtoK(item.id, item.code, item.name, item.approvalAtr,0))
                    });
                    
                    if(i + UNIT > lstWkp1.length) {
                        dfd.resolve(lstA);
                    }
                    
                })
            }
            if(lstWkp1.length == 0){
                dfd.resolve(lstA);
            }
            return dfd.promise();
        }
        //決定 button click
        submitClickButton(){
            let self = this;
            let lstApprover = [];
            let approvalForm = 1;
            let confirmSet = '';
            let specWkpId = null;
            //決定情報をチェック
            if(self.selectTypeSet() == TypeSet.PERSON){//PERSON
                _.each(self.approverList(), function(appr, index){
                    lstApprover.push({id: appr.id, code: appr.code, name: appr.name, dispOrder: index + 1});
                });
                approvalForm = self.selectFormSet();
                confirmSet = self.selectedCbbCode();
            }else if(self.selectTypeSet() == TypeSet.SPEC_WKP){//CHI DINH
                if(self.checkEmpty(self.treeGrid.selectedId())) {
                    if(self.systemAtr == 0){
                        error({messageId: 'Msg_1582', messageParams:[getText('Com_Workplace')]});
                    }else{
                        error({messageId: 'Msg_1582', messageParams:[getText('Com_Department')]});
                    }
                    return;
                }
                _.each(self.lstSpec2(), function(item, index){
                    lstApprover.push({code: item.code, name: item.name, dispOrder: index + 1});
                });
                approvalForm = self.selectFormSetS();
                specWkpId = self.treeGrid.selectedId() || '';
            }else{//GROUP
                if(self.lstGroup2().length > 0 && self.lstGroup1().length == 0){
                    error({messageId: 'Msg_1606', messageParams:[getText('CMM018_102')]});
                    return;
                }
                if(self.lstGroup1().length > 0){
                    let jG1 = self.lstGroup1()[0];
                    lstApprover.push({code: jG1.code, name: jG1.name, dispOrder: 1});
                }
                _.each(self.lstGroup2(), function(job, index){
                    lstApprover.push({code: job.code, name: job.name, dispOrder: index + 2});
                });
                approvalForm = self.selectFormSetG();
            }
            let data: vmbase.KData = {  appType: self.appType(), //設定する対象申請名 
                                        formSetting: approvalForm,//承認形態
                                        approverInfor: lstApprover,//承認者一覧
                                        confirmedPerson: confirmSet, //確定者
                                        selectTypeSet: self.selectTypeSet(),//承認者指定種類 ( 個人,  職格, 特定職場)
                                        approvalFormName: approvalForm == vmbase.ApprovalForm.EVERYONE_APPROVED ? 
                                                        resource.getText('CMM018_63') : resource.getText('CMM018_66'),
                                        specWkpId: specWkpId
                                        }
            console.log(data);
            setShared("CMM018K_DATA",data );
            nts.uk.ui.windows.close();
        }
        
        //キャンセル button click
        closeDialog(){
             setShared("CMM018K_DATA",null);
            nts.uk.ui.windows.close();
        }       

        /**
         * function convert dto to model init data 
         */        
        public toUnitModelList(dataList: service.model.EmployeeSearchDto[]): Array<vmbase.ApproverDtoK> {
            var dataRes: vmbase.ApproverDtoK[] = [];

            for (var item: service.model.EmployeeSearchDto of dataList) {
                let a:vmbase.ApproverDtoK = {
                    id: item.sid,
                    code: item.scd,
                    name: item.pname,
                    approvalAtr: 0
                }
                dataRes.push(a);
            }
            return dataRes;
        }
        //when click button → 
        nextItem(){
            let self = this;
            if(self.selectTypeSet() == TypeSet.SPEC_WKP){//CHI DINH
                if(self.checkEmpty(self.selectSpec1())) return;
                let itemSl = self.findJobGSelect(self.lstSpec1(), self.selectSpec1());
                _.remove(self.lstSpec1(), function(item) {
                    return item.code == self.selectSpec1();
                });
                if(self.lstSpec2().length >= 1){
                    nts.uk.ui.dialog.info({ messageId: 'Msg_1588', messageParams: [1] });
                    let itemOld = self.lstSpec2()[0];
                    self.lstSpec1().push(itemOld);
                }
                
                self.lstSpec2([]);
                self.lstSpec2.push(itemSl);
                
                self.selectSpec1('');
            }else{//GROUP
                if(self.checkEmpty(self.selectG())) return;
                if(self.lstGroup1().length + self.lstGroup2().length >= 5){
                    error({ messageId: 'Msg_1588', messageParams: [5] });
                    return;
                }
                let itemSl = self.findJobGSelect(self.lstGroup(), self.selectG());
                _.remove(self.lstGroup(), function(item) {
                      return item.code == self.selectG();
                });
                if(self.lstGroup1().length == 0){
                    self.lstGroup1.push(itemSl);
                }else{
                    self.lstGroup2.push(itemSl);
                }
                self.selectG('');
            }
        }
        //when click button ←
        prevItem(){
            let self = this;
            if(self.selectTypeSet() == TypeSet.SPEC_WKP){//CHI DINH
                if(self.checkEmpty(self.selectSpec2())) return;
                let itemSl = self.findJobGSelect(self.lstSpec2(), self.selectSpec2());
                _.remove(self.lstSpec2(), function(item) {
                      return item.code == self.selectSpec2();
                    });
                self.lstSpec1.push(itemSl);
                self.selectSpec2('');
            }else{//GROUP
                if(self.checkEmpty(self.selectG1())) return;
                let itemSl = self.findJobGSelect(self.lstGroup1(), self.selectG1());
                if(itemSl !== undefined){//List G1
                    _.remove(self.lstGroup1(), function(item) {
                      return item.code == self.selectG1();
                    });
                }else{//List G2
                    itemSl = self.findJobGSelect(self.lstGroup2(), self.selectG1());
                    _.remove(self.lstGroup2(), function(item) {
                      return item.code == self.selectG1();
                    });
                }
                self.lstGroup.push(itemSl);
                self.selectG1('');
            }
        }
        //find jobG selected
        findJobGSelect(lstItem: Array<any>, selected: string){
            return _.find(lstItem, function(jobG){
               return jobG.code == selected; 
            });
        }

    }//end ScreenModel
    interface ITreeGrid {
            treeType: number;
            selectType: number;
            isDialog: boolean;
            isMultiSelect: boolean;
            isShowAlreadySet: boolean;
            isShowSelectButton: boolean;
            baseDate: KnockoutObservable<any>;
            selectedId: KnockoutObservable<any>;
            alreadySettingList: KnockoutObservableArray<any>;
            systemType : number;
            width?: number;
            startMode: number;
        }
    class SimpleObject {
            key: KnockoutObservable<string>;
            name: KnockoutObservable<string>;
            constructor(key: string, name: string){
                this.key = ko.observable(key);
                this.name = ko.observable(name);
            }      
        }
    export class ButtonSelect{
        code: number;
        name: String;
        constructor(code: number, name: String){
            this.code = code;
            this.name = name;    
        }
    }
    enum TypeSet {
        /** 個人*/
        PERSON = 0,
        /** 職格*/
        GROUP = 1,
        /** 特定職場*/
        SPEC_WKP =2
    }
}