module nts.uk.ui.wizard.viewmodel {

    @bean()
    export class ScreenModel extends ko.ViewModel {
        items: KnockoutObservableArray<ItemModel>;
        columns: KnockoutObservableArray<any>;
        currentCode: KnockoutObservable<any>;
        currentCodeList: KnockoutObservableArray<any>;

        stepList: Array<NtsWizardStep>;
        activeStep: KnockoutObservable<number>;
        stepSelected: KnockoutObservable<NtsWizardStep>;

        tabs: KnockoutObservableArray<NtsTabPanelModel>;
        selectedTab: KnockoutObservable<string>;

        date: KnockoutObservable<Date>;
        yearMonth: KnockoutObservable<string>;

        timeOfDay: KnockoutObservable<string>;
        time: KnockoutObservable<number>;
        yearmontheditor: any;
        roundingRules: KnockoutObservableArray<any>;
        selectedRuleCode: any;

        constructor() {
            super();

            var self = this;
            self.items = ko.observableArray([]);
            var str = ['a0', 'b0', 'c0', 'd0'];

            for (var j = 0; j < 4; j++) {
                for (var i = 1; i < 51; i++) {
                    var code = i < 10 ? str[j] + '0' + i : str[j] + i;
                    self.items.push(new ItemModel(code, code, code, code));
                }
            }

            self.columns = ko.observableArray([
                { headerText: 'コード', prop: 'code', width: 50 },
                { headerText: '名称', prop: 'name', width: 100 },
                { headerText: '説明', prop: 'description', width: 100 },
                { headerText: '説明1', prop: 'other1', width: 100 },
                { headerText: '説明2', prop: 'other2', width: 100 }
            ]);
            self.currentCode = ko.observable();
            self.currentCodeList = ko.observableArray([]);
            self.currentCodeList.subscribe(function (newValue) {
                //                alert(newValue);    
            });
            self.roundingRules = ko.observableArray([
                { code: '1', name: '四捨五入' },
                { code: '2', name: '切り上げ' },
                { code: '3', name: '切り捨て' }
            ]);
            self.selectedRuleCode = ko.observable(1);

            self.tabs = ko.observableArray([
                { id: 'tab-1', title: 'Tab Title 1', content: '.tab-content-1', enable: ko.observable(true), visible: ko.observable(true) },
                { id: 'tab-2', title: 'Tab Title 2', content: '.tab-content-2', enable: ko.observable(true), visible: ko.observable(true) },
                { id: 'tab-3', title: 'Tab Title 3', content: '.tab-content-3', enable: ko.observable(true), visible: ko.observable(true) },
                { id: 'tab-4', title: 'Tab Title 4', content: '.tab-content-4', enable: ko.observable(true), visible: ko.observable(true) }
            ]);
            self.selectedTab = ko.observable('tab-2');

            self.yearMonth = ko.observable("200002");
            self.date = ko.observable(nts.uk.time.UTCDate(2000, 0, 1));

            self.timeOfDay = ko.observable("12:00");
            self.time = ko.observable("1200");
            self.yearmontheditor = {
                value: ko.observable(200001),
                constraint: 'LayoutCode',
                option: ko.mapping.fromJS(new nts.uk.ui.option.TimeEditorOption({
                    inputFormat: 'yearmonth'
                })),
                required: ko.observable(false),
                enable: ko.observable(true),
                readonly: ko.observable(false)
            };

            self.stepList = [
                { content: '.step-1' },
                { content: '.step-2' },
                { content: '.step-3' },
                { content: '.step-4' },
                { content: '.step-5' },
                { content: '.step-6' }
            ];
            self.activeStep = ko.observable(0);
            self.stepSelected = ko.observable({ content: '.step-1' });

        }

        begin() {
            $('#wizard').ntsWizard("begin");
        }

        end() {
            $('#wizard').ntsWizard("end");
        }

        next() {
            $('#wizard').ntsWizard("next").done(function () {
                $('#inputSelectImplementAtr').focus();
            });
        }

        previous() {
            $('#wizard').ntsWizard("prev").done(function () {
                $('#inputSelectImplementAtr').focus();
            });
        }

        getCurrentStep() {
            alert($('#wizard').ntsWizard("getCurrentStep"));
        }
        
        goto() {
            var index = this.stepList.indexOf(this.stepSelected());
            $('#wizard').ntsWizard("goto", index);
        }

        mounted() {
            const vm = this;

            _.extend(window, { vm });
        }
    }

    class ItemModel {
        code: string;
        name: string;
        description: string;
        other1: string;
        other2: string;
        constructor(code: string, name: string, description: string, other1?: string, other2?: string) {
            this.code = code;
            this.name = name;
            this.description = description;
            this.other1 = other1;
            this.other2 = other2 || other1;
        }
    }
}
