import { obj, dom } from '@app/utils';
import { Vue } from '@app/provider';
import { Prop } from '@app/core/component';
import { switchbtn, SelectBoxComponent } from './select';



@switchbtn()
class SwitchButtonGroup extends SelectBoxComponent {
    @Prop({ default: 'radio' })
    public type!: 'radio' | 'checkbox';

    get checked() {
        return obj.isArray(this.selected) ? this.selected.indexOf(this.value) > -1 : this.selected === this.value;
    }

    public onClick() {
        let self = this;

        if (obj.isArray(this.selected)) {
            if (self.selected.includes(self.value)) {
                self.selected.splice(self.selected.indexOf(self.value), 1);
            } else {
                self.selected.push(self.value);
            }
        } else {
            if ((this.$refs.input as HTMLInputElement).checked) {
                this.$emit('input', this.value);
            } else {
                this.$emit('input', undefined);
            }
        }
    }

    public mounted() {
        let el = this.$el as HTMLElement;

        if (el.nodeType !== 8) {
            dom.addClass(el.parentElement, 'btn-group btn-group-toggle mb-3');
        }

        if (obj.isArray(this.selected)) {
            if ((this.selected as any).includes(this.value) || (this.$refs.input as HTMLInputElement).checked) {
                dom.addClass(el, 'btn-primary');
                dom.removeClass(el, 'btn-secondary');
            }
        } else {
            if (this.selected == this.value || (this.$refs.input as HTMLInputElement).checked) {
                dom.addClass(el, 'btn-primary');
                dom.removeClass(el, 'btn-secondary');
            }
        }
    }
}

Vue.component('nts-switchbox', SwitchButtonGroup);