import { component, Prop, Emit } from '@app/core/component';
import { Vue } from '@app/provider';
import { input, InputComponent } from '@app/components/common/inputs/input';

@input('textarea')
export class TextArea extends InputComponent {
    get rawValue() {
        return (this.value || '');
    }

    @Emit()
    public input() {
        return (this.$refs.input as HTMLInputElement).value;
    }
}

Vue.component('nts-text-area', TextArea);
