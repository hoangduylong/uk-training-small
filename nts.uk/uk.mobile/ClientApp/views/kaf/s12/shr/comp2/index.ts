import { Vue } from '@app/provider';
import { component, Prop } from '@app/core/component';
import {TimePoint} from '@app/utils/time';
import {AppTimeType, GoingOutReason} from '../';

@component({
    name: 'kafs12-outing',
    template: require('./index.vue'),
    components: {},
    validations: {
        params: {
            timeZone: {
                timeRange: true,
                valueCheck: {
                    test(value: any) {
                        return (!value.start || (value.start >= 0 && value.start <= 1439))
                            && (!value.end || (value.end >= 0 && value.end <= 1439));
                    },
                    messageId: ['MsgB_45', TimePoint.toString(0, 'h'), TimePoint.toString(1439, 'h')]
                },
                requiredCheck: {
                    test(value: any) {
                        return (!!value.start && !!value.end) || (!value.start && !value.end);
                    },
                    messageId: ['MsgB_30']
                },
            }
        }
    },
    constraints: []
})
export class KafS12OutingComponent extends Vue {
    @Prop({ default: null })
    public readonly params: any;
    @Prop({ default: false })
    public readonly displaySwitch: boolean;
    @Prop({ default: null })
    public appDispInfoStartupOutput: any;
    @Prop({ default: null })
    public reflectSetting: any;

    public created() {
        const self = this;
    }

    get switchOptions() {
        if (this.params.appTimeType == GoingOutReason.PUBLIC) {
            return [{ id: GoingOutReason.PUBLIC, name: 'KAFS12_53' }];
        }

        if (this.params.appTimeType == GoingOutReason.COMPENSATION) {
            return [{ id: GoingOutReason.COMPENSATION, name: 'KAFS12_52' }];
        }

        return [
            { id: GoingOutReason.PRIVATE, name: 'KAFS12_15' },
            { id: GoingOutReason.UNION, name: 'KAFS12_16' }
        ];
    }

    get disabled() {
        if (this.params.appTimeType == GoingOutReason.PUBLIC || this.params.appTimeType == GoingOutReason.COMPENSATION) {
            return true;
        }

        if (!this.displaySwitch) {
            if (!!this.reflectSetting
                && !!this.reflectSetting
                && this.reflectSetting.destination.privateGoingOut == 1
                && this.params.appTimeType == GoingOutReason.UNION) {
                return true;
            }

            if (!!this.reflectSetting
                && !!this.reflectSetting
                && this.reflectSetting.destination.unionGoingOut == 1
                && this.params.appTimeType == GoingOutReason.PRIVATE) {
                return true;
            }
        }

        return false;
    }
}
