import { component, Prop } from '@app/core/component';
import { _, Vue, moment } from '@app/provider';
import { model } from 'views/kdp/S01/shared/index.d';

@component({
    name: 'kdpS01t',
    style: require('./style.scss'),
    template: require('./index.vue'),
    resource: require('./resources.json'),
    constraints: []
})


export class KdpS01TComponent extends Vue {
    @Prop({ default: () => ({}) })
    public params!: model.IGetOmissionContentDto;
    public setting: ISetting = {
        error: { messageContent: '', messageColor: '' },
        errorDate: new Date(),
        buttons: [
            { type: 1, dispName: '打刻申請', url: '' },
            { type: 2, dispName: '残業申請', url: '' },
            { type: 3, dispName: '休暇申請', url: '' },
            { type: 4, dispName: '休日出勤時間申請', url: '' },
            { type: 5, dispName: '遅刻・早退取消申請', url: '' },
            { type: 6, dispName: '時間年休申請', url: '' },
        ]
    };

    public goto(button) {
        let vm = this,
            url = button.screen + 's' + button.screenCd.slice(1) + button.screenId.toLowerCase(),
            param = { date: moment(vm.setting.errorDate).format('YYYY/MM/DD') };

        vm.$goto(url, param);
        // hien tai khong can param
        // if (button.queryString) {
        //     let value = button.queryString.split('=')[1];
        //     param = { value };

        //     vm.$goto(url, param);
        // } else {
        //     vm.$goto(url);
        // }

    }


    public created() {
        let vm = this;
        vm.params.errorInfo = _.orderBy(vm.params.errorInfo, ['lastDateError'], ['desc']);

        let errorData: any = _.head(vm.params.errorInfo);

        if (errorData && errorData.promptingMessage) {
            vm.setting.error = errorData.promptingMessage;
            vm.setting.errorDate = errorData.lastDateError;

            let buttons = [];
            _.forEach(_.slice(errorData.listRequired, 0, 6), function (value) {
                let btn = _.find(vm.params.appDispNames, ['appType', value]);
                if (btn) {
                    buttons.push(btn);
                }
            });
            vm.setting.buttons = buttons;
        }


    }

    public mounted() {
        let vm = this;

        _.delay(function () {
            let btnFunctions = vm.$refs.functionBtns as HTMLButtonElement[],
                btnDefault = vm.$refs.functionBtn as HTMLButtonElement;

            if (!!btnFunctions && btnFunctions.length) {
                btnFunctions[0].focus();
            } else {
                if (!!btnDefault) {
                    btnDefault.focus();
                }
            }

        }, 300);

    }
}

interface ISetting {
    error: any;
    errorDate: Date;
    buttons: Array<IButton>;
}

interface IButton {
    type: number;
    dispName: string;
    url: string;
}