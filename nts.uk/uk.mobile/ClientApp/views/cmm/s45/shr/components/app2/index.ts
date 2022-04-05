import { Vue, _ } from '@app/provider';
import { component, Prop } from '@app/core/component';

@component({
    name: 'cmms45componentsapp2',
    template: require('./index.vue'),
    style: require('./style.scss'),
    validations: {},
    constraints: []
    
})
export class CmmS45ComponentsApp2Component extends Vue {
    public title: string = 'CmmS45ComponentsApp1';
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

    public isCondition1: boolean = false;
    public isCondition2: boolean = false;

    public appWorkChange: any = new AppWorkChange();
    public $app() {

        return this.appWorkChange;
    }
    public user: any;
    public created() {
        const self = this;
        self.params.appDetail = {};
        self.$auth.user.then((usr: any) => {
            self.user = usr;
        }).then((res: any) => {
            self.fetchData(self.params);
        });

        self.$watch('params.appDispInfoStartupOutput', (newV, oldV) => {
            self.fetchData(self.params);
        });

    }


    public mounted() {

    }
    public fetchData(getParams: any) {
        const self = this;
        self.$http.post('at', API.start, {
            companyId: self.user.companyId,
            appId: self.params.appDispInfoStartupOutput.appDetailScreenInfo.application.appID,
            appDispInfoStartupDto: self.params.appDispInfoStartupOutput
        })
            .then((res: any) => {
                self.dataFetch = res.data;
                self.bindStart();
                self.params.appDetail = self.dataFetch;
                // self.bindCodition(self.dataFetch.appWorkChangeDispInfo);
                self.$emit('loading-complete');
            })
            .catch((res: any) => {
                if (res.messageId) {
                    self.$modal.error({ messageId: res.messageId, messageParams: res.parameterIds });
                } else {
                    
                    if (_.isArray(res.errors)) {
                        self.$modal.error({ messageId: res.errors[0].messageId, messageParams: res.parameterIds });
                    } else {
                        self.$modal.error({ messageId: res.errors.messageId, messageParams: res.parameterIds });
                    }
                }
                self.$emit('loading-complete');
            })
            ;
    }
    public bindStart() {
        const self = this;
        let params = self.dataFetch;

        self.bindCodition(params.appWorkChangeDispInfo);

        let workTypeCode = params.appWorkChange.opWorkTypeCD;
        let workType = _.find(params.appWorkChangeDispInfo.workTypeLst, (item: any) => item.workTypeCode == workTypeCode);
        let workTypeName = workType ? workType.name : self.$i18n('KAFS07_10');
        self.$app().workType = workTypeCode + '  ' + workTypeName;

        let workTimeCode = params.appWorkChange.opWorkTimeCD;
        let workTime = _.find(params.appWorkChangeDispInfo.appDispInfoStartupOutput.appDispInfoWithDateOutput.opWorkTimeLst, (item: any) => item.worktimeCode == workTimeCode);
        let workTimeName = workTime ? workTime.workTimeDisplayName.workTimeName : self.$i18n('KAFS07_10');
        if (!workTimeCode) {
            workTimeCode = self.$i18n('KAFS07_9');
            workTimeName = '';
        }
        self.$app().workTime = workTimeCode + '  ' + workTimeName;
        if (!_.isEmpty(params.appWorkChange.timeZoneWithWorkNoLst)) {
            let time1 = _.find(params.appWorkChange.timeZoneWithWorkNoLst, (item: any) => item.workNo == 1);
            let time2 = _.find(params.appWorkChange.timeZoneWithWorkNoLst, (item: any) => item.workNo == 2);
            if (time1) {
                self.$app().workHours1 = self.$dt.timedr(time1.timeZone.startTime) + ' ~ ' + self.$dt.timedr(time1.timeZone.endTime);
            } else {
                self.$app().workHours1 = self.$i18n('KAFS07_15');
                self.$app().isWorkHours1 = false;
            }
            if (time2) {
                self.$app().workHours2 = self.$dt.timedr(time2.timeZone.startTime) + ' ~ ' + self.$dt.timedr(time2.timeZone.endTime);
            } else {
                self.$app().workHours2 = self.$i18n('KAFS07_15');
                self.$app().isWorkHours2 = false;
            }
        } else {
            if (self.isCondition1) {
                self.$app().workHours1 = self.$i18n('KAFS07_15');
                self.$app().workHours2 = self.$i18n('KAFS07_15');
            }
        }
        self.$app().straight = params.appWorkChange.straightGo == 1 ? true : false;
        self.$app().bounce = params.appWorkChange.straightBack == 1 ? true : false;


    }

    public bindCodition(params: any) {
        const self = this;
        // set condition

        self.isCondition1 = self.isDisplay1(params);
        self.isCondition2 = self.isDisplay2(params);
    }
    // 「勤務変更申請の表示情報．勤務変更申請の反映.出退勤を反映するか」がする
    public isDisplay1(params: any) {
        return params.reflectWorkChangeAppDto.whetherReflectAttendance == 1;
        // return true;
    }
    // ※1 = ○　AND　「勤務変更申請の表示情報．申請表示情報．申請表示情報(基準日関係なし)．複数回勤務の管理」= true
    public isDisplay2(params: any) {
        return params.reflectWorkChangeAppDto.whetherReflectAttendance == 1 && params.appDispInfoStartupOutput.appDispInfoNoDateOutput.managementMultipleWorkCycles;
        // return true;

    }

}
// dto 
export class AppWorkChange {

    public workType: string = '';

    public workTime: string = '';

    public workHours1: string = '';

    public isWorkHours1: boolean = true;

    public workHours2: string = '';

    public isWorkHours2: boolean = true;

    public straight: boolean = true;

    public bounce: boolean = true;

    constructor() {

    }
}
const API = {
    start: 'at/request/application/workchange/mobile/startDetailMobile'
};

