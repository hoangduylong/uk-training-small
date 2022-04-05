import { Vue, _ } from '@app/provider';
import { component, Prop } from '@app/core/component';
import { TimeWithDay } from '@app/utils/time';
import { TimeWithDayHelper } from '@app/components/controls/time-picker';
@component({
    template: `<div class="form-group mb-0">
        <div class="input-group input-group-time">             
            <template v-if="iconsClass.before">
                <div class="input-group-prepend" v-click:500="emitSearch" v-bind:key="'show'">
                    <span class="input-group-text" v-bind:class="iconsClass.before">{{ !iconsClass.before ? icons.before : '' }}</span>
                </div>
            </template>
            <template v-else></template>
            <div class="form-control">
                <div class="row m-0">
                    <div class="col-5 p-0 text-center" v-click:1000="selectStartTime">{{displayStartTime}}</div>
                    <div class="col-2 p-0 text-center">～</div>
                    <div class="col-5 p-0 text-center" v-click:1000="selectEndTime">{{displayEndTime}}</div>
                </div>
            </div>
            <template v-if="iconsClass.after">
                <div class="input-group-append" v-click:500="emitSearch" v-bind:key="'show'">
                    <span class="input-group-text" v-bind:class="iconsClass.after">{{ !iconsClass.after ? icons.after : ''}}</span>
                </div>
            </template>
            <template v-else></template>
        </div>
    </div>`
})
export class TimeRangeSearchBoxComponent extends Vue {
    @Prop()
    public defaultStartTime: number;

    @Prop()
    public defaultEndTime: number;

    @Prop({ default: () => ({ before: '', after: 'fa fa-search' }) })
    public readonly icons!: { before: string; after: string };

    //========================================= data and computed ====================================================
    private startTime: number = this.defaultStartTime || null;

    get displayStartTime() {
        return this.displayTime(this.startTime);
    }

    private endTime: number = this.defaultEndTime || null;

    get displayEndTime() {
        return this.displayTime(this.endTime);
    }

    get iconsClass() {
        let self = this,
            classess = ['fa', 'fas', 'fab'],
            isClass = (icon: string) => {
                return !!classess.filter((f) => (icon || '').indexOf(f) > -1).length;
            };

        return {
            before: (isClass(self.icons.before) ? self.icons.before : '').trim(),
            after: (isClass(self.icons.after) ? self.icons.after : '').trim()
        };
    }

    // ====================================== method =========================================================

    private displayTime(value: number) {
        if (value === null) {

            return '--- --:--';
        }

        return TimeWithDay.toString(value);
    }

    public selectStartTime() {
        this.showPicker(this.startTime)
            .then((value: any) => {
                if (value === undefined) {
                    // do nothing
                } else if (value === null) {
                    this.startTime = null;
                } else {
                    this.startTime = TimeWithDay.fromObject(value).value;
                }
            });
    }

    public selectEndTime() {
        this.showPicker(this.endTime)
            .then((value: any) => {
                if (value === undefined) {
                    // do nothing
                } else if (value === null) {
                    this.endTime = null;
                } else {
                    this.endTime = TimeWithDay.fromObject(value).value;
                }
            });
    }

    private showPicker(value: number): Promise<{}> {
        let selected = TimeWithDayHelper.computeSelecteds(value);
        let title = TimeWithDay.fromObject(selected).toString();

        return this.$picker(selected,
            TimeWithDayHelper.getDataSource(value),
            TimeWithDayHelper.onSelect,
            { title });
    }

    public emitSearch() {
        this.$emit('search', this.startTime, this.endTime);
    }
}

//deprecate
Vue.component('time-range-search-box', TimeRangeSearchBoxComponent);

// recommended
Vue.component('nts-time-range-search', TimeRangeSearchBoxComponent);
