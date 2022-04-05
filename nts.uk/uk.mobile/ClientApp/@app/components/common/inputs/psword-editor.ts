import { Vue } from '@app/provider';
import { Emit } from '@app/core/component';
import { input, InputComponent } from './input';

@input()
class PasswordComponent extends InputComponent {
    public type: string = 'password';

    get rawValue() {
        return (this.value || '');
    }

    @Emit()
    public input() {
        return ( this.$refs.input as HTMLInputElement).value;
    }
}

Vue.component('nts-input-password', PasswordComponent);