import { component, Prop } from '@app/core/component';
import { _, Vue, moment } from '@app/provider';
import * as $ from 'jquery';

import { CalendarComponent } from 'views/ksu/s02/component/calendar';
import {
    FirstInformationDto,
    WorkAvailabilityOfOneDayDto,
    ShiftMasterAndWorkInfoScheTime,
    ShiftMasterDto,
    WorkInfoAndScheTime,
    WorkAvailabilityDisplayInfoDto,
    SubmitWorkRequestCmd
} from 'views/ksu/s02/component/a';

@component({
    name: 'ksus02',
    route: '/ksu/s02/a',
    template: require('./index.vue'),
    resource: require('./resources.json'),
    constraints: [],
    components: {
        'calendar': CalendarComponent
    }
})
export class Ksus02Component extends Vue {

    @Prop({ default: () => ({}) })
    public params!: any;
    public clnLst = [];
    public datas = [];
    public dataCalendar = { data: null,checkRegister : false };
    public paramRegister = null;
    public isCurrentMonth: any = true;

    public created() {
        let vm = this;
    }

    public dataStartPage: any = null;

    public smallDevice = true;

    public mounted() {
        $('.container-fluid').first().removeClass( 'px-3' ).addClass( 'px-0' );
        this.startPage();
        // this.getData();
        if (screen.height > 700) {
            this.smallDevice = false;
            }
    }

    public dataFromChild(dataFromChild) {
        let self = this;
        self.paramRegister = dataFromChild;
    }

    public dataChange(dataFromChild) {
        let self = this;
        let d = dataFromChild;
        if (dataFromChild.startDate == 'Invalid date' || dataFromChild.endDate == 'Invalid date') {
            return;
        }
        self.$mask('show');
        self.$http.post('at', servicePath.getWorkRequest, { startDate: dataFromChild.startDate, endDate: dataFromChild.endDate }).then((result: any) => {
            let year = new Date(dataFromChild.startDate).getFullYear();
            let month = new Date(dataFromChild.startDate).getMonth() + 1;
            if (year > parseInt(self.startWork.substring(0, 4)) || year == parseInt(self.startWork.substring(0, 4)) && month >= parseInt(self.startWork.substring(5, 7))) {
                self.isCurrentMonth = true;
            } else {
                self.isCurrentMonth = false;
            }
            self.dataStartPage.displayInfoListWorkOneDay = result.data.listWorkAvai;
            self.dataStartPage.startWork = dataFromChild.startDate;
            self.dataStartPage.endWork = dataFromChild.endDate;
            self.dataStartPage.listDateIsHoliday = result.data.listDateHoliday;
            self.loadData();
            // console.log(result);
            self.$mask('hide');
        }).catch((res: any) => {
            self.showError(res);
        });
        let i = 0;

    }
    public alarmMsg = '';
     
    private startWork = '';

    private startPage() {
        let self = this;
        self.$mask('show');
        self.$http.post('at', servicePath.getInforinitialStartup, { baseDate: moment(new Date()).format('YYYY/MM/DD') }).then((result: any) => {
            self.dataStartPage = result.data;
            self.startWork = result.data.startWork;
            let startDate = new Date(result.data.deadlineForWork);
            let dateOfWeek = moment(moment(startDate).format('YYYY/MM/DD')).format('dd');   
            self.alarmMsg = this.$i18n('KSUS02_1', (self.dataStartPage.shiftWorkUnit == 1 ? this.$i18n('KSUS02_19') + parseInt(self.dataStartPage.deadlineForWork.substring(8, 10)) + '日' :
                this.$i18n('KSUS02_20') + dateOfWeek + '曜日'));
            self.loadData();
            // console.log(result);
            self.$mask('hide');
        }).catch((res: any) => {
            self.isCurrentMonth = false;
            self.showError(res);
            self.$mask('hide');
        });
    }

    public checkRegister = false;
    public loadData() {
        let self = this;
        self.dataCalendar = {
            data: self.dataStartPage,
            checkRegister : self.checkRegister
        };
    }
    public register() {
        let self = this;
        if (self.paramRegister == null) {
            return;
        }
        if (!self.$children[0].$children[0].$valid) {
            return;
        }
        self.$mask('show');
        self.$http.post('at', servicePath.saveWorkRequest, self.paramRegister).then((result: any) => {
            self.$modal.info('Msg_15').then(() => {
                self.$mask('hide');
                
                let data = {
                    startDate: self.paramRegister.startPeriod,
                    endDate: self.paramRegister.endPeriod
                };
                self.dataChange(data);
                self.checkRegister = true;
            });
        }).catch((res: any) => {
            self.showError(res);
            self.$mask('hide');
        });
    }
    private showError(error: any) {
        const vm = this;
        switch (error.messageId) {
            case 'Msg_2049':
                vm.$modal.error({ messageId: error.messageId, messageParams: error.parameterIds })
                    .then(() => {
                        vm.$goto('ccg008a');
                    });
                break;
            case 'Msg_2050':
                vm.$modal.error({ messageId: error.messageId, messageParams: error.parameterIds })
                    .then(() => {
                    });
                break;
            case 'Msg_2051':
                vm.$modal.error({ messageId: error.messageId, messageParams: error.parameterIds })
                    .then(() => {
                    });
                break;
            default:
                vm.$modal.error({ messageId: error.messageId, messageParams: error.parameterIds })
                    .then(() => {
                        vm.$goto('ccg008a');
                    });
                break;
        }
    }

}

const servicePath = {
    getInforinitialStartup: 'screen/at/schedule/getInforinitialStartup',
    saveWorkRequest: 'screen/at/schedule/saveworkrequest',
    getWorkRequest: 'screen/at/schedule/getWorkRequest'
};







