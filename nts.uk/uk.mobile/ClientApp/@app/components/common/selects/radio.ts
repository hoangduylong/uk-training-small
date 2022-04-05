import { obj } from '@app/utils';
import { Vue } from '@app/provider';
import { Emit } from '@app/core/component';
import { select, SelectBoxComponent } from './select';

@select()
class RadioBoxComponent extends SelectBoxComponent {
    public type: string = 'radio';

    get checked() {
        // tslint:disable-next-line: triple-equals
        return this.selected == this.value;
    }

    @Emit('input')
    public onClick() { return this.value; }
}

Vue.component('nts-radio', RadioBoxComponent);