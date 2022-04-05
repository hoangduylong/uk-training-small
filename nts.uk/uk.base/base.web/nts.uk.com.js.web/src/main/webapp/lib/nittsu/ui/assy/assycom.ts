module nts.uk.ui.koExtentions {
    import ajax = nts.uk.request.ajax;
    import setShared = nts.uk.ui.windows.setShared;
    import getShared = nts.uk.ui.windows.getShared;
    import openModal = nts.uk.ui.windows.sub.modal;
    ko.components.register("assy-com", {
        viewModel: function(params) {
            let self = this;
            self.height = observableOrDefault(params.height, "120px");
            self.width = observableOrDefault(params.width, "640px");
            self.labelDistance = observableOrDefault(params.labelDistance, "60px");
            self.screenMode = params.screenMode;
            self.webAppId = params.webAppId || nts.uk.request.location.currentAppId;
            self.histIdName = params.histIdName || "histId";
            self.isLatestHistSelected = ko.observable(false); 
            self.masterId = params.masterId;
            self.histList = params.histList;
            self.selectedHistId = params.selectedHistId;
            self.selectedHistId.subscribe(id => {
                if (!_.findIndex(self.histList(), h => h.histId === id)) {
                    self.isLatestHistSelected(true);
                } else {
                    self.isLatestHistSelected(false);
                }
            });
            
            self.pathGet = params.servicePath.get;
            self.pathAdd = params.servicePath.add;
            self.pathUpdate = params.servicePath.update;
            self.pathDelete = params.servicePath.delete;
            self.getQueryResult = params.getQueryResult;
            self.getSelectedStartDate = params.getSelectedStartDate;
            self.loadHist = (rendered) => {
                if (!_.isNil(self.masterId) && self.masterId !== "") {
                    ajax(self.webAppId, self.pathGet()).done(res => {
                        let queryResult = self.getQueryResult(res);
                        self.histList(queryResult);
                        if (!rendered && self.histList().length > 0) {
                            self.selectedHistId(self.histList()[0][self.histIdName]);
                        }
                        
                        if (rendered && _.isFunction(params.afterRender)) {
                            _.defer(() => {
                                params.afterRender();
                            });
                        }
                    });
                } else {
                    if (rendered && _.isFunction(params.afterRender)) {
                        params.afterRender();
                    }
                }
            };
            
            self.afterRender = self.loadHist.bind(self, true);
            self.delVisible = params.delVisible;
            self.delChecked = params.delChecked;
            self.delEnable = ko.computed(() => {
                return self.histList().length > 0 && self.screenMode() === SCREEN_MODE.UPD && self.isLatestHistSelected();
            });
            
            self.openAddHistDialog = function() {
                setShared("ASSY_COM_PARAM", new AssyShared(self.masterId(), self.selectedHistId()));
                setShared("ASSY_COM_PARAM_CMD", params.commandAdd);
                setShared("ASSY_COM_PARAM_AJAX", (data) => ajax(self.webAppId, self.pathAdd(), data));
                openModal("com", "/view/assy/addhist/index.xhtml").onClosed(() => {
                    let done = getShared("HIST_ADD");
                    if (done) {
                        self.loadHist();
                        if (_.isFunction(params.afterAdd)) {
                            params.afterAdd();
                        }
                    }
                });
            }.bind(self);
            
            self.openUpdHistDialog = function() {
                setShared("ASSY_COM_PARAM", new AssyShared(self.masterId(), self.selectedHistId(), self.getSelectedStartDate()));
                setShared("ASSY_COM_PARAM_CMD", params.commandUpdate);
                setShared("ASSY_COM_PARAM_AJAX", (data) => ajax(self.webAppId, self.pathUpdate(), data));
                openModal("com", "/view/assy/updhist/index.xhtml").onClosed(() => {
                    let done = getShared("HIST_UPD"); 
                    if (done) {
                        self.loadHist();
                        if (_.isFunction(params.afterUpdate)) {
                            params.afterUpdate();
                        }
                    }
                });
            }.bind(self);
            
            self.deleteHist = function() {
                 nts.uk.ui.dialog.confirm({ messageId: 'Msg_18' }).ifYes(() => {
                    ajax(self.webAppId, self.pathDelete(), params.commandDelete(self.masterId(), self.selectedHistId())).done(() => {
                        self.loadHist();
                        if (_.isFunction(params.afterDelete)) {
                            params.afterDelete();
                        }
                    }).fail((res: any) => {
                        nts.uk.ui.dialog.bundledErrors(res);
                    });
                 });
            }.bind(self);         
        },
        template: `<div class="assy-hist" data-bind="let: { text: nts.uk.resource.getText }, style: { height: height(), width: width() }">
            <div class="as-area hist-label" data-bind="ntsFormLabel: {}, text: text('JAP0020_A1_1'), style: { paddingRight: labelDistance() }"></div>
            <div class="as-area hist-list" id="${nts.uk.util.randomId()}" tabindex="3" 
                data-bind="ntsListBox: {
                options: histList,
                optionsValue: 'histId',
                optionsText: 'displayText',
                multiple: false,
                value: selectedHistId,
                enable: true,
                rows: 5,
                columns: [
                    { key: 'displayText', length: 15 }
                ]}">
            </div>
            <div class="as-area">
                <div class="del-chk" tabindex="6" data-bind="ntsCheckBox: { checked: delChecked, enable: delEnable() },
                    style: { visibility: delVisible() ? 'visible' : 'hidden' }">
                </div>
            </div>
            <div class="as-area hist-btn" data-bind="template: { afterRender: afterRender }">
                <button class="add" tabindex="4"
                    data-bind="click: openAddHistDialog,
                    enable: histList().length == 0 || (screenMode() == 1 &amp;&amp; isLatestHistSelected), text: text('JAP0020_A1_3')"></button>
                <br/>
                <button class="update" tabindex="5"
                    data-bind="click: openUpdHistDialog,
                    enable: histList().length > 0 &amp;&amp; screenMode() == 1 &amp;&amp; isLatestHistSelected, text: text('JAP0020_A1_4')"></button>
                <br/>
                <button tabindex="7" class="danger delete"
                    data-bind="click: deleteHist,
                    enable: !delVisible() || (histList().length > 0 &amp;&amp; delEnable() &amp;&amp; delChecked()), text: text('JAP0020_A1_6')"></button>
            </div>
        </div>`
    });
    
    function observableOrDefault(val, def) {
        return ko.isObservable(val) ? val : ko.observable(_.isNil(val) ? def : val);
    }
    
    class AssyShared {
        masterId: string;
        histId: string;
        startDate: string;
        
        constructor(masterId: string, histId: string, startDate?: string) {
            this.masterId = masterId;
            this.histId = histId;
            this.startDate = startDate;
        }
    }
    
    enum SCREEN_MODE {
        NEW = 0,
        UPD = 1
    }
}