module nts.uk.com.view.cdl008.a {

    import ListType = kcp.share.list.ListType;
    import SelectType = kcp.share.list.SelectType;
    import ComponentOption = kcp.share.list.ComponentOption;
    import TreeComponentOption = kcp.share.tree.TreeComponentOption;
    import StartMode = kcp.share.tree.StartMode;
    import getText = nts.uk.resource.getText;
    import setShare = nts.uk.ui.windows.setShared;

    export module viewmodel {
        /**
        * Screen Model.
        */
        export class ScreenModel {
            selectedMulWorkplace: KnockoutObservableArray<string>;
            selectedSelWorkplace: KnockoutObservable<string>;
            baseDate: KnockoutObservable<Date>;
            workplaces: TreeComponentOption;
            isMultipleSelect: boolean;
            isMultipleUse: boolean;
            selectedSystemType: KnockoutObservable<number>;
            restrictionOfReferenceRange: boolean;
            isDisplayUnselect: KnockoutObservable<boolean>;
            listDataDisplay: KnockoutObservableArray<any>;
            listResult: Array<any>;

            // 部門対応 #106784
            startMode: StartMode;

            constructor() {
                var self = this;
                self.baseDate = ko.observable(new Date());
                self.selectedMulWorkplace = ko.observableArray([]);
                self.selectedSelWorkplace = ko.observable('');
                self.isMultipleSelect = false;
                self.isMultipleUse = false;
                self.selectedSystemType = ko.observable(5);
                self.restrictionOfReferenceRange = true;
                self.listResult = [];
                self.listDataDisplay = ko.observableArray([]);

                var inputCDL008 = nts.uk.ui.windows.getShared('inputCDL008');
                if (inputCDL008) {
                    self.baseDate(inputCDL008.baseDate);
                    self.isMultipleSelect = inputCDL008.isMultiple;

                    if (_.isNil(inputCDL008.isShowBaseDate)) {
                        self.isMultipleUse = false;
                    } else {
                        self.isMultipleUse = inputCDL008.isShowBaseDate ? false : true;
                    }
                    if (self.isMultipleSelect) {
                        self.selectedMulWorkplace(inputCDL008.selectedCodes);
                    }
                    else {
                        self.selectedSelWorkplace(inputCDL008.selectedCodes);
                    }
                    self.selectedSystemType = inputCDL008.selectedSystemType;
                    self.restrictionOfReferenceRange = _.isNil(inputCDL008.isrestrictionOfReferenceRange) ?
                        true : inputCDL008.isrestrictionOfReferenceRange;

                    // If Selection Mode is Multiple Then not show Unselected Row
                    self.isDisplayUnselect = ko.observable(self.isMultipleSelect ? false : inputCDL008.showNoSelection);

                    // 部門対応 #106784
                    self.startMode = _.isNil(inputCDL008.startMode) ? StartMode.WORKPLACE : inputCDL008.startMode; // default workplace
                }

                self.workplaces = {
                    isShowAlreadySet: false,
                    isMultiSelect: self.isMultipleSelect,
                    isMultipleUse: self.isMultipleUse,
                    startMode: self.startMode,
                    selectType: SelectType.SELECT_BY_SELECTED_CODE,
                    isShowSelectButton: true,
                    baseDate: self.baseDate,
                    isDialog: true,
                    selectedId: null,
                    maxRows: 12,
                    tabindex: 1,
                    width: 450,
                    systemType: self.selectedSystemType,
                    restrictionOfReferenceRange: self.restrictionOfReferenceRange,
                    isShowNoSelectRow: self.isDisplayUnselect(),
                    listDataDisplay: self.listDataDisplay(),
                };
                if (self.isMultipleSelect) {
                    self.workplaces.selectedId = self.selectedMulWorkplace;
                }
                else {
                    self.workplaces.selectedId = self.selectedSelWorkplace;
                }

                if (self.startMode == StartMode.DEPARTMENT) {
                    nts.uk.ui.windows.getSelf().setTitle(getText("CDL008_5"));
                }
            }

            /**
             * function on click button selected workplace
             */
            private selectedWorkplace(): void {
                var self = this;
                var workplaceInfor : Array <any> = [];
                if (self.isMultipleSelect) {
                    if (!self.selectedMulWorkplace() || self.selectedMulWorkplace().length == 0) {
                        if (self.startMode == StartMode.WORKPLACE) {
                            nts.uk.ui.dialog.alertError({ messageId: "Msg_643" });
                        } else {
                            nts.uk.ui.dialog.alertError({ messageId: "Msg_1532" });
                        }
                        return;
                    }
                } else {
                    if (!self.isDisplayUnselect() && (!self.selectedSelWorkplace || !self.selectedSelWorkplace())) {
                        if (self.startMode == StartMode.WORKPLACE) {
                            nts.uk.ui.dialog.alertError({ messageId: "Msg_643" });
                        } else {
                            nts.uk.ui.dialog.alertError({ messageId: "Msg_1532" });
                        }
                        return;
                    }
                }

                let listWpinfor = self.getListWpinfo(self.listDataDisplay(), self);
                
                // multiple
                var selectedCode: any = self.selectedMulWorkplace();
                
                for(let i: number = 0; i < self.selectedMulWorkplace().length; i++){
                    let value = _.find(listWpinfor, x => {
                        return x.id == self.selectedMulWorkplace()[i];
                    });
                    workplaceInfor.push(new OutPut(self.selectedMulWorkplace()[i], value.code, value.name, 
                                                    value.hierarchyCode,
                                                    value.genericName,
                                                    value.displayName));
                }
                
                // only one
                if (!self.isMultipleSelect) {
                    selectedCode = self.selectedSelWorkplace();
                    let value = _.find(listWpinfor, x => {
                        return x.id == selectedCode
                    });
                    workplaceInfor.push(new OutPut(selectedCode, value.code, value.name, 
                                                    value.hierarchyCode, value.genericName, 
                                                    value.displayName));
                }
                
                setShare('outputCDL008', selectedCode);
                setShare('baseDateCDL008', self.baseDate());
                setShare('workplaceInfor', workplaceInfor);
                nts.uk.ui.windows.close();
            }

            //convert the data from a tree to a regular list
            getListWpinfo(listWp: any, parent: any): any {
                var self = this;
                for (let i = 0; i < listWp.length; i++) {

                    self.listResult.push(new OutPut(listWp[i].id, listWp[i].code, listWp[i].name, 
                                                    listWp[i].hierarchyCode, listWp[i].workplaceGeneric, 
                                                    listWp[i].workplaceDisplayName));

                    if (listWp[i].children.length > 0) {
                        parent.getListWpinfo(listWp[i].children, parent);
                    }
                }
                return self.listResult;
            }

            /**
             * close windows
             */
            private closeWindows(): void {
                nts.uk.ui.windows.setShared('CDL008Cancel', true);
                nts.uk.ui.windows.close();
            }
        }
        
        export class OutPut{
            id: string;
            code: string;
            // 職場名称
            name: string;
            // 階層コード
            hierarchyCode: string;
            // 職場総称
            genericName: string;
            // 職場表示名
            displayName: string;
            constructor(id: string, code: string, name: string, hierarchyCode: string, genericName: string, displayName: string) {
                this.id = id;
                this.code = code;
                this.name = name;
                this.hierarchyCode = hierarchyCode;
                this.genericName = genericName;
                this.displayName = displayName;
            }
        }
    }
}   