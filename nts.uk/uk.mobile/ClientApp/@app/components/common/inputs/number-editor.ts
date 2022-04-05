import { input, InputComponent } from '@app/components/common/inputs/input';
import { Emit } from '@app/core/component';
import { Vue } from '@app/provider';

@input()
class NumberComponent extends InputComponent {
    public type: string = 'number';

    get rawValue() {
        const vm = this;
        const { value } = vm;

        return typeof value === 'number' && !isNaN(value) ? `${value}` : '';
    }

    @Emit()
    public input() {
        let value = ( this.$refs.input as HTMLInputElement).value;

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
}

Vue.component('nts-number-editor', NumberComponent);