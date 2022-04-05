import { Vue } from '@app/provider';
import { component, Prop, Model } from '@app/core/component';

export const select = () => component({
    template: `<div class="form-check">
        <label class="form-check-label">
            <input ref="input" 
                :name="name" 
                :type="type" 
                :value="value" 
                :checked="checked" 
                :disabled="!!disabled && disabled !== 'false'" 
                v-bind:tabindex="tabindex" 
                v-on:click="onClick()" 
                class="form-check-input" />
            <span><slot /></span>
        </label>
    </div>`
}), switchbtn = () => component({
    template: `<label class="btn btn-secondary" v-bind:tabindex="tabindex">
        <input ref="input" 
            :name="name" 
            :type="type" 
            :value="value" 
            :checked="checked" 
            :disabled="!!disabled && disabled !== 'false'" 
            v-on:click="onClick()"
            class="form-check-input" />
        <span><slot /></span>
    </label>`
});

export class SelectBoxComponent extends Vue {
    @Prop({ default: null })
    public value!: any;

    @Model('input')
    public selected!: any;

    @Prop({ default: null })
    public name!: string;

    @Prop({ default: () => undefined })
    public readonly tabindex!: string | number | undefined;

    @Prop({ default: false })
    public disabled!: 'true' | 'false' | boolean;
}