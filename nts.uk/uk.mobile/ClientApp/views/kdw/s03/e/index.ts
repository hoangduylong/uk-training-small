import { Vue, _, moment } from '@app/provider';
import { component, Prop } from '@app/core/component';
import { storage } from '@app/utils';
import { LoDashStatic } from 'lodash';

@component({
    name: 'kdws03e',
    style: require('./style.scss'),
    template: require('./index.vue'),
    resource: require('./resources.json'),
    validations: {},
    constraints: []
})
export class KdwS03EComponent extends Vue {
    @Prop({ default: () => ({ employeeId: '', empName: '', date: new Date(), code: '', attendanceItemList: []}) })
    public readonly params: { employeeId: string, empName: string, date: Date, code: string, attendanceItemList: Array<number> };
    public empName: string = '';//対象社員名
    public errorInfo: IErrorInfo = {
        code: '',
        name: '',
        errMsg: ''
    };
    public displayE71: boolean = true;

    public created() {
        let self = this;
        self.params.date = moment(self.params.date).utc().toDate();
        self.$mask('show');
        self.empName = self.params.empName.length <= 7 ? self.params.empName : self.params.empName.substr(0, 7) + '...';
        //A画面のキャッシュを取得する
        let cache: any = storage.session.getItem('dailyCorrectionState');
        self.displayE71 = self.checkEsxit(cache.headerLst, self.params.attendanceItemList);
        console.log(self.params.attendanceItemList);
        let param = {
            employeeId: self.params.employeeId,//社員ID
            date: self.params.date,//日
            errCode: self.params.code//エラーアラームコード
        };
        self.$http.post('at', servicePath.getError, param).then((result: any) => {
            self.$mask('hide');
            self.errorInfo = {
                code: result.data.code,
                name: result.data.name,
                errMsg: result.data.errMsg
            };
        }).catch(() => {
            self.$mask('hide');
        });
    }
    //修正画面に遷移できるかチェックする
    public checkEsxit(lstA: Array<any>, lstErr: Array<number>) {
        if (_.isEmpty(lstErr)) { return false; }
        for (let k = 0; k < lstErr.length; k++) {
            let esxit1 = false;
            for (let i = 0; i < lstA.length; i++) {
                if (lstA[i].key === 'A' + lstErr[k]) {
                    esxit1 = true;
                    break;
                }
            }
            if (!esxit1) {return false;}
        }

        return true;
    }
    //実績を修正する
    public editData() {
        let self = this;
        let paramOpenB = {
            openB: true,
            employeeId: self.params.employeeId,
            employeeName: self.params.empName,
            date: self.$dt.date(self.params.date, 'YYYY/MM/DD')
        };
        self.$close(paramOpenB);
    }

    
}
const servicePath = {
    getError: 'screen/at/dailyperformance/error-detail'
};

interface IErrorInfo {
    code: string;//コード
    name: string;//エラー内容
    errMsg: string;//メッセージ
}