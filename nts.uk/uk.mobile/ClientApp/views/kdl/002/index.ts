
import { _, Vue } from '@app/provider';
import { component, Prop } from '@app/core/component';
import { Kdl001Component } from '../001/index';

@component({
    style: require('./style.scss'),
    resource: require('./resources.json'),
    template: require('./index.vue'),
    components: {
        'worktime': Kdl001Component
    }
})


export class KDL002Component extends Vue {
    @Prop({
        default: () => ({
            isAddNone: false,
            seledtedWkTimeCDs: [],
            selectedWorkTimeCD: '',
            selectedWorkTypeCD: '',
            isSelectWorkTime: false,
            seledtedWkTypeCDs: []
        })
    })
    public params!: IParam;
    public disPlaywkTypes: Array<IWorkType> = [];
    public wkTypes: Array<IWorkType> = [];
    private selectedWorkType = {};
    public created() {
        let self = this;

        self.startPage();
    }

    public mounted() {
        this.$mask('show', { message: true, opacity: 0.75 });
    }

    public startPage() {
        let self = this;
        self.$http.post('at', servicePath.getAllWkType, { wkTypeCodes: self.params.seledtedWkTypeCDs }).then((result: { data: Array<IWorkType> }) => {

            self.$mask('hide');

            if (self.checkEmptyList(result.data)) {

                self.addNoneItem();

                self.setWkType(result.data);

                self.setSelectedItem();

            }

        }).catch((res: any) => {
            self.showError(res);
        });
    }

    public checkEmptyList(data: IWorkType[]) {
        let self = this;

        if (_.isEmpty(data)) {
            self.$modal.error({ messageId: 'Msg_1526' }).then(() => {
                this.$close();

                return false;
            });
        }

        return true;
    }

    public showError(res: any) {
        let self = this;

        self.$mask('hide');

        if (!_.isEqual(res.message, 'can not found message id')) {
            self.$modal.error({ messageId: res.messageId, messageParams: res.parameterIds });
        } else {
            self.$modal.error(res.message);
        }
    }

    public setWkType(data: IWorkType[]) {
        let self = this;

        if (self.params.isAddNone) {
            Array.prototype.push.apply(self.wkTypes, data);
        } else {
            self.wkTypes = data;
        }
        self.disPlaywkTypes = self.wkTypes;
    }

    public setSelectedItem() {
        let self = this;

        let selectedItem = _.find(self.wkTypes, function (item) { return item.workTypeCode == self.params.selectedWorkTypeCD; });
        self.selectedWorkType = selectedItem ? selectedItem : self.wkTypes[0];

    }

    public addNoneItem() {
        let self = this;

        if (!self.params.isAddNone) {
            return;
        }

        self.wkTypes.push({
            abbreviationName: '',
            abolishAtr: 0,
            afternoonCls: 0,
            calculatorMethod: 0,
            dispOrder: 0,
            memo: '',
            morningCls: 0,
            name: '選択なし',
            oneDayCls: 0,
            symbolicName: '',
            workAtr: 0,
            workTypeCode: '',
            workTypeSets: null
        });


    }

    public searchInList(value: string) {
        let self = this;
        let searchInput = document.querySelector(':focus') as HTMLElement;

        if (self.checkInput(value)) {
            self.disPlaywkTypes = _.filter(self.wkTypes, (wkType) => {
                return wkType.workTypeCode.indexOf(value) != -1 || wkType.name.indexOf(value) != -1;
            });
        }
        if (searchInput) {
            searchInput.blur();
        }
    }

    private checkInput(value: string) {

        if (value == null) {

            this.$modal.error({ messageId: 'MsgB_24' });

            return false;
        }

        return true;
    }

    public chooseWorkType(selectedItem: IWorkType) {
        let self = this;
        if (selectedItem) {
            self.selectedWorkType = selectedItem;

            if (self.checkSelectWorkTime(selectedItem)) {

                self.openWkTimeDialog(selectedItem);
            } else {

                self.$close({
                    selectedWorkType: selectedItem
                });
            }
        }
    }

    private checkSelectWorkTime(item) {
        let self = this;

        return self.params.isSelectWorkTime && item.workTypeCode;
    }

    public openWkTimeDialog(item) {
        let self = this;
        self.$mask('show', 0.01);
        self.$http.post('at', servicePath.checkWorkTimeSettingNeeded + item.workTypeCode).then((result: { data: number }) => {

            let addNone;

            switch (result.data) {
                case SetupType.REQUIRED:

                    addNone = false;
                    break;
                case SetupType.OPTIONAL:

                    addNone = self.params.isAddNone;
                    break;
                case SetupType.NOT_REQUIRED:

                    self.$close({
                        selectedWorkType: self.selectedWorkType
                    });
                    self.$mask('hide');

                    return;
                default: addNone = false;
            }

            self.$modal(
                'worktime',
                {
                    selectedWorkType: self.selectedWorkType,
                    isAddNone: addNone,
                    seledtedWkTimeCDs: self.params.seledtedWkTimeCDs,
                    selectedWorkTimeCD: self.params.selectedWorkTimeCD,
                    isSelectWorkTime: self.params.isSelectWorkTime
                }
            ).then((f) => {
                if (f) {
                    self.$close(f);
                }
                self.$mask('hide');
            });

        }).catch((res: any) => {

            self.showError(res);

        });
    }

    public back() {
        let self = this;

        self.$close();
    }
}

const servicePath = {
    getAllWkType: 'at/share/worktype/get_not_remove_work_type',
    checkWorkTimeSettingNeeded: 'at/schedule/basicschedule/isWorkTimeSettingNeeded/'
};

const SetupType = {
    // 必須である
    REQUIRED: 0,
    // 任意である
    OPTIONAL: 1,
    // 不要である
    NOT_REQUIRED: 2
};

interface IWorkType {
    abbreviationName: string;
    abolishAtr: number;
    afternoonCls: number;
    calculatorMethod: number;
    dispOrder: number;
    memo: string;
    morningCls: number;
    name: string;
    oneDayCls: number;
    symbolicName: string;
    workAtr: number;
    workTypeCode: string;
    workTypeSets: any;
}

interface IParam {
    isAddNone: boolean;
    seledtedWkTimeCDs: Array<string>;
    selectedWorkTimeCD: string;
    selectedWorkTypeCD: any;
    isSelectWorkTime: boolean;
    seledtedWkTypeCDs: Array<string>;
}