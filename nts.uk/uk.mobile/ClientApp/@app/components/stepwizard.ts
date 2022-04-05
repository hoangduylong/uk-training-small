import { Vue } from '@app/provider';
import { component, Prop } from '@app/core/component';

@component({
    template: `<nav class="nav nav-pills nav-step-wizard nav-justified">
        <template v-for="(item, k) in items">
            <transition name="v-collapse">
                <template v-if="selected == item">
                    <a class="nav-item nav-link disabled active" href="javascript:void(0)" v-bind:key="k">
                        <span>{{k + 1}}</span>
                        <span>{{item | i18n}}</span>
                    </a>
                </template>
                <template v-else>
                    <a class="nav-item nav-link disabled" href="javascript:void(0)" v-bind:key="k">{{k + 1}}</a>
                </template>
            </transition>
        </template>
    </nav>`
})
export class StepwizardComponent extends Vue {
    @Prop({ default: () => [] })
    public readonly items!: Array<string>;

    @Prop({ default: '' })
    public readonly selected!: string;
}