import { Vue, moment, _ } from '@app/provider';
import { input, InputComponent } from './input';
import { browser } from '@app/utils';

@input()
export class YearMonthComponent extends InputComponent {
    public type: string = 'string';
    public editable: boolean = false;

    private get dataSource() {
        return {
            year: _.range(1900, 2101, 1).map((value: number) => ({ value, text: `${value}` })),
            month: _.range(1, 13, 1).map((value: number) => ({ value, text: _.padStart(`${value}`, 2, '0') }))
        };
    }

    // Functions
    private get year(): number {
        return this.value ? + Math.floor(this.value / 100) : moment.utc().year();
    }

    private get month(): number {
        return this.value ? + Math.floor(this.value % 100) : moment.utc().month() + 1;
    }

    public get rawValue() {
        let self = this,
            { year, month } = self;

        if (_.isNil(self.value)) {
            return this.$i18n('year_month', ['----', '--']);
        }

        return this.displayYearMonth({ year, month });
    }

    // Hooks
    public mounted() {
        this.icons.after = 'far fa-calendar-alt';

        Object.assign(window, { $browser: browser });
    }

    public click() {
        const vm = this;
        const { year, month, $refs } = vm;

        vm.$picker({ year, month },
            vm.dataSource,
            vm.onSelect, {
            title: vm.displayYearMonth({ year, month }),
            required: vm.constraints && vm.constraints.required
        })
            .then((select: any) => {
                if (select === undefined) {

                } else if (select === null) {
                    vm.$emit('input', null);
                } else {
                    vm.$emit('input', select.year * 100 + select.month);
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

    public onSelect(value: { year: number; month: number; }, pkr: { title: string }) {
        if (value.year !== undefined && value.month !== undefined) {
            pkr.title = this.displayYearMonth(value);
        }
    }

    private displayYearMonth(value: { year: number; month: number; }) {
        return this.$i18n('year_month', [value.year.toString(), value.month.toString()]);
    }
}

Vue.component('nts-year-month', YearMonthComponent);