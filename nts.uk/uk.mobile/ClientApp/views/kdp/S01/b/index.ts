import { component, Prop, Model } from '@app/core/component';
import { model } from 'views/kdp/S01/shared/index.d';
import { _, Vue, moment } from '@app/provider';

const basePath = 'at/record/stamp/smart-phone/';

const servicePath = {
    getStampResult: basePath + 'get-stamp-result-screen-b',
    getEmojiSetting: 'at/record/stamp/setting_emoji_stamp',
    registerEmoji: 'at/record/stamp/regis_emotional_state'
};

@component({
    name: 'kdpS01b',
    style: require('./style.scss'),
    template: require('./index.vue'),
    resource: require('./resources.json'),
    constraints: []
})


export class KdpS01BComponent extends Vue {
    @Prop({ default: () => ({}) })
    public params!: model.IScreenBParam;
    public isEmotionMode: boolean = false;
    public employeeId: string;

    public screenData: IScreenData = {
        employeeCode: '000001',
        employeeName: '日通　太郎',
        date: new Date(),
        stampAtr: '出勤',
        stampCard: 'A1234567890',
        localtion: '本社'
    };

    private interval: any;


    public created() {
        let vm = this,
            command = {
                startDate: moment(vm.$dt.now).format('YYYY/MM/DD'),
                endDate: moment(vm.$dt.now).format('YYYY/MM/DD')
            };

        vm.$mask('show');
        vm.$http.post('at', servicePath.getStampResult, command).then((result: any) => {
            vm.$mask('hide');

            let data = result.data as model.IScreenBResult;

            if (data.empDatas) {

                let items = _(data.empDatas).flatMap('listStampInfoDisp').value();
                let item = _.head(_.orderBy(items, ['stampStringDatetime'], ['desc']));
                if (item) {
                    vm.screenData.date = item.stampStringDatetime;
                    vm.screenData.stampAtr = item.stampAtr;
                    vm.screenData.stampCard = _.get(item, 'stamp.refActualResult.cardNumberSupport', null);

                }

            } else {
                vm.$modal.error('Not Found Stamp Data');
            }

            vm.screenData.localtion = data.workplaceName;
            vm.$auth.user.then((user) => {
                vm.screenData.employeeCode = user.employeeCode;
                vm.screenData.employeeName = data.empInfo.pname;
                vm.employeeId = user.employeeId;
            });

        }).then(() => {
            vm.$http.post('at', servicePath.getEmojiSetting).then((result: any) => {
           
                if (result.data == true && _.includes (['出勤', '出勤応援', '直行', '早出', '休出'], vm.screenData.stampAtr)) {
                    vm.isEmotionMode = true;
                }
    
                if (!vm.isEmotionMode) {
                    vm.InitCountTime();
                }
            });
        })
        .catch((res: any) => {
            vm.$modal.error({ messageId: res.messageId, messageParams: res.parameterIds });
        });

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

    private InitCountTime() {
        let vm = this;
        if (vm.params.resultDisplayTime > 0) {
            vm.interval = setInterval(() => {
                vm.params.resultDisplayTime--;
                if (vm.params.resultDisplayTime === 0) { vm.$close(); }
            }, 1000);
        }

    }

    public clickEmoji(type: number) {
        let vm = this,
            command = {
                sid: vm.employeeId, //社員ID
                emoji: type, //感情種類
                date: moment(vm.$dt.now) //年月日
            };
        vm.$http.post('at', servicePath.registerEmoji, command).then((result: any) => {
            vm.$close();
        });
    }

}

interface IScreenData {
    employeeCode: string;
    employeeName: string;
    date: Date;
    stampAtr: string;
    stampCard: string;
    localtion: string;
}




