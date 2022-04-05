import { obj } from '@app/utils';
import { IModalOptions } from 'declarations';
import { Vue, VueConstructor, ComponentOptions } from '@app/provider';

const $dialog = () => ({
    props: ['params'],
    template: `<div>
        <div class="text-justify">{{ $i18n(params.message || params.messageId, params.messageParams) }}</div>
        <div class="text-right mt-2" v-if="params.messageId">{{ params.messageId }}</div>
        <div class="text-right mt-2" v-else-if="params.message && params.message.match(/^(Msg.*_\\d+)$/)">{{ params.message }}</div>
        <div data-msg="No messageId" v-else></div>
        <div class="modal-footer text-right">
            <template v-if="['info', 'error', 'warn'].indexOf(params.type) > -1">
                <button v-focus class="btn btn-link" v-ripple="'rgba(255, 0, 0, 0.35)'" v-on:click="$close('close')">{{'close' | i18n}}</button>
                <!--<button class="btn btn-link" v-on:click="$close('cancel')">{{'cancel' | i18n}}</button>-->
            </template>
            <template v-else>
                <button class="btn btn-link" v-bind:class="{
                    'text-danger': danger,
                    'text-primary': primary
                }" v-on:click="$close('yes')">{{'yes' | i18n}}</button>
                <button v-focus class="btn btn-link" v-bind:class="{ 'text-secondary': danger || primary  }" v-on:click="$close('no')">{{'no' | i18n}}</button>
            </template>
        </div>
     </div>`,
    computed: {
        danger() {
            return this.params.style === 'danger';
        },
        primary() {
            return this.params.style === 'process';
        }
    }
}) as ComponentOptions<Vue>,
    dialog = {
        install(vue: VueConstructor<Vue>) {
            vue.mixin({
                beforeCreate() {
                    let self = this,
                        $dlg: { [key: string]: any } = {};

                    ['warn', 'info', 'error', 'confirm']
                        .forEach(($type) => {
                            $dlg[$type] = function (msg: string | { messageId: string, messageParams: string[] | { [key: string]: string } }, style: 'normal' | 'process' | 'danger' = 'normal') { // 'normal' | 'process' | 'danger'
                                let params: { [key: string]: any } = {},
                                    option: IModalOptions = {
                                        title: $type,
                                        type: 'info',
                                        animate: 'down',
                                        style: (`modal-${style} type-${$type}`).trim()
                                    };

                                if (typeof msg !== 'string') {
                                    params = msg;
                                } else {
                                    params.message = msg;
                                }

                                obj.extend(params, { type: $type, style });

                                return (this as Vue).$modal($dialog(), params, option);
                            }.bind(self);
                        });

                    obj.extend(self.$modal, $dlg);
                }
            });
        }
    };

Vue.use(dialog);

export { $dialog };