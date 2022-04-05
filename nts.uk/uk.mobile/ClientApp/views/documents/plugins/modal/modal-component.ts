import { Vue } from '@app/provider';
import { component, Prop } from '@app/core/component';

@component({
    template: `<div class="modal-component">
        <div class="modal-header rounded-0 d-block p-0 mb-2">
            <div class="uk-bg-teal p-2 row m-0">
                <h4 class="modal-title text-white col-4 p-0">
                    <i class="fas fa-angle-left mr-1"></i>
                    <span>dialog</span>
                </h4>
                <div class="text-right col-8 p-0">
                    <button class="btn btn-link text-white">
                        <i class="fas fa-save"></i>
                    </button>
                    <button class="btn btn-link dropdown-toggle text-white">
                        <i class="fas fa-ellipsis-v"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-right">
                        <li class="dropdown-item">New</li>
                        <li class="dropdown-item">Delete</li>
                    </ul>
                </div>
            </div>
        </div>
        <div>Hello {{params.name | i18n}} component!</div>
        <div class="modal-footer">
            <button class="btn btn-link" v-click="acceptEvent">{{'accept' | i18n}}</button>
            <button class="btn btn-link" v-click="cancelEvent">{{'cancel' | i18n}}</button>
        </div>
    </div>`
})
export class ModalComponent extends Vue {
    @Prop({ default: () => ({ name: '' }) })
    public params!: { [key: string]: any };

    public acceptEvent() {
        this.$close('accept');
    }

    public cancelEvent() {
        this.$close('cancel');
    }
}