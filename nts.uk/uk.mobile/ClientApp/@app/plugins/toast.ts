import { Vue, VueConstructor, ComponentOptions } from '@app/provider';

`<div class="toast fade show" style="position: absolute; top: 0; right: 0;">
<div class="toast-header">
  <strong class="mr-auto">Bootstrap</strong>
  <small>11 mins ago</small>
  <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
    <span aria-hidden="true">×</span>
  </button>
</div>
<div class="toast-body">
  Hello, world! This is a toast message.
</div>
</div>`;

const toast = {
    install(vue: VueConstructor<Vue>) {
        vue.mixin({
            beforeCreate() {
                let self = this,
                    $toast: { [key: string]: any } = {};

                ['warn', 'info', 'error'].forEach(($type) => {

                });
            }
        });
    }
};

export { toast };