module ccg014.a.viewmodel {
    import commonModel = ccg.model;
    import windows = nts.uk.ui.windows;
    import errors = nts.uk.ui.errors;
    import resource = nts.uk.resource;
    import util = nts.uk.util;
    import text = nts.uk.text;
    import block = nts.uk.ui.block;

    export class ScreenModel {
        // TitleMenu List
        listTitleMenu: KnockoutObservableArray<any>;
        selectedTitleMenuCD: KnockoutObservable<any>;
        columns: KnockoutObservableArray<any>;
        // TitleMenu Details
        selectedTitleMenu: KnockoutObservable<model.TitleMenu>;
        isCreate: KnockoutObservable<boolean>;
        // Enable Copy
        enableCopy: KnockoutComputed<boolean>;

        constructor() {
            var self = this;
            // TitleMenu List
            self.listTitleMenu = ko.observableArray([]);
            self.selectedTitleMenuCD = ko.observable(null);
            self.selectedTitleMenuCD.subscribe((value) => {
                self.findSelectedTitleMenu(value);
                self.changePreviewIframe(self.selectedTitleMenu().layoutID());
            });
            self.columns = ko.observableArray([
                { headerText: resource.getText('CCG014_11'), key: 'titleMenuCD', width: 45 },
                { headerText: resource.getText('CCG014_12'), key: 'name', width: 260, formatter: _.escape }
            ]);
            // TitleMenu Details
            self.selectedTitleMenu = ko.observable(null);
            self.isCreate = ko.observable(null);
            
            // Enable Copy
            self.enableCopy = ko.computed(() => {
                return (!self.isCreate() && !util.isNullOrEmpty(self.selectedTitleMenuCD()));
            });

            $("#preview-iframe").on("load", function() {
                if (self.isCreate() == true)
                    $("#titleMenuCD").focus();
                else
                    $("#titleMenuName").focus();
                errors.clearAll();
            });
            
            window.onresize = function(event) {
            	$("#preview-iframe").attr('style', 
                        'height:' + (window.innerHeight - 350) + 'px; ' +
                        'width:' + (window.innerWidth - 500) + 'px; ');
            	$(".preview-container").width($("#preview-iframe").width() + 10);
                
            };

        }

        /** Start Page */
        startPage(): JQueryPromise<any> {
            var dfd = this.reloadData();
            var self = this;
            block.invisible();
            dfd.done(() => {
                block.clear();
                this.selectTitleMenuByIndex(0);
                this.setHeight();
            });
            return dfd;
        }

        /** Create Button Click */
        createButtonClick() {
            var self = this;
            self.isCreate(true);
            self.selectedTitleMenuCD(null);
            self.selectedTitleMenu(new model.TitleMenu("", "", ""));
            errors.clearAll();
            $("#preview-iframe").trigger("load");
        }

        /** Registry Button Click */
        registryButtonClick() {
            var self = this;
            $(".nts-input").trigger("validate");
            if (!$(".nts-input").ntsError("hasError")) {
                self.selectedTitleMenu().titleMenuCD(nts.uk.text.padLeft(self.selectedTitleMenu().titleMenuCD(), '0', 4));
                var titleMenu = ko.mapping.toJS(self.selectedTitleMenu);
                var titleMenuCD = titleMenu.titleMenuCD;
                block.invisible();
                if (self.isCreate() === true) {
                    service.createTitleMenu(titleMenu).done((data) => {
                        nts.uk.ui.dialog.info({ messageId: "Msg_15" });
                        self.reloadData().done(() => {
                            self.selectedTitleMenuCD(titleMenuCD);
                        });
                    }).fail((res: any) => {
                        nts.uk.ui.dialog.alert({ messageId: res.messageId });
                    }).always(() => {
                        block.clear();
                    });
                }
                else {
                    service.updateTitleMenu(titleMenu).done((data) => {
                        nts.uk.ui.dialog.info({ messageId: "Msg_15" });
                        console.log(data);
                        self.reloadData();
                    }).always(() => {
                        block.clear();
                    });
                }
            }
        }

        /**Delete Button Click */
        removeTitleMenu() {
            var self = this;
            if (self.selectedTitleMenuCD() !== null) {
                nts.uk.ui.dialog.confirm({ messageId: "Msg_18" }).ifYes(function() {
                    block.invisible();
                    service.deleteTitleMenu(self.selectedTitleMenuCD()).done(() => {
                        var index = _.findIndex(self.listTitleMenu(), ['titleMenuCD', self.selectedTitleMenu().titleMenuCD()]);
                        index = _.min([self.listTitleMenu().length - 2, index]);
                        self.reloadData().done(() => {
                            self.selectTitleMenuByIndex(index);
                            nts.uk.ui.dialog.info({ messageId: "Msg_16" });
                        });
                    }).fail((res: any) => {
                        nts.uk.ui.dialog.alertError({ messageId: res.messageId });
                    }).always(() => {
                        block.clear();
                    });
                })
            }
        }

        /** Open Copy TitleMenu (CCG 014B Dialog) */
        openBDialog() {
            block.invisible();
            var self = this;
            var selectTitleMenu = _.find(self.listTitleMenu(), ['titleMenuCD', self.selectedTitleMenu().titleMenuCD()]);
            windows.setShared("copyData", selectTitleMenu);
            windows.sub.modal("/view/ccg/014/b/index.xhtml", { title: nts.uk.resource.getText("CCG014_16"), dialogClass: "no-close" }).onClosed(() => {
                var copiedTitleMenuCD = windows.getShared("copyTitleMenuCD");
                if (copiedTitleMenuCD) {
                    self.reloadData().done(() => {
                        self.selectedTitleMenuCD(copiedTitleMenuCD);
                    });
                }
                block.clear();
            });
        }

        /** Open  Layout Setting(CCG 031_1) Dialog */
        open031_1Dialog() {
            var self = this;
            var layoutInfo: commonModel.TransferLayoutInfo = {
                parentCode: self.selectedTitleMenuCD(),
                layoutID: self.selectedTitleMenu().layoutID(),
                pgType: 1
            };
            windows.setShared("layout", layoutInfo, false);
            windows.sub.modal("/view/ccg/031/a/index.xhtml", { title: nts.uk.resource.getText("CCG031_1"), dialogClass: "no-close" }).onClosed(() => {
                let returnInfo: commonModel.TransferLayoutInfo = windows.getShared("layout");
                self.selectedTitleMenu().layoutID(returnInfo.layoutID);
                _.find(self.listTitleMenu(), ["titleMenuCD", returnInfo.parentCode]).layoutID = returnInfo.layoutID;
                self.changePreviewIframe(returnInfo.layoutID);
            });
        }

        /** Open FlowMenu Setting(030A Dialog) */
        open030A_Dialog() {
            block.invisible();
            windows.sub.modal("/view/ccg/030/a/index.xhtml").onClosed(() => {
                block.clear();
            });
        }

        /** Get Selected TitleMenu */
        private findSelectedTitleMenu(titleMenuCD: string) {
            var self = this;
            var selectedTitleMenu = _.find(self.listTitleMenu(), ['titleMenuCD', titleMenuCD]);
            if (selectedTitleMenu !== undefined) {
                self.isCreate(false);
                self.selectedTitleMenu(new model.TitleMenu(selectedTitleMenu.titleMenuCD, selectedTitleMenu.name, selectedTitleMenu.layoutID));
            }
            else {
                self.isCreate(true);
                self.selectedTitleMenu(new model.TitleMenu("", "", ""));
            }
            errors.clearAll();
        }

        /** Reload data from server */
        private reloadData(): JQueryPromise<any> {
            var self = this;
            var dfd = $.Deferred();
            /** Get list TitleMenu*/
            service.getAllTitleMenu().done(function(listTitleMenu: Array<model.TitleMenu>) {
                self.listTitleMenu(listTitleMenu);
                if (listTitleMenu.length > 0) {
                    self.isCreate(false);
                }
                else {
                    self.findSelectedTitleMenu(null);
                    self.changePreviewIframe(null);
                    self.isCreate(true);
                }
                dfd.resolve();
            }).fail(function(error) {
                dfd.fail();
                nts.uk.ui.dialog.alertError(error.message);
            });
            return dfd.promise();
        }

        /** Select TitleMenu by Index: Start & Delete case */
        private selectTitleMenuByIndex(index: number) {
            var self = this;
            var selectTitleMenuByIndex = _.nth(self.listTitleMenu(), index);
            if (selectTitleMenuByIndex !== undefined)
                self.selectedTitleMenuCD(selectTitleMenuByIndex.titleMenuCD);
            else
                self.selectedTitleMenuCD(null);
        }

        private changePreviewIframe(layoutID: string): void {
            $("#preview-iframe").attr("src", "/nts.uk.com.web/view/ccg/common/previewWidget/index.xhtml?layoutid=" + layoutID);
        }
        
        private setHeight(): void {
        	$("#preview-iframe").attr('style', 
                'height:' + (window.innerHeight - 350) + 'px; ' +
                'width:' + (window.innerWidth - 500) + 'px; ');
        	$(".preview-container").width($("#preview-iframe").width() + 10);
        }

    }

    export module model {
        export class TitleMenu {
            titleMenuCD: KnockoutObservable<string>;
            name: KnockoutObservable<string>;
            layoutID: KnockoutObservable<string>;
            constructor(titleMenuCD: string, name: string, layoutID: string) {
                this.titleMenuCD = ko.observable(titleMenuCD);
                this.name = ko.observable(name);
                this.layoutID = ko.observable(layoutID);
            }
        }
    }
}