module nts.uk.com.view.cps013.a.viewmodel {
    import block = nts.uk.ui.block;
    import request = nts.uk.request;
    import character = nts.uk.characteristics;
    import text = nts.uk.resource.getText;
    
    export class ScreenModel {
        date : KnockoutObservable<string> = ko.observable(null);
        items: Array<any> = [];
        // A2_001
        perInfoChk: KnockoutObservable<boolean> = ko.observable(false);
        // A3_001
        masterChk: KnockoutObservable<boolean> = ko.observable(false);
        checkDisplay : any = __viewContext.env.products;
        constructor() {
            let self = this;
            
            // tạo list A3_004
            for(let i = 0; i < 7; i++){
                self.items.push(new GridItem({
                    id: i + 1,
                    flag: false,
                    name: "",
                }));
            }
            
            self.items[0].name = text("CPS013_15");
            self.items[1].name = text("CPS013_16");
            self.items[2].name = text("CPS013_17");
            self.items[3].name = text("CPS013_18");
            self.items[4].name = text("CPS013_19");
            self.items[5].name = text("CPS013_20");
            self.items[6].name = text("CPS013_21");
            
            
            // check system == attendance
            if ((self.checkDisplay.attendance == true) && (self.checkDisplay.payroll == false)) {
                _.remove(self.items, (e) => {
                    return _.indexOf([4,5,6,7], e.id) > -1;
                });
            } 
            
            // check system == payroll
            if ((self.checkDisplay.payroll == true) && (self.checkDisplay.attendance == false)) {
                _.remove(self.items, (e) => {
                    return _.indexOf([1,2,3], e.id) > -1;
                });
            } 
            
            if ((self.checkDisplay.payroll == false) && (self.checkDisplay.attendance == false)) {
                _.remove(self.items, (e) => {
                    return _.indexOf([1,2,3,4,5,6,7], e.id) > -1;
                });
            }

            
            for(let i = 0; i< self.items.length; i++){
                self.items[i].id = i + 1;
            }
  
            self.masterChk.subscribe(check =>{
                if(check == false){
                    $("#grid2_flag > span > div > label > input[type=checkbox]").attr("disabled", true);
                    _.each(self.items, item => {
                        $("#grid2").ntsGrid("disableNtsControlAt", item.id, "flag", "CheckBox");
                    });   
                }else{
                    $("#grid2_flag > span > div > label > input[type=checkbox]").attr("disabled", false);
                    _.each(self.items, item => {
                        $("#grid2").ntsGrid("enableNtsControlAt", item.id, "flag", "CheckBox");
                    }); 
                }
            });
        }

        /** get data when start dialog **/
        startPage(): JQueryPromise<any> {
            let self = this;
            let dfd = $.Deferred();
            block.invisible();
            
            $("#grid2").ntsGrid({
                width: '300px',
                height: '234px',
                dataSource: self.items,
                primaryKey: 'id',
                virtualization: true,
                columns: [
                    { headerText: '', key: 'id', dataType: 'number', width: '40px' },
                    { headerText: '', key: 'flag', dataType: 'boolean', width: '40px', ntsControl: 'Checkbox', showHeaderCheckbox: true },
                    { headerText: text("CPS013_14"), key: 'name', dataType: 'string', width: '220px' },
                ],
                features: [],
                ntsControls: [{ name: 'Checkbox', options: { value: 1, text: '' }, optionsValue: 'value', optionsText: 'text', controlType: 'CheckBox', enable: true }],
            });
            character.restore("PerInfoValidCheckCtg").done((obj) => {
                $('#date_text').focus();
                if(obj){
                    self.perInfoChk(obj.perInfoChk);
                    self.masterChk(obj.masterChk);
                    // khi tất cả check box được check thì thi load lên sẽ phải check cả check box trên header
                    let flag = _.countBy(ko.toJS($("#grid2").igGrid("option","dataSource")), function (x) { return x.flag == true; });
                    if (obj.masterChk == false) {
                        $("#grid2_flag > span > div > label > input[type=checkbox]").attr("disabled", true);
                        _.each(self.items, item => {
                            $("#grid2").ntsGrid("disableNtsControlAt", item.id, "flag", "CheckBox");
                        });
                    } else {
                        $("#grid2_flag > span > div > label > input[type=checkbox]").attr("disabled", false);
                        _.each(self.items, item => {
                            $("#grid2").ntsGrid("enableNtsControlAt", item.id, "flag", "CheckBox");
                        });
                    }
                    
                    if(flag.true === 7){
                        $("#grid2_flag > span > div > label > input[type='checkbox']")[0].checked = true;
                    }else{
                        $("#grid2_flag > span > div > label > input[type='checkbox']")[0].checked = false;
                    }
                    
                    _.each(obj.confirmTarget, i =>{
                          $("#grid2").ntsGrid("updateRow", i.id,  { flag: i.flag });
                    
                    })
                    
                }

            }).fail(()=>{
                block.clear();    
            });
            
            if (self.masterChk() == false) {
                $("#grid2_flag > span > div > label > input[type=checkbox]").attr("disabled", true);
                _.each(self.items, item => {
                    $("#grid2").ntsGrid("disableNtsControlAt", item.id, "flag", "CheckBox");
                });
            } else {
                $("#grid2_flag > span > div > label > input[type=checkbox]").attr("disabled", false);
                _.each(self.items, item => {
                    $("#grid2").ntsGrid("enableNtsControlAt", item.id, "flag", "CheckBox");
                });
            }
            
    
            // get SystemDate from server moment(new Date()).format('YYYY-MM-DD');
            service.getSystemDate().done(function(dateToday: any) {
                let date = dateToday.referenceDate;
                // A1_004
                self.date(moment.utc(date).format("YYYY/MM/DD"));
            }).fail(function(error) {
                self.date(moment(new Date()).format('YYYY/MM/DD'));
                console.log('khong get duoc SystemDate from server');
            });
            
            dfd.resolve();
            return dfd.promise();
        }
        
        /** click button execute **/
        execute() {
            block.invisible();
            let self = this;
            
            let paramSave = {
                // A2_001
                perInfoChk: self.perInfoChk(),
                // A3_001
                masterChk: self.masterChk(),
                confirmTarget: ko.toJS($("#grid2").igGrid("option","dataSource"))
            }
            character.save('PerInfoValidCheckCtg', paramSave);
            character.restore("PerInfoValidCheckCtg").done((obj) => {
            });
            let scheduleMngChecks = _.filter(self.items, x => {return x.name == text("CPS013_15");}),
                dailyPerforMngCheck = _.filter(self.items, x => {return x.name == text("CPS013_16");}),
                monthPerforMngChecks = _.filter(self.items, x => {return x.name == text("CPS013_17");}),
                payRollMngChecks = _.filter(self.items, x => {return x.name == text("CPS013_18");}),
                bonusMngChecks = _.filter(self.items, x => {return x.name == text("CPS013_19");}),
                yearlyMngChecks = _.filter(self.items, x => {return x.name == text("CPS013_20");}),
                monthCalChecks = _.filter(self.items, x => {return x.name == text("CPS013_21");});
            
            let checkbox = ko.toJS($("#grid2").igGrid("option","dataSource")),
                checkDataFromUI = { 
                dateTime: self.date(),
                perInfoCheck: self.perInfoChk(),
                masterCheck: self.masterChk(),
                scheduleMngCheck: self.masterChk() == false? false: (scheduleMngChecks.length > 0? checkbox[scheduleMngChecks[0].id - 1].flag: false),
                dailyPerforMngCheck: self.masterChk() == false? false:(dailyPerforMngCheck.length > 0? checkbox[dailyPerforMngCheck[0].id - 1].flag: false),
                monthPerforMngCheck: self.masterChk() == false? false: (monthPerforMngChecks.length > 0? checkbox[monthPerforMngChecks[0].id - 1].flag: false),
                payRollMngCheck: self.masterChk() == false? false: (payRollMngChecks.length > 0? checkbox[payRollMngChecks[0].id - 1].flag: false),
                bonusMngCheck: self.masterChk() == false? false: (bonusMngChecks.length > 0? checkbox[bonusMngChecks[0].id - 1].flag: false),
                yearlyMngCheck: self.masterChk() == false? false: (yearlyMngChecks.length > 0? checkbox[yearlyMngChecks[0].id - 1].flag: false),
                monthCalCheck: self.masterChk() == false? false: (monthCalChecks.length > 0? checkbox[monthCalChecks[0].id - 1].flag: false)},
                flag =  _.filter(ko.toJS(checkbox), x => {return x.flag == true});
            // nếu A2_001 và A3_001 cùng không được chọn hoặc A3_001 được chọn nhưng list A3_004 không được chọn item nào => msg_360
            if ((flag.length === 0 && self.masterChk() === true) || (self.masterChk() === false && self.perInfoChk() === false)) {
                nts.uk.ui.dialog.error({ messageId: "Msg_929" });
                block.clear();
                return;
            }
            service.checkHasCtg(checkDataFromUI).done((data  : IDataResult) =>{
                if (data.listCtg) {
                    checkDataFromUI.peopleCount = data.peopleCount;
                    checkDataFromUI.startTime   = data.startDateTime;
                    nts.uk.ui.windows.setShared('CPS013B_PARAMS', checkDataFromUI);
                    nts.uk.ui.windows.sub.modal('/view/cps/013/e/index.xhtml').onClosed(() => {
                        block.clear();
                    });
                } else {
                    nts.uk.ui.dialog.alertError({ messageId: "Msg_930" });
                    return;
                }
            }).fail(function(res) {
                nts.uk.ui.dialog.alertError({messageId: res.messageId});
            }).always(()=>block.clear());
        }
        
    }
    
    export interface IGridItem{
        id: number;
        flag: boolean;
        name: string;
    }
    
    class GridItem {
        id: number;
        flag: boolean;
        name: string;
        constructor(param: GridItem) {
            this.id = param.id;
            this.flag = param.flag;
            this.name = param.name;
        }
    }
    
    interface IDataResult{
        listCtg : Array<ICategoryInfo>;
        peopleCount: number;
        startDateTime: Date;
        endDateTime: Date;
    }
    
    interface ICategoryInfo{
        personInfoCategoryId : string;
        categoryCode: string;
        categoryName: string;
    }

}




