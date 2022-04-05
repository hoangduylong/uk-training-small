module nts.uk.com.view.cmm018.a.sub {
    import getText = nts.uk.resource.getText;
    import servicebase = cmm018.shr.servicebase;
    import vmbase = cmm018.shr.vmbase;
    import getShared = nts.uk.ui.windows.getShared;
    import setShared = nts.uk.ui.windows.setShared;
    import modal = nts.uk.ui.windows.sub.modal;
    import block = nts.uk.ui.block;
    import dialog = nts.uk.ui.dialog;
    /**
     * =============mode B: 申請個別登録モード===========
     * -------------viewmodelSubB---------------
     * 申請個別登録モード
     * Screen B,D,F
     */
    export module viewmodelSubB{
        export class ScreenModel {
            //-----SCREEN B
            //===================
            //===================
            selectedCode: KnockoutObservableArray<any> = ko.observableArray([]);
            singleSelectedCode: KnockoutObservable<any> = ko.observable('');
            lstNameAppType: KnockoutObservableArray<vmbase.ApplicationType> = ko.observableArray([]);
            dataSourceB: KnockoutObservable<vmbase.CommonApprovalRootDto> = ko.observable(null);
            dataDisplay: KnockoutObservableArray<vmbase.DataTreeB> = ko.observableArray([]);
            //param transfer to dialog K
            approverInfor : KnockoutObservableArray<any> = ko.observableArray([]);
            confirmedPerson : KnockoutObservable<number> = ko.observable(null);
            selectTypeSet : KnockoutObservable<number> = ko.observable(0);
            //---display screen B
            cpA: KnockoutObservableArray<vmbase.CompanyAppRootADto> = ko.observableArray([]);
            historyStr: KnockoutObservable<string> = ko.observable('');
            nameCompany: KnockoutObservable<string> = ko.observable('');
            columns: KnockoutObservableArray<any> = ko.observableArray([{ headerText: "Item Code", width: "250px", key: 'approvalId', dataType: "number", hidden: true },
                                                    { headerText: "Item Text", key: 'nameAppType', width: "200px", dataType: "string" }]);
            //--------data right: company
            comRoot: KnockoutObservable<vmbase.CompanyAppRootADto> = ko.observable(null);
            //__________Sidebar________
            tabSelectedB: KnockoutObservable<number> = ko.observable(0);
            lstCompany: KnockoutObservableArray<vmbase.CompanyAppRootDto> = ko.observableArray([]);
            lstWorkplace: KnockoutObservableArray<vmbase.WorkPlaceAppRootDto> = ko.observableArray([]);
            lstPerson: KnockoutObservableArray<vmbase.PersonAppRootDto> = ko.observableArray([]);
            //__________KCP009: 申請個別登録モード_____
            employeeId: KnockoutObservable<string> = ko.observable('');
            //_____________dialog I____
            dataIB: KnockoutObservable<vmbase.IData> = ko.observable(null);
            //_______CDL008_____
            workplaceIdB: KnockoutObservable<string> = ko.observable('');
            ENDDATE_LATEST:string = '9999/12/31';
            //_____button Edit History___
            enableDeleteB: KnockoutObservable<boolean> = ko.observable(false);
            enableCreatNewB: KnockoutObservable<boolean> = ko.observable(true);
            constructor(){
                let self = this;
                //----SCREEN B
                //_____subcribe singleSelectedCode________
                self.singleSelectedCode.subscribe(function(codeChanged) {//approvalId
                    if(codeChanged == '-1' || codeChanged == '' ){
                        return;
                    }
                    //TH: company
                    if(self.tabSelectedB()==0){
                        self.enableCreatNewB(true);
                        if(self.dataIB() != null){
                            self.getDataCompanyPr();
                        }
                        let com = self.findRootComB(codeChanged);
                        //TH: item data
                        if(com != null && com !== undefined){
                            self.historyStr(com.company.startDate + '～' + com.company.endDate);
                            let name = self.findNameApp(com.company.employmentRootAtr == 2 ? com.company.confirmationRootType : com.company.applicationType, com.company.employmentRootAtr);
                            let appPhase = __viewContext.viewModel.viewmodelA.checklist(com.lstAppPhase);
                            let color: boolean = com.lstAppPhase.length > 0 ? true : false;
                            let aaa = new vmbase.CompanyAppRootADto(color, com.company.employmentRootAtr, 
                                    com.company.employmentRootAtr == 2 ? com.company.confirmationRootType : com.company.applicationType,
                                    name, com.company.approvalId, com.company.historyId, com.company.branchId,
                                    appPhase[0], appPhase[1], appPhase[2], appPhase[3], appPhase[4]);
                            self.comRoot(aaa);
                            self.enableDeleteB(true);
                        }
                        //TH: 1,2,appName
                        else{
                            self.showItem(codeChanged);
                            self.enableDeleteB(false);
                        }
                    }
                    //TH: work place
                    else if(self.tabSelectedB()==1){
                        self.enableCreatNewB(true);
                        if(self.dataIB() != null){
                            self.getDataWorkplacePr();
                        }
                        let wp = self.findRootWpD(codeChanged);
                        if(wp != null && wp !== undefined){
                            self.historyStr(wp.workplace.startDate + '～' + wp.workplace.endDate);
                            let name = self.findNameApp(wp.workplace.employmentRootAtr == 2 ? wp.workplace.confirmationRootType : wp.workplace.applicationType, wp.workplace.employmentRootAtr);
                            let appPhase = __viewContext.viewModel.viewmodelA.checklist(wp.lstAppPhase);
                            let color: boolean = wp.lstAppPhase.length > 0 ? true : false;
                            let aaa = new vmbase.CompanyAppRootADto(color, wp.workplace.employmentRootAtr,
                                wp.workplace.employmentRootAtr == 2 ? wp.workplace.confirmationRootType : wp.workplace.applicationType,
                                name, wp.workplace.approvalId, wp.workplace.historyId, wp.workplace.branchId,
                                appPhase[0], appPhase[1], appPhase[2], appPhase[3], appPhase[4]);
                            self.comRoot(aaa);
                            self.enableDeleteB(true);
                        }
                        //TH: 1,2,appName
                        else{
                            self.showItem(codeChanged);
                            self.enableDeleteB(false);
                        }
                    }
                        
                    //TH: person
                    else{
                        self.enableCreatNewB(true);
                        if(self.dataIB() != null){
                            self.getDataPersonPr();
                        }
                        let ps = self.findRootPsF(codeChanged);
                        if(ps != null && ps !== undefined){
                            self.historyStr(ps.person.startDate + '～' + ps.person.endDate);
                            let name = self.findNameApp(ps.person.employmentRootAtr == 2 ? ps.person.confirmationRootType : ps.person.applicationType, ps.person.employmentRootAtr);
                            let appPhase = __viewContext.viewModel.viewmodelA.checklist(ps.lstAppPhase);
                            let color: boolean = ps.lstAppPhase.length > 0 ? true : false;
                            let aaa = new vmbase.CompanyAppRootADto(color, ps.person.employmentRootAtr,
                                    ps.person.employmentRootAtr == 2 ? ps.person.confirmationRootType : ps.person.applicationType,
                                    name, ps.person.approvalId, ps.person.historyId, ps.person.branchId,
                                    appPhase[0], appPhase[1], appPhase[2], appPhase[3], appPhase[4]);
                            self.comRoot(aaa);
                            self.enableDeleteB(true);
                        }
                        //TH: 1,2,appName
                        else{
                            self.showItem(codeChanged);
                            self.enableDeleteB(false);
                        }
                    }
                    self.comRoot.valueHasMutated();
                    __viewContext.viewModel.viewmodelSubA.reloadGridN([self.comRoot()], self.tabSelectedB(), vmbase.MODE.SHINSEI);
                    vmbase.ProcessHandler.resizeColumn([self.comRoot()], self.tabSelectedB(), vmbase.MODE.SHINSEI);
                });
            }
            /**
             * get data company mode 申請個別
             */
            getDataCompanyPr(): JQueryPromise<any>{
                let self = this;
                block.invisible();
                let dfd = $.Deferred();
                let param: vmbase.ParamDto = {
                        /**システム区分*/
                        systemAtr: vmbase.SystemAtr.WORK,
                        /**就業ルート区分: 会社(0)　－　職場(1)　－　社員(2)*/
                        rootType: vmbase.RootType.COMPANY,
                        /**履歴ID*/
                        workplaceId: '',
                        /**社員ID*/
                        employeeId: '',
                        /**申請種類*/
                        lstAppType:[0,1,2,3,4,6,7,8,9,10,11,12,13,14],
                        /**届出種類ID*/
                        lstNoticeID: [],
                        /**プログラムID(インベント)*/
                        lstEventID: []};
                servicebase.getAllDataPr(param).done(function(data: vmbase.CommonApprovalRootDto) {    
                    let lstRoot: Array<vmbase.DataCheckModeB> = [];
                    if(data == null || data === undefined || data.lstCompanyRoot.length == 0){
                        self.singleSelectedCode('');
                        self.historyStr('');
                        self.dataSourceB();
                        self.cpA([]);
                        self.lstCompany([]);
                        self.singleSelectedCode(null);
                        self.dataDisplay(self.convert(lstRoot));
                        __viewContext.viewModel.viewmodelA.enableRegister(false);
                         __viewContext.viewModel.viewmodelSubA.reloadGridN([self.comRoot()], self.tabSelectedB(), vmbase.MODE.SHINSEI);
                        vmbase.ProcessHandler.resizeColumn([self.comRoot()], self.tabSelectedB(), vmbase.MODE.SHINSEI);
                        block.clear();
                        dfd.resolve();
                        return dfd.promise();
                    }
                     __viewContext.viewModel.viewmodelA.enableRegister(true);
                    self.dataSourceB(data);
                    self.lstCompany(data.lstCompanyRoot);
                    //list left
                    _.each(self.lstCompany(), function(item){
                        lstRoot.push(new vmbase.DataCheckModeB(item.company.approvalId, item.company.startDate,
                            item.company.endDate, item.company.applicationType, item.company.confirmationRootType, item.company.employmentRootAtr));
                    });
                    self.dataDisplay(self.convert(lstRoot));
                   let a:any = null;
                   if(self.dataIB()==null){
                       a = self.findRootComB(self.singleSelectedCode());
                   }else{
                       a = self.findHistByType(self.dataIB().lstAppType[0].value,self.dataIB().lstAppType[0].employRootAtr, self.dataIB().startDate, self.tabSelectedB());
                   }
                   if(a != undefined){
                       self.singleSelectedCode(a.company.approvalId);
                   }
                    __viewContext.viewModel.viewmodelSubA.reloadGridN([self.comRoot()], self.tabSelectedB(), vmbase.MODE.SHINSEI);
                    vmbase.ProcessHandler.resizeColumn([self.comRoot()], self.tabSelectedB(), vmbase.MODE.SHINSEI);
                    self.dataIB(null);
                    block.clear();
                    dfd.resolve();
                });
                return dfd.promise();
            }
            /**
             * get data work place mode 申請個別
             */
            getDataWorkplacePr(): JQueryPromise<any>{
                let self = this;
                block.invisible();
                let dfd = $.Deferred();
                let param: vmbase.ParamDto = {
                        /**システム区分*/
                        systemAtr: vmbase.SystemAtr.WORK,
                        /**就業ルート区分: 会社(0)　－　職場(1)　－　社員(2)*/
                        rootType: vmbase.RootType.WORKPLACE,
                        /**履歴ID*/
                        workplaceId: self.workplaceIdB(),
                        /**社員ID*/
                        employeeId: '',
                        /**申請種類*/
                        lstAppType:[0,1,2,3,4,6,7,8,9,10,11,12,13,14],
                        /**届出種類ID*/
                        lstNoticeID: [],
                        /**プログラムID(インベント)*/
                        lstEventID: []};
                servicebase.getAllDataPr(param).done(function(data: vmbase.CommonApprovalRootDto) {    
                    self.workplaceIdB(data.workplaceId);
                    __viewContext.viewModel.viewmodelA.workplaceId(data.workplaceId);
                    servicebase.getWkpDepInfo({id: data.workplaceId, sysAtr: 0}).done(function(wpInfo){
                        __viewContext.viewModel.viewmodelA.wpCode(wpInfo.code);
                        __viewContext.viewModel.viewmodelA.wpName(wpInfo.name);
                    });
                    let lstRoot: Array<vmbase.DataCheckModeB> = [];
                    if(data == null || data === undefined || data.lstWorkplaceRoot.length == 0){
                        self.singleSelectedCode('');
                        self.historyStr('');
                        self.dataSourceB();
                        self.cpA([]);
//                        self.singleSelectedCode(null);
                        self.lstWorkplace([]);
                        self.dataDisplay(self.convert(lstRoot));
                        __viewContext.viewModel.viewmodelA.enableRegister(false);
                        __viewContext.viewModel.viewmodelSubA.reloadGridN([self.comRoot()], self.tabSelectedB(), vmbase.MODE.SHINSEI);
                        vmbase.ProcessHandler.resizeColumn([self.comRoot()], self.tabSelectedB(), vmbase.MODE.SHINSEI);
                        block.clear();
                        dfd.resolve();
                        return dfd.promise();
                    }
                    __viewContext.viewModel.viewmodelA.enableRegister(true);
                    self.dataSourceB(data);
                    self.lstWorkplace(data.lstWorkplaceRoot);
                    //list left
                    _.each(self.lstWorkplace(), function(item){
                        lstRoot.push(new vmbase.DataCheckModeB(item.workplace.approvalId, item.workplace.startDate,
                            item.workplace.endDate, item.workplace.applicationType, item.workplace.confirmationRootType, item.workplace.employmentRootAtr));
                    });
                    //list right
                     let com = self.findRootWpD(self.singleSelectedCode());
                    self.dataDisplay(self.convert(lstRoot));
                   let a:any = null;
                   if(self.dataIB()==null){
                       a = self.findRootWpD(self.singleSelectedCode());
                   }else{
                       a = self.findHistByType(self.dataIB().lstAppType[0].value,self.dataIB().lstAppType[0].employRootAtr, self.dataIB().startDate, self.tabSelectedB());
                   }
                    if(a != undefined){
                        self.singleSelectedCode(a.workplace.approvalId);
                    }
                    __viewContext.viewModel.viewmodelSubA.reloadGridN([self.comRoot()], self.tabSelectedB(), vmbase.MODE.SHINSEI);
                    vmbase.ProcessHandler.resizeColumn([self.comRoot()], self.tabSelectedB(), vmbase.MODE.SHINSEI);
                    self.dataIB(null);
                    block.clear();
                    dfd.resolve();
                }).fail(()=>{
                    block.clear();    
                });
                return dfd.promise();
            }
            /**
             * get data person mode 申請個別
             */
            getDataPersonPr(): JQueryPromise<any>{
                let self = this;
                block.invisible();
                let dfd = $.Deferred();
                let param: vmbase.ParamDto = {
                        /**システム区分*/
                        systemAtr: vmbase.SystemAtr.WORK,
                        /**就業ルート区分: 会社(0)　－　職場(1)　－　社員(2)*/
                        rootType: vmbase.RootType.PERSON,
                        /**履歴ID*/
                        workplaceId: '',
                        /**社員ID*/
                        employeeId: self.employeeId(),
                        /**申請種類*/
                        lstAppType:[0,1,2,3,4,6,7,8,9,10,11,12,13,14],
                        /**届出種類ID*/
                        lstNoticeID: [],
                        /**プログラムID(インベント)*/
                        lstEventID: []};
                servicebase.getAllDataPr(param).done(function(data: vmbase.CommonApprovalRootDto) {    
                    let lstRoot: Array<vmbase.DataCheckModeB> = [];
                    self.employeeId(data.employeeId);
                    if(data == null || data === undefined || data.lstPersonRoot.length == 0){
                        self.singleSelectedCode('');
                        self.historyStr('');
                        self.dataSourceB();
                        self.cpA([]);
                        self.lstPerson([]);
                        self.dataDisplay(self.convert(lstRoot));
                        __viewContext.viewModel.viewmodelA.enableRegister(false);
                        __viewContext.viewModel.viewmodelSubA.reloadGridN([self.comRoot()], self.tabSelectedB(), vmbase.MODE.SHINSEI);
                        vmbase.ProcessHandler.resizeColumn([self.comRoot()], self.tabSelectedB(), vmbase.MODE.SHINSEI);
                        block.clear();
                        dfd.resolve();
                        return dfd.promise();
                    }
                    __viewContext.viewModel.viewmodelA.enableRegister(true);
                    self.dataSourceB(data);
                    self.lstPerson(data.lstPersonRoot);
                    //list left
                    _.each(self.lstPerson(), function(item){
                        lstRoot.push(new vmbase.DataCheckModeB(item.person.approvalId, item.person.startDate,
                            item.person.endDate, item.person.applicationType, item.person.confirmationRootType, item.person.employmentRootAtr));
                    });
                    //list right
                    let com = self.findRootWpD(self.singleSelectedCode());
                    self.dataDisplay(self.convert(lstRoot));
                    let a:any = null;
                    if(self.dataIB()==null){
                        a = self.findRootPsF(self.singleSelectedCode());
                    }else{
                        a = self.findHistByType(self.dataIB().lstAppType[0].value,self.dataIB().lstAppType[0].employRootAtr, self.dataIB().startDate, self.tabSelectedB());
                    }
                    if(a != null && a != undefined){
                        self.singleSelectedCode(a.person.approvalId);
                    }
                    __viewContext.viewModel.viewmodelSubA.reloadGridN([self.comRoot()], self.tabSelectedB(), vmbase.MODE.SHINSEI);
                    vmbase.ProcessHandler.resizeColumn([self.comRoot()], self.tabSelectedB(), vmbase.MODE.SHINSEI);
                    self.dataIB(null);
                    block.clear();
                    dfd.resolve();
                    });
                return dfd.promise();
            }
            /**
             * find appType name
             * mode B: 申請個別登録モード
             */
            findNameApp(applicationType: number, employmentRootAtr: number): string{
                let self = this;
                if(applicationType == null && employmentRootAtr ==0){//common
                    return getText('CMM018_109');
                }
                let name = vmbase.ProcessHandler.findAppbyValue(applicationType,employmentRootAtr,self.lstNameAppType());
                return name.localizedName;
            }
            /**
             * find appType by name
             * mode B: 申請個別登録モード
             */
            findAppbyName(name: string): vmbase.ApplicationType{
                let self = this;
                return _.find( self.lstNameAppType(), function(obj: vmbase.ApplicationType) {
                    return obj.localizedName == name;
                });
            }
            /**
             * find company root is selected
             * mode B: 申請個別登録モード
             */
            findRootComB(value: string): vmbase.CompanyAppRootDto {
                let self = this;
                return _.find( self.lstCompany(), function(obj: vmbase.CompanyAppRootDto) {
                    return obj.company.approvalId == value;
                });
            }

            /**
             * find work place root is selected
             * mode B: 申請個別登録モード
             */
            findRootWpD(value: string): vmbase.WorkPlaceAppRootDto {
                let self = this;
                return _.find( self.lstWorkplace(), function(obj: vmbase.WorkPlaceAppRootDto) {
                    return obj.workplace.approvalId == value;
                });
            }
            /**
             * find person root is selected
             * mode B: 申請個別登録モード
             */
            findRootPsF(value: string): vmbase.PersonAppRootDto {
                let self = this;
                return _.find( self.lstPerson(), function(obj: vmbase.PersonAppRootDto) {
                    return obj.person.approvalId == value;
                });
            }
            /**
             * find history is selected
             * mode B: 申請個別登録モード
             */
            findHist(approvalId: string, rootType: number): any {
                let self = this;
                if(approvalId == '-1'){
                    return self.dataIB();
                }
                //TH: company
                if(rootType == 0){
                    return _.find( self.lstCompany(), function(obj: vmbase.CompanyAppRootDto) {
                        return obj.company.approvalId == approvalId;
                    });
                }
                //TH: work place
                else if(rootType == 1){
                    return _.find( self.lstWorkplace(), function(obj) {
                        return obj.workplace.approvalId == approvalId;
                    });
                }
                //TH: person
                else{
                    return _.find( self.lstPerson(), function(obj: vmbase.PersonAppRootDto) {
                        return obj.person.approvalId == approvalId;
                    });
                }
                
            }
            findHistByType(appType: number,employRootAtr: number,startDate: string, rootType: number): any {
                let self = this;
                //TH: company
                if(rootType == 0){
                    return _.find( self.lstCompany(), function(obj: vmbase.CompanyAppRootDto) {
                        return obj.company.applicationType == appType && obj.company.startDate == startDate && obj.company.employmentRootAtr == employRootAtr;
                    });
                }
                //TH: work place
                else if(rootType == 1){
                    return _.find( self.lstWorkplace(), function(obj) {
                        return obj.workplace.applicationType == appType && obj.workplace.startDate == startDate && obj.workplace.employmentRootAtr == employRootAtr;
                    });
                }
                //TH: person
                else{
                    return _.find( self.lstPerson(), function(obj: vmbase.PersonAppRootDto) {
                        return obj.person.applicationType == appType && obj.person.startDate == startDate && obj.person.employmentRootAtr == employRootAtr;
                    });
                }
                
            }
            /**
             * find history best new
             * mode B: 申請個別登録モード
             */
            findHistBestNew(appType: number, employRootAtr: number, rootType: number): any {
                let self = this;
                //TH: company
                if(rootType == 0){
                    let rootType = _.filter(self.lstCompany(), function(root){
                        let typeApp = employRootAtr == 2 ? root.company.confirmationRootType : root.company.applicationType;
                        return root.company.employmentRootAtr == employRootAtr && typeApp == appType;
                    });
                    let lstCompany = [];
                    _.each(rootType, function(obj){
                        lstCompany.push(obj.company);
                    });
                    let lstHistorySort = _.orderBy(lstCompany, ["startDate"], ["desc"]);
                    return lstCompany.length == 0 ? null : lstHistorySort[0];
                }
                //TH: work place
                else if(rootType == 1){
                     let rootType = _.filter(self.lstWorkplace(), function(root){
                        let typeApp = employRootAtr == 2 ? root.workplace.confirmationRootType : root.workplace.applicationType;
                        return typeApp == appType  && root.workplace.employmentRootAtr == employRootAtr;
                    });
                    let lstWorkplace = [];
                    _.each(rootType, function(obj){
                        lstWorkplace.push(obj.workplace);
                    });
                    let lstHistorySort = _.orderBy(lstWorkplace, ["startDate"], ["desc"]);
                    return lstWorkplace.length == 0 ? null : lstHistorySort[0];
                }
                //TH: person
                else{
                    let rootType = _.filter(self.lstPerson(), function(root){
                        let typeApp = employRootAtr == 2 ? root.person.confirmationRootType : root.person.applicationType;
                        return typeApp == appType  && root.person.employmentRootAtr == employRootAtr;
                    });
                    let lstPerson = [];
                    _.each(rootType, function(obj){
                        lstPerson.push(obj.person);
                    });
                    let lstHistorySort = _.orderBy(lstPerson, ["startDate"], ["desc"]);
                    return lstPerson.length == 0 ? null : lstHistorySort[0];
                }
                
            }
            /**
             * convert data db to data display
             * mode B: 申請個別登録モード
             */
            convert(root: Array<vmbase.DataCheckModeB>): Array<vmbase.DataTreeB>{
                let self = this;
                let lstbyApp: Array<vmbase.Com> = [];
                let aa: Array<vmbase.DataTreeB> = [];//list tra ve
                let bb: Array<vmbase.DataTree> = [];
                let appCommon: Array<vmbase.DataTree> = [];
                //lay history cua common
                _.each(root, function(itemRoot){
                    if(itemRoot.applicationType == null && itemRoot.employmentRootAtr ==0){
                        appCommon.push(new vmbase.DataTree(itemRoot.approvalId, itemRoot.startDate + '～' + itemRoot.endDate,itemRoot.employmentRootAtr, []));
                    }
                });
                aa.push(new vmbase.DataTreeB(getText('CMM018_109'),appCommon.length > 0 ? '●' + getText('CMM018_109') : getText('CMM018_109'), _.orderBy(appCommon, ["nameAppType"], ["desc"])));  
                //lay theo don  
                _.each(self.lstNameAppType(), function(item: vmbase.ApplicationType){
                    let lstbyApp: Array<vmbase.Com> = [];
                    _.each(root, function(itemRoot){
                        if(item.employRootAtr == 2 && item.value == itemRoot.confirmationRootType){//confirm
                            lstbyApp.push(new vmbase.Com(itemRoot.approvalId, itemRoot.startDate + '～' + itemRoot.endDate, itemRoot.employmentRootAtr));
                        }else if(item.value != 14 && item.value == itemRoot.applicationType && item.employRootAtr == itemRoot.employmentRootAtr){
                            lstbyApp.push(new vmbase.Com(itemRoot.approvalId, itemRoot.startDate + '～' + itemRoot.endDate, itemRoot.employmentRootAtr));
                        }
                    });
                    if(item.value != 14){
                        let nameApp = lstbyApp.length >0 ? '●' + item.localizedName : item.localizedName;
                        bb.push(new vmbase.DataTree(item.localizedName, nameApp,item.employRootAtr, _.orderBy(lstbyApp,["nameAppType"], ["desc"])));    
                    }
                })
                let str = getText("CMM018_7");
                aa.push(new vmbase.DataTreeB(str ,str,bb));
                return aa;
            }
            /**
             * register
             * mode B: 申請個別登録モード
             */
            registerB(){
                block.invisible();
                let self = this;
                let appCur: vmbase.ApplicationType = self.findAppbyName(self.singleSelectedCode());
                if(self.singleSelectedCode() == null || self.singleSelectedCode() == getText('CMM018_109') || 
                            self.singleSelectedCode() == getText("CMM018_7") || appCur != undefined){
                    dialog.alertError({ messageId: "Msg_181" }).then(function(){
                        block.clear();
                    });
                    return;
                }
                let checkAddHist = false;
                let root: Array<vmbase.CompanyAppRootADto> = [];
                if(self.dataIB() != null){
                    checkAddHist = true;
                }
                root.push(self.comRoot());
                let history = self.findHist(self.singleSelectedCode(),self.tabSelectedB());
                let listType: Array<vmbase.ApplicationType> = [];
                let startDate = ''
                let endDate = '';
                if(self.tabSelectedB() == 0){
                    if(self.singleSelectedCode() == -1){
                        endDate = self.ENDDATE_LATEST;
                        startDate = history.startDate;
                        listType.push(new vmbase.ApplicationType(history.lstAppType[0].value,'',history.lstAppType[0].employRootAtr));
                    }else{
                        endDate = history.company.endDate;
                        startDate = history.company.startDate;
                        let typeS = history.company.employmentRootAtr == 2 ? history.company.confirmationRootType : history.company.applicationType;
                        listType.push(new vmbase.ApplicationType(typeS, '', history.company.employmentRootAtr));
                    }
                }else if(self.tabSelectedB() == 1){
                    if(self.singleSelectedCode() == -1){
                        endDate = self.ENDDATE_LATEST;
                        startDate = history.startDate;
                        listType.push(new vmbase.ApplicationType(history.lstAppType[0].value,'',history.lstAppType[0].employRootAtr));
                    }else{
                        endDate = history.workplace.endDate;
                        startDate = history.workplace.startDate;
                        let typeS = history.workplace.employmentRootAtr == 2 ? history.workplace.confirmationRootType : history.workplace.applicationType;
                        listType.push(new vmbase.ApplicationType(typeS, '', history.workplace.employmentRootAtr));
                    }
                }else{
                    if(self.singleSelectedCode() == -1){
                        endDate = self.ENDDATE_LATEST;
                        startDate = history.startDate;
                        listType.push(new vmbase.ApplicationType(history.lstAppType[0].value,'',history.lstAppType[0].employRootAtr));
                    }else{
                        endDate = history.person.endDate;
                        startDate = history.person.startDate;
                        let typeS = history.person.employmentRootAtr == 2 ? history.person.confirmationRootType : history.person.applicationType;
                        listType.push(new vmbase.ApplicationType(typeS,'', history.person.employmentRootAtr));
                    }
                }
                //QA#100601
                let checkEmpty = false;
                _.each(root, function(rootItem){
                    if(rootItem.color){
                        checkEmpty = true;
                    }
                });
                //登録対象の承認ルートをチェックする
                if(!checkEmpty){//0件の場合
                    //エラーメッセージ(Msg_37)を表示する (Hiển thị message lỗi (Msg_37))
                    dialog.alertError({ messageId: "Msg_37"}).then(()=>{
                        block.clear();    
                    });
                    return;
                }
                let data: vmbase.DataResigterDto = new vmbase.DataResigterDto(vmbase.SystemAtr.WORK,
                                    self.tabSelectedB(),
                                    checkAddHist, self.workplaceIdB(),
                                    self.employeeId(),startDate, endDate,self.dataIB(), listType, root,__viewContext.viewModel.viewmodelA.selectedModeCode());
                servicebase.updateRoot(data).done(function(){
                    self.enableCreatNewB(true);
                    block.clear();
                    let lstRoot: Array<vmbase.DataCheckModeB> = [];
                   if(self.tabSelectedB() == 0){//company
                       self.getDataCompanyPr();
                   }else if(self.tabSelectedB() == 1){
                       self.getDataWorkplacePr();
                   }else{
                       self.getDataPersonPr();
                   }
                    dialog.info({ messageId: "Msg_15" });
                }).fail(function(){
                    block.clear();    
                });
            }
            /**
             * open dialog I
             * mode B: 申請個別登録モード
             */
            openDialogI(){
                let self = this;
                block.grayout();
                let sDate = '';
                //履歴変更対象を選択しているチェックする
                let name = '';
                let typeApp = null;
                let employRootAtr = null;
                self.enableCreatNewB(false);
                let lstAppType: Array<vmbase.ApplicationType> = [];
                if(self.singleSelectedCode() == getText("CMM018_7") || self.singleSelectedCode() == null){//2
                    dialog.alertError({ messageId: "Msg_181" });
                    block.clear();
                    return;
                }
                let itemCurrent = self.findHist(self.singleSelectedCode(), self.tabSelectedB());
                if(itemCurrent == undefined){//TH: chon name
                    let obj = self.findAppbyName(self.singleSelectedCode());
                    typeApp = obj == undefined ? null : obj.value;
                    employRootAtr = obj == undefined ? 0 : obj.employRootAtr;
                    let itemLast = self.findHistBestNew(typeApp,employRootAtr, self.tabSelectedB());
                    if(itemLast != undefined){
                        sDate = itemLast.startDate;
                    }
                }else{//chon item
                    if(self.tabSelectedB() == 0){
                        if(itemCurrent !== undefined){
                            if(self.singleSelectedCode() == '-1'){
                                typeApp = itemCurrent.lstAppType[0].value;
                                employRootAtr = itemCurrent.lstAppType[0].employRootAtr;
                            }else{
                                typeApp = itemCurrent.company.employmentRootAtr == 2 ? itemCurrent.company.confirmationRootType : itemCurrent.company.applicationType;
                                employRootAtr = itemCurrent.company.employmentRootAtr;
                            }
                            let itemLast = self.findHistBestNew(typeApp,employRootAtr, self.tabSelectedB());
                            sDate = itemLast.startDate;
                        }
                    }
                    else if(self.tabSelectedB() == 1){
                        if(itemCurrent !== undefined){
                            if(self.singleSelectedCode() == '-1'){
                                typeApp = itemCurrent.lstAppType[0].value;
                                employRootAtr = itemCurrent.lstAppType[0].employRootAtr;
                            }else{
                                typeApp = itemCurrent.workplace.employmentRootAtr == 2 ? itemCurrent.workplace.confirmationRootType : itemCurrent.workplace.applicationType;
                                employRootAtr = itemCurrent.workplace.employmentRootAtr;
                            }
                            let itemLast = self.findHistBestNew(typeApp,employRootAtr, self.tabSelectedB());
                            sDate = itemLast.startDate;
                        }
                    }
                    else{
                        if(itemCurrent !== undefined){
                            if(self.singleSelectedCode() == '-1'){
                                typeApp = itemCurrent.lstAppType[0].value;
                                employRootAtr = itemCurrent.lstAppType[0].employRootAtr;
                            }else{
                                typeApp = itemCurrent.person.employmentRootAtr == 2 ? itemCurrent.person.confirmationRootType : itemCurrent.person.applicationType;
                                employRootAtr = itemCurrent.person.employmentRootAtr;
                            }
                            let itemLast = self.findHistBestNew(typeApp,employRootAtr, self.tabSelectedB());
                            sDate = itemLast.startDate;
                        }
                    }
                }
                name = self.findNameApp(typeApp, employRootAtr);
                lstAppType.push(new vmbase.ApplicationType(typeApp, '',employRootAtr));
                let paramI: vmbase.IData_Param = {
                                name: name,
                                startDate: sDate,
                                check: self.tabSelectedB(),
                                mode: 1,
                                lstAppType: lstAppType,
                                overLap: true
                                }
                setShared('CMM018I_PARAM', paramI);
                modal("/view/cmm/018/i/index.xhtml").onClosed(function(){
                    block.clear();
                    let data: vmbase.IData = getShared('CMM018I_DATA');
                    if(data == null){
                        self.enableCreatNewB(true);
                        return;
                    }
                    let singleSelectedCodeOld  =  self.singleSelectedCode();
                 
                    self.enableDeleteB(false);
                    __viewContext.viewModel.viewmodelA.enableRegister(true);
                    self.dataIB(data);
                    let lst = data.lstAppType;
                    let data2 = [];
                    let rangeDate = data.startDate + '～' + self.ENDDATE_LATEST;
                    self.historyStr(rangeDate);
                    let startDate = moment(data.startDate,'YYYY/MM/DD').toDate();
                    startDate.setDate(startDate.getDate() - 1);
                    let month =   __viewContext.viewModel.viewmodelA.checkDate(startDate.getMonth() + 1);
                    let day =  __viewContext.viewModel.viewmodelA.checkDate(startDate.getDate());
                    let endDateNew = startDate.getFullYear() + '/' + month +  '/' + day;
                    let employRootAtr = data.lstAppType[0].employRootAtr;
                    let appTypeValue = employRootAtr == 1 ? data.lstAppType[0].value : null;
                    let confirmValue = employRootAtr == 2 ? data.lstAppType[0].value : null;
                    let typeS = employRootAtr == 2 ? confirmValue : appTypeValue;
                    if(!data.copyDataFlag){//create new
                        let app = vmbase.ProcessHandler.findAppbyValue(appTypeValue,employRootAtr,self.lstNameAppType());
                            let b = new vmbase.ApprovalPhaseDto([],'','',0,'',0,0);
                            self.comRoot(new vmbase.CompanyAppRootADto(false, employRootAtr, 
                                typeS, app == undefined ? getText('CMM018_109') : app.localizedName, '-1', '',
                                '',b,b,b,b,b));
                        
                    }else{
                        self.findHistoryLastofApp(typeS, employRootAtr); //list right
                    }
                    let histLast = self.findHistBestNew(appTypeValue, employRootAtr, self.tabSelectedB());
                    if(histLast != null){
                        singleSelectedCodeOld = histLast.approvalId;
                    }
                    if(self.tabSelectedB() == 0){//company
                        let a = null;
                        _.each(self.lstCompany(), function(item){
                            if(item.company.approvalId != singleSelectedCodeOld){//bo them ls cua cai dang sua
                                data2.push(new vmbase.DataCheckModeB(item.company.approvalId, item.company.startDate, item.company.endDate, 
                                            item.company.applicationType, item.company.confirmationRootType, item.company.employmentRootAtr));
                            }else{
                               a = new vmbase.DataCheckModeB(item.company.approvalId, item.company.startDate, item.company.endDate, 
                                            item.company.applicationType, item.company.confirmationRootType, item.company.employmentRootAtr);
                            }
                        });
                        if(a == null){//loai don chua co lich su : them moi tu dau
                            let add = new vmbase.DataCheckModeB('-1',data.startDate,self.ENDDATE_LATEST,appTypeValue,confirmValue,employRootAtr);
                            data2.push(add);
                            self.dataDisplay(self.convert(data2));
                        }else{
                            let add = new vmbase.DataCheckModeB('-1',data.startDate,self.ENDDATE_LATEST,a.applicationType,confirmValue,a.employmentRootAtr);
                            let old = new vmbase.DataCheckModeB(a.approvalId, a.startDate, endDateNew, 
                                                a.applicationType, a.confirmationRootType, a.employmentRootAtr);
                            data2.push(add);
                            data2.push(old);
                            self.dataDisplay(self.convert(data2));
                            self.dataDisplay.valueHasMutated();
                        }
                    }else if(self.tabSelectedB() == 1){//workplace
                        let a = null;
                        _.each(self.lstWorkplace(), function(item){
                            if(item.workplace.approvalId != singleSelectedCodeOld){//bo them ls cua cai dang sua
                                data2.push(new vmbase.DataCheckModeB(item.workplace.approvalId, item.workplace.startDate, item.workplace.endDate, 
                                            item.workplace.applicationType, item.workplace.confirmationRootType, item.workplace.employmentRootAtr));
                            }else{
                               a = new vmbase.DataCheckModeB(item.workplace.approvalId, item.workplace.startDate, item.workplace.endDate, 
                                            item.workplace.applicationType, item.workplace.confirmationRootType, item.workplace.employmentRootAtr);
                            }
                        });
                        if(a == null){//loai don chua co lich su : them moi tu dau
                            let add = new vmbase.DataCheckModeB('-1',data.startDate,self.ENDDATE_LATEST,appTypeValue,confirmValue,employRootAtr);
                            data2.push(add);
                            self.dataDisplay(self.convert(data2));
                        }else{
                            let add = new vmbase.DataCheckModeB('-1',data.startDate,self.ENDDATE_LATEST,a.applicationType,a.confirmationRootType,a.employmentRootAtr);
                            let old = new vmbase.DataCheckModeB(a.approvalId, a.startDate, endDateNew, 
                                                a.applicationType, a.confirmationRootType, a.employmentRootAtr);
                            data2.push(add);
                            data2.push(old);
                            self.dataDisplay(self.convert(data2));
                            self.dataDisplay.valueHasMutated();
                        }
                    }else{//person
                        let a = null;
                        _.each(self.lstPerson(), function(item){
                            if(item.person.approvalId != singleSelectedCodeOld){//bo them ls cua cai dang sua
                                data2.push(new vmbase.DataCheckModeB(item.person.approvalId, item.person.startDate, item.person.endDate, 
                                            item.person.applicationType, item.person.confirmationRootType, item.person.employmentRootAtr));
                            }else{
                               a = new vmbase.DataCheckModeB(item.person.approvalId, item.person.startDate, item.person.endDate, 
                                            item.person.applicationType, item.person.confirmationRootType, item.person.employmentRootAtr);
                            }
                        });
                        if(a == null){//loai don chua co lich su : them moi tu dau
                            let add = new vmbase.DataCheckModeB('-1',data.startDate,self.ENDDATE_LATEST,appTypeValue, confirmValue,employRootAtr);
                            data2.push(add);
                            self.dataDisplay(self.convert(data2));
                        }else{
                            let add = new vmbase.DataCheckModeB('-1',data.startDate,self.ENDDATE_LATEST,a.applicationType,a.confirmationRootType, a.employmentRootAtr);
                            let old = new vmbase.DataCheckModeB(a.approvalId, a.startDate, endDateNew, 
                                                a.applicationType, a.confirmationRootType,a.employmentRootAtr);
                            data2.push(add);
                            data2.push(old);
                            self.dataDisplay(self.convert(data2));
                            self.dataDisplay.valueHasMutated();
                        }
                    }
					self.singleSelectedCode('-1');
                    __viewContext.viewModel.viewmodelSubA.reloadGridN([self.comRoot()], self.tabSelectedB(), vmbase.MODE.SHINSEI);
                });
            }
            /**
             * open dialog J
             * mode B: 申請個別登録モード
             */
            openDialogJ(){
                let self = this;
                block.grayout();
                let history;
                let startDate = '';
                let endDate = '';
                let name = '';
                let historyId = '';
                let approvalId = '';
                let appType;
                let employRootAtr;
                if(self.tabSelectedB() == 0){//company
                    history = self.findRootComB(self.singleSelectedCode());
                    if(history != undefined){
                        historyId = history.company.historyId;
                        approvalId = history.company.approvalId;
                        startDate = history.company.startDate;
                        endDate = history.company.endDate;
                        appType = history.company.employmentRootAtr == 2 ? history.company.confirmationRootType : history.company.applicationType;
                        employRootAtr = history.company.employmentRootAtr;
                    }
                }else if(self.tabSelectedB() == 1){
                    history = self.findRootWpD(self.singleSelectedCode());
                    if(history != undefined){
                        historyId = history.workplace.historyId;
                        approvalId = history.workplace.approvalId;
                        startDate = history.workplace.startDate;
                        endDate = history.workplace.endDate;
                        appType = history.workplace.employmentRootAtr == 2 ? history.workplace.confirmationRootType : history.workplace.applicationType;
                        employRootAtr = history.workplace.employmentRootAtr;
                    }
                }else{
                    history = self.findRootPsF(self.singleSelectedCode());
                    if(history != undefined){
                        historyId = history.person.historyId;
                        approvalId = history.person.approvalId;
                        startDate = history.person.startDate;
                        endDate = history.person.endDate;
                        appType = history.person.employmentRootAtr == 2 ? history.person.confirmationRootType : history.person.applicationType;
                        employRootAtr = history.person.employmentRootAtr;
                    }
                }
                
                //履歴変更対象を選択しているチェックする(check có chọn đối tượng sửa lịch sử hay không ?)
                //対象未選択、申請ごとのルートを選択している場合(chưa chọn đối tượng, hoặc đang chọn 申請ごとのルート)
                if(history == undefined){
                    //エラーメッセージ(Msg_181)(error message (Msg_181))
                    dialog.alertError({ messageId: "Msg_181" });
                    block.clear();
                    return;
                }
                //編集する期間が最新なのかチェックする(check lịch sử đang sửa có phải lịch sử mới nhất hay không)
                //編集する履歴が最新履歴じゃない(lịch sử đang sửa không phải là lịch sử mới nhất)
//                self.findHistBestNew();
                if(endDate != self.ENDDATE_LATEST){
                    //エラーメッセージ(Msg_154)(error message (Msg_154))
                    dialog.alertError({ messageId: "Msg_154" });
                    block.clear();
                    return;
                }
                let lst: Array<vmbase.UpdateHistoryDto> = [];
                lst.push(new vmbase.UpdateHistoryDto(approvalId, historyId, appType, employRootAtr));
                name = self.findNameApp(appType, employRootAtr);
                let paramJ: vmbase.JData_Param = {
                    name: name,
                    startDate: startDate,
                    endDate: endDate,
                    workplaceId: self.workplaceIdB(),
                    employeeId: self.employeeId(),
                    check: self.tabSelectedB(),
                    mode: 1,
                    lstUpdate: lst,
                    sysAtr: 0
                }
                setShared('CMM018J_PARAM', paramJ);
                modal("/view/cmm/018/j/index.xhtml").onClosed(function(){
                    block.clear();
                    let cancel = getShared('CMM018J_OUTPUT');
                    if(cancel != undefined && cancel.cancel){
                        return;
                    }
					const currentCodeSingle = self.singleSelectedCode();
                    if(self.tabSelectedB()==0){
                        self.getDataCompanyPr().done(function(){
                            _.forEach(self.deepToApprovalId(currentCodeSingle), el => {
									self.singleSelectedCode(el);
							})
                        });
                    }else if(self.tabSelectedB()==1){
                        self.getDataWorkplacePr().done(function(){
                            _.forEach(self.deepToApprovalId(currentCodeSingle), el => {
									self.singleSelectedCode(el);
							})
                        });
                    }else{
                        self.getDataPersonPr().done(function(){
							_.forEach(self.deepToApprovalId(currentCodeSingle), el => {
									self.singleSelectedCode(el);
							})
                        });
                    }
                });
            }
			deepToApprovalId(approvalId: string): Array<string> {
				const self = this;
				const listResult = [] as Array<string>;
				
				const displayData = self.dataDisplay();
				
				_.forEach(displayData, el => {
					if (el.approvalId == approvalId) {
						listResult.push(el.approvalId);								
					}
					if (!_.isEmpty(el.lstbyApp)) {
						_.forEach(el.lstbyApp, el1 => {
							if (el1.approvalId == approvalId) {
								listResult.push(el.approvalId);
								listResult.push(el1.approvalId);
								
							}
							if (!_.isEmpty(el1.lstbyApp)) {
								_.forEach(el1.lstbyApp, el2 => {
									if (el2.approvalId == approvalId) {
										listResult.push(el.approvalId);
										listResult.push(el1.approvalId);
										listResult.push(el2.approvalId);
									}
								})
							}
						})
						
					}
				})
				
				
				return listResult;
			}
			
            findRootByEndDate(endDate: string, appType: number,employRootAtr: number, rootType: number): any{
                let self = this; 
                if(rootType == 0){
                    return _.find(self.lstCompany(), function(root){
                        return root.company.applicationType == appType && root.company.endDate == endDate && root.company.employmentRootAtr;
                    });
                }   
                else if(rootType == 1){
                    return _.find(self.lstWorkplace(), function(root){
                        return root.workplace.applicationType == appType && root.workplace.endDate == endDate && root.workplace.employmentRootAtr;
                    });
                }else{
                    return _.find(self.lstPerson(), function(root){
                        return root.person.applicationType == appType && root.person.endDate == endDate && root.person.employmentRootAtr;
                    });
                }
            }
            /**
             * subscribe tab selected 
             * mode B: 申請個別登録モード
             */
            checkTabSelectedB(codeChanged: number, id: string){
                let self = this;
                let mode = __viewContext.viewModel.viewmodelA.selectedModeCode();
                if(mode == 0){//まとめて登録モード
                    return;
                }
                self.historyStr('');
                self.singleSelectedCode(null);
                self.dataDisplay([]);
                self.enableCreatNewB(true);
                let lstRoot: Array<vmbase.DataCheckModeB> = [];
                //TH: tab company
                if(codeChanged == vmbase.RootType.COMPANY){
                    self.tabSelectedB(vmbase.RootType.COMPANY);
                    self.getDataCompanyPr().done(function(data){
                        //list left
                        _.each(self.lstCompany(), function(item){
                            lstRoot.push(new vmbase.DataCheckModeB(item.company.approvalId, item.company.startDate,
                                item.company.endDate, item.company.applicationType, item.company.confirmationRootType,item.company.employmentRootAtr));
                        });
                        //list right
                        let com = self.findRootComB(self.singleSelectedCode());
                        self.dataDisplay(self.convert(lstRoot));
                    });;
                }
                //TH: tab work place
                else if(codeChanged == vmbase.RootType.WORKPLACE){
                    self.tabSelectedB(vmbase.RootType.WORKPLACE);
                    self.workplaceIdB(id);
                    self.getDataWorkplacePr();
                }
                //TH: tab person
                else{
                    self.tabSelectedB(2);
                    self.employeeId(id);
                    self.getDataPersonPr();
                }
                let b = new vmbase.ApprovalPhaseDto([],'','',0,'',0,0);
                let a = new vmbase.CompanyAppRootADto(false, 1, 0, '', '', '','', b, b, b, b, b);
                __viewContext.viewModel.viewmodelSubA.reloadGridN([a], self.tabSelectedB(), vmbase.MODE.SHINSEI);
                vmbase.ProcessHandler.resizeColumn([a], self.tabSelectedB(), vmbase.MODE.SHINSEI);
            }
            /**
             * display item right TH 1,2,appName
             */
            showItem(codeChanged: string){
                let self = this;
                self.historyStr('');
                let employRootAtr;
                let b = new vmbase.ApprovalPhaseDto([],'','',0,'',0,0);
                if(codeChanged == null){
                    let a = new vmbase.CompanyAppRootADto(false, 0, 0, '', '', '','', b, b, b, b, b);
                    self.comRoot(a);
                }
                if(codeChanged == getText('CMM018_109')){//1
                    let a = new vmbase.CompanyAppRootADto(false, 0, 0, codeChanged, '', '','', b, b, b, b, b);
                    self.comRoot(a);
                }
                else if(codeChanged == getText("CMM018_7") || codeChanged == null){//2 | not selected
                    let a = new vmbase.CompanyAppRootADto(false, 1, 0, '', '', '','', b, b, b, b, b);
                    self.comRoot(a);
                }else{//appName
                   //find item current
                    let value = self.findAppbyName(codeChanged);
                    let a1 = new vmbase.CompanyAppRootADto(false, value.employRootAtr, value.value, value.localizedName, '', '','', b, b, b, b, b);
                    self.comRoot(a1); 
                }
            }
            findHistoryLastofApp(appType: number, employRootAtr: number){
                let self = this;
                let histLast = self.findHistBestNew(appType, employRootAtr, self.tabSelectedB());
                let value = vmbase.ProcessHandler.findAppbyValue(appType, employRootAtr, self.lstNameAppType());
                if(value == undefined){
                    value = new vmbase.ApplicationType(null, getText('CMM018_109'),0 );
                }
                let b = new vmbase.ApprovalPhaseDto([],'','',0,'',0,0);
                if(histLast == null){
                    self.comRoot(new vmbase.CompanyAppRootADto(false, value.employRootAtr, value.value, value.localizedName, '', '','', b, b, b, b, b)); 
                }else{
                    let histNew = null;
                    if(self.tabSelectedB() == vmbase.RootType.COMPANY){//company
                        histNew = self.findRootComB(histLast.approvalId);
                    }else if(self.tabSelectedB() == vmbase.RootType.WORKPLACE){//workplace
                        histNew = self.findRootWpD(histLast.approvalId);
                    }else{//person
                        histNew = self.findRootPsF(histLast.approvalId);
                    }
                    let lstAppPhase = __viewContext.viewModel.viewmodelA.checklist(histNew.lstAppPhase);
                    let rootNew = new vmbase.CompanyAppRootADto(histNew == undefined ? false : true, employRootAtr, appType, 
                                            value == undefined ? getText('CMM018_109') : value.localizedName, '','','',
                                            lstAppPhase[0],lstAppPhase[1],lstAppPhase[2],lstAppPhase[3],lstAppPhase[4]);
                    self.comRoot(rootNew);
                }

            }
        }
    }
}