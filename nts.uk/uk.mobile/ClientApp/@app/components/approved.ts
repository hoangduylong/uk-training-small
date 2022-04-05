import { Vue } from '@app/provider';
import { component, Prop, Watch } from '@app/core/component';
import { dom } from '@app/utils';

@component({
    template: `<div class="uk-approveds">
      <div class="row">
        <div class="col">
            <slot name="buttons" />
        </div>
        <div class="col">
        </div>
        <div class="col">
        </div>
        <div class="col">
        </div>
        <div class="col">
        </div>
      </div>
      <div class="mb-2">
        <div class="popover bs-popover-bottom show mw-100 position-relative bg-grey-200">
          <div class="arrow" v-bind:style="{ 'left': left }"></div>
          <div class="popover-body">
            <slot name="popovers" />
          </div>
        </div>
      </div>
    </div>`,
    style: `.uk-approveds .arrow:after { border-bottom-color: #eee; }
    .uk-approveds .popover { z-index: 0; }
    .uk-approveds .row>.col:not(:last-child):after { position: absolute; content: '\\F0DA'; font-family: 'Font Awesome 5 Free'; font-weight: 900; font-size: 1.8rem; right: -6px; color: #666; }`
})
export class ApprovedComponent extends Vue {
    @Prop({ default: 0 })
    public value!: number;

    public left: string = '0px';

    @Watch('value')
    public valueWatcher(value: number) {
        let self = this,
            button = self.$el && self.$el.querySelector(`.row>.col:nth-child(${value + 1})`) as HTMLElement;

        if (button) {
            self.left = `${button.offsetLeft + (button.offsetWidth / 2) - 29}px`;
        }
    }

    public mounted() {
        let self = this,
            buttons: Element[] = [].slice.call(this.$el.querySelectorAll('.row>.col:first-child>button'));

        if (buttons.length == 5) {
            buttons.forEach((btn: HTMLButtonElement, i: number) => {
                dom.addClass(btn, 'btn p-2 w-100');

                dom.registerEventHandler(btn, 'click', () => self.$emit('input', i));

                if (i !== 0) {
                    let cont: HTMLDivElement = this.$el.querySelector(`.row>.col:nth-child(${i + 1})`);

                    if (cont) {
                        cont.appendChild(btn);
                    }
                }
            });

            self.valueWatcher(self.value);
        }
    }
}