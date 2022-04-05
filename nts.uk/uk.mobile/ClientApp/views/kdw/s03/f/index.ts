import { Vue, _ } from '@app/provider';
import { component } from '@app/core/component';
import { storage } from '@app/utils';

@component({
    name: 'kdws03f',
    style: require('./style.scss'),
    template: require('./index.vue'),
    resource: require('./resources.json'),
    validations: {},
    constraints: []
})
export class KdwS03FComponent extends Vue {
    public empName: string = '';//対象社員名
    public date: number;//対象年月
    public monthData: Array<IMonthData> = [];
    public dataRes: boolean = false;
    
    //月別実績の参照を起動
    public created() {
        let self = this;
        self.$mask('show');
        //A画面のキャッシュを取得する
        let cache: any = storage.session.getItem('dailyCorrectionState');
        self.date = cache.timePeriodAllInfo.yearMonth;
        let empName: string = (_.find(cache.lstEmployee, (emp) => emp.id == cache.selectedEmployee) || { businessName: '' }).businessName;
        self.empName = empName.length <= 7 ? empName : empName.substr(0, 7) + '...';
        let param = {
            employeeId: cache.selectedEmployee,//社員ID
            formatCode: cache.autBussCode,//フォーマットコード
            yearMonth: cache.timePeriodAllInfo.yearMonth,//年月
            closureId: cache.timePeriodAllInfo.closureId,//締めID
            closureDate: new Date(cache.timePeriodAllInfo.targetRange.endDate)//締め日
        };
        //月別実績のデータを取得する
        self.$http.post('at', servicePath.getMonthlyPer, param).then((result: any) => {
            self.$mask('hide');
            if (_.isEmpty(result.data) || result.data.length == 0) {
                self.dataRes = true;

                return;
            }
            _.each(result.data, (item) => {
                self.monthData.push({
                    id: item.itemId,
                    name: item.name,
                    value: self.valueDis(item.value, item.type)
                });
            });
        }).catch(() => {
            self.$mask('hide');
        });
    }
    //convert value by type
    public valueDis(value: string, type: number) {
        if (value == null) {return '';}
        if (type == ValueType.CLOCK || type == ValueType.TIME) {
            let am = Number(value) < 0;
            let absValues = Math.abs(Number(value));
            let hour = Math.floor(absValues / 60);
            let min = Math.floor(absValues) - hour * 60;
            let result = min < 10 ? (hour + ':0' + min) : (hour + ':' + min);

            return am ? '-' + result : result;
        }
        if (type == ValueType.DATE) {
            return this.$dt.date(new Date(value));
        }
        if (type == ValueType.AMOUNT) {
            return '￥' + value;
        }
        
        return value;
    }
}
const servicePath = {
    getMonthlyPer: 'screen/at/dailyperformance/monthly-perfomance'
};
interface IMonthData {
    id: string;//勤怠項目ID
    name: string;//勤怠項目名
    value: any;//勤怠項目の値
}

enum ValueType {
    TIME = 1,// "TIME", "時間"
    CLOCK = 2,//"CLOCK", "時刻"
    CODE = 3,//"CODE", "コード"
    TEXT = 4,//"TEXT", "文字"
    DATE = 5,//"DATE", "年月日"
    RATE = 6,//"DOUBLE", "率"
    COUNT = 7,//"COUNT", "回数"
    COUNT_WITH_DECIMAL = 8,//"COUNT", "回数"
    FLAG = 9,//"FLAG", "フラグ"
    ATTR = 10,//"ATTR", "区分"
    UNKNOWN = 11,// "UNKNOWN", "UNKNOWN"
    DAYS = 12,//"DAYS", "日数"
    AMOUNT = 13,//"AMOUNT", "金額"
    NUMBER = 14,//"NUMBER", "数"
    TIME_WITH_DAY = 15// "TIME_WITH_DAY", "時刻（日区分付き）"
}