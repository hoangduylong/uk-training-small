module nts.uk.com.view.cmm020.a {
    import blockUI = nts.uk.ui.block;

    const LAST_INDEX_ERA_NAME_SYTEM: number = 3;
    export module viewmodel {
        export class ScreenModel {
            texteditor: any;

            columns: KnockoutObservableArray<any>;
            dataSource: KnockoutObservableArray<model.EraItem>;
            eraName: KnockoutObservable<string>;
            eraSymbol: KnockoutObservable<string>;
            startDate: KnockoutObservable<string>;
            currentName: KnockoutObservable<string>;
            currentSymbol: KnockoutObservable<string>;
            currentStartDate: KnockoutObservable<string>;
            currentCode: KnockoutObservable<string>;
            eraSelected: KnockoutObservable<model.EraItem>;
            activeUpdate: KnockoutObservable<boolean>;
            activeDelete: KnockoutObservable<boolean>;
            indexOfDelete: KnockoutObservable<number>;
            isFocus: KnockoutObservable<boolean>;

            constructor() {
                let self = this;

                self.indexOfDelete = ko.observable(-1);
                self.activeUpdate = ko.observable(false);
                self.activeDelete = ko.observable(false);
                self.isFocus = ko.observable(false);
                self.texteditor = {
                    value: ko.observable(''),
                    constraint: 'ResidenceCode',
                    option: ko.mapping.fromJS(new nts.uk.ui.option.TextEditorOption({
                        textmode: "text",
                        placeholder: "Placeholder for text editor",
                        width: "100px",
                        textalign: "left"
                    })),
                    required: ko.observable(true),
                    enable: ko.observable(true),
                    readonly: ko.observable(false)
                };
                self.columns = ko.observableArray([
                    { headerText: 'eraId', key: 'eraId', width: 100, hidden: true },
                    { headerText: nts.uk.resource.getText('CMM020_6'), key: 'eraName', width: 60, formatter: _.escape },
                    { headerText: nts.uk.resource.getText('CMM020_7'), key: 'eraSymbol', width: 45, formatter: _.escape },
                    { headerText: nts.uk.resource.getText('CMM020_8'), key: 'startDate', width: 70, formatter: _.escape }
                ]);

                self.eraSelected = ko.observable(null);
                self.dataSource = ko.observableArray([]);
                self.eraName = ko.observable('');
                self.eraSymbol = ko.observable('');
                self.startDate = ko.observable('');
                self.currentName = ko.observable('');
                self.currentSymbol = ko.observable('');
                self.currentStartDate = ko.observable('');
                self.currentCode = ko.observable('');
                self.currentCode.subscribe(function(codeChanged) {
                    self.clearError();
                    if (codeChanged == undefined || codeChanged == "") {
                        self.refreshEraShow();
                        self.activeUpdate(false);
                        self.activeDelete(false);
                    } else {
                        let currentEra = self.dataSource().filter(e => e.eraId === codeChanged)[0];
                        if (!_.isEmpty(currentEra)) {
                            self.eraSelected(currentEra);

                            //check era is system value, set active btn update and delete
                            var indexOfEraSelected = self.dataSource().indexOf(currentEra);
                            if (currentEra.systemType == 1) {
                                self.activeUpdate(false);
                                self.activeDelete(false);
                            } else {
                                self.activeUpdate(indexOfEraSelected > LAST_INDEX_ERA_NAME_SYTEM);
                                self.activeDelete(indexOfEraSelected == self.dataSource().length - 1);
                            }
                            self.setValueCurrentEraShow(currentEra);
                        };
                    }
                });
            }

            /**
             * start page
             */
            public start_page(): JQueryPromise<any> {
                let self = this;
                var dfd = $.Deferred();
                //call ws get all era
                //var listEraName: model.EraItem[] = [];

                //                for (let i = 0; i <= 3; i++) {
                //                    listEraName.push(new model.EraItem("code" + i, "Nam" + i, "Sb" + i, "2016/06/1" + (5 - i), true));
                //                }
                //                listEraName.push(new model.EraItem("code5", "T", "CusSb", "2018/06/25", false));
                //                listEraName.push(new model.EraItem("code6", "D", "222", "2018/3/28", false));

                self.loadEraNameList(null);
                dfd.resolve();

                return dfd.promise();
            }

            public loadEraNameList(code) {
                let self = this;
                service.getAllEraNameItem().done(function(listEraName: Array<model.EraItem>) {
                    if (listEraName === undefined || listEraName.length == 0) {
                        self.dataSource();
                    } else {
                        var listEraName = _.orderBy(listEraName, [function(item) { return new Date(item.startDate); }], ['asc']);
                        self.dataSource(listEraName);
                        if (code != null) {
                            // focus on current item
                            let eraNameCurrent = _.find(listEraName, function(o) { return o.eraId == code; });
                            self.currentCode(eraNameCurrent.eraId);
                            self.eraSelected(eraNameCurrent);

                        }
                        else {
                            // focus on the last item
                            let eraNameLast = _.last(listEraName);
                            self.currentCode(eraNameLast.eraId);
                            self.eraSelected(eraNameLast);
                        }
                        self.setValueCurrentEraShow(self.eraSelected());
                    }

                });
            }

            public newItem() {
                var self = this;
                self.clearError();
                self.refreshEraShow();
                self.currentCode(null);
                self.activeUpdate(true);
                self.isFocus(true);
            }

            /**
             * createEra
             */
            public createEra(): void {
                var self = this;
                blockUI.grayout();
                self.activeUpdate(false);
                let currentDate = moment(self.currentStartDate()).format('YYYY/MM/DD').toString();
                $('.nts-input').trigger("validate");
                _.defer(() => {
                    if (!$('.nts-editor').ntsError("hasError")) {
                        if (self.currentCode() == null) {
                            let list = self.dataSource();
                            let last = list[list.length - 1];
                            console.log(last);
                            if (currentDate > last.startDate) {
                                var eraNameCreate = new model.EraItem(self.currentCode(), self.currentName(), self.currentSymbol(), currentDate, 0);
                                service.saveEraName(eraNameCreate).done(function() {
                                    blockUI.grayout();
                                    nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(function() {
                                        blockUI.clear();
                                        self.loadEraNameList(null);
                                        location.reload();
                                    });
                                }).always(()=> blockUI.clear());
                            } else {
                                nts.uk.ui.dialog.info({ messageId: "Msg_142" });
                                return false;
                            }
                        } else {
                            let currentEraNameIndex = self.dataSource().indexOf(self.eraSelected());
                            let preEraName = self.dataSource()[currentEraNameIndex - 1];

                            if (currentDate <= preEraName.startDate) {
                                nts.uk.ui.dialog.info({ messageId: "Msg_452" });
                                return false;
                            } else {
                                if (currentEraNameIndex != (self.dataSource().length - 1)) {
                                    let nextEraName = self.dataSource()[currentEraNameIndex + 1];
                                    if (currentDate >= nextEraName.startDate) {
                                        nts.uk.ui.dialog.info({ messageId: "Msg_453" });
                                        return false;
                                    } else {
                                        var eraNameCreate = new model.EraItem(self.currentCode(), self.currentName(), self.currentSymbol(), currentDate, 0);
                                        service.saveEraName(eraNameCreate).done(function() {
                                            blockUI.grayout();
                                            nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(function() {
                                                blockUI.clear();
                                                self.loadEraNameList(self.currentCode());
                                            });
                                        }).always(()=> blockUI.clear());
                                    }
                                } else {
                                    var eraNameCreate = new model.EraItem(self.currentCode(), self.currentName(), self.currentSymbol(), currentDate, 0);
                                    service.saveEraName(eraNameCreate).done(function() {
                                        blockUI.grayout();
                                        nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(function() {
                                            blockUI.clear();
                                            self.loadEraNameList(null);
                                        });
                                    }).always(()=> blockUI.clear());
                                }
                            }
                        }
                    }
                });
                self.activeUpdate(true);
                blockUI.clear()
            }

            /**
             * deleteEra
             */
            public deleteEra(): void {
                var self = this;
                nts.uk.ui.dialog.confirm({ messageId: 'Msg_18' }).ifYes(function() {
                    blockUI.invisible();
                    self.indexOfDelete(_.findIndex(self.dataSource(), function(e) {
                        return e.eraId == self.currentCode();
                    }));
                    var eraNameDelete = new model.EraItem(self.currentCode(), self.currentName(), self.currentSymbol(), self.currentStartDate(), 0);
                    console.log(eraNameDelete);

                    service.deleteEraName(eraNameDelete).done(function() {
                        blockUI.clear();
                        nts.uk.ui.dialog.info({ messageId: "Msg_16" }).then(function() {
                            self.loadEraNameList(null);
                        });
                    });

                }).ifNo(function() {
                    return;
                })
            }

            private setValueCurrentEraShow(currentEra: model.EraItem) {
                var self = this;
                self.isFocus(true);
                self.currentName(currentEra.eraName);
                self.currentSymbol(currentEra.eraSymbol);
                self.currentStartDate(currentEra.startDate);
            }

            private refreshEraShow() {
                var self = this;
                self.currentName('');
                self.currentSymbol('');
                self.currentStartDate('');
            }

            clearError(): void {
                if ($('.nts-editor').ntsError("hasError")) {
                    $('.nts-input').ntsError('clear');
                }
            }

            private getEraNameAfterDelete() {
                var self = this;
                service.getAllEraNameItem().done(function(listEraName: Array<model.EraItem>) {
                    self.dataSource(listEraName);
                    let lastEraName = _.last(listEraName);
                    self.currentCode(lastEraName.eraId);
                });
            }
        }

        export module model {

            export class EraItem {
                eraId: string;
                eraName: string;
                eraSymbol: string;
                startDate: string;
                endDate: string;
                systemType: number;

                constructor(eraId: string, eraName: string, eraSysbol: string, startDate: string, systemType: number) {
                    this.eraId = eraId;
                    this.eraName = eraName;
                    this.eraSymbol = eraSysbol;
                    this.startDate = startDate;
                    this.systemType = systemType;
                }
            }
        }
    }
}