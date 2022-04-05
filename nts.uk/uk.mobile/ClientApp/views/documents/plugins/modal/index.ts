import { Vue } from '@app/provider';
import { component } from '@app/core/component';
import { ModalComponent } from './modal-component';
@component({
    name: 'documentspluginsmodal',
    route: {
        url: '/plugins/modal',
        parent: '/documents'
    },
    template: require('./index.vue'),
    resource: require('./resources.json'),
    markdown: {
        vi: require('./content/vi.md'),
        jp: require('./content/jp.md')
    },
    components: {
        'sample': ModalComponent
    }
})
export class DocumentsPluginsModalComponent extends Vue {
    public name: string = 'Nittsu System Viet Nam';

    public showModal(type) {
        let name = this.name;

        this.$modal('sample', { name }, {type} )
            .then((v) => {
                alert(`You are choose: ${v}`);
            });
    }

    public showWarn() {
        this.$modal.warn('Warning, this is warning message!')
            .then(() => {
                // alert('Clicked: close');
            });
    }

    public showInfo() {
        this.$modal.info('Info, this is info message!')
            .then(() => {
                // alert('Clicked: close');
            });
    }

    public showError() {
        this.$modal.error('Info, this is info message!')
            .then(() => {
                // alert('Clicked: close');
            });
    }

    public showConfirm() {
        this.$modal.confirm('Info, this is info message!', 'danger')
            .then((v) => {
                // alert('Clicked: ' + v);
            });
    }
}