import { Vue } from '@app/provider';
import { component, Prop } from '@app/core/component';
import { KafS00SubP1Component, ExcessTimeStatus } from 'views/kaf/s00/sub/p1/';
import { AppTimeType } from 'views/kaf/s12/shr';

@component({
    name: 'kafs12-late-early',
    template: require('./index.vue'),
    components: {
        'kafs00subp1': KafS00SubP1Component,
    },
    validations: {
        params: {
            timeValue: {
                constraint: 'AttendanceClock'
            }
        }
    },
    constraints: [
        'nts.uk.shr.com.time.AttendanceClock'
    ]
})
export class KafS12LateEarlyComponent extends Vue {
    @Prop({ default: {} })
    public readonly params: any;
    @Prop({ default: null })
    public appDispInfoStartupOutput: any;

    public created() {
        const self = this;
    }

    get scheduledTime() {
        const self = this;
        let scheduleTime = null;
        if (self.appDispInfoStartupOutput
            && self.appDispInfoStartupOutput.appDispInfoWithDateOutput.opActualContentDisplayLst
            && self.appDispInfoStartupOutput.appDispInfoWithDateOutput.opActualContentDisplayLst[0].opAchievementDetail) {
            switch (self.params.appTimeType) {
                case AppTimeType.ATWORK:
                    scheduleTime = self.appDispInfoStartupOutput.appDispInfoWithDateOutput.opActualContentDisplayLst[0].opAchievementDetail.achievementEarly.scheAttendanceTime1;
                    break;
                case AppTimeType.OFFWORK:
                    scheduleTime = self.appDispInfoStartupOutput.appDispInfoWithDateOutput.opActualContentDisplayLst[0].opAchievementDetail.achievementEarly.scheDepartureTime1;
                    break;
                case AppTimeType.ATWORK2:
                    scheduleTime = self.appDispInfoStartupOutput.appDispInfoWithDateOutput.opActualContentDisplayLst[0].opAchievementDetail.achievementEarly.scheAttendanceTime2;
                    break;
                case AppTimeType.OFFWORK2:
                    scheduleTime = self.appDispInfoStartupOutput.appDispInfoWithDateOutput.opActualContentDisplayLst[0].opAchievementDetail.achievementEarly.scheDepartureTime2;
                    break;
                default:
                    break;
            }
        }

        return {
            scheduleDisp: true,
            scheduleTime,
            scheduleExcess: ExcessTimeStatus.NONE
        };
    }
}
