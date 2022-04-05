module nts.uk.com.view.cps001.i.vm {
    import getText = nts.uk.resource.getText;
    import getShared = nts.uk.ui.windows.getShared;
    import info = nts.uk.ui.dialog.info;
    import showDialog = nts.uk.ui.dialog;
    import alert = nts.uk.ui.dialog.alert;
    import error = nts.uk.ui.dialog.alertError;
    import clearError = nts.uk.ui.errors.clearAll;
    let __viewContext: any = window['__viewContext'] || {},
        block = window["nts"]["uk"]["ui"]["block"]["grayout"],
        unblock = window["nts"]["uk"]["ui"]["block"]["clear"],
        invisible = window["nts"]["uk"]["ui"]["block"]["invisible"];

    export class ScreenModel {

        createMode: KnockoutObservable<boolean>;

        enbbtnNewmode: KnockoutObservable<boolean> = ko.observable(true);
        enbbtnDelete: KnockoutObservable<boolean> = ko.observable(true);


        checked: KnockoutObservable<boolean> = ko.observable(false);

        // list data
        listData: KnockoutObservableArray<ISpecialLeaveRemaining> = ko.observableArray([]);
        listFullData: KnockoutObservableArray<ISpecialLeaveRemaining> = ko.observableArray([]);
        currentValue: KnockoutObservable<any> = ko.observable();
        //grant
        grantDateTitle: KnockoutObservable<string> = ko.observable(null);
        dateGrantInp: KnockoutObservable<string> = ko.observable(null);

        //exp
        expDateTitle: KnockoutObservable<string> = ko.observable(null);
        deadlineDateInp: KnockoutObservable<string> = ko.observable(null);

        expStateTitle: KnockoutObservable<string> = ko.observable(null);
        roundingRules: KnockoutObservableArray<any>;

        selectedRuleCode: any;

        statusOfUse: KnockoutObservable<number> = ko.observable(0);

        // grant detail
        dayNumberOfGrantsTitle: KnockoutObservable<string> = ko.observable(null);
        dayNumberOfGrants: KnockoutObservable<number> = ko.observable(null);
        grantTimeTitle: KnockoutObservable<string> = ko.observable(null);
        grantTime: KnockoutObservable<number> = ko.observable(null);

        //  use detail
        dayNumberOfUseTitle: KnockoutObservable<string> = ko.observable(null);
        dayNumberOfUse: KnockoutObservable<number> = ko.observable(null);
        useTimeTitle: KnockoutObservable<string> = ko.observable(null);
        useTime: KnockoutObservable<number> = ko.observable(null);

        // Over detail
        dayNumberOverTitle: KnockoutObservable<string> = ko.observable(null);
        dayNumberOver: KnockoutObservable<number> = ko.observable(null);
        timeOverTitle: KnockoutObservable<string> = ko.observable(null);
        timeOver: KnockoutObservable<number> = ko.observable(null);

        // Reaming detail
        dayNumberOfReamTitle: KnockoutObservable<string> = ko.observable(null);
        dayNumberOfReam: KnockoutObservable<number> = ko.observable(null);
        timeReamTitle: KnockoutObservable<string> = ko.observable(null);
        timeReam: KnockoutObservable<number> = ko.observable(null);

        columns: KnockoutObservableArray<any>;
        useTimeH: KnockoutObservable<boolean>;
        timeExeededH: KnockoutObservable<boolean>;
        timeReamH: KnockoutObservable<boolean>;
        grantTimeH: KnockoutObservable<boolean>;

        //
        nameDateGrantInp: KnockoutObservable<string> = ko.observable('');
        nameDeadlineDateInp: KnockoutObservable<string> = ko.observable('');

        nameDayNumberOfGrant: KnockoutObservable<string> = ko.observable(null);
        namegrantTime: KnockoutObservable<string> = ko.observable(null);

        nameDayNumberOfUse: KnockoutObservable<string> = ko.observable(null);
        nameUseTime: KnockoutObservable<string> = ko.observable(null);

        nameDayNumberOver: KnockoutObservable<string> = ko.observable(null);
        nameTimeOver: KnockoutObservable<string> = ko.observable(null);

        nameDayNumberOfRemain: KnockoutObservable<string> = ko.observable(null);
        nameTimeReam: KnockoutObservable<string> = ko.observable(null);

        //data recive from cps001.a
        categoryCode: KnockoutObservable<string> = ko.observable(null);
        sid: KnockoutObservable<string> = ko.observable(null);

        constructor() {
            let self = this,
                data: any = getShared('CPS001GHI_VALUES');

            self.categoryCode(data.ctgCode);
            self.sid(data.sid);

            self.expStateTitle = ko.observable('expDateTitle');
            self.roundingRules = ko.observableArray([
                { code: 1, name: '使用可能' },
                { code: 0, name: '期限切れ' }
            ]);
            self.selectedRuleCode = ko.observable(1);

            // Subsribe table
            self.currentValue.subscribe(value => {
                if (value) {
                    service.getDetail(value).done((result: ISpecialLeaveRemaining) => {
                        if (result) {
                            self.bindingData(result);
                            $("#idDateGrantInp").focus();
                        }
                    });
                }
                self.activeBtn();
                clearError();
            });

            // Subscribe checkbox
            self.checked.subscribe(value => {
                let self = this;
                self.activeBtn();
                clearError();
                block();
                self.loadData().done(() => {
                    if (self.listData().length > 0) {
                        if (value) {
                            self.listData(self.convertData(self.listFullData()));
                            //self.currentValue(self.listData()[0].specialid);
                        } else {
                            self.listData(self.convertData(_.filter(self.listFullData(), function(item: any) {
                                return item.expStatus == 1;
                            })));
                        }
                        // Set focus
                        let index = _.findIndex(self.listData(), (item) => { return item.specialid == self.currentValue(); });

                        if (index == -1) {
                            self.currentValue(self.listData()[0].specialid);
                        }
                    } else {
                        self.newMode();
                    }
                    unblock();
                    clearError();
                });
                $("#idDateGrantInp").focus();
            });

            self.deadlineDateInp.subscribe(value => {
                let self = this,
                    grantDate = moment.utc(self.dateGrantInp(), "YYYY/MM/DD"),
                    deadline = moment.utc(self.deadlineDateInp(), "YYYY/MM/DD");
                if (((new Date(deadline._d)) > (new Date(grantDate._d)))) {
                    var checkValiGrantDate = moment(grantDate._i, "YYYY/MM/DD", undefined, true);

                    if (($('#idDateGrantInp').ntsError('check')) && checkValiGrantDate.isValid()) {
                        $('#idDateGrantInp').ntsError('clear');
                    }
                }
            });


        }

        loadData(): JQueryPromise<any> {
            let self = this, dfd = $.Deferred();
            let ctgCode: IData = self.genSpecialCode(self.categoryCode());

            service.getAllList(self.sid(), ctgCode.specialCode).done((data: Array<ISpecialLeaveRemaining>) => {
                if (data && data.length > 0) {
                    self.listFullData(data);
                    if (self.checked()) {
                        self.listData(self.convertData(_.filter(self.listFullData(), function(item: any) {
                            return item;
                        })));
                    } else {
                        self.listData(self.convertData(_.filter(self.listFullData(), function(item: any) {
                            return item.expStatus == 1;
                        })));
                    }


                    if (self.listData().length > 0) {
                        // Set focus
                        //self.currentValue(self.listData()[index].specialid);
                    } else {
                        self.newMode();
                    }
                } else {
                    self.listData([]);
                    self.newMode();
                }
                dfd.resolve();
                unblock();
            }).fail((_data) => {
                unblock();

            });
            return dfd.promise();
        }



        public startPage() {

            let self = this;
            block();
            self.getItemDef();
            self.loadData().done(() => {
                if (self.listData().length > 0) {
                    self.currentValue(self.listData()[0].specialid);
                } else {
                    self.newMode();
                }
                clearError();
            });

        }

        /**
        * Convert data to new array.
        */
        private convertData(dataList: Array<ISpecialLeaveRemaining>): Array<ISpecialLeaveRemaining> {
            let self = this,
                res: Array<any> = _.map(dataList, item => {
                    return {
                        specialid: item.specialid, sid: item.sid, specialLeaCode: item.specialLeaCode,
                        grantDate: item.grantDate, deadlineDate: item.deadlineDate,
                        expStatus: self.formatEnum(item.expStatus), registerType: item.registerType,
                        numberDayGrant: self.formatDate(item.numberDayGrant), timeGrant: self.formatTime(item.timeGrant),
                        numberDayUse: self.formatDate(item.numberDayUse), timeUse: self.formatTime(item.timeUse),
                        numberDaysOver: self.formatDate(item.numberDaysOver), timeOver: self.formatTime(item.timeOver),
                        numberDayRemain: self.formatDate(item.numberDayRemain), timeRemain: self.formatTime(item.timeRemain)
                    }
                });

            return res;
        }

        newMode() {
            let self = this;
            self.currentValue(null);
            self.enbbtnNewmode(false);
            self.enbbtnDelete(false);
            self.dateGrantInp(null);
            self.deadlineDateInp(null);
            self.dayNumberOfGrants(null);
            self.grantTime(null);
            self.dayNumberOfUse(null);
            self.useTime(null);
            self.dayNumberOfReam(null);
            self.timeReam(null);
            self.dayNumberOver(null);
            self.timeOver(null);
            self.selectedRuleCode(1);
            $("#idDateGrantInp").focus();
            nts.uk.ui.errors.clearAll();
        }

        Save() {
            let self = this,
                grantDate = moment.utc(self.dateGrantInp(), "YYYY/MM/DD"),
                deadline = moment.utc(self.deadlineDateInp(), "YYYY/MM/DD"),
                ctgCode: IData = self.genSpecialCode(self.categoryCode());

            $("#idDateGrantInp").trigger("validate");
            $("#idDeadline").trigger("validate");
            $("#dayNumberOfGrants").trigger("validate");
            $("#dayNumberOfUse").trigger("validate");
            $("#dayNumberOver").trigger("validate");
            $("#dayNumberOfReam").trigger("validate");



            if ((new Date(deadline._d)) < (new Date(grantDate._d))) {
                $('#idDateGrantInp').ntsError('set', { messageId: "Msg_1023" });
                return;
            }

            if (nts.uk.ui.errors.hasError()) {
                return;
            }

            let currentRow: ISpecialLeaveRemaining = _.find(ko.toJS(self.listData), function(item: any) { return item.specialid == self.currentValue(); });
            //sid = "1B3D3CC4-90FD-4992-9566-12EC72827E4C" || __viewContext.user.employeeId
            let command = {
                specialid: currentRow == undefined ? null : currentRow.specialid,
                sid: self.sid(),
                specialLeaCode: ctgCode.specialCode,
                grantDate: self.dateGrantInp(), deadlineDate: self.deadlineDateInp(),
                expStatus: self.selectedRuleCode(), registerType: null,
                numberDayGrant: self.dayNumberOfGrants(), timeGrant: self.grantTime(),
                numberDayUse: self.dayNumberOfUse(), timeUse: self.useTime(),
                numberDaysOver: self.dayNumberOver(), timeOver: self.timeOver(),
                numberDayRemain: self.dayNumberOfReam(), timeRemain: self.timeReam()
            };
            // call service savedata
            block();

            let saveItemIndex = _.findIndex(self.listData(), (item) => { return item.specialid == self.currentValue(); });

            let ids: Array<string> = _.map(self.listData(), x => x.specialid);

            service.saveData(command).done((_data: any) => {
                if (command.specialid) {
                    self.loadData().done(() => {
                        nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(function() {
                            if (ids.length == self.listData().length) {
                                self.currentValue(self.listData()[saveItemIndex].specialid);
                            } else if ((self.listData().length > 0) && (ids.length != self.listData().length)) {
                                self.currentValue(self.listData()[0].specialid);
                            }
                            clearError();
                            $("#idDateGrantInp").focus();
                        });
                    });

                } else {
                    self.loadData().done(() => {
                        nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(function() {
                            if (self.listData().length > 0) {
                                let newItem = _.find(self.listData(), x => ids.indexOf(x.specialid) == -1);
                                let saveItemIndex = _.findIndex(self.listData(), (item) => { return item.specialid == newItem.specialid; });
                                self.currentValue(self.listData()[saveItemIndex].specialid);
                            }
                            clearError();
                            $("#idDateGrantInp").focus();
                        });
                    });
                }
                clearError();
                unblock();

            }).fail((error: any) => {
                nts.uk.ui.dialog.alertError({ messageId: error.messageId });
                unblock();
            });
            self.activeBtn();

        }

        activeBtn() {
            let self = this;
            self.enbbtnNewmode(true);
            self.enbbtnDelete(true);
        }

        Delete() {
            let self = this;
            if (self.currentValue()) {
                nts.uk.ui.dialog.confirm({ messageId: "Msg_18" })
                    .ifYes(() => {

                        let delItemIndex = _.findIndex(self.listData(), (item) => { return item.specialid == self.currentValue(); });

                        let selectedId;
                        if (delItemIndex == self.listData().length - 1) {
                            if (self.listData().length > 1) {
                                selectedId = self.listData()[delItemIndex - 1].specialid;
                            }
                        } if (delItemIndex == 0) {
                            selectedId = self.listData()[0].specialid;
                        } else {
                            selectedId = self.listData()[delItemIndex].specialid;
                        }

                        let currentRow: ISpecialLeaveRemaining = _.find(ko.toJS(self.listData), function(item: ISpecialLeaveRemaining) { return item.specialid == self.currentValue(); });
                        let itemListLength = self.listData().length;

                        if (currentRow != undefined) {
                            let itemListLength = self.listData().length;
                            service.remove(currentRow.specialid).done((_data: any) => {
                                nts.uk.ui.dialog.info({ messageId: "Msg_16" }).then(function() {
                                    if (itemListLength === 1) {
                                        self.loadData().done(() => { });
                                    } else if (itemListLength - 1 === delItemIndex) {
                                        self.loadData().done(() => {
                                            self.currentValue(self.listData()[delItemIndex - 1].specialid);
                                        });
                                    } else if (itemListLength - 1 > delItemIndex) {
                                        self.loadData().done(() => {
                                            self.currentValue(self.listData()[delItemIndex].specialid);
                                        });
                                    }
                                });

                            }).always(function() {
                                unblock();
                            });
                        }
                    }).then(() => {
                        unblock();
                    });
            }


        }

        closeDialog() {
            nts.uk.ui.windows.close();
        }

        bindingData(result: ISpecialLeaveRemaining): void {
            let self = this;

            self.dateGrantInp(result.grantDate);
            self.deadlineDateInp(result.deadlineDate);
            self.selectedRuleCode(result.expStatus);

            // detail of grant
            self.dayNumberOfGrants(result.numberDayGrant);
            self.grantTime(result.timeGrant == 0 ? 0 : result.timeGrant);

            // detail of Use
            self.dayNumberOfUse(result.numberDayUse);
            self.useTime(result.timeUse == 0 ? 0 : result.timeUse);

            // Exeeded detail
            self.dayNumberOver(result.numberDaysOver);
            self.timeOver(result.timeOver == 0 ? 0 : result.timeOver);

            // Reaming detail
            self.dayNumberOfReam(result.numberDayRemain);
            self.timeReam(result.timeRemain == 0 ? 0 : result.timeRemain);
        }

        formatDate(value) {
            if (value) {
                return value >= 0 ? "&nbsp;" + value + '日' : value + '日';
            } else {
                return "&nbsp;0日";
            }
        }

        formatEnum(value: number) {
            return value == 1 ? '使用可能' : '期限切れ';
        }

        formatTime(value: number) {
            if (value) {
                let hour = Math.floor(Math.abs(value) / 60);
                let minutes = Math.floor(Math.abs(value) % 60);
                let result = hour + ':' + (minutes < 10 ? ("0" + minutes) : minutes);
                return value >= 0 ? "&nbsp;" + result : '-' + result;
            } else {
                return "&nbsp;0:00";
            }
        }





        getItemDef() {
            let self = this;
            let ctgCode: IData = self.genSpecialCode(self.categoryCode());
            service.getItemDef(ctgCode.ctgCodeChirld).done((data: Array<IItem>) => {
                if (!data[6].display && !data[9].display && !data[11].display && !data[14].display) {
                    var currentDialog = nts.uk.ui.windows.getSelf();
                    //currentDialog.setWidth(628);
                    currentDialog.$dialog.dialog('option','width',628);
                }
                self.setItemDefValue(data).done(() => {
                    self.setGridList();
                });
            }).fail((data) => {
                self.setGridList();
            });
        }
        setItemDefValue(data: Array<IItem>): JQueryPromise<any> {
            let self = this, dfd = $.Deferred();
            $("td[data-itemCode]").each(function() {
                let itemCodes = $(this).attr('data-itemcode');
                if (itemCodes) {
                    let itemCodeArray = itemCodes.split(" ");
                    _.forEach(itemCodeArray, (itemCode) => {
                        let itemDef: IItem = _.find(data, (item) => {
                            return item.itemCode == itemCode;
                        });
                        if (itemDef) {
                            if (itemDef.display) {
                                $(this).children().first().html("<label>" + itemDef.itemName + "</label>");
                            } else {
                                $(this).parent().css("display", "none");
                            }
                            let timeType = itemCodeArray[itemCodeArray.length - 1];
                            switch (timeType) {
                                case "grantDate":
                                    self.nameDateGrantInp(itemDef.itemName);
                                    break;
                                case "deadlineDate":
                                    self.nameDeadlineDateInp(itemDef.itemName);
                                    break;
                                case "dayNumberOfGrants":
                                    self.nameDayNumberOfGrant(itemDef.itemName);
                                    break;
                                case "dayNumberOfUse":
                                    self.nameDayNumberOfUse(itemDef.itemName);
                                    break;
                                case "dayNumberOver":
                                    self.nameDayNumberOver(itemDef.itemName);
                                    break;
                                case "dayNumberOfReam":
                                    self.nameDayNumberOfRemain(itemDef.itemName);
                                    break;
                                case "grantTime":
                                    self.grantTimeH = ko.observable(!itemDef.display);
                                    self.namegrantTime(itemDef.itemName);
                                    break;
                                case "useTime":
                                    self.useTimeH = ko.observable(!itemDef.display);
                                    self.nameUseTime(itemDef.itemName);
                                    break;
                                case "timeOver":
                                    self.timeExeededH = ko.observable(!itemDef.display);
                                    self.nameTimeOver(itemDef.itemName);
                                    break;
                                case "timeReam":
                                    self.timeReamH = ko.observable(!itemDef.display);
                                    self.nameTimeReam(itemDef.itemName);
                                    break;
                            }


                        }
                    });
                }
                dfd.resolve();
            });

            return dfd.promise();
        }

        setGridList() {
            let self = this;
            self.columns = ko.observableArray([
                { headerText: nts.uk.resource.getText('CPS001_118'), key: 'specialid', width: 0 },
                { headerText: nts.uk.resource.getText('CPS001_118'), key: 'grantDate', width: 100 },
                { headerText: nts.uk.resource.getText('CPS001_119'), key: 'deadlineDate', width: 100 },
                { headerText: nts.uk.resource.getText('CPS001_120'), key: 'numberDayGrant', width: 75 },
                { headerText: nts.uk.resource.getText('CPS001_128'), key: 'timeGrant', width: 70, hidden: self.grantTimeH() },
                { headerText: nts.uk.resource.getText('CPS001_121'), key: 'numberDayUse', width: 75 },
                { headerText: nts.uk.resource.getText('CPS001_122'), key: 'timeUse', width: 70, hidden: self.useTimeH() },
                { headerText: nts.uk.resource.getText('CPS001_130'), key: 'numberDaysOver', width: 75 },
                { headerText: nts.uk.resource.getText('CPS001_131'), key: 'timeOver', width: 70, hidden: self.timeExeededH() },
                { headerText: nts.uk.resource.getText('CPS001_123'), key: 'numberDayRemain', width: 75 },
                { headerText: nts.uk.resource.getText('CPS001_149'), key: 'timeRemain', width: 70, hidden: self.timeReamH() },
                { headerText: nts.uk.resource.getText('CPS001_129'), key: 'expStatus', width: 90 }
            ]);
            let table: string = '<table tabindex="5" id="sel_item_grid" data-bind="ntsGridList: { height: 282, options: listData, primaryKey:\'specialid\',columns:columns,multiple: false, value: currentValue , rows :10 }"></table>';
            $("#tbl").html(table);
            ko.applyBindings(self, $("#tbl")[0]);
        }

        genSpecialCode(categoryCode: string): IData {

            switch (categoryCode) {
                case 'CS00025':
                    return {
                        specialCode: 1,
                        ctgCodeChirld: 'CS00039'
                    };
                case 'CS00026':
                    return {
                        specialCode: 2,
                        ctgCodeChirld: 'CS00040'
                    };
                case 'CS00027':
                    return {
                        specialCode: 3,
                        ctgCodeChirld: 'CS00041'
                    };
                case 'CS00028':
                    return {
                        specialCode: 4,
                        ctgCodeChirld: 'CS00042'
                    };
                case 'CS00029':
                    return {
                        specialCode: 5,
                        ctgCodeChirld: 'CS00043'
                    };
                case 'CS00030':
                    return {
                        specialCode: 6,
                        ctgCodeChirld: 'CS00044'
                    };
                case 'CS00031':
                    return {
                        specialCode: 7,
                        ctgCodeChirld: 'CS00045'
                    };
                case 'CS00032':
                    return {
                        specialCode: 8,
                        ctgCodeChirld: 'CS00046'
                    };
                case 'CS00033':
                    return {
                        specialCode: 9,
                        ctgCodeChirld: 'CS00047'
                    };
                case 'CS00034':
                    return {
                        specialCode: 10,
                        ctgCodeChirld: 'CS00048'
                    };
                case 'CS00049':
                    return {
                        specialCode: 11,
                        ctgCodeChirld: 'CS00059'
                    };
                case 'CS00050':
                    return {
                        specialCode: 12,
                        ctgCodeChirld: 'CS00060'
                    };
                case 'CS00051':
                    return {
                        specialCode: 13,
                        ctgCodeChirld: 'CS00061'
                    };
                case 'CS00052':
                    return {
                        specialCode: 14,
                        ctgCodeChirld: 'CS00062'
                    };
                case 'CS00053':
                    return {
                        specialCode: 15,
                        ctgCodeChirld: 'CS00063'
                    };
                case 'CS00054':
                    return {
                        specialCode: 16,
                        ctgCodeChirld: 'CS00064'
                    };
                case 'CS00055':
                    return {
                        specialCode: 17,
                        ctgCodeChirld: 'CS00065'
                    };
                case 'CS00056':
                    return {
                        specialCode: 18,
                        ctgCodeChirld: 'CS00066'
                    };
                case 'CS00057':
                    return {
                        specialCode: 19,
                        ctgCodeChirld: 'CS00067'
                    };
                case 'CS00058':
                    return {
                        specialCode: 20,
                        ctgCodeChirld: 'CS00068'
                    };
            }
        }


    }

    // data truyen tu man cps001.a
    interface IData {
        specialCode: number;
        ctgCodeChirld: string;
    }

    interface IItem {
        itemCode: string;
        itemName: string;
        display: boolean;
    }

    interface ISpecialLeaveRemaining {
        specialid: string;
        sid: string;
        specialLeaCode: string;
        grantDate: string;
        deadlineDate: string;
        expStatus: number;
        registerType: string;
        numberDayGrant: number;
        timeGrant: number;
        numberDayUse: number;
        useSavingDays: number;
        timeUse: number;
        numberDaysOver: number;
        timeOver: number;
        numberDayRemain: number;
        timeRemain: number;

    }

    class SpecialLeaveRemaining {
        specialid: string;
        sid: string;
        specialLeaCode: string;
        grantDate: string;
        deadlineDate: string;
        expStatus: number;
        registerType: string;
        numberDayGrant: number;
        timeGrant: string;
        numberDayUse: number;
        useSavingDays: number;
        timeUse: string;
        numberOverDays: number;
        timeOver: string;
        numberDayRemain: number;
        timeRemain: string;
        constructor(data: ISpecialLeaveRemaining) {
            this.specialid = data.specialid;
            this.sid = data.sid;
            this.specialLeaCode = data.specialLeaCode;
            this.grantDate = data.grantDate;
            this.deadlineDate = data.deadlineDate;
            this.expStatus = data.expStatus;
            this.registerType = data.registerType;
            this.numberDayGrant = data.numberDayGrant;
            this.timeGrant = data.timeGrant + "";
            this.numberDayUse = data.numberDayUse;
            this.useSavingDays = data.useSavingDays;
            this.timeUse = data.timeUse + "";
            this.numberOverDays = data.numberDaysOver;
            this.timeOver = data.timeOver + "";
            this.numberDayRemain = data.numberDayRemain;
            this.timeRemain = data.timeRemain + "";
        }
    }

}