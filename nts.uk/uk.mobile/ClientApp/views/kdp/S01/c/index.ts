import { component, Prop } from '@app/core/component';
import { _, Vue, moment } from '@app/provider';
import { model } from 'views/kdp/S01/shared/index.d';
import { TimeWithDay ,TimePoint } from '@app/utils/time';

const basePath = 'at/record/stamp/smart-phone/';

const servicePath = {
    getStampResult: basePath + 'get-stamp-result-screen-c',
    regDailyResult: basePath + 'reg-daily-result'
};

@component({
    name: 'kdpS01c',
    style: require('./style.scss'),
    template: require('./index.vue'),
    resource: require('./resources.json'),
    constraints: []
})


export class KdpS01CComponent extends Vue {
    @Prop({ default: () => ({}) })
    public params!: any;
    public screenData: IScreenData = {
        confirmResult: null,
        employeeCode: '000001',
        employeeName: '日通　太郎',
        date: new Date(),
        stampAtr: '出勤',
        localtion: '',
        workTypeName: '',
        workTimeName: '',
        attendanceItem: {
            attendance: '',
            timeItems: [
            ]
        }
    };


    public created() {
        let vm = this,
            parameterIds = [].concat(vm.params.attendanceItemIds);
        parameterIds.push(28, 29, 31, 34);

        let command = {
            startDate: moment(vm.$dt.now).format('YYYY/MM/DD'),
            endDate: moment(vm.$dt.now).format('YYYY/MM/DD'),
            attendanceItemIds: parameterIds,
            baseDate: moment(vm.$dt.now).format('YYYY/MM/DD')
        };

        vm.$mask('show');
        vm.$http.post('at', servicePath.getStampResult, command).then((result: any) => {
            vm.$mask('hide');
            let data: model.IDisplayConfirmStampResultScreenCDto = result.data;

            vm.screenData.confirmResult = data.confirmResult;
            if (data.stampings.length > 0) {
                let items = _(data.stampings).flatMap('stampDataOfEmployeesDto').flatMap('stampRecords').value();
                let item = _.head(_.orderBy(items, ['stampTimeWithSec'], ['desc']));

                if (item) {
                    vm.screenData.date = item.stampTimeWithSec;
                    vm.screenData.stampAtr = item.stampArtName;
                    vm.screenData.localtion = data.workplaceName;
                }

            }

            vm.screenData.workTimeName = data.workTimeName || '';
            vm.screenData.workTypeName = data.workTypeName || '';

            let goingWork = vm.getValue(data.itemValues, 31),
                leave = vm.getValue(data.itemValues, 34);

            if (!!goingWork && !!leave && !!goingWork.value && !!leave.value) {
                vm.screenData.attendanceItem.attendance = [TimeWithDay.getDayName(Number(goingWork.value)) + TimeWithDay.toString(Number(goingWork.value)), TimeWithDay.getDayName(Number(leave.value)) + TimeWithDay.toString(Number(leave.value))].join(' ～ ');
            } else {
                vm.screenData.attendanceItem.attendance = '';
            }

            vm.$auth.user.then((user) => {
                vm.screenData.employeeCode = data.empInfo ? data.empInfo.employeeCode : user.employeeCode;
                vm.screenData.employeeName = data.empInfo ? data.empInfo.pname : '';
            });

            let timeData = _.map(_.filter(data.lstItemDisplayed,(item) => [28, 29, 31, 34].indexOf(item.attendanceItemId) == -1 ) , (item) => {
                let value = vm.toValue(item, _.find(data.itemValues, ['itemId', item.attendanceItemId]));
                
                return { itemId: item.attendanceItemId, title: item.attendanceName, value } ;                
            } );

            vm.screenData.attendanceItem.timeItems = timeData;

        }).catch((res: any) => {
            vm.$modal.error({ messageId: res.messageId, messageParams: res.parameterIds }).then(() => {
                vm.$close();
            });
        });

    }

    get isHasImplementation() {
        let vm = this,
            permissionCheck = _.get(vm, 'screenData.confirmResult.permissionCheck');


        if (_.isNil(permissionCheck)) {
            return State.SETTING_NULL;
        }

        let itemHasData = _.filter(vm.screenData.attendanceItem.timeItems, (item) => {
            return !_.isEmpty(item.value);
        });

        if (permissionCheck === ReleasedAtr.IMPLEMENT && itemHasData.length > 0) {
            return State.IMPLEMENT;
        } else {
            return State.CAN_NOT_IMPLEMENT;
        }

    }

    private toValue(attendanceItem, item) {
        let result = '';

        if (!item || !item.value) {

            return '';
        }

        if (attendanceItem.dailyAttendanceAtr == DailyAttendanceAtr.TimeOfDay) {

            result = TimeWithDay.getDayName(Number(item.value)) + TimeWithDay.toString(Number(item.value));
        }

        if (attendanceItem.dailyAttendanceAtr == DailyAttendanceAtr.NumberOfTime) {

            result = item.value;
        }

        if (attendanceItem.dailyAttendanceAtr == DailyAttendanceAtr.Time) {

            result = TimePoint.toString(Number(item.value));
        }

        if (attendanceItem.dailyAttendanceAtr == DailyAttendanceAtr.AmountOfMoney) {

            result = parseInt(item.value).toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
        }

        return result;
    }

    public getTextColor(date) {

        const daysColor = [
            { day: 0, color: '#FF0000' },
            { day: 6, color: '#0000FF' }
        ];

        let day = moment.utc(date).day(),

            dayColor = _.find(daysColor, ['day', day]);

        return dayColor ? dayColor.color : '#000000';

    }


    private getValue(lstItemDisplayed, itemId) {
        return _.find(lstItemDisplayed, ['itemId', itemId]);
    }

    public regDailyResult() {
        let vm = this,
            command: model.IRegisterVerifiDailyResultCommand = {
                employeeId: vm.screenData.confirmResult.employeeId,
                confirmDetails: [{
                    ymd: vm.screenData.confirmResult.date,
                    identityVerificationStatus: true
                }]
            };
        vm.$mask('show');
        vm.$http.post('at', servicePath.regDailyResult, command).then((result: any) => {
            vm.$mask('hide');
            vm.$modal.info('Msg_15').then(() => {
                vm.$close();
            });
        }).catch((res: any) => {
            vm.$modal.error({ messageId: res.messageId, messageParams: res.parameterIds });
        });

    }
}

enum DailyAttendanceAtr {

    /* コード */
    Code = 0,
    /* マスタを参照する */
    ReferToMaster = 1,
    /* 回数*/
    NumberOfTime = 2,
    /* 金額*/
    AmountOfMoney = 3,
    /* 区分 */
    Classification = 4,
    /* 時間 */
    Time = 5,
    /* 時刻*/
    TimeOfDay = 6,
    /* 文字 */
    Charater = 7
}

interface IScreenData {
    employeeCode: string;
    employeeName: string;
    date: Date;
    stampAtr: string;
    localtion: string;
    workTypeName: string;
    workTimeName: string;
    attendanceItem: IAttendanceItem;
    confirmResult: model.IConfirmStatusActualResultDto;
}
interface IAttendanceItem {
    attendance: string;
    timeItems: Array<ITimeItem>;
}



interface ITimeItem {
    itemId: number;
    title: string;
    value: string;
}

enum ReleasedAtr {
    //実施できない - 解除できない
    CAN_NOT_IMPLEMENT = 0,

    //実施できる - 解除できる
    IMPLEMENT = 1
}

enum State {
    //日の実績の確認状況　＝　Null
    SETTING_NULL = 0,
    //実施できる - 解除できる
    IMPLEMENT = 1,
    //実施できない - 解除できない
    CAN_NOT_IMPLEMENT = 2
}

