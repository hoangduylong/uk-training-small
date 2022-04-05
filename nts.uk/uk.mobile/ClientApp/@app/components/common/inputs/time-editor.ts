import { _, Vue, moment } from '@app/provider';
import { TimeInputType, TimeWithDay, TimePoint, TimeDuration, obj, browser } from '@app/utils';
import { input, InputComponent } from './input';
import { Prop, Emit } from '@app/core/component';
import { TimeWithDayHelper, TimePointHelper, TimeDurationHelper } from '@app/components/controls/time-picker';

@input()
export class TimeComponent extends InputComponent {
    public type: string = 'string';

    public editable: boolean = false;

    @Prop({
        default: TimeInputType.TimeDuration
    })
    public timeInputType: TimeInputType;

    get rawValue() {
        if (_.isNil(this.value)) {
            return '';
        } else {
            switch (this.timeInputType) {
                default:
                case TimeInputType.TimeDuration:
                    return TimeDuration.toString(this.value);
                case TimeInputType.TimeWithDay:
                    return TimeWithDay.toString(this.value);
                case TimeInputType.TimePoint:
                    return TimePoint.toString(this.value);
            }
        }
    }

    get $placeholder() {
        if (this.placeholder) {
            return this.placeholder;
        }

        switch (this.timeInputType) {
            default:
            case TimeInputType.TimeDuration:
                return '--:--';
            case TimeInputType.TimeWithDay:
                return '-- --:--';
            case TimeInputType.TimePoint:
                return '--:--';
        }
    }

    public mounted() {
        this.icons.after = 'far fa-clock';
    }

    @Emit()
    public input() {
        let value = (this.$refs.input as HTMLInputElement).value;

        if (value) {
            let numb = Number(value);

            if (!isNaN(numb)) {
                return numb;
            } else {
                return null;
            }
        }

        return null;
    }

    public click() {
        const vm = this;
        const { $refs } = vm;

        let helper = null;
        let utils = null;
        let className = null;
        switch (this.timeInputType) {
            case TimeInputType.TimeWithDay:
                helper = TimeWithDayHelper;
                utils = TimeWithDay;
                className = 'time-day';
                break;
            case TimeInputType.TimePoint:
                helper = TimePointHelper;
                utils = TimePoint;
                className = 'clock';
                break;
            case TimeInputType.TimeDuration:
            default:
                helper = TimeDurationHelper;
                utils = TimeDuration;
                className = 'time';
                break;
        }

        let value = this.computeValue();

        this.$picker(helper.computeSelecteds(value),
            helper.getDataSource(value),
            helper.onSelect,
            {
                title: utils.toString(value),
                required: this.constraints && this.constraints.required,
                className
            })
            .then((select: any) => {
                if (select === undefined) {
                    //
                } else if (select === null) {
                    this.$emit('input', null);
                } else {
                    this.$emit('input', utils.fromObject(select).value);
                }
            })
            .then(() => {
                const { version } = browser;
                const input: HTMLInputElement = $refs.input as any;

                if (input && version.match(/Safari (7|8|9|10)/)) {
                    input.blur();
                }
            });
    }

    private computeValue(): number {
        let value = this.value;
        if (obj.isNil(value)) {
            switch (this.timeInputType) {

                // default value of time-with-day and time-point is current time
                case TimeInputType.TimeWithDay:
                case TimeInputType.TimePoint:
                    value = moment().hour() * 60 + moment().minute();
                    break;

                // default value time-duration is 0
                case TimeInputType.TimeDuration:
                default:
                    value = 0;
                    break;
            }
        }

        return value;
    }
}

Vue.component('nts-time-editor', TimeComponent);