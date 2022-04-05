module cmm044.a.viewmodel {
    import getText = nts.uk.resource.getText;
    import alert = nts.uk.ui.dialog.alert;
    import setShared = nts.uk.ui.windows.setShared;
    import getShared = nts.uk.ui.windows.getShared;
    import EmployeeSearchDto = nts.uk.com.view.ccg.share.ccg.service.model.EmployeeSearchDto;
    import Ccg001ReturnedData = nts.uk.com.view.ccg.share.ccg.service.model.Ccg001ReturnedData;
    import GroupOption = nts.uk.com.view.ccg.share.ccg.service.model.GroupOption;
    import SystemType = kcp009.viewmodel.SystemType;
    import EmployeeModel = kcp009.viewmodel.EmployeeModel;
    import ComponentOption = kcp009.viewmodel.ComponentOption;

    export class ScreenModel {
        listEmployee: KnockoutObservableArray<any> = ko.observableArray([]);

        // KCP009
        employeeInputList: KnockoutObservableArray<EmployeeModel>;
        selectedItem: KnockoutObservable<string>;

        tabs: KnockoutObservableArray<any>;
        selectedTab: KnockoutObservable<string>;

        itemList: KnockoutObservableArray<BoxModel>; // agent app type options

        isEnableDelete: KnockoutObservable<boolean>;
        isEnableAdd: KnockoutObservable<boolean>;

        histItems: KnockoutObservableArray<AgentDto>;
        histSelectedItem: KnockoutObservable<string>;
        currentItem: KnockoutObservable<AgentAppDto>;

        baseDate: KnockoutObservable<Date> = ko.observable(new Date());

        constructor() {
            const self = this;
            self.employeeInputList = ko.observableArray([]);
            self.selectedItem = ko.observable(null);
            self.currentItem = ko.observable(null);
            self.tabs = ko.observableArray([
                { id: 'tab-1', title: getText("CMM044_11"), content: '.tab-content-1', enable: ko.observable(true), visible: ko.observable(true) },
                { id: 'tab-2', title: getText("CMM044_12"), content: '.tab-content-2', enable: ko.observable(true), visible: ko.observable(true) },
                { id: 'tab-3', title: getText("CMM044_37"), content: '.tab-content-3', enable: ko.observable(true), visible: ko.observable(true) },
                { id: 'tab-4', title: getText("CMM044_13"), content: '.tab-content-4', enable: ko.observable(true), visible: ko.observable(true) }
            ]);
            self.selectedTab = ko.observable('tab-1');

            self.isEnableDelete = ko.observable(true);
            self.isEnableAdd = ko.observable(true);

            self.histItems = ko.observableArray([]);
            self.histSelectedItem = ko.observable("");

            self.selectedItem.subscribe(function(newValue) {
                if (newValue) {
                    $.when(self.getAllAgen(newValue)).done(function() {
                        if (self.histItems().length > 0) {
                            self.histSelectedItem(self.histItems()[0].requestId);
                        } else {
                            self.initAgent();
                        }
                    });
                }
            });

            self.histSelectedItem.subscribe(function(requestId) {
                if (requestId) {
                    $.when(self.getAgen(self.selectedItem(), requestId)).done(function() {
                        nts.uk.ui.errors.clearAll();
                        self.isEnableDelete(true);
                        self.isEnableAdd(true);
                        if (!nts.uk.text.isNullOrEmpty(self.currentItem().agentSid1())) {
                            service.findEmployeeName(self.currentItem().agentSid1()).done(function(response) {
                                self.currentItem().employeeCodeScreen1(response ? response.employeeCode : "");
                                self.currentItem().employeeNameScreen1(response ? response.businessName : "");
                            });
                        }
                        if (!nts.uk.text.isNullOrEmpty(self.currentItem().agentSid2())) {
                            service.findEmployeeName(self.currentItem().agentSid2()).done(function(response) {
                                self.currentItem().employeeCodeScreen2(response ? response.employeeCode : "");
                                self.currentItem().employeeNameScreen2(response ? response.businessName : "");
                            });
                        }
                        if (!nts.uk.text.isNullOrEmpty(self.currentItem().agentSid3())) {
                            service.findEmployeeName(self.currentItem().agentSid3()).done(function(response) {
                                self.currentItem().employeeCodeScreen3(response ? response.employeeCode : "");
                                self.currentItem().employeeNameScreen3(response ? response.businessName : "");
                            });
                        }
                        if (!nts.uk.text.isNullOrEmpty(self.currentItem().agentSid4())) {
                            service.findEmployeeName(self.currentItem().agentSid4()).done(function(response) {
                                self.currentItem().employeeCodeScreen4(response ? response.employeeCode : "");
                                self.currentItem().employeeNameScreen4(response ? response.businessName : "");
                            });
                        }
                    });
                }
            });

            self.itemList = ko.observableArray([
                new BoxModel(0, getText("CMM044_16")),
                new BoxModel(1, getText("CMM044_17")),
                new BoxModel(2, getText("CMM044_18"))
            ]);
        }

        searchEmployee(employees: EmployeeSearchDto[]) {
            const self = this;
            self.employeeInputList.removeAll();
            _.forEach(employees, function(item: EmployeeSearchDto) {
                const input: EmployeeModel = {
                    id: item.employeeId,
                    code: item.employeeCode,
                    businessName: item.employeeName
                };
                self.employeeInputList.push(input);
            });
            const containResult = _.find(self.employeeInputList(), function(item) { return item.id == self.selectedItem(); });
            if(nts.uk.util.isNullOrUndefined(containResult)){
                if(!nts.uk.util.isNullOrEmpty(self.employeeInputList())){
                    self.selectedItem(self.employeeInputList()[0].id);
                }
            }
            self.initKCP009();
        }

        initCCG001(): void {
            const self = this;
            // Component option
            const ccgcomponent: GroupOption = {
                /** Common properties */
                systemType: 2, // システム区分
                showEmployeeSelection: false, // 検索タイプ
                showQuickSearchTab: true, // クイック検索
                showAdvancedSearchTab: true, // 詳細検索
                showBaseDate: true, // 基準日利用
                showClosure: false, // 就業締め日利用
                showAllClosure: false, // 全締め表示
                showPeriod: false, // 対象期間利用
                periodFormatYM: false, // 対象期間精度

                /** Required parameter */
                baseDate: self.baseDate().toISOString(), // 基準日
                inService: true, // 在職区分
                leaveOfAbsence: true, // 休職区分
                closed: true, // 休業区分
                retirement: true, // 退職区分

                /** Quick search tab options */
                showAllReferableEmployee: true, // 参照可能な社員すべて
                showOnlyMe: false, // 自分だけ
                showSameWorkplace: true, // 同じ職場の社員
                showSameWorkplaceAndChild: true, // 同じ職場とその配下の社員

                /** Advanced search properties */
                showEmployment: false, // 雇用条件
                showWorkplace: true, // 職場条件
                showDepartment: false,
                showClassification: false, // 分類条件
                showJobTitle: false, // 職位条件
                showWorktype: false, // 勤種条件
                isMutipleCheck: true, // 選択モード

                /** Return data */
                returnDataFromCcg001: function(data: Ccg001ReturnedData) {
                    self.listEmployee(data.listEmployee);
                    self.searchEmployee(data.listEmployee);
                }
            };

            // Start component
            $('#ccgcomponent').ntsGroupComponent(ccgcomponent);
        }

        initKCP009() {
            const self = this;
            const listComponentOption: ComponentOption = {
                systemReference: SystemType.EMPLOYMENT,
                isDisplayOrganizationName: false,
                employeeInputList: self.employeeInputList,
                targetBtnText: getText("KCP009_3"),
                selectedItem: self.selectedItem,
                tabIndex: 1
            };
            $('#emp-component').ntsLoadListComponent(listComponentOption);
        }

        start(): JQueryPromise<any> {
            let self = this;
            let dfd = $.Deferred();
            self.currentItem(new AgentAppDto(null, "", "", "", "", null, "", null, "", null, "", null));
            self.initCCG001();

            if (self.employeeInputList().length == 0) {
                self.isEnableDelete(false);
                self.isEnableAdd(false);
                service.searchEmployeeByLogin(self.baseDate()).done(data => {
                    if (data.length > 0) {
                        self.searchEmployee(data);
                        self.listEmployee(data);
                    }
                }).fail(function(error) {
                    alert(error);
                });
            }
            dfd.resolve();
            return dfd.promise();

        }

        /**
         * find agen by employee
         */
        getAllAgen(employeeId: string): JQueryPromise<any> {
            const self = this;
            const dfd = $.Deferred();
            self.histItems.removeAll();
            service.findAllAgent(employeeId).done(function(agent_arr: Array<IAgentDto>) {
                if (agent_arr && agent_arr.length) {
                    self.histItems.removeAll();
                    agent_arr.forEach(agent => {
                        self.histItems.push(new AgentDto(agent));
                    });
                }
                dfd.resolve();
            }).fail(function(error) {
                alert(error.message);
                dfd.reject(error);
            });

            return dfd.promise();
        }

        /**
         * find agent by requestId
         */
        getAgen(employeeId: string, requestId: string): JQueryPromise<any> {
            const self = this;
            const dfd = $.Deferred();
            if (!requestId) {
                return;
            }

            const param = {
                employeeId: employeeId,
                requestId: requestId
            };
            service.findAgent(param).done(function(agent: IAgentDto) {
                self.currentItem(new AgentAppDto(
                        employeeId, requestId,
                        agent.startDate, agent.endDate,
                        agent.agentSid1, agent.agentAppType1,
                        agent.agentSid2, agent.agentAppType2,
                        agent.agentSid3, agent.agentAppType3,
                        agent.agentSid4, agent.agentAppType4
                    )
                );
                $("#daterangepicker").find(".ntsStartDatePicker").focus();
                dfd.resolve();
            }).fail(function(error) {
                alert(error.message);
                dfd.reject(error);
            });

            return dfd.promise();
        }

        /**
         * Find agent
         */
        findInHistItem(employeeId: string, requestId: string): AgentDto {
            const self = this;
            return _.find(self.histItems(), function(item: any) {
                if (item.employeeId == employeeId && item.requestId == requestId) {
                    return item;
                }
            });
        }

        /**
         * Add new agent and Update agent
         */
        addAgent() {
            const self = this;
            $(".nts-input").trigger("validate");
            if (nts.uk.ui.errors.hasError()) {
                return;
            }

            nts.uk.ui.block.invisible();

            const agent = ko.toJSON(self.currentItem());
            // agent["employeeId"] = self.selectedItem();
            const existsItem = self.findInHistItem(self.currentItem().employeeId(), self.histSelectedItem());

            if (existsItem) {
                service.updateAgent(agent).done(function() {
                    self.getAllAgen(self.selectedItem());
                    nts.uk.ui.dialog.info({messageId: "Msg_15"}).then(() => {
                        $("#daterangepicker").find(".ntsStartDatePicker").focus();
                    });
                }).fail(function(error) {
                    alert(error);
                }).always(function() {
                    nts.uk.ui.block.clear();
                })
            } else {
                service.addAgent(agent).done(function(res) {
                    var resObj = ko.toJS(res);
                    if (self.histSelectedItem) {
                        self.getAllAgen(self.selectedItem());
                        self.histSelectedItem(res);
                        nts.uk.ui.dialog.info({messageId: "Msg_15"}).then(() => {
                            $("#daterangepicker").find(".ntsStartDatePicker").focus();
                        });
                    }
                }).fail(function(error) {
                    alert(error).then(() => {
                        if (error.messageId == "Msg_141") {
                            $("#A3_007").focus();
                        }
                    });
                }).always(function() {
                    nts.uk.ui.block.clear();
                })
            }
        }

        deleteAgent() {
            const self = this;
            let index_of_itemDelete = _.findIndex(self.histItems(), ['requestId', self.histSelectedItem()]);
            nts.uk.ui.dialog.confirm("データを削除します。\r\nよろしいですか？").ifYes(function() {
                const agent = {
                    employeeId: self.selectedItem(),
                    requestId: self.currentItem().requestId()
                };
                service.deleteAgent(agent).done(function() {
                    $.when(self.getAllAgen(self.selectedItem())).done(function() {
                        let requestId = "";
                        if (self.histItems().length == 0) {
                            self.initAgent();
                        } else if (self.histItems().length == 1) {
                            requestId = self.histItems()[0].requestId;
                        } else if (index_of_itemDelete == self.histItems().length) {
                            requestId = self.histItems()[index_of_itemDelete - 1].requestId;
                        } else {
                            requestId = self.histItems()[index_of_itemDelete].requestId;
                        }
                        nts.uk.ui.dialog.info({messageId:"Msg_16"}).then(() => {
                            nts.uk.ui.errors.clearAll();
                            self.histSelectedItem(requestId);
                            $("#daterangepicker").find(".ntsStartDatePicker").focus();
                        });
                    });
                }).fail(function(error) {
                    alert(error);
                });
            }).ifNo(function() {
            });
        }

        initAgent(): void {
            let self = this;
            nts.uk.ui.errors.clearAll();
            if (!nts.uk.util.isNullOrUndefined(self.selectedItem())) {
                self.isEnableDelete(false);
                self.isEnableAdd(true);
                self.selectedTab('tab-1');
                self.histSelectedItem("");
                self.currentItem(new AgentAppDto(self.selectedItem(), "", "", "", "", null, "", null, "", null, "", null));
                _.defer(() => {
                    $("#daterangepicker").find(".ntsStartDatePicker").focus();
                });
            }
        }

        openCDialog() {
            let self = this;
            // nts.uk.ui.block.invisible();
            nts.uk.ui.windows.setShared('cmm044_Email', {
                startDate: self.currentItem().startDate(),
                endDate: self.currentItem().endDate(),
                targetId: self.selectedItem(),
                targetCode: _.find(self.employeeInputList(), e => e.id == self.selectedItem()).code,
                targetName: _.find(self.employeeInputList(), e => e.id == self.selectedItem()).businessName,
                approverId: self.currentItem().agentSid1(),
                approverCode: self.currentItem().employeeCodeScreen1(),
                approverName: self.currentItem().employeeNameScreen1()
            });
            nts.uk.ui.windows.sub.modal('/view/cmm/044/c/index.xhtml').onClosed(function(): any {
                nts.uk.ui.block.clear();
                $("#daterangepicker").find(".ntsStartDatePicker").focus();
            });

        }

        openDDialog() {
            let self = this;
            nts.uk.ui.block.invisible();
            nts.uk.ui.windows.setShared('CMM044_TABS', self.tabs());
            nts.uk.ui.windows.sub.modal('/view/cmm/044/d/index.xhtml').onClosed(function(): any {
                nts.uk.ui.block.clear();
                $("#daterangepicker").find(".ntsStartDatePicker").focus();
            });

        }

        exportExcel(){
            let self = this;
            nts.uk.ui.block.invisible();
            service.exportExcel(self.listEmployee()).done(function() {

            }).fail(function(error) {
                alert(error);
            }).always(function() {
                nts.uk.ui.block.clear();
            });
        }

    }

    class BoxModel {
        id: number;
        name: string;
        constructor(id: number, name: string) {
            const self = this;
            self.id = id;
            self.name = name;
        }
    }

    export interface IAgentDto {
        companyId: string;
        employeeId: string;
        requestId: string;
        startDate: string;
        endDate: string;
        agentSid1: string;
        agentAppType1: number;
        agentSid2: string;
        agentAppType2: number;
        agentSid3: string;
        agentAppType3: number;
        agentSid4: string;
        agentAppType4: number;
    }

    class AgentDto {
        employeeId: string;
        requestId: string;
        startDate: string;
        endDate: string;
        text: string;
        constructor(agent: IAgentDto) {
            this.employeeId = agent.employeeId;
            this.requestId = agent.requestId;
            this.startDate = agent.startDate;
            this.endDate = agent.endDate;
            this.text = agent.startDate + ' ～ ' + agent.endDate;
        }
    }

    class AgentAppDto {
        employeeId: KnockoutObservable<string>;
        requestId: KnockoutObservable<string>;

        startDate: KnockoutObservable<string>;
        endDate: KnockoutObservable<string>;
        dateValue: KnockoutObservable<{startDate: string, endDate: string}>;

        agentSid1: KnockoutObservable<string>;
        agentAppType1: KnockoutObservable<number>;
        displayEmployeeInfo1: KnockoutObservable<boolean>;
        employeeCodeScreen1: KnockoutObservable<string>;
        employeeNameScreen1: KnockoutObservable<string>;

        agentSid2: KnockoutObservable<string>;
        agentAppType2: KnockoutObservable<number>;
        displayEmployeeInfo2: KnockoutObservable<boolean>;
        employeeCodeScreen2: KnockoutObservable<string>;
        employeeNameScreen2: KnockoutObservable<string>;

        agentSid3: KnockoutObservable<string>;
        agentAppType3: KnockoutObservable<number>;
        displayEmployeeInfo3: KnockoutObservable<boolean>;
        employeeCodeScreen3: KnockoutObservable<string>;
        employeeNameScreen3: KnockoutObservable<string>;

        agentSid4: KnockoutObservable<string>;
        agentAppType4: KnockoutObservable<number>;
        displayEmployeeInfo4: KnockoutObservable<boolean>;
        employeeCodeScreen4: KnockoutObservable<string>;
        employeeNameScreen4: KnockoutObservable<string>;

        constructor(employeeId: string, requestId: string, startDate: string, endDate: string, agentSid1: string, agentAppType1: number, agentSid2: string, agentAppType2: number, agentSid3: string, agentAppType3: number, agentSid4: string, agentAppType4: number) {
            this.employeeId = ko.observable(employeeId);
            this.requestId = ko.observable(requestId);

            this.startDate = ko.observable(startDate ? new Date(startDate).toISOString() : "");
            this.endDate = ko.observable(endDate ? new Date(endDate).toISOString() : "");
            this.dateValue = ko.observable({startDate: startDate, endDate: endDate});

            this.agentSid1 = ko.observable(agentSid1);
            this.agentAppType1 = ko.observable(agentAppType1 || 0);
            this.displayEmployeeInfo1 = ko.computed(() => {return this.agentAppType1() == 0;}, this);
            this.employeeCodeScreen1 = ko.observable("");
            this.employeeNameScreen1 = ko.observable("");

            this.agentSid2 = ko.observable(agentSid2);
            this.agentAppType2 = ko.observable(agentAppType2 || 2);
            this.displayEmployeeInfo2 = ko.computed(() => {return this.agentAppType2() == 0;}, this);
            this.employeeCodeScreen2 = ko.observable("");
            this.employeeNameScreen2 = ko.observable("");

            this.agentSid3 = ko.observable(agentSid3);
            this.agentAppType3 = ko.observable(agentAppType3 || 2);
            this.displayEmployeeInfo3 = ko.computed(() => {return this.agentAppType3() == 0;}, this);
            this.employeeCodeScreen3 = ko.observable("");
            this.employeeNameScreen3 = ko.observable("");

            this.agentSid4 = ko.observable(agentSid4);
            this.agentAppType4 = ko.observable(agentAppType4 || 2);
            this.displayEmployeeInfo4 = ko.computed(() => {return this.agentAppType4() == 0;}, this);
            this.employeeCodeScreen4 = ko.observable("");
            this.employeeNameScreen4 = ko.observable("");

            this.dateValue.subscribe(value => {
                this.startDate(value.startDate ? new Date(value.startDate).toISOString() : "");
                this.endDate(value.endDate ? new Date(value.endDate).toISOString() : "");
            });
        }

        openCDL021(tab: number) {
            const self = this;
            nts.uk.ui.block.invisible();
            const selectedId = [];
            switch (tab) {
                case 1:
                    selectedId.push(self.agentSid1());
                    break;
                case 2:
                    selectedId.push(self.agentSid2());
                    break;
                case 3:
                    selectedId.push(self.agentSid3());
                    break;
                case 4:
                    selectedId.push(self.agentSid4());
                    break;
                default:
                    break;
            }

            // Set Param
            setShared('CDL009Params', {
                // isMultiSelect For Employee List Kcp005
                isMultiSelect: false,
                // For Workplace List Kcp004
                selectedIds: selectedId,
                // For Workplace List Kcp004
                baseDate: new Date(),
                // Workplace or Department
                target: 1
            }, true);

            nts.uk.ui.windows.sub.modal('/view/cdl/009/a/index.xhtml').onClosed(function(): any {
                var isCancel = getShared('CDL009Cancel');
                var employeeId = getShared('CDL009Output');
                if (isCancel) {
                    return;
                }
                if (employeeId) {
                    service.findEmployeeName(employeeId).done(function(response: any) {
                        switch (tab) {
                            case 1:
                                self.agentSid1(employeeId);
                                self.employeeCodeScreen1(response ? response.employeeCode : "");
                                self.employeeNameScreen1(response ? response.businessName : "");
                                break;
                            case 2:
                                self.agentSid2(employeeId);
                                self.employeeCodeScreen2(response ? response.employeeCode : "");
                                self.employeeNameScreen2(response ? response.businessName : "");
                                break;
                            case 3:
                                self.agentSid3(employeeId);
                                self.employeeCodeScreen3(response ? response.employeeCode : "");
                                self.employeeNameScreen3(response ? response.businessName : "");
                                break;
                            case 4:
                                self.agentSid4(employeeId);
                                self.employeeCodeScreen4(response ? response.employeeCode : "");
                                self.employeeNameScreen4(response ? response.businessName : "");
                                break;
                            default:
                                break;
                        }
                    });
                }
                nts.uk.ui.block.clear();
            });
        }
    }
}