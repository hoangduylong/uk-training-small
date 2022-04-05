module nts.uk.com.view.cmm018.n {
   import vmbase = cmm018.shr.vmbase;
export module viewmodel {
    export class ScreenModel {
        //Right table's properties.
        lstAppDis: KnockoutObservableArray<ItemModel>;
        columns: KnockoutObservableArray<NtsGridListColumn>;
        currentAppType: KnockoutObservableArray<number>;

        //Left filter area
        ccgcomponent: vmbase.GroupOption;

        // Options
        baseDate: KnockoutObservable<Date>;
        selectedEmployee: KnockoutObservableArray<vmbase.EmployeeSearchDto>;
		selectedEmployeeKCP005: KnockoutObservableArray<UnitModel>;
        sysAtr: number;
        lstAppName : Array<any> = [];
		isShow: KnockoutObservable<Boolean> = ko.observable(false);
		// get selected code in KCP005
		multiSelectedCode: KnockoutObservableArray<any> = ko.observableArray([]);
        constructor() {
            var self = this;
            let param = nts.uk.ui.windows.getShared('CMM018N_PARAM');
            self.sysAtr = param.sysAtr || 0;
            _.each(param.lstName, function(app){
                self.lstAppName.push({id: app.employRootAtr.toString() +  app.value,
                    code: app.value, name: app.localizedName, empRoot: app.employRootAtr,
                    lowerApprove: app.lowerApprove});
            });
            
            //Init right table.
            self.lstAppDis = ko.observableArray([]);

            self.columns = ko.observableArray([
                { headerText: '', key: 'id', width: 30, hidden: true},
                { headerText: '申請一覧', key: 'name', width: 200 }
            ]);

            self.currentAppType = ko.observableArray([]);
            //Init selectedEmployee
            self.selectedEmployee = ko.observableArray([]);
            self.baseDate = ko.observable(moment(new Date()).toDate());
            if(self.sysAtr == 0){
                self.start();
            }else{
                self.lstAppDis.push({id: '0_null', code: null, name: "共通ルート", empRoot: 0} as any);
                _.each(self.lstAppName, app => {
                    self.lstAppDis.push({id: app.id, code: app.code, name: app.name, 
                        empRoot: app.empRoot, lowerApprove: app.lowerApprove});
                });
				// set selected all in list apptype
				// get ids 
				let ids =  _.map(ko.toJS(self.lstAppDis), (i: any) => i.id);
				self.currentAppType(ids);
                self.loadGrid();
            }
			self.selectedEmployee.subscribe(value => {
				if (value) {
					self.initKCP005();
					if (!ko.toJS(self.isShow)) {
						self.isShow(true);
					}
				}
			});
        }
		initKCP005() {
			const self = this;
			let isShowAlreadySet = ko.observable(false);
			let isDialog = ko.observable(true);
			let isShowNoSelectRow = ko.observable(false);
			let isMultiSelect = ko.observable(true);
			let isShowWorkPlaceName = ko.observable(true);
			let isShowSelectAllButton = ko.observable(false);
			let disableSelection = ko.observable(false);
			let dataSource = ko.toJS(self.selectedEmployee) as Array<vmbase.EmployeeSearchDto>;
			let dataList = [] as Array<UnitModel>;
			_.map(dataSource, (i: vmbase.EmployeeSearchDto) => {
				let um = {} as UnitModel;
				um.id = i.employeeCode;
				um.code = i.employeeCode;
				um.name = i.employeeName;
				um.affiliationName = i.workplaceName;
				dataList.push(um);
			});
			let employeeList = ko.observableArray<UnitModel>(dataList);
			self.selectedEmployeeKCP005 = employeeList;
			let listComponentOption = {
				isShowAlreadySet: isShowAlreadySet(),
				isMultiSelect: isMultiSelect(),
				listType: ListType.EMPLOYEE,
				employeeInputList: employeeList,
				selectType: SelectType.SELECT_BY_SELECTED_CODE,
				selectedCode: self.multiSelectedCode,
				isDialog: isDialog(),
				isShowNoSelectRow: isShowNoSelectRow(),
				isShowWorkPlaceName: isShowWorkPlaceName(),
				isShowSelectAllButton: isShowSelectAllButton(),
				disableSelection : disableSelection(),
				maxHeight: 375,
                maxRows: 15
				
			} as any;
			
			$('#component-items-list').ntsListComponent(listComponentOption);
		}
        loadGrid() {
            var self = this;
            self.ccgcomponent = {
                showEmployeeSelection: false, // 検索タイプ
                systemType: 2, // システム区分
                showQuickSearchTab: true, // クイック検索
                showAdvancedSearchTab: true, // 詳細検索
                showBaseDate: true, // 基準日利用
                showClosure: false, // 就業締め日利用
                showAllClosure: false, // 全締め表示
                showPeriod: false, // 対象期間利用
                periodFormatYM: false, // 対象期間精度

                /** Required parameter */
                baseDate: moment.utc().toISOString(), // 基準日
                periodStartDate: moment.utc("1900/01/01", "YYYY/MM/DD").toISOString(), // 対象期間開始日
                periodEndDate: moment.utc("9999/12/31", "YYYY/MM/DD").toISOString(), // 対象期間終了日
                inService: false, // 在職区分
                leaveOfAbsence: false, // 休職区分
                closed: false, // 休業区分
                retirement: false, // 退職区分

                /** Quick search tab options */
                showAllReferableEmployee: true, // 参照可能な社員すべて
                showOnlyMe: false, // 自分だけ
                showSameWorkplace: true, // 同じ職場の社員
                showSameWorkplaceAndChild: true, // 同じ職場とその配下の社員

                /** Advanced search properties */
                showEmployment: false, // 雇用条件
                showWorkplace: true, // 職場条件
                showClassification: false, // 分類条件
                showJobTitle: false, // 職位条件
                showWorktype: false, // 勤種条件
                isMutipleCheck: true,
                isInDialog: true,
                   /**  
                   * @param dataList: list employee returned from component.
                   * Define how to use this list employee by yourself in the function's body.
                   */
                 returnDataFromCcg001: function(data: vmbase.Ccg001ReturnedData){
                     self.selectedEmployee(data.listEmployee);            
                 }

            }

            $('#ccgcomponent').ntsGroupComponent(self.ccgcomponent);
        }

        start() {
            let self = this;
            var dfd = $.Deferred();
            service.getRightList().done(function(data: any) {
                let items : ItemModel[] = [];
                items.push({id: '0_null', code: null, name: "共通ルート", empRoot: 0} as any);
                _.forEach(data, function(value: any){
                    // if(value.value !== 14){
                        items.push({id: '1' + value.value, code: value.value, name: value.localizedName, empRoot: 1} as any);
                    // }
                })
                service.getConfirmName().done(function(confirm: any){
                    _.forEach(confirm, function(obj){
                        items.push({id: '2' + obj.value, code: obj.value, name: obj.localizedName, empRoot: 2} as any);
                    });
                    self.lstAppDis(items);
					// set selected all in list apptype
					// get ids 
					let ids =  _.map(ko.toJS(self.lstAppDis), (i: any) => i.id);
					self.currentAppType(ids);
                    self.loadGrid();
                });
                dfd.resolve();
            });	
            return dfd.promise();
        }
        //閉じるボタン
        closeDialog(){
            nts.uk.ui.windows.close();    
        }
        //Exceｌ出力
        printExcel(){
            const self = this;
			// get employees in KCP005
			let selectedEmployeeKCP = [] as Array<vmbase.EmployeeSearchDto>;
			_.map(ko.toJS(self.multiSelectedCode), (i: any) => {
				let list = _.filter(self.selectedEmployee(), (item: vmbase.EmployeeSearchDto) => {
					return item.employeeCode == i;
				});
				if (!_.isEmpty(list)) {
					selectedEmployeeKCP.push(list[0]);
				}
			})
			
            //対象社員を選択したかをチェックする(kiểm tra đã chọn nhân viên chưa?)
            //対象者未選択(chưa chọn nhân viên)
            if(selectedEmployeeKCP.length <= 0){
                nts.uk.ui.dialog.alert({ messageId: "Msg_184"});
                return;
            }
            //出力対象申請を選択したかチェックする(check đã chọn đơn xin để xuất ra chưa?)
            //出力対象未選択(chưa chọn đối tượng output)
            if(selectedEmployeeKCP.length <= 0){
                nts.uk.ui.dialog.alert({ messageId: "Msg_199"});
                return;    
            }
            let lstApp = [] as any;
            _.each(self.currentAppType(), function(code){
                let a = self.findTypeSelected(code);
                lstApp.push({code: a.code,
                             empRoot: a.empRoot,
                             name: a.name,
                             lowerApprove: a.lowerApprove});
            });
            
            //xuat file
            let data = new service.model.appInfor(self.baseDate(), selectedEmployeeKCP, lstApp, self.sysAtr);
            nts.uk.ui.block.invisible();
            service.saveAsExcel(data).done(()=>{
                 nts.uk.ui.block.clear();   
            }).fail(function(res: any){
                nts.uk.ui.dialog.alert({ messageId: res.messageId || res.message});
                nts.uk.ui.block.clear();
            });
        }
        findTypeSelected(id: number){
            let self = this;
            return _.find(self.lstAppDis(), function(app: any){
                return app.id == id;
            });
        }
    }
        export interface ItemModel {
            id: string;
            code: any;
            name: string;
            empRoot: number;
            lowerApprove: number;
        }

		export class ListType {
			static EMPLOYMENT = 1;
			static Classification = 2;
			static JOB_TITLE = 3;
			static EMPLOYEE = 4;
		}
	
		export interface UnitModel {
			id?: string;
	        code: string;
	        name?: string;
	        affiliationName?: string;
	        isAlreadySetting?: boolean;
	        optionalColumn?: any;
		}
		
		export class SelectType {
			static SELECT_BY_SELECTED_CODE = 1;
			static SELECT_ALL = 2;
			static SELECT_FIRST_ITEM = 3;
			static NO_SELECT = 4;
		}
		
		export interface UnitAlreadySettingModel {
			code: string;
			isAlreadySetting: boolean;
		}


    }
}
