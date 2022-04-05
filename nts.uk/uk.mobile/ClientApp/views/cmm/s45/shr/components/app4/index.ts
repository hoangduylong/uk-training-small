import { Vue, _ } from '@app/provider';
import { component, Prop } from '@app/core/component';

@component({
    name: 'cmms45componentsapp4',
    template: require('./index.vue'),
    style: require('./style.scss'),
    validations: {},
    constraints: []
})
export class CmmS45ComponentsApp4Component extends Vue {
    public title: string = 'CmmS45ComponentsApp4';
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
    public dataOutput: any;

    public isCondition1: boolean = false;
    public isCondition2: boolean = false;
    public isCondition3: boolean = false;
    public isCondition4: boolean = false;

    public goBackDirect: any = new GoBackDirect();

    public user: any;
    public $app() {

        return this.goBackDirect;
    }
    public created() {
        const self = this;
        self.params.appDetail = {};
        self.$auth.user.then((usr: any) => {
            self.user = usr;
        }).then((res: any) => {
            this.fetchData(self.params);
        });
        self.$watch('params.appDispInfoStartupOutput', (newV, oldV) => {
            this.fetchData(self.params);
        });
    }


    public mounted() {

    }
    public fetchData(getParams: any) {
        const self = this;
        self.$http.post('at', API.start, {
            companyId: self.user.companyId,
            applicationId: self.params.appDispInfoStartupOutput.appDetailScreenInfo.application.appID,
            appDispInfoStartupDto: self.params.appDispInfoStartupOutput
        }).then((res: any) => {
                self.dataOutput = res.data;
                self.bindStart();
                self.params.appDetail = self.dataOutput;
                self.$emit('loading-complete');
            }).catch((res: any) => {
                self.$modal.error({ messageId: res.messageId, messageParams: res.parameterIds });
                self.$emit('loading-complete');
            });
    }
    public bindStart() {
        const self = this;
        let params = self.dataOutput;

        self.bindCodition(params);

        let workTypeCode;
        if (params.goBackApplication.dataWork) {
            workTypeCode = params.goBackApplication.dataWork.workType;
        }
        let workType = _.find(params.lstWorkType, (item: any) => item.workTypeCode == workTypeCode);
        let workTypeName = workType ? workType.name : null;
        workTypeCode = workTypeCode ? workTypeCode : 'KAFS09_20';
        workTypeName = workTypeName ? workTypeName : self.$i18n('KAFS09_21');
        self.$app().workType = workTypeCode == 'KAFS09_20' ? self.$i18n(workTypeCode) : (workTypeCode + ' ' + workTypeName);

        let workTimeCode;
        if (params.goBackApplication.dataWork) {
            workTimeCode = params.goBackApplication.dataWork.workTime;
        }
        let workTime = _.find(params.appDispInfoStartup.appDispInfoWithDateOutput.opWorkTimeLst, (item: any) => item.worktimeCode == workTimeCode);
        let workTimeName = workTime ?  workTime.workTimeDisplayName.workTimeName : null;
        workTimeCode = workTimeCode ? workTimeCode : 'KAFS09_20';
        workTime = workTime ? (workTimeName ? workTimeName : self.$i18n('KAFS09_21')) : self.$i18n('KAFS09_21');
        self.$app().workTime = workTimeCode == 'KAFS09_20' ? self.$i18n(workTimeCode) : (workTimeCode + ' ' + workTime);
        self.$app().straight = params.goBackApplication.straightDistinction == 1 ? true : false;
        self.$app().bounce = params.goBackApplication.straightLine == 1 ? true : false;


    }

    public bindCodition(params: any) {
        // set condition
        this.isCondition1 = this.isDisplay1(params);
        this.isCondition2 = this.isDisplay2(params);
        this.isCondition3 = this.isDisplay3(params);
        this.isCondition4 = this.isDisplay4(params);
    }
    public isDisplay1(params: any) {

        return params.goBackApplication.isChangedWork != null;
        // return true;
    }
    // ※1 = ○　AND　「勤務変更申請の表示情報．申請表示情報．申請表示情報(基準日関係なし)．複数回勤務の管理」= true
    public isDisplay2(params: any) {

        return params.goBackReflect.reflectApplication != 0; 
        // return true;

    }
    // 直行直帰申請起動時の表示情報.直行直帰申請.勤務を変更するがNOT Empty AND 直行直帰申請.勤務を変更する = false
    // #112366
    public isDisplay3(params: any) {
        let c1 = params.goBackApplication.isChangedWork != null;
        let c2 = false;
        if (c1) {
            c2 = params.goBackApplication.isChangedWork == 0;
        }
        
        return !(c1 && c2);
        // return true;

    }
    public isDisplay4(params: any) {

        return !(params.goBackReflect.reflectApplication == 0 || params.goBackReflect.reflectApplication == 1);
        // return true;

    }

}
// dto 
class GoBackDirect {

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
    start: 'at/request/application/gobackdirectly/mobile/getDetail'
};

