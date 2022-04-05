import { Vue, _, moment } from '@app/provider';
import { component, Prop } from '@app/core/component';
import { TimePoint } from '@app/utils';

@component({
    name: 'cmms45shrcomponentsapp71',
    style: require('./style.scss'),
    template: require('./index.vue'),
    resource: require('./resources.json'),
    validations: {},
    constraints: []
})
export class CmmS45ShrComponentsApp71Component extends Vue {
    public title: string = 'CmmS45ShrComponentsApp71';
    @Prop({
        default: () => ({
            appDispInfoStartupOutput: null,
            appDetail: null
        })

    })
    public readonly params: {
        appDispInfoStartupOutput: any,
        appDetail: any
    };

    public dataFetch: any;

    public user: any;

    public stampAtr: number = 3;

    public gooutReason: number = 3;

    public timeDuration: string = null;

    public created() {
        const vm = this;
        vm.params.appDetail = {};
        vm.$auth.user.then((usr: any) => {
            vm.user = usr;
        }).then((res: any) => {
            this.fetchData(vm.params);
        });

        vm.$watch('params.appDispInfoStartupOutput', (newV, oldV) => {
            vm.fetchData(vm.params);
        });
    }

    public mounted() {

    }

    public fetchData(data: any) {
        const self = this;

        self.$http.post('at', API.detailAppStamp, {
            companyId: self.user.companyId,
            appId: self.params.appDispInfoStartupOutput.appDetailScreenInfo.application.appID,
            appDispInfoStartupDto: self.params.appDispInfoStartupOutput,
            recoderFlag: true
        })
            .then((result: any) => {
                if (result) {
                    console.log(result);
                    self.dataFetch = result.data;
                    self.bindData();
                    self.params.appDetail = self.dataFetch;
                }
                self.$parent.$emit('loading-complete');
            })
            .catch((result: any) => {
                self.$parent.$emit('loading-complete');
                if (result.messageId) {
                    self.$modal.error({ messageId: result.messageId, messageParams: result.parameterIds });
                } else {
                    if (result.errors) {
                        if (_.isArray(result.errors)) {
                            self.$modal.error({ messageId: result.errors[0].messageId, messageParams: result.parameterIds });
                        } else {
                            self.$modal.error({ messageId: result.errors.messageId, messageParams: result.parameterIds });
                        }
                    }
                }
            });
    }

    public bindData() {
        const self = this;

        self.stampAtr = self.dataFetch.appRecordImage.appStampCombinationAtr;
        self.gooutReason = self.dataFetch.appRecordImage.appStampGoOutAtr;
        // self.timeDuration = moment(self.dataFetch.appRecordImage.attendanceTime).format('hh:mm');
        self.timeDuration = TimePoint.toString(self.dataFetch.appRecordImage.attendanceTime);
    }
}

export enum GoOutReasonAtr {
    PRIVATE = 0,
    PUBLIC = 1,
    COMPENSATION = 2,
    UNION = 3
}

export enum EngraveAtr {
    ATTENDANCE = 0,
    OFFICE_WORK = 1,
    OVERTIME = 2,
    GO_OUT = 3,
    RETURN = 4,
    EARLY = 5,
    HOLIDAY = 6
}

const API = {
    detailAppStamp: 'at/request/application/stamp/detailAppStamp',
};