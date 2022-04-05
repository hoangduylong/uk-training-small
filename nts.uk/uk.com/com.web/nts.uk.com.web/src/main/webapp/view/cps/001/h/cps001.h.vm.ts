module cps001.h.vm {

    import text = nts.uk.resource.getText;
    import alert = nts.uk.ui.dialog.alert;
    import error = nts.uk.ui.dialog.alertError;
    import alertError = nts.uk.ui.dialog.alertError;
    import confirm = nts.uk.ui.dialog.confirm;
    import close = nts.uk.ui.windows.close;
    import setShared = nts.uk.ui.windows.setShared;
    import getShared = nts.uk.ui.windows.getShared;
    import clearError = nts.uk.ui.errors.clearAll;
    import info = nts.uk.ui.dialog.info;

    let __viewContext: any = window['__viewContext'] || {},
        block = window["nts"]["uk"]["ui"]["block"]["grayout"],
        unblock = window["nts"]["uk"]["ui"]["block"]["clear"],
        invisible = window["nts"]["uk"]["ui"]["block"]["invisible"];

    export class ViewModel {
        columns: KnockoutObservableArray<NtsGridListColumn>;
        items: KnockoutObservableArray<IResvLeaGrantRemNum> = ko.observableArray([]);
        currentItem: KnockoutObservable<string> = ko.observable("");
        leaveExpirationStatus: KnockoutObservableArray<any>;
        resvLeaGrantRemNum: KnockoutObservable<ResvLeaGrantRemNum> = ko.observable(new ResvLeaGrantRemNum(<IResvLeaGrantRemNum>{}));
        enableRemoveBtn: KnockoutObservable<boolean> = ko.observable(true);
        isCreate: KnockoutObservable<boolean> = ko.observable(false);
        ckbAll: KnockoutObservable<boolean> = ko.observable(false);
        itemDefs: any = [];

        nameGrantDate: KnockoutObservable<string> = ko.observable(null);
        nameDeadline: KnockoutObservable<string> = ko.observable(null);
        nameOverLimitDays: KnockoutObservable<string> = ko.observable(null);

        sid: KnockoutObservable<string> = ko.observable(null);

        constructor() {
            let self = this,
                data: any = getShared('CPS001GHI_VALUES');

            self.sid(data.sid);

            self.ckbAll.subscribe((data) => {

                service.getAll(self.sid(), data).done((data) => {
                    if (data && data.length > 0) {
                        self.isCreate(false);
                        self.items(data);
                        let index = _.findIndex(self.items(), (item) => { return item.id == self.currentItem(); });

                        if (index == -1) {
                            self.currentItem(self.items()[0].id);
                        }
                    } else {
                        self.create();
                    }
                    $("#grantDate").focus();
                    clearError();
                });
            });
            self.currentItem.subscribe((id: string) => {
                if (id) {
                    service.getByGrantDate(id).done((curItem: IResvLeaGrantRemNum) => {
                        self.resvLeaGrantRemNum(new ResvLeaGrantRemNum(<IResvLeaGrantRemNum>curItem));
                        self.setDef();
                        if (curItem) {
                            self.enableRemoveBtn(true);
                            self.isCreate(false);
                        }
                        $("#grantDate").focus();
                    });
                }
                self.enableRemoveBtn(true);
                clearError();

            });
            self.columns = ko.observableArray([
                { headerText: "", key: 'id', hidden: true },
                { headerText: text("CPS001_118"), key: 'grantDate', width: 100, isDateColumn: true, format: 'YYYY/MM/DD' },
                { headerText: text("CPS001_119"), key: 'deadline', width: 100, isDateColumn: true, format: 'YYYY/MM/DD' },
                { headerText: text("CPS001_120"), key: 'grantDays', width: 80, formatter: self.formatterDate },
                { headerText: text("CPS001_121"), key: 'useDays', width: 80, formatter: self.formatterDate },
                { headerText: text("CPS001_130"), key: 'overLimitDays', width: 80, formatter: self.formatterDate },
                { headerText: text("CPS001_123"), key: 'remainingDays', width: 80, formatter: self.formatterDate },
                { headerText: text("CPS001_129"), key: 'expirationStatus', width: 90, formatter: self.formatterExState }
            ]);
        }

        create() {
            let self = this;
            self.items([]);
            self.currentItem('-1');
            self.enableRemoveBtn(false);
            self.isCreate(true);
            clearError();
            $("#grantDate").focus();
        }

        newmode() {
            let self = this;
            self.currentItem("-1");
            self.enableRemoveBtn(false);
            self.isCreate(true);
            $("#grantDate").focus();
        }

        load(): JQueryPromise<any> {
            let self = this, dfd = $.Deferred();
            service.getAll(self.sid(), self.ckbAll()).done((data: Array<IResvLeaGrantRemNum>) => {
                if (data && data.length > 0) {
                    self.items(data);
                } else {
                    self.create();
                }
                dfd.resolve();
            }).fail((_data) => {
                dfd.reject();
                unblock();

            });
            return dfd.promise();
        }

        start(): JQueryPromise<any> {
            let self = this, dfd = $.Deferred();
            self.setDef().done(() => {
                self.load().done(() => {
                    if (self.items().length > 0) {
                        self.isCreate(false);
                        self.currentItem(self.items()[0].id);
                    }
                    dfd.resolve();
                });
            });
            return dfd.promise();
        }

        setDef(): JQueryPromise<any> {
            let self = this, dfd = $.Deferred();
            if (self.itemDefs.length > 0) {
                self.setItemValue(self.itemDefs);
                dfd.resolve();
            } else {
                service.getItemDef().done((data) => {
                    self.itemDefs = data;
                    self.setItemValue(self.itemDefs);
                    dfd.resolve();
                });
            }
            return dfd.promise();

        }

        setItemValue(data: any) {
            let self = this;
            $("td[data-itemCode]").each(function() {
                let itemCodes = $(this).attr('data-itemCode');
                if (itemCodes) {
                    let itemCodeArray = itemCodes.split(" ");
                    _.forEach(itemCodeArray, (itemCode) => {
                        let itemDef = _.find(data, (item) => {
                            return item.itemCode == itemCode;
                        });
                        if (itemDef) {
                            if (itemDef.display) {
                                $(this).children().first().html("<label>" + itemDef.itemName + "</label>");
                                let timeType = itemCodeArray[itemCodeArray.length - 1];
                                switch (timeType) {
                                    case "grantDate":
                                        self.nameGrantDate(itemDef.itemName);
                                        break;
                                    case "deadline":
                                        self.nameDeadline(itemDef.itemName);
                                        break;
                                    case "overLimitDays":
                                        self.nameOverLimitDays(itemDef.itemName);
                                        break;
                                }
                            }
                        }
                    });
                }

            });
        }

        close() {
            close();
        }

        remove() {
            let self = this;
            if (nts.uk.ui.errors.hasError()) {
                return;
            }

            nts.uk.ui.dialog.confirm({ messageId: "Msg_18" })
                .ifYes(() => {

                    let delItemIndex = _.findIndex(self.items(), (item) => { return item.id == self.currentItem(); });

                    let selectedId;
                    if (delItemIndex == self.items().length - 1) {
                        if (self.items().length > 1) {
                            selectedId = self.items()[delItemIndex - 1].id;
                        }
                    } if (delItemIndex == 0) {
                        selectedId = self.items()[0].id;
                    } else {
                        selectedId = self.items()[delItemIndex].id;
                    }

                    let currentRow: IResvLeaGrantRemNum = _.find(ko.toJS(self.items), function(item: IResvLeaGrantRemNum) { return item.id == self.currentItem(); });
                    let itemListLength = self.items().length;

                    if (currentRow != undefined) {
                        let itemListLength = self.items().length;
                        service.remove(currentRow.id).done((_data: any) => {
                            nts.uk.ui.dialog.info({ messageId: "Msg_16" }).then(function() {
                                if (itemListLength === 1) {
                                    self.load().done(() => { });
                                } else if (itemListLength - 1 === delItemIndex) {
                                    self.load().done(() => {
                                        self.currentItem(self.items()[delItemIndex - 1].id);

                                    });
                                } else if (itemListLength - 1 > delItemIndex) {
                                    self.load().done(() => {
                                        self.currentItem(self.items()[delItemIndex].id);
                                    });
                                }
                                $("#grantDate").focus();
                            });
                            clearError();
                            unblock();
                        }).fail((error: any) => {
                            unblock();
                        });

                    }

                }).ifCancel(() => {
                });
        }

        register() {
            let self = this;

            $("#grantDate").trigger("validate");
            $("#deadline").trigger("validate");
            $("#grantDays").trigger("validate");
            $("#useDays").trigger("validate");
            $("#overLimitDays").trigger("validate");
            $("#remainingDays").trigger("validate");

            if (!$(".nts-input").ntsError("hasError")) {
                let item = self.resvLeaGrantRemNum(),
                    grantDate = moment.utc(item.grantDate(), "YYYY/MM/DD"),
                    deadline = moment.utc(item.deadline(), "YYYY/MM/DD"),
                    employeeId = self.sid();
                if ((new Date(deadline._d)) < (new Date(grantDate._d))) {
                    $('#grantDate').ntsError('set', { messageId: "Msg_1023" });
                    return;
                }
                if (self.isCreate()) {
                    let currItem = self.items();
                    let ids: Array<string> = _.map(self.items(), x => x.id);
                    service.create(employeeId, grantDate, deadline, item.expirationStatus(),
                        item.grantDays(), item.useDays(), item.overLimitDays(), item.remainingDays()).done((result: Array<IResvLeaGrantRemNum>) => {
                            service.getAll(self.sid(), self.ckbAll()).done((data: Array<IResvLeaGrantRemNum>) => {
                                self.isCreate(false);
                                nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(function() {
                                    if (data && data.length > 0) {
                                        self.items(data);
                                        let newItem = _.find(self.items(), x => ids.indexOf(x.id) == -1);
                                        if (newItem) {
                                            let saveItemIndex = _.findIndex(self.items(), (item) => { return item.id == newItem.id; });
                                            self.currentItem(self.items()[saveItemIndex].id);
                                        } else {
                                            self.currentItem(self.items()[0].id);
                                        }

                                    } else {
                                        self.create();
                                    }
                                    $("#grantDate").focus();
                                });
                                clearError();
                                unblock();

                            }).fail((_data) => {
                                unblock();
                            });

                        }).fail((mes) => { 
                            nts.uk.ui.dialog.alertError({ messageId: mes.messageId });
                            unblock();
                        });
                } else {
                    let ids: Array<string> = _.map(self.items(), x => x.id);

                    service.update(item.id(), employeeId, grantDate, deadline, item.expirationStatus(),
                        item.grantDays(), item.useDays(), item.overLimitDays(), item.remainingDays()).done(() => {
                            self.load().done(() => {
                                nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(function() {
                                    if (self.items().length > 0 && self.items().length == ids.length) {
                                        self.currentItem(item.id());
                                    } else if (self.items().length > 0 && self.items().length != ids.length) {
                                        self.currentItem(self.items()[0].id);
                                    } else if (self.items().length == 0) {
                                        self.create();
                                    }
                                    $("#grantDate").focus();
                                });
                                clearError();
                                unblock();
                            });

                        }).fail((mes) => {
                            nts.uk.ui.dialog.alertError({ messageId: mes.messageId });
                            unblock();
                        });
                }
            }

        }

        formatterDate(value) {
            if (value) {
                return value >= 0 ? "&nbsp;" + value + '日' : value + '日';
            } else {
                return "&nbsp;0日";
            }
        }

        formatterExState(value: number) {
            if (value == 1) {
                return "使用可能";
            } else {
                return "期限切れ";
            }

        }


    }
    class ResvLeaGrantRemNum {
        id: KnockoutObservable<string> = ko.observable("");
        grantDate: KnockoutObservable<string> = ko.observable("");
        deadline: KnockoutObservable<string> = ko.observable("");
        expirationStatus: KnockoutObservable<number> = ko.observable(1);
        grantDays: KnockoutObservable<string> = ko.observable("");
        useDays: KnockoutObservable<string> = ko.observable("");
        overLimitDays: KnockoutObservable<string> = ko.observable("");
        remainingDays: KnockoutObservable<string> = ko.observable("");
        constructor(data: IResvLeaGrantRemNum) {
            let self = this;
            self.id(data && data.id);
            self.grantDate(data && data.grantDate);
            self.deadline(data && data.deadline);
            self.expirationStatus(data == undefined ? 1 : (data.expirationStatus == undefined ? 1 : data.expirationStatus));
            self.grantDays(data && data.grantDays);
            self.useDays(data && data.useDays);
            self.overLimitDays(data && data.overLimitDays);
            self.remainingDays(data && data.remainingDays);

            self.grantDate.subscribe((data) => {

                if (data && __viewContext.viewModel.isCreate()) {

                    if (nts.uk.ui.errors.hasError()) {
                        return;
                    }

                    service.generateDeadline(moment.utc(data, "YYYY/MM/DD")).done((item) => {
                        self.deadline(item);
                    });
                }


            });
        }
    }

    interface IResvLeaGrantRemNum {
        id: string;
        grantDate: string;
        deadline: string;
        expirationStatus: number;
        grantDays: string;
        useDays: string;
        overLimitDays: string;
        remainingDays: string;
    }

}