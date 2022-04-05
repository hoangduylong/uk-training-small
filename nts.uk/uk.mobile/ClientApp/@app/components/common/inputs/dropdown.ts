import { Vue } from '@app/provider';
import { Emit } from '@app/core/component';
import { input, InputComponent } from './input';

@input('select')
class DropdownComponent extends InputComponent {
    get rawValue() {
        return this.value;
    }

    public mounted() {
        // this.icons.after = 'fa fa-caret-down';
    }

    @Emit()
    public input() {
        return (this.$refs.input as HTMLSelectElement).value;
    }
}

Vue.component('nts-dropdown', DropdownComponent);