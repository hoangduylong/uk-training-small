import { Watch, component, Prop } from '@app/core/component';
import { _, Vue, moment } from '@app/provider';
import { model } from 'views/kdp/S01/shared/index.d';

const basePath = 'at/record/stamp/smart-phone/';

const servicePath = {
    displayHistory: basePath + 'display-history',
};

@component({
    name: 'kdpS01s',
    style: require('./style.scss'),
    template: require('./index.vue'),
    resource: require('./resources.json'),
    constraints: [],
    validations: {
        yearMonth: {
            required: true
        }
    }
})


export class KdpS01SComponent extends Vue {
    @Prop({ default: () => ({}) })
    public params!: any;
    public selectedValue = 1;
    public yearMonth = moment().format('YYYYMM');
    public dropdownList = [{
        code: '1',
        text: 'KDPS01_56'
    }, {
        code: '2',
        text: 'KDPS01_57'
    }, {
        code: '3',
        text: 'KDPS01_58'
    }, {
        code: '4',
        text: 'KDPS01_59'
    }];

    public screenData: any = {
        items: []
    };

    @Watch('yearMonth')
    public subcribeYearMonth(value: string) {
        let vm = this;
        vm.loadData();
    }

    public loadData() {
        let vm = this,
            baseDate = vm.$dt.yearmonth(Number(vm.yearMonth), 'YYYY/MM/DD');

        let query = {
            startDate: moment(baseDate).startOf('month').format('YYYY/MM/DD'),
            endDate: moment(baseDate).endOf('month').format('YYYY/MM/DD')
        };

        vm.$mask('show');
        vm.$http.post('at', servicePath.displayHistory, query).then((result: any) => {
            vm.$mask('hide');
            let items = _(result.data).flatMap('listStampInfoDisp').value();

            vm.screenData.items = _.orderBy(items, ['stampDatetime'], ['asc']);
        });

    }

    public created() {
        let vm = this;

        vm.loadData();
    }

    get getItems() {
        let vm = this;


        return _.filter(vm.screenData.items, function (item) {

            if (vm.selectedValue == 1) {

                return vm.screenData.items;
            }

            if (!_.has(item, 'stamp.changeClockArt')) {

                return false;
            }
            let value = item.stamp.changeClockArt;
            if (vm.selectedValue == 2) {

                return [ChangeClockArt.GOING_TO_WORK, ChangeClockArt.WORKING_OUT].indexOf(value) != -1;
            }
            if (vm.selectedValue == 3) {

                return [ChangeClockArt.GO_OUT, ChangeClockArt.RETURN].indexOf(value) != -1;
            }

            if (vm.selectedValue == 4) {
                return [ChangeClockArt.FIX, ChangeClockArt.END_OF_SUPPORT, ChangeClockArt.SUPPORT, ChangeClockArt.TEMPORARY_SUPPORT_WORK].indexOf(value) != -1;
            }

        });

    }


    public getSymbol(item) {

        if (!_.has(item, 'stamp.relieve.stampMeans')) {
            return '';
        }
        let value = item.stamp.relieve.stampMeans;

        const stampTypes = [
            { text: 'KDP002_120', value: 0 },
            { text: 'KDP002_120', value: 1 },
            { text: 'KDP002_120', value: 2 },
            { text: 'KDP002_120', value: 3 },
            { text: 'KDP002_120', value: 4 },
            { text: 'KDP002_121', value: 5 },
            { text: 'KDP002_122', value: 6 },
            { text: 'KDP002_120', value: 8 }
        ];

        let data = _.find(stampTypes, ['value', value]);

        if (data) {
            return data.text;
        } else {
            return '';
        }

    }

    public getTextAlign(item) {

        if (!_.has(item, 'stamp.buttonValueType')) {
            return '';
        }
        let value = item.stamp.buttonValueType;
        if (ButtonType.GOING_TO_WORK == value || ButtonType.RESERVATION_SYSTEM == value) {

            return 'left';

        }

        if (ButtonType.WORKING_OUT == value) {

            return 'right';

        }

        return 'center';
    }

    public getTextColor(item) {

        const daysColor = [
            { day: 0, color: '#FF0000' },
            { day: 6, color: '#0000FF' }
        ];

        let day = moment.utc(item.stampDatetime).day(),

            dayColor = _.find(daysColor, ['day', day]);

        return dayColor ? dayColor.color : '#000000';

    }
}
interface Iitem {
    id: number;
    date: string;
    symbol: string;
    time: string;
    stampType: string;
}

enum ButtonType {
    // 系

    GOING_TO_WORK = 1,
    // 系

    WORKING_OUT = 2,
    // "外出系"

    GO_OUT = 3,
    // 戻り系

    RETURN = 4,
    // 予約系

    RESERVATION_SYSTEM = 5
}

export enum ChangeClockArt {
    /** 0. 出勤 */
    GOING_TO_WORK = 0,

    /** 1. 退勤 */
    WORKING_OUT = 1,

    /** 2. 入門 */
    OVER_TIME = 2,

    /** 3. 退門 */
    BRARK = 3,

    /** 4. 外出 */
    GO_OUT = 4,

    /** 5. 戻り */
    RETURN = 5,

    /** 6. 応援開始 */
    FIX = 6,

    /** 7. 臨時出勤 */
    TEMPORARY_WORK = 7,

    /** 8. 応援終了 */
    END_OF_SUPPORT = 8,

    /** 9. 臨時退勤 */
    TEMPORARY_LEAVING = 9,

    /** 10. PCログオン */
    PC_LOG_ON = 10,

    /** 11. PCログオフ */
    PC_LOG_OFF = 11,

    /** 12. 応援出勤 */
    SUPPORT = 12,

    /** 13. 臨時+応援出勤 */
    TEMPORARY_SUPPORT_WORK = 13
}